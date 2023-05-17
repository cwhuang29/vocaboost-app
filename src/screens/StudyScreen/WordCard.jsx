import React from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { Box, Stack, Text, VStack } from 'native-base';

import LANGS from 'shared/constants/i18n';
import { PARTS_OF_SPEECH_SHORTHAND } from 'shared/constants/index';
import { constructWordExample } from 'shared/utils/highlight';
import { toCapitalize } from 'shared/utils/stringHelpers';
import { getTextSize } from 'shared/utils/style';

const DisplayText = ({ children, size, shrink, fontStyle, isBilingual }) => {
  const colorLight = isBilingual ? 'base.gray' : 'vhlight.50';
  const colorDark = isBilingual ? 'base.gray' : 'vhdark.50';
  return (
    <Text size={size} flexShrink={shrink} fontFamily={fontStyle.toLowerCase()} _light={{ color: colorLight }} _dark={{ color: colorDark }}>
      {children}
    </Text>
  );
};

const WordCard = ({ display, wordData, language, fontSize, fontStyle, onCopyText, showBilingual }) =>
  display && (
    <Box>
      <VStack space={3} justifyContent='space-around' alignSelf='center'>
        <Pressable onLongPress={onCopyText}>
          <DisplayText size='2xl' shrink={0} fontStyle={fontStyle}>
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
            {showBilingual && (
              <DisplayText size={getTextSize(fontSize)} fontStyle={fontStyle} isBilingual>{`${PARTS_OF_SPEECH_SHORTHAND[partsOfSpeech]} ${
                meaning[LANGS.en]
              }`}</DisplayText>
            )}
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
  isBilingual: PropTypes.bool,
};

DisplayText.defaultProps = {
  size: 'md',
  shrink: 1,
  isBilingual: false,
};

WordCard.propTypes = {
  display: PropTypes.bool,
  wordData: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  fontStyle: PropTypes.string.isRequired,
  onCopyText: PropTypes.func.isRequired,
  showBilingual: PropTypes.bool.isRequired,
};

WordCard.defaultProps = {
  display: true,
};

export default WordCard;
