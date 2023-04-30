import React, { useState } from 'react';

import { Box, Slider, Text } from 'native-base';

const AlphaSlider = () => {
  const [selectedLetter, setSelectedLetter] = useState('A');

  const handleSliderChange = value => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    setSelectedLetter(alphabet.charAt(value));
  };

  return (
    <Box alignItems='center' w='100%'>
      <Box mt={2}>
        <Text>{selectedLetter}</Text>
      </Box>
      <Slider
        w='3/4'
        maxW='300'
        defaultValue={0}
        minValue={0}
        maxValue={25}
        step={1}
        colorScheme='yellow'
        accessibilityLabel='Alphabet Slider'
        onChange={handleSliderChange}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </Box>
  );
};
export default AlphaSlider;
