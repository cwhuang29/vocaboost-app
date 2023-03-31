module.exports = ({ config }) => {
  console.log('-----------------------------------');
  console.log(`Start compiling app ${config.name}!`);
  console.log(config);
  console.log('-----------------------------------');

  return {
    ...config,
    ios: { ...config.ios, googleServicesFile: process.env.GOOGLE_SERVICES_IOS },
  };
};
