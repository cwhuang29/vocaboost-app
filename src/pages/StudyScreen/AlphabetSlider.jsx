import React from 'react';
import PropTypes from 'prop-types';

import { Box, Slider, Text } from 'native-base';

const AlphabetSlider = ({ alphabets, selectedLetter, onChange }) => {
  const index = alphabets.indexOf(selectedLetter);

  const handleSliderChange = value => {
    const letter = alphabets.charAt(value);
    onChange(letter);
  };

  return (
    <Box alignItems='center' w='100%'>
      <Box mt={2}>
        <Text>{selectedLetter}</Text>
      </Box>
      <Slider
        w='3/4'
        maxW='80%'
        value={index}
        defaultValue={0}
        minValue={0}
        maxValue={alphabets.length - 1}
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

AlphabetSlider.propTypes = {
  alphabets: PropTypes.string.isRequired,
  selectedLetter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AlphabetSlider;
