"use client";
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export const NavBar = ({ children }: {children: React.ReactNode}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={mobileMenuOpen ? "max-h-screen overflow-hidden" : ""}>
      {/* Navigation */}
      <nav className={`bg-white/70 backdrop-blur-lg dark:bg-gray-900 fixed rounded top-3 left-3 right-3 ${mobileMenuOpen && "bottom-3"} z-10 shadow-lg dark:shadow-[0_0_5px_1px_rgba(249,115,22,1)] px-3`}>
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-between sm:items-stretch">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-orange-500 text-lg font-semibold">
                  <a href="#hero">Hugo Bessa</a>
                </span>
              </div>
              <div className="hidden sm:block sm:ml-6 float-right">
                <div className="flex space-x-4">
                  {/* Add links to sections */}
                  <a
                    href="#work"
                    className="text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Work
                  </a>
                  <a
                    href="#content"
                    className="text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Content
                  </a>
                  <a
                    href="#contact"
                    className="text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex sm:hidden">
              <button
                onClick={handleToggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-orange-500 hover:text-orange-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="flex flex-col justify-center min-h-screen text-center -mt-16">
              {/* Add links to sections */}
              <a
                href="#skills"
                onClick={handleToggleMobileMenu}
                className="text-orange-500 hover:bg-white/50 dark:hover:bg-gray-700 block px-3 py-6 rounded-md font-bold text-2xl"
              >
                Skills
              </a>
              <a
                href="#job-history"
                onClick={handleToggleMobileMenu}
                className="text-orange-500 hover:bg-white/50 dark:hover:bg-gray-700 block px-3 py-6 rounded-md font-bold text-2xl"
              >
                Job History
              </a>
              <a
                href="#education"
                onClick={handleToggleMobileMenu}
                className="text-orange-500 hover:bg-white/50 dark:hover:bg-gray-700 block px-3 py-6 rounded-md font-bold text-2xl"
              >
                Education
              </a>
              <a
                href="#languages"
                onClick={handleToggleMobileMenu}
                className="text-orange-500 hover:bg-white/50 dark:hover:bg-gray-700 block px-3 py-6 rounded-md font-bold text-2xl"
              >
                Languages
              </a>
              <a
                href="#content"
                onClick={handleToggleMobileMenu}
                className="text-orange-500 hover:bg-white/50 dark:hover:bg-gray-700 block px-3 py-6 rounded-md font-bold text-2xl"
              >
                Content
              </a>
              <a
                href="#contact"
                onClick={handleToggleMobileMenu}
                className="text-orange-500 hover:bg-white/50 dark:hover:bg-gray-700 block px-3 py-6 rounded-md font-bold text-2xl"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
      {children}
    </div>
  )
}