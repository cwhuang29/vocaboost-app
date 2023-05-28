import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';

import { AspectRatio, Box, Center, Heading, useColorMode, useTheme, VStack } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import CollectedWordListSvg from 'shared/svgs/collectedWordListSvg';
import WordListSvg from 'shared/svgs/wordListSvg';
import { isDarkMode } from 'shared/utils/style';

const HomeBox = ({ text, imgXml, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Box alignItems='center'>
      <Box maxW='80' minW='80' rounded='xl' overflow='hidden'>
        <AspectRatio w='100%' ratio={16 / 9}>
          <SvgXml xml={imgXml} width='100%' height='100%' />
        </AspectRatio>
        <Box p={5} _light={{ bgColor: 'vhlight.100' }} _dark={{ bgColor: 'vhdark.100' }}>
          <Heading size='md' ml='-1' textAlign='center' _light={{ color: 'vhlight.50' }} _dark={{ color: 'vhdark.50' }}>
            {text}
          </Heading>
        </Box>
      </Box>
    </Box>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const bgColor = isDarkMode(colorMode) ? colors.vhdark[200] : colors.vhlight[200];
  const onPress =
    ({ type }) =>
    () => {
      navigation.navigate('Study', { type });
    };

  return (
    <Center flex={1} justifyContent='center' bgColor={bgColor}>
      <VStack mt={4} space='16' alignItems='center'>
        <HomeBox text='TOEFL' imgXml={WordListSvg} onPress={onPress({ type: WORD_LIST_TYPE.TOEFL })} />
        <HomeBox text='GRE' imgXml={WordListSvg} onPress={onPress({ type: WORD_LIST_TYPE.GRE })} />
        <HomeBox text='Collected' imgXml={CollectedWordListSvg} onPress={onPress({ type: WORD_LIST_TYPE.COLLECTED })} />
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
