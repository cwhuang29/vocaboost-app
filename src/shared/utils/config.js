import { FONT_SIZE, FONT_STYLE, LANGS } from 'shared/constants/index';
import { isArray, isObject } from 'shared/utils/misc';

export const DEFAULT_CONFIG = {
  language: LANGS.en,
  fontSize: FONT_SIZE.MEDIUM,
  fontStyle: FONT_STYLE.ROBOTO,
  collectedWords: [],
  updatedAt: new Date('Sat Apr 01 2000 00:00:00'),
};

export const isConfigEqual = (config1 = {}, config2 = {}) => {
  const c1 = isObject(config1) ? config1 : JSON.parse(config1);
  const c2 = isObject(config2) ? config2 : JSON.parse(config2);

  if (Object.keys(c1).length !== Object.keys(c2).length) {
    return false;
  }

  return Object.entries(c1).filter(([key, val]) => (isArray(val) ? val.length !== c2[key].length : val !== c2[key])).length === 0;
};
