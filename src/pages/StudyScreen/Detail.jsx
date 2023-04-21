import React from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import { Box, Icon, IconButton, Stack, Text, VStack } from 'native-base';

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
      _icon={{ color: 'vhlight.700', size: '30' }}
      _pressed={{
        bg: '',
        _icon: { name: 'star', color: 'vhlight.700:alpha.50', size: '30' },
      }}
    />
  );
};

const DisplayText = ({ children, size, shrink, fontStyle }) => (
  <Text size={size} flexShrink={shrink} fontFamily={fontStyle.toLowerCase()} _light={{ color: 'vhlight.50' }} _dark={{ color: 'vhdark.50' }}>
    {children}
  </Text>
);

const Detail = ({ display, wordData, language, fontStyle, isCollected, onCopyText, onCollectWord }) =>
  display && (
    <Box>
      <VStack space={3} justifyContent='space-around' alignSelf='center'>
        <Pressable onLongPress={onCopyText}>
          <DisplayText size='lg' shrink={0} fontStyle={fontStyle}>
            {toCapitalize(wordData.word)}
          </DisplayText>
        </Pressable>
        <StarIconButton isCollected={isCollected} onPress={onCollectWord({ id: wordData.id, isCollected })} />
      </VStack>
      {wordData.detail.map(({ meaning, partsOfSpeech, example }) => (
        <Box key={`${partsOfSpeech}-${meaning[LANGS.en].slice(0, 20)}-${example.slice(0, 20)}`} pt={8}>
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
  fontStyle: PropTypes.string.isRequired,
  isCollected: PropTypes.bool.isRequired,
  onCopyText: PropTypes.func.isRequired,
  onCollectWord: PropTypes.func.isRequired,
};

Detail.defaultProps = {
  display: true,
};

export default Detail;
