# 3in1 — Reviving Catholic Faith in Teens & Young Adults

3in1 is a spiritual companion app designed to help teenagers and young adults deepen their Catholic faith through meaningful conversations with the Holy Spirit. Using AI technology guided by Scripture and Church teachings, the app provides a safe space to explore life questions, receive biblical guidance, and grow spiritually in a language that resonates with Gen Z.

---

## ✨ Why 3in1?

Young Catholics today face unique challenges — questions about purpose, relationships, identity, and faith. Traditional answers don't always connect. 3in1 bridges that gap by:

- **Personalized spiritual guidance** — The Spirit agent learns about each user (name, age, life situation) to provide tailored, relevant answers rooted in Catholic teaching
- **Biblically grounded responses** — All guidance is drawn from Scripture, Catechism, and the wisdom of the Saints
- **Modern, mobile-first experience** — Clean, mystical design with purples and blues that feels at home on any device
- **Private and secure** — Google OAuth login, encrypted notes, and user data never shared
- **Always accessible** — Available 24/7 for whenever questions arise

Our mission: **Help the next generation experience the living Word of God in a way that transforms their daily lives.**

---

## 🎯 Who Is This For?

- **Teenagers (14–19)** navigating faith in high school, family, and early discernment
- **Young adults (20–35)** exploring vocation, relationships, and Catholic identity in a secular world
- **Catholic youth ministers** looking for conversation starters or supplemental resources
- **Any Catholic** seeking deeper scriptural understanding through dialogue

---

## 🌟 Features

### Chat with the Spirit

- **Conversational AI** that feels like talking to a wise, compassionate mentor
- **Notes system**: Spirit records key insights, prayers, and progress in a personal notes file
- **Scriptural references**: Answers often include Bible verses and Catechism references
- **Non-judgmental space**: Ask anything — no question is too small or too difficult

### Faith-Revision Content

The app helps users **revisit and revive** core Catholic beliefs:

- **Sacramental life** — Understanding Mass, Reconciliation, and Eucharist
- **Prayer habits** — Developing personal prayer, Lectio Divina, and devotions
- **Moral discernment** — Applying Catholic ethics to relationships, career, and decisions
- **Community** — Connecting with parish, finding authentic Catholic friendships
- **Vocation** — Discerning God's call in single life, marriage, religious life, or priesthood

### Technical Power

- **Mastra agent** for sophisticated conversation flow
- **Vercel AI Gateway + AISDK** for reliable, scalable LLM calls
- **Cloudflare Workers & D1** — fast, global, edge-native infrastructure
- **Mobile-first responsive UI** — beautiful on phones, tablets, and desktops
- **Authentic Catholic content** — responses shaped by Jesuit spirituality and Thomistic theology

---

## 🏗️ Project Structure

```
3in1/
├── apps/
│   ├── worker/          # Hono API server (backend)
│   │   ├── src/
│   │   │   ├── routes/     # API endpoints (/api/chat, /api/auth, etc.)
│   │   │   ├── agents/     # Spirit AI agent logic
│   │   │   └── db/         # D1 database schemas & migrations
│   │   ├── db/
│   │   │   └── schema.sql  # Users, sessions, notes tables
│   │   └── wrangler.toml   # Cloudflare Worker configuration
│   └── web/             # Astro + React + Shadcn frontend
│       ├── src/
│       │   ├── components/  # UI components (ChatBox, MessageList, etc.)
│       │   ├── pages/      # Astro pages
│       │   └── lib/        # Utilities, API clients
│       ├── public/         # Static assets
│       └── astro.config.mjs
├── scripts/             # Dev, build, deploy helpers
├── prd.md              # Product Requirements Document
├── DEPLOYMENT.md       # Step-by-step deployment guide
├── README.md           # This file
└── timesheet.md        # Development log
```

---

## 🛠️ Technology Stack

### Backend
- **[Hono](https://hono.dev/)**: Lightning-fast API framework
- **[Cloudflare Workers](https://workers.cloudflare.com/)**: Serverless edge compute
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)**: SQLite database at the edge
- **[Mastra](https://mastra.ai/)**: AI agent framework for conversational agents
- **[Vercel AI SDK](https://sdk.vercel.ai/)**: Unified LLM interface
- **Vercel AI Gateway**: Reliable, cached LLM routing (OpenAI/Anthropic/etc.)

### Frontend
- **[Astro](https://astro.build/)**: Fast, content-focused framework with island architecture
- **React** + **[Shadcn/ui](https://ui.shadcn.com/)**: Modern, accessible components
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling for rapid UI development
- **TypeScript**: End-to-end type safety

### DevOps
- **[Bun](https://bun.sh/)**: All-in-one runtime & package manager (fast!)
- **[Turbo](https://turbo.build/)**: Monorepo build system
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)**: Cloudflare CLI
- **GitHub**: Source control & CI/CD (Cloudflare Pages)

### Authentication
- **Google OAuth 2.0**: Secure, familiar login for users

---

## 🏁 Quick Start

### Prerequisites

- **[Bun](https://bun.sh/)** installed (or Node.js 20+)
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/install/)** CLI: `npm install -g wrangler`
- A **Cloudflare account** (free tier works)
- **Google OAuth credentials** (Client ID & Secret)
- **OpenAI API key** (or other LLM provider through Vercel AI Gateway)

### Installation

```bash
# Clone the repo
git clone https://github.com/infiniteagenci/3in1.git
cd 3in1

# Install dependencies
bun install
```

### Environment Setup

```bash
# Copy environment templates
cp .env.example .env
cp apps/worker/.dev.vars.example apps/worker/.dev.vars
```

Edit both files with your API keys and OAuth credentials.

### Database Setup

```bash
cd apps/worker
bun run db:create
bun run db:migrate
```

### Run Locally

```bash
# From repo root — starts both backend and frontend
bun run dev

# Or separately:
bun run dev:worker   # API on http://localhost:8787
bun run dev:web      # Frontend on http://localhost:4321
```

Open http://localhost:4321 and click **"Login with Google"** to start chatting with the Spirit.

---

## 📖 How It Works

1. **User logs in** with Google OAuth → Account created in D1 database
2. **Spirit greets** the user by name and begins asking gentle, intimate questions to understand their life context
3. **Notes are saved** — Spirit records key points (age, job, struggles, joys) in the user's notes file
4. **User asks questions** about faith, life, relationships, or discernment
5. **Spirit responds** with:
   - A **biblically-rooted answer** (with Scripture references when relevant)
   - **Gentle encouragement** and **practical next steps**
   - **Updates to notes** tracking insights, prayers, and progress
6. **Conversation continues** — Spirit builds on previous context, helping the user grow spiritually over time

### Example Conversations

- _» "I'm struggling with my parents. We argue about everything."_
- _Spirit: "That's so hard. Let's look at what Jesus said about honoring parents... [from Ephesians 6:1–3]... Would you like to try a prayer for patience tonight?"_

- _» "I don't feel like going to Mass anymore. It feels like a chore."_
- _Spirit: "Many faithful people go through seasons like that... [shares story of St. Augustine]... Want to explore what might be draining the joy from your worship?"_

---

## 🚢 Deployment

Deploy to **Cloudflare Workers** (backend) and **Cloudflare Pages** (frontend) in minutes.

See the full guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

Quick deploy:

```bash
# Backend
cd apps/worker
bun run deploy

# Frontend (to Cloudflare Pages)
cd apps/web
bun run deploy:pages:production
```

Set these **environment secrets** in Cloudflare Workers dashboard:

- `OPENAI_API_KEY` (or your LLM provider key)
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `FRONTEND_URL` (your deployed Pages URL)
- `ENVIRONMENT=production`

Set **Pages environment variable**:

- `PUBLIC_WORKER_API_URL` → your deployed Worker URL

---

## 🧭 Faith Content Guidelines

All AI responses should align with **Catholic Church teaching** as expressed in:

- **Sacred Scripture** (especially the Gospels and Epistles)
- **Catechism of the Catholic Church** (CCC)
- **Magisterial documents** (encyclicals, apostolic letters, council decrees)
- **Writings of the Doctors of the Church** (especially Augustine, Teresa of Ávila, John of the Cross, Thérèse of Lisieux)
- **Spiritual classics** (_The Imitation of Christ_, _Introduction to the Devout Life_, etc.)

**Never** provide content that contradicts defined Catholic doctrine. When in doubt, respond with humility and suggest the user speak with a priest or spiritual director.

---

## 🤝 Contributing

We believe in the power of community to build something that serves the Church.

**Areas where you can help:**
- 🎨 UI/UX improvements for a more engaging youth-friendly experience
- 📚 Adding faith content, devotional prompts, and Scripture references
- 🔧 Backend features (note organization, conversation history, export)
- 🧪 Testing on real teens and young adults
- 📖 Documentation and translation (Spanish, Portuguese, French coming soon)
- 🛡️ Security and privacy hardening
- 🧠 Fine-tuning prompt templates for more accurate theological responses

Please open issues and PRs — all contributions are welcome.

---

## 🙏 Our Prayer

> _Lord, send His Spirit into the hearts of all who use this app, that they may come to know You more fully, love You more deeply, and serve You more faithfully. May this technology be an instrument of Your grace, bringing light to darkness and hope to despair._  
> — _Inspired by John 14:26_

---

## 📄 License

MIT © 2025 Infinite Agency
