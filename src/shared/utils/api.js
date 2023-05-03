import apis from 'shared/constants/apis';

export const getBaseURL = () => {
  return __DEV__ ? apis.LOCAL_HOST : apis.HOST;
};
