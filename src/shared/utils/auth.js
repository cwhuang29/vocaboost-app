import { STORAGE_AUTH_TOKEN } from 'shared/constants/storage';
import storage from 'shared/storage';

import jwtDecode from 'jwt-decode';

export const getAuthToken = () => storage.getData(STORAGE_AUTH_TOKEN);

export const decodeAuthToken = token => {
  if (!token) {
    return {};
  }
  const { sub, method, firstName, lastName, email } = jwtDecode(token) || {};
  return { uuid: sub, loginMethod: method, firstName, lastName, email };
};
