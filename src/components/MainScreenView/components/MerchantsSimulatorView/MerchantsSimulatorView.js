import { FormikProvider, useFormik } from 'formik';
import { useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useMediaQuery, useTheme } from '@mui/material';

import {
  StyledButton,
  StyledContainer,
  StyledContentContainer,
  StyledRowContainer,
  StyledSubtitle,
  StyledTitle,
} from './MerchantsSimulatorView.styles';
import SimulatorInputsSection from './components/SimulatorInputsSection/SimulatorInputsSection';
import { Stack } from '@mui/system';
import SimulatorOutputSection from './components/SimulatorOutputSection/SimulatorOutputSection';
import { steps } from '../../MainScreenView';
import {
  getUIDefaultsForIndustry,
  getUIOutputs,
} from '@/app/UIDataSource/dataSource';
import { inputsInitialValues } from './components/SimulatorInputsSection/InputsData';

const MerchantsSimulatorView = ({ setStep, industriesArray }) => {
  const [isLoading, setLoading] = useState(true);
  const [inputData, setInputData] = useState(inputsInitialValues);
  const [outputData, setOutputData] = useState({});
  const targetRef = useRef(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const scrollToOutput = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const formik = useFormik({
    initialValues: {
      industry: '',
      monthlyTraffic: 0,
      avgDiscount: 0,
      cvr: 0,
      aov: 0,
    },
    onSubmit: async (values) => {
      setStep(steps.share);
    },
  });
  const {
    values,
    setFieldValue,
    handleSubmit,
  } = formik;

  const onIndustryChange = (industry) => {
    setFieldValue('industry', industry);
    const inputsDefaults = getUIDefaultsForIndustry(industry);
    setInputData(inputsDefaults);
    Object.entries(inputsDefaults).map(([key, { value }]) => {
      setFieldValue(key, value);
    });
  };

  const handleValuesChange = () => {
    setLoading(true);
    debouncedValuesChange();
  };

  const debouncedValuesChange = useMemo(
    () =>
      debounce(() => {
        const UIOutputs = getUIOutputs(
          Number(values.monthlyTraffic),
          Number(values.avgDiscount) / 100,
          Number(values.cvr) / 100,
          Number(values.aov),
          values.industry
        );
        setOutputData(UIOutputs);
        setLoading(false);
        !isDesktop && scrollToOutput();
      }, 600),
    [setLoading, setOutputData, values, isDesktop]
  );

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
              <SimulatorInputsSection
                industriesArray={industriesArray}
                onIndustryChange={onIndustryChange}
                inputData={inputData}
                handleValuesChange={handleValuesChange}
              />
              <Stack>
                <SimulatorOutputSection
                  isLoading={isLoading}
                  outputData={outputData}
                  ref={targetRef}
                />
                <StyledButton
                  variant='contained'
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
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
