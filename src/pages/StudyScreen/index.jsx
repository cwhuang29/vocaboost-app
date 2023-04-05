import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Box, View } from 'native-base';

import { EXT_STORAGE_CONFIG } from 'shared/constants/storage';
import storage from 'shared/storage';
import { shuffleArray } from 'shared/utils/arrayHelpers';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import logger from 'shared/utils/logger';
import { genWordDetailMap } from 'shared/utils/word';

import Detail from './Detail';

const StudyScreen = ({ route }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const wordsMap = genWordDetailMap(route.params.type);
  const shuffledIndices = shuffleArray([...wordsMap.keys()]);
  const currWordData = wordsMap.get(shuffledIndices[currentIndex]);
  const { language: lang, fontSize } = config;

  const onPress = () => {
    setCurrentIndex(prevIdx => (currentIndex < shuffledIndices.length ? prevIdx + 1 : 0));
  };

  const onCollectWord =
    ({ id, isCollected }) =>
    async () => {
      const collectedWords = isCollected ? config.collectedWords.filter(wordId => wordId !== id) : [...config.collectedWords, id];
      const newConfig = { ...config, collectedWords };
      await storage.setData(EXT_STORAGE_CONFIG, newConfig);
      setConfig(newConfig);
      logger('New config: ', newConfig);
      // TODO Use web-socket to update with backend
    };

  const isCollected = config.collectedWords.includes(currWordData.id);

  return (
    <View flex={1}>
      <View flex={1} style={{ backgroundColor: 'powderblue' }} />
      <View flex={4} justifyContent='flex-start' alignItems='center' mx={12}>
        <TouchableOpacity onPress={onPress}>
          <Detail wordData={currWordData} language={lang} fontSize={fontSize} isCollected={isCollected} onPress={onPress} onCollectWord={onCollectWord} />
          <Box height='100%' />
        </TouchableOpacity>
      </View>
      <View flex={1} style={{ backgroundColor: 'steelblue' }} />
    </View>
  );
};

StudyScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default StudyScreen;
