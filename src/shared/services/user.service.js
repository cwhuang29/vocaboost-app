import apis from 'shared/constants/apis';
import fetch from 'shared/services/roots';

const getMe = (header = {}) =>
  fetch
    .get(apis.V1.ME, { headers: header })
    .then(resp => Promise.resolve(resp))
    .catch(err => Promise.reject(err));

export default {
  getMe,
};
