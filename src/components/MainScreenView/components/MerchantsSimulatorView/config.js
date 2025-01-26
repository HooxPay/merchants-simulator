import * as Yup from 'yup';

export const validationSchema = Yup.object({
  industry: Yup.string().required(),
  monthlyTraffic: Yup.number().min(100000, 'Value cannot be less than 100,000'),
});
