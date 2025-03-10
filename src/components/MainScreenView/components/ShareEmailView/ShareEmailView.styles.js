import styled from '@emotion/styled';
import { Box, Button, Divider, Link, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(() => ({
  maxWidth: 950,
  margin: '0 auto',
}));

export const StyledContentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  margin: 0,
  padding: '40px',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.down('md')]: {
    padding: '2rem',
    boxShadow: theme.shadows[0],
    borderRadius: 0,
  },
}));

export const StyledTitle = styled(Typography)(() => ({
  fontSize: '2rem',
  fontWeight: 500,
}));

export const StyledSubtitle = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.8)',
  padding: '1rem 0 2rem 0',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: '0.875rem 1rem',
  marginLeft: '2.5rem',
  fontSize: '1rem',
  backgroundColor: theme.palette.primary.main,
  '&:disabled': { backgroundColor: 'rgba(0, 242, 155, 0.2)' },
  '&:hover': { '&:disabled': { backgroundColor: 'rgba(0, 242, 155, 0.2)' } },
  [theme.breakpoints.down('md')]: {
    margin: '1rem 0 0 0',
    maxWidth: 400,
  },
}));

export const StyledFooterContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: theme.palette.common.white,
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
  },
}));
export const StyledButtonsContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end',
  padding: '20px',
}));

export const StyledDivider = styled(Divider)(() => ({}));

export const StyledBottomSubtitle = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.8)',
  display: 'inline',
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: theme.shadesOfPurple.light,
  textDecoration: 'underline',
  display: 'inline',
  ':hover': {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
}));

export const StyledPolicyContainer = styled(Box)(({ theme }) => ({
  marginTop: '1rem',
  marginBottom: '6rem',
}));
