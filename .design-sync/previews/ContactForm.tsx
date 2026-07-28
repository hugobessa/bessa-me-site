import { ContactForm } from 'bessa-me-site';

// The reCAPTCHA widget renders only when NODE_ENV is exactly "production", and
// it needs a live key plus a network round-trip to Google. Cards therefore use
// "development", which is the same form minus the captcha box — see NOTES.md.
//
// Submitting POSTs to /api/contact and raises a react-toastify toast; neither
// exists inside a preview card, so the cards show the form's initial state.

export const Form = () => (
  <div className="p-6 bg-gray-50">
    <div className="mx-auto max-w-xl bg-white rounded shadow-lg p-6">
      <h2 className="text-3xl font-semibold mb-6">Contact</h2>
      <ContactForm RECAPTCHA_SITE_KEY="" NODE_ENV="development" />
    </div>
  </div>
);

export const OnDarkSection = () => (
  <div className="p-6 bg-gray-900">
    <div className="mx-auto max-w-xl bg-white rounded shadow-lg p-6">
      <h2 className="text-3xl font-semibold mb-6">Get in touch</h2>
      <ContactForm RECAPTCHA_SITE_KEY="" NODE_ENV="development" />
    </div>
  </div>
);
