// Browser speech helpers for talking with Spirit — uses the built-in
// Web Speech APIs (SpeechRecognition + speechSynthesis), so there are
// no API keys, no worker changes and nothing extra to pay for.

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

  // 1. Neural voice through the worker — sounds human, not robotic
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
    if (res.ok && res.headers.get('content-type')?.includes('audio')) {
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
    // fall through to the browser voice
  }

  // 2. Fallback: the browser's built-in speechSynthesis voice
  try {
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = langTag(appLanguage);
    // Prefer a voice matching the language; fall back to the default voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.toLowerCase().replace('_', '-') === utterance.lang.toLowerCase())
      || voices.find((v) => v.lang.toLowerCase().startsWith(appLanguage || 'en'));
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95; // a touch slower feels calm and prayerful
    utterance.onend = () => {
      // Only report "finished" if this utterance is still the active one —
      // cancel() also fires onend, and a replaced utterance shouldn't clear
      // the speaking state of a newer one.
      if (currentUtterance === utterance) {
        currentUtterance = null;
        onEnd?.();
      }
    };
    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking(): void {
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