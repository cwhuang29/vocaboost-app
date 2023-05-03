import React from 'react';
import PropTypes from 'prop-types';

import { Box, HamburgerIcon, Menu, Pressable, Text } from 'native-base';

const SortingMenuTrigger = props => (
  <Pressable accessibilityLabel='Default word lists sorting menu' {...props}>
    <HamburgerIcon size={6} />
  </Pressable>
);

const CollectedSortingMenu = ({ shuffle, setShuffle }) => (
  <Box w='99%' alignItems='center'>
    <Menu w='99%' trigger={SortingMenuTrigger} mr={5}>
      <Menu.Item onPress={() => setShuffle(false)} isDisabled={!shuffle}>
        <Text fontSize='md'>Sort by time</Text>
      </Menu.Item>
      <Menu.Item onPress={() => setShuffle(true)} isDisabled={shuffle}>
        <Text fontSize='md'>Shuffle</Text>
      </Menu.Item>
    </Menu>
  </Box>
);

CollectedSortingMenu.propTypes = {
  shuffle: PropTypes.bool.isRequired,
  setShuffle: PropTypes.func.isRequired,
};

export default CollectedSortingMenu;
