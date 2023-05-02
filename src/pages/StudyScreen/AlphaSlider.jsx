import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Slider, Text } from 'native-base';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWZ';

const AlphaSlider = ({ handleSelectedLetterChange }) => {
  const [selectedLetter, setSelectedLetter] = useState('A');

  const handleSliderChange = value => {
    const letter = alphabet.charAt(value);
    setSelectedLetter(letter);
    handleSelectedLetterChange(letter);
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
        maxValue={23}
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

AlphaSlider.propTypes = {
  handleSelectedLetterChange: PropTypes.func.isRequired,
};

export default AlphaSlider;