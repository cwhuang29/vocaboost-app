import { COLOR_MODE, FONT_SIZE } from 'shared/constants';
import { STORAGE_COLOR_MODE } from 'shared/constants/storage';
import storage from 'shared/storage';
import CeraBold from 'assets/fonts/Cera-Bold.otf';
import CeraLight from 'assets/fonts/Cera-Light.otf';
import CeraMedium from 'assets/fonts/Cera-Medium.otf';
import GaramondBold from 'assets/fonts/Garamond-Bold.ttf';
import GaramondMedium from 'assets/fonts/Garamond-Medium.ttf';
import GaramondSemiBold from 'assets/fonts/Garamond-SemiBold.ttf';
import KalamBold from 'assets/fonts/Kalam-Bold.ttf';
import KalamLight from 'assets/fonts/Kalam-Light.ttf';
import KalamRegular from 'assets/fonts/Kalam-Regular.ttf';
import Kumincho from 'assets/fonts/KuMincho.otf';
import PlayfairDisplayBold from 'assets/fonts/PlayfairDisplay-Bold.ttf';
import PlayfairDisplayMedium from 'assets/fonts/PlayfairDisplay-Medium.ttf';
import RobotoBold from 'assets/fonts/Roboto-Bold.ttf';
import RobotoMedium from 'assets/fonts/Roboto-Medium.ttf';
import RobotoRegular from 'assets/fonts/Roboto-Regular.ttf';

export const fontsMap = {
  'Cera-Light': CeraLight,
  'Cera-Medium': CeraMedium,
  'Cera-Bold': CeraBold,
  'Roboto-Regular': RobotoRegular,
  'Roboto-Medium': RobotoMedium,
  'Roboto-Bold': RobotoBold,
  'Garamond-Medium': GaramondMedium,
  'Garamond-SemiBold': GaramondSemiBold,
  'Garamond-Bold': GaramondBold,
  'Kalam-Light': KalamLight,
  'Kalam-Regular': KalamRegular,
  'Kalam-Bold': KalamBold,
  'PlayfairDisplay-Medium': PlayfairDisplayMedium,
  'PlayfairDisplay-Bold': PlayfairDisplayBold,
  'Kumincho-Regular': Kumincho,
};

export const isDarkMode = colorMode => colorMode === COLOR_MODE.DARK || colorMode === COLOR_MODE.DARK.toLowerCase();

export const getTextSize = fontSize => {
  switch (fontSize) {
    case FONT_SIZE.LARGE:
      return 'lg';
    case FONT_SIZE.MEDIUM:
      return 'md';
    case FONT_SIZE.SMALL:
      return 'sm';
    default:
      return 'md';
  }
};

export const colorModeManager = {
  get: async () => {
    try {
      const val = await storage.getData(STORAGE_COLOR_MODE);
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async value => {
    try {
      await storage.setData(STORAGE_COLOR_MODE, value);
    } catch (e) {
      // do nothing
    }
  },
};
