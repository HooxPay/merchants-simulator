import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1050,
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
    boxShadow: 0,
    borderRadius: 0,
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 500,
}));

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.8)',
}));

export const StyledRowContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'row',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    display: 'block',
  },
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
