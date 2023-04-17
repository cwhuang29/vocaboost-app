import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';

import { AspectRatio, Box, Center, Heading, Stack, VStack } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import CollectedWordListSvg from 'shared/svgs/collectedWordListSvg';
import WordListSvg from 'shared/svgs/wordListSvg';

const HomeBox = ({ text, imgXml, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Box alignItems='center' shadow='1'>
      <Box maxW='80' minW='80' rounded='xl' overflow='hidden' _dark={{ backgroundColor: 'vhdark.200' }} _light={{ backgroundColor: 'vhlight.200' }}>
        <Box>
          <AspectRatio w='100%' ratio={16 / 9}>
            <SvgXml xml={imgXml} width='100%' height='100%' />
          </AspectRatio>
        </Box>
        <Stack p='4' space={3} bgColor='vhlight.100'>
          <Heading size='md' ml='-1' textAlign='center'>
            {text}
          </Heading>
        </Stack>
      </Box>
    </Box>
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
      <VStack mt={4} space={8} alignItems='center'>
        <HomeBox text='GRE' imgXml={WordListSvg} onPress={onPress({ type: WORD_LIST_TYPE.GRE })} />
        <HomeBox text='Colleted' imgXml={CollectedWordListSvg} onPress={onPress({ type: WORD_LIST_TYPE.COLLECTED })} />
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
  imgXml: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default HomeScreen;
