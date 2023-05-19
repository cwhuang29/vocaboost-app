import { useColorMode, useTheme } from 'native-base';

import { isDarkMode } from 'shared/utils/style';

export const useIsDarkMode = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  return isDarkMode(colorMode);
};
