import React from 'react';
import PropTypes from 'prop-types';

import { Box, Slider, Text } from 'native-base';

import { ALPHABET } from 'shared/constants/words/alphabet';

const AlphaSlider = ({ selectedLetter, setSelectedLetter, setIsUndoing }) => {
  const handleSliderChange = value => {
    const letter = ALPHABET.charAt(value);
    setSelectedLetter(letter);
    setIsUndoing(false);
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
        maxValue={ALPHABET.length - 1}
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
  selectedLetter: PropTypes.string.isRequired,
  setSelectedLetter: PropTypes.func.isRequired,
  setIsUndoing: PropTypes.func.isRequired,
};

export default AlphaSlider;
