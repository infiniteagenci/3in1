// Browser speech helpers for talking with Spirit — free Web Speech APIs
// (SpeechRecognition + speechSynthesis), plus an optional neural TTS
// through the worker that is currently disabled (free-only mode).

type AnyRecognition = any;

// app_language code → BCP-47 tag for recognition and TTS voice matching
const LANG_TAGS: Record<string, string> = {
  en: 'en-US', es: 'es-ES', pt: 'pt-BR', fr: 'fr-FR', de: 'de-DE',
  it: 'it-IT', pl: 'pl-PL', tl: 'fil-PH', vi: 'vi-VN', ko: 'ko-KR',
  'zh-CN': 'zh-CN', ja: 'ja-JP', ar: 'ar-SA', hi: 'hi-IN', ta: 'ta-IN',
  te: 'te-IN', kn: 'kn-IN', la: 'la', ur: 'ur-PK',
};

export function langTag(appLanguage?: string): string {
  return LANG_TAGS[appLanguage || 'en'] || 'en-US';
}

export function speechSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

// Start listening; returns the recognition instance (call .stop() to end).
// onInterim gives live partial text while the person is still talking.
export function startListening(
  appLanguage: string,
  onFinal: (text: string) => void,
  onInterim: ((text: string) => void) | undefined,
  onEnd: () => void,
): AnyRecognition | null {
  const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec: AnyRecognition = new Ctor();
  rec.lang = langTag(appLanguage);
  rec.continuous = false;
  rec.interimResults = true;
  rec.maxAlternatives = 1;

  rec.onresult = (event: any) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) onFinal(result[0].transcript.trim());
      else interim += result[0].transcript;
    }
    if (interim && onInterim) onInterim(interim.trim());
  };
  rec.onerror = () => onEnd();
  rec.onend = () => onEnd();
  rec.start();
  return rec;
}

// Strip markdown so speech sounds like speech, not a document
function speakableText(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[*_#>`~]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentAudio: HTMLAudioElement | null = null;
// Set when the server's neural voice is unavailable (e.g. free mode) so
// we stop requesting it every reply and go straight to the free voice.
let serverTtsDisabled = false;
// Bumped on every new speak run; queued chunks of an older run stop
// playing as soon as their run is cancelled.
let speechSeq = 0;

// Sentence-split so the free voice speaks phrase by phrase with natural
// pauses, which sounds far friendlier than one flat block of text.
// Tiny fragments are merged into the next chunk so it doesn't sound choppy.
function splitSentences(text: string): string[] {
  const raw = text.match(/[^.!?…]+(?:[.!?…]+|\s*\n\s*|$)/g) || [text];
  const chunks: string[] = [];
  for (const piece of raw) {
    const s = piece.trim();
    if (!s) continue;
    if (chunks.length && (s.length < 15 || chunks[chunks.length - 1].length < 15)) {
      chunks[chunks.length - 1] = `${chunks[chunks.length - 1]} ${s}`;
    } else {
      chunks.push(s);
    }
  }
  return chunks.length ? chunks : [text];
}

// Names that suggest a female voice, used to pick the best free voice
const FEMALE_HINTS = [
  'samantha', 'female', 'woman', 'karen', 'moira', 'tessa', 'veena', 'fiona',
  'zira', 'aria', 'jenny', 'susan', 'catherine', 'serena', 'shelley', 'yuna',
  'paulina', 'helena', 'amelie', 'google uk english female', 'sonia', 'ava',
];

function preferFemale(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  return voices.find((v) => FEMALE_HINTS.some((h) => v.name.toLowerCase().includes(h)));
}

// Stop any neural-audio playback (server TTS)
function stopAudio(): void {
  if (currentAudio) {
    const audio = currentAudio;
    currentAudio = null;
    audio.pause();
    audio.src = '';
  }
}

// Speak text aloud. Spirit's reply is rendered with a warm female neural
// voice through the worker (AI Gateway TTS) so she sounds like a real
// person; if that fails we fall back to the browser's built-in voice.
// onEnd fires when playback finishes (or is cancelled/replaced).
export async function speak(text: string, appLanguage?: string, onEnd?: () => void): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  stopAudio();
  window.speechSynthesis?.cancel();
  currentUtterance = null;

  const clean = speakableText(text);
  if (!clean) return false;

  // 1. Neural voice through the worker — sounds human, not robotic.
  // Skipped when we know it's disabled (free mode).
  if (!serverTtsDisabled) {
    try {
      const token = localStorage.getItem('session_token');
      const base = (window as any).PUBLIC_BASE_API_URL || 'https://3in1-worker.ailabs-hq.workers.dev';
      const res = await fetch(`${base}/api/voice/speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text: clean }),
      });
      if (!res.ok) {
        // Free mode / gateway down — remember and use the free voice
        serverTtsDisabled = true;
      } else if (res.headers.get('content-type')?.includes('audio')) {
        const blob = await res.blob();
        const audio = new Audio();
        audio.src = URL.createObjectURL(blob);
        currentAudio = audio;
        audio.onended = () => {
          if (currentAudio === audio) {
            currentAudio = null;
            URL.revokeObjectURL(audio.src);
            onEnd?.();
          }
        };
        await audio.play();
        return true;
      }
    } catch {
      serverTtsDisabled = true; // network error — stop asking every reply
    }
  }

  // 2. Free voice: the browser's built-in speechSynthesis.
  // Prefer a comfortable female voice; speak sentence by sentence with
  // natural pauses and gentle pitch variation, so it feels like a warm
  // friend rather than flat reading.
  try {
    const synth = window.speechSynthesis;
    if (!synth) return false;
    const utteranceLang = langTag(appLanguage);
    const voices = synth.getVoices();
    const matching = voices.filter((v) =>
      v.lang.toLowerCase().replace('_', '-').startsWith(utteranceLang.toLowerCase().split('-')[0].slice(0, 2))
      || v.lang.toLowerCase().replace('_', '-') === utteranceLang.toLowerCase(),
    );
    const voice = preferFemale(matching)
      || preferFemale(voices)
      || matching[0]
      || voices.find((v) => v.lang.toLowerCase().startsWith(appLanguage || 'en'))
      || voices[0];

    const chunks = splitSentences(clean);
    const myRun = ++speechSeq;

    const finish = () => {
      if (myRun === speechSeq) {
        currentUtterance = null;
        onEnd?.();
      }
    };

    const speakChunk = (i: number) => {
      if (myRun !== speechSeq) return; // a newer run cancelled this one
      if (i >= chunks.length) {
        finish();
        return;
      }
      const chunk = new SpeechSynthesisUtterance(chunks[i]);
      if (voice) chunk.voice = voice;
      chunk.lang = utteranceLang;
      chunk.rate = (i % 2 === 0 ? 0.96 : 0.92); // subtle cadence variation
      chunk.pitch = (i % 2 === 0 ? 1.05 : 1.1); // a touch brighter, warmer
      chunk.onend = () => {
        if (myRun !== speechSeq) return;
        currentUtterance = chunk;
        // A small natural pause between sentences — like real speech
        window.setTimeout(() => speakChunk(i + 1), i < chunks.length - 1 ? 220 : 0);
      };
      // If one chunk fails to play, keep the queue going
      chunk.onerror = () => {
        if (myRun !== speechSeq) return;
        window.setTimeout(() => speakChunk(i + 1), 0);
      };
      currentUtterance = chunk;
      synth.speak(chunk);
    };

    speakChunk(0);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking(): void {
  speechSeq++; // invalidate any queued sentence chunks
  currentUtterance = null;
  stopAudio();
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeaking(): boolean {
  if (currentAudio) return !currentAudio.paused;
  return !!currentUtterance;
}

// Warm up the voice list: Chrome loads voices lazily and fires
// voiceschanged when they're ready. Fetching once here (and on that
// event) means the female voice is available for the first reply.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    window.speechSynthesis.getVoices();
  });
}