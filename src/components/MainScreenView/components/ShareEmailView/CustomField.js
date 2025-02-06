import { ErrorMessage, Field } from 'formik';

import { Box, InputLabel, TextField, Typography } from '@mui/material';

const CustomField = ({ name, label }) => {
  return (
    <Box style={{ marginBottom: '16px', maxWidth: 400 }}>
      <InputLabel
        htmlFor={name}
        margin={0}
        sx={{
          fontFamily: (theme) => theme.typography.spaceMono.fontFamily,
          fontSize: '0.875rem',
          fontWeight: '400',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </InputLabel>
      <Field name={name}>
        {({ field, form }) => (
          <TextField
            {...field}
            type={'text'}
            id={name}
            fullWidth
            placeholder={'Enter your ' + label}
            variant='outlined'
            error={Boolean(form.touched[name] && form.errors[name])}
            sx={{
              margin: 0,
            }}
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Typography color='error' variant='body2' sx={{ marginTop: '16px' }}>
            {msg}
          </Typography>
        )}
      />
    </Box>
  );
};

export default CustomField;
