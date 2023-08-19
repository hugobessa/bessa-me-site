'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const jobsData = [
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

const educationData = [
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

const skillsData = [
  {
    name: 'Skill 1',
    percentage: 80,
  },
  // Add more skill data objects as needed
];

const contentData = [
  {
    title: 'Link 1',
    link: "https://google.com",
    tags: ['tag1', 'tag2'],
    image: '/path/to/link1-image.png',
    embed: null,
  },
  {
    title: 'Link 2',
    link: null,
    tags: ['tag1'],
    image: null,
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
    embed: null,
  },
  {
    title: 'Link 2',
    link: null,
    tags: ['tag1'],
    image: null,
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

const tags = [...new Set(contentData.map((item) => item.tags).flat())];

const ContentCardWrapper = ({ isLink, children, className, ...props } ) => {
  if (isLink) {
    return <a className={`block ${className}`} {...props}>{children}</a>
  } else {
    return <div className={className} {...props}>{children}</div>
  }
}

const ContentCard = ({ item }) => (
  <ContentCardWrapper isLink={!!item.link} className="self-start rounded overflow-hidden shadow-lg dark:bg-gray-800 mb-4 last:mb-0">
    {item.image && <img className="w-full" src={item.image} />}
    {item.embed && <div className="w-full" dangerouslySetInnerHTML={{__html: item.embed}} />}
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{item.title}</div>
    </div>
    <div className="px-6 pt-4 pb-2">
      {item.tags.map((tag) => (
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {tag}
        </span>
      ))}
    </div> 
  </ContentCardWrapper>
)

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
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

  const handleTagClick = (tag) => {
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

  const handleFormSubmit = (e) => {
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
      <nav className="bg-gray-800 fixed w-full top-0 z-10">
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
                  <a href="#work" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Work
                  </a>
                  <a href="#content" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Content
                  </a>
                  <a href="#contact" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex sm:hidden">
              <button
                onClick={handleToggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
            <div className="min-h-screen px-2 pt-2 pb-3 space-y-1">
              {/* Add links to sections */}
              <a href="#skills" onClick={handleToggleMobileMenu} className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Skills
              </a>
              <a href="#job-history" onClick={handleToggleMobileMenu} className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Job History
              </a>
              <a href="#education" onClick={handleToggleMobileMenu} className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Education
              </a>
              <a href="#content" onClick={handleToggleMobileMenu} className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Content
              </a>
              <a href="#contact" onClick={handleToggleMobileMenu} className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero section */}
      <section id="hero" className="bg-gradient-to-r from-red-500 to-yellow-500 mt-16">
        <div className="container mx-auto md:w-2/3 px-2 py-12 max-h-400">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <img src="/path/to/man-image.jpg" alt="Man" />
            </div>
            <div className="w-1/2">
              <h1 className="text-4xl">Hi, I'm <span className='font-bold'>Hugo Bessa</span></h1>
              <p className="text-lg">A full-stack web developer and amateur musician/producer</p>
            </div>
          </div>
        </div>
      </section>
    
      {/* Work section */}
      <section id="work" className="container md:w-2/3 mx-auto grid lg:grid-cols-3 gap-4 content-start mt-4">
        {/* Job history section */}
        <div id="job-history" className="lg:col-span-2 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
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

        {/* Skills section */}
        <div id="skills" className="py-8 px-4 self-start rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 -order-1 lg:order-none">
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
                        stroke-width="5"
                        stroke="currentColor"
                        fill="transparent"
                        r="30"
                        cx="40"
                        cy="40"
                      />
                      <circle
                        className="text-blue-600"
                        stroke-width="5"
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

        {/* Education section */}
        <div id="education" className="lg:col-span-2 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
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
                      <a href={education.institution.link} className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">{education.institution.name}</a> - {education.title}
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
      </section>

      {/* Content section */}
      <section id="content" className="py-12 lg:w-2/3 mx-auto">
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
      </section>

      {/* Contact section */}
      <section id="contact" className="py-12 mx-auto lg:w-1/2">
        <div className="container mx-auto px-2">
          <h2 className="text-3xl font-semibold mb-8">Contact</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Name</label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Email</label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
              <input
                type="text"
                id="subject"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
              <textarea
                id="body"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                rows="4"
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
      </section>
    </div>
  );
};

export default LandingPage;