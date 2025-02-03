import React, { useState } from 'react';
import { Field } from 'formik';
import { NumericFormat } from 'react-number-format';

import { Box } from '@mui/material';
import {
  StyledInputLabel,
  StyledSlider,
  StyledSliderTextField,
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
  const [displayValue, setDisplayValue] = useState('');

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
            const handleBlur = () => {
              let parsedValue = displayValue;
              let error = '';

              if (parsedValue < min) {
                parsedValue = min;
                error = `Value cannot be less than ${min}`;
              } else if (parsedValue > max) {
                parsedValue = max;
                error = `Value cannot be greater than ${max}`;
              }

              form.setFieldValue(name, parsedValue);

              if (error) {
                form.setFieldError(name, error);
                form.setFieldTouched(name, true)
              } else {
                form.setFieldError(name, '');
              }
              setDisplayValue(parsedValue);

              handleValuesChange();
            };
            return (
              <StyledSliderTextField
                value={displayValue || field.value}
                onChange={(e) => {
                  setDisplayValue(e.target.value);
                }}
                onBlur={handleBlur}
                name={name}
                error={form.errors[name]}
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
              />
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
