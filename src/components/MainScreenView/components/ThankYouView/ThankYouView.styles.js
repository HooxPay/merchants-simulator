import { Box, Grid2, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

export const StyledBackgroundColor = styled(Grid2)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.palette.secondary.main,
  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
  },
}));

export const StyledBackground = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  maxWidth: 1000,
  backgroundImage: 'url(/campaign-desktop.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundColor: theme.palette.secondary.main,
  alignItems: 'center',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    backgroundImage: 'url(/campaign-mobile.png)',
    maxWidth: 400,
    backgroundPosition: 'top',
    marginTop: '2rem',
    alignItems: 'top',
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 500,
  color: theme.palette.common.white,
  marginTop: '8rem',
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
  },
}));

export const StyledImage = styled(Image)(({ theme }) => ({
  marginTop: 70,
}));

export const StyledMobileContainer = styled(Box)(({ theme }) => ({
  margin: '1.5rem',
}));

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: theme.palette.common.white,
  marginTop: '1rem',
}));

export const StyledTextContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  marginTop: '6rem',
  [theme.breakpoints.down('md')]: {
    marginTop: '2rem',
  },
}));

export const StyledSubtitle2 = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 400,
  color: theme.palette.common.white,
  marginTop: '1rem',
}));

