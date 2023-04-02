import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

import { Box, Button, Center, FlatList, NativeBaseProvider, Text, useColorMode, useTheme } from 'native-base';

// import Login from 'pages/Login';
import Home from 'pages/Home';
import defaultTheme from 'shared/utils/theme';
import logo from 'assets/favicon.png';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const LogoTitle = () => <Image style={{ width: 36, height: 36 }} source={logo} />;

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
        {/* <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: props => <LogoTitle {...props} />,
          }}
        /> */}
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
);

// HomeScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//     setOptions: PropTypes.func.isRequired,
//   }).isRequired,
// };

// ProfileScreen.propTypes = {
//   route: PropTypes.object.isRequired,
// };

export default registerRootComponent(App);
