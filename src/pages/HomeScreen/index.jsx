import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { AspectRatio, Box, Center, Heading, Image, Stack, Text, HStack, VStack } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';

// const HomeBox = ({ text, bg, imgPath, onPress }) => (
//   <TouchableOpacity onPress={onPress}>
//     <Center w='64' h='64' bg={bg} borderWidth={3} borderColor='vhlight.200' rounded='md' _text={{ color: 'vhlight.200' }}>
//       <Image source={require(imgPath)} size='64px' borderWidth={3} borderColor='vhlight.200' rounded='lg' />
//       <Heading size='lg' color='vhlight.100:alpha.90' fontWeight='600' fontFamily='roboto'>
//         {text}
//       </Heading>
//     </Center>
//   </TouchableOpacity>
// );

const HomeBox = ({ text, bg, imgPath, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Box alignItems="center">
      <Box maxW="80" rounded="xl" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        // borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{ uri: imgPath }} alt="image" />
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
        <HomeBox text='GRE' bg='#fef1f1' imgPath='/Users/yunchipang/dev/vocaboost-app/src/assets/home/undraw_Exams_re_4ios.png' onPress={onPress({ type: WORD_LIST_TYPE.GRE })} />
        <HomeBox text='Colleted' bg='#fef1f1' imgPath='../../assets/home/undraw_Exams_re_4ios.png' onPress={onPress({ type: WORD_LIST_TYPE.COLLECTED })} />
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
  imgPath: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default HomeScreen;
