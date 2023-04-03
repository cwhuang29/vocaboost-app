import { WORD_LIST } from 'shared/constants/words';

export const genWordList = () => [...WORD_LIST.GRE, ...WORD_LIST.TOEFL].map(item => item.word);

export const genWordDetailList = (wordListType) => {
  if (wordListType === 'gre') {
    return [...WORD_LIST.GRE];
  }
  if (wordListType === 'toefl') {
    return [...WORD_LIST.TOEFL];
  }
}

export const genWordDetailMap = (wordListType) => {
  const wordList = genWordDetailList(wordListType);
  const words = new Map(wordList.map(item => [item.id, item]));
  return words;
};

export const getRandomWordFromList = () => {
  const wordList = genWordDetailList();

  let w = wordList[Math.floor(Math.random() * wordList.length)];
  while (!w?.detail[0]?.meaning?.en) {
    w = wordList[Math.floor(Math.random() * wordList.length)];
  }
  return w;
};
