'use client';
import { useState } from 'react';

import { Box } from '@mui/material';
import Header from '../Header/Header';
import HeaderOverflowingLayout from '../HeaderOverflowingLayout/HeaderOverflowingLayout';
import SplashScreenView from './components/SplashScreenView';

export const steps = {
  splash: 'splashScreen',
  simulator: 'merchantsSimulator',
};
const MainScreenView = () => {
  const [step, setStep] = useState(steps.splash);

  const renderStepComponent = () => {
    switch (step) {
      case steps.splash:
        return <SplashScreenView setStep={setStep} />;
      case steps.simulator:
        return null;
    }
  };
  return (
    <Box>
      <Header />
      <HeaderOverflowingLayout>{renderStepComponent()}</HeaderOverflowingLayout>
    </Box>
  );
};

export default MainScreenView;
