import { COLOR_MODE } from 'shared/constants';
import { STORAGE_COLOR_MODE } from 'shared/constants/storage';
import storage from 'shared/storage';
import GaramondBold from 'assets/fonts/Garamond-Bold.ttf';
import GaramondMedium from 'assets/fonts/Garamond-Medium.ttf';
import GaramondRegular from 'assets/fonts/Garamond-Regular.ttf';
import GaramondSemiBold from 'assets/fonts/Garamond-SemiBold.ttf';
import KalamBold from 'assets/fonts/Kalam-Bold.ttf';
import KalamLight from 'assets/fonts/Kalam-Light.ttf';
import KalamRegular from 'assets/fonts/Kalam-Regular.ttf';
import Kumincho from 'assets/fonts/KuMincho.otf';
import PlayfairDisplayBold from 'assets/fonts/PlayfairDisplay-Bold.ttf';
import PlayfairDisplayMedium from 'assets/fonts/PlayfairDisplay-Medium.ttf';
import PlayfairDisplayRegular from 'assets/fonts/PlayfairDisplay-Regular.ttf';
import RobotoBold from 'assets/fonts/Roboto-Bold.ttf';
import RobotoLight from 'assets/fonts/Roboto-Light.ttf';
import RobotoMedium from 'assets/fonts/Roboto-Medium.ttf';
import RobotoRegular from 'assets/fonts/Roboto-Regular.ttf';

export const fontsMap = {
  'Roboto-Light': RobotoLight,
  'Roboto-Regular': RobotoRegular,
  'Roboto-Medium': RobotoMedium,
  'Roboto-Bold': RobotoBold,
  'Garamond-Regular': GaramondRegular,
  'Garamond-Medium': GaramondMedium,
  'Garamond-SemiBold': GaramondSemiBold,
  'Garamond-Bold': GaramondBold,
  'Kalam-Light': KalamLight,
  'Kalam-Regular': KalamRegular,
  'Kalam-Bold': KalamBold,
  'PlayfairDisplay-Regular': PlayfairDisplayRegular,
  'PlayfairDisplay-Medium': PlayfairDisplayMedium,
  'PlayfairDisplay-Bold': PlayfairDisplayBold,
  'Kumincho-Regular': Kumincho,
};

export const isDarkMode = colorMode => colorMode === COLOR_MODE.DARK || colorMode === COLOR_MODE.DARK.toLowerCase();

// The await cause the switch glitching a bit while changing value
// Usage: <NativeBaseProvider theme={defaultTheme} colorModeManager={colorModeManager}>
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
