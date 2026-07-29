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

/** Marker offset from the top of the block it belongs to — its heading line. */
const MARKER_TOP = "top-[22px]";

/**
 * Pulls a role's marker back out of the content column and onto the rail: the
 * columns between the two are the rail itself (w-3), the logo tile (w-10, w-13
 * from `sm`) and the two gap-4 gutters, and half the rail lands on its centre.
 * Paired with `-translate-x-1/2`, as the rail's own markers are.
 */
const ROLE_MARKER_X = "-left-[78px] sm:-left-[90px] -translate-x-1/2";

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
    <span
      className={`absolute left-1/2 -translate-x-1/2 ${MARKER_TOP} w-2 h-2 bg-ink`}
    />
  </div>
);

/** Read from the first three letters, so both "Mar" and "March" land. */
const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

const OPEN_ENDED = /^(present|current|now|today)$/i;

/**
 * A date endpoint as a sortable month index, or `null` when it can't be read —
 * the dates are free text in Notion, so anything unparseable has to degrade
 * rather than sort wrong.
 */
const parseEndpoint = (text: string): number | null => {
  const trimmed = text.trim();
  if (OPEN_ENDED.test(trimmed)) return Number.POSITIVE_INFINITY;

  const year = trimmed.match(/\b(?:19|20)\d{2}\b/);
  if (!year) return null;

  const month = MONTHS.findIndex((name) =>
    trimmed.toLowerCase().includes(name)
  );
  return Number(year[0]) * 12 + (month === -1 ? 0 : month);
};

/** "Mar 2021 - Present" → its two endpoints; a lone date is both of them. */
const splitRange = (date: string): [string, string] => {
  const [start, end] = (date ?? "").split(/\s*[–—-]\s*|\s+to\s+/i);
  return [(start ?? "").trim(), (end ?? start ?? "").trim()];
};

/**
 * The outer bounds of a group's roles — "Jun 2018 — Present" for a stack of
 * promotions. Undefined when any endpoint is unreadable, in which case the
 * group header drops the line and each role keeps showing its own dates.
 */
const spanOf = (entries: HistoryEntry[]): string | undefined => {
  if (entries.length === 1) return entries[0].date;

  let earliest: { value: number; text: string } | undefined;
  let latest: { value: number; text: string } | undefined;

  for (const entry of entries) {
    const [startText, endText] = splitRange(entry.date);
    const start = parseEndpoint(startText);
    const end = parseEndpoint(endText);
    if (start === null || end === null) return undefined;

    if (!earliest || start < earliest.value) {
      earliest = { value: start, text: startText };
    }
    if (!latest || end > latest.value) {
      latest = { value: end, text: endText };
    }
  }

  return `${earliest!.text} — ${latest!.text}`;
};

/** Consecutive entries at the same organization, rendered under one logo. */
interface HistoryGroup {
  organization: Organization;
  entries: HistoryEntry[];
}

/**
 * Runs of consecutive same-organization entries. Only *consecutive* ones merge:
 * leaving a company and coming back years later stays two stops on the
 * timeline, which is what the dates would otherwise contradict.
 */
const groupByOrganization = (entries: HistoryEntry[]): HistoryGroup[] =>
  entries.reduce<HistoryGroup[]>((groups, entry) => {
    const current = groups[groups.length - 1];
    if (current && current.organization.id === entry.organization.id) {
      current.entries.push(entry);
    } else {
      groups.push({ organization: entry.organization, entries: [entry] });
    }
    return groups;
  }, []);

/**
 * One role inside a group. `showDate` is false for a lone role, whose dates are
 * already the group's span — repeating them a line apart reads as an error.
 * `marker` puts a small square on the rail beside the role, so a stack of
 * promotions still reads as several points in time under the company's one.
 */
const HistoryRole = ({
  entry,
  showDate,
  marker,
  isSubsequent,
}: {
  entry: HistoryEntry;
  showDate: boolean;
  marker: boolean;
  isSubsequent: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative flex flex-col gap-1.5 ${
        isSubsequent ? "mt-3 pt-3 [border-top:2px_dotted_var(--rule)]" : ""
      }`}
    >
      {marker && (
        <span
          className={`absolute ${ROLE_MARKER_X} w-1.5 h-1.5 bg-ink ${
            // roles after the first carry the separator's pt-3, which pushes
            // the line the marker sits against 12px further down
            isSubsequent ? "top-[34px]" : MARKER_TOP
          }`}
          aria-hidden
        />
      )}
      {showDate && (
        <div className="font-mono text-[11px] uppercase tracking-[.12em] text-ink-muted">
          {entry.date}
        </div>
      )}
      <div className="text-base font-medium leading-[1.35] text-ink">
        {entry.detail}
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
  );
};

const HistoryGroupRow = ({
  group,
  timeline,
}: {
  group: HistoryGroup;
  timeline?: { isFirst: boolean; isLast: boolean };
}) => {
  const span = spanOf(group.entries);
  const hasManyRoles = group.entries.length > 1;

  return (
    <div className="flex items-start gap-4 px-5 sm:px-6 py-[18px] [border-bottom:2px_dotted_var(--rule)] last:[border-bottom:0]">
      {timeline && <TimelineRail {...timeline} />}
      <span className="flex items-center justify-center w-10 h-10 min-w-10 sm:w-13 sm:h-13 sm:min-w-13 border-2 border-ink bg-logo-tile">
        <Image
          className="w-full h-full object-contain p-1"
          width={48}
          height={48}
          src={group.organization.logo}
          alt={group.organization.name}
        />
      </span>
      <div className="min-w-0 flex flex-col gap-1.5">
        {span && (
          <div className="font-mono text-[11px] font-bold uppercase tracking-[.12em] text-ink-muted">
            {span}
          </div>
        )}
        <div className="text-base leading-[1.35]">
          <a
            href={group.organization.link}
            className="font-extrabold text-ink border-b-2 border-accent"
          >
            {group.organization.name}
          </a>
        </div>
        <div className="flex flex-col">
          {group.entries.map((entry, index) => (
            <HistoryRole
              key={entry.id}
              entry={entry}
              showDate={hasManyRoles || !span}
              // a lone role is the group's one point on the rail already
              marker={Boolean(timeline) && hasManyRoles}
              isSubsequent={index > 0}
            />
          ))}
        </div>
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
}) => {
  const groups = groupByOrganization(entries ?? []);

  return (
    <Section id={id} title={title}>
      {groups.map((group, index) => (
        <HistoryGroupRow
          key={group.entries[0].id}
          group={group}
          // a single stop is a point, not a timeline
          timeline={
            groups.length > 1
              ? { isFirst: index === 0, isLast: index === groups.length - 1 }
              : undefined
          }
        />
      ))}
    </Section>
  );
};
