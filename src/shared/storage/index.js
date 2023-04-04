import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_ERR_MSG } from 'shared/constants/messages';
import logger from 'shared/utils/logger';
import { isArray, isObject } from 'shared/utils/misc';

const storage = {
  async setData(key, value) {
    let res = false;

    try {
      const val = isObject(value) || isArray(value) ? JSON.stringify(value) : value;
      await AsyncStorage.setItem(key, val);
      res = true;
    } catch (err) {
      logger(STORAGE_ERR_MSG.SET(key, err));
    }
    return res;
  },
  async getData(key) {
    let value = null;

    try {
      const val = await AsyncStorage.getItem(key);
      if (val !== null) {
        value = (val[0] === '[' && val[val.length - 1] === ']') || (val[0] === '{' && val[val.length - 1] === '}') ? JSON.parse(val) : val;
      }
    } catch (err) {
      logger(STORAGE_ERR_MSG.GET(key, err));
    }
    return value;
  },
  async removeData(key) {
    let res = false;
    try {
      await AsyncStorage.removeItem(key);
      res = true;
    } catch (e) {
      logger(STORAGE_ERR_MSG.REMOVE(key, err));
    }
    return res;
  },
};

export default storage;
