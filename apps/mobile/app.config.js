export default {
  expo: {
    name: '3in1',
    slug: '3in1',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#fafaf9',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.infin.3in1',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#fafaf9',
      },
      package: 'com.infin.3in1',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: ['expo-secure-store'],
    extra: {
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8787',
      GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID || '',
    },
  },
};
