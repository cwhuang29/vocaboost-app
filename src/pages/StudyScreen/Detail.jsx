import React from 'react';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import { Box, Icon, IconButton, Stack, Text } from 'native-base';

import { LANGS, PARTS_OF_SPEECH_SHORTHAND } from 'shared/constants/index';
import { constructWordExample } from 'shared/utils/highlight';
import { toCapitalize } from 'shared/utils/stringHelpers';

const StarIconButton = ({ isCollected, onPress }) => {
  const iconName = isCollected ? 'star' : 'staro';
  const onPressThenStop = e => {
    e.preventDefault();
    onPress();
  };
  return (
    <IconButton
      icon={<Icon as={AntDesign} name={iconName} />}
      onPress={onPressThenStop}
      _icon={{ color: 'vhlight.100', size: '28px' }}
      _pressed={{
        bg: '',
        _icon: { name: 'star', color: 'vhlight.300', size: '28px' },
      }}
    />
  );
};

const DisplayText = ({ children, size, shrink }) => (
  <Text size={size} flexShrink={shrink}>
    {children}
  </Text>
);

// TODO Use fontsize for texts
// eslint-disable-next-line no-unused-vars
const Detail = ({ display, wordData, language, fontSize, isCollected, onCollectWord }) =>
  display && (
    <Box>
      <Stack direction='row' space={2} justifyContent='space-around' alignSelf='center'>
        <DisplayText size='lg' shrink={0}>
          {toCapitalize(wordData.word)}
        </DisplayText>
        <StarIconButton isCollected={isCollected} onPress={onCollectWord({ id: wordData.id, isCollected })} />
      </Stack>
      {wordData.detail.map(({ meaning, partsOfSpeech, example }) => (
        <Box key={`${partsOfSpeech}-${example.slice(0, 20)}`} pt={6}>
          <Stack direction='row' space={2} justifyContent='flex-start'>
            <DisplayText shrink={0}>{PARTS_OF_SPEECH_SHORTHAND[partsOfSpeech]}</DisplayText>
            <DisplayText>{meaning[LANGS[language]] || meaning[LANGS.en]}</DisplayText>
          </Stack>
          <DisplayText>{constructWordExample(example)}</DisplayText>
        </Box>
      ))}
    </Box>
  );

StarIconButton.propTypes = {
  isCollected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

DisplayText.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.string,
  shrink: PropTypes.number,
};

DisplayText.defaultProps = {
  size: 'md',
  shrink: 1,
};

Detail.propTypes = {
  display: PropTypes.bool,
  wordData: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  isCollected: PropTypes.bool.isRequired,
  onCollectWord: PropTypes.func.isRequired,
};

Detail.defaultProps = {
  display: true,
};

export default Detail;
