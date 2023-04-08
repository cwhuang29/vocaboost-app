import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { BACKEND_URL } from '@env';

import { Box, Spinner, View } from 'native-base';

import apis from 'shared/constants/apis';
import { STORAGE_AUTH_TOKEN, STORAGE_CONFIG } from 'shared/constants/storage';
import storage from 'shared/storage';
import { shuffleArray } from 'shared/utils/arrayHelpers';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import logger from 'shared/utils/logger';
// import { getWSConnStatusDisplay } from 'shared/utils/messages';
import { genWordDetailMap } from 'shared/utils/word';

import Detail from './Detail';

const getWebSocketURL = () => `${BACKEND_URL}${apis.V1.SETTING}`;

const StudyScreen = ({ route }) => {
  const accessToken = useRef(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({});
  const [currIdx, setCurrIdx] = useState(0);
  const wordsMap = useMemo(() => genWordDetailMap(route.params.type), [route.params.type]);
  const shuffledIndices = useMemo(() => shuffleArray([...wordsMap.keys()]), [wordsMap]);
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(getWebSocketURL());

  const { language: lang, fontSize } = config || {};
  const currWordData = wordsMap.get(shuffledIndices[currIdx]);
  // const connStatus = getWSConnStatusDisplay(readyState); // TODO Show 'cannot connect to server' message

  useEffect(() => {
    const setup = async () => {
      const token = await storage.getData(STORAGE_AUTH_TOKEN);
      const c = (await storage.getData(STORAGE_CONFIG)) || DEFAULT_CONFIG;
      accessToken.current = token; // TODO Recommend user to login if the value is null
      setConfig(c);
      setLoading(false); // Even if the app cannot connect to the server, still let users operate on their phones
    };
    setup();
  }, []);

  useEffect(() => {
    const setup = async () => {
      // Note that readyState only turns to OPEN once
      if (readyState !== ReadyState.OPEN || accessToken.current === null) {
        return;
      }
      if (accessToken.current) {
        sendJsonMessage({ config: config || DEFAULT_CONFIG, accessToken: accessToken.current, ts: new Date('Wed Apr 05 2000 00:00:00') });
      }
    };
    setup();
  }, [readyState]);

  useEffect(() => {
    const wsMessageOnReceive = async () => {
      if (lastJsonMessage === null) {
        return;
      }
      const { isStale, data, error } = lastJsonMessage;
      if (error) {
        logger(`Update config to server error: ${error}`);
      }
      if (isStale) {
        await storage.setData(STORAGE_CONFIG, data);
        logger('Just updated the latest config from server!');
        setConfig(data);
      }
    };
    wsMessageOnReceive();
  }, [lastJsonMessage]);

  const onPress = () => {
    setCurrIdx(prevIdx => (prevIdx + 1 < shuffledIndices.length ? prevIdx + 1 : 0));
  };

  const onCollectWord =
    ({ id, isCollected }) =>
    async () => {
      const collectedWords = isCollected ? config.collectedWords.filter(wordId => wordId !== id) : [...config.collectedWords, id];
      const newConfig = { ...config, collectedWords };

      await storage.setData(STORAGE_CONFIG, newConfig);
      setConfig(newConfig);
      if (accessToken.current) {
        sendJsonMessage({ config: newConfig, accessToken: accessToken.current, ts: new Date() });
      }
    };

  const isCollected = loading ? false : config.collectedWords.includes(currWordData.id);

  return (
    <View flex={1}>
      <View flex={1} style={{ backgroundColor: 'powderblue' }} />
      {loading ? (
        <Spinner size='sm' color='vh1.200' />
      ) : (
        <View flex={4} px={12} justifyContent='flex-start' alignItems='flex-start'>
          <TouchableOpacity onPress={onPress}>
            <Detail wordData={currWordData} language={lang} fontSize={fontSize} isCollected={isCollected} onPress={onPress} onCollectWord={onCollectWord} />
            <Box height='100%' style={{ backgroundColor: 'blue' }} />
          </TouchableOpacity>
        </View>
      )}
      <View flex={1} style={{ backgroundColor: 'steelblue' }} />
    </View>
  );
};

StudyScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default StudyScreen;
