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

export default voice;