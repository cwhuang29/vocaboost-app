import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import Clipboard from '@react-native-clipboard/clipboard';
import PropTypes from 'prop-types';

import { Box, Text, View } from 'native-base';

import SplashScreen from 'screens/SplashScreen';
import { BottomAlert } from 'components/Alerts';
import { ALERT_TYPES, SORTING_MODE } from 'shared/constants';
import apis from 'shared/constants/apis';
import { LANGS_SUPPORTED } from 'shared/constants/i18n';
// import { CONNECTED_WORDS_FAILED_MSG } from 'shared/constants/messages';
import { STORAGE_CONFIG } from 'shared/constants/storage';
import { COPY_TEXT_ALERT_TIME_PERIOD } from 'shared/constants/styles';
import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import useDebounce from 'shared/hooks/useDebounce';
import { useDeviceInfoContext } from 'shared/hooks/useDeviceInfoContext';
import useStudyScreenMonitor from 'shared/hooks/useStudyScreenMonitor';
import useUpdateEffect from 'shared/hooks/useUpdateEffect';
import storage from 'shared/storage';
import { getBaseURL } from 'shared/utils/api';
import { shuffleArray } from 'shared/utils/arrayHelpers';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import { deviceIsTablet } from 'shared/utils/devices';
import { createEnterStudyScreenEvent, createLeaveStudyScreenEvent } from 'shared/utils/eventTracking';
import { constructWordExample } from 'shared/utils/highlight';
// import logger from 'shared/utils/logger';
import { isObjectEmpty } from 'shared/utils/misc';
import { getSpeechLanguage } from 'shared/utils/speech';
import { getAuthToken, getConfig } from 'shared/utils/storage';
import { getLocalDate } from 'shared/utils/time';
// import { getWSConnStatusDisplay } from 'shared/utils/messages';
import { genWordDetailList, getWordListAlphabetsIndex, getWordListFirstAlphabets, isToeflWord } from 'shared/utils/word';

import AlphabetSlider from './AlphabetSlider';
import CollectedWordsTooltip from './CollectedWordsTooltip';
import FinishStudy from './FinishStudy';
import { SpeakerIconButton, StarIconButton, UndoIconButton } from './IconButton';
import SortingMenu from './SortingMenu';
import WordCard from './WordCard';

// const getWebSocketURL = () => `${getBaseURL()}${apis.V1.SETTING_COLLECTED_WORDS}`;

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
    if (w1.id > w2.id) return 1;
    if (w1.id < w2.id) return -1;
    return 0;
  });

const getFirstLetter = word => word.charAt(0).toUpperCase();

const getWordListByConfig = ({ config, routeType, alphabets, entireWordList, entireWordListObject, entireWordListSortByAlphabet }) => {
  const { mode } = config.studyOptions[routeType];
  const wordIndex = mode === SORTING_MODE.SHUFFLE ? 0 : config.studyOptions[routeType].wordId;

  let wordList = [];
  let selectedLetter = null;
  if (routeType === WORD_LIST_TYPE.COLLECTED) {
    wordList = extractCollectedWordsByTime(entireWordListObject, config.collectedWords);
    if (mode === SORTING_MODE.SHUFFLE) {
      wordList = shuffleArray(wordList);
    }
  }
  if (routeType === WORD_LIST_TYPE.TOEFL || routeType === WORD_LIST_TYPE.GRE) {
    if (mode === SORTING_MODE.ALPHABETIZE) {
      wordList = entireWordListSortByAlphabet;
      const { wordId } = config.studyOptions[routeType];
      const startingLetter = getFirstLetter(wordList[wordId]?.word || alphabets[0]);
      selectedLetter = startingLetter;
    } else {
      wordList = entireWordList;
    }
  }
  return { wordList, selectedLetter, wordIndex, sortingMode: mode };
};

const defaultSpeechLang = getSpeechLanguage();

const StudyScreen = ({ navigation, route }) => {
  const routeType = route.params.type;
  const accessToken = useRef(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({});
  const [alphabets, setAlphabets] = useState('');
  const [alphabetsIndex, setAlphabetsIndex] = useState({});
  const [wordIndex, setWordIndex] = useState(0);
  const [wordList, setWordList] = useState(null);
  const [alertData, setAlertData] = useState({});
  const [displayCopyText, setDisplayCopyText] = useState(false);
  const [sortingMode, setSortingMode] = useState(SORTING_MODE.SHUFFLE);
  const [selectedLetter, setSelectedLetter] = useState('');
  const debouncedConfig = useDebounce(config);
  const deviceInfo = useDeviceInfoContext();
  const entireWordList = useMemo(() => getEntireWordList({ type: routeType, shuffle: sortingMode === SORTING_MODE.SHUFFLE }), [routeType, sortingMode]);
  const entireWordListSortByAlphabet = useMemo(() => sortAlphabetically(entireWordList), [entireWordList]);
  const entireWordListObject = useMemo(() => transformWordListToObject(entireWordList), [entireWordList]);
  // const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(getWebSocketURL()); // TODO If user is not signed in, don't run ws code
  // const connStatus = getWSConnStatusDisplay(readyState);
  const { wordCount, timeElapsed } = useStudyScreenMonitor(wordList?.[wordIndex]);

  useEffect(() => {
    Tts.setDefaultLanguage(defaultSpeechLang);
    Tts.setDefaultRate(0.51);
    Tts.setDucking(true); // Lowering other applications output level while speaking
    Tts.setIgnoreSilentSwitch('ignore'); // Play audio even if the silent switch is set
  }, []);

  const setup = async () => {
    const [c, token] = await Promise.all([getConfig(), getAuthToken()]);
    // if (!token) {
    //   setAlertData({
    //     type: ALERT_TYPES.WARNING,
    //     title: CONNECTED_WORDS_FAILED_MSG.TITLE,
    //     content: CONNECTED_WORDS_FAILED_MSG.CONTENT,
    //     ts: getLocalDate().toString(),
    //   });
    // }
    accessToken.current = token;
    const finalConfig = isObjectEmpty(c) ? DEFAULT_CONFIG : c;
    const { mode, wordId } = finalConfig.studyOptions[routeType];
    if (mode !== SORTING_MODE.SHUFFLE && wordId == null) {
      finalConfig.studyOptions[routeType].wordId = 0;
    }
    setConfig(finalConfig);

    const alp = getAlphabets({ type: routeType });
    const alpIndex = getWordListAlphabetsIndex({ type: routeType });
    setAlphabets(alp);
    setAlphabetsIndex(alpIndex);

    const {
      wordList: wList,
      selectedLetter: sLetter,
      wordIndex: wIndex,
      sortingMode: sMode,
    } = getWordListByConfig({
      config: finalConfig,
      routeType,
      alphabets: alp,
      entireWordList,
      entireWordListObject,
      entireWordListSortByAlphabet,
    });
    setWordList(wList);
    setWordIndex(wIndex);
    setSortingMode(sMode);
    if (sLetter) {
      setSelectedLetter(sLetter);
    }

    setLoading(false);
  };

  const updateStorageInstantly = async () => {
    if (!isObjectEmpty(config)) {
      storage.setData(STORAGE_CONFIG, config);
    }
  };

  const updateStorage = async () => {
    if (!isObjectEmpty(debouncedConfig)) {
      storage.setData(STORAGE_CONFIG, debouncedConfig);
    }
  };

  const onSortingModeChange = () => {
    if (loading) {
      return;
    }
    let newWordList = [];
    if (sortingMode === SORTING_MODE.SHUFFLE) {
      newWordList = shuffleArray(wordList);
    } else if (routeType === WORD_LIST_TYPE.COLLECTED) {
      newWordList = extractCollectedWordsByTime(entireWordListObject, config.collectedWords);
    } else {
      newWordList = entireWordListSortByAlphabet;
    }

    const newStudyOptions = { ...config.studyOptions[routeType], mode: sortingMode };
    const newConfig = { ...config, studyOptions: { ...config.studyOptions, [routeType]: { ...newStudyOptions } }, updatedAt: getLocalDate() };

    setWordList(newWordList);
    setWordIndex(config.studyOptions[routeType].wordId ?? 0);
    setConfig(newConfig);
  };

  const tryUpdateSelectedLetter = () => {
    const { word } = wordList[wordIndex];
    if (word && getFirstLetter(word) !== selectedLetter) {
      setSelectedLetter(getFirstLetter(word));
    }
  };

  const updateStudyOptions = () => {
    if (sortingMode === SORTING_MODE.SHUFFLE) {
      return;
    }
    const newConfig = {
      ...config,
      studyOptions: {
        ...config.studyOptions,
        [routeType]: { ...config.studyOptions[routeType], wordId: wordIndex },
      },
      updatedAt: getLocalDate(),
    };
    setConfig(newConfig);
  };

  const onWordIndexChange = () => {
    tryUpdateSelectedLetter();
    updateStudyOptions();
  };

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    updateStorage();
  }, [debouncedConfig]);

  useUpdateEffect(() => {
    onSortingModeChange();
  }, [sortingMode]);

  useUpdateEffect(() => {
    onWordIndexChange();
  }, [wordIndex]);

  useEffect(() => {
    createEnterStudyScreenEvent();
  }, []);

  // const setupWebSocket = async () => {
  //   // Note that readyState only turns to OPEN once
  //   if (readyState !== ReadyState.OPEN || accessToken.current === null) {
  //     return;
  //   }
  //   if (accessToken.current) {
  //     sendJsonMessage({ data: config.collectedWords, accessToken: accessToken.current, ts: config.updatedAt });
  //   }
  // };

  // const wsMessageOnReceive = async () => {
  //   if (lastJsonMessage === null) {
  //     return;
  //   }
  //   const { isStale, data, ts, error } = lastJsonMessage;
  //   if (error && !isStale) {
  //     logger(`Update config to server error: ${error}`);
  //   }
  //   if (isStale) {
  //     await storage.setData(STORAGE_CONFIG, { ...config, collectedWords: data, updatedAt: ts });
  //     setConfig(prev => ({ ...prev, collectedWords: data, updatedAt: ts }));
  //     logger('Just updated the latest config from server!');
  //   }
  // };

  // useEffect(() => {
  //   setupWebSocket();
  // }, [readyState]);

  // useEffect(() => {
  //   wsMessageOnReceive();
  // }, [lastJsonMessage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      updateStorageInstantly();
      createLeaveStudyScreenEvent({ studyType: routeType, wordCount, timeElapsed });
    });
    return unsubscribe;
  }, [wordCount, timeElapsed]);

  const alphabetSliderOnChange = letter => {
    if (sortingMode === SORTING_MODE.SHUFFLE) {
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
      setConfig(newConfig);

      // if (accessToken.current) {
      //   sendJsonMessage({ data: collectedWords, accessToken: accessToken.current, ts: time });
      // }
    };

  const onCopyText = text => () => {
    Clipboard.setString(text);
    setDisplayCopyText(true);
    setTimeout(() => setDisplayCopyText(false), COPY_TEXT_ALERT_TIME_PERIOD);
  };

  const onPressSpeak =
    ({ text, language }) =>
    () => {
      if (language) {
        Tts.setDefaultLanguage(getSpeechLanguage({ language }));
      }
      Tts.speak(text);
      if (language) {
        Tts.setDefaultLanguage(defaultSpeechLang);
      }
    };

  const onPressSpeakAll =
    ({ wordData }) =>
    () => {
      const needChangeLanguage = config.language !== LANGS_SUPPORTED.en;
      Tts.speak(wordData.word);

      wordData.detail.forEach(({ meaning, example }) => {
        const meaningText = meaning[LANGS_SUPPORTED[config.language]] || meaning[LANGS_SUPPORTED.en];
        const exampleText = constructWordExample(example);
        if (needChangeLanguage) {
          Tts.setDefaultLanguage(getSpeechLanguage({ language: config.language }));
        }
        Tts.speak(meaningText);
        if (needChangeLanguage) {
          Tts.setDefaultLanguage(defaultSpeechLang);
        }
        Tts.speak(exampleText);
      });
    };

  const onPress = () => {
    setWordIndex(prevIdx => (prevIdx + 1 < wordList.length ? prevIdx + 1 : 0));
  };

  const undoIconOnPress = () => {
    setWordIndex(prevIdx => (prevIdx > 0 ? prevIdx - 1 : wordList.length - 1));
  };

  const wordData = loading ? {} : wordList[wordIndex];

  const isCollected = isObjectEmpty(wordData) ? false : config.collectedWords.includes(wordData.id);

  const showSlider = sortingMode === SORTING_MODE.ALPHABETIZE;

  const showBilingual = config.showBilingual && config.language !== LANGS_SUPPORTED.en;

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
            style={{ top: 48 }}
            alignSelf='center'
            rounded='lg'
          >
            <Text size='2xs' color='base.white'>
              Copied!
            </Text>
          </Box>
          <View flex={8} px={8} justifyContent='flex-start' mx={deviceIsTablet(deviceInfo) ? 32 : 0}>
            <View flex={1}>
              <Box width='100%'>
                <CollectedWordsTooltip
                  display={routeType === WORD_LIST_TYPE.COLLECTED}
                  progress={`${wordIndex + 1} / ${wordList.length}`}
                  wordType={isToeflWord(wordData) ? 'TOEFL' : 'GRE'}
                  config={config}
                />
                <TouchableOpacity onPress={onPress} width='100%'>
                  <WordCard
                    wordData={wordData}
                    language={config.language}
                    fontSize={config.fontSize}
                    fontStyle={config.fontStyle}
                    isCollected={isCollected}
                    onPressSpeak={onPressSpeak}
                    onCopyText={onCopyText}
                    onCollectWord={onCollectWord}
                    showBilingual={showBilingual}
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
              <SpeakerIconButton onPress={onPressSpeakAll({ wordData })} />
              <StarIconButton isCollected={isCollected} onPress={onCollectWord({ id: wordData.id, isCollected })} />
              <SortingMenu sortingMode={sortingMode} setSortingMode={setSortingMode} type={routeType} />
            </Box>
          </View>
          <View flex={0.5} />
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

export default StudyScreen;
