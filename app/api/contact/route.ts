import { NextResponse } from 'next/server';
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
    // console.log("Email sent");
    return NextResponse.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error.' }, {status: 500});
  }
}

async function verifyCaptcha(captchaResponse: string) {
  // console.log("Will verify captcha");
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY as string;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${captchaResponse}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    method: 'POST',
  });
  const data = await response.json();
  if (!data.success) {
    // console.log("Captcha verification failed");
    return false;
  } 
  // console.log("Captcha verification succeeded");
  return true
}

export async function POST(req: Request) {
  // console.log("Will try to send email");
  const contactFormData: ContactFormData = await req.json();

  // console.log("Data to send email received", contactFormData);
  if (process.env.NODE_ENV === "production" && !await verifyCaptcha(contactFormData.captchaResponse)) {
    return NextResponse.json({ message: 'Captcha is invalid.' }, {status: 400});
  }
  return await sendEmail(contactFormData);
};