import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';

import { NativeBaseProvider } from 'native-base';

import HomeScreen from 'pages/HomeScreen';
import ProfileScreen from 'pages/ProfileScreen';
// import Login from 'pages/Login';
import StudyScreen from 'pages/StudyScreen';
import BottomTab from 'components/BottomTab';
import defaultTheme from 'shared/utils/theme';
import logo from 'assets/favicon.png';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navigatorScreenOptions = {
  headerStyle: { backgroundColor: '#ffedd5' },
  headerTintColor: 'black',
  headerTitleStyle: { fontWeight: 'bold' },
  // headerShown: false,
};

const App = () => (
  <NativeBaseProvider theme={defaultTheme}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorScreenOptions}>
        <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Study' component={StudyScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
);


export default registerRootComponent(App);