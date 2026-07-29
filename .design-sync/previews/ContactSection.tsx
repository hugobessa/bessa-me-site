import { ContactSection } from 'bessa-me-site';
import { cardClassName, contactInfo, pageClassName } from './_fixtures';

// The closing band: a knockout heading and the contact list on the left, the
// form on the right, split by a solid rule at `md` and stacked below it.
//
// Contact rows are a single ink-bordered stack — every row rules off against
// the next and the last one drops its rule. A row with a `link` becomes an
// anchor that inverts to accent on hover; a row without one is plain text (the
// location row below). Non-mailto links open in a new tab.
//
// NODE_ENV is "development" in every card on purpose: the reCAPTCHA widget
// mounts only on the exact string "production", where it needs a real site key
// and a round-trip to Google — in a card that renders blank or errors.

export const Full = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <ContactSection
        contactInfoData={contactInfo}
        RECAPTCHA_SITE_KEY=""
        NODE_ENV="development"
      />
    </div>
  </div>
);

// A shorter list — the stack is only as tall as the rows it holds.
export const FewChannels = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <ContactSection
        contactInfoData={contactInfo.slice(0, 2)}
        RECAPTCHA_SITE_KEY=""
        NODE_ENV="development"
      />
    </div>
  </div>
);
