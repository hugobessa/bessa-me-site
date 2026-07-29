"use client";

import { Education, Organization } from "@/app/notion-data";
import { HistorySection } from "./HistorySection";

export const EducationHistory = ({ educationHistoryData, organizationsDataHash }: { educationHistoryData: Education[], organizationsDataHash: { [key: string]: Organization } }) => (
  <HistorySection
    id="education"
    title="education"
    entries={(educationHistoryData ?? []).map((education) => ({
      id: education.id,
      date: education.date,
      detail: education.course,
      organization: organizationsDataHash[education.organizationId],
      description: education.description,
    }))}
  />
);
