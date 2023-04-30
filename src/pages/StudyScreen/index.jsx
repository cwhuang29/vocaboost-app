import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Clipboard from '@react-native-clipboard/clipboard';
import PropTypes from 'prop-types';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { Box, Icon, IconButton, Text, View } from 'native-base';

import SplashScreen from 'pages/SplashScreen';
import { BottomAlert } from 'components/Alerts';
import { ALERT_TYPES } from 'shared/constants';
import apis from 'shared/constants/apis';
import LANGS from 'shared/constants/i18n';
import { CONNECTED_WORDS_FAILED_MSG } from 'shared/constants/messages';
import { STORAGE_AUTH_TOKEN, STORAGE_CONFIG } from 'shared/constants/storage';
import { COPY_TEXT_ALERT_TIME_PERIOD } from 'shared/constants/styles';
import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import useUpdateEffect from 'shared/hooks/useUpdateEffect';
import storage from 'shared/storage';
import { shuffleArray } from 'shared/utils/arrayHelpers';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import logger from 'shared/utils/logger';
import { isObjectEmpty } from 'shared/utils/misc';
import { getLocalDate } from 'shared/utils/time';
// import { getWSConnStatusDisplay } from 'shared/utils/messages';
import { genWordDetailList } from 'shared/utils/word';

import AlphaSlider from './AlphaSlider';
import FinishStudy from './FinishStudy';
import SortingMenu from './SortingMenu';
import WordCard from './WordCard';

const getWebSocketURL = () => `${apis.HOST}${apis.V1.SETTING_COLLECTED_WORDS}`;

const getWordsList = type => {
  const queryType = type === WORD_LIST_TYPE.COLLECTED ? WORD_LIST_TYPE.ALL : type;
  return genWordDetailList({ type: queryType });
};

const getWordsObjectFromList = wordList => {
  const obj = {};
  wordList.forEach((item, idx) => {
    obj[item.id] = wordList[idx];
  });
  return obj;
};

// Note: Map works in simulator but errors out in production build
// const extractCollectedWordsByTime = (wordsMap, ids) => new Map(ids.reduce((acc, cur) => [...acc, [cur, wordsMap.get(cur)]], []));
const extractCollectedWordsByTime = (wordObj, ids) => ids.map(id => wordObj[id]);

const SpeakerIconButton = ({ onPress }) => {
  const onPressThenStop = e => {
    e.preventDefault();
    onPress();
  };
  return (
    <IconButton
      icon={<Icon as={AntDesign} name='sound' />}
      onPress={onPressThenStop}
      _icon={{ _light: { color: 'vhlight.50' }, _dark: { color: 'vhdark.50' }, size: '38' }}
      _pressed={{
        bg: 'base.black:alpha.10',
        rounded: 'full',
      }}
    />
  );
};

const UndoIconButton = ({ onPress }) => {
  const onPressThenStop = e => {
    e.preventDefault();
    onPress();
  };
  return (
    <IconButton
      icon={<Icon as={Ionicons} name='chevron-back' />}
      onPress={onPressThenStop}
      _icon={{ _light: { color: 'vhlight.50' }, _dark: { color: 'vhdark.50' }, size: '38' }}
      _pressed={{
        bg: 'base.black:alpha.10',
        rounded: 'full',
      }}
    />
  );
};

const StudyScreen = ({ route }) => {
  const accessToken = useRef(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({});
  const [wordIndex, setWordIndex] = useState(0);
  const [wordList, setWordList] = useState(null);
  const [wordData, setWordData] = useState({});
  const [alertData, setAlertData] = useState({});
  const [displayCopyText, setDisplayCopyText] = useState(false);
  const [shuffle, setShuffle] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState('A');
  const allWordsList = useMemo(() => shuffleArray(getWordsList(route.params.type), [route.params.type]));
  const allWordsObject = useMemo(() => getWordsObjectFromList(allWordsList), [allWordsList]);
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(getWebSocketURL());
  // const connStatus = getWSConnStatusDisplay(readyState);

  useEffect(() => {
    Tts.setDefaultLanguage(LANGS.en_US);
    Tts.setDefaultRate(0.5);
    Tts.setDucking(true); // Lowering other applications output level while speaking
    Tts.setIgnoreSilentSwitch('ignore'); // Play audio even if the silent switch is set
  }, []);

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

      const wList = route.params.type === WORD_LIST_TYPE.COLLECTED ? extractCollectedWordsByTime(allWordsObject, finalConfig.collectedWords) : allWordsList;
      setWordList(wList);
      setWordData(wList[wordIndex]);
      setLoading(false);
    };
    setup();
  }, []);

  useUpdateEffect(() => {
    let newWordList = [];
    if (shuffle) {
      newWordList = shuffleArray(wordList);
    } else if (route.params.type === WORD_LIST_TYPE.COLLECTED) {
      newWordList = extractCollectedWordsByTime(allWordsObject, config.collectedWords);
    } else {
      newWordList = [...wordList].sort((w1, w2) => {
        if (w1.word > w2.word) return 1;
        if (w1.word < w2.word) return -1;
        return 0;
      });
    }
    setWordList(newWordList);
    setWordIndex(0);
    setWordData(newWordList[0]);
  }, [shuffle]);

  const handleSelectedLetterChange = () => {
    setSelectedLetter(selectedLetter);
    const startIndex = wordList.findIndex(word => word.charAt(0).toUpperCase() === selectedLetter);
    const newWordList = [...wordList.slice(startIndex), ...wordList.slice(0, startIndex)];
    setWordList(newWordList);
    setWordIndex(0);
    setWordData(newWordList[0]);
  };

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

  const onCopyText = text => () => {
    Clipboard.setString(text);
    setDisplayCopyText(true);
    setTimeout(() => setDisplayCopyText(false), COPY_TEXT_ALERT_TIME_PERIOD);
  };

  const onPress = () => {
    setWordIndex(prevIdx => (prevIdx + 1 < wordList.length ? prevIdx + 1 : 0));
    setWordData(wordList[wordIndex + 1 < wordList.length ? wordIndex + 1 : 0]);
  };

  const undoIconOnPress = () => {
    setWordIndex(prevIdx => (prevIdx > 0 ? prevIdx - 1 : wordList.length - 1));
    setWordData(wordList[wordIndex > 0 ? wordIndex - 1 : wordList.length - 1]);
  };

  const speackerIconOnPress = text => () => {
    Tts.speak(text);
  };

  const isCollected = loading || isObjectEmpty(wordData) ? false : config.collectedWords.includes(wordData.id);

  return loading ? (
    <SplashScreen />
  ) : (
    <View flex={1}>
      {isObjectEmpty(wordData) ? (
        <FinishStudy fontStyle={config.fontStyle} />
      ) : (
        <>
          <View flex={1} />
          <Box
            display={displayCopyText ? 'flex' : 'none'}
            bgColor='base.black:alpha.20'
            position='absolute'
            top={70}
            p={1.5}
            m={1}
            flex={1}
            alignSelf='center'
            rounded='lg'
          >
            <Text size='2xs' color='base.white'>
              Copied!
            </Text>
          </Box>
          <View flex={6} px={8} justifyContent='flex-start'>
            <Box width='100%'>
              <TouchableOpacity onPress={onPress} width='100%'>
                <WordCard
                  wordData={wordData}
                  language={config.language}
                  fontSize={config.fontSize}
                  fontStyle={config.fontStyle}
                  isCollected={isCollected}
                  onPress={onPress}
                  onCopyText={onCopyText(wordData.word ?? '')}
                  onCollectWord={onCollectWord}
                />
                <Box height='100%' />
              </TouchableOpacity>
            </Box>
          </View>
          {!shuffle ? (
            <Box mb={5}>
              <AlphaSlider onSelectedLetterChange={handleSelectedLetterChange} />
            </Box>
          ) : null}
          <View flex={1} px={6}>
            <Box display='flex' flexDirection='row' justifyContent='space-between'>
              <UndoIconButton onPress={undoIconOnPress} />
              <SpeakerIconButton onPress={speackerIconOnPress(wordData.word)} />
              <SortingMenu shuffle={shuffle} setShuffle={setShuffle} />
            </Box>
          </View>
        </>
      )}
      {alertData.type && <BottomAlert {...alertData} bottom={50} />}
    </View>
  );
};

StudyScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

SpeakerIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

UndoIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default StudyScreen;
