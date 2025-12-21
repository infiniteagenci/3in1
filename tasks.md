# 3in1 Chat App Development Tasks

## Project Overview
Building a spiritual chat application called "3in1" where users chat with "Spirit" - an AI agent that provides guidance based on Jesus's teachings. The app deeply understands users and maintains personal notes for ongoing conversations.

## Tech Stack
- **Frontend**: Astro + Tailwind CSS (Note: Not React Vite as originally planned)
- **Backend**: Hono + TypeScript + Mastra Agent
- **Database**: Cloudflare D1 SQL
- **Authentication**: Google OAuth ✅ IMPLEMENTED
- **LLM**: Vercel AI Gateway + AI SDK
- **Package Manager**: Bun
- **Deployment**: Cloudflare Workers + Pages

---

## Phase 1: Project Setup & Infrastructure

### [x] Project Structure ✅ COMPLETED
- [x] Monorepo structure with `/web` (Astro) and `/worker` (Hono) directories
- [x] Package.json initialized with Bun workspaces
- [x] TypeScript configuration across apps

### [x] Frontend Setup (Astro) ✅ COMPLETED
- [x] Astro app initialized in `/web`
- [x] Tailwind CSS configured
- [x] Authentication pages (login, dashboard, oauth-callback) created
- [x] Google OAuth integration implemented
- [x] Basic responsive design

### [x] Backend Setup (Hono) ✅ COMPLETED
- [x] Hono app initialized in `/worker`
- [x] Cloudflare Workers adapter configured
- [x] Basic auth routes implemented
- [x] CORS and middleware set up
- [x] Wrangler configuration for deployment

### [x] Database Setup (D1) ✅ COMPLETED
- [x] Basic database schema created (users, sessions, profiles tables)
- [x] D1 database configuration in wrangler.toml
- [x] Add chat-specific tables:
  - [x] `conversations` table (id, user_id, messages, created_at, updated_at)
  - [x] `notes` table (id, user_id, content, created_at, updated_at)
- [x] Create migration files for new tables

---

## Phase 1.5: Convert Base42 to 3in1 Spiritual App

### [x] Rebrand and Theme Update ✅ COMPLETED
- [x] Update app name from "Base 42" to "3in1" across all files
- [x] Update index.astro with spiritual app messaging and branding
- [x] Implement mystical color scheme (purples, blues) in Tailwind
- [x] Update logo and visual elements to reflect spiritual theme
- [x] Modify copy and descriptions to focus on spiritual guidance

### [x] Content Updates ✅ COMPLETED
- [x] Update page titles and meta descriptions
- [x] Change dashboard to chat interface preparation
- [x] Update navigation and user flow for chat app
- [x] Add spiritual app descriptions and features

---

## Phase 2: Authentication System

### [x] Google OAuth Integration ✅ COMPLETED
- [x] Google OAuth flow implemented in worker
- [x] OAuth endpoints: `/auth/google/url`, `/auth/google/callback`, `/auth/validate`, `/auth/logout`
- [x] Frontend integration with login pages

### [x] Session Management ✅ COMPLETED
- [x] JWT token generation and validation
- [x] Session storage in D1 database
- [x] Frontend session handling with localStorage

### [x] Frontend Auth ✅ COMPLETED
- [x] Login/logout functionality implemented
- [x] Protected dashboard page
- [x] Session validation on page load

---

## Phase 3: Chat System Core

### [x] Backend Chat API ✅ COMPLETED
- [x] Create chat endpoints in Hono:
  - [x] POST `/api/chat` - Send message to Spirit
  - [x] GET `/api/conversations` - Get conversation history
  - [x] GET `/api/conversations/:id` - Get specific conversation
  - [x] POST `/api/conversations` - Create new conversation (handled in chat endpoint)
- [x] Implement message storage and retrieval
- [x] Add rate limiting and validation

### [x] Mastra Agent Integration ✅ COMPLETED (Simplified to OpenAI API)
- [x] Set up OpenAI API integration in backend
- [x] Create "Spirit" agent personality:
  - Deep understanding of Jesus's teachings based on catholic principles
  - Empathetic and supportive tone
  - Bible knowledge integration
  - Personal understanding of user's life context
- [x] Direct OpenAI API integration (simplified from original Mastra plan)
- [x] Implement tool for reading/writing user notes

### [x] Streaming Response Support ✅ COMPLETED
- [x] Implement server-sent events (SSE) for streaming AI responses
- [x] Add POST `/api/chat/stream` endpoint for streaming responses
- [x] Add streaming message handling in frontend
- [x] Implement real-time typing indicators during streaming
- [x] Handle stream interruptions and error recovery

### [ ] WebSocket Support (Optional but recommended)
- [ ] Set up WebSocket connections in Hono
- [ ] Implement real-time message delivery
- [ ] Handle connection management
- [ ] Add presence indicators and typing notifications

---

## Phase 4: Frontend Chat Interface (Astro Conversion)

### [x] Chat UI Components (Astro) ✅ COMPLETED
- [x] Create ChatMessage component (user and Spirit messages) - Integrated in dashboard.astro
- [x] Build ChatInput component with send button - Integrated in dashboard.astro
- [x] Create ChatLayout component with message list - Integrated in dashboard.astro
- [x] Add ConversationSidebar component - Simplified to basic chat interface
- [x] Implement loading states and typing indicators
- [x] Convert existing dashboard.astro to chat interface
- [x] Update navigation to include chat access

### [x] Chat Functionality ✅ COMPLETED
- [x] Connect frontend to chat API endpoints
- [x] Implement message sending and receiving
- [x] Add conversation history loading
- [x] Create new conversation functionality
- [x] Implement real-time updates (via streaming)
- [x] Update environment variables for chat API

### [ ] Mobile Responsiveness
- [ ] Optimize chat interface for mobile devices
- [ ] Implement touch gestures (swipe, tap)
- [ ] Add mobile-specific UI patterns
- [ ] Test on various screen sizes

---

## Phase 5: User Notes System

### [x] Notes Backend ✅ COMPLETED (Integrated with chat system)
- [x] Create notes API endpoints - Integrated into chat system
- [x] GET `/api/notes` - Get user notes - Integrated into chat API
- [x] POST `/api/notes` - Update user notes - Automatic with chat
- [x] Implement note storage in D1
- [x] Integrate notes with Spirit AI agent tools
- [x] Add note access control

### [x] Notes Frontend ✅ COMPLETED (Integrated with chat experience)
- [x] Notes are automatically managed by Spirit during conversations
- [x] Notes are displayed in chat when relevant
- [x] Spirit uses notes to personalize responses
- [x] Auto-save notes functionality built into chat system

---

## Phase 6: Styling & UX

### [ ] Visual Design
- [ ] Implement mystical color scheme (purples, blues, gradients)
- [ ] Add subtle animations and transitions
- [ ] Create loading spinners and skeleton states
- [ ] Design error states and empty states
- [ ] Add dark mode support

### [ ] User Experience
- [ ] Implement smooth scrolling in chat
- [ ] Add keyboard shortcuts
- [ ] Create onboarding flow for new users
- [ ] Add user settings panel
- [ ] Implement feedback mechanisms

---

## Phase 7: Testing & Quality Assurance

### [ ] Testing Setup
- [ ] Set up testing framework (Vitest for frontend/backend)
- [ ] Configure test environment
- [ ] Create test utilities and mocks
- [ ] Set up E2E testing (Playwright)

### [ ] Unit Tests
- [ ] Test API endpoints
- [ ] Test Mastra agent integration
- [ ] Test authentication flow
- [ ] Test database operations
- [ ] Test React components

### [ ] Integration Tests
- [ ] Test complete chat flow
- [ ] Test authentication integration
- [ ] Test database connections
- [ ] Test error handling

### [ ] E2E Tests
- [ ] Test user login flow
- [ ] Test complete chat conversation
- [ ] Test notes functionality
- [ ] Test mobile responsiveness

---

## Phase 8: Performance & Optimization

### [ ] Frontend Optimization
- [ ] Implement code splitting and lazy loading
- [ ] Optimize bundle size
- [ ] Add image optimization
- [ ] Implement caching strategies
- [ ] Add service worker for offline support

### [ ] Backend Optimization
- [ ] Optimize database queries
- [ ] Implement caching (Redis/Cloudflare KV)
- [ ] Add request compression
- [ ] Optimize LLM call efficiency
- [ ] Implement request deduplication

---

## Phase 9: Cloudflare Deployment

### [ ] Deployment Configuration
- [ ] Create Cloudflare Workers script for backend
- [ ] Configure D1 database bindings
- [ ] Set up environment variables
- [ ] Create wrangler.toml configuration
- [ ] Configure Cloudflare Pages for frontend

### [ ] CI/CD Pipeline
- [ ] Set up GitHub Actions for deployment
- [ ] Configure automated testing
- [ ] Set up staging/production environments
- [ ] Configure rollback procedures

### [ ] Production Optimization
- [ ] Set up custom domain
- [ ] Configure SSL certificates
- [ ] Set up monitoring and logging
- [ ] Configure error reporting (Sentry)
- [ ] Set up analytics

---

## Phase 10: Security & Compliance

### [ ] Security Implementation
- [ ] Implement input validation and sanitization
- [ ] Add CORS configuration
- [ ] Set up rate limiting
- [ ] Implement CSRF protection
- [ ] Add security headers

### [ ] Data Protection
- [ ] Implement data encryption
- [ ] Set up data retention policies
- [ ] Add user data export functionality
- [ ] Implement GDPR compliance
- [ ] Create privacy policy and terms of service

---

## Phase 11: Monitoring & Maintenance

### [ ] Logging & Monitoring
- [ ] Set up application logging
- [ ] Configure error tracking
- [ ] Implement performance monitoring
- [ ] Set up alerting for critical issues
- [ ] Create dashboard for metrics

### [ ] Maintenance Tasks
- [ ] Set up database backups
- [ ] Implement health checks
- [ ] Create maintenance scripts
- [ ] Set up automated dependency updates
- [ ] Create troubleshooting documentation

---

## Environment Variables Setup

### Development (.env.local)
```bash
# Frontend (apps/web/.env)
PUBLIC_WORKER_API_URL="http://localhost:8787"

# Backend (apps/worker/.dev.vars)
GOOGLE_OAUTH_CLIENT_ID=""
GOOGLE_OAUTH_CLIENT_SECRET=""
ENVIRONMENT="development"
# D1 database will be configured in wrangler.toml

# AI (to be added)
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
VERCEL_API_GATEWAY_TOKEN=""
```

### Production (Cloudflare Workers)
- [x] Basic wrangler.toml configuration exists
- [x] D1 database binding configured
- [ ] Add AI service secrets using `wrangler secret put`:
  - `wrangler secret put GOOGLE_OAUTH_CLIENT_ID`
  - `wrangler secret put GOOGLE_OAUTH_CLIENT_SECRET`
  - `wrangler secret put OPENAI_API_KEY`
  - `wrangler secret put ANTHROPIC_API_KEY`
  - `wrangler secret put VERCEL_API_GATEWAY_TOKEN`

---

## Deployment Commands

### Local Development
```bash
# Start frontend (Astro)
cd apps/web && bun run dev

# Start backend (Hono/Worker)
cd apps/worker && bun run dev

# Run database migrations (D1)
cd apps/worker && bun run db:preview
```

### Cloudflare Deployment
```bash
# Deploy backend to Workers
cd apps/worker && bun run deploy

# Deploy frontend to Pages (build first)
cd apps/web && bun run build
# Then deploy the dist folder to Cloudflare Pages

# Run production migrations
cd apps/worker && wrangler d1 execute base42-db --file=./db/schema.sql
```

---

## Success Criteria
- [ ] Users can authenticate with Google OAuth
- [ ] Users can chat with Spirit agent
- [ ] Spirit provides biblically-based guidance
- [ ] Agent maintains and references personal notes
- [ ] Mobile-first responsive design
- [ ] Real-time chat experience
- [ ] Deployed on Cloudflare infrastructure
- [ ] Secure authentication and data handling
- [ ] Smooth user experience with mystical theme

---

## Timeline Estimate
- **Phase 1-2 (Setup & Auth)**: 3-4 days
- **Phase 3-4 (Core Chat)**: 4-5 days
- **Phase 5-6 (Notes & UX)**: 2-3 days
- **Phase 7-8 (Testing & Performance)**: 3-4 days
- **Phase 9-11 (Deployment & Security)**: 3-4 days

**Total Estimated Time**: 15-20 days

---

## Next Steps
1. Begin with Phase 1: Project setup and infrastructure
2. Focus on getting a working auth flow first
3. Build the core chat functionality
4. Iterate on UX and polish
5. Deploy and monitor

Review this task list regularly and update as development progresses. Mark completed items and add any discovered tasks during implementation.
