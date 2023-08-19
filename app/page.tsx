'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import * as BrandIcons from "react-icons/fa";


interface PortfolioItem {
  title: string
  link?: string 
  tags: string[]
  image?: string
  embed?: string
}

interface Organization {
  name: string
  logo: string
  link: string
}

interface Job {
  title: string
  company: Organization
  date: string
  description: string
}

interface Education {
  course: string
  institution: Organization
  date: string
  description: string
}

interface Skill {
  name: string
  percentage: number
}

interface Language {
  name: string
  level: string
}

interface ContactInfo {
  icon: keyof typeof BrandIcons
  text: string
  link?: string
}

const jobsData: Job[] = [
  {
    title: 'Job Title 1',
    company: {
      name: 'Company A',
      logo: '/path/to/companyA-logo.png',
      link: 'https://vinta.com.br',
    },
    date: 'Jan 2019 - Dec 2020',
    description: 'Job description for Company A...',
  },
  {
    title: 'Job Title 1',
    company: {
      name: 'Company A',
      logo: '/path/to/companyA-logo.png',
      link: 'https://vinta.com.br',
    },
    date: 'Jan 2019 - Dec 2020',
    description: 'Job description for Company A...',
  },
  {
    title: 'Job Title 1',
    company: {
      name: 'Company A',
      logo: '/path/to/companyA-logo.png',
      link: 'https://vinta.com.br',
    },
    date: 'Jan 2019 - Dec 2020',
    description: 'Job description for Company A...',
  },
  {
    title: 'Job Title 1',
    company: {
      name: 'Company A',
      logo: '/path/to/companyA-logo.png',
      link: 'https://vinta.com.br',
    },
    date: 'Jan 2019 - Dec 2020',
    description: 'Job description for Company A...',
  },
  {
    title: 'Job Title 1',
    company: {
      name: 'Company A',
      logo: '/path/to/companyA-logo.png',
      link: 'https://vinta.com.br',
    },
    date: 'Jan 2019 - Dec 2020',
    description: 'Job description for Company A...',
  },
  {
    title: 'Job Title 1',
    company: {
      name: 'Company A',
      logo: '/path/to/companyA-logo.png',
      link: 'https://vinta.com.br',
    },
    date: 'Jan 2019 - Dec 2020',
    description: 'Job description for Company A...',
  },
  // Add more job data objects as needed
];

const educationData: Education[] = [
  {
    course: 'Course 1',
    institution: {
      name: 'Institution A',
      logo: '/path/to/institutionA-logo.png',
      link: 'https://vinta.com.br',
    },
    date: 'Jan 2015 - Dec 2018',
    description: 'Course description for Institution A...',
  },
  {
    course: 'Course 2',
    institution: {
      name: 'Institution A',
      logo: '/path/to/institutionA-logo.png',
      link: 'https://vinta.com.br',
    },
    date: 'Jan 2015 - Dec 2018',
    description: 'Course description for Institution A...',
  },
  {
    course: 'Course 3',
    institution: {
      name: 'Institution A',
      logo: '/path/to/institutionA-logo.png',
      link: 'https://vinta.com.br',
    },
    date: 'Jan 2015 - Dec 2018',
    description: 'Course description for Institution A...',
  },
  // Add more education data objects as needed
];

const skillsData: Skill[] = [
  {
    name: 'Skill 1',
    percentage: 80,
  },
  // Add more skill data objects as needed
];

const languagesData: Language[] = [
  {name: "Portuguese", level: "Native"},
  {name: "English",  level: "Fluent. I speak and write daily."},
  {name: "Spanish", level: "Basic. I can listen and read, but have difficulty in speaking and writing."}
];

const contentData: PortfolioItem[] = [
  {
    title: 'Link 1',
    link: "https://google.com",
    tags: ['tag1', 'tag2'],
    image: '/path/to/link1-image.png',
  },
  {
    title: 'Link 2',
    tags: ['tag1'],
    embed: `
    <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1523378608&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/bessahugo" title="bessahugo" target="_blank" style="color: #cccccc; text-decoration: none;">bessahugo</a> · <a href="https://soundcloud.com/bessahugo/antes-de-viajar" title="Antes de viajar" target="_blank" style="color: #cccccc; text-decoration: none;">Antes de viajar</a></div>
    `
  },
  {
    title: 'Link 3',
    link: "https://google.com",
    tags: ['tag3'],
    image: '/path/to/link1-image.png',
  },
  {
    title: 'Link 1',
    link: "https://google.com",
    tags: ['tag1', 'tag2'],
    image: '/path/to/link1-image.png',
  },
  {
    title: 'Link 2',
    tags: ['tag1'],
    embed: `
    <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1523378608&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/bessahugo" title="bessahugo" target="_blank" style="color: #cccccc; text-decoration: none;">bessahugo</a> · <a href="https://soundcloud.com/bessahugo/antes-de-viajar" title="Antes de viajar" target="_blank" style="color: #cccccc; text-decoration: none;">Antes de viajar</a></div>
    `
  },
  {
    title: 'Link 3',
    link: "https://google.com",
    tags: ['tag3'],
    image: '/path/to/link1-image.png',
  },
  // Add more content data objects as needed
];

const contactInfoData: ContactInfo[] = [
  {
    icon: 'FaEnvelope',
    text: 'hugo@bessa.me',
    link: 'mailto:hugo@bessa.me'
  },
  {
    icon: 'FaGithub',
    text: '@hugobessa',
    link: 'https://github.com/hugobessa'
  },
  {
    icon: 'FaLinkedin',
    text: '/bessahugo',
    link: 'https://www.linkedin.com/in/bessahugo/'
  },
  {
    icon: 'FaTwitter',
    text: '@hugoabessa',
    link: 'https://x.com/hugoabessa'
  },
  {
    icon: 'FaInstagram',
    text: '@hugoabessa',
    link: 'https://instagram.com/hugoabessa'
  },
]

const tags = [...Array.from(new Set(contentData.map((item) => item.tags).flat()))];

const DynamicBrandedIcon = ({ name, ...props }: {name: keyof typeof BrandIcons}) =>  {
  const IconComponent = BrandIcons[name];

  if (!IconComponent) { // Return a default one
    return <BrandIcons.FaBeer {...props} />;
  }

  return <IconComponent {...props} />;
};

const ContentCardWrapper = ({ isLink, children, className, ...props }: {isLink: boolean, children: React.ReactNode, className: string} ) => {
  if (isLink) {
    return <a className={`block ${className}`} {...props}>{children}</a>
  } else {
    return <div className={className} {...props}>{children}</div>
  }
}

const ContentCard = ({ item }: {item: PortfolioItem}) => (
  <ContentCardWrapper isLink={!!item.link} className="self-start rounded overflow-hidden shadow-lg dark:bg-gray-800 mb-4 last:mb-0 bg-white">
    {item.image && <img className="w-full" src={item.image} />}
    {item.embed && <div className="w-full" dangerouslySetInnerHTML={{__html: item.embed}} />}
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{item.title}</div>
    </div>
    <div className="px-6 pt-4 pb-2">
      {item.tags.map((tag: string) => (
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {tag}
        </span>
      ))}
    </div> 
  </ContentCardWrapper>
)

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [openedJobHistoryItems, setOpenedJobHistoryItems] = useState(jobsData.map(() => false));
  const [openedEducationHistoryItems, setOpenedEducationHistoryItems] = useState(jobsData.map(() => false));

  const filteredContent = contentData.filter((item) => {
    const hasText = !searchText || item.title.includes(searchText);
    const hasTags = selectedTags.length === 0 || selectedTags.some((tag: string) => item.tags.map(s => s.toLowerCase()).includes(tag.toLowerCase()));
    return hasText && hasTags;
  })

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSearchText('');
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission and POST request to the endpoint
    // using the form data
  };

  const handleOpenJobHistoryItem = (jobHistoryIndex: number) => {
    setOpenedJobHistoryItems(openedJobHistoryItems.map((jhiStatus, i) => (jhiStatus || i === jobHistoryIndex)));
  };
  const handleCloseJobHistoryItem = (jobHistoryIndex: number) => {
    setOpenedJobHistoryItems(openedJobHistoryItems.map((jhiStatus, i) => (jhiStatus && i !== jobHistoryIndex)));
  };

  const handleOpenEducationItem = (educationHistoryIndex: number) => {
    setOpenedEducationHistoryItems(openedEducationHistoryItems.map((ehiStatus, i) => (ehiStatus || i === educationHistoryIndex)));
  };
  const handleCloseEducationItem = (educationHistoryIndex: number) => {
    setOpenedEducationHistoryItems(openedEducationHistoryItems.map((ehiStatus, i) => (ehiStatus && i !== educationHistoryIndex)));
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-red-500 to-yellow-500 fixed w-full top-0 z-10">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-between sm:items-stretch">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-white text-lg font-semibold">
                  <a href="#hero">Hugo Bessa</a>
                </span>
              </div>
              <div className="hidden sm:block sm:ml-6 float-right">
                <div className="flex space-x-4">
                  {/* Add links to sections */}
                  <a href="#work" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Work
                  </a>
                  <a href="#content" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Content
                  </a>
                  <a href="#contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex sm:hidden">
              <button
                onClick={handleToggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="flex flex-col justify-center min-h-screen text-center -mt-16">
              {/* Add links to sections */}
              <a href="#skills" onClick={handleToggleMobileMenu} className="text-white hover:bg-gray-700 block px-3 py-6 rounded-md text-base font-medium text-2xl">
                Skills
              </a>
              <a href="#job-history" onClick={handleToggleMobileMenu} className="text-white hover:bg-gray-700 block px-3 py-6 rounded-md text-base font-medium text-2xl">
                Job History
              </a>
              <a href="#education" onClick={handleToggleMobileMenu} className="text-white hover:bg-gray-700 block px-3 py-6 rounded-md text-base font-medium text-2xl">
                Education
              </a>
              <a href="#content" onClick={handleToggleMobileMenu} className="text-white hover:bg-gray-700 block px-3 py-6 rounded-md text-base font-medium text-2xl">
                Content
              </a>
              <a href="#contact" onClick={handleToggleMobileMenu} className="text-white hover:bg-gray-700 block px-3 py-6 rounded-md text-base font-medium text-2xl">
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero section */}
      <section id="hero" className="bg-gradient-to-r from-red-500 to-yellow-500 text-white">
        <div className="container mx-auto md:w-2/3 px-2 py-12 max-h-800 pt-20">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <img src="/path/to/man-image.jpg" alt="Man" />
            </div>
            <div className="w-1/2">
              <h1 className="text-4xl pl-4">Hi, I'm <span className='font-bold'>Hugo Bessa</span></h1>
              <p className="text-lg pl-4">Expert in building MVPs and scaling them. Amateur composer/producer in the free time</p>
            </div>
          </div>
        </div>
      </section>
    
      {/* Work section */}
      <section id="work" className="grid grid-cols-1 md:grid-cols-2 gap-4 container lg:w-2/3 mx-auto mt-16">
        <div className="grid gap-4 auto-rows-min">
          {/* Skills medium screen and larger section */}
          <div id="skills" className="md:hidden block md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <div className="px-2">
              <h2 className="text-3xl font-semibold mb-8">Skills</h2>
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsData.map((skill, index) => {
                  const circumference = 30 * 2 * Math.PI;
                  return (<div key={index}>
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
                          className="text-blue-600"
                          strokeWidth="5"
                          stroke-dasharray={circumference}
                          stroke-dashoffset={circumference - skill.percentage / 100 * circumference}
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
                )
              })}
              </div>
            </div>
          </div>

          {/* Job history section */}
          <div id="job-history" className="lg:col-span-2 md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <div className="px-2">
              <h2 className="text-3xl font-semibold mb-8">Job History</h2>
              <ol className="space-y-8 relative">
                {jobsData.map((job, index) => (
                  <li key={index} className="w-full mb-30 flex items-start relative after:absolute after:content-[' '] after:top-0 after:-bottom-8 after:left-10 after:border-l after:border-gray-200 after:-z-10 dark:after:border-gray-600 last:after:content-none">            
                    <span className="flex items-center mr-4 justify-center w-20 h-20 bg-blue-100 rounded-full border-8 border-white dark:border-gray-900 dark:bg-blue-900">
                      <img className="rounded-full shadow-lg" src={job.company.logo} alt={job.company.name}/>
                    </span>
                    <div className="p-4 bg-white rounded-lg grow shadow-sm dark:bg-gray-700">
                      <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{job.date}</time>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                        <a href={job.company.link} className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">{job.company.name}</a> - {job.title}
                      </div>
                      {!openedJobHistoryItems[index] && (<button className="text-blue-500" onClick={() => handleOpenJobHistoryItem(index)}>
                        See more
                      </button>)}
                      {/* Add course description toggle logic */}
                      {openedJobHistoryItems[index] && (
                        <p className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                          {job.description}
                        </p>
                      )}
                      {openedJobHistoryItems[index] && (<button className="text-blue-500" onClick={() => handleCloseJobHistoryItem(index)}>
                        close
                      </button>)}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Education section */}
          <div id="education" className="lg:col-span-2 md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <div className="px-2">
              <h2 className="text-3xl font-semibold mb-8">Education</h2>
              <div className="space-y-8">
                {educationData.map((education, index) => (
                  <li key={index} className="w-full mb-30 flex items-start relative after:absolute after:content-[' '] after:top-0 after:-bottom-8 after:left-10 after:border-l after:border-gray-200 after:-z-10 dark:after:border-gray-600 last:after:content-none">            
                    <span className="flex items-center mr-4 justify-center w-20 h-20 bg-blue-100 rounded-full border-8 border-white dark:border-gray-900 dark:bg-blue-900">
                      <img className="rounded-full shadow-lg" src={education.institution.logo} alt={education.institution.name}/>
                    </span>
                    <div className="p-4 bg-white rounded-lg grow shadow-sm dark:bg-gray-700">
                      <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{education.date}</time>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                        <a href={education.institution.link} className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">{education.institution.name}</a> - {education.course }
                      </div>
                      {!openedEducationHistoryItems[index] && (<button className="text-blue-500" onClick={() => handleOpenEducationItem(index)}>
                        See more
                      </button>)}
                      {/* Add course description toggle logic */}
                      {openedEducationHistoryItems[index] && (
                        <p className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                          {education.description}
                        </p>
                      )}
                      {openedEducationHistoryItems[index] && (<button className="text-blue-500" onClick={() => handleCloseEducationItem(index)}>
                        close
                      </button>)}
                    </div>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 auto-rows-min">
          {/* Skills small screen and smaller section */}
          <div id="skills" className="md:block hidden md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <div className="px-2">
              <h2 className="text-3xl font-semibold mb-8">Skills</h2>
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsData.map((skill, index) => {
                  const circumference = 30 * 2 * Math.PI;
                  return (<div key={index}>
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
                          className="text-blue-600"
                          strokeWidth="5"
                          stroke-dasharray={circumference}
                          stroke-dashoffset={circumference - skill.percentage / 100 * circumference}
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
                )
              })}
              </div>
            </div>
          </div>

          {/* Languages section */}
          <div id="skills" className="md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <div className="px-2">
              <h2 className="text-3xl font-semibold mb-8">Languages</h2>
              <div className="">
                {languagesData.map((language, index) => (<div key={index}>
                    <p className="mt-2"><span className="font-bold">{language.name}</span> {language.level}</p>
                  </div>
                )
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section id="content" className="mt-16 py-12 bg-orange-200">
        <div className="lg:w-2/3 md:mx-auto mx-4">
          <div className="container mx-auto px-2">
            <h2 className="text-3xl font-semibold mb-8 text-center">Content</h2>
            <div className="space-y-4 ">
              <div className="flex justify-center gap-2 mb-4">
                {/* Add search bar */}
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
                {/* Add tag filters */}
                {tags.map((tag: string, index) => (
                  <button
                    key={index}
                    className={`${
                      selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                    } rounded-md px-4 py-2`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
                {/* Add clear filters button */}
                {(searchText !== '' || selectedTags.length > 0) && (
                  <button
                    className="text-blue-500 px-4 py-2"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
              {/* Add filtered content */}
              <div className="sm:columns-2 md:columns-3 gap-4 content-start">
                {filteredContent.map((link) => (
                  <ContentCard item={link} />
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="py-12 bg-gradient-to-r from-red-500 to-yellow-500 text-white">
        <div className="lg:w-2/3 md:mx-auto mx-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Contact</h2>
          <div className="md:flex">
            <div className="p-10 md:w-1/2 w-full flex md:justify-auto justify-center">
              <ul>
                {contactInfoData.map((contact) => (
                  <li className='flex items-center'>
                    {
                      contact.link ? (
                        <a 
                          href={contact.link} 
                          target={!contact.link.startsWith("mailto:") ? 'blank' : undefined}
                        >
                          <span className="inline-block"><DynamicBrandedIcon name={contact.icon} /> </span> {contact.text}
                        </a> 
                      ): (
                        <span><span className="inline-block"><DynamicBrandedIcon  name={contact.icon} /></span> {contact.text}</span>
                      )
                    }
                    
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-2 md:w-1/2 w-full">
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">From Name</label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">From Email</label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-white dark:text-white">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="body" className="block mb-2 text-sm font-medium text-white dark:text-white">Body</label>
                  <textarea
                    id="body"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    rows={4}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;