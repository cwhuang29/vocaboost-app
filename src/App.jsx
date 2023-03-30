import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

import Login from 'pages/Login';
import logo from 'assets/icon.png';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ProfileScreen = ({ route }) => (
  <View style={styles.container}>
    <Text>This is {route.params.name}'s profile</Text>
    <StatusBar style='auto' />
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => <Button onPress={() => setCount(c => c + 1)} title='Update count' />,
    });
  }, [navigation]);

  return (
    <View>
      <Text>count: {count}</Text>
      <Button title='Go to profile' onPress={() => navigation.navigate('Profile', { name: 'XXX' })} />
    </View>
  );
};

const LogoTitle = () => <Image style={{ width: 50, height: 50 }} source={logo} />;

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
);

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

ProfileScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default registerRootComponent(App);
