import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    container: {
      maxWidth: 700,
      padding: ['2rem', '2.5rem'],
      boxShadow: [0, theme.shadows[3]],
      borderRadius: [0, theme.shape.borderRadius],
      backgroundImage: 'url(/splashscreen.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    },
    title: {
      fontSize: ['1.75rem', '2.5rem'],
      fontWeight: 500,
      lineHeight: ['35px', '52px'],
      paddingBottom: ['0.5rem', '1rem'],
      textAlign: 'center',
    },
    subtitle: {
      display: 'inline',
      fontSize: ['1.125rem', '1.25rem'],
      fontWeight: 400,
      lineHeight: ['25px', '30px'],
    },
    subtitle2: {
      display: 'inline',
      fontSize: ['1.125rem', '1.25rem'],
      fontWeight: 400,
      lineHeight: ['25px', '30px'],
    },
    embedded: {
      display: 'inline',
      fontSize: ['1.125rem', '1.25rem'],
      fontWeight: 700,
      color: theme.shadesOfPurple.dark,
      lineHeight: ['25px', '30px'],
    },
    footer: {
      paddingTop: '180px',
      alignItems: 'center',
    },
    footerText: {
      fontSize: '1rem',
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.6)',
    },
    footerButton: {
      backgroundColor: theme.shadesOfGreen.light,
      borderRadius: '0.5rem',
      margin: '1.5rem 0 0.25rem 0',
      padding: '0.875rem 1rem',
      fontWeight: 500,
      fontSize: '1rem',
      color: theme.palette.common.black,
      minWidth: 100,
    },
  };
};
