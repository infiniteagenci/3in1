# 3in1 Mobile App

A React Native mobile app built with Expo that replicates the features of the 3in1 spirituality web application.

## Features

- **Chat**: Real-time streaming chat with Spirit AI agent
- **Sacred Library**: Browse Catholic content (prayers, saints, catechism, etc.)
- **Prayers**: Quick access to prayers and spiritual practices
- **Profile**: User info, prayer progress, and settings

## Tech Stack

- React Native with Expo SDK 54
- TypeScript
- React Navigation
- Zustand (state management)
- Expo Secure Store (secure storage)
- Axios (API client)

## Getting Started

### Prerequisites

- Node.js >= 18
- Bun or npm
- Expo Go app on your device (for development)

### Installation

```bash
cd apps/mobile
bun install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Update the following variables:
- `API_BASE_URL`: Your worker app URL (e.g., `http://localhost:8787` for local development)
- `GOOGLE_WEB_CLIENT_ID`: Google OAuth client ID (for web-based OAuth with Expo)
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID`: Same as above (Expo convention)

### Running the App

#### Start Development Server

```bash
bun start
```

#### Run on Device

1. Install Expo Go on your phone
2. Scan the QR code shown in terminal
3. Or press `a` for Android emulator or `i` for iOS simulator

```bash
bun run android  # For Android emulator
bun run ios      # For iOS simulator
```

## Project Structure

```
src/
├── api/          # API integration (auth, chat, user, notes, suggestions)
├── components/   # Reusable UI components
│   ├── common/   # Button, Input, Card
│   └── chat/     # MessageBubble, ChatInput, SuggestionsAccordion, AgePromptModal
├── screens/      # Screen components
│   ├── Auth/     # LoginScreen
│   ├── Chat/     # ChatScreen
│   ├── Library/  # LibraryScreen
│   ├── Prayers/  # PrayersScreen
│   └── Profile/  # ProfileScreen
├── navigation/   # Navigation configuration
├── hooks/        # Custom React hooks
├── store/        # Zustand stores (state management)
├── utils/        # Theme, constants, validators
├── types/        # TypeScript definitions
└── data/         # Static data (Catholic content)
```

## API Endpoints

The app consumes APIs from the worker app:

- `POST /auth/google/callback` - Exchange Google auth code for session
- `GET /auth/validate` - Validate session token
- `POST /auth/logout` - Logout user
- `POST /api/chat/` - Send message (streaming)
- `GET /api/conversations/` - Get conversations
- `POST /api/user/profile` - Update user profile
- `GET /api/notes/` - Get user notes
- `POST /api/suggestions/` - Get conversation suggestions

## Authentication

The app uses Google Sign-in for authentication via Expo WebBrowser:

1. User taps "Continue with Google"
2. Opens Google OAuth in browser via WebBrowser
3. After auth, redirects back to app
4. Auth code is exchanged for session token
5. Token is stored securely in Expo SecureStore

## State Management

Zustand is used for state management:

- `authStore` - User authentication state
- `chatStore` - Chat messages and streaming state
- `prayerStore` - Prayer progress and check-in data

## Theme

The app uses a purple/blue gradient theme matching the web app:

- Primary: Purple (#9333ea)
- Accent: Blue (#2563eb)
- Background: Stone (#fafaf9)

## Building for Production

### Android

```bash
bun install -g eas-cli
eas build --platform android
```

### iOS

```bash
eas build --platform ios
```

## Troubleshooting

### Metro bundler issues

```bash
bun start --clear
```

### Clear cache

```bash
rm -rf node_modules
bun install
bun start --clear
```

### Port already in use

```bash
bun start --port 19001
```
