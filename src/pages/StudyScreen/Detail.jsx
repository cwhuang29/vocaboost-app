import React from 'react';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import { Box, HStack, Icon, IconButton, Stack, Text } from 'native-base';

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

const DisplayText = ({ children, size, shrink, fontStyle }) => (
  <Text size={size} flexShrink={shrink} fontFamily={fontStyle.toLowerCase()}>
    {children}
  </Text>
);

// TODO Use fontsize for texts
// eslint-disable-next-line no-unused-vars
const Detail = ({ display, wordData, language, fontSize, fontStyle, isCollected, onCollectWord }) =>
  display && (
    <Box>
      <HStack space={3} justifyContent='space-around' alignSelf='center'>
        <DisplayText size='lg' shrink={0} fontStyle={fontStyle}>
          {toCapitalize(wordData.word)}
        </DisplayText>
        <StarIconButton isCollected={isCollected} onPress={onCollectWord({ id: wordData.id, isCollected })} />
      </HStack>
      {wordData.detail.map(({ meaning, partsOfSpeech, example }) => (
        <Box key={`${partsOfSpeech}-${example.slice(0, 20)}`} pt={6}>
          <Stack space={3}>
            <DisplayText fontStyle={fontStyle}>{`${PARTS_OF_SPEECH_SHORTHAND[partsOfSpeech]} ${meaning[LANGS[language]] || meaning[LANGS.en]}`}</DisplayText>
            <DisplayText fontStyle={fontStyle}>{constructWordExample(example)}</DisplayText>
          </Stack>
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
  fontStyle: PropTypes.string.isRequired,
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
  fontStyle: PropTypes.string.isRequired,
  isCollected: PropTypes.bool.isRequired,
  onCollectWord: PropTypes.func.isRequired,
};

Detail.defaultProps = {
  display: true,
};

export default Detail;
