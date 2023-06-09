import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import { NativeBaseProvider, useTheme } from 'native-base';

import SplashScreen from 'screens/SplashScreen';
import StudyScreen from 'screens/StudyScreen';
import BottomTab from 'components/BottomTab';
import { AUTH_STATUS } from 'shared/actionTypes/auth';
import { SIGNIN_FAILED_MSG, SIGNOUT_FAILED_MSG } from 'shared/constants/messages';
import { STORAGE_AUTH_TOKEN, STORAGE_CONFIG, STORAGE_USER } from 'shared/constants/storage';
import { AuthContext } from 'shared/hooks/useAuthContext';
import { DeviceInfoContext } from 'shared/hooks/useDeviceInfoContext';
import { useIsDarkMode } from 'shared/hooks/useIsDarkMode';
import { authInitialState, authReducer } from 'shared/reducers/auth';
import authService from 'shared/services/auth.service';
import storage from 'shared/storage';
import { getLatestConfigOnLogin, setupDefaultConfig } from 'shared/utils/config';
import { getDeviceInfo } from 'shared/utils/devices';
import { createEnterAppEvent, createLoginEvent, createLogoutEvent } from 'shared/utils/eventTracking';
import logger from 'shared/utils/logger';
import { isObjectEmpty } from 'shared/utils/misc';
import { colorModeManager, fontsMap } from 'shared/utils/style';
import defaultTheme from 'shared/utils/theme';

const Stack = createNativeStackNavigator();

const AppCore = () => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const [loading, setLoading] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [fontsLoaded] = useFonts(fontsMap);
  const { colors } = useTheme();
  const isDarkMode = useIsDarkMode();
  const bgColor = isDarkMode ? colors.vhdark[1100] : colors.vhlight[1100];

  const tryRestoreToken = async () => {
    const token = await storage.getData(STORAGE_AUTH_TOKEN);
    dispatch({ type: AUTH_STATUS.RESTORE_TOKEN, payload: { token } });
  };

  const setupConfig = async () => {
    await setupDefaultConfig();
    setLoading(false);
  };

  useEffect(() => {
    createEnterAppEvent();
    tryRestoreToken();
    setupConfig();
  }, []);

  useEffect(() => {
    const loadDeviceInfo = async () => {
      const dInfo = await getDeviceInfo();
      setDeviceInfo(dInfo);
    };
    loadDeviceInfo();
  }, []);

  const authContext = useMemo(
    () => ({
      signOut: async () => {
        createLogoutEvent();
        await authService.logout().catch(err => err); // .catch(err => throw new Error()). Error: Support for the experimental syntax 'throwExpressions' isn't currently enabled
        await Promise.all([storage.removeData(STORAGE_USER), storage.removeData(STORAGE_AUTH_TOKEN)]);
        dispatch({ type: AUTH_STATUS.SIGN_OUT });
      },
      signIn: async data => {
        const resp = await authService.login(data).catch(err => {
          logger(`Login error: ${JSON.stringify(err)}`);
          return { ...err, failed: true };
        });
        if (resp.failed) {
          const { title, content } = resp;
          const e = new Error();
          Object.assign(e, { title: title || SIGNIN_FAILED_MSG.TITLE, content: content || SIGNOUT_FAILED_MSG.CONTENT });
          throw e;
        }
        const { token, isNewUser, user } = resp || {};
        await Promise.all([createLoginEvent({ token }), storage.setData(STORAGE_USER, user), storage.setData(STORAGE_AUTH_TOKEN, token)]);
        dispatch({ type: AUTH_STATUS.SIGN_IN, payload: { token } });
        let latestConfig = null;
        if (!isNewUser) {
          latestConfig = await getLatestConfigOnLogin();
          if (isObjectEmpty(latestConfig)) {
            await storage.setData(STORAGE_CONFIG, latestConfig);
          }
        }
        return { latestConfig, latestUser: user, isNewUser };
      },
    }),
    []
  );

  const notReady = loading || !fontsLoaded || state.isLoading;

  return notReady ? (
    <SplashScreen showMessage={fontsLoaded} />
  ) : (
    <NavigationContainer>
      <DeviceInfoContext.Provider value={deviceInfo}>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator
            screenOptions={{
              contentStyle: { backgroundColor: bgColor },
              headerShown: false,
            }}
          >
            <Stack.Screen name='BottomTab' component={BottomTab} />
            <Stack.Screen name='Study' component={StudyScreen} />
          </Stack.Navigator>
        </AuthContext.Provider>
      </DeviceInfoContext.Provider>
    </NavigationContainer>
  );
};

const App = () => (
  <NativeBaseProvider theme={defaultTheme} colorModeManager={colorModeManager}>
    <AppCore />
  </NativeBaseProvider>
);

export default App;
