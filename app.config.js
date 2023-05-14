const IS_DEV = process.env.APP_VARIANT === 'development';

const IS_PREV = process.env.APP_VARIANT === 'preview';

module.exports = ({ config }) => ({
  ...config,
  ...(IS_DEV && { name: 'VocaBoost (dev)' }),
  ...(IS_PREV && { name: 'VocaBoost (prev)' }),
  ios: {
    ...config.ios,
    ...(IS_DEV && { bundleIdentifier: 'dev.vocaboost.com' }),
    ...(IS_PREV && { bundleIdentifier: 'prev.vocaboost.com' }),
    googleServicesFile: process.env.GOOGLE_SERVICES_IOS, // Should match the eas secret key
  },
  android: {
    ...config.android,
    // Error: Execution failed for task ':app:processReleaseGoogleServices'. No matching client found for package name 'dev.vocaboost.com'
    // ...(IS_DEV && { package: 'dev.vocaboost.com' }),
    googleServicesFile: process.env.GOOGLE_SERVICES_ANDROID,
  },
});
