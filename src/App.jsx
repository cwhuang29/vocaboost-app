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

// const ProfileScreen = ({ route }) => (
//   <View style={styles.container}>
//     <Text>This is {route.params.name}'s profile</Text>
//     <StatusBar style='auto' />
//   </View>
// );

// const HomeScreen = ({ navigation }) => {
//   const [count, setCount] = React.useState(0);
//   React.useEffect(() => {
//     navigation.setOptions({
//       // Use `setOptions` to update button in header bar
//       // eslint-disable-next-line react/no-unstable-nested-components
//       headerRight: () => (
//         <Button onPress={() => setCount(c => c + 1)} shadow={1} size='sm' variant='vh1'>
//           Click me
//         </Button>
//       ),
//     });
//   }, [navigation]);

//   return (
//     <View>
//       <Text>count: {count}</Text>
//       <Button onPress={() => navigation.navigate('Login', { name: 'AZ' })} variant='vh2'>
//         Go to login page
//       </Button>
//       <Text>count: {count}</Text>
//     </View>
//   );
// };

const LogoTitle = () => <Image style={{ width: 36, height: 36 }} source={logo} />;

// function ColorPalete() {
//   const { colors } = useTheme();
//   const { colorMode, toggleColorMode } = useColorMode();
//   const key = 'vhdark';
//   return (
//     <Box>
//       <Box>
//         <FlatList numColumns='5' data={Object.keys(colors[key])} renderItem={({ item }) => <Box p='5' bg={`${key}.${item}`} />} />
//         <Text size='lg'>The active color mode is: {colorMode}</Text>
//       </Box>
//       <Center>
//         <Box p='4' maxW='300' mt={7} bg={colorMode === 'dark' ? 'coolGray.800:alpha.70' : 'secondary.600:alpha.60'} safeArea>
//           <Button onPress={toggleColorMode} h={10} variant='vh1'>
//             Toggle
//           </Button>
//         </Box>
//       </Center>
//     </Box>
//   );
// }

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
    {/* <Text mt={20}>Open up App.js to start working on your app!</Text> */}
    {/* <Text mt={20}>{JSON.stringify(defaultTheme.components.Text)}</Text> */}
    {/* <ColorPalete /> */}
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
