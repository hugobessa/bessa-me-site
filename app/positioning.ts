/**
 * Positioning copy specified by docs/design_handoff_em_positioning that no
 * Notion column carries yet.
 *
 * The scope cells, leadership principles and capability columns here are
 * *fallbacks*: their Notion DBs take over the moment one returns a row, so these
 * only show when NOTION_STATS_DB_ID / NOTION_LEADERSHIP_DB_ID /
 * NOTION_CAPABILITIES_DB_ID are unset. The toolbelt line is not here at all — it
 * comes from the Skills DB.
 */

import type { LeadershipPrinciple } from "@/components/HowILeadSection";
import type { ScopeStat } from "@/components/ScopeSection";
import type { CapabilityGroup } from "@/components/SkillsSection";

/** The one hero meta item that isn't a fact about where he is. */
export const HERO_HIGHLIGHT = "6 yrs leading";

/** Used while the Stats DB is unreachable. */
export const SCOPE_STATS: ScopeStat[] = [
  { value: "12", label: "engineers led", note: "peak org size" },
  { value: "3", label: "teams at once", note: "parallel delivery" },
  { value: "6", label: "yrs leading", note: "PM → TL → EM" },
  { value: "24", label: "published", note: "talks · posts · open source" },
];

/** Used while the Leadership DB is unreachable. */
export const LEADERSHIP_PRINCIPLES: LeadershipPrinciple[] = [
  {
    title: "Write it down or it didn't happen",
    body: "Decisions live in ADRs, not in the head of whoever was on the call. Teams that write things down ship faster the second time.",
    proof: {
      label:
        "Talk — Don't rely on memory: knowledge management for engineering teams",
      href: "https://www.vinta.com.br/blog/dont-rely-on-memory-knowledge-management-for-engineering-teams",
    },
  },
  {
    title: "Debt is a decision, not an accident",
    body: "I make the trade explicit, price it, and put it on the roadmap. Refactors get negotiated with the business, never smuggled past it.",
    proof: {
      label: "Writing — Tech Debt Tango: dancing through bad code and refactors",
      href: "https://www.vintasoftware.com/blog/technical-debt",
    },
  },
  {
    title: "Fix the environment before the people",
    body: 'Most "performance problems" are a broken dev loop. I tune the system the team works inside first, then measure what changed.',
    proof: {
      label:
        "Writing — Development Environment: the key to your team's potential",
      href: "https://www.vinta.com.br/blog/development-environment-boosting-your-team-potential",
    },
  },
  {
    title: "Ship reversibly",
    body: "Flags, small batches, and a rollback everyone trusts. Cheap reversal is what lets a team move fast without asking permission.",
    proof: {
      label: "Talk — Taming Irreversibility with Feature Flags, PyGotham",
      href: "https://www.vinta.com.br/blog/taming-irreversibility-feature-flags-python",
    },
  },
];

/** Used while the Capabilities DB is unreachable. */
export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    label: "Leading people",
    items: [
      "1:1s & growth plans",
      "hiring & onboarding",
      "performance conversations",
      "mentoring on ADPList",
    ],
  },
  {
    label: "Running delivery",
    items: [
      "multi-team planning",
      "scope negotiation",
      "estimation & commitments",
      "incident response",
    ],
  },
  {
    label: "Shaping systems",
    items: [
      "architecture review",
      "tech-debt strategy",
      "platform & DX",
      "AI-assisted workflows",
    ],
  },
  {
    label: "Working with business",
    items: [
      "stakeholder comms",
      "client & exec reporting",
      "product trade-offs",
      "discovery",
    ],
  },
];
