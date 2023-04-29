import { extendTheme } from 'native-base';

const themeSetting = {
  colors: {
    vhlight: {
      50: '#3F3F3F',
      100: '#E5E5E5',
      200: '#F2F2F2',
      300: '#F9F9F9',
      400: '#7892B5',
      500: '#8CB9C0',
      600: '#91B5A9',
      700: '#EDC673',
      800: '#D98481',
      900: '#F1F0F3',
      1000: '#494268',
      1100: '#FEF8F4',
    },
    vhdark: {
      50: '#E7E7E7',
      100: '#565656',
      200: '#33363E',
      300: '#2B2E32',
      400: '#7892B5',
      500: '#8CB9C0',
      600: '#A5D2B7',
      700: '#EDCA7F',
      800: '#D98481',
      900: '#F1F0F3',
      1000: '#A9CFA1',
      1100: '#393D44',
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
        _light: { color: 'vhlight.50' },
        _dark: { color: 'vhdark.50' },
      },
      defaultProps: { size: 'md' },
      sizes: {
        xl: { fontSize: '34', lineHeight: '45' },
        lg: { fontSize: '23', lineHeight: '32', letterSpacing: '0.02em' },
        md: { fontSize: '20.4', lineHeight: '30' },
        sm: { fontSize: '19', lineHeight: '28' },
        xs: { fontSize: '14' },
      },
    },
    Heading: {
      baseStyle: {
        _light: { color: 'vhlight.50' },
        _dark: { color: 'vhdark.50' },
        fontWeight: 'bold',
      },
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
    Kumincho: {
      300: { normal: 'Kumincho-Regular' },
      400: { normal: 'Kumincho-Regular' },
      500: { normal: 'Kumincho-Regular' },
      600: { normal: 'Kumincho-Regular' },
    },
    PlayfairDisplay: {
      300: { normal: 'PlayfairDisplay-Medium' }, // Regular
      400: { normal: 'PlayfairDisplay-Bold' },
      500: { normal: 'PlayfairDisplay-Bold' },
      600: { normal: 'PlayfairDisplay-Bold' },
    },
  },
  fonts: {
    // Default font weight is 400
    roboto: 'Roboto',
    garamond: 'Garamond',
    kalam: 'Kalam',
    kumincho: 'Kumincho',
    playfairdisplay: 'PlayfairDisplay',
  },
  config: {
    useSystemColorMode: true, // Default system color mode
    // initialColorMode: 'dark',
  },
};

const defaultTheme = extendTheme(themeSetting);

export default defaultTheme;
