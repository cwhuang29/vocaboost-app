import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';

import { STORAGE_AUTH_TOKEN, STORAGE_USER } from 'shared/constants/storage';
import authService from 'shared/services/auth.service';
import storage from 'shared/storage';
import { constructWordExample } from 'shared/utils/highlight';
import logger from 'shared/utils/logger';
import { transformGoogleLoginResp } from 'shared/utils/loginAPIFormatter';

import { showGoogleLoginErr } from './helper';

const Login = ({ navigation }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID,
      // androidClientId: GOOGLE_LOGIN_ANDROID_CLIENT_ID,
    });
  }, []);

  const handleLogout = async () => {
    await Promise.all([storage.removeData(STORAGE_USER), storage.removeData(STORAGE_AUTH_TOKEN)]);
    await authService.logout().catch(() => {}); // For logout, just ignore error message
    
    setloggedIn(false);
    setUserInfo({});
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await handleLogout();
    } catch (err) {
      logger(err); // TODO Ask user to logout again (due to network issues)
    }
  };

  const handleLogin = async payload => {
    const { token, user } = await authService.login(payload).catch(err => { // login() ISSUE!!!!!
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
      console.log( "uInfo.idToken: ", uInfo.idToken );
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
};

export default Login;
