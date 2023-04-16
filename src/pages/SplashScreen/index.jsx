import React from 'react';

import { Heading, HStack, Spinner, View } from 'native-base';

const SplashScreen = () => (
  <View flex={1} bgColor='vhlight.100' justifyContent='center' alignItems='center'>
    <HStack space={3} alignItems='center'>
      <Spinner color='vhlight.50' size='sm' accessibilityLabel='Loading' />
      <Heading color='vhlight.50' fontSize='md'>
        Loading
      </Heading>
    </HStack>
  </View>
);

export default SplashScreen;
