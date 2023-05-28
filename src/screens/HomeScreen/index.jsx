import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';

import { AspectRatio, Box, Center, Heading, useColorMode, useTheme, VStack } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import { useDeviceInfoContext } from 'shared/hooks/useDeviceInfoContext';
import CollectedWordListSvg from 'shared/svgs/collectedWordListSvg';
import WordListSvg1 from 'shared/svgs/wordListSvg1';
import WordListSvg2 from 'shared/svgs/wordListSvg2';
import { deviceIsTablet } from 'shared/utils/devices';
import { isDarkMode } from 'shared/utils/style';

const HomeBox = ({ text, imgXml, onPress }) => {
  const deviceInfo = useDeviceInfoContext();
  const maxWidth = deviceIsTablet(deviceInfo) ? '390' : '300';
  const wordBoxPadding = deviceIsTablet(deviceInfo) ? 5 : 3;

  return (
    <TouchableOpacity onPress={onPress}>
      <Box alignItems='center' mt={4} mx={4} style={{ maxWidth: 390 }}>
        <Box rounded='xl' overflow='hidden' w='85%' maxW={maxWidth}>
          <AspectRatio w='100%' ratio={16 / 9}>
            <SvgXml xml={imgXml} width='100%' height='100%' />
          </AspectRatio>
          <Box p={wordBoxPadding} _light={{ bgColor: 'vhlight.100' }} _dark={{ bgColor: 'vhdark.100' }}>
            <Heading size='md' textAlign='center' _light={{ color: 'vhlight.50' }} _dark={{ color: 'vhdark.50' }}>
              {text}
            </Heading>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const bgColor = isDarkMode(colorMode) ? colors.vhdark[200] : colors.vhlight[200];
  const deviceInfo = useDeviceInfoContext();
  const space = deviceIsTablet(deviceInfo) ? 12 : 0;
  const onPress =
    ({ type }) =>
    () => {
      navigation.navigate('Study', { type });
    };

  return (
    <Center bgColor={bgColor} safeAreaTop={3} justifyContent='center' flex={1}>
      <VStack space={space} pt={3}>
        <HomeBox text='TOEFL' imgXml={WordListSvg1} onPress={onPress({ type: WORD_LIST_TYPE.TOEFL })} />
        <HomeBox text='GRE' imgXml={WordListSvg2} onPress={onPress({ type: WORD_LIST_TYPE.GRE })} />
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
