import { Box } from '@mui/material';

const HeaderOverflowingLayout = ({ children }) => {
  return (
    <Box
      sx={{
        marginTop: {
          xs: '',
          md: '-86px',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default HeaderOverflowingLayout;
