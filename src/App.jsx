import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';
import { registerRootComponent } from 'expo';

import { Box, Button, Center, FlatList, NativeBaseProvider } from 'native-base';

import HomeScreen from 'pages/HomeScreen';
import Login from 'pages/Login';
import Study from 'pages/Study';
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

const StudyScreen = ({ navigation, route }) => (
  <View style={styles.container}>
    <Study />
  </View>
);

const LogoTitle = () => <Image style={{ width: 36, height: 36 }} source={logo} />;

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
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: props => <LogoTitle {...props} />,
          }}
        />
        <Stack.Screen name='Study' component={StudyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
);

StudyScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default registerRootComponent(App);
