import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';

import { AspectRatio, Box, Center, Heading, Stack, useColorMode, useTheme, VStack } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import CollectedWordListSvg from 'shared/svgs/collectedWordListSvg';
import WordListSvg from 'shared/svgs/wordListSvg';
import { isDarkMode } from 'shared/utils/style';

const HomeBox = ({ text, imgXml, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Box alignItems='center' shadow='1'>
      <Box maxW='80' minW='80' rounded='xl' overflow='hidden'>
        <Box>
          <AspectRatio w='100%' ratio={16 / 9}>
            <SvgXml xml={imgXml} width='100%' height='100%' />
          </AspectRatio>
        </Box>
        <Stack p='4' space={3} _light={{ bgColor: 'vhlight.100' }} _dark={{ bgColor: 'vhdark.100' }}>
          <Heading fontWeight='extrabold' size='md' ml='-1' textAlign='center' _light={{ color: 'vhlight.50' }} _dark={{ color: 'vhdark.50' }}>
            {text}
          </Heading>
        </Stack>
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
