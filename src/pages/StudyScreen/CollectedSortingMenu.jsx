import React from 'react';
import PropTypes from 'prop-types';

import { Box, HamburgerIcon, Menu, Pressable, Text } from 'native-base';

const CollectedSortingMenu = ({ shuffle, setShuffle }) => (
  <Box w='99%' alignItems='center'>
    <Menu
      w='170'
      trigger={triggerProps => (
        <Pressable accessibilityLabel='Collected word lists sorting menu' {...triggerProps}>
          <HamburgerIcon />
        </Pressable>
      )}
    >
      <Menu.Item onPress={() => setShuffle(false)} isDisabled={!shuffle}>
        <Text>Chronologize</Text>
      </Menu.Item>
      <Menu.Item onPress={() => setShuffle(true)} isDisabled={shuffle}>
        <Text>Shuffle</Text>
      </Menu.Item>
    </Menu>
  </Box>
);

CollectedSortingMenu.propTypes = {
  shuffle: PropTypes.bool.isRequired,
  setShuffle: PropTypes.func.isRequired,
};

export default CollectedSortingMenu;
