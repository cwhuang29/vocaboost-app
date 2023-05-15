import React from 'react';
import PropTypes from 'prop-types';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { Icon, IconButton } from 'native-base';

export const SpeakerIconButton = ({ onPress }) => {
  const onPressThenStop = e => {
    e.preventDefault();
    onPress();
  };
  return (
    <IconButton
      icon={<Icon as={AntDesign} name='sound' />}
      onPress={onPressThenStop}
      _icon={{ _light: { color: 'vhlight.50' }, _dark: { color: 'vhdark.50' }, size: '30' }}
      _pressed={{
        bg: 'base.black:alpha.10',
        rounded: 'full',
      }}
    />
  );
};

export const UndoIconButton = ({ onPress }) => {
  const onPressThenStop = e => {
    e.preventDefault();
    onPress();
  };
  return (
    <IconButton
      icon={<Icon as={Ionicons} name='chevron-back' />}
      onPress={onPressThenStop}
      _icon={{ _light: { color: 'vhlight.50' }, _dark: { color: 'vhdark.50' }, size: '30' }}
      _pressed={{
        bg: 'base.black:alpha.10',
        rounded: 'full',
      }}
    />
  );
};

export const StarIconButton = ({ isCollected, onPress }) => {
  const iconName = isCollected ? 'star' : 'staro';
  const onPressThenStop = e => {
    e.preventDefault();
    onPress();
  };
  return (
    <IconButton
      icon={<Icon as={AntDesign} name={iconName} />}
      onPress={onPressThenStop}
      _icon={{ color: 'vhlight.700', size: '28' }}
      _pressed={{
        bg: '',
        _icon: { name: 'star', color: 'vhlight.700:alpha.50', size: '28' },
      }}
    />
  );
};

SpeakerIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

UndoIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

StarIconButton.propTypes = {
  isCollected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};
