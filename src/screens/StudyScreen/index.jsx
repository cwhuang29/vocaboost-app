import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Clipboard from '@react-native-clipboard/clipboard';
import PropTypes from 'prop-types';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { Box, Icon, IconButton, Text, View } from 'native-base';

import SplashScreen from 'screens/SplashScreen';
import { BottomAlert } from 'components/Alerts';
import { ALERT_TYPES } from 'shared/constants';
import apis from 'shared/constants/apis';
import LANGS from 'shared/constants/i18n';
import { CONNECTED_WORDS_FAILED_MSG } from 'shared/constants/messages';
import { STORAGE_AUTH_TOKEN, STORAGE_CONFIG, STORAGE_USER } from 'shared/constants/storage';
import { COPY_TEXT_ALERT_TIME_PERIOD } from 'shared/constants/styles';
import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import useStudyScreenMonitor from 'shared/hooks/useStudyScreenMonitor';
import useUpdateEffect from 'shared/hooks/useUpdateEffect';
import storage from 'shared/storage';
import { shuffleArray } from 'shared/utils/arrayHelpers';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import { createLeaveStudyScreenEvent } from 'shared/utils/eventTracking';
import logger from 'shared/utils/logger';
import { isObjectEmpty } from 'shared/utils/misc';
import { getLocalDate } from 'shared/utils/time';
// import { getWSConnStatusDisplay } from 'shared/utils/messages';
import { genWordDetailList, getWordListAlphabetsIndex, getWordListFirstAlphabets } from 'shared/utils/word';

import AlphabetSlider from './AlphabetSlider';
import FinishStudy from './FinishStudy';
import SortingMenu from './SortingMenu';
import WordCard from './WordCard';

const getWebSocketURL = () => `${apis.HOST}${apis.V1.SETTING_COLLECTED_WORDS}`;

const getWordList = ({ type }) => {
  const queryType = type === WORD_LIST_TYPE.COLLECTED ? WORD_LIST_TYPE.ALL : type;
  return genWordDetailList({ type: queryType });
};

const getEntireWordList = ({ type, shuffle }) => {
  const wordsList = getWordList({ type });
  return shuffle ? shuffleArray(wordsList) : wordsList;
};

const transformWordListToObject = wordList => {
  const obj = {};
  wordList.forEach((item, idx) => {
    obj[item.id] = wordList[idx];
  });
  return obj;
};

const getAlphabets = ({ type }) => {
  const queryType = type === WORD_LIST_TYPE.COLLECTED ? WORD_LIST_TYPE.ALL : type;
  return getWordListFirstAlphabets({ type: queryType });
};

// Note: Map works in simulator but errors out in production build
// const extractCollectedWordsByTime = (wordsMap, ids) => new Map(ids.reduce((acc, cur) => [...acc, [cur, wordsMap.get(cur)]], []));
const extractCollectedWordsByTime = (wordObj, ids) => ids.map(id => wordObj[id]);

const sortAlphabetically = wordList =>
  [...wordList].sort((w1, w2) => {
    if (w1.word > w2.word) return 1;
    if (w1.word < w2.word) return -1;
    return 0;
  });

const getFirstLetter = word => word.charAt(0).toUpperCase();

const SpeakerIconButton = ({ onPress }) => {
  const onPressThenStop = e => {
    e.preventDefault();
    onPress();
  };
  return (
    <IconButton
      icon={<Icon as={AntDesign} name='sound' />}
      onPress={onPressThenStop}
      _icon={{ _light: { color: 'vhlight.50' }, _dark: { color: 'vhdark.50' }, size: '30' }}
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
      _icon={{ _light: { color: 'vhlight.50' }, _dark: { color: 'vhdark.50' }, size: '30' }}
      _pressed={{
        bg: 'base.black:alpha.10',
        rounded: 'full',
      }}
    />
  );
};

const StarIconButton = ({ isCollected, onPress }) => {
  const iconName = isCollected ? 'star' : 'staro';
  const onPressThenStop = e => {
    e.preventDefault();
    onPress();
  };
  return (
    <IconButton
      icon={<Icon as={AntDesign} name={iconName} />}
      onPress={onPressThenStop}
      _icon={{ color: 'vhlight.700', size: '28' }}
      _pressed={{
        bg: '',
        _icon: { name: 'star', color: 'vhlight.700:alpha.50', size: '28' },
      }}
    />
  );
};

const StudyScreen = ({ navigation, route }) => {
  const routeType = route.params.type;
  const accessToken = useRef(null);
  const user = useRef({});
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({});
  const [alphabets, setAlphabets] = useState('');
  const [alphabetsIndex, setAlphabetsIndex] = useState({});
  const [wordIndex, setWordIndex] = useState(0);
  const [wordList, setWordList] = useState(null);
  const [alertData, setAlertData] = useState({});
  const [displayCopyText, setDisplayCopyText] = useState(false);
  const [shuffle, setShuffle] = useState(routeType !== WORD_LIST_TYPE.COLLECTED);
  const [alphabetize, setAlphabetize] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState('');
  const entireWordList = useMemo(() => getEntireWordList({ type: routeType, shuffle }), [routeType, shuffle]);
  const entireWordListSortByAlphabet = useMemo(() => sortAlphabetically(entireWordList), [entireWordList]);
  const entireWordListObject = useMemo(() => transformWordListToObject(entireWordList), [entireWordList]);
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(getWebSocketURL()); // TODO If user is not signed in, don't run ws code
  // const connStatus = getWSConnStatusDisplay(readyState);
  const wordData = loading ? {} : wordList[wordIndex];
  const { wordCount, timeElapsed } = useStudyScreenMonitor(wordData);

  useEffect(() => {
    Tts.setDefaultLanguage(LANGS.en_US);
    Tts.setDefaultRate(0.5);
    Tts.setDucking(true); // Lowering other applications output level while speaking
    Tts.setIgnoreSilentSwitch('ignore'); // Play audio even if the silent switch is set
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      createLeaveStudyScreenEvent({ userId: user.current.uuid ?? '', wordCount, timeElapsed });
    });
    return unsubscribe;
  }, [user.current.uuid, wordCount, timeElapsed]);

  useEffect(() => {
    const setup = async () => {
      const [c, token, u] = await Promise.all([storage.getData(STORAGE_CONFIG), storage.getData(STORAGE_AUTH_TOKEN), storage.getData(STORAGE_USER)]);
      if (!token) {
        setAlertData({
          type: ALERT_TYPES.WARNING,
          title: CONNECTED_WORDS_FAILED_MSG.TITLE,
          content: CONNECTED_WORDS_FAILED_MSG.CONTENT,
          ts: getLocalDate().toString(),
        });
      }
      accessToken.current = token;
      user.current = u ?? {};
      const finalConfig = c ?? DEFAULT_CONFIG;
      setConfig(finalConfig);

      const wList = routeType === WORD_LIST_TYPE.COLLECTED ? extractCollectedWordsByTime(entireWordListObject, finalConfig.collectedWords) : entireWordList;
      setWordList(wList);

      const alp = getAlphabets({ type: routeType });
      const alpIndex = getWordListAlphabetsIndex({ type: routeType });
      setAlphabets(alp);
      setAlphabetsIndex(alpIndex);
      setSelectedLetter(alp[0]);

      setLoading(false);
    };
    setup();
  }, []);

  useUpdateEffect(() => {
    let newWordList = [];
    if (shuffle) {
      newWordList = shuffleArray(wordList);
    } else if (routeType === WORD_LIST_TYPE.COLLECTED) {
      newWordList = extractCollectedWordsByTime(entireWordListObject, config.collectedWords);
    } else {
      newWordList = entireWordListSortByAlphabet;
    }
    setWordList(newWordList);
    setWordIndex(0);
  }, [shuffle]);

  useUpdateEffect(() => {
    const word = wordList[wordIndex]?.word;
    if (word && getFirstLetter(word) !== selectedLetter) {
      setSelectedLetter(getFirstLetter(word));
    }
  }, [wordIndex]);

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

  const alphabetSliderOnChange = letter => {
    if (routeType === WORD_LIST_TYPE.COLLECTED || shuffle) {
      return;
    }
    const newIndex = alphabetsIndex[letter];
    setSelectedLetter(letter);
    setWordIndex(newIndex);
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

  const onCopyText = text => () => {
    Clipboard.setString(text);
    setDisplayCopyText(true);
    setTimeout(() => setDisplayCopyText(false), COPY_TEXT_ALERT_TIME_PERIOD);
  };

  const speackerIconOnPress = text => () => {
    Tts.speak(text);
  };

  const onPress = () => {
    setWordIndex(prevIdx => (prevIdx + 1 < wordList.length ? prevIdx + 1 : 0));
  };

  const undoIconOnPress = () => {
    setWordIndex(prevIdx => (prevIdx > 0 ? prevIdx - 1 : wordList.length - 1));
  };

  const isCollected = isObjectEmpty(wordData) ? false : config.collectedWords.includes(wordData.id);

  const showSlider = routeType !== WORD_LIST_TYPE.COLLECTED && !shuffle;

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
            p={1.5}
            m={1}
            flex={1}
            style={{ top: 56 }}
            alignSelf='center'
            rounded='lg'
          >
            <Text size='2xs' color='base.white'>
              Copied!
            </Text>
          </Box>
          <View flex={8} px={8} justifyContent='flex-start'>
            <View flex={1}>
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
              {showSlider && (
                <Box marginTop='auto' pb={7}>
                  <AlphabetSlider alphabets={alphabets} selectedLetter={selectedLetter} onChange={alphabetSliderOnChange} />
                </Box>
              )}
            </View>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' marginTop='auto'>
              <UndoIconButton onPress={undoIconOnPress} />
              <SpeakerIconButton onPress={speackerIconOnPress(wordData.word)} />
              <StarIconButton isCollected={isCollected} onPress={onCollectWord({ id: wordData.id, isCollected })} />
              <SortingMenu type={routeType} shuffle={shuffle} setShuffle={setShuffle} alphabetize={alphabetize} setAlphabetize={setAlphabetize} />
            </Box>
          </View>
          <View flex={0.9} />
        </>
      )}
      {alertData.type && <BottomAlert {...alertData} bottom={50} />}
    </View>
  );
};

StudyScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

SpeakerIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

UndoIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

StarIconButton.propTypes = {
  isCollected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default StudyScreen;
