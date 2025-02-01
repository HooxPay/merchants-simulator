import { sendEmail } from './handlers';

export const POST = async (req) => {
  try {
    const { emailData, personalIdentifiers } = await req.json();
    const emailBody = {
      email: personalIdentifiers.email,
      fullName: personalIdentifiers.fullName,
      monthlyTraffic: emailData.monthlyTraffic,
      incentivesBudget: emailData.incentivesBudget,
      monthlySalesIncrease: emailData.monthlySalesIncrease,
      simulatorImage: emailData.simulatorImage,
    };
    const emailResponse = await sendEmail(emailBody);
    if (!emailResponse) {
      return new Response(
        JSON.stringify({ error: 'ses failed to send email' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'email sent successfully',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('email sending failed', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate campaign' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
