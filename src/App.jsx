import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = ({ navigation }) => <Button title='Go to profile page' onPress={() => navigation.navigate('Profile', { name: 'XXX' })} />;

const ProfileScreen = ({ route }) => (
  <View style={styles.container}>
    <Text>This is {route.params.name}'s profile</Text>
    <StatusBar style='auto' />
  </View>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Welcome' }} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ProfileScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default registerRootComponent(App);
