import { ContactInfo } from "@/app/notion-data";
import { ContactForm } from "./ContactForm";
import { DynamicBrandedIcon } from "./DynamicBrandedIcon";

export const ContactSection = ({
  contactInfoData,
  RECAPTCHA_SITE_KEY,
  NODE_ENV,
}: {
  contactInfoData: ContactInfo[];
  RECAPTCHA_SITE_KEY: string;
  NODE_ENV: string;
}) => (
  <section
    id="contact"
    className="grid md:grid-cols-2 border-b-2 border-ink last:border-b-0 scroll-mt-[var(--nav-h)]"
  >
    <div className="flex flex-col gap-3.5 p-6 md:border-r-2 border-ink">
      <h2 className="font-titles font-black text-[30px] leading-none uppercase text-ink">
        Send me a
        <br />
        <span className="bg-accent text-on-accent px-1.5">message</span>
      </h2>
      <div className="flex flex-col border-2 border-ink">
        {contactInfoData?.map((contact) => {
          const row = (
            <>
              <DynamicBrandedIcon name={contact.icon} />
              <span className="truncate">{contact.text}</span>
            </>
          );
          const className =
            "flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[.06em] text-ink px-3 py-[11px] border-b-2 border-ink last:border-b-0 min-w-0";

          return contact.link ? (
            <a
              key={contact.id}
              href={contact.link}
              target={!contact.link.startsWith("mailto:") ? "_blank" : undefined}
              rel="noreferrer"
              className={`${className} hover:bg-accent hover:text-on-accent`}
            >
              {row}
            </a>
          ) : (
            <span key={contact.id} className={className}>
              {row}
            </span>
          );
        })}
      </div>
    </div>
    <div className="p-6 border-t-2 md:border-t-0 border-ink">
      <ContactForm NODE_ENV={NODE_ENV} RECAPTCHA_SITE_KEY={RECAPTCHA_SITE_KEY} />
    </div>
  </section>
);
