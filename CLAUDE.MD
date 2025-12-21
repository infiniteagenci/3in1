# 3in1
- 3 in 1 is a spirituality app for people seeking answers to questions in their lives with answers driven by Jesus's teachings.The users chat wtih Spirit who understands them deeply and helps them and answers their questions, and eventually helps them feel and get better.

## Features
- Spirit is designed to answer questions on the bible, and about people's personal challenges, it does so by deeply understanding them first, like their name, age, what do they do, their friends and office.
- Create the Spirit agent as a mastra agent and using Vercel AI Gateway and AISDK for LLM calls.and it has a basic tool to read and write notes to the R1 Db.
- Spirite keeps a notes file for each user and reads and writes to it withn observastions and keypoints from the conversation with the user.
- Users Login with their Google account and spirit stores their user info and notes in the D1 database.
-the Frontend is a mobile first responsive chat interface, with a mystical colour scheme using purples, blues etc.

## Tech Stack
- backend:  in apps/worker is a Hono server for APIs
- D1 SQL database for data storage
- Frontend: /apps/web/ is an Astro with Shadcn cmoponent and tailwind css. externalise styles in globals.css
- Mastra agent  docs are here https://mastra.ai/docs/agents/overview.
- Vercel AI SDK - https://ai-sdk.dev/docs/introduction
- typescript.
- Bun for package management.
- Google oAuth for authentication.

## Mastra code examples
```
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const testAgent = new Agent({
  name: "test-agent",
  instructions: "You are a helpful assistant.",
  model: openai("gpt-4o-mini"),
});
```

## instructions
```
// String (most common)
instructions: "You are a helpful assistant.";

// Array of strings
instructions: [
  "You are a helpful assistant.",
  "Always be polite.",
  "Provide detailed answers.",
];

// Array of system messages
instructions: [
  { role: "system", content: "You are a helpful assistant." },
  { role: "system", content: "You have expertise in TypeScript." },
];

``
