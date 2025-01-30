import styled from '@emotion/styled';
import { Box, InputLabel, Select, Slider, TextField } from '@mui/material';

export const StyledSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  border: '1px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '0.5rem',
  padding: '0',
  marginBottom: '1.25rem',
  '& .MuiSelect-outlined': {
    padding: '0.75rem 1rem',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

export const StyledInputContainer = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  marginTop: '2rem',
}));

export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#916AFF',
  '& .MuiSlider-thumb': {
    zIndex: 1,
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
    border: '4px solid rgba(255, 255, 255, 1)',
  },
  '& .MuiSlider-track': {
    backgroundColor: '#916AFF',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#EBEBEB',
  },
}));

export const StyledSliderTextField = styled(TextField)(({ theme }) => ({
  width: '90px',
  '.MuiInputBase-root': {
    fontSize: '0.875rem',
    padding: '0.35rem 0.35rem',
  },
  '.MuiInputBase-input': {
    textAlign: 'right',
  },
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontFamily: theme.typography.spaceMono.fontFamily,
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  fontWeight: '400',
  marginBottom: '0.5rem',
}));
