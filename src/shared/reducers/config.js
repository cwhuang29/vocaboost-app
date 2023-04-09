import { CONFIG_STATUS } from 'shared/actionTypes/config';
import { DEFAULT_CONFIG } from 'shared/utils/config';

export const configInitialState = {
  language: DEFAULT_CONFIG.language,
  fontSize: DEFAULT_CONFIG.fontSize,
  fontStyle: DEFAULT_CONFIG.fontStyle,
};

export const configReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONFIG_STATUS.UPDATE_LANGUAGE:
      return { ...state, language: payload.language };
    case CONFIG_STATUS.UPDATE_FONT_SIZE:
      return { ...state, fontSize: payload.fontSize };
    case CONFIG_STATUS.UPDATE_FONT_STYLE:
      return { ...state, fontStyle: payload.fontStyle };
    case CONFIG_STATUS.OVERRIDE_ALL:
      return { ...payload };
    default:
      return state;
  }
};
