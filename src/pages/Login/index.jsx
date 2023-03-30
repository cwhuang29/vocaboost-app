import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Login = ({ navigation, route }) => {
  console.log(navigation);
  console.log(route);

  return (
    <View style={styles.container}>
      <Text>This is {route.params}'s profile</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Login;
