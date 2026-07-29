"use client";

import { NotionRichTextItemType, Organization } from "@/app/notion-data";
import Image from "next/image";
import { useState } from "react";
import { NotionRichText } from "./NotionRichText";
import { Section } from "./Section";
import { smallButtonClassName } from "./styles";

export interface HistoryEntry {
  id: string;
  date: string;
  /** role, course — whatever follows the organization name */
  detail: string;
  organization: Organization;
  description: NotionRichTextItemType[];
  /** Team size, remit, span — a chip above the outcome. Omitted rows drop it. */
  scope?: string;
  /**
   * What the role produced, always visible. The description behind `see more`
   * stays the long version; this is the one line worth reading without a click.
   */
  outcome?: string;
}

/** Row padding, which the rail has to bridge to stay unbroken between rows. */
const ROW_PADDING_Y = "18px";

/**
 * The timeline rail: a 2px line with a square marker per row. The rail column
 * stretches to the row's *content* box, so the two line segments reach past it
 * by the row padding to meet the neighbouring rows. The segment above the
 * marker is dropped on the first row and the one below it on the last, so the
 * line starts and ends on a marker rather than running off the section.
 */
const TimelineRail = ({
  isFirst,
  isLast,
}: {
  isFirst: boolean;
  isLast: boolean;
}) => (
  <div className="relative self-stretch w-3 shrink-0" aria-hidden>
    {!isFirst && (
      <span
        className="absolute left-1/2 -translate-x-1/2 h-10 w-0.5 bg-ink"
        style={{ top: `-${ROW_PADDING_Y}` }}
      />
    )}
    {!isLast && (
      <span
        className="absolute left-1/2 -translate-x-1/2 top-[30px] w-0.5 bg-ink"
        style={{ bottom: `-${ROW_PADDING_Y}` }}
      />
    )}
    <span className="absolute left-1/2 -translate-x-1/2 top-[22px] w-2 h-2 bg-ink" />
  </div>
);

const HistoryRow = ({
  entry,
  timeline,
}: {
  entry: HistoryEntry;
  timeline?: { isFirst: boolean; isLast: boolean };
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-start gap-4 px-5 sm:px-6 py-[18px] [border-bottom:2px_dotted_var(--rule)] last:[border-bottom:0]">
      {timeline && <TimelineRail {...timeline} />}
      <span className="flex items-center justify-center w-10 h-10 min-w-10 sm:w-13 sm:h-13 sm:min-w-13 border-2 border-ink bg-logo-tile">
        <Image
          className="w-full h-full object-contain p-1"
          width={48}
          height={48}
          src={entry.organization.logo}
          alt={entry.organization.name}
        />
      </span>
      <div className="min-w-0 flex flex-col gap-1.5">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[.12em] text-ink-muted">
          {entry.date}
        </div>
        <div className="text-base font-medium leading-[1.35] text-ink">
          <a
            href={entry.organization.link}
            className="font-extrabold text-ink border-b-2 border-accent"
          >
            {entry.organization.name}
          </a>{" "}
          — {entry.detail}
        </div>
        {entry.scope && (
          <span className="meta self-start bg-surface-2 text-ink px-2 py-1">
            {entry.scope}
          </span>
        )}
        {entry.outcome && (
          <p className="text-sm font-medium leading-normal text-ink-body max-w-[68ch]">
            {entry.outcome}
          </p>
        )}
        {isOpen && (
          <div className="text-sm leading-normal text-ink-body border-2 border-ink bg-surface-2 p-3">
            <NotionRichText richText={entry.description} />
          </div>
        )}
        <button className={smallButtonClassName} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "close" : "see more →"}
        </button>
      </div>
    </div>
  );
};

export const HistorySection = ({
  id,
  title,
  entries,
}: {
  id: string;
  title: string;
  entries: HistoryEntry[];
}) => (
  <Section id={id} title={title}>
    {entries?.map((entry, index) => (
      <HistoryRow
        key={entry.id}
        entry={entry}
        // a single entry is a point, not a timeline
        timeline={
          entries.length > 1
            ? { isFirst: index === 0, isLast: index === entries.length - 1 }
            : undefined
        }
      />
    ))}
  </Section>
);
