import { Box } from '@mui/material';
import Logo from '@/components/Logo';

const Header = () => {
  return (
    <Box
      sx={{
        height: [130, 250],
        width: '100%',
        backgroundImage: [null, 'url(/header-bg.png)'],
        backgroundColor: ['#0f0039', null],
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
  );
};

export default Header;
