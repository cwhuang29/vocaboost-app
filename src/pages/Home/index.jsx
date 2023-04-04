import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';

import { Center, Flex, VStack } from 'native-base';

import { STORAGE_USER } from 'shared/constants/storage';
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

// eslint-disable-next-line react/no-unstable-nested-components
const HomeBox = ({ text, handleClick, bg }) => (
  <TouchableOpacity onPress={handleClick}>
    <Center w='64' h='64' bg={bg} rounded='md' shadow={3} _text={{ color: 'white' }}>
      {text}
    </Center>
  </TouchableOpacity>
);

const Home = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfoCache, setUserInfoCache] = useState([]);

  const handleClick = () => {
    logger('Center component clicked');
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      setloggedIn(isSignedIn);
      if (isSignedIn) {
        const loginData = await storage.getData(STORAGE_USER);
        setUserInfoCache(loginData);
      } else {
        setUserInfoCache([]);
      }
    };
    getUserInfo();
  }, []);

  return (
    <Flex flex={1} justifyContent='center'>
      <VStack space={4} alignItems='center'>
        <HomeBox text='GRE 1500' handleClick={handleClick} bg='indigo.300' />
        <HomeBox text='Collected Words' handleClick={handleClick} bg='indigo.600' />
      </VStack>
    </Flex>
  );
};

export default Home;
