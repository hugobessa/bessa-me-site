// pages/notion-data.js
import type * as BrandIcons from "react-icons/fa6";
import Bottleneck from 'bottleneck';

export type ValueType<T> = T extends Promise<infer U> ? U : T;

export interface NotionRichTextItemType {
  id: string;
  type: "text" | "mention" | "equation";
  text?: {
    content: string;
    link?: {
      url?: string;
    };
  };
  mention?: {
    type:
      | "database"
      | "date"
      | "link_preview"
      | "page"
      | "template_mention"
      | "user";
    database?: {
      id: string;
    };
    date?: {
      start: string | null;
      end: string | null;
    };
    link_preview?: {
      url: string;
    };
    page?: {
      id: string;
    };
    template_mention?: {
      type: "template_mention_date" | "template_mention_user";
      template_mention_date?: string;
      template_mention_user?: string;
    };
    user?: {
      object: "user";
      id: string;
    };
  };
  equation?: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color:
      | "blue"
      | "blue_background"
      | "brown"
      | "brown_background"
      | "default"
      | "gray"
      | "gray_background"
      | "green"
      | "green_background"
      | "orange"
      | "orange_background"
      | "pink"
      | "pink_background"
      | "purple"
      | "purple_background"
      | "red"
      | "red_background"
      | "yellow"
      | "yellow_background"
      | "green";
  };
}

async function imageUrlToBase64(url: string) {
  try {
    const response = await fetch(url);

    const blob = await response.arrayBuffer();

    const contentType = response.headers.get('content-type');

    const base64String = `data:${contentType};base64,${Buffer.from(
      blob,
    ).toString('base64')}`;

    return base64String;
  } catch (err) {
    console.log(err);
  }
}

const limiter = new Bottleneck({
  maxConcurrent: 1, // Only allow one request at a time
  minTime: 1000, // Minimum time between each request (in milliseconds)
});

async function _fetchNotionData(databaseId: string): Promise<any[]> {
  const baseUrl = "https://api.notion.com/v1/databases";
  const url = `${baseUrl}/${databaseId}/query`;
  const pageSize = 30;

  const headers = {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Notion-Version": "2022-06-28", // Adjust the API version as needed
  };

  let allRows: any[] = [];
  let hasMore = true;
  let startCursor: string | undefined = undefined;

  while (hasMore) {
    const params: { page_size: number; start_cursor?: string } = {
      page_size: pageSize,
    };

    if (startCursor) {
      params.start_cursor = startCursor;
    }

    const response = await limiter.schedule(() =>
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(params),
        next: {
          revalidate: 0,
        },
      })
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.results || [];
    allRows = allRows.concat(results);

    hasMore = data.has_more || false;
    if (hasMore) {
      startCursor = data.next_cursor;
    }
  }

  return allRows;
}

export interface PortfolioItem {
  id: string;
  title: string;
  link?: string;
  tags: string[];
  image?: string;
  embed?: string;
}

export interface Organization {
  id: string;
  name: string;
  logo: string;
  link: string;
}

export interface Job {
  id: string;
  title: string;
  organizationId: string;
  date: string;
  description: NotionRichTextItemType[];
}

export interface Education {
  id: string;
  course: string;
  organizationId: string;
  date: string;
  description: NotionRichTextItemType[];
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
}

export interface Language {
  id: string;
  name: string;
  level: string;
  order: number;
}

export interface ContactInfo {
  id: string;
  icon: keyof typeof BrandIcons;
  text: string;
  link?: string;
}

export async function fetchOrganizations(): Promise<Organization[]> {
  const notionOrganizations = await _fetchNotionData(
    process.env.NOTION_ORGANIZATIONS_DB_ID as string
  );
  // console.log("Notion Orgs:", JSON.stringify(notionOrganizations.map((i) => i.properties), null, 2));
  return await Promise.all(notionOrganizations.map(
    async ({ id, properties: notionOrganization }) =>
      ({
        id: id,
        name: notionOrganization["Name"].title[0].text.content,
        link: notionOrganization["Link"].url,
        logo: await imageUrlToBase64(notionOrganization["Logo"].files[0].file.url),
      } as Organization)
  ));
}

export async function fetchJobHistory(): Promise<Job[]> {
  const notionJobs = await _fetchNotionData(
    process.env.NOTION_JOBS_DB_ID as string
  );
  // console.log("Notion Jobs", JSON.stringify(notionJobs.map((i) => i.properties), null, 2))
  return notionJobs.map(
    ({ id, properties: notionJob }) =>
      ({
        id: id,
        title: notionJob["Job position"].title[0].text.content,
        organizationId: notionJob["Organization"].relation[0].id,
        date: notionJob["Dates"].rich_text?.[0]?.text?.content,
        description: notionJob["Description"].rich_text,
      } as Job)
  );
}

export async function fetchEducationHistory(): Promise<Education[]> {
  const notionEducationHistory = await _fetchNotionData(
    process.env.NOTION_EDUCATION_DB_ID as string
  );
  // console.log("Notion Education", JSON.stringify(notionEducationHistory.map((i) => i.properties), null, 2))
  return notionEducationHistory.map(
    ({ id, properties: notionJob }) =>
      ({
        id: id,
        course: notionJob["Course"].title[0].text.content,
        organizationId: notionJob["Organization"].relation[0].id,
        date: notionJob["Dates"].rich_text?.[0]?.text?.content,
        description: notionJob["Description"].rich_text,
      } as Education)
  );
}

export async function fetchSkills(): Promise<Skill[]> {
  const notionSkills = await _fetchNotionData(
    process.env.NOTION_SKILLS_DB_ID as string
  );
  // console.log("Notion Skills", JSON.stringify(notionSkills.map((i) => i.properties), null, 2))
  return notionSkills.map(
    ({ id, properties: notionSkill }) =>
      ({
        id: id,
        name: notionSkill["Name"].title[0].text.content,
        percentage: notionSkill["Percentage"].number * 100,
      } as Skill)
  );
}

export async function fetchLanguages(): Promise<Language[]> {
  const notionLanguages = await _fetchNotionData(
    process.env.NOTION_LANGUAGES_DB_ID as string
  );
  // console.log("Notion Langs", JSON.stringify(notionLanguages.map((i) => i.properties), null, 2))
  return notionLanguages.map(
    ({ id, properties: notionLanguage }) =>
      ({
        id: id,
        name: notionLanguage["Name"].title[0].text.content,
        level: notionLanguage["Level"].rich_text[0].text.content,
        order: notionLanguage["Order"].number,
      } as Language)
  );
}

export async function fetchPortfolioContent(): Promise<PortfolioItem[]> {
  const notionPortfolioItems = await _fetchNotionData(
    process.env.NOTION_PORTFOLIO_DB_ID as string
  );
  // console.log("Notion Portifolio", JSON.stringify(notionPortfolioItems.map((i) => i.properties), null, 2))
  return notionPortfolioItems.map(
    ({ id, properties: notionPortfolioItem }) =>
      ({
        id: id,
        title: notionPortfolioItem["Title"].title
          .map((r: any) => r.text.content)
          .reduce((prev: string, i: string) => prev.concat(i), ""),
        link: notionPortfolioItem["Link"].url,
        tags: notionPortfolioItem["Tags"].multi_select.map(
          (item: any) => item.name
        ),
        image:
          notionPortfolioItem["Image"].files.length > 0
            ? notionPortfolioItem["Image"].files[0].file.url
            : undefined,
        embed:
          notionPortfolioItem["Embed"].rich_text.length > 0
            ? notionPortfolioItem["Embed"].rich_text
                .map((r: any) => r.text.content)
                .reduce((prev: string, i: string) => prev.concat(i), "")
            : undefined,
      } as PortfolioItem)
  );
}

export async function fetchContactInfo(): Promise<ContactInfo[]> {
  const notionContactInfos = await _fetchNotionData(
    process.env.NOTION_CONTACT_INFO_DB_ID as string
  );
  // console.log("Notion Contact", JSON.stringify(notionContactInfos.map((i) => i.properties), null, 2))
  return notionContactInfos.map(
    ({ id, properties: notionContactInfo }) =>
      ({
        id: id,
        text: notionContactInfo["Text"].title[0].text.content,
        link: notionContactInfo["Link"].url,
        icon: notionContactInfo["Icon"].rich_text[0].text.content,
      } as ContactInfo)
  );
}
