import React from "react";
import {
  ContactInfo,
  Education,
  Job,
  Language,
  Organization,
  PortfolioItem,
  Skill,
  fetchContactInfo,
  fetchEducationHistory,
  fetchJobHistory,
  fetchLanguages,
  fetchOrganizations,
  fetchPortfolioContent,
  fetchSkills,
} from "./notion-data";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { LanguagesSection, SkillsSection } from "@/components/SkillsSection";
import { JobsHistory } from "@/components/JobsHistory";
import { EducationHistory } from "@/components/EducationHistory";
import { Portfolio } from "@/components/Portfolio";
import { ContactSection } from "@/components/ContactSection";
import { parse } from "date-fns";

interface Props {
  organizationsDataHash: { [key: string]: Organization };
  jobsData: Job[];
  educationHistoryData: Education[];
  skillsData: Skill[];
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
    languagesData,
    portfolioData,
    contactInfoData,
  ] = await Promise.all([
    fetchOrganizations(),
    fetchJobHistory(),
    fetchEducationHistory(),
    fetchSkills(),
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

  skillsData.sort((a, b) => {
    return b.percentage - a.percentage;
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

const LandingPage = async () => {
  const {
    organizationsDataHash,
    jobsData,
    educationHistoryData,
    skillsData,
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
        <Hero meta={getHeroMeta(jobsData, organizationsDataHash)} />
        <SkillsSection skills={skillsData} />
        <JobsHistory
          jobsData={jobsData}
          organizationsDataHash={organizationsDataHash}
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
