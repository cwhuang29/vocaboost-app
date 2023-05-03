import React from 'react';
import PropTypes from 'prop-types';

import { HamburgerIcon, Menu, Pressable, Text } from 'native-base';

const SortingMenuTrigger = props => (
  <Pressable accessibilityLabel='Default word lists sorting menu' {...props}>
    <HamburgerIcon size={6} />
  </Pressable>
);

const SortingMenu = ({ shuffle, setShuffle }) => (
    <Menu w='160' trigger={SortingMenuTrigger} margin={5} padding={3}>
      <Menu.Item onPress={() => setShuffle(true)} isDisabled={shuffle}>
        <Text fontSize='md'>Shuffle</Text>
      </Menu.Item>
      <Menu.Item onPress={() => setShuffle(false)} isDisabled={!shuffle}>
        <Text fontSize='md'>Alphabetize</Text>
      </Menu.Item>
    </Menu>
);

SortingMenu.propTypes = {
  shuffle: PropTypes.bool.isRequired,
  setShuffle: PropTypes.func.isRequired,
};

export default SortingMenu;
