import { extendTheme } from '@chakra-ui/react';

const colors = {
  greyDark: '#4b5768',
  primary: {
    50: '#fff2de',
    100: '#fddcb2',
    200: '#fac585',
    300: '#f6ad55',
    400: '#f39627',
    500: '#da7c0f',
    600: '#aa6109',
    700: '#794504',
    800: '#4a2800',
    900: '#1d0d00',
  },
  lot: {
    50: '#e0f4ff',
    100: '#b8dcfa',
    200: '#8ec4f1',
    300: '#63ace8',
    400: '#3994e0',
    500: '#1f7bc6',
    600: '#135f9b',
    700: '#084470',
    800: '#002946',
    900: '#000f1d',
  },
  zac: {
    50: '#fff2de',
    100: '#fddcb2',
    200: '#fac585',
    300: '#f6ad55',
    400: '#f39627',
    500: '#da7c0f',
    600: '#aa6109',
    700: '#794504',
    800: '#4a2800',
    900: '#1d0d00',
  },
  infraction: {
    50: '#ffe5e5',
    100: '#fbbaba',
    200: '#f28e8e',
    300: '#eb6161',
    400: '#e43535',
    500: '#ca1b1b',
    600: '#9e1314',
    700: '#710c0e',
    800: '#460506',
    900: '#1e0000',
  },
  evenement: {
    50: '#e2fbed',
    100: '#c2ebd4',
    200: '#9fddb9',
    300: '#7ccf9e',
    400: '#58c184',
    500: '#3ea76a',
    600: '#2e8251',
    700: '#1f5d3a',
    800: '#0f3921',
    900: '#001506',
  },
};

const components = {
  FormLabel: {
    baseStyle: {
      color: colors.greyDark,
      fontWeight: 'bold',
    },
  },
};

const space = {
  '2xs': '8px',
  xs: '16px',
  sm: '24px',
  md: '32px',
  lg: '48px',
  xl: '64px',
};

const borderRadiius = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '32px',
};

const fontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '24px',
};

const styles = {
  global: {
    body: {
      minHeight: '100vh',
    },
    '#__next': {
      minHeight: '100vh',
    },
    h1: {
      fontSize: '24px',
      color: 'red.300',
    },
  },
};

export const theme = extendTheme({
  components,
  colors,
  styles,
  space,
  borderRadiius,
  fontSizes,
});
