import apis from 'shared/constants/apis';
import { gqlGetMe } from 'shared/queries/user';
import fetch from 'shared/services/roots';

const getMe = (header = {}) =>
  fetch
    .post(apis.GRAPHQL, { query: gqlGetMe }, { headers: header })
    .then(resp => resp.data.data.me)
    .catch(err => Promise.reject(err));

// const getMe = (header = {}) =>
//   fetch
//     .get(apis.V1.ME, { headers: header })
//     .then(resp => resp.data)
//     .catch(err => Promise.reject(err));

const updateUserSetting = payload =>
  fetch
    .put(apis.V1.SETTING, payload)
    .then(resp => resp.data)
    .catch(err => Promise.reject(err));

export default {
  getMe,
  updateUserSetting,
};
