"use client";

import { Job, Organization } from "@/app/notion-data";
import { HistorySection } from "./HistorySection";

export const JobsHistory = ({ jobsData, organizationsDataHash }: { jobsData: Job[], organizationsDataHash: { [key: string]: Organization } }) => (
  <HistorySection
    id="work"
    title="job history"
    entries={(jobsData ?? []).map((job) => ({
      id: job.id,
      date: job.date,
      detail: job.title,
      organization: organizationsDataHash[job.organizationId],
      description: job.description,
      scope: job.scope,
      outcome: job.outcome,
    }))}
  />
);
