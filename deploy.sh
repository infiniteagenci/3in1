#!/bin/bash

# 3in1 Spiritual App Deployment Script
# This script deploys both the worker (backend) and web app (frontend) to Cloudflare

set -e

echo "🚀 Starting deployment of 3in1 Spiritual App..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    print_error "Wrangler CLI is not installed. Please install it first:"
    print_error "npm install -g wrangler"
    exit 1
fi

# Check if user is logged in to Cloudflare
print_status "Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    print_warning "You need to login to Cloudflare first:"
    wrangler auth login
fi

# Deploy Worker (Backend)
print_status "Deploying 3in1 Worker API to Cloudflare..."
cd apps/worker

# Check if required environment variables are set
if ! wrangler secret list --env production | grep -q "OPENAI_API_KEY"; then
    print_warning "OPENAI_API_KEY secret not found. Please set it:"
    echo "wrangler secret put OPENAI_API_KEY"
fi

if ! wrangler secret list --env production | grep -q "GOOGLE_OAUTH_CLIENT_ID"; then
    print_warning "GOOGLE_OAUTH_CLIENT_ID secret not found. Please set it:"
    echo "wrangler secret put GOOGLE_OAUTH_CLIENT_ID"
fi

if ! wrangler secret list --env production | grep -q "GOOGLE_OAUTH_CLIENT_SECRET"; then
    print_warning "GOOGLE_OAUTH_CLIENT_SECRET secret not found. Please set it:"
    echo "wrangler secret put GOOGLE_OAUTH_CLIENT_SECRET"
fi

# Deploy to production
print_status "Deploying worker to production..."
bun run deploy

# Get worker URL
WORKER_URL=$(wrangler whoami | grep "Account" | awk '{print "https://3in1-worker." $2 ".workers.dev"}')
if [ -z "$WORKER_URL" ]; then
    WORKER_URL="https://3in1-worker.your-account.workers.dev"
fi

print_success "Worker deployed at: $WORKER_URL"

# Test worker
print_status "Testing worker deployment..."
if curl -s "$WORKER_URL/health" | grep -q '"status":"ok"'; then
    print_success "Worker health check passed ✅"
else
    print_error "Worker health check failed ❌"
fi

# Deploy Web App (Frontend)
print_status "Deploying 3in1 Web App to Cloudflare Pages..."
cd ../web

# Update environment variable in wrangler.toml
sed -i.bak "s|PUBLIC_WORKER_API_URL = .*|PUBLIC_WORKER_API_URL = \"$WORKER_URL\"|" wrangler.toml

# Build the app
print_status "Building web app..."
bun run build

# Deploy to production
print_status "Deploying to Cloudflare Pages..."
bun run deploy:pages:production

print_success "Web app deployed to Cloudflare Pages! ✅"

# Clean up temporary file
rm -f wrangler.toml.bak

# Return to root directory
cd ../

print_success "🎉 Deployment completed successfully!"
print_status "Your 3in1 Spiritual App is now live!"

echo ""
echo "📱 Your app is available at:"
echo "   • Worker API: $WORKER_URL"
echo "   • Web App: Check your Cloudflare Pages dashboard for the URL"
echo ""
echo "🔗 Next steps:"
echo "   1. Configure your custom domain in Cloudflare Pages dashboard"
echo "   2. Test the complete application flow"
echo "   3. Monitor logs with: cd apps/worker && bun run logs"
echo ""
echo "📚 For detailed deployment instructions, see DEPLOYMENT.md"