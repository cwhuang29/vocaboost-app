import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, ListItem, Text } from 'native-base';

const ConfirmButton = props => {
  const { disabledConfirm, onConfirm, confirmButtonText } = props;

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    maxWidth: '700px',
    margin: '30px auto 0',
    cursor: disabledConfirm ? 'wait' : 'default',
  };

  const listItemButtonStyle = {
    maxWidth: '250px',
    minWidth: '175px',
    borderRadius: '4px',
  };

  const listItemTextStyle = { textAlign: 'center', fontWeight: '700', color: '#EDEDED' };

  return (
    <Box style={wrapperStyle}>
      <Button disabled={disabledConfirm} sx={{ ...listItemButtonStyle, backgroundColor: '#4778DD' }} onClick={onConfirm}>
        <ListItem style={listItemTextStyle}>
          <Text>{confirmButtonText}</Text>
        </ListItem>
      </Button>
    </Box>
  );
};

ConfirmButton.propTypes = {
  disabledConfirm: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
};

ConfirmButton.defaultProps = {
  disabledConfirm: false,
};

export default ConfirmButton;
