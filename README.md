# Base 42

Base 42 is a modern, full-stack starter codebase designed to help you quickly launch web applications on Cloudflare's global infrastructure. It combines the best tools and practices to create a fast, scalable, and type-safe development experience.

## 🚀 What is Base 42?

Base 42 provides everything you need to build and deploy modern web applications:

- **Full-Stack TypeScript**: End-to-end type safety from the database to the frontend
- **Lightning Fast Performance**: Built with Astro for optimal performance and minimal JavaScript
- **Modern Authentication**: Google OAuth integration with secure session management
- **Global Deployment**: Deploy instantly to Cloudflare's global network
- **Developer Experience**: Hot reload, TypeScript support, and modern tooling

## 📁 Project Structure

```
base42/
├── apps/
│   ├── worker/          # Hono API server with D1 database
│   │   ├── src/         # API source code
│   │   ├── db/          # Database schemas and migrations
│   │   └── wrangler.toml # Cloudflare Worker config
│   └── web/             # Astro web app with Tailwind CSS
│       ├── src/
│       │   ├── pages/   # Astro pages
│       │   ├── layouts/ # Page layouts
│       │   └── styles/  # Global styles
│       ├── public/      # Static assets
│       └── astro.config.mjs # Astro configuration
├── packages/            # Shared packages (future)
├── scripts/             # Development and deployment scripts
├── prd.md              # Product Requirements Document
├── tasks.md            # Implementation tasks
└── README.md           # This file
```

## 🛠️ Technology Stack

### Backend
- **[Hono](https://hono.dev/)**: Fast and lightweight web framework
- **[Cloudflare Workers](https://workers.cloudflare.com/)**: Serverless compute platform
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)**: SQLite database at the edge
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe development

### Frontend
- **[Astro](https://astro.build/)**: Modern static site builder with island architecture
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe frontend development

### DevOps & Deployment
- **[Bun](https://bun.sh/)**: All-in-one JavaScript runtime and package manager
- **[Turbo](https://turbo.build/)**: Monorepo build system
- **[Cloudflare Pages](https://pages.cloudflare.com/)**: Static site hosting with CI/CD

### Authentication
- **Google OAuth 2.0**: Secure third-party authentication
- **JWT-based Sessions**: Secure token-based session management

## 🏁 Quick Start

### Prerequisites

Before you begin, ensure you have:

1. **[Bun](https://bun.sh/)** installed (recommended) or Node.js 24+
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **[Cloudflare CLI](https://developers.cloudflare.com/workers/wrangler/install/)** (Wrangler)
   ```bash
   bunx wrangler login
   ```

3. A **[Cloudflare account](https://cloudflare.com/)**

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd base42

# Install all dependencies
bun install
```

### Step 2: Environment Setup

```bash
# Create environment file from template
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# URLs (adjust if needed)
FRONTEND_URL=http://localhost:4321
WORKER_URL=http://localhost:8787
```

### Step 3: Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add these authorized redirect URIs:
   - `http://localhost:8787/auth/google/callback` (development)
   - `https://your-worker-url.workers.dev/auth/google/callback` (production)

### Step 4: Database Setup

```bash
# Create development database
bun run db:create

# Run database migrations
bun run db:migrate

# (Optional) Seed with sample data
bun run db:seed
```

### Step 5: Run the Application

```bash
# Start both API and web app
bun run dev

# Or start individually
bun run dev:worker  # API server on http://localhost:8787
bun run dev:web     # Web app on http://localhost:4321
```

Visit http://localhost:4321 to see your application!

## 📝 Available Scripts

### Development

```bash
bun run dev              # Start all apps with Turbo
bun run dev:all          # Start all apps with concurrently
bun run dev:worker       # Start Worker API only (port 8787)
bun run dev:web          # Start Web app only (port 4321)

# Using helper script
./scripts/dev.sh all     # Start all services
./scripts/dev.sh worker  # Start API only
./scripts/dev.sh web     # Start web app only
```

### Build & Deploy

```bash
# Build for production
bun run build            # Build all apps
bun run build:worker     # Build Worker API
bun run build:web        # Build web app

# Deploy
bun run deploy           # Deploy to production
bun run deploy:worker    # Deploy Worker API
bun run deploy:web       # Deploy web app (manual setup required)
```

### Code Quality

```bash
bun run lint             # Lint all apps
bun run lint:fix         # Auto-fix linting issues
bun run type-check       # Type check all apps
```

### Database Management

```bash
bun run db:create        # Create development database
bun run db:migrate       # Run database migrations
bun run db:seed          # Seed database with sample data
bun run db:reset         # Reset database (migrate + seed)

# Production database
bun run db:create:prod   # Create production database
bun run db:migrate:prod  # Migrate production database
```

### Utilities

```bash
bun run clean:build      # Clean build artifacts
bun run preview:web      # Preview built web app locally
bun run setup            # First-time setup helper
```

## 🌍 Deployment Guide

### Option 1: Automated Deployment Script (Recommended)

The easiest way to deploy is using the provided deployment script:

```bash
# Deploy to staging
./scripts/deploy.sh staging

# Deploy to production
./scripts/deploy.sh production
```

### Option 2: Manual Deployment

#### Deploying the Worker API

1. **Development/Staging**:
   ```bash
   bun run deploy:worker:staging
   ```

2. **Production**:
   ```bash
   bun run deploy:worker
   ```

#### Deploying the Web App

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: `cd apps/web && bun run build`
   - **Build output directory**: `apps/web/dist`
   - **Root directory**: `/`
5. Set environment variables in Cloudflare Pages dashboard:
   - `PUBLIC_WORKER_API_URL`: Your deployed Worker URL
6. Deploy on push to main branch

#### Environment Variables

Before deploying, make sure to set these environment variables:

**For Worker API** (in Cloudflare Workers dashboard):
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `FRONTEND_URL`
- `WORKER_URL`

**For Web App** (in Cloudflare Pages dashboard):
- `PUBLIC_WORKER_API_URL`

## 🚦 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/google/url` | Generate Google OAuth URL |
| POST | `/auth/google/callback` | Handle OAuth callback |
| GET | `/auth/validate` | Validate session token |
| POST | `/auth/logout` | Logout user |

### Protected Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/me` | Get current user profile |
| GET | `/api/health` | Health check (protected) |

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Public health check |

## 🎨 Features

### ✅ Authentication System
- Google OAuth 2.0 integration
- Secure JWT-based session management
- Protected routes with middleware
- Automatic token refresh

### ✅ Modern Frontend
- Astro with island architecture for optimal performance
- Tailwind CSS for beautiful, responsive designs
- TypeScript for type-safe development
- SEO-friendly static site generation

### ✅ Backend API
- Hono framework for fast API development
- Cloudflare D1 database at the edge
- Type-safe API routes with TypeScript
- CORS enabled for frontend integration

### ✅ Developer Experience
- Hot reload during development
- Type checking and linting
- Monorepo with shared configurations
- Comprehensive deployment scripts

## 🔧 Configuration

### Database Schema

The application uses the following main tables:

- **`users`**: User accounts linked to Google OAuth
- **`sessions`**: Active authentication sessions
- **`profiles`**: Extended user profile information

### Customization

You can easily customize:

1. **Styling**: Modify Tailwind configuration in `apps/web/tailwind.config.mjs`
2. **API Routes**: Add new routes in `apps/worker/src/`
3. **Pages**: Create new Astro pages in `apps/web/src/pages/`
4. **Database Schema**: Update `apps/worker/db/schema.sql`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Ensure all linting and type checks pass:
   ```bash
   bun run lint
   bun run type-check
   ```
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a pull request with a clear description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- **Issues**: [Open an issue on GitHub](https://github.com/yourusername/base42/issues)
- **Discussions**: [Join our GitHub Discussions](https://github.com/yourusername/base42/discussions)
- **Email**: support@base42.dev

---

Made with ❤️ by the Base 42 team