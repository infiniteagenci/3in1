import { Hono } from "hono";
import type { Bindings } from "./common";
import { validateSession } from "./common";

const voice = new Hono<{ Bindings: Bindings }>();

// POST /api/voice/speech { text }
// Renders Spirit's reply as spoken audio through the Vercel AI Gateway
// (neural TTS, warm female voice). Disabled by default — it bills per
// character — and enabled only with AI_TTS_ENABLED=true. Clients fall
// back to the browser's built-in (free) speech voice when this fails.
voice.post("/speech", validateSession, async (c) => {
  const body = await c.req.json().catch(() => ({}) as Record<string, unknown>);
  const text =
    typeof body.text === "string" ? body.text.slice(0, 3000).trim() : "";
  if (!text) {
    return c.json({ error: "text is required" }, 400);
  }

  // Free-only mode: gateway TTS bills per character, so it stays off
  // unless explicitly enabled with AI_TTS_ENABLED=true. Clients fall
  // back to the browser's built-in (free) speech voice.
  if (c.env.AI_TTS_ENABLED !== "true") {
    return c.json({ error: "TTS is disabled" }, 403);
  }
  if (!c.env.AI_GATEWAY_API_KEY) {
    return c.json({ error: "TTS unavailable" }, 503);
  }

  try {
    const res = await fetch("https://ai-gateway.vercel.sh/v4/ai/speech-model", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${c.env.AI_GATEWAY_API_KEY}`,
        "ai-gateway-protocol-version": "0.0.1",
        "ai-speech-model-specification-version": "4",
        "ai-model-id": c.env.AI_TTS_MODEL || "openai/tts-1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        voice: c.env.AI_TTS_VOICE || "shimmer",
        outputFormat: "mp3",
        instructions:
          "Warm, gentle and calm, like a loving female friend offering comfort. Speak naturally and expressively with soft pauses and tender emphasis. Never robotic or monotone.",
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("TTS gateway error:", res.status, detail.slice(0, 300));
      return c.json({ error: "TTS failed" }, 502);
    }

    const data = (await res.json()) as { audio?: string; warnings?: unknown[] };
    if (!data.audio) {
      return c.json({ error: "TTS failed" }, 502);
    }

    const bytes = Uint8Array.from(atob(data.audio), (ch) => ch.charCodeAt(0));
    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return c.json({ error: "TTS failed" }, 502);
  }
});

// ---------------------------------------------------------------------------
// Free neural TTS — Microsoft Edge's Read Aloud voices (no API key, no cost)
// ---------------------------------------------------------------------------
// These are the natural, expressive voices Edge's "Read aloud" feature uses,
// served free over a websocket ("Aria", calm and friendly, female; plus a
// native female voice per app language). Unofficial: if Microsoft closes the
// door, the client simply falls back to the browser's built-in voice.

const TRUSTED_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
// Keep these in step with recent Edge releases — Microsoft rejects old
// Chromium versions with a 403 on the websocket handshake.
const EDGE_VERSION = "143.0.3650.75";
const EDGE_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0";
const EDGE_ORIGIN = "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold";
const SYNTH_HOST = "speech.platform.bing.com";

// app_language → natural female voice + locale for that language.
// English uses Sonia (calm, warm, UK accent) per the user's preference.
const EDGE_VOICES: Record<string, { voice: string; locale: string }> = {
  en: { voice: "en-GB-SoniaNeural", locale: "en-GB" },
  la: { voice: "en-GB-SoniaNeural", locale: "en-GB" },
  es: { voice: "es-ES-XimenaNeural", locale: "es-ES" },
  pt: { voice: "pt-BR-FranciscaNeural", locale: "pt-BR" },
  fr: { voice: "fr-FR-DeniseNeural", locale: "fr-FR" },
  de: { voice: "de-DE-KatjaNeural", locale: "de-DE" },
  it: { voice: "it-IT-ElsaNeural", locale: "it-IT" },
  pl: { voice: "pl-PL-ZofiaNeural", locale: "pl-PL" },
  tl: { voice: "fil-PH-BlessicaNeural", locale: "fil-PH" },
  vi: { voice: "vi-VN-HoaiMyNeural", locale: "vi-VN" },
  ko: { voice: "ko-KR-SunHiNeural", locale: "ko-KR" },
  "zh-CN": { voice: "zh-CN-XiaoxiaoNeural", locale: "zh-CN" },
  ja: { voice: "ja-JP-NanamiNeural", locale: "ja-JP" },
  ar: { voice: "ar-EG-SalmaNeural", locale: "ar-EG" },
  hi: { voice: "hi-IN-SwaraNeural", locale: "hi-IN" },
  ta: { voice: "ta-IN-PallaviNeural", locale: "ta-IN" },
  te: { voice: "te-IN-ShrutiNeural", locale: "te-IN" },
  kn: { voice: "kn-IN-SapnaNeural", locale: "kn-IN" },
  ur: { voice: "ur-PK-UzmaNeural", locale: "ur-PK" },
};

// Sec-MS-GEC DRM token Edge requires: current time in Windows file time
// (100-ns ticks since 1601), rounded DOWN to the nearest 5 minutes, hashed
// with the trusted client token (SHA-256, uppercase hex).
async function edgeGecToken(): Promise<string> {
  const WIN_EPOCH = 11644473600;
  let ticks = BigInt(Math.floor(Date.now() / 1000)) + BigInt(WIN_EPOCH);
  ticks -= ticks % 300n;
  ticks *= 10000000n; // seconds → 100-nanosecond intervals
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${ticks}${TRUSTED_TOKEN}`),
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

function edgeTimestamp(): string {
  // "Mon Jan 01 2024 12:00:00 GMT+0000 (Coordinated Universal Time)"
  return `${new Date().toUTCString().replace(" GMT", " GMT+0000 (Coordinated Universal Time)")}`;
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// POST /api/voice/edge { text, lang } → audio/mpeg (free, no billing)
voice.post("/edge", validateSession, async (c) => {
  const body = await c.req.json().catch(() => ({}) as Record<string, unknown>);
  const text = typeof body.text === "string" ? body.text.slice(0, 3000).trim() : "";
  const lang = typeof body.lang === "string" ? body.lang : "en";
  if (!text) return c.json({ error: "text is required" }, 400);

  const sel = EDGE_VOICES[lang] || EDGE_VOICES.en;

  try {
    const gec = await edgeGecToken();
    const url =
      `https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1` +
      `?TrustedClientToken=${TRUSTED_TOKEN}&Sec-MS-GEC=${gec}&Sec-MS-GEC-Version=1-${EDGE_VERSION}`;

    const upgrade = await fetch(url, {
      headers: {
        Upgrade: "websocket",
        "User-Agent": EDGE_UA,
        Origin: EDGE_ORIGIN,
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!upgrade.webSocket) {
      console.error("Edge TTS: no WebSocket returned", upgrade.status);
      return c.json({ error: "TTS failed" }, 502);
    }
    const ws = upgrade.webSocket;
    ws.accept();
    ws.binaryType = "arraybuffer";

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const audio: Uint8Array[] = [];
    let finished = false;
    let finish = () => {};

    const done = new Promise<void>((resolve) => {
      finish = resolve;
    });

    ws.addEventListener("message", (event: any) => {
      if (typeof event.data === "string") {
        if (event.data.includes("Path:turn.end")) {
          finished = true;
          try { ws.close(); } catch {}
          finish();
        }
        return;
      }
      // Binary: 2-byte big-endian header length → header text → mp3 bytes
      try {
        const data = new Uint8Array(event.data);
        const headerLen = (data[0] << 8) | data[1];
        const header = decoder.decode(data.slice(2, 2 + headerLen));
        if (header.includes("Path:audio")) {
          audio.push(data.slice(2 + headerLen));
        } else if (header.includes("Path:turn.end")) {
          finished = true;
          try { ws.close(); } catch {}
          finish();
        }
      } catch (e) {
        console.error("TTS parse error:", e);
      }
    });
    ws.addEventListener("error", () => {
      if (!finished) { finished = true; finish(); }
    });
    ws.addEventListener("close", () => {
      if (!finished) { finished = true; finish(); }
    });

    // speech.config then the SSML request
    ws.send(
      `X-Timestamp:${edgeTimestamp()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n` +
        JSON.stringify({
          context: {
            synthesis: {
              audio: {
                metadataoptions: { sentenceBoundaryEnabled: "false", wordBoundaryEnabled: "false" },
                outputFormat: "audio-24khz-48kbitrate-mono-mp3",
              },
            },
          },
        }),
    );
    const requestId = crypto.randomUUID().replace(/-/g, "");
    const ssml =
      `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${sel.locale}'>` +
      `<voice name='${sel.voice}'><prosody rate='-6%' pitch='+1Hz'>${xmlEscape(text)}</prosody></voice></speak>`;
    ws.send(
      `X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\n` +
        `X-Timestamp:${edgeTimestamp()}Z\r\nPath:ssml\r\n\r\n${ssml}`,
    );

    // Safety deadline so a hung connection never holds the request open
    const timeout = setTimeout(() => {
      if (!finished) { finished = true; try { ws.close(); } catch {} finish(); }
    }, 15000);
    await done;
    clearTimeout(timeout);

    const total = audio.reduce((n, a) => n + a.length, 0);
    if (!total) {
      console.error("TTS: no audio received from Edge engine");
      return c.json({ error: "TTS failed" }, 502);
    }

    const out = new Uint8Array(total);
    let offset = 0;
    for (const part of audio) {
      out.set(part, offset);
      offset += part.length;
    }
    return new Response(out, {
      status: 200,
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Edge TTS error:", error);
    return c.json({ error: "TTS failed" }, 502);
  }
});

export default voice;