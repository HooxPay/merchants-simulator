import { object, string } from 'yup';

export const validationSchema = object({
  name: string().required('Please enter your name'),
  email: string()
    .required('Please enter your email')
    .email('Please enter a valid e-mail'),
});
