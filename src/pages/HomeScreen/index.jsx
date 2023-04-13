import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Box, Center, Heading, VStack } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';

const HomeBox = ({ text, bg, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Center w='64' h='64' bg={bg} rounded='md' shadow={5} _text={{ color: 'vhlight.200' }}>
      <Heading size='lg' color='vhlight.100:alpha.90' fontWeight='600' fontFamily='roboto'>
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
    <Center flex={1} justifyContent='center' bg='vhlight.600'>
      <VStack mt={4} space={8} alignItems='center'>
        <HomeBox text='GRE' bg='#fef1f1' onPress={onPress({ type: WORD_LIST_TYPE.GRE })} />
        <Box height={0.1} />
        <HomeBox text='Collection' bg='#E7EBFE' onPress={onPress({ type: WORD_LIST_TYPE.COLLECTED })} />
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
