const logger = (...messages) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(new Date(), ...messages);
  }
};

export default logger;
