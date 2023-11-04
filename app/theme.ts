"use client";

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    // title: '#0172E4',

    primary: {
      main: '#7743DB',
    },
    background: {
      default: '#FFFBF5',
      paper: '#fefeff',
    },
    text: {
      disabled: 'rgba(0, 0, 0, 0.7)',
      primary: '#000000',
    },
    // bgclear: '#fefeffcc',
  },

  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: () => document.getElementById('__next'),
      },
    },
    MuiPopper: {
      defaultProps: {
        container: () => document.getElementById('__next'),
      },
    },
    MuiDialog: {
      defaultProps: {
        container: () => document.getElementById('__next'),
      },
    },
    MuiModal: {
      defaultProps: {
        container: () => document.getElementById('__next'),
      },
    },
  },

});
