import { formatNumToReadableText } from "@/utils/math";

export const industryOptions = [
  { value: 'general', text: 'General (E-commerce)' },
  { value: 'hello', text: 'hello' },
  { value: 'world', text: 'world' },
];
export const slidersData = [
  {
    name: 'monthlyTraffic',
    label: 'monthly traffic',
    min: 0,
    max: 5000000,
    formatLabel: formatNumToReadableText,
    onChange: (value) => setFieldValue('monthlyTraffic', value),
  },
  {
    name: 'avgDiscount',
    label: 'Average discount (%)',
    suffix: '%',
    onChange: (value) => setFieldValue('avgDiscount', value),
  },
  {
    name: 'avgConversion',
    label: 'Average conversion (%)',
    suffix: '%',
    onChange: (value) => setFieldValue('avgConversion', value),
  },
  {
    name: 'avgOrder',
    label: 'Average order (%)',
    suffix: '%',
    onChange: (value) => setFieldValue('avgOrder', value),
  },
];
