import { LOGIN_METHOD } from 'shared/constants/loginType';
import { getLocalDate } from 'shared/utils/time';

const transformGoogleOAuthLoginData = data => ({
  loginMethod: LOGIN_METHOD.GOOGLE,
  idToken: data.idToken,
  detail: {
    email: data.user.email,
    firstName: data.user.givenName,
    lastName: data.user.familyName,
    scopes: JSON.stringify(data.scopes),
    avatar: data.user.photo,
  },
});

const transformAzureOAuthLoginData = data => ({
  loginMethod: LOGIN_METHOD.AZURE,
  idToken: data.idToken,
  detail: {
    email: data.email,
    firstName: data.given_name,
    lastName: data.family_name,
    scopes: data.scope,
    avatar: data.avatar,
  },
});

export const transformOAuthLoginData = ({ loginMethod, data }) => {
  const base = { ts: getLocalDate() };
  let customized = {};

  if (loginMethod === LOGIN_METHOD.GOOGLE) {
    customized = transformGoogleOAuthLoginData(data);
  }
  if (loginMethod === LOGIN_METHOD.AZURE) {
    customized = transformAzureOAuthLoginData(data);
  }
  return { ...base, ...customized };
};
