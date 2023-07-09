import apis from 'shared/constants/apis';

export const getBaseURL = () => (__DEV__ ? apis.LOCAL_HOST : apis.HOST);

export const getAnalyticsBaseURL = () => (__DEV__ ? apis.LOCAL_ANALYTICS_HOST : apis.ANALYTICS_HOST);
