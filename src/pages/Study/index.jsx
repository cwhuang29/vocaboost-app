import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';

import { STORAGE_LOGIN_INFO } from 'shared/constants/storage';
import storage from 'shared/storage';
import { getAllWords } from 'shared/utils/highlight';
import logger from 'shared/utils/logger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Study = ({ navigation, route }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfoCache, setUserInfoCache] = useState([]);

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

  const words = getAllWords();
  const word = 'abate';
  const wordObj = words.get(word);

  return (
    // Implement tapping instead of scrolling/swiping temporatily
    <View>
      <Text>This is Study</Text>
      <Text>{wordObj.id}</Text>
      <Text>{wordObj.word}</Text>
      <Text>{wordObj.detail}</Text>
    </View>
  );
};

Study.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Study;
