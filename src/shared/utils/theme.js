import { extendTheme } from 'native-base';

const themeSetting = {
  colors: {
    vhlight: {
      50: '#3F3F3F',
      100: '#E5E5E5',
      200: '#E2E2E2',
      300: '#7892B5',
      400: '#8CB9C0',
      500: '#91B5A9',
      600: '#EDCA7F',
      700: '#FFFFFF',
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
      black: '#181818',
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
        _light: { color: 'vhlight.darkGray' },
        _dark: { color: 'vhdark.50' },
      },
      defaultProps: { size: 'md' },
      sizes: {
        xl: { fontSize: '42' },
        lg: { fontSize: '34', lineHeight: '60' },
        md: { fontSize: '20', lineHeight: '32' },
        sm: { fontSize: '16', lineHeight: '22' },
        xs: { fontSize: '14' },
      },
    },
    Heading: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'vhdark.100' : 'vhlight.darkGray',
        fontWeight: 'bold',
      }),
      sizes: {
        '2xl': { fontSize: '64' },
        xl: { fontSize: '40' },
        lg: { fontSize: '26' },
        md: { fontSize: '20' },
        sm: { fontSize: '16' },
      },
    },
  },
  fontConfig: {
    Roboto: {
      300: { normal: 'Roboto-Regular' },
      400: { normal: 'Roboto-Medium' }, // Roboto-Regular
      500: { normal: 'Roboto-Medium' },
      600: { normal: 'Roboto-Bold' },
    },
    Garamond: {
      300: { normal: 'Garamond-Medium' },
      400: { normal: 'Garamond-SemiBold' },
      500: { normal: 'Garamond-SemiBold' },
      600: { normal: 'Garamond-Bold' },
    },
    Kalam: {
      300: { normal: 'Kalam-Light' },
      400: { normal: 'Kalam-Regular' },
      500: { normal: 'Kalam-Regular' },
      600: { normal: 'Kalam-Bold' },
    },
    Charmonman: {
      300: { normal: 'Charmonman-Regular' },
      400: { normal: 'Charmonman-Bold' },
      500: { normal: 'Charmonman-Bold' },
      600: { normal: 'Charmonman-Bold' },
    },
    PlayfairDisplay: {
      300: { normal: 'PlayfairDisplay-Medium' }, // Regular
      400: { normal: 'PlayfairDisplay-Bold' },
      500: { normal: 'PlayfairDisplay-Bold' },
      600: { normal: 'PlayfairDisplay-Black' },
    },
  },
  fonts: {
    // Default font weight is 400
    roboto: 'Roboto',
    garamond: 'Garamond',
    kalam: 'Kalam',
    charmonman: 'Charmonman',
    playfairdisplay: 'PlayfairDisplay',
  },
  config: {
    // initialColorMode: 'dark',
    useSystemColorMode: true, // Default system color mode
  },
};

const defaultTheme = extendTheme(themeSetting);

export default defaultTheme;
