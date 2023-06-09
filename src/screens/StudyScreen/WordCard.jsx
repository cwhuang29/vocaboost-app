import React from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { Box, Stack, Text } from 'native-base';

import { LANGS_SUPPORTED } from 'shared/constants/i18n';
import { PARTS_OF_SPEECH_SHORTHAND } from 'shared/constants/index';
import { constructWordExample } from 'shared/utils/highlight';
import { toCapitalize } from 'shared/utils/stringHelpers';
import { getTextSize } from 'shared/utils/style';

const DisplayText = ({ children, size, shrink, fontStyle, colorLight, colorDark }) => (
  <Text size={size} flexShrink={shrink} fontFamily={fontStyle.toLowerCase()} _light={{ color: colorLight }} _dark={{ color: colorDark }}>
    {children}
  </Text>
);

const WordCard = ({ display, wordData, language, fontSize, fontStyle, onPressSpeak, onCopyText, showBilingual }) => {
  const wordText = wordData.word;

  return (
    display && (
      <Box>
        <Box alignSelf='center'>
          <Pressable onPress={onPressSpeak({ text: wordText })} onLongPress={onCopyText(wordText)}>
            <DisplayText size='2xl' shrink={0} fontStyle={fontStyle}>
              {toCapitalize(wordText)}
            </DisplayText>
          </Pressable>
        </Box>
        {wordData.detail.map(({ meaning, partsOfSpeech, example }) => {
          const meaningText = `${PARTS_OF_SPEECH_SHORTHAND[partsOfSpeech]} ${meaning[LANGS_SUPPORTED[language]] || meaning[LANGS_SUPPORTED.en]}`;
          const meaningEngText = `${PARTS_OF_SPEECH_SHORTHAND[partsOfSpeech]} ${meaning[LANGS_SUPPORTED.en]}`;
          const exampleText = constructWordExample(example);
          const meaningTextSpeech = meaning[LANGS_SUPPORTED[language]] || meaning[LANGS_SUPPORTED.en];
          const meaningEngTextSpeech = meaning[LANGS_SUPPORTED.en];
          return (
            <Box key={`${partsOfSpeech}-${meaning[LANGS_SUPPORTED.en].slice(0, 6)}-${example.slice(0, 6)}`} pt={8}>
              <Stack space={3}>
                <Pressable onPress={onPressSpeak({ text: meaningTextSpeech, language })} onLongPress={onCopyText(meaningText)}>
                  <DisplayText size={getTextSize(fontSize)} fontStyle={fontStyle}>
                    {meaningText}
                  </DisplayText>
                </Pressable>
                {showBilingual && (
                  <Pressable onPress={onPressSpeak({ text: meaningEngTextSpeech })} onLongPress={onCopyText(meaningEngText)}>
                    <DisplayText size={getTextSize(fontSize)} fontStyle={fontStyle} colorLight='base.gray' colorDark='base.gray'>
                      {meaningEngText}
                    </DisplayText>
                  </Pressable>
                )}
                <Pressable onLongPress={onCopyText(exampleText)}>
                  <DisplayText size={getTextSize(fontSize)} fontStyle={fontStyle}>
                    {exampleText}
                  </DisplayText>
                </Pressable>
              </Stack>
            </Box>
          );
        })}
      </Box>
    )
  );
};

DisplayText.propTypes = {
  children: PropTypes.string.isRequired,
  fontStyle: PropTypes.string.isRequired,
  size: PropTypes.string,
  shrink: PropTypes.number,
  colorLight: PropTypes.string,
  colorDark: PropTypes.string,
};

DisplayText.defaultProps = {
  size: 'md',
  shrink: 1,
  colorLight: 'vhlight.50',
  colorDark: 'vhdark.50',
};

WordCard.propTypes = {
  display: PropTypes.bool,
  wordData: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  fontStyle: PropTypes.string.isRequired,
  onPressSpeak: PropTypes.func.isRequired,
  onCopyText: PropTypes.func.isRequired,
  showBilingual: PropTypes.bool.isRequired,
};

WordCard.defaultProps = {
  display: true,
};

export default WordCard;
