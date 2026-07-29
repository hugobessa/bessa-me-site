import { Section } from "./Section";
import { gridCellRuleClassName } from "./styles";

/** One cell: a numeral, what it counts, and the qualifier under it. */
export interface ScopeStat {
  /** Free text, not a number — a stat may read "12" or "12+". */
  value: string;
  label: string;
  note: string;
}

/** Four numbers, no prose. */
export const ScopeSection = ({ stats }: { stats: ScopeStat[] }) => (
  <Section
    id="scope"
    title="scope"
    actions={<span className="meta text-ink-muted">2014 → today</span>}
  >
    <div className="grid sm:grid-cols-4">
      {stats?.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-1.5 px-5 sm:px-6 py-6 ${gridCellRuleClassName(
            index,
            stats.length,
            4
          )}`}
        >
          <span className="font-titles font-black text-ink text-[46px] leading-none">
            {stat.value}
          </span>
          <span className="meta text-ink">{stat.label}</span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[.1em] text-ink-muted">
            {stat.note}
          </span>
        </div>
      ))}
    </div>
  </Section>
);
