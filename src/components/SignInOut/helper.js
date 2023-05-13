import { statusCodes } from '@react-native-google-signin/google-signin';
import { exchangeCodeAsync, GrantType, makeRedirectUri } from 'expo-auth-session';
// eslint-disable-next-line import/no-unresolved
import { AZURE_LOGIN_CLIENT_ID } from '@env';

import { ALERT_TYPES } from 'shared/constants';
import { EXTENSION_LINK } from 'shared/constants/link';
import { LOGIN_METHOD } from 'shared/constants/loginType';
import { SIGNIN_FAILED_MSG, WELCOME_MSG } from 'shared/constants/messages';
import { azureOauthScopes, azureRedirectUriObj } from 'shared/oauth/azure';
import oauthService from 'shared/services/oauth.service';
import logger from 'shared/utils/logger';
import { getLocalDate } from 'shared/utils/time';

import { Buffer } from 'buffer';
import jwtDecode from 'jwt-decode';

export const getAzureAccessToken = async ({ discovery, request, response }) => {
  try {
    // code: the authorization code that the app requested. The app can use the authorization code to request an access token for the target resource. Authorization codes are short lived, typically expiring after about 10 minutes.
    const { code } = response.params ?? {};
    return await exchangeCodeAsync(
      {
        code,
        clientId: AZURE_LOGIN_CLIENT_ID,
        redirectUri: makeRedirectUri(azureRedirectUriObj), // Same as above
        scopes: azureOauthScopes,
        grant_type: GrantType.AuthorizationCode,
        extraParams: { code_verifier: request?.codeVerifier || '' },
      },
      discovery
    );
  } catch (err) {
    logger(`Azure Oauth login error: ${err}`);
  }
  return null;
};

export const getAzureUserData = async ({ discovery, request, response }) => {
  if (response?.type !== 'success') {
    return {};
  }

  const tokenResult = await getAzureAccessToken({ discovery, request, response });
  if (!tokenResult) {
    return {};
  }

  try {
    const { accessToken, idToken, scope } = tokenResult;
    const userData = jwtDecode(idToken);
    logger(`Azure Oauth get user data result: ${JSON.stringify(userData)}`);

    const avatarBinary = await oauthService.getAzureUserPhoto({ accessToken });
    const avatarString = Buffer.from(avatarBinary, 'binary').toString('base64'); // Convert binary image to base64 string
    const avatar = `data:image/png;base64,${avatarString}`;
    const userInfo = { ...userData, idToken, scope, avatar };
    return { loginMethod: LOGIN_METHOD.AZURE, userInfo };
  } catch (err) {
    logger(`Azure OAuth get user data error: ${JSON.stringify(err)}`);
  }
  return null;
};

export const isGoogleStillSignIn = async GoogleSignin => {
  const stillSignedIn = await GoogleSignin.isSignedIn();
  return stillSignedIn;
};

export const getGoogleUserData = async GoogleSignin => {
  // Always resolves to true on iOS. Presence of up-to-date Google Play Services is required to show the sign in modal
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return { loginMethod: LOGIN_METHOD.GOOGLE, userInfo };
};

export const oauthGoogleSignOut = async GoogleSignin => {
  await GoogleSignin.signOut();
};

export const showGoogleSignInError = err => {
  if (err.code === statusCodes.SIGN_IN_CANCELLED) {
    logger('user cancelled the login flow');
  } else if (err.code === statusCodes.IN_PROGRESS) {
    logger('operation (e.g. sign in) is in progress already');
  } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    logger('play services not available or outdated');
  } else {
    logger(`UNKNOWN ERROR: ${err}`);
  }
};

export const getWelcomeNewUserMsg = () => ({
  type: ALERT_TYPES.SUCCESS,
  title: WELCOME_MSG.TITLE,
  content: WELCOME_MSG.CONTENT,
  link: EXTENSION_LINK,
  ts: getLocalDate().toString(),
});

export const getSignInToBackendErrorMsg = () => ({
  type: ALERT_TYPES.ERROR,
  title: SIGNIN_FAILED_MSG.TITLE,
  content: SIGNIN_FAILED_MSG.CONTENT,
  ts: getLocalDate().toString(),
});
