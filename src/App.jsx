import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';

import { NativeBaseProvider } from 'native-base';

import HomeScreen from 'pages/HomeScreen';
import Login from 'pages/Login';
import ProfileScreen from 'pages/ProfileScreen';
import StudyScreen from 'pages/StudyScreen';
import BottomTab from 'components/BottomTab';
import { STORAGE_AUTH_TOKEN } from 'shared/constants/storage';
import storage from 'shared/storage';
import defaultTheme from 'shared/utils/theme';
import logo from 'assets/favicon.png';

const Stack = createNativeStackNavigator();

const navigatorScreenOptions = {
  headerStyle: { backgroundColor: '#ffedd5' },
  headerTintColor: 'black',
  headerTitleStyle: { fontWeight: 'bold' },
  // headerShown: false,
};

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const getIsSignedIn = async () => {
      const accessToken = await storage.getData(STORAGE_AUTH_TOKEN);
      if (accessToken) {
        setIsSignedIn(true);
      }
    };
    getIsSignedIn();
  }, [isSignedIn]);

  return (
    <NativeBaseProvider theme={defaultTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={navigatorScreenOptions}>
          {isSignedIn ? (
            <>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='BottomTab' component={BottomTab} />
              <Stack.Screen name='Study' component={StudyScreen} />
              <Stack.Screen name='Profile' component={ProfileScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Profile' component={ProfileScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default registerRootComponent(App);
