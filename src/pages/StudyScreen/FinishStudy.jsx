import React from 'react';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';

import { Icon, Stack, Text, View } from 'native-base';

const FinishStudy = ({ fontStyle }) => {
  const color = 'vhlight.400:alpha.90';
  return (
    <View flex={1} px={6} justifyContent='center'>
      <Stack space={12} alignItems='center'>
        <Icon as={Entypo} name='emoji-flirt' size={48} color={color} />
        <Text mb={8} size='lg' color={color} fontFamily={fontStyle.toLowerCase()} textAlign='center'>
          You've reviewed all your collection!
        </Text>
      </Stack>
    </View>
  );
};

FinishStudy.propTypes = {
  fontStyle: PropTypes.string.isRequired,
};

export default FinishStudy;
