import React from 'react';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';

import { Center, Icon, Text, View } from 'native-base';

const FinishStudy = ({ fontStyle }) => {
  const color = 'vhlight.300:alpha.70';
  return (
    <View flex={1} px={6} justifyContent='center'>
      <Center>
        <Text mb={8} size='xl' color={color} fontFamily={fontStyle.toLowerCase()}>
          You've reviewed all your collection!
        </Text>
        <Icon as={Entypo} name='emoji-flirt' size={32} color={color} />
      </Center>
    </View>
  );
};

FinishStudy.propTypes = {
  fontStyle: PropTypes.string.isRequired,
};

export default FinishStudy;
