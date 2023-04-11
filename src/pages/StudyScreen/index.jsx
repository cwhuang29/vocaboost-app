import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { BACKEND_URL } from '@env';

import { Box, Spinner, View } from 'native-base';

import { BottomAlert } from 'components/Alerts';
import { ALERT_TYPES } from 'shared/constants';
import apis from 'shared/constants/apis';
import { CONNECTED_WORDS_FAILED_MSG, SIGNIN_FAILED_MSG } from 'shared/constants/messages';
import { STORAGE_AUTH_TOKEN, STORAGE_CONFIG } from 'shared/constants/storage';
import storage from 'shared/storage';
import { shuffleArray } from 'shared/utils/arrayHelpers';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import logger from 'shared/utils/logger';
import { getLocalDate } from 'shared/utils/time';
// import { getWSConnStatusDisplay } from 'shared/utils/messages';
import { genWordDetailMap } from 'shared/utils/word';

import Detail from './Detail';

const getWebSocketURL = () => `${BACKEND_URL}${apis.V1.SETTING_COLLECTED_WORDS}`;

const StudyScreen = ({ route }) => {
  const accessToken = useRef(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({});
  const [currIdx, setCurrIdx] = useState(0);
  const [alertData, setAlertData] = useState({});
  const wordsMap = useMemo(() => genWordDetailMap(route.params.type), [route.params.type]);
  const shuffledIndices = useMemo(() => shuffleArray([...wordsMap.keys()]), [wordsMap]);
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(getWebSocketURL());
  const wordData = wordsMap.get(shuffledIndices[currIdx]);
  // const connStatus = getWSConnStatusDisplay(readyState);

  useEffect(() => {
    const setup = async () => {
      const c = (await storage.getData(STORAGE_CONFIG)) || DEFAULT_CONFIG;
      const token = await storage.getData(STORAGE_AUTH_TOKEN);
      if (!token) {
        setAlertData({
          type: ALERT_TYPES.WARNING,
          title: CONNECTED_WORDS_FAILED_MSG.TITLE,
          content: CONNECTED_WORDS_FAILED_MSG.CONTENT,
          ts: getLocalDate().toString(),
        });
      }
      accessToken.current = token;
      setConfig(c);
      setLoading(false);
    };
    setup();
  }, []);

  useEffect(() => {
    const setupWebSocket = async () => {
      // Note that readyState only turns to OPEN once
      if (readyState !== ReadyState.OPEN || accessToken.current === null) {
        return;
      }
      if (accessToken.current) {
        sendJsonMessage({ data: config.collectedWords, accessToken: accessToken.current, ts: config.updatedAt });
      }
    };
    setupWebSocket();
  }, [readyState]);

  useEffect(() => {
    const wsMessageOnReceive = async () => {
      if (lastJsonMessage === null) {
        return;
      }
      const { isStale, data, ts, error } = lastJsonMessage;
      if (error && !isStale) {
        logger(`Update config to server error: ${error}`);
      }
      if (isStale) {
        await storage.setData(STORAGE_CONFIG, { ...config, collectedWords: data, updatedAt: ts });
        setConfig(prev => ({ ...prev, collectedWords: data, updatedAt: ts }));
        logger('Just updated the latest config from server!');
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
      const time = getLocalDate();
      const collectedWords = isCollected ? config.collectedWords.filter(wordId => wordId !== id) : [...config.collectedWords, id];
      const newConfig = { ...config, collectedWords, updatedAt: time };

      await storage.setData(STORAGE_CONFIG, newConfig);
      setConfig(newConfig);
      if (accessToken.current) {
        sendJsonMessage({ data: collectedWords, accessToken: accessToken.current, ts: time });
      }
    };

  const isCollected = loading ? false : config.collectedWords.includes(wordData.id);

  return (
    <View flex={1}>
      <View flex={1} style={{ backgroundColor: 'powderblue' }} />
      {loading ? (
        <Spinner size='sm' color='vh1.200' />
      ) : (
        <View flex={4} px={6} justifyContent='flex-start'>
          <Box width='100%'>
            <TouchableOpacity onPress={onPress} width='100%'>
              <Detail
                wordData={wordData}
                language={config.language}
                fontSize={config.fontSize}
                fontStyle={config.fontStyle}
                isCollected={isCollected}
                onPress={onPress}
                onCollectWord={onCollectWord}
              />
              <Box height='100%' />
            </TouchableOpacity>
          </Box>
        </View>
      )}
      <View flex={1} style={{ backgroundColor: 'steelblue' }} />
      {alertData.type && <BottomAlert {...alertData} bottom={50} />}
    </View>
  );
};

StudyScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default StudyScreen;
