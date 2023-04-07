import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Center, Flex, VStack } from 'native-base';

const HomeBox = ({ text, bg, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Center w='64' h='64' bg={bg} rounded='md' shadow={3} _text={{ color: 'white' }}>
      {text}
    </Center>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const onPress = ({ type }) => {
    if (type === 'gre') {
      navigation.navigate('Study', { type: 'gre' });
    }
  };

  return (
    <Flex flex={1} justifyContent='center'>
      <VStack space={4} alignItems='center'>
        <HomeBox text='GRE 1500' bg='indigo.300' onPress={() => onPress({ type: 'gre' })} />
        <HomeBox text='Collected Words' bg='indigo.600' onPress={() => onPress({ type: 'collected' })} />
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
