// Jest global setup — runs before test modules are imported.
// babel-preset-expo inlines EXPO_PUBLIC_* vars at transform time, so a test
// key must exist in process.env before apiConfig.ts is first required.
process.env.EXPO_PUBLIC_TMDB_API_KEY = 'test-api-key';

global.__DEV__ = true;

// Keep the service layer on globalThis.fetch so tests can mock network calls;
// the native Nitro module is unavailable in the jest runtime anyway.
jest.mock('react-native-nitro-fetch', () => {
  throw new Error('nitro-fetch is not available in tests');
});

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
