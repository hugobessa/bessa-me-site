import { Language } from "@/app/notion-data";
import { Section } from "./Section";
import { gridCellRuleClassName } from "./styles";

/** One column of the capability map: a label and the things under it. */
export interface CapabilityGroup {
  label: string;
  items: string[];
}

const nameClassName = "font-mono text-xs font-bold uppercase text-ink";

/**
 * The capability map: four unranked columns, plus the toolbelt as one mono
 * line. Deliberately without a score — a self-rated gauge says less than the
 * list itself, and reads as an IC's inventory rather than a manager's remit.
 */
export const SkillsSection = ({
  groups,
  toolbelt,
}: {
  groups: CapabilityGroup[];
  toolbelt: string[];
}) => (
  <Section id="skills" title="what i'm good at">
    <div className="grid sm:grid-cols-4">
      {groups?.map((group, index) => (
        <div
          key={group.label}
          className={`flex flex-col gap-3 px-5 py-5 ${gridCellRuleClassName(
            index,
            groups.length,
            4
          )}`}
        >
          <span className="meta bg-accent text-on-accent px-2 py-1 self-start">
            {group.label}
          </span>
          <ul className="list-none m-0 p-0 flex flex-col gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="text-sm font-medium leading-[1.4] text-ink-body"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    {/* the stack is a footnote to the capabilities, not a column of its own —
        one muted line under a solid rule keeps it in that register */}
    {toolbelt?.length > 0 && (
      <div className="flex gap-3 items-baseline flex-wrap px-5 sm:px-6 py-3.5 border-t-2 border-ink bg-surface-2">
        <span className="meta text-ink-muted">toolbelt</span>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[.1em] text-ink-muted">
          {toolbelt.join(" · ")}
        </span>
      </div>
    )}
  </Section>
);

export const LanguagesSection = ({ languages }: { languages: Language[] }) => (
  <Section id="languages" title="languages">
    <div className="grid sm:grid-cols-2">
      {languages?.map((language, index) => (
        <div
          key={language.id}
          className={`flex items-center gap-3 px-5 sm:px-6 py-3 min-w-0 ${gridCellRuleClassName(
            index,
            languages.length,
            2
          )}`}
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
