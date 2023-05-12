import jwtDecode from 'jwt-decode';

export const decodeAuthToken = token => {
  if (!token) {
    return {};
  }
  const { sub, method, firstName, lastName, email } = jwtDecode(token) || {};
  return { uuid: sub, loginMethod: method, firstName, lastName, email };
};
