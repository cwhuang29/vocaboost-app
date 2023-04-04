import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';

import { Center, Flex, VStack } from 'native-base';

<<<<<<< HEAD
import { STORAGE_USER } from 'shared/constants/storage';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';

=======
import { STORAGE_LOGIN_INFO } from 'shared/constants/storage';
import storage from 'shared/storage';
import logger from 'shared/utils/logger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

>>>>>>> 64fde0a (Fix navigation bug, move ColorPalete component, and revise HomeScreen)
const HomeBox = ({ text, bg, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Center w='64' h='64' bg={bg} rounded='md' shadow={3} _text={{ color: 'white' }}>
      {text}
    </Center>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfoCache, setUserInfoCache] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      setloggedIn(isSignedIn);
      if (isSignedIn) {
<<<<<<< HEAD
        const loginData = await storage.getData(STORAGE_USER);
=======
        const loginData = await storage.getData(STORAGE_LOGIN_INFO);
>>>>>>> 64fde0a (Fix navigation bug, move ColorPalete component, and revise HomeScreen)
        setUserInfoCache(loginData);
      } else {
        setUserInfoCache([]);
      }
    };
    getUserInfo();
  }, []);

  const onPress = ({ type }) => {
    if (type === 'gre') {
      navigation.navigate('Study', { type: 'gre'});
    }
  };

  return (
    <Flex flex={1} justifyContent='center'>
      <VStack space={4} alignItems='center'>
        <HomeBox text='GRE 1500' bg='indigo.300' onPress={() => onPress({ type : 'gre'})} />
        <HomeBox text='Collected Words' bg='indigo.600' onPress={() => onPress({ type : 'collected'})} />
      </VStack>
    </Flex>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;