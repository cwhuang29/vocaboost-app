import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Slider, Text } from 'native-base';

import { ALPHABET } from 'shared/constants/words/alphabet';

const AlphaSlider = ({ handleSelectedLetterChange }) => {
  const [selectedLetter, setSelectedLetter] = useState(ALPHABET[0]);

  const handleSliderChange = value => {
    const letter = ALPHABET.charAt(value);
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
  handleSelectedLetterChange: PropTypes.func.isRequired,
};

export default AlphaSlider;
