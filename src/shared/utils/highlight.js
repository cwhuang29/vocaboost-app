import { toCapitalize } from './stringHelpers';

export const constructWordExample = (example = '') => {
  const punc = example.length > 0 && ['.', '?', '!'].indexOf(example.slice(-1)) === -1 ? '.' : '';
  return `${toCapitalize(example)}${punc}`;
};
