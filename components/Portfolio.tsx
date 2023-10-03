"use client";

import { PortfolioItem } from "@/app/notion-data";
import Image from "next/image";
import { useState } from "react";

const ContentCardWrapper = ({
  link,
  children,
  className,
  ...props
}: {
  link?: string;
  children: React.ReactNode;
  className: string;
}) => {
  if (!!link) {
    return (
      <a className={`block ${className}`} href={link} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  } else {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }
};

const ContentCard = ({ item, onTagClick }: { item: PortfolioItem, onTagClick: (tag: string) => void }) => (
  <ContentCardWrapper
    link={item.link}
    className="self-start rounded overflow-hidden shadow-lg dark:bg-gray-800 mb-4 last:mb-0 bg-white"
  >
    {item.image && (
      <Image
        alt={item.title}
        width={400}
        height={300}
        className="w-full aspect-video"
        src={item.image}
      />
    )}
    {item.embed && (
      <div
        className="w-full aspect-video"
        dangerouslySetInnerHTML={{ __html: item.embed }}
      />
    )}
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{item.title}</div>
    </div>
    <div className="px-6 pt-4 pb-2">
      {item.tags.map((tag: string) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {tag}
        </button>
      ))}
    </div>
  </ContentCardWrapper>
);

const unaccent = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const Portfolio = ({ portfolioData, tags }: { portfolioData: PortfolioItem[], tags: string[] }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const filteredContent = (portfolioData ?? []).filter(
    (item: PortfolioItem) => {
      const hasText = !searchText || unaccent(item.title).toLowerCase().includes(unaccent(searchText).toLowerCase());
      const hasTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag: string) =>
          item.tags.map((s) => s.toLowerCase()).includes(tag.toLowerCase())
        );
      return hasText && hasTags;
    }
  );

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSearchText("");
  };
  
  return (
    <div className="lg:w-2/3 md:mx-auto mx-4 relative z-1">
      <div className="container mx-auto px-2">
        <h2 className="text-3xl font-semibold mb-8 text-center">Content</h2>
        <div className="space-y-4 ">
          <div className="flex md:justify-center justify-left gap-2 mb-4 flex-wrap">
            {/* Add search bar */}
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full md:w-60 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
            {/* Add tag filters */}
            {tags?.map((tag: string) => (
              <button
                key={tag}
                className={`shadow-md ${
                  selectedTags.includes(tag)
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-800"
                } rounded-md px-4 py-2`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
            {/* Add clear filters button */}
            {(searchText !== "" || selectedTags.length > 0) && (
              <button
                className="text-orange-500 px-4 py-2"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
          {/* Add filtered content */}
          <div className="sm:columns-2 md:columns-3 gap-4 content-start">
            {filteredContent?.map((link) => (
              <ContentCard key={link.id} item={link} onTagClick={handleTagClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
