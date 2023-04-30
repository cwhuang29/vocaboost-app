import React, { useContext, useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';
import { AntDesign } from '@expo/vector-icons';

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

import { showGoogleLoginErr } from './loginHelper';

const authIcon = { [AUTH_TYPE.LOGIN]: 'logout', [AUTH_TYPE.LOGOUT]: 'login' };

const authDelay = { [AUTH_TYPE.LOGIN]: 60, [AUTH_TYPE.LOGOUT]: 750 };

const SignedInOut = ({ setLoading, setUserInfo, setConfig }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [alertData, setAlertData] = useState({});
  const { signIn, signOut } = useContext(AuthContext);
  const iconColor = useIconStyle();
  const authStatus = isSignedIn ? AUTH_TYPE.LOGIN : AUTH_TYPE.LOGOUT;
  const icon = authIcon[authStatus];
  const delay = authDelay[authStatus];

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
