import { LOGIN_METHOD } from 'shared/constants/loginType';

export const transformGoogleLoginResp = data => ({
  loginMethod: LOGIN_METHOD.GOOGLE,
  detail: {
    email: data.user.email,
    firstName: data.user.givenName,
    lastName: data.user.familyName,
    scopes: JSON.stringify([1, 2, 3]),
    serverAuthCode: data.serverAuthCode,
    avatar: data.user.photo,
  },
});
