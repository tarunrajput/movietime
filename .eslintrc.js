module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  overrides: [
    {
      files: ['jest.setup.js', '__tests__/**'],
      env: {
        jest: true,
      },
    },
  ],
};
