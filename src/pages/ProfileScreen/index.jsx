import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';

import { Avatar, Button, Center } from 'native-base';

import Login from 'pages/Login';
import { STORAGE_AUTH_TOKEN, STORAGE_USER } from 'shared/constants/storage';
import authService from 'shared/services/auth.service';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';

const ProfileScreen = ({ navigation }) => {
  const [loggedIn, setloggedIn] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await storage.getData(STORAGE_USER);
      setUserInfo(userInfo);
    };
    getUserInfo();
  }, [loggedIn, userInfo]);

  const login = () => {
    navigation.navigate('Login');
  };

  const handleLogout = async () => {
    await Promise.all([storage.removeData(STORAGE_USER), storage.removeData(STORAGE_AUTH_TOKEN)]);
    await authService.logout().catch(() => {}); // For logout, just ignore error message

    setloggedIn(false);
    setUserInfo({});
  };

  const logout = async () => {
    const accessToken = await storage.getData(STORAGE_AUTH_TOKEN);
    try {
      await GoogleSignin.signOut();
      await handleLogout();
    } catch (err) {
      logger(err); // TODO Ask user to logout again (due to network issues)
    }
  };

  return (
    <Center>
      <Avatar size='xl' style={{ marginTop: 120 }} source={{ uri: userInfo ? userInfo.avatar : null }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>{userInfo ? userInfo.firstName : 'username'}</Text>
      {loggedIn ? (
        <Button variant='vh2' onPress={logout} marginTop={3}>
          Sign out
        </Button>
      ) : (
        <Button variant='vh2' onPress={login} marginTop={3}>
          Sign in
        </Button>
      )}
    </Center>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen;
