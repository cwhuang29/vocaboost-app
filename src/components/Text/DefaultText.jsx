import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'native-base';

const DefaultText = props => {
  const { children, ...rest } = props;

  return (
    <Text fontFamily='cera' fontWeight='medium' size='md' {...rest}>
      {children}
    </Text>
  );
};

DefaultText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultText;
