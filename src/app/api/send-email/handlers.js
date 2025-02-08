import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

// Initialize Simple Email Service V2 Client
const ses = new SESv2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const merchantsDocsUrl = 'https://hoox.gitbook.io/merchants-api';

export const sendEmail = async (body) => {
  //Template Params Object
  const {
    email,
    fullName,
    monthlyTraffic,
    incentivesBudget,
    monthlySalesIncrease,
    simulatorImageUrl,
  } = body;
  const params = {
    Content: {
      Template: {
        TemplateName: 'merchant-simulator-output-email-template', // The name of the template in SES
        TemplateData: JSON.stringify({
          fullName,
          monthlyTraffic,
          incentivesBudget,
          monthlySalesIncrease,
          simulatorImageUrl,
          merchantsDocsUrl,
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

export const uploadToS3 = async (fileBuffer, bucketName, key, contentType) => {
  const s3Params = {
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(s3Params);
  const response = await s3.send(command);
  if (response.$metadata.httpStatusCode === 200) {
    const location = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return location;
  } else {
    return null;
  }
};

// Process and upload banner from form
export const processSimulatorImage = async (simulatorImage, fullName) => {
  try {
    if (!simulatorImage) return null;

    const today = new Date();
    const formattedDate = format(today, 'MM-dd-yy');
    const formattedName = fullName.replace(/\s/g, '');
    const uid = generateUID();

    const fileNameBase = `${formattedDate}-${formattedName}-${uid}`;
    const simulatorImageBuffer = Buffer.from(
      await simulatorImage.arrayBuffer()
    );
    const simulatorImageKey = `merchantSimulator/${fileNameBase}`;

    const bannerUploadResult = await uploadToS3(
      simulatorImageBuffer,
      process.env.AWS_S3_BUCKET_NAME,
      simulatorImageKey,
      simulatorImage.type
    );

    console.log('Simulator image upload successful:', bannerUploadResult);
    return bannerUploadResult;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const generateUID = () => {
  return uuidv4().replace(/-/g, '').slice(0, 6);
};
