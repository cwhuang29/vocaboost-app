import { WORD_LIST } from 'shared/constants/words';

export const genWordList = () => [...WORD_LIST.GRE, ...WORD_LIST.TOEFL].map(item => item.word);

export const genWordDetailList = type => {
  if (type === 'gre') {
    return [...WORD_LIST.GRE];
  }
  if (type === 'toefl') {
    return [...WORD_LIST.TOEFL];
  }
  return [];
};

export const genWordDetailMap = type => {
  const wordList = genWordDetailList(type);
  return new Map(wordList.map(item => [item.id, item]));
};

export const getRandomWordFromList = () => {
  const wordList = genWordDetailList();

  let w = wordList[Math.floor(Math.random() * wordList.length)];
  while (!w?.detail[0]?.meaning?.en) {
    w = wordList[Math.floor(Math.random() * wordList.length)];
  }
  return w;
};
