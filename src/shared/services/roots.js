import { httpAnalyticsServerConfig, httpConfig } from 'shared/utils/network/http-config';
import { reqMiddleware, respMiddleware } from 'shared/utils/network/middleware';

import axios from 'axios';

const fetch = axios.create(httpConfig);

fetch.interceptors.request.use(reqMiddleware);
fetch.interceptors.response.use(resp => resp, respMiddleware);

export const fetchAnalyticsServer = axios.create(httpAnalyticsServerConfig);

export default fetch;
