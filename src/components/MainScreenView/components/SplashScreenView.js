import { Box, Button, Grid2, Paper, Stack, Typography } from '@mui/material';
import { useStyles } from './styles';
import { steps } from '../MainScreenView';

const SplashScreenView = ({ setStep }) => {
  const styles = useStyles();
  return (
    <Grid2 container justifyContent='center'>
      <Paper sx={styles.container}>
        <Stack alignItems={'center'}>
          <Box>
            <Typography sx={styles.title}>
              Unlock New Revenue Opportunities with Hoox
            </Typography>
          </Box>
          <Box>
            <Typography sx={styles.subtitle}>Present real-time </Typography>
            <Typography sx={styles.embedded}>embedded offers </Typography>
            <Typography sx={styles.subtitle2}>
              funded by credit card issuers
            </Typography>
          </Box>
          <Stack sx={styles.footer}>
            <Typography sx={styles.footerText}>
              Want to see a boost in sales?
            </Typography>
            <Typography sx={styles.footerText}>
              Try it out yourself...
            </Typography>
            <Button
              sx={styles.footerButton}
              onClick={() => setStep(steps.simulator)}
              variant='contained'
            >
              Let’s Go!
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Grid2>
  );
};

export default SplashScreenView;
