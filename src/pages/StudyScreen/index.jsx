import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { DEFAULT_CONFIG } from 'shared/utils/config';
import logger from 'shared/utils/logger';
import { genWordDetailMap } from 'shared/utils/word';


const StudyScreen = ({ navigation, route }) => {
  const { wordListType } = route.params;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const lang = config.language;

  const onPress = () => {
    nextIndex = Math.floor(Math.random() * wordsMap.size) + 1;
    setCurrentIndex(nextIndex);
  }

  const wordsMap = genWordDetailMap(route.params['wordListType']);
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
