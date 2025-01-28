export const inputsNamesByOrder = [
  { name: 'monthlyTraffic', label: 'monthly traffic' },
  {
    name: 'avgDiscount',
    label: 'Average discount (%)',
    suffix: '%',
    step: 0.1,
  },
  {
    name: 'cvr',
    label: 'Average conversion (%)',
    suffix: '%',
    step: 0.1,
  },
  {
    name: 'aov',
    label: 'Average order ($)',
    prefix: '$',
  },
];

export const inputsInitialValues = {
  monthlyTraffic: {
    value: 0,
    min: 0,
    max: 500000,
  },
  avgDiscount: {
    value: 0,
    min: 0,
    max: 15,
  },
  cvr: {
    value: 0,
    min: 0,
    max: 5,
  },
  aov: {
    value: 0,
    min: 0,
    max: 300,
  },
};
