import React, { useEffect, useState } from 'react';
import { Alert, Pressable } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';
import { makeRedirectUri, ResponseType, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
// eslint-disable-next-line import/no-unresolved
import { AZURE_LOGIN_CLIENT_ID, GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';
import { AntDesign } from '@expo/vector-icons';

import { Box } from 'native-base';

import { AUTH_TYPE } from 'shared/constants/auth';
import { LOGIN_METHOD } from 'shared/constants/loginType';
import { AZURE_LOGIN_CONFIRM_MSG } from 'shared/constants/messages';
import { STORAGE_USER } from 'shared/constants/storage';
import { MAX_Z_INDEX } from 'shared/constants/styles';
import { useAuthContext } from 'shared/hooks/useAuthContext';
import { useIconStyle } from 'shared/hooks/useIconStyle';
import { azureCodeChallenge, azureOauthEndpoint, azureOauthScopes, azureRedirectUriObj } from 'shared/oauth/azure';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';
import { isObjectEmpty } from 'shared/utils/misc';
import { transformOAuthLoginData } from 'shared/utils/oauth/formatter';

import { getAzureUserData, getGoogleUserData, getSignInToBackendErrorMsg, getWelcomeNewUserMsg, oauthGoogleSignOut, showGoogleSignInError } from './helper';
import OauthIconButton from './OauthIconButton';

const authIcon = { [AUTH_TYPE.LOGIN]: 'logout', [AUTH_TYPE.LOGOUT]: 'login' };

const authDelay = { [AUTH_TYPE.LOGIN]: 0, [AUTH_TYPE.LOGOUT]: 800 };

WebBrowser.maybeCompleteAuthSession(); // Dismiss the web popup. Oterwise the popup window will not close

const SignInOut = ({ loading, setLoading, setUserInfo, setConfig, setAlert }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loginType, setLoginType] = useState();
  const [showOauthLogo, setShowOauthLogo] = useState(false);
  const { signIn, signOut } = useAuthContext();
  const discovery = useAutoDiscovery(azureOauthEndpoint); // Since account is a personal account and not in a tenant, so need to bypass the tenant-level login
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: AZURE_LOGIN_CLIENT_ID,
      scopes: azureOauthScopes,
      responseType: ResponseType.Code,
      codeChallenge: azureCodeChallenge,
      redirectUri: makeRedirectUri(azureRedirectUriObj),
    },
    discovery
  );
  const iconColor = useIconStyle();
  const authStatus = isSignedIn ? AUTH_TYPE.LOGIN : AUTH_TYPE.LOGOUT;
  const icon = authIcon[authStatus];
  const iconSize = 32;
  const oauthAzureSignInOnPress = () => {
    promptAsync(); // A web browser will open up and prompt the user for authentication
  };

  useEffect(() => {
    const setup = async () => {
      const uInfo = await storage.getData(STORAGE_USER);
      setIsSignedIn(!isObjectEmpty(uInfo));
    };
    setup();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({ iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID });
  }, []);

  const signInToBackend = async ({ loginMethod, data }) => {
    try {
      const loginPayload = transformOAuthLoginData({ loginMethod, data });
      const { latestConfig, latestUser, isNewUser } = await signIn(loginPayload);
      if (latestConfig) {
        setConfig(latestConfig);
      }
      if (isNewUser) {
        setAlert(getWelcomeNewUserMsg());
      }
      setUserInfo(latestUser);
      setIsSignedIn(true);
    } catch (err) {
      setAlert(getSignInToBackendErrorMsg());
    }
  };

  const oauthGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { loginMethod, userInfo: data } = await getGoogleUserData(GoogleSignin);
      await signInToBackend({ loginMethod, data });
      setShowOauthLogo(false);
    } catch (err) {
      showGoogleSignInError(err);
    }
    setLoading(false);
  };

  const oauthAzureSignIn = async () => {
    setLoading(true);
    const { loginMethod, userInfo: data } = await getAzureUserData({ discovery, request, response });
    await signInToBackend({ loginMethod, data });
    setLoading(false);
    setShowOauthLogo(false);
  };

  React.useEffect(() => {
    if (response?.type === 'success') {
      oauthAzureSignIn();
    }
  }, [response]);

  const handleSignIn = () => {
    if (authStatus === AUTH_TYPE.LOGIN) {
      return;
    }
    setShowOauthLogo(prev => !prev);
  };

  const oauthSignOut = () => {
    if (loginType === LOGIN_METHOD.GOOGLE) {
      oauthGoogleSignOut(GoogleSignin);
    }
  };

  const handleSignOut = async () => {
    if (authStatus === AUTH_TYPE.LOGOUT) {
      return;
    }
    try {
      await oauthSignOut();
      await signOut();
    } catch (err) {
      logger(`Signout error: ${err}`);
    } finally {
      setIsSignedIn(false); // Always let user sign out
      setUserInfo({});
    }
  };

  const googleOnPress = () => {
    setLoginType(LOGIN_METHOD.GOOGLE);
    oauthGoogleSignIn();
  };

  const azureSignIn = () => {
    setLoginType(LOGIN_METHOD.AZURE);
    oauthAzureSignInOnPress();
  };

  const azureOnPress = () => {
    Alert.alert(AZURE_LOGIN_CONFIRM_MSG.TITLE, AZURE_LOGIN_CONFIRM_MSG.CONTENT, [
      { text: 'Cancel' },
      { text: 'Confirm', onPress: azureSignIn, isPreferred: true },
    ]);
  };

  const googleSignInDisabled = loading;

  const azureSignInDisabled = loading || !request;

  const shouldShowOauthLogo = showOauthLogo && authStatus === AUTH_TYPE.LOGOUT;

  return (
    <>
      <Box height={5} />
      <Pressable onPress={handleSignIn} onLongPress={handleSignOut} style={{ zIndex: MAX_Z_INDEX }} delayLongPress={authDelay[AUTH_TYPE.LOGOUT]}>
        <AntDesign
          name={icon}
          size={iconSize}
          color={iconColor}
          style={{ opacity: loading ? 0.3 : 1, transform: [{ rotateY: authStatus === AUTH_TYPE.LOGIN ? '180deg' : '0deg' }] }}
        />
      </Pressable>
      {shouldShowOauthLogo && (
        <>
          <Box height={5} />
          <OauthIconButton icon='google' size={iconSize} color={iconColor} onPress={googleOnPress} disabled={googleSignInDisabled} />
          <Box height={5} />
          <OauthIconButton icon='microsoft' size={iconSize} color={iconColor} onPress={azureOnPress} disabled={azureSignInDisabled} />
        </>
      )}
    </>
  );
};

SignInOut.propTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  setUserInfo: PropTypes.func,
  setConfig: PropTypes.func,
  setAlert: PropTypes.func,
};

SignInOut.defaultProps = {
  loading: false,
  setLoading: () => {},
  setUserInfo: () => {},
  setConfig: () => {},
  setAlert: () => {},
};

export default SignInOut;
