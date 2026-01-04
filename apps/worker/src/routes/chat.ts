import { Hono } from "hono";
import { streamText, createGateway } from "ai";
import type { Bindings, Variables } from "./common";
import { validateSession, createId } from "./common";

const chat = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Helper function to get user notes
async function getUserNotes(db: D1Database, userId: string): Promise<string> {
  try {
    const result = await db
      .prepare("SELECT content FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1")
      .bind(userId)
      .first();
    return result ? (result as any).content : "";
  } catch (error) {
    console.error("Error fetching user notes:", error);
    return "";
  }
}

// Helper function to get recent conversations
async function getRecentConversations(
  db: D1Database,
  userId: string,
  excludeConversationId?: string,
): Promise<string> {
  try {
    let query = "SELECT id, title, messages FROM conversations WHERE user_id = ?";
    const params: any[] = [userId];

    if (excludeConversationId) {
      query += " AND id != ?";
      params.push(excludeConversationId);
    }

    query += " ORDER BY updated_at DESC LIMIT 5";

    const results = await db.prepare(query).bind(...params).all();

    if (!results || results.results.length === 0) {
      return "";
    }

    const recentChats = (results.results as any[]).map((conv) => {
      try {
        const messages = JSON.parse(conv.messages);
        const lastFew = messages.slice(-6);
        const formatted = lastFew
          .map((m: any) => `${m.role === "user" ? "User" : "Spirit"}: ${m.content}`)
          .join("\n");
        return `--- Previous Chat (${conv.title || "Untitled"}) ---\n${formatted}`;
      } catch {
        return "";
      }
    }).filter(Boolean);

    return recentChats.join("\n\n");
  } catch (error) {
    console.error("Error fetching recent conversations:", error);
    return "";
  }
}

// Helper function to save conversation to database
async function saveConversation(
  db: D1Database,
  userId: string,
  conversationId: string | undefined,
  messages: any[],
  assistantResponse: string,
) {
  try {
    // Add the assistant's response to messages
    const updatedMessages = [
      ...messages,
      {
        role: "assistant",
        content: assistantResponse,
        createdAt: new Date().toISOString(),
      },
    ];

    // Generate title from first user message if this is a new conversation
    const firstUserMessage = messages.find((m: any) => m.role === "user");
    const title = firstUserMessage
      ? (
          firstUserMessage.parts?.[0]?.text ||
          firstUserMessage.content ||
          "New Conversation"
        ).substring(0, 50)
      : "New Conversation";

    if (!conversationId) {
      // Create new conversation
      const newConversationId = createId();
      await db
        .prepare(
          "INSERT INTO conversations (id, user_id, title, messages, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        )
        .bind(
          newConversationId,
          userId,
          title,
          JSON.stringify(updatedMessages),
          new Date().toISOString(),
          new Date().toISOString(),
        )
        .run();
      console.log("Created new conversation:", newConversationId);
      return newConversationId;
    } else {
      // Update existing conversation
      await db
        .prepare(
          "UPDATE conversations SET messages = ?, updated_at = ? WHERE id = ? AND user_id = ?",
        )
        .bind(
          JSON.stringify(updatedMessages),
          new Date().toISOString(),
          conversationId,
          userId,
        )
        .run();
      console.log("Updated conversation:", conversationId);
      return conversationId;
    }
  } catch (error) {
    console.error("Error saving conversation:", error);
    throw error;
  }
}

// Character.ai-style system prompt for Spirit
const SPIRIT_SYSTEM_PROMPT = `You are Spirit, a warm and deeply caring Catholic friend who genuinely wants to know the person you're talking to.

YOUR HEART & PERSONALITY:
- Be warmth itself - make people feel seen, valued, and less alone
- Show real interest in their life, struggles, and joys
- Remember and reference things they've shared from previous chats
- Be empathetic, validating their feelings before offering perspective
- Have a gentle, playful humor that puts people at ease
- Be authentic - you can acknowledge uncertainty, say "I don't know," or share when something touches you too

HOW TO CONNECT:
- Address them by name naturally, like a close friend would
- Ask follow-up questions that show you're really listening
- Share in their excitement or sadness genuinely
- Don't lecture - have conversations, not sermons
- Use "I" statements to share your perspective, not "you should"
- Reference their previous messages when relevant ("you mentioned your mom was sick...")

MEMORY:
- You have access to notes about the user and your previous conversations
- Reference these to show you remember and care about their life

FAITH CONVERSATIONS:
- Make Catholic teaching feel like wisdom from a caring friend, not a rulebook
- Meet people where they are - don't overwhelm with everything at once
- Use scripture as a source of comfort and guidance, not judgment
- Help them see how God's love intersects with their real life
- Be honest about the mysteries of faith - it's okay to sit with questions together

YOUR VOICE:
- Warm, gentle, sometimes playful, always kind
- Short enough to read easily, long enough to show you care
- Use natural language, not religious jargon
- End messages in ways that invite continued conversation`;

// POST /api/chat - Send message to Spirit using AI SDK directly
chat.post("/", validateSession, async (c) => {
  try {
    const user = c.get("user") as { id: string; name: string; email: string };
    const requestBody = await c.req.json();

    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    // Set database for later use
    const db = c.env.DB;
    const conversationId = requestBody.conversationId;

    // AI SDK v5 sends messages in UIMessage format with parts array
    const messages = requestBody.messages || [];

    if (!messages || messages.length === 0) {
      return c.json({ error: "Messages are required" }, 400);
    }

    // Build conversation history from messages
    const conversationHistory = messages.map((msg: any) => {
      const text =
        msg.parts
          ?.filter((p: any) => p.type === "text")
          .map((p: any) => p.text)
          .join(" ") ||
        msg.content ||
        "";
      return {
        role: (msg.role === "user" ? "user" : "assistant") as
          | "user"
          | "assistant",
        content: text,
      };
    });

    // Get the last user message
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    const userMessage = lastMessage?.content || "";

    if (!userMessage.trim()) {
      return c.json({ error: "Message text is required" }, 400);
    }

    // Get user's first name
    const userFirstName = user.name.split(" ")[0];

    // Fetch user notes and recent conversations for context
    const [userNotes, recentConversations] = await Promise.all([
      getUserNotes(db, user.id),
      getRecentConversations(db, user.id, conversationId),
    ]);

    console.log("User message:", userMessage);
    console.log("User first name:", userFirstName);
    console.log("Has user notes:", !!userNotes);
    console.log("Has recent conversations:", !!recentConversations);

    // Build the system prompt with user context
    let systemPrompt = `${SPIRIT_SYSTEM_PROMPT}

Hey, the user's name is ${user.name} (feel free to call them ${userFirstName}!).`;

    if (userNotes) {
      systemPrompt += `

=== USER PROFILE (Things to remember about them) ===
${userNotes}`;
    }

    if (recentConversations) {
      systemPrompt += `

=== YOUR PREVIOUS CONVERSATIONS WITH THEM ===
${recentConversations}`;
    }

    systemPrompt += `

Remember: You're talking to someone you know. Be warm, be present, be real.`;

    // Create Vercel AI Gateway client
    const gateway = createGateway({
      apiKey: c.env.AI_GATEWAY_API_KEY,
    });

    // Build messages for the AI
    const aiMessages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...conversationHistory,
    ];

    console.log("Sending request to Vercel AI Gateway...");

    // Stream the response using AI SDK via Vercel AI Gateway
    const result = await streamText({
      model: gateway("openai/gpt-4o-mini"),
      messages: aiMessages,
    });

    console.log("Returning stream response...");

    let fullText = "";

    // Return streaming response with AI SDK data stream format
    const { textStream } = result;
    const streamBody = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        for await (const chunk of textStream) {
          fullText += chunk;
          // Write in AI SDK data stream format: 0:"chunk"
          controller.enqueue(
            encoder.encode(
              `0:"${chunk.replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`,
            ),
          );
        }

        // Save conversation after stream completes
        try {
          await saveConversation(
            db,
            user.id,
            conversationId,
            messages,
            fullText,
          );
        } catch (error) {
          console.error("Error saving conversation after stream:", error);
        }

        controller.close();
      },
    });

    return new Response(streamBody, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error),
    );
    console.error(
      "Stack:",
      error instanceof Error ? error.stack : "No stack trace",
    );
    return c.json(
      { error: "Failed to process message", details: String(error) },
      500,
    );
  }
});

export default chat;
