import React from 'react';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';

import { Box, Icon, Image, Text, View, VStack } from 'native-base';

import FinishStudyImg from 'assets/study/undraw_Winners_re_wr1l.png';

const FinishStudy = ({ fontStyle }) => {
  const color = 'vhlight.sageGreen:alpha.90';
  return (
    <View flex={1} px={6} mt={-5} justifyContent='flex-start'>
      <VStack alignItems='center'>
        <Image source={FinishStudyImg} alt='image' resizeMode='contain' />
        <Text mt={-56} color={color} fontFamily={fontStyle.toLowerCase()} textAlign='center'>
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
