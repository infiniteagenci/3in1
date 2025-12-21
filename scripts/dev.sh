#!/bin/bash

# Base 42 Development Script
# Usage: ./scripts/dev.sh [worker|web|all]

set -e

# Get target from first argument, default to all
TARGET=${1:-all}

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_header() {
    echo -e "${BLUE}🔧 Base 42 Development Environment${NC}"
    echo -e "${BLUE}=====================================${NC}"
}

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# Check if environment file exists
check_env() {
    if [ ! -f .env ]; then
        echo -e "${YELLOW}⚠${NC} .env file not found!"
        echo "Please copy .env.example to .env and configure your credentials:"
        echo "  cp .env.example .env"
        echo ""
        echo "Required variables:"
        echo "  - GOOGLE_OAUTH_CLIENT_ID"
        echo "  - GOOGLE_OAUTH_CLIENT_SECRET"
        echo ""
        exit 1
    fi
}

# Install dependencies
install_deps() {
    print_status "Installing dependencies..."
    bun install
    print_status "Dependencies installed"
}

# Setup database
setup_db() {
    print_status "Setting up database..."

    # Check if database exists
    cd apps/worker
    if ! wrangler d1 list | grep -q "base42-db-dev"; then
        print_info "Creating D1 database..."
        wrangler d1 create base42-db-dev
    fi

    # Run migrations
    print_status "Running database migrations..."
    wrangler d1 execute base42-db-dev --file=./db/schema.sql

    cd ../..
    print_status "Database setup completed"
}

# Start development servers
start_dev() {
    case $TARGET in
        "worker")
            print_info "Starting Worker API on http://localhost:8787"
            cd apps/worker
            bun run dev
            ;;
        "web")
            print_info "Starting Web app on http://localhost:3000"
            print_info "Make sure Worker API is running on http://localhost:8787"
            cd apps/web
            bun run dev
            ;;
        "all")
            print_info "Starting all services..."
            print_info "Worker API: http://localhost:8787"
            print_info "Web app: http://localhost:3000"
            echo ""
            print_info "Press Ctrl+C to stop all services"
            bun run dev:all
            ;;
        *)
            echo "Invalid target: $TARGET"
            echo "Usage: $0 [worker|web|all]"
            exit 1
            ;;
    esac
}

# Main function
main() {
    print_header

    # Check requirements
    check_env

    # Parse command line arguments
    case "$1" in
        "setup")
            install_deps
            setup_db
            print_status "Development environment setup complete!"
            echo ""
            print_info "To start development:"
            echo "  bun run dev:all    # Start all services"
            echo "  bun run dev:worker # Start Worker API only"
            echo "  bun run dev:web    # Start Web app only"
            exit 0
            ;;
        "help"|"-h"|"--help")
            echo "Base 42 Development Script"
            echo ""
            echo "Usage:"
            echo "  $0 [worker|web|all|setup|help]"
            echo ""
            echo "Commands:"
            echo "  worker     Start Worker API only (http://localhost:8787)"
            echo "  web        Start Web app only (http://localhost:3000)"
            echo "  all        Start all services (default)"
            echo "  setup      Install dependencies and setup database"
            echo "  help       Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0 setup   # Initial setup"
            echo "  $0 all     # Start development"
            echo "  $0 worker  # Start API only"
            exit 0
            ;;
    esac

    # For any other command, start development servers
    start_dev
}

# Check if script is being sourced or executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi