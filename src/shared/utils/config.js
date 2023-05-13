import LANGS from 'shared/constants/i18n';
import { COLOR_MODE, FONT_SIZE, FONT_STYLE } from 'shared/constants/index';
import userService from 'shared/services/user.service';
import { isArray, isObject } from 'shared/utils/misc';

import logger from './logger';
import { convertUTCToLocalTime } from './time';

export const DEFAULT_CONFIG = {
  language: LANGS.en,
  fontSize: FONT_SIZE.MEDIUM,
  fontStyle: FONT_STYLE.CERA,
  colorMode: COLOR_MODE.LIGHT,
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
