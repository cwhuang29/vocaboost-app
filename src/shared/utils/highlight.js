/*
 * Before:
 * -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * <div> 4 days ago — docile implies a predisposition to ...</div>
 * -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 *
 * After:
 * -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * <div> 4 days ago —
 *   <span class="HIGHLIGHTER_CLASS" tabindex="0">
 *     <span class="HIGHLIGHTER_ORG_WORD_CLASS HIGHLIGHTER_BG_COLOR_CLASS_GREEN">
 *       docile
 *     </span>
 *   </span>
 * implies a predisposition to ...</div>
 * -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 *
 * Note: text nodes themselves contain values only. Modify their parent nodes to change styling
 */
import { HIGHLIGHTER_BG_COLOR_CLASS, HIGHLIGHTER_CLASS, HIGHLIGHTER_ORG_WORD_CLASS } from 'shared/constants/index';
import { EXT_MSG_TYPE_GET_WORD_LIST } from 'shared/constants/messages';
import { EXT_STORAGE_WORD_LIST } from 'shared/constants/storage';
import { HIGHLIGHTER_POPUP_DISPLAY_DELTA } from 'shared/constants/styles';
import storage from 'shared/storage';

import { toCapitalize } from './stringHelpers';

export const constructWordExample = (example = '') => {
  const punc = example.length > 0 && ['.', '?', '!'].indexOf(example.slice(-1)) === -1 ? '.' : '';
  return `${toCapitalize(example)}${punc}`;
};

export const genHighlightSyntax = ({ config, orgWord }) => {
  const highlightColorClass = HIGHLIGHTER_BG_COLOR_CLASS[config.highlightColor];
  const highlightWord = `<span class="${HIGHLIGHTER_ORG_WORD_CLASS} ${highlightColorClass}">${orgWord}</span>`;
  return `<span class="${HIGHLIGHTER_CLASS}" tabindex="0">${highlightWord}</span>`;
};

export const getAllWords = async () => {
  const cache = await storage.getData(EXT_STORAGE_WORD_LIST);

  let wordListStr = null;
  if (cache[EXT_STORAGE_WORD_LIST]) {
    wordListStr = cache[EXT_STORAGE_WORD_LIST];
  } else {
    wordListStr = await sendMessage({ type: EXT_MSG_TYPE_GET_WORD_LIST });
    storage.setData(EXT_STORAGE_WORD_LIST, wordListStr);
  }

  if (!wordListStr) {
    return new Map([]);
  }

  const wordList = JSON.parse(wordListStr).filter(item => item);
  return new Map(wordList.map(item => [item.word, item]));
};

export const getDetailDisplayPos = ({ x, y, offsetX, offsetY, maxX, width }) => {
  const xx = Math.max(0, x + offsetX + HIGHLIGHTER_POPUP_DISPLAY_DELTA - Math.max(0, x + offsetX + HIGHLIGHTER_POPUP_DISPLAY_DELTA + width - maxX));
  const yy = y + offsetY + HIGHLIGHTER_POPUP_DISPLAY_DELTA;
  return { x: xx, y: yy };
};
