import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Center, Flex, VStack } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';

const HomeBox = ({ text, bg, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Center w='64' h='64' bg={bg} rounded='md' shadow={3} _text={{ color: 'white' }}>
      {text}
    </Center>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const onPress = ({ type }) => {
    if (type === WORD_LIST_TYPE.GRE) {
      navigation.navigate('Study', { type: WORD_LIST_TYPE.GRE });
    }
  };

  return (
    <Flex flex={1} justifyContent='center'>
      <VStack space={4} alignItems='center'>
        <HomeBox text='GRE 1500' bg='indigo.300' onPress={() => onPress({ type: WORD_LIST_TYPE.GRE })} />
        <HomeBox text='Collected Words' bg='indigo.600' onPress={() => onPress({ type: WORD_LIST_TYPE.COLLECTED })} />
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
