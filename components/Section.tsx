/**
 * A section of the single Terminal Grid card: a mono uppercase header bar on
 * surface-2, then the body. Sections are separated by a solid 2px rule; the
 * last one in the card drops it.
 */
export const Section = ({
  id,
  title,
  actions,
  subheader,
  className = "",
  children,
}: {
  id?: string;
  title: string;
  actions?: React.ReactNode;
  /**
   * Rendered inside the sticky block, under the header row. Anything the
   * header opens belongs here — left in `children` it would appear at its
   * original place in the document, off-screen above a pinned header.
   */
  subheader?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className={`border-b-2 border-ink last:border-b-0 scroll-mt-(--nav-h) ${className}`}
  >
    {/* the header rides along under the nav for as long as its section is in
        view, so the reader always knows which block they're in */}
    <div className="sticky top-(--nav-h) z-20">
      <div className="flex items-center justify-between gap-3 flex-wrap px-5 sm:px-6 py-3 border-b-2 border-ink bg-surface-2">
        <h2 className="font-mono text-xs font-extrabold uppercase tracking-[.2em] text-ink">
          {title}
        </h2>
        {actions}
      </div>
      {subheader}
    </div>
    {children}
  </section>
);
