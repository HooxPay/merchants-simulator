import * as Yup from 'yup';

export const validationSchema = Yup.object({
  monthlyTraffic: Yup.number().min(100000, 'Value cannot be less than 100,000'),
});
