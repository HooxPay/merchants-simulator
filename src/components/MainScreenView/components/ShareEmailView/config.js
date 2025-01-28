import { object, string } from 'yup';

export const validationSchema = object({
  name: string().required(),
  email: string().required(),
});
