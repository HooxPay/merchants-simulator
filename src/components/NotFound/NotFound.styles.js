import styled from '@emotion/styled'
import { Button, Stack, Typography } from '@mui/material'

export const StyledErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: 150,
  fontWeight: 300,
}))

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 400,
  maxWidth: 320,
  padding: '0.5rem 0 2rem 0',
}))

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.shadesOfGreen.light,
  borderRadius: '0.5rem',
  padding: '0.875rem 1rem',
  fontWeight: 500,
  fontSize: '1rem',
  color: theme.palette.common.black,
}))

export const StyledContainer = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}))
