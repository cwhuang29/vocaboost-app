import React from 'react';

import { Heading, HStack, Spinner, View } from 'native-base';

const SplashScreen = () => (
  <View flex={1} bgColor='grey' justifyContent='center' alignItems='center'>
    <HStack space={3} alignItems='center'>
      <Spinner size='sm' accessibilityLabel='Loading posts' />
      <Heading color='primary.500' fontSize='md'>
        Loading
      </Heading>
    </HStack>
  </View>
);

export default SplashScreen;
