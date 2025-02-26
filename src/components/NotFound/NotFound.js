'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import Logo from '../Logo';
import {
  StyledButton,
  StyledContainer,
  StyledErrorCode,
  StyledSubtitle,
} from './NotFound.styles';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const NotFound = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
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
          <StyledErrorCode>404</StyledErrorCode>
          <StyledSubtitle>
            Oops...the page you are looking for might have been removed or is
            temporarily unavailable.
          </StyledSubtitle>
          <StyledButton onClick={() => redirect('/')}>
            Go to Homepage
          </StyledButton>
        </Box>
        <Image src={'/404.png'} alt='404 image' width={410} height={410} />
      </StyledContainer>
    </Box>
  );
};

export default NotFound;
