import styled from '@emotion/styled';
import { Box, Skeleton, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  maxHeight: 320,
  backgroundColor: '#F6F2FF',
  borderRadius: '0.5rem',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400,
    maxHeight: 1000,
  },
}));

export const StyledTitle = styled(Typography)(() => ({
  padding: '2rem 2rem 1rem 2rem',
  fontSize: '1.5rem',
}));

export const StyledBudgetSummaryContainer = styled(Box)(() => ({
  padding: '0 2rem 3rem 2rem',
  lineHeight: 0,
}));

export const StyledBudgetTotal = styled(Typography)(({ theme }) => ({
  fontSize: '3.25rem',
  lineHeight: 1,
  fontWeight: 700,
  color: theme.shadesOfPurple.light,
}));

export const StyledBudgetMonthly = styled(Typography)(() => ({
  fontSize: '1.25rem',
  color: 'rgba(0, 0, 0, 0.7)',
}));

export const StyledUpliftContainer = styled(Box)(({ theme }) => ({
  padding: '0 2rem 2rem 2rem',
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

export const StyledUpliftTitle = styled(Typography)(() => ({
  fontSize: '0.875rem',
}));

export const StyledUpliftAmount = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 500,
  color: theme.shadesOfPurple.light,
}));

export const StyledUpliftSkeleton = styled(Skeleton)(() => ({
  marginTop: '0.375rem',
  background:
    'linear-gradient(90deg, rgba(145, 106, 255, 0.4) 0%, rgba(145, 106, 255, 0) 100%)',
  borderRadius: '0.5rem',
}));

export const StyledBudgetTotalSkeleton = styled(Skeleton)(() => ({
  background:
    'linear-gradient(90deg, rgba(145, 106, 255, 0.4) 0%, rgba(145, 106, 255, 0) 100%)',
  borderRadius: '0.5rem',
}));

export const StyledBudgetMonthlySkeleton = styled(Skeleton)(() => ({
  marginTop: '0.5rem',
  marginBottom: '0.25rem',
  background:
    'linear-gradient(90deg, rgba(145, 106, 255, 0.4) 0%, rgba(145, 106, 255, 0) 100%)',
  borderRadius: '0.5rem',
}));
