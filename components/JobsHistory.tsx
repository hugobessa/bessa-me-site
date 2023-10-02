"use client";

import { Job, Organization } from "@/app/notion-data";
import Image from "next/image";
import { useState } from "react";

export const JobsHistory = ({ jobsData, organizationsDataHash }: { jobsData: Job[], organizationsDataHash: { [key: string]: Organization } }) => {
  const [openedJobHistoryItems, setOpenedJobHistoryItems] = useState(
    (jobsData ?? []).map(() => false)
  );
  

  const handleOpenJobHistoryItem = (jobHistoryIndex: number) => {
    setOpenedJobHistoryItems(
      openedJobHistoryItems.map(
        (jhiStatus, i) => jhiStatus || i === jobHistoryIndex
      )
    );
  };
  const handleCloseJobHistoryItem = (jobHistoryIndex: number) => {
    setOpenedJobHistoryItems(
      openedJobHistoryItems.map(
        (jhiStatus, i) => jhiStatus && i !== jobHistoryIndex
      )
    );
  };

  return (
    <div
      id="job-history"
      className="lg:col-span-2 md:mx-0 mx-4 py-8 px-4 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800"
    >
      <div className="px-2">
        <h2 className="text-3xl font-semibold mb-8">Job History</h2>
        <ol className="space-y-8 relative">
          {jobsData?.map((job, index) => (
            <li
              key={job.id}
              className="w-full mb-30 flex items-start relative after:absolute after:content-[' '] after:top-0 after:-bottom-8 after:left-10 after:border-l after:border-gray-200 after:-z-10 dark:after:border-gray-600 last:after:content-none"
            >
              <span className="flex items-center mr-4 justify-center w-20 min-w-[5rem] h-20 bg-white rounded-full border-8 border-white dark:border-gray-900 dark:bg-blue-900">
                <Image
                  width={64}
                  height={64}
                  src={organizationsDataHash[job.organizationId].logo}
                  alt={organizationsDataHash[job.organizationId].name}
                />
              </span>
              <div className="p-4 bg-white rounded-lg w-auto grow border border-gray-200 dark:bg-gray-700">
                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  {job.date}
                </time>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                  <a
                    href={organizationsDataHash[job.organizationId].link}
                    className="font-semibold text-orange-600 dark:text-blue-500 hover:underline"
                  >
                    {organizationsDataHash[job.organizationId].name}
                  </a>{" "}
                  - {job.title}
                </div>
                {!openedJobHistoryItems[index] && (
                  <button
                    className="text-blue-500"
                    onClick={() => handleOpenJobHistoryItem(index)}
                  >
                    See more
                  </button>
                )}
                {/* Add course description toggle logic */}
                {openedJobHistoryItems[index] && (
                  <p className="p-3 text-xs italic font-normal text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                    {job.description}
                  </p>
                )}
                {openedJobHistoryItems[index] && (
                  <button
                    className="text-blue-500"
                    onClick={() => handleCloseJobHistoryItem(index)}
                  >
                    close
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
