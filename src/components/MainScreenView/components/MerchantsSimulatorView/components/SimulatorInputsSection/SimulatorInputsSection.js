import { Field } from 'formik';

import { Box, MenuItem, Typography } from '@mui/material';
import {
  StyledInputContainer,
  StyledInputLabel,
  StyledSelect,
} from './SimulatorInputsSection.styles';
import CustomSlider from './CustomSlider';

const SimulatorInputsSection = ({
  industriesDisplayNamesArray,
  onIndustryChange,
  inputData,
  handleValuesChange,
}) => {
  return (
    <StyledInputContainer>
      <Box>
        <StyledInputLabel htmlFor={'industry'} margin={0}>
          industry
        </StyledInputLabel>
        <Field name={'industry'}>
          {({ field, form }) => (
            <StyledSelect
              {...field}
              value={field.value}
              onChange={(e) => {
                onIndustryChange(e.target.value);
              }}
              displayEmpty
              renderValue={(selected) =>
                selected ? (
                  selected
                ) : (
                  <Typography
                    sx={{
                      color: (theme) => theme.shadesOfGrey.light,
                      fontSize: '0.875rem',
                    }}
                  >
                    Select an industry
                  </Typography>
                )
              }
            >
              {industriesDisplayNamesArray.map((industryDisplayName, index) => {
                return (
                  <MenuItem
                    key={`${index}-menuItem`}
                    value={industryDisplayName}
                  >
                    {industryDisplayName}
                  </MenuItem>
                );
              })}
            </StyledSelect>
          )}
        </Field>
      </Box>
      <CustomSlider
        name={'monthlyTraffic'}
        label={'monthly traffic'}
        handleValuesChange={handleValuesChange}
        min={inputData.monthlyTraffic.min}
        max={inputData.monthlyTraffic.max}
      />
      <CustomSlider
        name={'avgDiscount'}
        label={'average discount (%)'}
        handleValuesChange={handleValuesChange}
        min={inputData.avgDiscount.min}
        max={inputData.avgDiscount.max}
        suffix={'%'}
        step={0.1}
      />
      <CustomSlider
        name={'cvr'}
        label={'average conversion (%)'}
        handleValuesChange={handleValuesChange}
        min={inputData.cvr.min}
        max={inputData.cvr.max}
        suffix={'%'}
        step={0.1}
      />
      <CustomSlider
        name={'aov'}
        label={'average order ($)'}
        handleValuesChange={handleValuesChange}
        min={inputData.aov.min}
        max={inputData.aov.max}
        prefix={'$'}
      />
    </StyledInputContainer>
  );
};

export default SimulatorInputsSection;
