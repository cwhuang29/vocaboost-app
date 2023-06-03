import { useColorMode } from 'native-base';

import { isDarkMode } from 'shared/utils/style';

export const useIsDarkMode = () => {
  const { colorMode } = useColorMode();
  return isDarkMode(colorMode);
};
