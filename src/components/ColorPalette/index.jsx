import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Center, FlatList, Text, useColorMode, useTheme } from 'native-base';

const ColorPalette = ({ key }) => {
  const { colors } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Box>
        <FlatList numColumns='5' data={Object.keys(colors[key])} renderItem={({ item }) => <Box p='5' bg={`${key}.${item}`} />} />
        <Text size='lg'>The active color mode is: {colorMode}</Text>
      </Box>
      <Center>
        <Box p='4' maxW='300' mt={7} bg={colorMode === 'dark' ? 'coolGray.800:alpha.70' : 'secondary.600:alpha.60'} safeArea>
          <Button onPress={toggleColorMode} h={10} variant='vh1'>
            Toggle
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

ColorPalette.propTypes = {
  key: PropTypes.string.isRequired,
};

export default ColorPalette;
