import { HEADER_CSRF_TOKEN, HEADER_SOURCE } from 'shared/constants/headers';
import { getAnalyticsBaseURL, getBaseURL } from 'shared/utils/api';

const commonConfig = {
  withCredentials: true, // Indicates whether or not cross-site Access-Control requests should be made using credentials
  xsrfHeaderName: HEADER_CSRF_TOKEN, // the name of the http header that carries the xsrf token value
  xsrfCookieName: 'csrftoken', // The name of the cookie to use as a value for xsrf token
  timeout: 30000, // If the request takes longer than `timeout`, the request will be aborted (Error: timeout of 1000ms exceeded)
  transformResponse: [data => ({ ...JSON.parse(data) /* , timeStamp: new Date() */ })], // Changes to the response to be made before it is passed to then/catch
  headers: { [HEADER_SOURCE]: 'mobile' }, // Custom headers to be sent
};

export const httpConfig = {
  ...commonConfig,
  baseURL: getBaseURL(),
};

export const httpAnalyticsServerConfig = {
  ...commonConfig,
  baseURL: getAnalyticsBaseURL(),
};
