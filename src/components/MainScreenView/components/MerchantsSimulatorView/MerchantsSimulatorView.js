import { FormikProvider, useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { toPng } from 'html-to-image';
import { Box, useMediaQuery, useTheme } from '@mui/material';

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

const MerchantsSimulatorView = ({
  setStep,
  industriesDisplayNamesArray,
  setEmailData,
}) => {
  const inputInitialValues = getUIDefaultsForIndustry('avg');
  const [isLoading, setLoading] = useState(true);
  const [inputData, setInputData] = useState(inputInitialValues);
  const [outputData, setOutputData] = useState({});
  const targetRef = useRef(null);
  const outputRef = useRef(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const scrollToOutput = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const generateOutputImage = async () => {
    if (outputRef.current) {
      try {
        outputRef.current.style.zIndex = -1;
        const dataUrl = await toPng(outputRef.current);
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const file = new File([blob], 'output-image.png', {
          type: 'image/png',
        });

        return file;
      } catch (error) {
        console.error('Error generating output image:', error);
      }
    }
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
      const outputImage = await generateOutputImage();
      setEmailData({
        outputImage: outputImage,
        monthlyTraffic: values.monthlyTraffic,
        incentivesBudget: outputData.estimatedAnnualBudget,
        monthlySalesIncrease: outputData.salesUplift,
      });
      setStep(steps.share);
    },
  });
  const { values, handleSubmit, setValues } = formik;

  const onIndustryChange = async (industryDisplayName) => {
    const inputsDefaults = getUIDefaultsForIndustry(industryDisplayName);
    await setValues({
      industry: industryDisplayName,
      aov: inputsDefaults.aov.value,
      avgDiscount: inputsDefaults.avgDiscount.value,
      cvr: inputsDefaults.cvr.value,
      monthlyTraffic: inputsDefaults.monthlyTraffic.value,
    });
    setInputData(inputsDefaults);
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

  const handleValuesChange = useCallback(() => {
    setLoading(true);
    debouncedValuesChange();
  }, [debouncedValuesChange]);

  useEffect(() => {
    if (values.industry !== '') {
      handleValuesChange();
    }
  }, [values.industry, handleValuesChange]);

  return (
    <Box>
      <StyledContainer>
        <FormikProvider value={formik}>
          <form onSubmit={handleSubmit}>
            <StyledContentContainer>
              <StyledTitle>Merchant Simulator</StyledTitle>
              <StyledSubtitle>
                This simulator is optimized for use with a minimum monthly
                traffic of 100,000
              </StyledSubtitle>
              <StyledRowContainer>
                <SimulatorInputsSection
                  industriesDisplayNamesArray={industriesDisplayNamesArray}
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
      {/* Invisible output rendering in order to generate an image */}
      <div
        ref={outputRef}
        style={{
          position: 'absolute',
          top: 0,
          zIndex: -10000,
        }}
      >
        <SimulatorOutputSection
          isLoading={isLoading}
          outputData={outputData}
          isEmailImage={true}
        />
      </div>
    </Box>
  );
};

export default MerchantsSimulatorView;
