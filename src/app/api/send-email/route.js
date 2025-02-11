import {
  processSimulatorImage,
  sendEmailToAdmin,
  sendEmailToClient,
} from './handlers';

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const email = data.get('email');
    const fullName = data.get('fullName');
    const monthlyTraffic = data.get('monthlyTraffic');
    const incentivesBudget = data.get('incentivesBudget');
    const annualSalesIncrease = data.get('annualSalesIncrease');
    const outputImage = data.get('outputImage');

    const simulatorImageUrl = await processSimulatorImage(
      outputImage,
      fullName
    );
    if (!simulatorImageUrl) {
      return new Response(
        JSON.stringify({ error: 'failed to upload image to s3' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const emailBody = {
      email,
      fullName,
      monthlyTraffic,
      incentivesBudget,
      annualSalesIncrease,
      simulatorImageUrl,
    };
    const emailResponse = await sendEmailToClient(emailBody);
    if (!emailResponse) {
      return new Response(
        JSON.stringify({ error: 'ses failed to send email' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await sendEmailToAdmin(emailBody);

    return new Response(
      JSON.stringify({
        message: 'email sent successfully',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('email sending failed', error.message);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
