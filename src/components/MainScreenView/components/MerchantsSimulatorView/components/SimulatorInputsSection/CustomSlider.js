import React, { useState } from 'react';
import { Field } from 'formik';
import { NumericFormat } from 'react-number-format';

import { Box } from '@mui/material';
import {
  StyledInputLabel,
  StyledSlider,
  StyledSliderTextField,
  StyledTooltip,
} from './SimulatorInputsSection.styles';

const formatSliderLabel = (value) => {
  return (
    <NumericFormat
      value={value}
      displayType='text'
      thousandSeparator
      decimalScale={1}
    />
  );
};

const CustomSlider = ({
  name,
  label,
  handleValuesChange,
  min,
  max,
  prefix = '',
  suffix = '',
  step = 1,
}) => {
  const [error, setError] = useState('');

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      mb={2}
      key={`${name}-sliderContainer`}
      sx={{ maxHeight: 88, height: '100%' }}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <StyledInputLabel htmlFor={name}>{label || name}</StyledInputLabel>
        <Field name={name}>
          {({ field, form }) => {
            const handleBlur = (value) => {
              let parsedValue = Number(value.replace(/[^0-9.]/g, ''));
              let errorMsg = '';

              if (parsedValue < min) {
                parsedValue = min;
                errorMsg = `Value cannot be less than ${min.toLocaleString()}`;
              } else if (parsedValue > max) {
                parsedValue = max;
                errorMsg = `Value cannot be greater than ${max.toLocaleString()}`;
              }
              form.setFieldValue(name, parsedValue);

              if (errorMsg) {
                showError(errorMsg);
              }

              handleValuesChange();
            };
            return (
              <Box>
                {error && <StyledTooltip open={true} title={error} />}
                <StyledSliderTextField
                  value={field.value}
                  onChange={(e) => {
                    form.setFieldValue(name, e.target.value);
                  }}
                  onBlur={(e) => handleBlur(e.target.value)}
                  name={name}
                  slotProps={{
                    input: {
                      inputProps: {
                        prefix: prefix,
                        suffix: suffix,
                        min: min,
                        max: max,
                        maxLength: 10,
                      },
                      inputComponent: NumericFormatCustom,
                    },
                  }}
                  variant='standard'
                  error={!!error}
                />
              </Box>
            );
          }}
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
              //  handleValuesChange();
            }}
            onChangeCommitted={(event, value) => {
              form.setFieldValue(name, value);
              handleValuesChange();
            }}
            valueLabelDisplay='auto'
          />
        )}
      </Field>
    </Box>
  );
};

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      // isAllowed={({ floatValue }) => {
      //   if (floatValue == null) return true;
      //   const minCondition = min != null ? floatValue >= min : true;
      //   const maxCondition = max != null ? floatValue <= max : true;
      //   return minCondition && maxCondition;
      // }}
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
      decimalScale={1}
    />
  );
});

export default CustomSlider;
