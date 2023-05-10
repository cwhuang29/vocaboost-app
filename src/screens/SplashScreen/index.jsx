import React from 'react';

import { Heading, HStack, Spinner, View } from 'native-base';

const SplashScreen = () => (
  <View flex={1} justifyContent='center' alignItems='center' _light={{ bgColor: 'vhlight.100' }} _dark={{ bgColor: 'vhdark.200' }}>
    <HStack space={3} alignItems='center'>
      <Spinner _light={{ color: 'vhlight.50' }} _dark={{ color: 'vhdark.50' }} size='sm' accessibilityLabel='Loading' />
      <Heading _light={{ color: 'vhlight.50' }} _dark={{ color: 'vhdark.50' }} fontSize='md'>
        Loading
      </Heading>
    </HStack>
  </View>
);

export default SplashScreen;
