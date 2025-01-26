import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';

import {
  StyledButton,
  StyledContainer,
  StyledContentContainer,
  StyledRowContainer,
  StyledSubtitle,
  StyledTitle,
} from './MerchantsSimulatorView.styles';
import { validationSchema } from './config';
import SimulatorInputsSection from './components/SimulatorInputsSection/SimulatorInputsSection';
import { Stack } from '@mui/system';
import SimulatorOutputSection from './components/SimulatorOutputSection/SimulatorOutputSection';

const MerchantsSimulatorView = () => {
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      industry: '',
      monthlyTraffic: 0,
      avgDiscount: 0,
      avgConversion: 0,
      avgOrder: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    },
  });
  const {
    values,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
    validateField,
  } = formik;
  return (
    <StyledContainer>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <StyledContentContainer>
            <StyledTitle>Merchant simulator</StyledTitle>
            <StyledSubtitle>
              This simulator is optimized for use with a minimum monthly traffic
              of 100,000
            </StyledSubtitle>
            <StyledRowContainer>
              <SimulatorInputsSection />
              <Stack>
                <SimulatorOutputSection isLoading={isLoading} />
                <StyledButton variant='contained' onClick={handleSubmit}>
                  Start Hooxing
                </StyledButton>
              </Stack>
            </StyledRowContainer>
          </StyledContentContainer>
        </form>
      </FormikProvider>
    </StyledContainer>
  );
};

export default MerchantsSimulatorView;
