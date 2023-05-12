import { useColorMode, useTheme } from 'native-base';

import { isDarkMode } from 'shared/utils/style';

export const useIconStyle = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  return isDarkMode(colorMode) ? colors.vhdark[50] : colors.vhlight[50];
};

export const useReverseIconStyle = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  return !isDarkMode(colorMode) ? colors.vhdark[50] : colors.vhlight[50];
};
