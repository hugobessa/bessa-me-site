import Server from 'next/server';
import { RecaptchaV3 } from 'express-recaptcha';
import sgMail from '@sendgrid/mail';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  body: string;
  captchaResponse: string;
}

async function sendEmail({ name, email, subject, body }: ContactFormData) {
  try {
    const sendGridAPIKey = process.env.SENDGRID_API_KEY as string;
    sgMail.setApiKey(sendGridAPIKey);
  
    // Construct the email data
    const emailData = {
      to: 'hugo@bessa.me', // Replace with the recipient's email address
      from: 'contact@bessa.me', // Replace with your sending email address
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${body}`,
    };
  
    // Send the email using SendGrid
    await sgMail.send(emailData);
    return Server.NextResponse.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error(error);
    return Server.NextResponse.json({ message: 'Internal server error.' }, {status: 500});
  }
}

export async function POST(req: Request) {
  const contactFormData: ContactFormData = await req.json();

  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY as string;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY as string;

  if (process.env.NODE_ENV === "production") {
    // Verify the captcha
    const recaptchaClient = new RecaptchaV3(recaptchaSiteKey, recaptchaSecretKey);
    recaptchaClient.verify(contactFormData.captchaResponse, async (error) => {
      if (error) {
        return Server.NextResponse.json({ message: 'Captcha verification failed.' }, {status: 400});
      }
      return await sendEmail(contactFormData);
    });
  } else {
    return await sendEmail(contactFormData);
  }
};