import { EVENT_TRACKING_API } from 'shared/constants/apis';
import { fetchAnalyticsServer } from 'shared/services/roots';
import { extractErrorMessage } from 'shared/utils/handleErrorMessage';

const createEventTracking = payload =>
  fetchAnalyticsServer
    .post(EVENT_TRACKING_API.V1, payload)
    .then(resp => resp.data)
    .catch(err => Promise.reject(extractErrorMessage(err)));

export default {
  createEventTracking,
};
