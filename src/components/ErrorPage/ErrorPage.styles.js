import styled from '@emotion/styled'
import { Stack, Typography } from '@mui/material'

export const StyledTitle = styled(Typography)(({ theme }) => ({
  marginTop: 80,
  fontSize: '3rem',
  fontWeight: 400,
  maxWidth: 370,
  paddingBottom: '2rem',
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
  },
}))

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  maxWidth: 320,
}))

export const StyledContainer = styled(Stack)(({ theme }) => ({
  marginTop: 40,
  gap: 40,
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
    marginTop: 0,
  },
}))

export const StyledLinkTypography = styled(Typography)(({ theme }) => ({
  color: theme.shadesOfPurple.light,
  fontSize: '1rem',
  fontWeight: 400,
}))
