import { extendTheme } from 'native-base';

const themeSetting = {
  colors: {
    vhlight: {
      50: '#C5E4F3',
      100: '#10b981',
      200: '#047857',
      300: '#fb923c',
      400: '#47A9DA',
      500: '#bef264',
      600: '#000000',
    },
    vhdark: {
      50: '#C5E4F3',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
    },
    base: {
      white: '#fafafa',
      black: '404040',
      blue: '#7dd3fc',
      pink: '#fb7185',
      purple: '#8b5cf6',
      teal: '#2dd4bf',
      lightYellow: '#fde68a',
    },
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'base' },
      baseStyle: {
        rounded: 'sm',
        _text: { color: 'base.white' },
      },
      variants: {
        vh1: ({ colorScheme }) => ({
          bg: `${colorScheme}.blue`,
          rounded: 'full',
          _pressed: {
            bg: 'yellow.600',
            _text: { color: 'base.teal' },
          },
          _disabled: {
            opacity: 30,
          },
        }),
        vh2: ({ colorScheme }) => ({
          bg: `${colorScheme}.purple`,
          rounded: 'lg',
          _disabled: {
            opacity: 30,
          },
        }),
      },
    },
    Text: {
      baseStyle: {
        _light: { color: 'warning.300' },
        _dark: { color: 'vhlight.50' },
      },
      defaultProps: { size: 'md' },
      sizes: {
        xl: { fontSize: '64' },
        lg: { fontSize: '32', lineHeight: '42' },
        md: { fontSize: '18', lineHeight: '24' },
        sm: { fontSize: '12' },
      },
    },
    Heading: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'vhlight.200' : 'vhlight.400',
        fontWeight: 'bold',
      }),
      sizes: {
        '2xl': { fontSize: '64' },
        xl: { fontSize: '40' },
        lg: { fontSize: '28' },
        md: { fontSize: '20' },
        sm: { fontSize: '16' },
      },
    },
  },
  config: {
    // initialColorMode: 'dark',
    useSystemColorMode: true, // Default system color mode
  },
};

const defaultTheme = extendTheme(themeSetting);

export default defaultTheme;
