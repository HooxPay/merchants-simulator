import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';

import {
  StyledBottomSubtitle,
  StyledButtonsContainer,
  StyledContainer,
  StyledContentContainer,
  StyledDivider,
  StyledFooterContainer,
  StyledSubtitle,
  StyledTitle,
} from './ShareEmailView.styles';
import { validationSchema } from './config';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { steps } from '../../MainScreenView';

const ShareEmailView = ({ setStep }) => {
  const [isLoading, setLoading] = useState(false);

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
            <Typography
              color='error'
              variant='body2'
              sx={{ marginTop: '16px' }}
            >
              {msg}
            </Typography>
          )}
        />
      </Box>
    );
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setStep(steps.thankYou);
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
            <StyledTitle>Hoox Embedded Offers are Free!</StyledTitle>
            <StyledSubtitle>
              Share your email and get access to Hoox plugin/API for free!
            </StyledSubtitle>
            <CustomField name={'name'} label={'full name'} />
            <CustomField name={'email'} label={'work email'} />
            <StyledBottomSubtitle>
              By submitting your email, you agree to Hoox T&C and our Privacy
              Policy.
            </StyledBottomSubtitle>
            <StyledFooterContainer>
              <StyledDivider variant='horizontal' />
              <StyledButtonsContainer>
                <Button
                  onClick={() => setStep(steps.simulator)}
                  variant='outlined'
                  color='secondary'
                  sx={{
                    borderColor: '#C8C8C8',
                    minWidth: 96,
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                >
                  Back
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={{ minWidth: 96 }}
                >
                  Send
                </Button>
              </StyledButtonsContainer>
            </StyledFooterContainer>
          </StyledContentContainer>
        </form>
      </FormikProvider>
    </StyledContainer>
  );
};

export default ShareEmailView;
