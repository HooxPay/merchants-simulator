import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { NumericFormat } from 'react-number-format';

import { Box, MenuItem, Typography } from '@mui/material';
import {
  StyledInputContainer,
  StyledInputLabel,
  StyledSelect,
  StyledSlider,
  StyledSliderTextField,
} from './SimulatorInputsSection.styles';
import { inputsNamesByOrder } from './InputsData';

const formatSliderLabel = (value) => {
  return <NumericFormat value={value} displayType='text' thousandSeparator />;
};

const SimulatorInputsSection = ({
  industriesArray,
  onIndustryChange,
  inputData,
  handleValuesChange,
}) => {
  const renderError = (name) => (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <Typography color='error' variant='body2' sx={{ marginTop: '-20px' }}>
          {msg}
        </Typography>
      )}
    />
  );
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
                handleValuesChange();
              }}
              placeholder={'Please choose industry'}
            >
              {industriesArray.map((industry, index) => {
                return (
                  <MenuItem key={`${index}-menuItem`} value={industry}>
                    {industry}
                  </MenuItem>
                );
              })}
            </StyledSelect>
          )}
        </Field>
        {renderError('industry')}
      </Box>
      {inputsNamesByOrder.map((input) => {
        const { name, label, suffix = '', prefix = '', step = 1 } = input;
        const { min, max } = inputData[input.name];
        return (
          <Box
            display='flex'
            flexDirection='column'
            mb={2}
            key={`${name}-sliderContainer`}
          >
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <StyledInputLabel htmlFor={name}>
                {label || name}
              </StyledInputLabel>
              <Field name={name}>
                {({ field, form }) => (
                  <StyledSliderTextField
                    value={field.value}
                    onChange={(e) => {
                      form.setFieldValue(name, e.target.value || min);
                      handleValuesChange();
                    }}
                    name={name}
                    slotProps={{
                      input: {
                        inputProps: {
                          prefix: prefix,
                          suffix: suffix,
                          min: min,
                          max: max,
                        },
                        inputComponent: NumericFormatCustom,
                      },
                    }}
                    variant='standard'
                  />
                )}
              </Field>
            </Box>

            <Field name={name}>
              {({ field, form }) => (
                <StyledSlider
                  {...field}
                  value={field.value || min}
                  min={min}
                  max={max}
                  step={step}
                  valueLabelFormat={(value) => formatSliderLabel(value)}
                  onChange={(e, value) => {
                    form.setFieldValue(name, value);
                    handleValuesChange();
                  }}
                  valueLabelDisplay='auto'
                />
              )}
            </Field>
            {renderError(name)}
          </Box>
        );
      })}
    </StyledInputContainer>
  );
};

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, min, max, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      isAllowed={({ floatValue }) => {
        if (floatValue == null) return true;
        const minCondition = min != null ? floatValue >= min : true;
        const maxCondition = max != null ? floatValue <= max : true;
        return minCondition && maxCondition;
      }}
      allowNegative={false}
      allowLeadingZeros={false}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});

export default SimulatorInputsSection;
