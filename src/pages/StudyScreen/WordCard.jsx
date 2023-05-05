import React from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { Box, Stack, Text, VStack } from 'native-base';

import LANGS from 'shared/constants/i18n';
import { PARTS_OF_SPEECH_SHORTHAND } from 'shared/constants/index';
import { constructWordExample } from 'shared/utils/highlight';
import { toCapitalize } from 'shared/utils/stringHelpers';
import { getTextSize } from 'shared/utils/style';

const DisplayText = ({ children, size, shrink, fontStyle }) => (
  <Text size={size} flexShrink={shrink} fontFamily={fontStyle.toLowerCase()} _light={{ color: 'vhlight.50' }} _dark={{ color: 'vhdark.50' }}>
    {children}
  </Text>
);

const WordCard = ({ display, wordData, language, fontSize, fontStyle, onCopyText }) =>
  display && (
    <Box>
      <VStack space={3} justifyContent='space-around' alignSelf='center'>
        <Pressable onLongPress={onCopyText}>
          <DisplayText size='xl' shrink={0} fontStyle={fontStyle}>
            {toCapitalize(wordData.word)}
          </DisplayText>
        </Pressable>
      </VStack>
      {wordData.detail.map(({ meaning, partsOfSpeech, example }) => (
        <Box key={`${partsOfSpeech}-${meaning[LANGS.en].slice(0, 20)}-${example.slice(0, 20)}`} pt={8}>
          <Stack space={3}>
            <DisplayText size={getTextSize(fontSize)} fontStyle={fontStyle}>{`${PARTS_OF_SPEECH_SHORTHAND[partsOfSpeech]} ${
              meaning[LANGS[language]] || meaning[LANGS.en]
            }`}</DisplayText>
            <DisplayText size={getTextSize(fontSize)} fontStyle={fontStyle}>
              {constructWordExample(example)}
            </DisplayText>
          </Stack>
        </Box>
      ))}
    </Box>
  );



DisplayText.propTypes = {
  children: PropTypes.string.isRequired,
  fontStyle: PropTypes.string.isRequired,
  size: PropTypes.string,
  shrink: PropTypes.number,
};

DisplayText.defaultProps = {
  size: 'md',
  shrink: 1,
};

WordCard.propTypes = {
  display: PropTypes.bool,
  wordData: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  fontStyle: PropTypes.string.isRequired,
  isCollected: PropTypes.bool.isRequired,
  onCopyText: PropTypes.func.isRequired,
  onCollectWord: PropTypes.func.isRequired,
};

WordCard.defaultProps = {
  display: true,
};

export default WordCard;
