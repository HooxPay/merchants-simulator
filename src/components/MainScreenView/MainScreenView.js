'use client';
import { useState } from 'react';

import { Box } from '@mui/material';
import Header from '../Header/Header';
import HeaderOverflowingLayout from '../HeaderOverflowingLayout/HeaderOverflowingLayout';
import SplashScreenView from './components/SplashScreenView';
import MerchantsSimulatorView from './components/MerchantsSimulatorView/MerchantsSimulatorView';
import ShareEmailView from './components/ShareEmailView/ShareEmailView';
import ThankYouView from './components/ThankYouView/ThankYouView';

export const steps = {
  splash: 'splashScreen',
  simulator: 'merchantsSimulator',
  share: 'shareEmail',
  thankYou: 'thankYou',
};
const MainScreenView = ({industriesArray}) => {
  const [step, setStep] = useState(steps.splash);

  const renderStepComponent = () => {
    switch (step) {
      case steps.splash:
        return <SplashScreenView setStep={setStep} />;
      case steps.simulator:
        return <MerchantsSimulatorView setStep={setStep} industriesArray={industriesArray}/>;
      case steps.share:
        return <ShareEmailView setStep={setStep} />;
      case steps.thankYou:
        return <ThankYouView />;
    }
  };
  return step === steps.thankYou ? (
    renderStepComponent()
  ) : (
    <Box>
      <Header />
      <HeaderOverflowingLayout>
        {renderStepComponent()}
      </HeaderOverflowingLayout>{' '}
    </Box>
  );
};

export default MainScreenView;
