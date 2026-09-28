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

// Speak text aloud; onEnd fires when this utterance finishes (or is
// cancelled/replaced), so the UI can clear its "speaking" state.
export function speak(text: string, appLanguage?: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  const clean = speakableText(text);
  if (!clean) return false;
  window.speechSynthesis.cancel();
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
}

export function stopSpeaking(): void {
  currentUtterance = null;
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeaking(): boolean {
  return !!currentUtterance;
}