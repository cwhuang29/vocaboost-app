import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';

import { NativeBaseProvider } from 'native-base';

import HomeScreen from 'pages/HomeScreen';
import LoginScreen from 'pages/LoginScreen';
import ProfileScreen from 'pages/ProfileScreen';
import SplashScreen from 'pages/SplashScreen';
import StudyScreen from 'pages/StudyScreen';
import BottomTab from 'components/BottomTab';
import { AUTH_STATUS } from 'shared/actionTypes/auth';
import { SIGNIN_FAILED_MSG, SIGNOUT_FAILED_MSG } from 'shared/constants/messages';
import { STORAGE_AUTH_TOKEN, STORAGE_CONFIG, STORAGE_USER } from 'shared/constants/storage';
import { AuthContext } from 'shared/hooks/useAuthContext';
import { authInitialState, authReducer } from 'shared/reducers/auth';
import authService from 'shared/services/auth.service';
import storage from 'shared/storage';
import { getLatestConfigOnLogin } from 'shared/utils/config';
import logger from 'shared/utils/logger';
import { fontsMap } from 'shared/utils/style';
import defaultTheme from 'shared/utils/theme';

const Stack = createNativeStackNavigator();

const navigatorScreenOptions = {
  headerStyle: { backgroundColor: '#ffedd5' },
  headerTintColor: 'black',
  headerTitleStyle: { fontWeight: 'bold' },
  // headerShown: false,
};

const App = () => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const [fontsHasLoaded, setFontsHasLoaded] = useState(false);
  const [fontsLoaded] = useFonts(fontsMap);

  useEffect(() => {
    if (fontsLoaded) {
      setFontsHasLoaded(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const tryRestoreToken = async () => {
      const token = await storage.getData(STORAGE_AUTH_TOKEN);
      dispatch({ type: AUTH_STATUS.RESTORE_TOKEN, payload: { token } });
    };
    tryRestoreToken();
  }, []);

  const authContext = useMemo(
    () => ({
      signOut: async () => {
        // .catch(err => throw new Error()). Error: Support for the experimental syntax 'throwExpressions' isn't currently enabled
        const resp = await authService.logout().catch(err => err);
        if (!resp.result) {
          throw new Error(SIGNOUT_FAILED_MSG);
        }
        await Promise.all([storage.removeData(STORAGE_USER), storage.removeData(STORAGE_AUTH_TOKEN)]);
        dispatch({ type: AUTH_STATUS.SIGN_OUT });
      },
      signIn: async data => {
        const resp = await authService.login(data).catch(err => logger(`Login error: ${JSON.stringify(err)}`));
        if (!resp) {
          throw new Error(SIGNIN_FAILED_MSG);
        }
        const { token, isNewUser, user } = resp || {};
        await Promise.all([storage.setData(STORAGE_USER, user), storage.setData(STORAGE_AUTH_TOKEN, token)]);
        dispatch({ type: AUTH_STATUS.SIGN_IN, payload: { token } });
        let latestConfig = null;
        if (!isNewUser) {
          latestConfig = await getLatestConfigOnLogin();
          if (latestConfig) {
            await storage.setData(STORAGE_CONFIG, latestConfig);
          }
        }
        return { latestConfig, latestUser: user, isNewUser };
      },
    }),
    []
  );

  return (
    <NativeBaseProvider theme={defaultTheme}>
      {!fontsHasLoaded || state.isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator screenOptions={navigatorScreenOptions}>
              <Stack.Screen name='BottomTab' component={BottomTab} />
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Study' component={StudyScreen} />
              <Stack.Screen name='Profile' component={ProfileScreen} />
              <Stack.Screen name='Login' component={LoginScreen} options={{ animationTypeForReplace: state.isSignout ? 'pop' : 'push' }} />
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      )}
    </NativeBaseProvider>
  );
};

export default registerRootComponent(App);
