import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';

import { Avatar, Button, Center } from 'native-base';

import { STORAGE_USER } from 'shared/constants/storage';
import { AuthContext } from 'shared/hooks/useAuthContext';
import storage from 'shared/storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({});
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure({ iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID });
    const getUserInfo = async () => {
      const uInfo = await storage.getData(STORAGE_USER);
      setUserInfo(uInfo);
    };
    getUserInfo();
  }, []);

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      signOut();
    } catch (err) {
      logger(err); // TODO If logout from google server failed, ask user to logout again
    }
  };

  return (
    <Center>
      <Avatar size='xl' style={{ marginTop: 120 }} source={{ uri: userInfo?.avatar ?? null }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>{userInfo?.firstName ?? 'username'}</Text>
      <Button variant='vh2' marginTop={3} onPress={googleSignOut}>
        Sign out
      </Button>
    </Center>
  );
};

export default ProfileScreen;
