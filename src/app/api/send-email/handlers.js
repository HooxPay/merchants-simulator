import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

// Initialize Simple Email Service V2 Client
const ses = new SESv2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const sendEmail = async (body) => {
  //Template Params Object
  const {
    email,
    fullName,
    monthlyTraffic,
    incentivesBudget,
    monthlySalesIncrease,
    simulatorImage,
  } = body;
  const params = {
    Content: {
      Template: {
        TemplateName: 'merchants-simulator-template', // The name of the template in SES
        TemplateData: JSON.stringify({
          fullName,
          monthlyTraffic,
          incentivesBudget,
          monthlySalesIncrease,
          simulatorImage,
        }),
      },
    },
    Destination: {
      ToAddresses: [email], // Recipient email address
    },
    FromEmailAddress: 'info@hooxpay.com', // Sender email address
  };

  // Send e-mail using ses v2 client
  try {
    const command = new SendEmailCommand(params);
    const emailResponse = await ses.send(command);
    console.log('Email sent successfully:', emailResponse);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
