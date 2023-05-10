import React from 'react';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';

import { Text, View } from 'native-base';

import finishStudySvg from 'shared/svgs/finishStudySvg';

const FinishStudy = ({ fontStyle }) => (
  <View flex={1} px={6} mt={-5} justifyContent='flex-start'>
    <View flex={7} justifyContent='center' alignItems='center'>
      <SvgXml xml={finishStudySvg} height='88%' width='88%' />
    </View>
    <View flex={3} justifyContent='flex-start'>
      <Text
        fontSize={22}
        lineHeight={28}
        mt={2}
        _light={{ color: 'vhlight.600' }}
        _dark={{ color: 'vhdark.600' }}
        fontFamily={fontStyle.toLowerCase()}
        textAlign='center'
      >
        You've reviewed all your collection
      </Text>
    </View>
  </View>
);

FinishStudy.propTypes = {
  fontStyle: PropTypes.string.isRequired,
};

export default FinishStudy;
