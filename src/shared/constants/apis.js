const apis = {
  HOST: 'https://api.vocabularyboost.com',
  OFFICAIL_HOME_PAGE: 'https://www.vocabularyboost.com',
  V1: {
    ME: '/v1/users/me',
    LOGIN: '/v1/login',
    LOGOUT: '/v1/logout',
    SETTING: '/v1/users/setting',
    SETTING_COLLECTED_WORDS: '/v1/users/setting/collected-words',
  },
};

export default apis;

export const REQ_RETRY_COUNT = 3;

export const ALLOWED_RETRY_ENDPOINTS = [apis.V1.LOGIN, apis.V1.ME];
