# 3in1 Spiritual App Deployment Guide

This guide will help you deploy the 3in1 spiritual chat app to Cloudflare Workers (backend) and Cloudflare Pages (frontend).

## Prerequisites

- Node.js 18+ and npm/yarn/bun
- Cloudflare account with Workers and Pages enabled
- Wrangler CLI installed globally: `npm install -g wrangler`
- Google OAuth credentials (Client ID and Secret)
- OpenAI API key (for the Spirit AI agent)

## Architecture Overview

- **Backend**: Cloudflare Worker at `https://3in1-worker.your-account.workers.dev`
- **Frontend**: Cloudflare Pages at your custom domain
- **Database**: Cloudflare D1 (SQLite)
- **Cache**: Cloudflare KV (optional, for caching)

## Step 1: Configure Cloudflare Authentication

Login to Cloudflare and authenticate Wrangler:

```bash
# Login to Cloudflare
wrangler auth login

# List your account details
wrangler whoami
```

## Step 2: Set Up D1 Database

Create and configure the D1 database:

```bash
# Navigate to worker directory
cd apps/worker

# Create production database
bun run db:create

# Create staging database
bun run db:create-staging

# Copy the database IDs from the output and update wrangler.toml
# with your actual database IDs
```

## Step 3: Set Up KV Namespace (Optional but Recommended)

Create a KV namespace for caching:

```bash
# Create KV namespace
bun run kv:create

# Copy the KV namespace ID from the output and update wrangler.toml
```

## Step 4: Configure Environment Variables and Secrets

### Production Secrets

Set up the required secrets for production:

```bash
# Navigate to worker directory
cd apps/worker

# Set OpenAI API key
wrangler secret put OPENAI_API_KEY

# Set Google OAuth Client ID
wrangler secret put GOOGLE_OAUTH_CLIENT_ID

# Set Google OAuth Client Secret
wrangler secret put GOOGLE_OAUTH_CLIENT_SECRET

# Set environment variable
wrangler secret put ENVIRONMENT --value="production"
```

### Development Variables

For development, create a `.dev.vars` file in the worker directory:

```bash
# apps/worker/.dev.vars
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id_here
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret_here
ENVIRONMENT=development
```

## Step 5: Database Setup and Migrations

Apply the database schema:

```bash
# Navigate to worker directory
cd apps/worker

# Create database tables (production)
wrangler d1 execute 3in1-db --file=./db/schema.sql

# Or run migrations if you have migration files
bun run db:migrate

# Seed the database with initial data (development)
bun run db:seed
```

## Step 6: Deploy the Worker API

Deploy the backend worker to Cloudflare Workers:

```bash
# Navigate to worker directory
cd apps/worker

# Deploy to production
bun run deploy

# Deploy to staging
bun run deploy:staging

# Deploy to development (for testing)
bun run deploy:dev
```

Your worker will be available at:
- Production: `https://3in1-worker.your-account.workers.dev`
- Staging: `https://3in1-worker-staging.your-account.workers.dev`

## Step 7: Configure and Deploy the Frontend

### Update Environment Variables

Update the frontend wrangler.toml with your worker URLs:

```bash
# Edit apps/web/wrangler.toml
# Update the PUBLIC_WORKER_API_URL for each environment
```

### Deploy to Cloudflare Pages

```bash
# Navigate to web directory
cd apps/web

# Build the project
bun run build

# Deploy to production
bun run deploy:pages:production

# Deploy to staging
bun run deploy:pages:staging

# Deploy to preview
bun run deploy:pages:preview
```

## Step 8: Configure Custom Domain (Optional)

### For Cloudflare Pages

1. Go to Cloudflare Dashboard → Pages
2. Select your 3in1 project
3. Go to Settings → Custom Domains
4. Add your custom domain
5. Follow the DNS configuration steps

### For Cloudflare Workers

1. Go to Cloudflare Dashboard → Workers & Pages
2. Select your 3in1-worker
3. Go to Settings → Triggers
4. Add custom routes if needed

## Step 9: Configure Google OAuth

### Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to APIs & Services → Credentials
4. Create new OAuth 2.0 Client ID
5. Configure:
   - **Application type**: Web application
   - **Authorized redirect URIs**: `https://your-domain.com/oauth-callback`
   - **Authorized JavaScript origins**: `https://your-domain.com`

### Update OAuth Configuration

Update your production secrets with the actual Google OAuth credentials:

```bash
wrangler secret put GOOGLE_OAUTH_CLIENT_ID --value="your_actual_client_id"
wrangler secret put GOOGLE_OAUTH_CLIENT_SECRET --value="your_actual_client_secret"
```

## Step 10: Testing and Verification

### Test the APIs

```bash
# Test worker API endpoint
curl https://3in1-worker.your-account.workers.dev/

# Test health endpoint
curl https://3in1-worker.your-account.workers.dev/health

# Check logs for any issues
bun run logs
```

### Test the Frontend

1. Open your deployed frontend URL
2. Try logging in with Google OAuth
3. Test sending a message to Spirit
4. Verify the conversation is saved
5. Test the notes functionality

## Environment Configuration Summary

### Worker (Backend)
- **Production**: `https://3in1-worker.your-account.workers.dev`
- **Staging**: `https://3in1-worker-staging.your-account.workers.dev`
- **Development**: Local development with `bun run dev`

### Web App (Frontend)
- **Production**: Your custom domain or Cloudflare Pages URL
- **Staging**: Staging subdomain
- **Preview**: Preview subdomain

## Monitoring and Maintenance

### View Logs
```bash
# Production logs
bun run logs

# Staging logs
bun run logs:staging

# Real-time logs
wrangler tail --env production
```

### Database Operations
```bash
# Preview database content
bun run db:preview

# Execute custom queries
wrangler d1 execute 3in1-db --command "SELECT COUNT(*) FROM users" --env production
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your frontend URL is in the allowed origins
2. **Database Connection**: Check D1 database IDs are correct in wrangler.toml
3. **OAuth Failures**: Verify Google OAuth configuration and redirect URIs
4. **AI API Errors**: Check OpenAI API key and quota
5. **Build Failures**: Check for TypeScript errors and dependency issues

### Getting Help

1. Check Cloudflare Workers documentation
2. Review wrangler logs for detailed error messages
3. Test in staging environment before production deployment
4. Use `wrangler tail` for real-time debugging

## Security Considerations

1. Keep all secrets secure and never commit them to version control
2. Use HTTPS for all API communications
3. Implement proper rate limiting on sensitive endpoints
4. Regularly rotate API keys and secrets
5. Monitor logs for suspicious activity

## Rollback Procedures

If you need to rollback a deployment:

1. **Worker**: Deploy previous version with same command
2. **Pages**: Cloudflare Pages maintains previous deployments automatically
3. **Database**: Keep database backups before major changes

## Next Steps

1. Monitor your deployed application
2. Set up automated testing
3. Configure monitoring and alerting
4. Plan for scaling as your user base grows