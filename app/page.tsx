import React from "react";
import {
  Capability,
  ContactInfo,
  Education,
  Job,
  Language,
  Leadership,
  Organization,
  PortfolioItem,
  Skill,
  Stat,
  fetchCapabilities,
  fetchContactInfo,
  fetchEducationHistory,
  fetchJobHistory,
  fetchLanguages,
  fetchLeadership,
  fetchOrganizations,
  fetchPortfolioContent,
  fetchSkills,
  fetchStats,
} from "./notion-data";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { ScopeSection, ScopeStat } from "@/components/ScopeSection";
import {
  HowILeadSection,
  LeadershipPrinciple,
} from "@/components/HowILeadSection";
import {
  CapabilityGroup,
  LanguagesSection,
  SkillsSection,
} from "@/components/SkillsSection";
import { JobsHistory } from "@/components/JobsHistory";
import { EducationHistory } from "@/components/EducationHistory";
import { Portfolio } from "@/components/Portfolio";
import { contentFormat } from "@/components/contentFormat";
import { ContactSection } from "@/components/ContactSection";
import {
  CAPABILITY_GROUPS,
  HERO_HIGHLIGHT,
  LEADERSHIP_PRINCIPLES,
  SCOPE_STATS,
} from "./positioning";
import { parse } from "date-fns";

interface Props {
  organizationsDataHash: { [key: string]: Organization };
  jobsData: Job[];
  educationHistoryData: Education[];
  skillsData: Skill[];
  statsData: Stat[];
  leadershipData: Leadership[];
  capabilitiesData: Capability[];
  languagesData: Language[];
  portfolioData: PortfolioItem[];
  contactInfoData: ContactInfo[];
  tags: string[];
  RECAPTCHA_SITE_KEY: string;
  NODE_ENV: string;
}

const parseStartDate = (date?: string) => {
  if (!date) {
    return null;
  }
  const parsed = parse(date.split("-")[0].trim(), "LLL y", new Date());
  return isNaN(parsed.getTime()) ? null : parsed;
};

const getNotionData = async (): Promise<Props> => {
  const [
    organizationsData,
    jobsData,
    educationHistoryData,
    skillsData,
    statsData,
    leadershipData,
    capabilitiesData,
    languagesData,
    portfolioData,
    contactInfoData,
  ] = await Promise.all([
    fetchOrganizations(),
    fetchJobHistory(),
    fetchEducationHistory(),
    fetchSkills(),
    fetchStats(),
    fetchLeadership(),
    fetchCapabilities(),
    fetchLanguages(),
    fetchPortfolioContent(),
    fetchContactInfo(),
  ]);

  jobsData.sort((a, b) => {
    const dateA = a.date ? parse(a.date.split('-')[0].trim(), 'LLL y', 0) : null;
    const dateB = b.date ? parse(b.date.split('-')[0].trim(), 'LLL y', 0) : null;
    if (dateA && dateB && dateA > dateB) {
      return -1
    }
    if (dateA === dateB) {
      return 0
    }
    return 1
  })

  educationHistoryData.sort((a, b) => {
    const dateA = a.date ? parse(a.date.split('-')[0].trim(), 'LLL y', 0) : null;
    const dateB = b.date ? parse(b.date.split('-')[0].trim(), 'LLL y', 0) : null;
    if (dateA && dateB && dateA > dateB) {
      return -1
    }
    if (dateA === dateB) {
      return 0
    }
    return 1
  })

  languagesData.sort((a, b) => {
    return a.order - b.order;
  });

  // `Order` is the authored sequence, so the toolbelt reads the way it was
  // written rather than alphabetically. Rows without one fall to the back, in
  // the percentage order the DB used before that column existed.
  skillsData.sort((a, b) => {
    return (a.order ?? Infinity) - (b.order ?? Infinity) ||
      b.percentage - a.percentage;
  });

  capabilitiesData.sort((a, b) => {
    return (a.order ?? Infinity) - (b.order ?? Infinity);
  });

  statsData.sort((a, b) => {
    return (a.order ?? Infinity) - (b.order ?? Infinity);
  });

  leadershipData.sort((a, b) => {
    return (a.order ?? Infinity) - (b.order ?? Infinity);
  });

  const tags = [
    ...Array.from(
      new Set(portfolioData?.map((item: PortfolioItem) => item.tags).flat())
    ),
  ];
  tags.sort();

  return {
    organizationsDataHash: organizationsData?.reduce<{
      [key: string]: Organization;
    }>(
      (prev, item): { [key: string]: Organization } => ({
        ...prev,
        [item.id]: item,
      }),
      {}
    ),
    jobsData,
    educationHistoryData,
    skillsData,
    statsData,
    leadershipData,
    capabilitiesData,
    languagesData,
    portfolioData,
    contactInfoData,
    tags,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY as string,
    NODE_ENV: process.env.NODE_ENV as string,
  };
}

/** The hero's dotted meta row, derived from the job history. */
const getHeroMeta = (
  jobsData: Job[],
  organizationsDataHash: { [key: string]: Organization }
) => {
  const currentJob = jobsData?.[0];
  const currentOrganization = currentJob
    ? organizationsDataHash[currentJob.organizationId]
    : undefined;

  const startYears = (jobsData ?? [])
    .map((job) => parseStartDate(job.date))
    .filter((date): date is Date => date !== null)
    .map((date) => date.getFullYear());
  const yearsShipping = startYears.length
    ? new Date().getFullYear() - Math.min(...startYears)
    : null;

  return [
    currentJob && currentOrganization
      ? `${currentJob.title} @ ${currentOrganization.name}`
      : null,
    "recife, br",
    yearsShipping ? `${yearsShipping} yrs shipping` : null,
  ].filter((item): item is string => !!item);
};

/**
 * The scope cells, in the `Order` sequence the caller sorted on. As with the
 * capability columns below, the repo's own copy stands in only when the DB gives
 * nothing back — see ./positioning.
 */
const getScopeStats = (statsData: Stat[]): ScopeStat[] =>
  statsData?.length > 0
    ? statsData.map(({ name, value, description }) => ({
        value,
        label: name,
        note: description,
      }))
    : SCOPE_STATS;

/**
 * The leadership principles, in the `Order` sequence the caller sorted on, each
 * resolving its `Portfolio Content` relation against the content already
 * fetched for the portfolio band — the artifact is a content item, not a second
 * copy of one, so it costs no extra request.
 *
 * A principle links its first related item. Nothing linked renders the claim
 * without a proof row.
 */
const getLeadershipPrinciples = (
  leadershipData: Leadership[],
  portfolioData: PortfolioItem[]
): LeadershipPrinciple[] => {
  if (!leadershipData?.length) {
    return LEADERSHIP_PRINCIPLES;
  }

  const contentById = new Map(
    (portfolioData ?? []).map((item) => [item.id, item])
  );

  return leadershipData.map(({ name, description, portfolioContentIds }) => {
    const [artifactId] = portfolioContentIds;
    const artifact = artifactId ? contentById.get(artifactId) : undefined;
    // the content DB has no `Kind` column, so the format comes off the item's
    // own tags — see components/contentFormat
    const format = artifact && contentFormat(artifact);

    return {
      title: name,
      body: description,
      proof: artifact?.link
        ? {
            label: format ? `${format} — ${artifact.title}` : artifact.title,
            href: artifact.link,
          }
        : undefined,
    };
  });
};

/**
 * The capability columns, in the `Order` sequence the caller sorted on. The
 * repo's own copy stands in only when the DB gives nothing back — see
 * ./positioning.
 */
const getCapabilityGroups = (
  capabilitiesData: Capability[]
): CapabilityGroup[] =>
  capabilitiesData?.length > 0
    ? capabilitiesData.map(({ name, items }) => ({ label: name, items }))
    : CAPABILITY_GROUPS;

const LandingPage = async () => {
  const {
    organizationsDataHash,
    jobsData,
    educationHistoryData,
    skillsData,
    statsData,
    leadershipData,
    capabilitiesData,
    languagesData,
    portfolioData,
    contactInfoData,
    tags,
    RECAPTCHA_SITE_KEY,
    NODE_ENV,
  } = await getNotionData();


  return (
    <main className="px-5 pt-7 pb-14">
      <div className="max-w-[1180px] w-full mx-auto bg-surface border-2 border-frame shadow-card">
        <NavBar />
        <Hero
          meta={getHeroMeta(jobsData, organizationsDataHash)}
          highlight={HERO_HIGHLIGHT}
        />
        <ScopeSection stats={getScopeStats(statsData)} />
        <HowILeadSection
          principles={getLeadershipPrinciples(leadershipData, portfolioData)}
        />
        <JobsHistory
          jobsData={jobsData}
          organizationsDataHash={organizationsDataHash}
        />
        <SkillsSection
          groups={getCapabilityGroups(capabilitiesData)}
          toolbelt={(skillsData ?? []).map((skill) => skill.name)}
        />
        <EducationHistory
          educationHistoryData={educationHistoryData}
          organizationsDataHash={organizationsDataHash}
        />
        <LanguagesSection languages={languagesData} />
        <Portfolio portfolioData={portfolioData} tags={tags} />
        <ContactSection
          contactInfoData={contactInfoData}
          NODE_ENV={NODE_ENV}
          RECAPTCHA_SITE_KEY={RECAPTCHA_SITE_KEY}
        />
      </div>
    </main>
  );
};

export default LandingPage;
