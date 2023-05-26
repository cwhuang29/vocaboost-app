import LANGS, { LANGS_SUPPORTED } from 'shared/constants/i18n';

export const getSpeechLanguage = ({ language = LANGS_SUPPORTED.en } = {}) => {
  switch (language) {
    case LANGS_SUPPORTED.en:
      return LANGS.en_US;
    case LANGS_SUPPORTED.es:
      return LANGS.es_ES;
    case LANGS_SUPPORTED.zh_TW:
      return LANGS.zh_TW;
    case LANGS_SUPPORTED.zh_CN:
      return LANGS.zh_CN;
    case LANGS_SUPPORTED.ja:
      return LANGS.ja_JP;
    case LANGS_SUPPORTED.ko:
      return LANGS.ko_KR;
    case LANGS_SUPPORTED.th:
      return LANGS.th_TH;
    default:
      return LANGS.en_US;
  }
};
