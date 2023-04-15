import React from 'react';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';

import { Box, Icon, Image, VStack, Text, View } from 'native-base';
import FinishStudyImg from 'assets/study/undraw_Winners_re_wr1l.png'

const FinishStudy = ({ fontStyle }) => {
  const color = 'vhlight.sageGreen:alpha.90';
  return (
    <View flex={1} px={6} justifyContent='center'>
      <VStack alignItems='center'>
        <Image mt={-42} source={FinishStudyImg} alt="image" resizeMode='contain' />
        <Text color={color} fontFamily={fontStyle.toLowerCase()} textAlign='center' >
            You've reviewed all your collection!
        </Text>
      </VStack>
    </View>
  );
};

FinishStudy.propTypes = {
  fontStyle: PropTypes.string.isRequired,
};

export default FinishStudy;
