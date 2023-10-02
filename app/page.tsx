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
    const dateA = parse(a.date.split('-')[0].trim(), 'LLL y', 0);
    const dateB = parse(b.date.split('-')[0].trim(), 'LLL y', 0);
    if (dateA > dateB) {
      return -1
    }
    if (dateA === dateB) {
      return 0
    }
    return 1
  })

  educationHistoryData.sort((a, b) => {
    const dateA = parse(a.date.split('-')[0].trim(), 'MMM y', 0);
    const dateB = parse(b.date.split('-')[0].trim(), 'MMM y', 0);
    if (dateA > dateB) {
      return -1
    }
    if (dateA === dateB) {
      return 0
    }
    return 1
  })
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
    tags: [
      ...Array.from(
        new Set(portfolioData?.map((item: PortfolioItem) => item.tags).flat())
      ),
    ],
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
            <div className="w-full md:w-1/2 md:order-last">
              <h1 className="text-5xl pl-4 text-center md:text-start">
                Hi, I&apos;m <span className="font-bold">Hugo&nbsp;Bessa</span>
              </h1>
              <p className="text-2xl pl-4 mt-4 text-center md:text-start">
                Expert in building MVPs and scaling&nbsp;them. <br />
                Amateur composer/producer in the free&nbsp;time
              </p>
            </div>
            <div className="w-full md:w-1/2 md:order-first">
              <Image
                className="md:float-right md:mr-20"
                src="/imgs/my-pic.png"
                width={400}
                height={600}
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
                        <div className="w-20 h-20 mx-auto">
                          {/* Add circular gauge for skill percentage */}
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
                              stroke-dashoffset={
                                circumference -
                                (skill.percentage / 100) * circumference
                              }
                              stroke-linecap="round"
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
                        <div className="w-20 h-20 mx-auto">
                          {/* Add circular gauge for skill percentage */}
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
                              stroke-dashoffset={
                                circumference -
                                (skill.percentage / 100) * circumference
                              }
                              stroke-linecap="round"
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
          className="absolute w-full h-full opacity-5 top-0 bg-left-top"
          style={{
            backgroundImage: `url("/imgs/chevron-pattern.svg")`,
            backgroundSize: "300px 300px",
          }}
        />
        <Portfolio portfolioData={portfolioData} tags={tags} />
      </section>

      {/* Contact section */}
      <section id="contact">
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
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </NavBar>
  );
};

export default LandingPage;
