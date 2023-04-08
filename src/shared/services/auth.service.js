import API from 'shared/constants/apis';
import fetch from 'shared/services/roots';
import userService from 'shared/services/user.service';
import { extractErrorMessage } from 'shared/utils/handleErrorMessage';

const login = async payload =>
  fetch
    .post(API.V1.LOGIN, payload)
    .then(async resp => {
      const { token, isNewUser } = resp.data;
      let userData = {};

      if (token.accessToken) {
        const header = { Authorization: `Bearer ${token.accessToken}` };
        const data = await userService.getMe(header).catch(error => Promise.reject(error));
        userData = { ...data };
      }
      return { token: token.accessToken, isNewUser, user: userData };
    })
    .catch(err => Promise.reject(extractErrorMessage(err)));

const logout = () =>
  fetch
    .post(`${API.V1.LOGOUT}`)
    .then(resp => resp.data)
    .catch(err => Promise.reject(extractErrorMessage(err)));

export default {
  login,
  logout,
};
