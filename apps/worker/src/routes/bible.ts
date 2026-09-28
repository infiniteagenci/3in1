import { Hono } from "hono";
import { generateText, createGateway } from "ai";
import type { Bindings } from "./common";
import { validateSession } from "./common";

const bible = new Hono<{ Bindings: Bindings }>();

// GET /api/bible/verse?reference=Jeremiah+29:11&version=KJV
// Renders one verse in the reader's chosen translation via the AI Gateway,
// so every displayed reading matches the Bible version saved in their
// profile. Well-known references only (this backs the daily verse card).
bible.get("/verse", validateSession, async (c) => {
  const reference = c.req.query("reference");
  const version = c.req.query("version") || "NIV";

  if (!reference) {
    return c.json({ error: "reference is required" }, 400);
  }

  try {
    const gateway = createGateway({
      apiKey: c.env.AI_GATEWAY_API_KEY,
    });

    const result = await generateText({
      model: gateway(c.env.AI_CHAT_MODEL || "openai/gpt-4.1"),
      messages: [
        {
          role: "system",
          content:
            "You quote Bible verses. Reply with ONLY the words of the requested passage in the requested translation — no reference, no translation name, no quotation marks, no commentary. If the passage is more than 3 verses, quote just the first 3 verses followed by an ellipsis.",
        },
        {
          role: "user",
          content: `Quote ${reference} exactly as it reads in the ${version} translation.`,
        },
      ],
      maxOutputTokens: 200,
    });

    return c.json({
      reference,
      version,
      text: result.text.trim(),
    });
  } catch (error) {
    console.error("Bible verse error:", error);
    return c.json({ error: "Failed to fetch verse" }, 500);
  }
});

export default bible;