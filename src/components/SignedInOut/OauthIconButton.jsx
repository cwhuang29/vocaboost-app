import React from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

import { MAX_Z_INDEX } from 'shared/constants/styles';

const OauthIconButton = ({ icon, onPress, size, top, right }) => (
  <Pressable onPress={onPress} style={{ zIndex: MAX_Z_INDEX }}>
    <FontAwesome5 name={icon} color={iconColor} size={size} top={top} right={right} position='absolute' />
  </Pressable>
);

OauthIconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
};

export default OauthIconButton;
