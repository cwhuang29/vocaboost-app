import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Box, Center, CloseIcon, HStack, IconButton, Text, VStack } from 'native-base';

// status: green for success, red for failure
const CustomAlert = ({ status, title, content }) => (
  <Box safeAreaTop='10' zIndex={100} pt={1}>
    <Center>
      <Alert maxW='95%' minW='95%' status={status} colorScheme='info'>
        <VStack space={1} flexShrink={1} w='100%'>
          <HStack flexShrink={1} space={2} alignItems='center' justifyContent='space-between'>
            <HStack flexShrink={1} space={2} alignItems='center'>
              <Alert.Icon />
              <Text fontSize='md' fontWeight='medium' color='coolGray.800'>
                {title}
              </Text>
            </HStack>
            <IconButton variant='unstyled' _focus={{ borderWidth: 0 }} icon={<CloseIcon size='3' />} _icon={{ color: 'coolGray.600' }} />
          </HStack>
          <Box pl='6' _text={{ color: 'coolGray.600' }}>
            {content}
          </Box>
        </VStack>
      </Alert>
    </Center>
  </Box>
);

CustomAlert.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

CustomAlert.defaultProps = {
  content: '',
};

export default CustomAlert;
