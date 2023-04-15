import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { AspectRatio, Box, Center, Heading, Image, Stack, Text, HStack, VStack } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import homePicture1 from 'assets/home/undraw_Exams_re_4ios.png'
import homePicture2 from 'assets/home/undraw_Reading_re_29f8.png'


const HomeBox = ({ text, imgPath, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Box alignItems="center">
      <Box maxW="80" rounded="xl" overflow="hidden" 
        // borderColor="coolGray.200" borderWidth="1" 
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }} 
        _light={{
          backgroundColor: "gray.200"
        }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={imgPath} alt="image" w='100%' h='100%' />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Heading size="md" ml="-1" textAlign='center'>{text}</Heading>
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
    <Center flex={1} justifyContent='center' bg='vhlight.600'>
      <VStack mt={4} space={8} alignItems='center'>
        <HomeBox text='GRE' imgPath={homePicture1} onPress={onPress({ type: WORD_LIST_TYPE.GRE })} />
        <HomeBox text='Colleted' imgPath={homePicture2} onPress={onPress({ type: WORD_LIST_TYPE.COLLECTED })} />
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
  imgPath: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default HomeScreen;
