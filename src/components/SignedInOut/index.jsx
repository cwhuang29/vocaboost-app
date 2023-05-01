import React, { useContext, useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';
import { exchangeCodeAsync, makeRedirectUri, ResponseType, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';
import { AntDesign } from '@expo/vector-icons';

import { Button, Text } from 'native-base';

import { BottomAlert } from 'components/Alerts';
import { ALERT_TYPES } from 'shared/constants';
import { AUTH_TYPE } from 'shared/constants/auth';
import { EXTENSION_LINK } from 'shared/constants/link';
import { WELCOME_MSG } from 'shared/constants/messages';
import { MAX_Z_INDEX } from 'shared/constants/styles';
import { AuthContext } from 'shared/hooks/useAuthContext';
import { useIconStyle } from 'shared/hooks/useIconStyle';
import logger from 'shared/utils/logger';
import { transformGoogleLoginResp } from 'shared/utils/loginAPIFormatter';
import { getLocalDate } from 'shared/utils/time';

import jwtDecode from 'jwt-decode';

import { showGoogleLoginErr } from './loginHelper';

const authIcon = { [AUTH_TYPE.LOGIN]: 'logout', [AUTH_TYPE.LOGOUT]: 'login' };

const authDelay = { [AUTH_TYPE.LOGIN]: 60, [AUTH_TYPE.LOGOUT]: 750 };

const msOauthEndpoint = 'https://login.microsoftonline.com/common/v2.0';

const msOauthScopes = ['openid', 'profile', 'email', 'offline_access'];

const CLIENT_ID = '';

WebBrowser.maybeCompleteAuthSession(); // Dismiss the web popup. Oterwise the popup window will not close

const SignedInOut = ({ setLoading, setUserInfo, setConfig }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [alertData, setAlertData] = useState({});
  const { signIn, signOut } = useContext(AuthContext);
  const iconColor = useIconStyle();
  const discovery = useAutoDiscovery(msOauthEndpoint); // Since account is a personal account and not in a tenant, so need to bypass the tenant-level login
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: msOauthScopes,
      responseType: ResponseType.Code,
      codeChallenge: 'vocaboost411',
      redirectUri: makeRedirectUri({ scheme: 'msauth.vocaboost.com', path: 'auth' }), // Redirect url: msauth.vocaboost.com://auth
    },
    discovery
  );
  const authStatus = isSignedIn ? AUTH_TYPE.LOGIN : AUTH_TYPE.LOGOUT;
  const icon = authIcon[authStatus];
  const delay = authDelay[authStatus];

  const getMSOauthAccessToken = async authCode => {
    try {
      const tokenResult = await exchangeCodeAsync(
        {
          code: authCode,
          clientId: CLIENT_ID,
          redirectUri: makeRedirectUri({ scheme: 'msauth.vocaboost.com', path: 'auth' }), // Same as above
          scopes: msOauthScopes,
          grant_type: 'authorization_code',
          extraParams: { code_verifier: request?.codeVerifier || '' },
        },
        discovery
      );
      return tokenResult;
    } catch (err) {
      logger(`MS Oauth login error: ${err}`);
    }
    return null;
  };

  React.useEffect(() => {
    const getToken = async () => {
      const { code } = response.params; // The authorization code that the app requested. The app can use the authorization code to request an access token for the target resource. Authorization codes are short lived, typically expiring after about 10 minutes.
      const tokenResult = await getMSOauthAccessToken(code);
      if (tokenResult) {
        const { idToken } = tokenResult;
        const res = jwtDecode(idToken);
        logger(`MS Oauth login result: ${JSON.stringify(res)}`);
      }
    };
    if (response?.type === 'success') {
      getToken();
    }
  }, [response]);

  const msOauthButtonOnPress = () => {
    promptAsync(); // A web browser will open up and prompt the user for authentication
  };

  useEffect(() => {
    const setup = async () => {
      GoogleSignin.configure({ iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID });
      const stillSignedIn = await GoogleSignin.isSignedIn();
      setIsSignedIn(stillSignedIn);
    };
    setup();
  }, []);

  const oauthSignIn = async () => {
    let oauthSucceed = false;
    try {
      setLoading(true);
      // Always resolves to true on iOS. Presence of up-to-date Google Play Services is required to show the sign in modal
      await GoogleSignin.hasPlayServices();
      const uInfo = await GoogleSignin.signIn();
      oauthSucceed = true;

      const loginPayload = transformGoogleLoginResp(uInfo);
      const { latestConfig, latestUser, isNewUser } = await signIn(loginPayload);
      if (latestConfig) {
        setConfig(latestConfig);
      }
      if (isNewUser) {
        setAlertData({
          type: ALERT_TYPES.SUCCESS,
          title: WELCOME_MSG.TITLE,
          content: WELCOME_MSG.CONTENT,
          link: EXTENSION_LINK,
          ts: getLocalDate().toString(),
        });
      }
      setUserInfo(latestUser);
      setIsSignedIn(true);
    } catch (err) {
      if (oauthSucceed) {
        // If OAuth signed in failed, either user cancelled it or there would be failed messages displayed on the oauth content screen
        setAlertData({ type: ALERT_TYPES.ERROR, title: SIGNIN_FAILED_MSG.TITLE, content: SIGNIN_FAILED_MSG.CONTENT, ts: getLocalDate().toString() });
      }
      showGoogleLoginErr(err);
    } finally {
      setLoading(false);
    }
  };

  const oauthSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await signOut();
    } catch (err) {
      logger(err);
    } finally {
      setIsSignedIn(false); // Always let user sign out
      setUserInfo({});
    }
  };

  const onPress = authStatus === AUTH_TYPE.LOGIN ? oauthSignOut : oauthSignIn;

  return (
    <>
      <Button variant='vh1' top={30} right={4} isDisabled={!request} onPress={msOauthButtonOnPress}>
        <Text>MS Login</Text>
      </Button>
      <Pressable onLongPress={onPress} style={{ zIndex: MAX_Z_INDEX }} delayLongPress={delay}>
        <AntDesign
          name={icon}
          color={iconColor}
          size={35}
          top={40}
          right={4}
          position='absolute'
          style={{ transform: [{ rotateY: authStatus === AUTH_TYPE.LOGIN ? '180deg' : '0deg' }] }}
        />
      </Pressable>
      {alertData.type && <BottomAlert {...alertData} bottom={4} />}
    </>
  );
};

SignedInOut.propTypes = {
  setLoading: PropTypes.func,
  setUserInfo: PropTypes.func,
  setConfig: PropTypes.func,
};

SignedInOut.defaultProps = {
  setLoading: () => {},
  setUserInfo: () => {},
  setConfig: () => {},
};

export default SignedInOut;
