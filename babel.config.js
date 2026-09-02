const presets = ['babel-preset-expo'];
const plugins = [];

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': './src',
    },
  },
]);

// NOTE: The Reanimated/Worklets Babel plugin is added automatically by
// babel-preset-expo since react-native-worklets is installed (SDK 57).

module.exports = {
  presets,
  plugins,
};
