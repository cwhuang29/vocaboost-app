export const shuffleArray = arr =>
  arr
    .map(val => ({ value: val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const getRandomList = size =>
  Array.from(Array(size).keys())
    .map(val => ({ value: val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
