import apis, { ALLOWED_RETRY_ENDPOINTS, REQ_RETRY_COUNT } from 'shared/constants/apis';
import { HEADER_CSRF_TOKEN, HEADER_RETRY_COUNT, HEADER_SOURCE } from 'shared/constants/headers';
import { STORAGE_AUTH_TOKEN } from 'shared/constants/storage';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';

import axios from 'axios';

const httpConfig = {
  baseURL: apis.HOST,
  withCredentials: true, // Indicates whether or not cross-site Access-Control requests should be made using credentials
  xsrfHeaderName: HEADER_CSRF_TOKEN, // the name of the http header that carries the xsrf token value
  xsrfCookieName: 'csrftoken', // The name of the cookie to use as a value for xsrf token
  timeout: 30000, // If the request takes longer than `timeout`, the request will be aborted (Error: timeout of 1000ms exceeded)
  transformResponse: [data => ({ ...JSON.parse(data) /* , timeStamp: new Date() */ })], // Changes to the response to be made before it is passed to then/catch
  headers: { [HEADER_SOURCE]: 'mobile' }, // Custom headers to be sent
};

const fetch = axios.create(httpConfig);

const beforeReqIsSend = async config => {
  const token = await storage.getData(STORAGE_AUTH_TOKEN);

  if (token && !config.headers.Authorization) {
    Object.assign(config.headers, { ...config.headers, Authorization: `Bearer ${token}` });
  }
  logger(config);
  return config;
};

const respMiddleware = async err => {
  const { status } = err.response;
  const { url } = err.config;
  const tried = Number(err.config.headers[HEADER_RETRY_COUNT]) || 0;

  Object.assign(err.config.headers, { ...err.config.headers, [HEADER_RETRY_COUNT]: tried + 1 });
  if (status > 500 && tried < REQ_RETRY_COUNT && ALLOWED_RETRY_ENDPOINTS.includes(url)) {
    const resp = await fetch.request(err.config);
    return resp;
  }
  return Promise.reject(err);
};

fetch.interceptors.request.use(beforeReqIsSend);
fetch.interceptors.response.use(resp => resp, respMiddleware);

export default fetch;
