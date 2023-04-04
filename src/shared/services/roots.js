// eslint-disable-next-line import/no-unresolved
import { BACKEND_URL } from '@env';

import { STORAGE_AUTH_TOKEN } from 'shared/constants/storage';
import storage from 'shared/storage';

import axios from 'axios';

const httpConfig = {
  baseURL: BACKEND_URL,
  withCredentials: true, // Indicates whether or not cross-site Access-Control requests should be made using credentials
  xsrfHeaderName: 'X-CSRF-Token', // the name of the http header that carries the xsrf token value
  xsrfCookieName: 'csrftoken', // The name of the cookie to use as a value for xsrf token
  timeout: 30000, // If the request takes longer than `timeout`, the request will be aborted (Error: timeout of 1000ms exceeded)
  transformResponse: [data => ({ ...JSON.parse(data) /* , timeStamp: new Date() */ })], // Changes to the response to be made before it is passed to then/catch
  headers: { 'X-VH-Source': 'mobile' }, // Custom headers to be sent
};

const fetch = axios.create(httpConfig);

const beforeReqIsSend = async config => {
  const token = await storage.getData(STORAGE_AUTH_TOKEN);
  if (token) {
    Object.assign(config.headers, { ...config.headers, Authorization: `Bearer ${token}` });
  }
  return config;
};

fetch.interceptors.request.use(beforeReqIsSend);

export default fetch;
