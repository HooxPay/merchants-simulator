export const preparePayload = (values, emailData) => {
  const formData = new FormData();

  formData.append('email', values.email);
  formData.append('fullName', values.name);
  formData.append('monthlyTraffic', emailData.monthlyTraffic);
  formData.append('incentivesBudget', emailData.incentivesBudget);
  formData.append('monthlySalesIncrease', emailData.monthlySalesIncrease);
  formData.append('outputImage', emailData.outputImage);

  return formData;
};
