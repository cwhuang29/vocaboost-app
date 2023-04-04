import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';

import { STORAGE_AUTH_TOKEN, STORAGE_USER } from 'shared/constants/storage';
import authService from 'shared/services/auth.service';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';
import { transformGoogleLoginResp } from 'shared/utils/loginAPIFormatter';

const showGoogleLoginErr = err => {
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

const Login = ({ navigation, route }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID,
      // androidClientId: GOOGLE_LOGIN_ANDROID_CLIENT_ID,
    });
  }, []);

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const isSignedIn = await GoogleSignin.isSignedIn();
  //     if (isSignedIn) {
  //       const loginData = await storage.getData(STORAGE_USER);
  //     }
  //   };
  //   getUserInfo();
  // }, []);

  const handleLogout = async () => {
    await authService.logout().catch(() => {}); // For logout, just ignore error message
    await Promise.all([storage.removeData(STORAGE_USER), storage.removeData(STORAGE_AUTH_TOKEN)]);
    setloggedIn(false);
    setUserInfo({});
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await handleLogout();
    } catch (err) {
      logger(err);
    }
  };

  const handleLogin = async payload => {
    const { token, user } = await authService.login(payload).catch(err => {
      logger(`Login error: ${JSON.stringify(err)}`); // TODO Popup error message
    });
    await Promise.all([storage.setData(STORAGE_USER, user), storage.setData(STORAGE_AUTH_TOKEN, token)]);
    setloggedIn(true);
    setUserInfo(user);
  };

  const login = async () => {
    try {
      setIsSigninInProgress(true);
      await GoogleSignin.hasPlayServices(); // Always resolves to true on iOS
      const uInfo = await GoogleSignin.signIn();
      await handleLogin(transformGoogleLoginResp(uInfo));
    } catch (err) {
      showGoogleLoginErr(err);
    } finally {
      setIsSigninInProgress(false);
    }
  };

  return (
    <View>
      <Text>User info: {JSON.stringify(userInfo)}</Text>
      <Button title='Sign out' onPress={logout} disabled={!loggedIn} />
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={login}
        disabled={isSigninInProgress || loggedIn}
      />
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Login;
