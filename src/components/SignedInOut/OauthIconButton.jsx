import React from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

import { MAX_Z_INDEX } from 'shared/constants/styles';

const OauthIconButton = ({ icon, onPress, color, size, disabled }) => (
  <Pressable onPress={onPress} style={{ zIndex: MAX_Z_INDEX }}>
    <FontAwesome5 name={icon} color={color} size={size} opacity={disabled ? 0.3 : 1} />
  </Pressable>
);

OauthIconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
};

OauthIconButton.defaultProps = {
  disabled: false,
};

export default OauthIconButton;
