import styled from '@emotion/styled';
import { Box, Skeleton, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme }) => ({
  margin: '4.25rem 0 1.5rem 2.5rem',
  maxWidth: 540,
  backgroundColor: '#F6F2FF',
  borderRadius: '0.5rem',
  [theme.breakpoints.down('md')]: {
    margin: 0,
    maxWidth: 400,
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  padding: '2rem 2rem 1rem 3.125rem',
  fontSize: '1.5rem',
}));

export const StyledBudgetSummaryContainer = styled(Box)(({ theme }) => ({
  padding: '2rem 2rem 1rem 3.125rem',
}));

export const StyledBudgetTotal = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  color: theme.shadesOfPurple.light,
}));

export const StyledBudgetMonthly = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  color: 'rgba(0, 0, 0, 0.7)',
}));

export const StyledUpliftContainer = styled(Box)(({ theme }) => ({
  padding: '3rem 2rem 2rem 2rem',
  flexDirection: 'row',
  display: 'flex',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    display: 'block',
    maxWidth: 150,
  },
}));

export const StyledUpliftContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: '1rem',
  width: '100%',
  borderRadius: '0.5rem',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    marginBottom: '1rem',
  },
}));

export const StyledUpliftTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
}));

export const StyledUpliftAmount = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: theme.shadesOfPurple.light,
}));

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  marginTop: '0.875rem',
  background:
    'linear-gradient(90deg, rgba(145, 106, 255, 0.4) 0%, rgba(145, 106, 255, 0) 100%)',
  borderRadius: '0.5rem',
}));
