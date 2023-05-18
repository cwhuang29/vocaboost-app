import { CONFIG_STATUS } from 'shared/actionTypes/config';
import { DEFAULT_CONFIG } from 'shared/utils/config';

export const configInitialState = {
  language: DEFAULT_CONFIG.language,
  showBilingual: DEFAULT_CONFIG.showBilingual,
  fontSize: DEFAULT_CONFIG.fontSize,
  fontStyle: DEFAULT_CONFIG.fontStyle,
  colorMode: DEFAULT_CONFIG.colorMode,
  studyOptions: DEFAULT_CONFIG.studyOptions,
};

export const configReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONFIG_STATUS.UPDATE_LANGUAGE:
      return { ...state, language: payload.language };
    case CONFIG_STATUS.UPDATE_SHOW_BILINGUAL:
      return { ...state, showBilingual: payload.showBilingual };
    case CONFIG_STATUS.UPDATE_FONT_SIZE:
      return { ...state, fontSize: payload.fontSize };
    case CONFIG_STATUS.UPDATE_FONT_STYLE:
      return { ...state, fontStyle: payload.fontStyle };
    case CONFIG_STATUS.UPDATE_COLOR_MODE:
      return { ...state, colorMode: payload.colorMode };
    case CONFIG_STATUS.OVERRIDE_BY_SERVER:
      // For now only these properties are stored in database
      return { ...state, language: payload.language, collectedWords: payload.collectedWords, updatedAt: payload.updatedAt };
    case CONFIG_STATUS.OVERRIDE_ALL:
      return { ...payload };
    default:
      return state;
  }
};
