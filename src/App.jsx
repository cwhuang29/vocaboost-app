import React, { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';

import { NativeBaseProvider } from 'native-base';

import HomeScreen from 'pages/HomeScreen';
import Login from 'pages/Login';
import ProfileScreen from 'pages/ProfileScreen';
import SplashScreen from 'pages/SplashScreen';
import StudyScreen from 'pages/StudyScreen';
import BottomTab from 'components/BottomTab';
import { AUTH_STATUS } from 'shared/actionTypes/auth';
import { STORAGE_AUTH_TOKEN, STORAGE_USER } from 'shared/constants/storage';
import { AuthContext } from 'shared/hooks/useAuthContext';
import { authInitialState, authReducer } from 'shared/reducers/auth';
import authService from 'shared/services/auth.service';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';
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

  useEffect(() => {
    const tryRestoreToken = async () => {
      const token = await storage.getData(STORAGE_AUTH_TOKEN);
      dispatch({ type: AUTH_STATUS.RESTORE_TOKEN, payload: { token } });
    };
    tryRestoreToken();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        const { token, user } = await authService.login(data).catch(err => {
          logger(`Login error: ${JSON.stringify(err)}`); // TODO Popup error message
        });
        await Promise.all([storage.setData(STORAGE_USER, user), storage.setData(STORAGE_AUTH_TOKEN, token)]);
        dispatch({ type: AUTH_STATUS.SIGN_IN, payload: { token } });
      },
      signOut: async () => {
        await Promise.all([storage.removeData(STORAGE_USER), storage.removeData(STORAGE_AUTH_TOKEN)]);
        await authService.logout().catch(() => {}); // For logout, just ignore error message
        dispatch({ type: AUTH_STATUS.SIGN_OUT });
      },
    }),
    []
  );

  return (
    <NativeBaseProvider theme={defaultTheme}>
      {state.isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator screenOptions={navigatorScreenOptions}>
              {state.token ? (
                <>
                  <Stack.Screen name='BottomTab' component={BottomTab} />
                  <Stack.Screen name='Home' component={HomeScreen} />
                  <Stack.Screen name='Study' component={StudyScreen} />
                  <Stack.Screen name='Profile' component={ProfileScreen} />
                </>
              ) : (
                <>
                  <Stack.Screen name='Login' component={Login} options={{ animationTypeForReplace: state.isSignout ? 'pop' : 'push' }} />
                  <Stack.Screen name='Profile' component={ProfileScreen} />
                </>
              )}
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      )}
    </NativeBaseProvider>
  );
};

export default registerRootComponent(App);
