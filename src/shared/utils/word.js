import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import { GRE_ALPHABET, GRE_ALPHABET_INDEX, TOEFL_ALPHABET, TOEFL_ALPHABET_INDEX, WORD_LIST } from 'shared/constants/words';

import { shuffleArray } from './arrayHelpers';

export const genWordDetailList = ({ type, shuffle = false }) => {
  let arr = [];
  if (type === WORD_LIST_TYPE.GRE) {
    arr = WORD_LIST.GRE;
  }
  if (type === WORD_LIST_TYPE.TOEFL) {
    arr = WORD_LIST.TOEFL;
  }
  if (type === WORD_LIST_TYPE.ALL) {
    arr = [...WORD_LIST.GRE, ...WORD_LIST.TOEFL];
  }
  return shuffle ? shuffleArray(arr) : arr;
};

export const genWordDetailMap = ({ type, shuffle = false }) => {
  const wordList = genWordDetailList({ type, shuffle });
  return new Map(wordList.map(item => [item.id, item])); // Map goes wrong in production build
};

export const getWordListFirstAlphabets = ({ type }) => {
  switch (type) {
    case WORD_LIST_TYPE.GRE:
      return GRE_ALPHABET;
    case WORD_LIST_TYPE.TOEFL:
      return TOEFL_ALPHABET;
    default:
      return '';
  }
};

export const getWordListAlphabetsIndex = ({ type }) => {
  switch (type) {
    case WORD_LIST_TYPE.GRE:
      return GRE_ALPHABET_INDEX;
    case WORD_LIST_TYPE.TOEFL:
      return TOEFL_ALPHABET_INDEX;
    default:
      return {};
  }
};

export const isToeflWord = ({ id }) => id > 10000;
