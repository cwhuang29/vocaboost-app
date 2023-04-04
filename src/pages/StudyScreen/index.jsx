import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { DEFAULT_CONFIG } from 'shared/utils/config';
import logger from 'shared/utils/logger';
import { genWordDetailMap } from 'shared/utils/word';


const StudyScreen = ({ navigation, route }) => {
  const { type } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const lang = config.language;

  const shuffleIndices = ({ wordsMap }) => {
    let indices = Array.from({ length: wordsMap.size }, (_, i) => i + 1);
    let currentIndex = wordsMap.size;
    let randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [indices[currentIndex], indices[randomIndex]] = [indices[randomIndex], indices[currentIndex]];
    }
    return indices;
  }
  const wordsMap = genWordDetailMap(route.params['type']);
  const shuffledIndices = shuffleIndices({ wordsMap });

  const onPress = () => {
    setCurrentIndex(currentIndex => currentIndex + 1);
  }

  const currentWord = wordsMap.get(shuffledIndices[currentIndex]);
  const { example, meaning, partsOfSpeech } = currentWord.detail[0];

  return (
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
