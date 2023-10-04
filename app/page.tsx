import Image from "next/image";
import React from "react";
import * as BrandIcons from "react-icons/fa";
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
import { JobsHistory } from "@/components/JobsHistory";
import { EducationHistory } from "@/components/EducationHistory";
import { Portfolio } from "@/components/Portfolio";
import { ContactForm } from "@/components/ContactForm";
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

  console.log(process.env.RECAPTCHA_SITE_KEY)
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

const DynamicBrandedIcon = ({
  name,
  ...props
}: {
  name: keyof typeof BrandIcons;
}) => {
  const IconComponent = BrandIcons[name];

  if (!IconComponent) {
    // Return a default one
    return <BrandIcons.FaBeer {...props} />;
  }

  return <IconComponent {...props} />;
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
    <NavBar>
      {/* Hero section */}
      <section
        id="hero"
        className="bg-gradient-to-r from-red-500 to-yellow-500 text-white"
      >
        <div className="container mx-auto md:w-2/3 px-2 md:max-h-800 pt-28">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-full lg:w-1/2 lg:order-last">
              <h1 className="text-5xl pl-4 text-center lg:text-start">
                Hi, I&apos;m <span className="font-bold">Hugo&nbsp;Bessa</span>
              </h1>
              <p className="text-2xl pl-4 mt-4 text-center lg:text-start">
                Expert in building MVPs and scaling&nbsp;them. <br />
                Amateur composer/producer in the free&nbsp;time.
              </p>
            </div>
            <div className="w-full lg:w-1/2 lg:order-first text-center lg:text-start">
              <Image
                src="/imgs/my-pic.png"
                width={400}
                height={386}
                alt="Man"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Work section */}
      <section id="work" className="md:py-16 py-8 bg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container lg:w-2/3 mx-auto ">
          <div className="grid gap-4 auto-rows-min">
            {/* Skills medium screen and larger section */}
            <div
              id="skills"
              className="md:hidden block md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800"
            >
              <div className="px-2">
                <h2 className="text-3xl font-semibold mb-8">Skills</h2>
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillsData?.map((skill) => {
                    const circumference = 30 * 2 * Math.PI;
                    return (
                      <div key={skill.id}>
                        <div className="relative w-20 h-20 mx-auto">
                          {/* Add circular gauge for skill percentage */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"> {skill.percentage}% </div>
                          <svg className="w-20 h-20">
                            <circle
                              className="text-gray-300"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="transparent"
                              r="30"
                              cx="40"
                              cy="40"
                            />
                            <circle
                              className="text-orange-500"
                              strokeWidth="5"
                              strokeDasharray={circumference}
                              strokeDashoffset={
                                circumference -
                                (skill.percentage / 100) * circumference
                              }
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="30"
                              cx="40"
                              cy="40"
                            />
                          </svg>
                        </div>
                        <p className="mt-2 text-center">{skill.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Job history section */}
            <JobsHistory jobsData={jobsData} organizationsDataHash={organizationsDataHash} />

            {/* Education section */}
            <EducationHistory educationHistoryData={educationHistoryData} organizationsDataHash={organizationsDataHash} />
          </div>
          <div className="grid gap-4 auto-rows-min">
            {/* Skills small screen and smaller section */}
            <div
              id="skills"
              className="md:block hidden md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800"
            >
              <div className="px-2">
                <h2 className="text-3xl font-semibold mb-8">Skills</h2>
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillsData?.map((skill) => {
                    const circumference = 30 * 2 * Math.PI;
                    return (
                      <div key={skill.id}>
                        <div className="relative w-20 h-20 mx-auto">
                          {/* Add circular gauge for skill percentage */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"> {skill.percentage}% </div>
                          <svg className="w-20 h-20">
                            <circle
                              className="text-gray-300"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="transparent"
                              r="30"
                              cx="40"
                              cy="40"
                            />
                            <circle
                              className="text-orange-600"
                              strokeWidth="5"
                              strokeDasharray={circumference}
                              strokeDashoffset={
                                circumference -
                                (skill.percentage / 100) * circumference
                              }
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="30"
                              cx="40"
                              cy="40"
                            />
                          </svg>
                        </div>
                        <p className="mb-2 text-center">{skill.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Languages section */}
            <div
              id="skills"
              className="md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800"
            >
              <div className="px-2">
                <h2 className="text-3xl font-semibold mb-8">Languages</h2>
                <div className="">
                  {languagesData?.map((language) => (
                    <div key={language.id}>
                      <p className="mt-2">
                        <span className="font-semibold text-orange-500">
                          {language.name}
                        </span>{" "}
                        {language.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section id="content" className="py-12 bg-orange-200 relative">
        <div
          className="absolute w-full h-full opacity-70 top-0 bg-left-top"
          style={{
            backgroundImage: `url("/imgs/portfolio-bg.jpg")`,
            backgroundSize: 'contain',
            filter: `blur(30px)`,
          }}
        />
        <Portfolio portfolioData={portfolioData} tags={tags} />
      </section>

      {/* Contact section */}
      <section id="contact" className="mb-20">
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white h-2 mb-12"></div>
        <div className="lg:w-2/3 md:mx-auto mx-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Send me a message
          </h2>
          <div className="md:flex">
            <div className="md:p-5 md:w-1/2 w-full flex md:justify-auto justify-center mb-12 ">
              <ul className="md:block flex gap-4">
                {contactInfoData?.map((contact) => (
                  <li key={contact.id} className="flex mb-3">
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className="inline-flex items-center"
                        target={
                          !contact.link.startsWith("mailto:")
                            ? "blank"
                            : undefined
                        }
                      >
                        <span className="md:inline-block text-orange-500 mr-2 p-1">
                          <DynamicBrandedIcon name={contact.icon} />{" "}
                        </span>
                        <span className="md:inline hidden">{contact.text}</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center">
                        <span className="md:inline-block text-orange-500 mr-2 p-1">
                          <DynamicBrandedIcon name={contact.icon} />
                        </span>
                        <span className="md:inline hidden">{contact.text}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-2 md:w-1/2 w-full">
              <ContactForm NODE_ENV={NODE_ENV} RECAPTCHA_SITE_KEY={RECAPTCHA_SITE_KEY} />
            </div>
          </div>
        </div>
      </section>
    </NavBar>
  );
};

export default LandingPage;
