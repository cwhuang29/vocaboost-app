// eslint-disable-next-line import/no-unresolved
import { BACKEND_URL } from '@env';

import { STORAGE_LOGIN_INFO } from 'shared/constants/storage';
import logger from 'shared/utils/logger';

import axios from 'axios';

const httpConfig = {
  baseURL: BACKEND_URL,
  withCredentials: true, // Indicates whether or not cross-site Access-Control requests should be made using credentials
  xsrfHeaderName: 'X-CSRF-Token', // the name of the http header that carries the xsrf token value
  xsrfCookieName: 'csrftoken', // The name of the cookie to use as a value for xsrf token
  timeout: 30000, // If the request takes longer than `timeout`, the request will be aborted (Error: timeout of 1000ms exceeded)
  headers: { 'X-VH-Source': 'mobile' }, // Custom headers to be sent
  transformResponse: [data => ({ ...JSON.parse(data) /* , timeStamp: new Date() */ })], // Changes to the response to be made before it is passed to then/catch
};

const fetch = axios.create(httpConfig);

const beforeReqIsSent = async config => {
  const newConfig = config;
  const loginData = await storage.getData(STORAGE_LOGIN_INFO);

  newConfig.headers['X-VH-Auth'] = loginData || '';
  logger(`Request is about to send. Config: ${newConfig}`);
  return newConfig;
};
fetch.interceptors.request.use(beforeReqIsSent);

export default fetch;
