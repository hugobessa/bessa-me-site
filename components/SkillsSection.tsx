import { Language, Skill } from "@/app/notion-data";
import { Section } from "./Section";

/**
 * Two-column mono grid. Cells rule right (solid ink) and down (dotted), and the
 * bottom row drops its rule so the section's own border closes the block.
 * The last-row test differs between the 1-column and 2-column layouts, so each
 * cell emits at most one base rule plus at most one `sm:` override — never two
 * competing declarations of the same property.
 */
const cellClassName = (index: number, count: number) => {
  const isLast = index === count - 1;
  const lastRowStartsAt = count - (count % 2 === 0 ? 2 : 1);
  const isInLastRowOfTwo = index >= lastRowStartsAt;

  return [
    "flex items-center gap-3 px-5 sm:px-6 py-3 min-w-0",
    isLast ? "" : "[border-bottom:2px_dotted_var(--rule)]",
    isInLastRowOfTwo && !isLast ? "sm:[border-bottom:0]" : "",
    "sm:odd:[border-right:2px_solid_var(--ink)]",
  ].join(" ");
};

const nameClassName = "font-mono text-xs font-bold uppercase text-ink";

export const SkillsSection = ({ skills }: { skills: Skill[] }) => (
  <Section id="skills" title="skills">
    <div className="grid sm:grid-cols-2">
      {skills?.map((skill, index) => (
        <div key={skill.id} className={cellClassName(index, skills.length)}>
          {/* the name takes the slack and wraps — names here run as long as
              "Software Engineering Teams Leadership", which no fixed column
              holds without an ellipsis. The fixed bar and value keep every
              row's gauge aligned on the right regardless. */}
          <span className={`flex-1 min-w-0 ${nameClassName}`}>{skill.name}</span>
          <span className="w-20 sm:w-28 shrink-0 block h-3 border-2 border-ink bg-surface">
            <span
              className="block h-full"
              style={{
                width: `${skill.percentage}%`,
                background:
                  skill.percentage >= 100 ? "var(--ink)" : "var(--accent)",
              }}
            />
          </span>
          <span className="w-6 shrink-0 text-right font-mono text-[11px] font-bold text-ink">
            {skill.percentage}
          </span>
        </div>
      ))}
    </div>
  </Section>
);

export const LanguagesSection = ({ languages }: { languages: Language[] }) => (
  <Section id="languages" title="languages">
    <div className="grid sm:grid-cols-2">
      {languages?.map((language, index) => (
        <div
          key={language.id}
          className={cellClassName(index, languages.length)}
        >
          {/* language names are short, so a fixed column keeps levels aligned */}
          <span className={`w-28 shrink-0 ${nameClassName}`}>
            {language.name}
          </span>
          {/* levels are prose, not metadata — mono uppercase would shout */}
          <span className="min-w-0 text-sm font-medium leading-[1.4] text-ink-body">
            {language.level}
          </span>
        </div>
      ))}
    </div>
  </Section>
);
