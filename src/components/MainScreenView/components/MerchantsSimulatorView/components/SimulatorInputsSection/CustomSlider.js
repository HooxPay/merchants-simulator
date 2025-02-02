import React from 'react';
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

const stripAndParseValue = (value) => {
  const prefix = '$';
  const suffix = '%';

  return Number(
    value
      .replace(new RegExp(`^${prefix}`), '')
      .replace(new RegExp(`${suffix}$`), '')
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
          {({ field, form }) => (
            <StyledSliderTextField
              value={field.value}
              onChange={(e) =>
                form.setFieldValue(
                  name,
                  stripAndParseValue(e.target.value) || min
                )
              }
              onBlur={handleValuesChange}
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
      decimalScale={1}
    />
  );
});

export default CustomSlider;
