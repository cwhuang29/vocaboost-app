import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Pressable } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_LOGIN_IOS_CLIENT_ID } from '@env';
import { AntDesign } from '@expo/vector-icons';

import { Avatar, Box, Center, Heading, Link, Modal, Text, View, VStack } from 'native-base';

import SplashScreen from 'pages/SplashScreen';
import { BottomAlert } from 'components/Alerts';
import { Select } from 'components/Selects';
import { CONFIG_STATUS } from 'shared/actionTypes/config';
import { ALERT_TYPES, FONT_STYLE, LANGS } from 'shared/constants';
import { LANGS_DISPLAY } from 'shared/constants/i18n';
import { EXTENSION_LINK } from 'shared/constants/link';
import { SIGNIN_FAILED_MSG, WELCOME_MSG } from 'shared/constants/messages';
import { STORAGE_CONFIG, STORAGE_USER } from 'shared/constants/storage';
import { FONT_STYLE_DISPLAY, MAX_Z_INDEX } from 'shared/constants/styles';
import { AuthContext } from 'shared/hooks/useAuthContext';
import { configInitialState, configReducer } from 'shared/reducers/config';
import storage from 'shared/storage';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import logger from 'shared/utils/logger';
import { transformGoogleLoginResp } from 'shared/utils/loginAPIFormatter';
import { getLocalDate } from 'shared/utils/time';

import { showGoogleLoginErr } from './helper';

const SignedInOutButton = ({ isSignedIn, onPress }) => {
  const icon = isSignedIn ? 'logout' : 'login';
  const delay = isSignedIn ? 800 : 80;
  return (
    <Pressable onLongPress={onPress} style={{ zIndex: MAX_Z_INDEX }} delayLongPress={delay}>
      <AntDesign
        name={icon}
        size={35}
        color='#3d3d3d'
        position='absolute'
        top={40}
        right={4}
        style={{ transform: [{ rotateY: isSignedIn ? '180deg' : '0deg' }] }}
      />
    </Pressable>
  );
};

const AdvertisementModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Pressable onPress={() => setIsOpen(true)} style={{ zIndex: MAX_Z_INDEX }}>
        <AntDesign name='bulb1' size={35} color='#3d3d3d' position='absolute' top={100} right={4} />
      </Pressable>
      <Center>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} _backdrop={{ _dark: { bg: 'coolGray.800' }, bg: 'warmGray.500' }}>
          <Modal.Content maxW='95%' minW='90%' maxH='500' p={2}>
            <Modal.Header bg='#FCFCFC'>Boost Your Performance</Modal.Header>
            <Modal.Body bg='#FCFCFC'>
              <Text size='sm'>
                Our
                <Link
                  isExternal
                  href={EXTENSION_LINK}
                  _text={{ marginTop: '4', paddingTop: '0.5', paddingX: '1', fontSize: '16', color: 'blue.500', fontWeight: 'bold' }}
                >
                  extension
                </Link>
                highlights GRE vocabulary on every web page you visit.{'\n\n'}You can collect unfamiliar words when browsing webpages, and review them on this
                APP.
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
};

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [config, dispatch] = useReducer(configReducer, configInitialState);
  const { signIn, signOut } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [alertData, setAlertData] = useState({});

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

  const oauthSignIn = async () => {
    let oauthSucceed = false;
    try {
      setLoading(true);
      // Always resolves to true on iOS. Presence of up-to-date Google Play Services is required to show the sign in modal
      await GoogleSignin.hasPlayServices();
      const uInfo = await GoogleSignin.signIn();
      oauthSucceed = true;

      const { latestConfig, latestUser, isNewUser } = await signIn(transformGoogleLoginResp(uInfo));
      if (latestConfig) {
        dispatch({ type: CONFIG_STATUS.OVERRIDE_ALL, payload: { ...latestConfig } });
      }
      if (isNewUser) {
        setAlertData({
          type: ALERT_TYPES.SUCCESS,
          title: WELCOME_MSG.TITLE,
          content: WELCOME_MSG.CONTENT,
          link: EXTENSION_LINK,
          ts: getLocalDate().toString(),
        });
      }
      setUserInfo(latestUser);
      setIsSignedIn(true);
    } catch (err) {
      if (oauthSucceed) {
        // If OAuth signed in failed, either user cancelled it or there would be failed messages displayed on the oauth modal
        setAlertData({ type: ALERT_TYPES.ERROR, title: SIGNIN_FAILED_MSG.TITLE, content: SIGNIN_FAILED_MSG.CONTENT, ts: getLocalDate().toString() });
      }
      showGoogleLoginErr(err);
    } finally {
      setLoading(false);
    }
  };

  const oauthSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await signOut();
    } catch (err) {
      logger(err);
    } finally {
      setIsSignedIn(false); // Always let user signedout
      setUserInfo({});
    }
  };

  const updateConfigToStorage = async ({ type, payload }) => {
    await storage.setData(STORAGE_CONFIG, { ...config, ...payload });
    dispatch({ type, payload });
  };

  const onLanguageChange = val => {
    updateConfigToStorage({ type: CONFIG_STATUS.UPDATE_LANGUAGE, payload: { language: val } });
  };

  const onFontStyleChange = val => {
    updateConfigToStorage({ type: CONFIG_STATUS.UPDATE_FONT_STYLE, payload: { fontStyle: val } });
  };

  return init ? (
    <SplashScreen />
  ) : (
    <Box safeArea='5' flex={1} bg='vhlight.600'>
      <SignedInOutButton isSignedIn={isSignedIn} onPress={isSignedIn ? oauthSignOut : oauthSignIn} />
      <AdvertisementModal />
      <View flex={1} />
      <View flex={8}>
        <Avatar mb={3} size='2xl' alignSelf='center' source={{ uri: userInfo?.avatar ?? null }} bg='vhlight.300:alpha.10'>
          <AntDesign name='user' size={112} color='#394374' />
        </Avatar>
        <Center mb={4}>
          <Heading mb={3}>{userInfo?.firstName ?? ' '}</Heading>
          <Text mb={4} fontFamily={(config.fontStyle ?? DEFAULT_CONFIG.fontStyle).toLowerCase()}>
            You have collected{' '}
            <Text bold color='#F9736A'>
              {config.collectedWords?.length ?? '0'}
            </Text>{' '}
            words!
          </Text>
        </Center>
        <VStack space={4} mb={8}>
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
          <Heading size='md'>Font Style</Heading>
          <Select
            options={FONT_STYLE}
            displayFunc={s => FONT_STYLE_DISPLAY[FONT_STYLE[s]]}
            value={config.fontStyle ?? DEFAULT_CONFIG.fontStyle}
            onChange={val => onFontStyleChange(val)}
            placeholder='Choose Font Style'
            isDisabled={loading}
          />
        </VStack>
      </View>
      <View flex={1} />
      {alertData.type && <BottomAlert {...alertData} bottom={4} />}
    </Box>
  );
};

SignedInOutButton.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ProfileScreen;
