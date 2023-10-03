import { NextApiRequest, NextApiResponse } from 'next';
import { RecaptchaV3 } from 'express-recaptcha';
import sgMail from '@sendgrid/mail';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, subject, body, captchaResponse } = req.body;

  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY as string;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY as string;
  const sendGridAPIKey = process.env.SENDGRID_API_KEY as string;

  // Verify the captcha
  const recaptchaClient = new RecaptchaV3(recaptchaSiteKey, recaptchaSecretKey);
  recaptchaClient.verify(captchaResponse, async (error) => {
    if (error) {
      return res.status(400).json({ message: 'Captcha verification failed.' });
    }

    try {
      // Replace 'your_sendgrid_api_key' with your actual SendGrid API key
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

      return res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
};