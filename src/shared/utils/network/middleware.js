import { ALLOWED_RETRY_ENDPOINTS, REQ_RETRY_COUNT } from 'shared/constants/apis';
import { HEADER_PLATFORM, HEADER_RETRY_COUNT } from 'shared/constants/headers';
import { getDeviceInfo, getDevicePlatform } from 'shared/utils/devices';
import logger from 'shared/utils/logger';
import { getAuthToken } from 'shared/utils/storage';

export const reqMiddleware = async config => {
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

export const respMiddleware = async err => {
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
