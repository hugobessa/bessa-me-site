import { Section } from "./Section";
import { gridCellRuleClassName } from "./styles";

export interface LeadershipPrinciple {
  title: string;
  body: string;
  /**
   * The public artifact backing the claim. A principle without one still
   * renders — it just makes an unbacked assertion, which is the whole thing
   * this band exists to avoid.
   */
  proof?: { label: string; href: string };
}

/**
 * Four principles, each carrying a public artifact. The artifact is the point:
 * a claim about how someone leads is worth what it can be checked against, so
 * every cell ends on a link rather than on the claim.
 */
export const HowILeadSection = ({
  principles,
}: {
  principles: LeadershipPrinciple[];
}) => (
  <Section
    id="leadership"
    title="how i lead"
    actions={
      <span className="meta text-ink-muted">
        {principles.length} principles · each with a public artifact
      </span>
    }
  >
    <div className="grid sm:grid-cols-2">
      {principles?.map((principle, index) => (
        <div
          key={principle.title}
          className={`flex flex-col gap-3 px-5 sm:px-6 py-5 ${gridCellRuleClassName(
            index,
            principles.length,
            2
          )}`}
        >
          <div className="flex items-baseline gap-3">
            <span className="meta text-ink-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-titles font-black uppercase text-ink text-[19px] leading-[1.05]">
              {principle.title}
            </h3>
          </div>
          <p className="text-[15px] font-medium leading-[1.55] text-ink-body max-w-[48ch]">
            {principle.body}
          </p>
          {/* pinned to the bottom so the proof rows line up across cells whose
              bodies wrap to different heights */}
          {principle.proof && (
            <a
              href={principle.proof.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 mt-auto pt-3 [border-top:2px_dotted_var(--rule)]"
            >
              <span className="meta shrink-0 bg-accent text-on-accent px-2 py-1">
                proof
              </span>
              <span className="meta text-ink-muted">
                {principle.proof.label}
              </span>
            </a>
          )}
        </div>
      ))}
    </div>
  </Section>
);
