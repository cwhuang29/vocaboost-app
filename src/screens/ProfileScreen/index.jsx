import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Dimensions, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import { Avatar, Box, Center, HStack, Link, Modal, MoonIcon, SunIcon, Switch, Text, useColorMode, VStack } from 'native-base';

import SplashScreen from 'screens/SplashScreen';
import { BottomAlert } from 'components/Alerts';
import { Select } from 'components/Selects';
import SignInOut from 'components/SignInOut';
import { CONFIG_STATUS } from 'shared/actionTypes/config';
import { COLOR_MODE, FONT_SIZE, FONT_STYLE } from 'shared/constants';
import apis from 'shared/constants/apis';
import { SMALL_DEVICE_HEIGHT } from 'shared/constants/dimensions';
import { LANGS_DISPLAY, LANGS_SUPPORTED } from 'shared/constants/i18n';
import { EXTENSION_LINK, GOOGLE_FORM_LINK } from 'shared/constants/link';
import { STORAGE_CONFIG } from 'shared/constants/storage';
import { FONT_STYLE_DISPLAY, MAX_Z_INDEX } from 'shared/constants/styles';
import { useDeviceInfoContext } from 'shared/hooks/useDeviceInfoContext';
import { useIconStyle } from 'shared/hooks/useIconStyle';
import { configInitialState, configReducer } from 'shared/reducers/config';
import storage from 'shared/storage';
import { DEFAULT_CONFIG } from 'shared/utils/config';
import { deviceIsIphone } from 'shared/utils/devices';
import { isObjectEmpty } from 'shared/utils/misc';
import { getConfig, getUser } from 'shared/utils/storage';
import { toCapitalize } from 'shared/utils/stringHelpers';
import { getTextSize, isDarkMode } from 'shared/utils/style';

const ExternalLink = ({ link, text }) => (
  <Link isExternal href={link} _text={{ fontSize: 16, color: 'blue.500', fontWeight: 'bold' }} mx={0}>
    {text}
  </Link>
);

// TODO
const iOSModalBody = () => (
  <>
    <Text size='xs' mb={4}>
      VocaBoost&nbsp;
      <ExternalLink link={EXTENSION_LINK} text='extension' />
      &nbsp;highlights GRE words on every web page you visit. Collect unfamiliar words when browsing webpages, and review them on this app.
    </Text>
    <Text size='xs'>
      Visit our&nbsp;
      <ExternalLink link={apis.OFFICAIL_HOME_PAGE} text='official website' />
      &nbsp;and feel free to leave a comment&nbsp;
      <ExternalLink link={GOOGLE_FORM_LINK} text='here' />.
    </Text>
  </>
);

const AndroidModalBody = () => (
  <>
    <Text size='xs' mb={4}>
      VocaBoost extension highlights GRE words on every web page you visit. Collect unfamiliar words when browsing webpages, and review them on this app.
    </Text>
    <VStack space={2}>
      <ExternalLink link={EXTENSION_LINK} text='Download extension' />
      <ExternalLink link={apis.OFFICAIL_HOME_PAGE} text='Go to official website' />
      <ExternalLink link={GOOGLE_FORM_LINK} text='Let us know your opinion' />
    </VStack>
  </>
);

const AdvertisementModal = ({ iconColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Pressable onPress={() => setIsOpen(true)} style={{ zIndex: MAX_Z_INDEX }}>
        <AntDesign name='bulb1' size={36} color={iconColor} />
      </Pressable>
      <Center>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} _backdrop={{ _dark: { bg: 'coolGray.800' }, bg: 'warmGray.500' }}>
          <Modal.Content maxW='95%' minW='92%' maxH='500' _light={{ bgColor: 'vhlight.300' }} _dark={{ bgColor: 'vhdark.300' }}>
            <Modal.Header _light={{ bgColor: 'vhlight.300' }} _dark={{ bgColor: 'vhdark.300' }}>
              Boost Your Performance
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'flex-start' }}>
              <AndroidModalBody />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
};

const smallDeviceStyle = { marginBottom: 2, avatarSize: 'xl', headingSize: 'xl', menuHeadingSize: 'sm', textSize: 'sm', spacing: 1 };
const normalDeviceStyle = { marginBottom: 3, avatarSize: 120, headingSize: '2xl', menuHeadingSize: 'md', textSize: 'md', spacing: 3.5 };

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({});
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [config, dispatch] = useReducer(configReducer, configInitialState);
  const isFocused = useIsFocused();
  const deviceInfo = useDeviceInfoContext();
  const isIphone = useMemo(() => deviceIsIphone(deviceInfo), []);
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useIconStyle();
  const avatarColor = isDarkMode(colorMode) ? '#5F6FBA' : '#394374';

  useEffect(() => {
    const setup = async () => {
      const [latestUserInfo, latestConfig] = await Promise.all([getUser(), getConfig()]);
      setUserInfo(latestUserInfo);
      dispatch({ type: CONFIG_STATUS.OVERRIDE_ALL, payload: latestConfig ?? DEFAULT_CONFIG });
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
      const latestConfig = await getConfig();
      dispatch({ type: CONFIG_STATUS.OVERRIDE_ALL, payload: latestConfig ?? DEFAULT_CONFIG });
      setLoading(false);
    };
    getLatestConfig();
  }, [isFocused]);

  useEffect(() => {
    const windowHeight = Dimensions.get('window').height;
    setIsSmallDevice(windowHeight <= SMALL_DEVICE_HEIGHT);
  }, []);

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

  const onColorModeChange = () => {
    toggleColorMode();
    const value = isDarkMode(colorMode) ? COLOR_MODE.LIGHT : COLOR_MODE.DARK;
    updateConfigToStorage({ type: CONFIG_STATUS.UPDATE_COLOR_MODE, payload: { colorMode: value } });
  };

  const deviceStyle = isSmallDevice ? smallDeviceStyle : normalDeviceStyle;

  return init ? (
    <SplashScreen />
  ) : (
    <>
      <Box safeAreaY='10' safeAreaX='8' flex={1} _light={{ bg: 'vhlight.200' }} _dark={{ bg: 'vhdark.200' }}>
        {isIphone && <Box height={9} />}
        <Box alignItems='center' position='absolute' style={{ top: isIphone ? 70 : 39, right: 20 }}>
          <AdvertisementModal iconColor={iconColor} />
          <SignInOut
            loading={loading}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
            setAlert={setAlertData}
            setConfig={payload => dispatch({ type: CONFIG_STATUS.OVERRIDE_BY_SERVER, payload })}
          />
        </Box>
        <Avatar
          mb={deviceStyle.marginBottom}
          size={deviceStyle.avatarSize}
          alignSelf='center'
          source={{ uri: userInfo?.avatar ?? null }}
          _light={{ bg: 'vhlight.200' }}
          _dark={{ bg: 'vhdark.200' }}
        >
          <AntDesign name='user' size={112} color={avatarColor} />
        </Avatar>
        <Center mb={deviceStyle.marginBottom}>
          <Text size={deviceStyle.headingSize} mb={3}>
            {userInfo?.firstName ?? ''}
          </Text>
          <Text size={getTextSize(config.fontSize ?? DEFAULT_CONFIG.fontSize)}>
            You have collected{' '}
            <Text bold color='vhlight.800'>
              {config.collectedWords?.length ?? '0'}
            </Text>{' '}
            words!
          </Text>
        </Center>
        <VStack space={deviceStyle.spacing}>
          <Text size={deviceStyle.headingSize} alignSelf='center'>
            Settings
          </Text>
          <Text size={deviceStyle.menuHeadingSize}>Language</Text>
          <Select
            options={LANGS_SUPPORTED}
            displayFunc={l => LANGS_DISPLAY[l]}
            value={config.language ?? DEFAULT_CONFIG.language}
            onChange={val => onLanguageChange(val)}
            placeholder='Choose Language'
            isDisabled={loading}
          />
          <Text size={deviceStyle.menuHeadingSize}>Font size</Text>
          <Select
            options={FONT_SIZE}
            displayFunc={s => toCapitalize(FONT_SIZE[s])}
            value={config.fontSize ?? DEFAULT_CONFIG.fontSize}
            onChange={val => onFontSizeChange(val)}
            placeholder='Choose Font Size'
            isDisabled={loading}
          />
          <Text size={deviceStyle.menuHeadingSize}>Font style</Text>
          <Select
            options={FONT_STYLE}
            displayFunc={s => FONT_STYLE_DISPLAY[FONT_STYLE[s]]}
            value={config.fontStyle ?? DEFAULT_CONFIG.fontStyle}
            onChange={val => onFontStyleChange(val)}
            placeholder='Choose Font Style'
            isDisabled={loading}
          />
          <Text size={deviceStyle.menuHeadingSize}>Color Mode</Text>
          <HStack mt={0.2} alignItems='center'>
            <SunIcon size='6' _light={{ color: 'vhlight.700' }} _dark={{ color: 'vhdark.700' }} />
            <Switch
              isChecked={isDarkMode(colorMode)}
              onToggle={onColorModeChange}
              mx={4}
              size='md'
              onTrackColor='#ABABAB'
              onThumbColor='vhdark.200'
              offTrackColor='#DFDFDF'
              offThumbColor='vhlight.200'
            />
            <MoonIcon size='6' _light={{ color: 'vhlight.700' }} _dark={{ color: 'vhdark.700' }} />
          </HStack>
        </VStack>
      </Box>
      {!isObjectEmpty(alertData) && <BottomAlert {...alertData} bottom={4} />}
    </>
  );
};

AdvertisementModal.propTypes = {
  iconColor: PropTypes.string.isRequired,
};

ExternalLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ProfileScreen;
