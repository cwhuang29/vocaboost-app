import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { BACKEND_URL } from '@env';
import { Entypo } from '@expo/vector-icons';

import { Box, Center, Heading, Icon, Text, View } from 'native-base';

import SplashScreen from 'pages/SplashScreen';
import { BottomAlert } from 'components/Alerts';
import { ALERT_TYPES } from 'shared/constants';
import apis from 'shared/constants/apis';
import { CONNECTED_WORDS_FAILED_MSG } from 'shared/constants/messages';
import { STORAGE_AUTH_TOKEN, STORAGE_CONFIG } from 'shared/constants/storage';
import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import storage from 'shared/storage';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import logger from 'shared/utils/logger';
import { isObjectEmpty } from 'shared/utils/misc';
import { getLocalDate } from 'shared/utils/time';
// import { getWSConnStatusDisplay } from 'shared/utils/messages';
import { genWordDetailMap } from 'shared/utils/word';

import Detail from './Detail';

const getWebSocketURL = () => `${BACKEND_URL}${apis.V1.SETTING_COLLECTED_WORDS}`;

const getWords = type => {
  const queryType = type === WORD_LIST_TYPE.COLLECTED ? WORD_LIST_TYPE.ALL : type;
  return genWordDetailMap({ type: queryType });
};

const filterCollectedWords = (wordsMap, ids) => new Map(ids.reduce((acc, cur) => [...acc, [cur, wordsMap.get(cur)]], []));

const FinishStudy = ({ fontStyle }) => {
  const color = 'vhlight.300:alpha.70';
  return (
    <Center>
      <Text mb={8} size='xl' color={color} fontFamily={fontStyle.toLowerCase()}>
        You've reviewed all your collected vocabulary!
      </Text>
      <Icon as={Entypo} name='emoji-flirt' size={32} color={color} />
    </Center>
  );
};

const StudyScreen = ({ route }) => {
  const accessToken = useRef(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({});
  const [currIdx, setCurrIdx] = useState(0);
  const [alertData, setAlertData] = useState({});
  const allWordsMap = useMemo(() => getWords(route.params.type), [route.params.type]);
  const [wordsMap, setWordsMap] = useState(null);
  const [wordsMapKeys, setWordsMapKeys] = useState(null);
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(getWebSocketURL());
  const [wordData, setWordData] = useState({});
  // const connStatus = getWSConnStatusDisplay(readyState);

  useEffect(() => {
    const setup = async () => {
      const [c, token] = await Promise.all([storage.getData(STORAGE_CONFIG), storage.getData(STORAGE_AUTH_TOKEN)]);
      if (!token) {
        setAlertData({
          type: ALERT_TYPES.WARNING,
          title: CONNECTED_WORDS_FAILED_MSG.TITLE,
          content: CONNECTED_WORDS_FAILED_MSG.CONTENT,
          ts: getLocalDate().toString(),
        });
      }
      const finalConfig = c ?? DEFAULT_CONFIG;
      accessToken.current = token;
      setConfig(finalConfig);

      const wMap = route.params.type === WORD_LIST_TYPE.COLLECTED ? filterCollectedWords(allWordsMap, finalConfig.collectedWords) : allWordsMap;
      const wMapKeys = Array.from(wMap.keys());
      setWordsMap(wMap);
      setWordsMapKeys(wMapKeys);
      if (wMapKeys.length > 0) {
        setWordData(wMap.get(wMapKeys[0]));
        setCurrIdx(Math.min(1, wMapKeys.length - 1));
      }
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
    setCurrIdx(prevIdx => (prevIdx + 1 < wordsMapKeys.length ? prevIdx + 1 : 0));
    setWordData(wordsMap.get(wordsMapKeys[currIdx + 1 < wordsMapKeys.length ? currIdx + 1 : 0]));
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

  return loading ? (
    <SplashScreen />
  ) : (
    <View flex={1}>
      <View flex={1} />
      {isObjectEmpty(wordData) ? (
        <View flex={4} px={6} justifyContent='center'>
          <FinishStudy fontStyle={config.fontStyle} />
        </View>
      ) : (
        <View flex={4} px={8} justifyContent='flex-start'>
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
      <View flex={1} />
      {alertData.type && <BottomAlert {...alertData} bottom={50} />}
    </View>
  );
};

StudyScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

FinishStudy.propTypes = {
  fontStyle: PropTypes.string.isRequired,
};

export default StudyScreen;
