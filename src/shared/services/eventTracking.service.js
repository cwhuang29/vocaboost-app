import { EVENT_TRACKING_API } from 'shared/constants/apis';
import fetch from 'shared/services/roots';
import { extractErrorMessage } from 'shared/utils/handleErrorMessage';

const createEventTracking = payload =>
  fetch
    .post(EVENT_TRACKING_API.V1, payload)
    .then(resp => resp.data)
    .catch(err => Promise.reject(extractErrorMessage(err)));

export default {
  createEventTracking,
};
