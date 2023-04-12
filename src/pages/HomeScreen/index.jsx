import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Center, Heading, VStack } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';

const HomeBox = ({ text, bg, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Center w='64' h='64' bg={bg} rounded='md' shadow={3} _text={{ color: 'white' }}>
      <Heading size='md' color='base.white' fontWeight='bold'>
        {text}
      </Heading>
    </Center>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const onPress =
    ({ type }) =>
    () => {
      navigation.navigate('Study', { type });
    };

  return (
    <Center flex={1} justifyContent='center'>
      <VStack space={4} alignItems='center'>
        <HomeBox text='GRE' bg='indigo.300' onPress={onPress({ type: WORD_LIST_TYPE.GRE })} />
        <HomeBox text='Collected Words' bg='indigo.600' onPress={onPress({ type: WORD_LIST_TYPE.COLLECTED })} />
      </VStack>
    </Center>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

HomeBox.propTypes = {
  text: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default HomeScreen;
