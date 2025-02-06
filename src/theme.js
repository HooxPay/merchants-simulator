'use client'

import { KeyboardArrowDown } from '@mui/icons-material'
import { createTheme } from '@mui/material/styles'
import { Inter, Space_Mono } from 'next/font/google'
import { forwardRef } from 'react'
import NextLink from 'next/link'

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  return <NextLink ref={ref} {...props} />
})

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#00F29B', // Primary green
    },
    secondary: {
      main: '#0F0039', // Secondary dark purple
    },
    common: {
      black: '#222123', // Black
      white: '#FFFFFF', // White
    },
    text: {
      primary: '#222123',
      secondary: '#FFFFFF',
    },
    grey: {
      light: '#EFF0F2',
      main: '#52525B',
      dark: '#7F8082',
    },
    error: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  blue: {
    main: '#557AFF',
  },
  shadesOfGreen: {
    weakest: '#bffce6',
    lightest: '#80f9cd',
    lighter: '#40f5b4',
    light: '#00f29b', // Primary green
    dark: '#00c47d',
    darker: '#009660',
    darkest: '#006742',
    deepest: '#003924',
    main: '#0f2d1e', // Dark green
  },
  shadesOfPurple: {
    weakest: '#e4daff',
    lightest: '#c8b5ff',
    lighter: '#ad8fff',
    light: '#916aff', // Secondary purple
    dark: '#7450da',
    darker: '#5735b4',
    darkest: '#391b8f',
    deepest: '#0F0039',
    main: '#0f0039', // Dark purple
  },
  shadesOfGrey: {
    lightest: '#FFFFFF80',
    lighter: '#a1adb933',
    light: '#C8C8C8',
  },
  breakpoints: {
    values: {
      xs: 0,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily || 'Helvetica, Arial, sans-serif',
    h1: {
      fontSize: 48,
      fontWeight: 700,
      marginBottom: 0,
    },
    h2: {
      fontWeight: 700,
      marginBottom: 0,
    },
    h3: {
      fontWeight: 700,
      marginBottom: 0,
    },
    spaceMono: {
      fontFamily: spaceMono.style.fontFamily,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: 0,
          input: {
            '&::placeholder': {
              color: '#C8C8C8',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          input: {
            '&::placeholder': {
              color: '#C8C8C8',
              opacity: 1,
            },
          },
          backgroundColor: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '4px',
          padding: '8px 20px',
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
          '&:hover': {
            borderColor: '#333',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          zIndex: '1',
          marginTop: '6px',
          marginBottom: '6px',
          color: '#090914',
          fontWeight: '700',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: '#C8C8C8',
        },
        colorPrimary: {
          '&.Mui-checked': {
            // Controls checked color for the thumb
            color: '#00C47D',
          },
        },
        track: {
          '.Mui-checked.Mui-checked + &': {
            // Controls checked color for the track
            backgroundColor: '#00C47D',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '.MuiSelect-select': {
            fontSize: '0.875rem',
            padding: '0.5rem 0.75rem',
          },
          '&.Mui-disabled': {
            backgroundColor: '#C8C8C8',
          },
        },
      },
      defaultProps: {
        IconComponent: KeyboardArrowDown,
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          padding: '0.25rem 0.5rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          minHeight: 'unset',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          boxShadow:
            '0px 3px 3px 0px rgba(0, 0, 0, 0.10), 0px 3px 3px 0px rgba(0, 0, 0, 0.10)',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          maxHeight: '400px',
        },
      },
    },
  },
})

const theme = createTheme(baseTheme, {
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'initial',
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'initial',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: baseTheme.typography.spaceMono.fontFamily,
          color: 'initial',
          '&.Mui-focused': {
            color: 'initial',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          fontWeight: 500,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          borderRadius: '0.5rem',
          padding: '0.55rem 1rem',
          fontWeight: 500,
          fontSize: '1rem',
          '&.MuiButton-containedPrimary': {
            backgroundColor: baseTheme.palette.primary.main,
            color: baseTheme.palette.common.black,
            '&:hover': {
              backgroundColor: baseTheme.palette.primary.main,
            },
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: baseTheme.palette.secondary.main,
            color: baseTheme.palette.common.white,
            '&:hover': {
              backgroundColor: baseTheme.palette.secondary.main,
            },
          },
        },
      },
    },
  },
})

export default theme
