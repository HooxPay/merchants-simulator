import * as Yup from 'yup';

export const validationSchema = Yup.object({
  industry: Yup.string().required(),
});
