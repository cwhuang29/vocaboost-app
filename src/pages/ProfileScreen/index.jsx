import React, { useContext, useEffect, useReducer, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useIsFocused } from '@react-navigation/native';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';

import { Avatar, Box, Button, Center, Heading, Text, View, VStack } from 'native-base';

import SplashScreen from 'pages/SplashScreen';
import { Select } from 'components/Selects';
import { CONFIG_STATUS } from 'shared/actionTypes/config';
import { FONT_SIZE, FONT_STYLE, LANGS } from 'shared/constants';
import { LANGS_DISPLAY } from 'shared/constants/i18n';
import { STORAGE_CONFIG, STORAGE_USER } from 'shared/constants/storage';
import { AuthContext } from 'shared/hooks/useAuthContext';
import { configInitialState, configReducer } from 'shared/reducers/config';
import storage from 'shared/storage';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import { transformGoogleLoginResp } from 'shared/utils/loginAPIFormatter';
import { toCapitalize } from 'shared/utils/stringHelpers';

import { showGoogleLoginErr } from './helper';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [config, dispatch] = useReducer(configReducer, configInitialState);
  const { signIn, signOut } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID,
      // androidClientId: GOOGLE_LOGIN_ANDROID_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    const setup = async () => {
      GoogleSignin.configure({ iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID });
      const [stillSignedIn, latestUserInfo, latestConfig] = await Promise.all([
        GoogleSignin.isSignedIn(),
        storage.getData(STORAGE_USER),
        storage.getData(STORAGE_CONFIG),
      ]);
      setIsSignedIn(stillSignedIn);
      setUserInfo(latestUserInfo);
      dispatch({ type: CONFIG_STATUS.OVERRIDE_ALL, payload: { ...(latestConfig ?? DEFAULT_CONFIG) } });
      setInit(false);
    };
    setup();
  }, []);

  useEffect(() => {
    const getLatestConfig = async () => {
      if (!isFocused) {
        return;
      }
      setLoading(true);
      const latestConfig = await storage.getData(STORAGE_CONFIG);
      dispatch({ type: CONFIG_STATUS.OVERRIDE_ALL, payload: latestConfig });
      setLoading(false);
    };
    getLatestConfig();
  }, [isFocused]);

  const googleSignIn = async () => {
    try {
      setLoading(true);
      // Always resolves to true on iOS. Presence of up-to-date Google Play Services is required to show the sign in modal
      await GoogleSignin.hasPlayServices();
      const uInfo = await GoogleSignin.signIn();
      await signIn(transformGoogleLoginResp(uInfo));

      const [latestUserInfo, latestConfig] = await Promise.all([storage.getData(STORAGE_USER), storage.getData(STORAGE_CONFIG)]);
      setUserInfo(latestUserInfo);
      dispatch({ type: CONFIG_STATUS.OVERRIDE_ALL, payload: { ...(latestConfig ?? DEFAULT_CONFIG) } });
      setIsSignedIn(true);
    } catch (err) {
      showGoogleLoginErr(err);
    } finally {
      setLoading(false);
    }
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      signOut();
      setIsSignedIn(false);
      setUserInfo({});
    } catch (err) {
      logger(err); // TODO If logout from google server failed, ask user to logout again
    }
  };

  const updateConfigToStorage = async ({ type, payload }) => {
    await storage.setData(STORAGE_CONFIG, { ...config, ...payload });
    dispatch({ type, payload });
  };

  const onLanguageChange = val => {
    updateConfigToStorage({ type: CONFIG_STATUS.UPDATE_LANGUAGE, payload: { language: val } });
  };

  const onFontSizeChange = val => {
    updateConfigToStorage({ type: CONFIG_STATUS.UPDATE_FONT_SIZE, payload: { fontSize: val } });
  };

  const onFontStyleChange = val => {
    updateConfigToStorage({ type: CONFIG_STATUS.UPDATE_FONT_STYLE, payload: { fontStyle: val } });
  };

  return init ? (
    <SplashScreen />
  ) : (
    <Box safeArea='5' flex={1}>
      <View flex={1} />
      <View flex={25}>
        <Avatar mb={2} size='xl' alignSelf='center' source={{ uri: userInfo?.avatar ?? null }} />
        <Center>
          <Heading mb={2}>{userInfo?.firstName ?? 'username'}</Heading>
          <Text mb={4}>
            You have collected <Text bold>{config.collectedWords.length}</Text> words!
          </Text>
        </Center>
        <VStack space={4} mb={5}>
          <Heading alignSelf='center'>Settings</Heading>
          <Heading size='md'>Language</Heading>
          <Select
            options={LANGS}
            displayFunc={l => LANGS_DISPLAY[l]}
            value={config.language ?? DEFAULT_CONFIG.language}
            onChange={val => onLanguageChange(val)}
            placeholder='Choose Language'
            isDisabled={loading}
          />
          <Heading size='md'>Font Size</Heading>
          <Select
            options={FONT_SIZE}
            displayFunc={s => toCapitalize(FONT_SIZE[s])}
            value={config.fontSize}
            onChange={val => onFontSizeChange(val)}
            placeholder='Choose Font Size'
            isDisabled={loading}
          />
          <Heading size='md'>Font Style</Heading>
          <Select
            options={FONT_STYLE}
            displayFunc={s => toCapitalize(FONT_STYLE[s])}
            value={config.fontStyle}
            onChange={val => onFontStyleChange(val)}
            placeholder='Choose Font Style'
            isDisabled={loading}
          />
        </VStack>
        {isSignedIn ? (
          <Button variant='vh2' width={120} onPress={googleSignOut} alignSelf='center'>
            Sign out
          </Button>
        ) : (
          <Button variant='vh2' width={120} onPress={googleSignIn} alignSelf='center'>
            Sign in
          </Button>
        )}
      </View>
      <View flex={1} />
    </Box>
  );
};

export default ProfileScreen;
