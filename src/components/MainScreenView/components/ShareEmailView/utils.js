export const preparePayload = (values, emailData) => {
  const formData = new FormData();

  formData.append('email', values.email);
  formData.append('merchant', values.merchant);
  formData.append('fullName', values.name);
  formData.append('monthlyTraffic', emailData.monthlyTraffic);
  formData.append('incentivesBudget', emailData.incentivesBudget);
  formData.append('annualSalesIncrease', emailData.annualSalesIncrease);
  formData.append('outputImage', emailData.outputImage);

  return formData;
};
