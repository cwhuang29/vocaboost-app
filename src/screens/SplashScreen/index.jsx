import React from 'react';
import PropTypes from 'prop-types';

import { Heading, HStack, Spinner, View } from 'native-base';

const SplashScreen = ({ showMessage }) => (
  <View flex={1} justifyContent='center' alignItems='center' _light={{ bgColor: 'vhlight.100' }} _dark={{ bgColor: 'vhdark.200' }}>
    <HStack space={3} alignItems='center'>
      <Spinner _light={{ color: 'vhlight.50' }} _dark={{ color: 'vhdark.50' }} size='sm' accessibilityLabel='Loading' />
      {showMessage && (
        <Heading _light={{ color: 'vhlight.50' }} _dark={{ color: 'vhdark.50' }} fontSize='md'>
          Loading
        </Heading>
      )}
    </HStack>
  </View>
);

SplashScreen.propTypes = {
  showMessage: PropTypes.bool,
};

SplashScreen.defaultProps = {
  showMessage: true,
};

export default SplashScreen;
