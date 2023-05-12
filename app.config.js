module.exports = ({ config }) => ({
  ...config,
  ios: { ...config.ios, googleServicesFile: process.env.GOOGLE_SERVICES_IOS }, // Should match the eas secret key
  android: { ...config.android, googleServicesFile: process.env.GOOGLE_SERVICES_ANDROID },
});
