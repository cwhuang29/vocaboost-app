import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';

import { STORAGE_LOGIN_INFO } from 'shared/constants/storage';
import storage from 'shared/storage';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import logger from 'shared/utils/logger';
import { genWordDetailMap } from 'shared/utils/word';


const StudyScreen = ({ navigation, route }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfoCache, setUserInfoCache] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const lang = config.language;

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

  const onPress = () => {
    if (currentIndex < wordsMap.size) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  const wordsMap = genWordDetailMap();
  const currentWord = wordsMap.get(currentIndex);
  const { example, meaning, partsOfSpeech } = currentWord.detail[0];

  return (
    // Implement tapping instead of scrolling/swiping temporatily
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity style={{ flex: 1, justifyContent: "center" }} onPress={onPress}>
        <Text>({partsOfSpeech}) {currentWord.word}</Text>
        <Text>{meaning[lang]}</Text>
        <Text>{example}</Text>
      </TouchableOpacity>
    </View>
  );
};

StudyScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default StudyScreen;
