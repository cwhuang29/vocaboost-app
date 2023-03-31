import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';

import { STORAGE_LOGIN_INFO } from 'shared/constants/storage';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Login = ({ navigation, route }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userInfoCache, setUserInfoCache] = useState([]);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      setloggedIn(isSignedIn);
      if (isSignedIn) {
        const loginData = await storage.getData(STORAGE_LOGIN_INFO);
        setUserInfoCache(loginData);
      } else {
        setUserInfoCache([]);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID,
      // androidClientId: GOOGLE_LOGIN_ANDROID_CLIENT_ID,
    });
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setloggedIn(false);
      setUserInfo([]);
    } catch (err) {
      logger(err);
    }
  };

  const signIn = async () => {
    try {
      setIsSigninInProgress(true);

      await GoogleSignin.hasPlayServices();
      const uInfo = await GoogleSignin.signIn();
      setUserInfo({ ...uInfo, idToken: '<omit>' });
      setloggedIn(true);
      storage.setData(STORAGE_LOGIN_INFO, uInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        logger('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        logger('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        logger('play services not available or outdated');
      } else {
        logger('UNKNOWN ERROR');
      }
    } finally {
      setIsSigninInProgress(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>User info: {JSON.stringify(userInfo)}</Text>
      <Button title='Sign out' onPress={signOut} disabled={!loggedIn} />
      <Button title='Sign in with Google' onPress={signIn} />
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
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
