"use client";

import { Education, Organization } from "@/app/notion-data";
import Image from "next/image";
import { useState } from "react";
import { NotionRichText } from "./NotionRichText";

export const EducationHistory = ({ educationHistoryData, organizationsDataHash }: { educationHistoryData: Education[], organizationsDataHash: { [key: string]: Organization } }) => {
  const [openedEducationHistoryItems, setOpenedEducationHistoryItems] =
    useState((educationHistoryData ?? []).map(() => false));
  
  const handleOpenEducationItem = (educationHistoryIndex: number) => {
    setOpenedEducationHistoryItems(
      openedEducationHistoryItems.map(
        (ehiStatus, i) => ehiStatus || i === educationHistoryIndex
      )
    );
  };
  const handleCloseEducationItem = (educationHistoryIndex: number) => {
    setOpenedEducationHistoryItems(
      openedEducationHistoryItems.map(
        (ehiStatus, i) => ehiStatus && i !== educationHistoryIndex
      )
    );
  };
  
  return (
    <div
      id="education"
      className="lg:col-span-2 md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800"
    >
      <div className="px-2">
        <h2 className="text-3xl font-semibold mb-8">Education</h2>
        <div className="space-y-8">
          {educationHistoryData?.map((education, index) => (
            <li
              key={education.id}
              className="w-full mb-30 flex items-start relative border-b last:border-0 border-gray-200 after:absolute after:content-[' '] after:top-0 after:-bottom-8 after:left-10 after:border-l after:border-gray-200 after:-z-10 dark:after:border-gray-600 last:after:content-none"
            >
              <span className="flex items-center mr-4 justify-center w-20 min-w-[5rem] h-20 bg-white border-8 border-white dark:border-gray-900 dark:bg-blue-900">
                <Image
                  className="rounded"
                  width={64}
                  height={64}
                  src={
                    organizationsDataHash[education.organizationId].logo
                  }
                  alt={
                    organizationsDataHash[education.organizationId].name
                  }
                />
              </span>
              <div className="p-4 bg-white rounded-lg w-auto grow dark:bg-gray-700">
                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  {education.date}
                </time>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                  <a
                    href={
                      organizationsDataHash[education.organizationId]
                        .link
                    }
                    className="font-semibold text-orange-600 text-base dark:text-blue-500 hover:underline"
                  >
                    {
                      organizationsDataHash[education.organizationId]
                        .name
                    }
                  </a>{" "}
                  - {education.course}
                </div>
                {!openedEducationHistoryItems[index] && (
                  <button
                    className="text-gray-500 underline text-xs"
                    onClick={() => handleOpenEducationItem(index)}
                  >
                    See more
                  </button>
                )}
                {/* Add course description toggle logic */}
                {openedEducationHistoryItems[index] && (
                  <p className="p-3 text-xs italic font-normal text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                    <NotionRichText richText={education.description} />
                  </p>
                )}
                {openedEducationHistoryItems[index] && (
                  <button
                    className="text-gray-500 underline text-xs"
                    onClick={() => handleCloseEducationItem(index)}
                  >
                    close
                  </button>
                )}
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
