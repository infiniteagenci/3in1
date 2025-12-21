#!/bin/bash

# Base 42 Deployment Script
# Usage: ./scripts/deploy.sh [staging|production]

set -e

# Get environment from first argument, default to staging
ENV=${1:-staging}

echo "🚀 Starting Base 42 deployment to $ENV environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    echo "🔍 Checking dependencies..."

    if ! command -v bun &> /dev/null; then
        print_error "Bun is not installed. Please install it first."
        exit 1
    fi

    if ! command -v wrangler &> /dev/null; then
        print_error "Wrangler is not installed. Please install it first."
        exit 1
    fi

    print_status "All dependencies are installed"
}

# Build all applications
build_apps() {
    echo "\n📦 Building applications..."

    # Build worker
    print_status "Building Worker API..."
    cd apps/worker
    bun run build
    cd ../..

    # Build web
    print_status "Building Web app..."
    cd apps/web
    bun run build
    cd ../..

    print_status "All applications built successfully"
}

# Deploy Worker
deploy_worker() {
    echo "\n☁️ Deploying Worker API..."

    cd apps/worker

    if [ "$ENV" = "production" ]; then
        bun run deploy:production
    else
        bun run deploy:staging
    fi

    cd ../..
    print_status "Worker API deployed successfully"
}

# Deploy Web App (manual instructions for Cloudflare Pages)
deploy_web() {
    echo "\n🌐 Deploying Web App..."

    if [ "$ENV" = "production" ]; then
        print_warning "Web app deployment to Cloudflare Pages requires manual setup:"
        echo "1. Go to https://dash.cloudflare.com/pages"
        echo "2. Connect your GitHub repository"
        echo "3. Configure build settings:"
        echo "   - Build command: cd apps/web && bun run build"
        echo "   - Build output directory: apps/web/dist"
        echo "   - Root directory: /"
        echo "4. Add environment variables for $ENV"
    else
        print_warning "For staging, use Cloudflare Pages preview deployments:"
        echo "1. Push your changes to a feature branch"
        echo "2. Cloudflare will automatically create a preview deployment"
    fi
}

# Run database migrations for production
run_migrations() {
    if [ "$ENV" = "production" ]; then
        echo "\n🗄️ Running database migrations..."
        bun run db:migrate:prod
        print_status "Database migrations completed"
    fi
}

# Main deployment flow
main() {
    check_dependencies

    if [ "$ENV" = "production" ]; then
        echo "\n🟡 PRODUCTION DEPLOYMENT CONFIRMED"
        read -p "Are you sure you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Deployment cancelled."
            exit 1
        fi
    fi

    build_apps

    if [ "$ENV" = "production" ]; then
        run_migrations
    fi

    deploy_worker
    deploy_web

    echo "\n🎉 Deployment completed successfully!"
    echo "\n📝 Next steps:"
    if [ "$ENV" = "production" ]; then
        echo "- Worker API: https://base42-worker.your-subdomain.workers.dev"
        echo "- Web App: Configure in Cloudflare Pages dashboard"
    else
        echo "- Worker API: https://base42-worker-staging.your-subdomain.workers.dev"
        echo "- Web App: Check Cloudflare Pages for preview deployment"
    fi
}

# Run the deployment
main