# 3in1 — Product Requirements Document

## Vision

**Help teenagers and young adults revive and deepen their Catholic faith through AI-guided spiritual companionship.**

3in1 is not just another chatbot — it's a digital spiritual director that meets young Catholics where they are, answers their real questions with biblical truth, and walks with them toward a more authentic relationship with God.

---

## Problem Statement

Young Catholics (14–35) are leaving the Church at alarming rates because:

- They feel the Church doesn't speak to their modern struggles
- Questions about sexuality, purpose, mental health, and relationships go unanswered
- Traditional catechesis feels distant, irrelevant, or judgmental
- They lack safe spaces to explore doubt and skepticism

Yet deep down, many still hunger for meaning, connection, and God.

**3in1 answers:** _What if every teen had a compassionate, always-available guide who could explain Catholic teaching in plain language, listen without judgment, and point them toward the heart of the Gospel?_

---

## Target Audience

- **Primary**: Catholics ages 14–35
- **Secondary**: Youth ministers, RCIA coordinators, Catholic parents
- **Tertiary**: Any seeker interested in Christian spirituality

---

## Core User Experience

### 1. First Contact

- User opens app → sees beautiful, mystical interface (purples/blues)
- CTA: _"_Talk to the Holy Spirit_"
- Click → Google OAuth login (familiar, trusted)
- Spirit greets: _"_Welcome, [Name]. I'm here to walk with you. How are you feeling today?_"

### 2. Getting to Know You

Spirit gradually builds a profile through natural conversation:

- _What's your name? Age? What do you study/work?_
- _Tell me about your family. Friends. What brings you joy? What weighs on you?_
- _Have you grown up Catholic, or are you exploring?_  
- _What's your experience with prayer? Mass?_

All answers stored in **user notes file** (private, encrypted).

### 3. Spiritual Conversation

User can:

- **Ask questions**: _» "Is masturbation a sin?"_ or _» "Why does God let bad things happen?"_
- **Share struggles**: _» "I'm depressed and don't believe in God anymore."_
- **Seek guidance**: _» "I think I'm called to the priesthood. How do I know?"_
- **Request prayers**: _» "Pray for my exam tomorrow."_

Spirit responds with:

- **Scriptural grounding**: Key Bible verses, explained
- **Catholic teaching**: Clear, authentic doctrine from Catechism
- **Personal connection**: Relates to user's context (age, job, struggles)
- **Gentle invitation**: Suggests prayer, sacraments, or speaking with a priest
- **Note-taking**: Updates user's file with insights, prayers, follow-ups

### 4. Growth Over Time

- **Conversation history** saved → continuity week after week
- **Spirit remembers**: Past struggles, answered prayers, milestones
- **Check-ins**: _"_Last time you mentioned your fight with Mom. How's that going?_"
- **Progress indicators**: Subtle encouragement (_"_You've asked 12 questions about prayer — here's a summary..."_)

---

## Key Features

### 1. Spirit AI Agent (Mastra)

**Persona:** Empathetic, wise, humble — like a combination of a compassionate therapist, a learned theologian, and a loving grandparent who actually listens.

**Capabilities:**
- Natural conversation flow with memory
- Retrieves relevant Scripture, Catechism, saint quotes
- Notes tool: read/write per-user observations
- Safe-ish completion: refuses obviously harmful requests, redirects to pastoral care
- Never pretends to be human — identifies as "Spirit, your companion guided by the Holy Spirit"

**Prompt engineering guidelines:**
- Start from **Jesuit discernment** approach
- Ground in **Thomistic anthropology** (human as body/soul, made in God's image)
- Cite sources when possible (CCC ###, Bible verse)
- When uncertain: _"_I'm not sure. Let's ask a priest together._"
- Avoid speculation on private revelation, end-times, politics

### 2. Authentication

- **Google OAuth 2.0** — minimal friction, trusted provider
- Store: `users` table (Google sub, email, name, pic)
- Sessions: JWT signed, 7-day expiry, refreshable
- No passwords ever stored

### 3. Notes System

Each user gets a persistent notes file (D1 JSON blob) containing:

```json
{
  "profile": {
    "name": "Alex",
    "age": 17,
    "location": "Chicago",
    "parish": "St. Catherine's",
    "occupation": "high school student",
    "interests": ["guitar", "soccer", "video games"]
  },
  "background": {
    "catholic_ upbringing": "raised Catholic, parents divorced",
    "sacraments": ["Baptism", "First Communion", "Confirmation"],
    "current_practice": "irregular Mass attendance"
  },
  "struggles": [
    {"topic": "parent_divorce", "first_mentioned": "2025-01-12", "status": "ongoing"}
  ],
  "joy_moments": [
    {"date": "2025-01-15", "note": "felt peace during adoration"}
  ],
  "prayer_requests": [
    {"date": "2025-01-14", "prayer": "for mom's health", "status": "ongoing"}
  ],
  "insights": [
    {"date": "2025-01-13", "spiritual_nugget": "God loves you even when you doubt"}
  ],
  "follow_up_questions": [
    "explore Eucharistic adoration",
    "talk to youth group leader about parents divorce"
  ]
}
```

Spirit reads this on every conversation turn (via tool) and updates it after key interactions.

### 4. Frontend — Chat Interface

**Mobile-first, mystical aesthetic:**

- Dark mode by default (easier on eyes, battery)
- Primary colors: Deep purple (#6D28D9), celestial blue (#0EA5E9), white text
- Chat bubbles:
  - User: solid purple, white text
  - Spirit: outlined, semi-transparent with glow
- Input: single-line expanding textarea, send button, optional attachment (future)
- Header: user name, online status, menu (history, notes, settings)
- Footer: quick suggestions (pill-buttons) when appropriate: _"_Tell me about Confession_", _"_I'm struggling with anxiety_", _"_What does the Church say about _

**Accessibility:**
- ARIA labels everywhere
- High contrast ratios
- Keyboard navigable
- Reduce motion support

### 5. Conversation History

Store every message exchange in D1:

```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL, -- "user" | "assistant"
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

Allow users to:
- View past conversations (list view)
- Delete history (GDPR compliance)
- Export as JSON/PDF (for their records)

---

## Technical Architecture

### Backend (Cloudflare Worker)

```
POST /api/chat
  Headers: Authorization: Bearer <session_token>
  Body: { message: string, conversation_id?: string }

Flow:
1. Validate session → get user_id
2. Load user notes from D1 (notes column on users table)
3. Call Mastra agent with:
   - System prompt (Spirit persona + guidelines)
   - User message
   - Notes (as context)
   - Conversation history (last N messages)
4. Parse response → extract:
   - Text reply
   - Notes updates (if agent used notes tool)
5. Save:
   - User message → messages table
   - Assistant reply → messages table
   - Updated notes → users.notes (merge, overwrite)
6. Return { reply: string, conversation_id: string }
```

### Frontend (Astro + React)

- **Pages**:
  - `/` → login/landing
  - `/app` → chat interface (protected)
  - `/history` → past conversations
  - `/notes` → view/edit notes (read-only from Spirit mostly)
- **State management**:
  - React Query for API calls
  - Zustand or React Context for local UI state
- **API client**: wrapper around `/api/*` with error handling

### Database (D1)

```sql
-- Users
CREATE TABLE users (
  id TEXT PRIMARY KEY, -- Google sub
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  picture TEXT,
  notes TEXT NOT NULL DEFAULT '{}', -- JSON
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_messages_user_conv ON messages(user_id, conversation_id);
CREATE INDEX idx_messages_created ON messages(created_at);
```

---

## Non-Functional Requirements

- **Security**:
  - All API routes authenticated (except `/health`, `/auth/*`)
  - Rate limiting: 60 requests/min per user
  - Session tokens: HTTPS-only, HttpOnly cookies
  - No sensitive data in logs
- **Privacy**:
  - GDPR compliance: data export and delete endpoints
  - No third-party analytics (or self-hosted Plausible only)
  - All data at rest encrypted (Cloudflare security)
- **Performance**:
  - API response < 500ms p99 (Cold start < 2s)
  - Frontend LCP < 2s
  - Lighthouse accessibility/performance > 90
- **Reliability**:
  - 99.9% uptime target
  - Error monitoring (Sentry or similar)
  - Graceful fallback if LLM API down → static canned response

---

## Open Questions

1. **Theological review process**: Who vetts Spirit's prompt and responses for doctrinal accuracy? (Possible: local priest/ theologian as advisor)
2. **Content moderation**: What if user asks about suicide, abuse, etc.? Need escalation path to real human help (988, local resources)
3. **Multi-lingual**: Expand beyond English? Spanish first, then Portuguese, French, Italian, German
4. **Revenue model**: Free forever? Or freemium with premium features (exclusive content, priest video chats, etc.)? Keep pricing ethical — no "pay to pray"
5. **Platform expansion**: Mobile apps (React Native/Expo) instead of just web PWA?
6. **Data retention**: How long to keep messages? Notes? Auto-delete after N years? Let user choose?

---

## Success Metrics

- **User growth**: 1,000 active users in first 6 months
- **Engagement**: Avg 3+ conversations/week per user
- **Retention**: 40% monthly retention (W1 → W4)
- **Faith impact** (survey questions):
  - _"_Do you feel more connected to your Catholic faith? (1–5)_"
  - _"_Have you attended Mass more often since using the app? (yes/no/same)_"
  - Net Promoter Score > 50

---

## Roadmap

**Phase 1 — MVP (Now)**
- Basic chat with notes
- Google OAuth
- Deploy to Cloudflare
- Share with 50 beta testers

**Phase 2 — Polish (Month 2–3)**
- Conversation history page
- Better prompt engineering (more Scripture, Catechism)
- Accessibility audit & fixes
- PWA installation
- Documentation and translation framework

**Phase 3 — Growth (Month 4–6)**
- Multi-language (Spanish)
- Youth minister dashboard (view aggregated insights, anonymized)
- Export data (JSON/PDF)
- Advanced features: guided prayers, examination of conscience, rosary guide
- Marketing: TikTok, Instagram Reels, Catholic influencer partnerships

**Phase 4 — Scale (Month 7–12)**
- Mobile apps (iOS/Android)
- Integration with Donate/Confession finder APIs
- Community features (anonymized prayer groups)
- Advanced analytics dashboard for diocese partners
- Explore offline-first mode

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| AI provides heretical/inaccurate teaching | Medium | High | - Strict system prompt with boundaries<br>- Post-response validator agent<br>- Manual review of random 5%<br>- Public issue tracker for corrections |
| User attempts self-harm or harm of others | Low | Critical | - Content moderation layer<br>- Immediate escalation to crisis resources (988)<br>- Clear terms that app is not emergency care |
| Data breach exposing private spiritual struggles | Low | High | - Cloudflare security best practices<br>- Encryption at rest and in transit<br>- Minimal data collection<br>- Regular penetration testing |
| LLM costs exceed budget | Medium | Medium | - Monitor per-user monthly cost<br>- Implement usage caps<br>- Cache frequent Q&A<br>- Switch to cheaper/more efficient models (e.g. Claude Haiku) |
| Low adoption by target demographic | High | Medium | - Co-design with teens/young adults<br>- Youth minister testimonials<br>- TikTok/Instagram marketing<br>- Gamification elements (badges, streaks) |
| Negative press: "AI replaces priests" | Medium | Medium | - Messaging: "Complements, doesn't replace"<br>- Highlight sacramental importance<br>- Partner with youth priests for endorsements |

---

## Appendix: Sample Conversations

### Scenario 1: Question about Masturbation

```
User: Is masturbation a sin? I'm 16 and struggle with this.

Spirit: That's a really honest question, and I'm glad you asked. The Catholic Church teaches that masturbation is disordered because it seeks sexual pleasure outside of the unitive and procreative meaning of the marital act. [CCC 2352]

But I also want you to know: many, many Catholics — including saints — have struggled with this. You're not alone, and you're not "damaged" or "beyond hope."

Practical steps:
1. Frequent confession — the Sacrament of Reconciliation gives us grace to grow.
2. Find an accountability partner (a trusted friend or youth minister).
3. Replace the habit with something life-giving: sports, music, serving others.
4. Be gentle with yourself. God's mercy is bigger than any struggle.

Want to talk more about why the Church teaches this, or about confession?
```

### Scenario 2: Loss & Doubt

```
User: My little brother died last month. I don't believe in God anymore. Why would He let this happen?

Spirit: I'm so deeply sorry for your loss. There's no adequate answer to "why" when faced with the death of someone so young. Many faithful people — Job, Mother Teresa, the Our Lady of Sorrows — have sat with that same anguish.

What I can offer is this: God does not cause suffering. But He entered into it with us. Jesus on the cross cried out: "My God, my God, why have you forsaken me?" He knows abandonment. He knows your pain.

I don't expect you to "feel better" right now. But I'm here to sit with you in the mess. Would it help to talk about your brother? Or about how your faith community is responding?
```

### Scenario 3: Discernment

```
User: I think I might be called to be a priest. How do I know for sure?

Spirit: That's an incredible gift to be discerning. The call to priesthood, like every vocation, is a journey — usually not a lightning bolt, but a gradual clarity over years.

Here's a good start:
1. Talk to your priest or vocation director. They can guide you through the process.
2. Try daily Mass if you're not already. See if it feeds you.
3. Experiment with service: visit a nursing home, serve at a soup kitchen. Do you find joy in leading others to God?
4. Read: "The Discernment of Vocation" by Fr. Larry Richards (free PDF online).

Remember: you can't "ruin" your future by exploring. If you're called to priesthood, the desire will grow. If not, it will fade, and you'll be free to discern marriage with clarity.

I'm praying for your discernment. Keep me posted?
```