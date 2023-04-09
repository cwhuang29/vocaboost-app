import { LOGIN_METHOD } from 'shared/constants/loginType';

export const transformGoogleLoginResp = data => ({
  loginMethod: LOGIN_METHOD.GOOGLE,
  idToken: data.idToken,
  detail: {
    email: data.user.email,
    firstName: data.user.givenName,
    lastName: data.user.familyName,
    scopes: JSON.stringify(data.scopes),
    serverAuthCode: data.serverAuthCode,
    avatar: data.user.photo,
  },
});
