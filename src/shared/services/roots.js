import { ALLOWED_RETRY_ENDPOINTS, REQ_RETRY_COUNT } from 'shared/constants/apis';
import { HEADER_CSRF_TOKEN, HEADER_PLATFORM, HEADER_RETRY_COUNT, HEADER_SOURCE } from 'shared/constants/headers';
import { getBaseURL } from 'shared/utils/api';
import { getDeviceInfo, getDevicePlatform } from 'shared/utils/devices';
import logger from 'shared/utils/logger';
import { getAuthToken } from 'shared/utils/storage';

import axios from 'axios';

const httpConfig = {
  baseURL: getBaseURL(),
  withCredentials: true, // Indicates whether or not cross-site Access-Control requests should be made using credentials
  xsrfHeaderName: HEADER_CSRF_TOKEN, // the name of the http header that carries the xsrf token value
  xsrfCookieName: 'csrftoken', // The name of the cookie to use as a value for xsrf token
  timeout: 30000, // If the request takes longer than `timeout`, the request will be aborted (Error: timeout of 1000ms exceeded)
  transformResponse: [data => ({ ...JSON.parse(data) /* , timeStamp: new Date() */ })], // Changes to the response to be made before it is passed to then/catch
  headers: { [HEADER_SOURCE]: 'mobile' }, // Custom headers to be sent
};

const fetch = axios.create(httpConfig);

const httpAnalyticsServerConfig = {
    baseURL: getBaseURL(),
    withCredentials: true, // Indicates whether or not cross-site Access-Control requests should be made using credentials
    xsrfHeaderName: HEADER_CSRF_TOKEN, // the name of the http header that carries the xsrf token value
    xsrfCookieName: 'csrftoken', // The name of the cookie to use as a value for xsrf token
    timeout: 30000, // If the request takes longer than `timeout`, the request will be aborted (Error: timeout of 1000ms exceeded)
    transformResponse: [data => ({ ...JSON.parse(data) /* , timeStamp: new Date() */ })], // Changes to the response to be made before it is passed to then/catch
    headers: { [HEADER_SOURCE]: 'mobile' }, // Custom headers to be sent
};

const fetchAnalyticsServer = axios.create(httpAnalyticsServerConfig);

const reqMiddleware = async config => {
  const [token, deviceInfo] = await Promise.all([getAuthToken(), getDeviceInfo()]);
  const platform = getDevicePlatform(deviceInfo);

  Object.assign(config.headers, { ...config.headers, [HEADER_PLATFORM]: platform });
  if (token && !config.headers.Authorization) {
    Object.assign(config.headers, { ...config.headers, Authorization: `Bearer ${token}` });
  }

  const msg = `(Axios) Method: ${config.method}. URL: ${config.baseURL}${config.url}. Headers: ${config.headers}. Payload: ${JSON.stringify(config.data)}`;
  logger(msg);
  return config;
};

const respMiddleware = async err => {
  if (err.code === 'ERR_NETWORK') {
    return Promise.reject(err);
  }
  const { status } = err.response;
  const { url } = err.config;
  const tried = (Number(err.config.headers[HEADER_RETRY_COUNT]) || 0) + 1;
  const allowedRetryEndpoint = ALLOWED_RETRY_ENDPOINTS.includes(url);

  const msg = `(Axios) Request failed. Status: ${status}. URL: ${url}. Has tried: ${tried} times. Is allowed retry endpoint: ${allowedRetryEndpoint}`;
  logger(msg);

  Object.assign(err.config.headers, { ...err.config.headers, [HEADER_RETRY_COUNT]: tried });
  if (status >= 400 && tried < REQ_RETRY_COUNT && allowedRetryEndpoint) {
    const resp = await fetch.request(err.config);
    return resp;
  }
  return Promise.reject(err);
};

fetch.interceptors.request.use(reqMiddleware);
fetch.interceptors.response.use(resp => resp, respMiddleware);

export default fetch;
