import React from 'react';
import PropTypes from 'prop-types';

import { HamburgerIcon, Menu, Pressable, Text } from 'native-base';

import { WORD_LIST_TYPE } from 'shared/constants/wordListType';

const SortingMenuTrigger = props => (
  <Pressable accessibilityLabel='Default word lists sorting menu' {...props}>
    <HamburgerIcon size={6} margin={3} />
  </Pressable>
);

const SortingMenu = ({ type, shuffle, setShuffle, alphabetize, setAlphabetize }) => {
  const sortByTimeOnPress = () => {
    setShuffle(false);
    setAlphabetize(false);
  };

  const shuffleOnPress = () => {
    setShuffle(true);
    setAlphabetize(false);
  };

  const sortByAlphabeticalOrder = () => {
    setAlphabetize(true);
    setShuffle(false);
  };

  return (
    <Menu w='200' trigger={SortingMenuTrigger} mr={2}>
      {type === WORD_LIST_TYPE.COLLECTED && (
        <Menu.Item onPress={sortByTimeOnPress} isDisabled={!shuffle && !alphabetize}>
          <Text fontSize='md'>Sort by time</Text>
        </Menu.Item>
      )}
      <Menu.Item onPress={shuffleOnPress} isDisabled={shuffle}>
        <Text fontSize='md'>Shuffle</Text>
      </Menu.Item>
      {type !== WORD_LIST_TYPE.COLLECTED && (
        <Menu.Item onPress={sortByAlphabeticalOrder} isDisabled={alphabetize}>
          <Text fontSize='md'>Alphabetize</Text>
        </Menu.Item>
      )}
    </Menu>
  );
};

SortingMenu.propTypes = {
  type: PropTypes.string.isRequired,
  shuffle: PropTypes.bool.isRequired,
  setShuffle: PropTypes.func.isRequired,
  alphabetize: PropTypes.bool.isRequired,
  setAlphabetize: PropTypes.func.isRequired,
};

export default SortingMenu;
