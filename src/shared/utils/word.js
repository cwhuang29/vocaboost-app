import { WORD_LIST_TYPE } from 'shared/constants/wordListType';
import { WORD_LIST } from 'shared/constants/words';

import { shuffleArray } from './arrayHelpers';

export const genWordList = () => [...WORD_LIST.GRE, ...WORD_LIST.TOEFL].map(item => item.word);

export const genWordDetailList = ({ type, shuffle = true }) => {
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

export const genWordDetailMap = ({ type, shuffle = true }) => {
  const wordList = genWordDetailList({ type, shuffle });
  const obj = {};
  wordList.forEach(item => {
    obj[item.id] = item;
  });
  return obj;
  // return new Map(wordList.map(item => [item.id, item])); // Map goes wrong in production build
};
