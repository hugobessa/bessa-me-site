import { ContactForm } from 'bessa-me-site';
import { cardClassName, pageClassName } from './_fixtures';

// The form on its own. Fields are `bg-field` boxes with a 2px ink border and no
// radius; focus draws an inset accent underline (`shadow-field-focus`) rather
// than a ring. Labels are mono uppercase, sitting above their control.
//
// The submit button is where this system's press behaviour lives: it carries a
// hard offset shadow and, on hover, translates half a step down-right while the
// shadow shrinks — the button physically moves onto the surface. Disabled it
// goes dashed and muted with no shadow at all. None of that is visible in a
// static card; it is in the stylesheet the design agent gets.
//
// NODE_ENV="development" keeps the live reCAPTCHA widget out of the card (it
// mounts only on the exact string "production", and needs a real key plus a
// network round-trip). Submitting POSTs to /api/contact and raises a
// react-toastify toast — neither exists in a card, so the button is inert here.

export const Form = () => (
  <div className={pageClassName}>
    <div className={`${cardClassName} p-6`}>
      <ContactForm RECAPTCHA_SITE_KEY="" NODE_ENV="development" />
    </div>
  </div>
);

// How the site actually places it: on the right half of the contact band, with
// the heading beside it. Narrower measure, same control sizes.
export const InContactBand = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-3.5 p-6 md:border-r-2 border-ink">
          <h2 className="font-titles font-black text-[30px] leading-none uppercase text-ink">
            Send me a
            <br />
            <span className="bg-accent text-on-accent px-1.5">message</span>
          </h2>
        </div>
        <div className="p-6 border-t-2 md:border-t-0 border-ink">
          <ContactForm RECAPTCHA_SITE_KEY="" NODE_ENV="development" />
        </div>
      </div>
    </div>
  </div>
);
