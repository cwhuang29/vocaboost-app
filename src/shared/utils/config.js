import { LANGS_SUPPORTED } from 'shared/constants/i18n';
import { COLOR_MODE, FONT_SIZE, FONT_STYLE, SORTING_MODE } from 'shared/constants/index';
import { STORAGE_CONFIG } from 'shared/constants/storage';
import userService from 'shared/services/user.service';
import storage from 'shared/storage';
import { isArray, isObject, isObjectEmpty } from 'shared/utils/misc';

import logger from './logger';
import { getConfig } from './storage';
import { convertUTCToLocalTime } from './time';

export const DEFAULT_CONFIG = {
  language: LANGS_SUPPORTED.en,
  fontSize: FONT_SIZE.MEDIUM,
  fontStyle: FONT_STYLE.CERA,
  colorMode: COLOR_MODE.LIGHT,
  showBilingual: true,
  collectedWords: [],
  studyOptions: { GRE: { mode: SORTING_MODE.SHUFFLE }, COLLECTED: { mode: SORTING_MODE.CHRONOLOGICAL, wordId: 0 } },
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

export const fillConfigMissingFields = config => {
  for (const key in DEFAULT_CONFIG) {
    if (!config[key]) {
      Object.assign(config, { [key]: DEFAULT_CONFIG[key] });
    }
  }
  return config;
};

export const getLatestConfig = async config => {
  let ret = config;
  try {
    const { isStale, data, error } = await userService.updateUserSetting(config).catch(err => logger(`Update config to server unknown error: ${err}`));
    if (error && !isStale) {
      logger(`Update config to server error: ${error}`);
    }
    if (isStale) {
      const latestConfig = { ...data, updatedAt: convertUTCToLocalTime(data.updatedAt) };
      logger(`APP config is outdated. Store latest config from backend: ${JSON.stringify(latestConfig)}`);
      ret = latestConfig;
    }
  } catch (err) {
    // do nothing
  }
  return fillConfigMissingFields(ret);
};

export const getLatestConfigOnLogin = async () => getLatestConfig(DEFAULT_CONFIG);

export const setupDefaultConfig = async () => {
  const config = await getConfig();
  if (isObjectEmpty(config)) {
    await storage.setData(STORAGE_CONFIG, DEFAULT_CONFIG);
    return true;
  }

  let update = false;

  if (!Object.hasOwn(config, 'showBilingual')) {
    update = true;
    Object.assign(config, { showBilingual: true });
  }

  if (isObjectEmpty(config.studyOptions)) {
    update = true;
    Object.assign(config, { GRE: { mode: SORTING_MODE.SHUFFLE }, COLLECTED: { mode: SORTING_MODE.CHRONOLOGICAL, wordId: 0 } });
  }

  if (update) {
    await storage.setData(STORAGE_CONFIG, config);
  }
  return update;
};
