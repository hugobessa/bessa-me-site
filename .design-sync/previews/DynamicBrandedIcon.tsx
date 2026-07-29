import { DynamicBrandedIcon } from 'bessa-me-site';
import { cardClassName, pageClassName } from './_fixtures';

// Brand glyph looked up by name from react-icons/fa6. The icon inherits
// font-size (react-icons defaults to 1em) and `currentColor`, which is the
// whole point: it inverts along with its row when a contact link flips to
// accent on hover, without the icon knowing anything about the hover.
//
// An unrecognised name falls back to FaUser rather than throwing — see the last
// cell. That makes it safe to drive from Notion data, where the icon name is
// free text.

const Cell = ({ name, label }: { name: string; label: string }) => (
  <span className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[.06em] text-ink px-3 py-[11px] border-b-2 border-ink last:border-b-0">
    <DynamicBrandedIcon name={name} />
    <span className="truncate">{label}</span>
  </span>
);

// As the contact list uses it: one glyph per row, inheriting the row's colour.
export const InContactRows = () => (
  <div className={pageClassName}>
    <div className={`${cardClassName} p-6`}>
      <div className="flex flex-col border-2 border-ink">
        <Cell name="FaEnvelope" label="hugo@example.com" />
        <Cell name="FaGithub" label="github.com/hugobessa" />
        <Cell name="FaLinkedin" label="in/hugobessa" />
        <Cell name="FaXTwitter" label="@hugobessa" />
      </div>
    </div>
  </div>
);

// Size follows font-size, so the same glyph scales with its context.
export const Sizes = () => (
  <div className={pageClassName}>
    <div className={`${cardClassName} p-6`}>
      <div className="flex items-end gap-5 text-ink">
        <span className="text-xs">
          <DynamicBrandedIcon name="FaGithub" />
        </span>
        <span className="text-base">
          <DynamicBrandedIcon name="FaGithub" />
        </span>
        <span className="text-2xl">
          <DynamicBrandedIcon name="FaGithub" />
        </span>
        <span className="text-5xl">
          <DynamicBrandedIcon name="FaGithub" />
        </span>
      </div>
    </div>
  </div>
);

// currentColor: the glyph takes the colour of whatever it sits in, including
// an accent-filled tile.
export const InheritsColour = () => (
  <div className={pageClassName}>
    <div className={`${cardClassName} p-6`}>
      <div className="flex gap-3 text-2xl">
        <span className="flex items-center justify-center w-12 h-12 border-2 border-ink bg-surface text-ink">
          <DynamicBrandedIcon name="FaSoundcloud" />
        </span>
        <span className="flex items-center justify-center w-12 h-12 border-2 border-ink bg-accent text-on-accent">
          <DynamicBrandedIcon name="FaInstagram" />
        </span>
        <span className="flex items-center justify-center w-12 h-12 border-2 border-ink bg-surface-2 text-ink-muted">
          <DynamicBrandedIcon name="FaMastodon" />
        </span>
      </div>
    </div>
  </div>
);

// Unknown name → FaUser, not a crash.
export const UnknownNameFallsBack = () => (
  <div className={pageClassName}>
    <div className={`${cardClassName} p-6`}>
      <div className="flex items-center gap-3 text-2xl text-ink">
        <DynamicBrandedIcon name="FaNotARealIcon" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[.12em] text-ink-muted">
          unknown name → FaUser
        </span>
      </div>
    </div>
  </div>
);
