'use client'
import React from 'react'

import { Box, Link, useMediaQuery, useTheme } from '@mui/material'
import Logo from '../Logo'
import {
  StyledTitle,
  StyledContainer,
  StyledSubtitle,
  StyledLinkTypography,
} from './ErrorPage.styles'
import Image from 'next/image'

const ErrorPage = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <Box>
      <Box
        sx={{
          height: 220,
          width: '100%',
          backgroundImage: 'url(/header-bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <Logo
          width={115}
          height={40}
          style={{
            padding: '25px 25px 10px 25px',
          }}
        />
      </Box>
      <StyledContainer
        direction={isDesktop ? 'row' : 'column'}
        justifyContent={'center'}
      >
        <Box>
          <StyledTitle>Oops...something went wrong!</StyledTitle>
          <StyledSubtitle>
            Try refreshing the page. If the issue still persists please contact
            us at{' '}
          </StyledSubtitle>
          <Link href={'mailto:support@hooxpay.com'}>
            <StyledLinkTypography>support@hooxpay.com</StyledLinkTypography>
          </Link>
        </Box>
        <Image src={'/error.png'} alt="error image" width={430} height={350} />
      </StyledContainer>
    </Box>
  )
}

export default ErrorPage
