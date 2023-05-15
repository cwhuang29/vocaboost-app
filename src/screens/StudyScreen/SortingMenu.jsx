import React from 'react';
import PropTypes from 'prop-types';

import { HamburgerIcon, Menu, Pressable, Text } from 'native-base';

import { SORTING_MODE } from 'shared/constants';
import { WORD_LIST_TYPE } from 'shared/constants/wordListType';

const SortingMenuTrigger = props => (
  <Pressable accessibilityLabel='Default word lists sorting menu' {...props}>
    <HamburgerIcon size={6} margin={3} />
  </Pressable>
);

const SortingMenu = ({ type, sortingMode, setSortingMode }) => {
  const sortByTimeOnPress = () => {
    setSortingMode(SORTING_MODE.CHRONOLOGICAL);
  };

  const shuffleOnPress = () => {
    setSortingMode(SORTING_MODE.SHUFFLE);
  };

  const sortByAlphabeticalOrder = () => {
    setSortingMode(SORTING_MODE.ALPHABETIZE);
  };

  return (
    <Menu w='200' trigger={SortingMenuTrigger} mr={2}>
      {type === WORD_LIST_TYPE.COLLECTED && (
        <Menu.Item onPress={sortByTimeOnPress} isDisabled={sortingMode === SORTING_MODE.CHRONOLOGICAL}>
          <Text fontSize='md'>Sort by time</Text>
        </Menu.Item>
      )}
      <Menu.Item onPress={shuffleOnPress} isDisabled={sortingMode === SORTING_MODE.SHUFFLE}>
        <Text fontSize='md'>Shuffle</Text>
      </Menu.Item>
      {type !== WORD_LIST_TYPE.COLLECTED && (
        <Menu.Item onPress={sortByAlphabeticalOrder} isDisabled={sortingMode === SORTING_MODE.ALPHABETIZE}>
          <Text fontSize='md'>Alphabetize</Text>
        </Menu.Item>
      )}
    </Menu>
  );
};

SortingMenu.propTypes = {
  type: PropTypes.string.isRequired,
  sortingMode: PropTypes.string.isRequired,
  setSortingMode: PropTypes.func.isRequired,
};

export default SortingMenu;
