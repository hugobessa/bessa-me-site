// pages/notion-data.js
import type * as BrandIcons from "react-icons/fa6";
import Bottleneck from 'bottleneck';

export type ValueType<T> = T extends Promise<infer U> ? U : T;

export interface NotionRichTextItemType {
  /**
   * Not part of Notion's `rich_text` payload — the API returns runs without any
   * identity of their own. Optional so nothing keys off it expecting a value.
   */
  id?: string;
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

/**
 * A Notion `rich_text` cell as a plain string, or undefined when the column is
 * absent or empty. Columns read through this one are optional by design: the
 * site renders without them and picks them up the moment they're filled in.
 */
function plainText(property: any): string | undefined {
  const runs: any[] = property?.rich_text ?? [];
  const text = runs
    .map((run) => run.plain_text ?? run.text?.content ?? "")
    .join("")
    .trim();
  return text || undefined;
}

const limiter = new Bottleneck({
  maxConcurrent: 1, // Only allow one request at a time
  minTime: 340, // Minimum time between each request (in milliseconds)
});

/**
 * Scopes Next's fetch cache to a single build.
 *
 * `force-cache` is what keeps `/` static, but its entries live on disk in
 * `<distDir>/cache/fetch-cache` and, with no `revalidate`, never expire. A host
 * that preserves that directory between builds would serve every redeploy the
 * *first* build's Notion content, indefinitely. The cache key covers the request
 * headers, so a value that changes once per process retires the whole cache the
 * moment a build starts — while still de-duplicating fetches within it.
 *
 * Deliberately not the commit SHA: redeploying the same commit after editing
 * Notion has to pick the edits up, and a SHA wouldn't have moved.
 */
const BUILD_ID = String(Date.now());

async function _fetchNotionData(databaseId: string): Promise<any[]> {
  const baseUrl = "https://api.notion.com/v1/databases";
  const url = `${baseUrl}/${databaseId}/query`;
  const pageSize = 30;

  const headers = {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Notion-Version": "2022-06-28", // Adjust the API version as needed
    // ignored by Notion; present so the fetch cache key changes per build
    "X-Build-Id": BUILD_ID,
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
        // Cached for the lifetime of the build, which is what keeps `/` a
        // static page: one uncacheable fetch opts the whole route into
        // per-request rendering. Deliberately no `revalidate` — pairing one
        // with `force-cache` is a contradiction Next resolves by going dynamic,
        // and the content only changes when the site is rebuilt anyway.
        cache: "force-cache",
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
  /** `Featured` (checkbox) — pins the item above the grid. */
  featured?: boolean;
  /** `Kind` (select) — talk / writing / open source / song, shown on the cover. */
  kind?: string;
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
  /** `Scope` (rich_text) — the always-visible chip: team size, remit, span. */
  scope?: string;
  /** `Outcome` (rich_text) — the always-visible line under the chip. */
  outcome?: string;
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
  /** No longer rendered — the toolbelt line is unranked. */
  percentage: number;
  /** `Order` (number) — the authored sequence. Rows without one sort last. */
  order?: number;
}

/** One principle of the leadership band. */
export interface Leadership {
  id: string;
  name: string;
  description: string;
  /** `Portfolio Content` — ids into the portfolio DB, the artifacts backing it. */
  portfolioContentIds: string[];
  /** `Order` (number) — the authored sequence. Rows without one sort last. */
  order?: number;
}

/** One cell of the scope band. */
export interface Stat {
  id: string;
  name: string;
  /** Free text, not a number — a stat may read "12" or "12+". */
  value: string;
  description: string;
  /** `Order` (number) — the authored sequence. Rows without one sort last. */
  order?: number;
}

/** One column of the capability map. */
export interface Capability {
  id: string;
  name: string;
  items: string[];
  /** `Order` (number) — the authored sequence. Rows without one sort last. */
  order?: number;
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
        scope: plainText(notionJob["Scope"]),
        outcome: plainText(notionJob["Outcome"]),
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
        order: notionSkill["Order"]?.number ?? undefined,
      } as Skill)
  );
}

export async function fetchLeadership(): Promise<Leadership[]> {
  const databaseId = process.env.NOTION_LEADERSHIP_DB_ID;
  // as with the stats and capabilities below, an unset id falls back to the
  // repo's copy rather than failing the build
  if (!databaseId) {
    return [];
  }

  const notionLeadership = await _fetchNotionData(databaseId);
  return notionLeadership.map(
    ({ id, properties: notionPrinciple }) =>
      ({
        id,
        name: notionPrinciple["Name"].title
          .map((run: any) => run.plain_text ?? run.text?.content ?? "")
          .join("")
          .trim(),
        description: plainText(notionPrinciple["Description"]) ?? "",
        portfolioContentIds: (
          notionPrinciple["Portfolio Content"]?.relation ?? []
        ).map((item: any) => item.id),
        order: notionPrinciple["Order"]?.number ?? undefined,
      } as Leadership)
  );
}

export async function fetchStats(): Promise<Stat[]> {
  const databaseId = process.env.NOTION_STATS_DB_ID;
  // as with the capabilities below, an unset id falls back to the repo's copy
  // rather than failing the build
  if (!databaseId) {
    return [];
  }

  const notionStats = await _fetchNotionData(databaseId);
  return notionStats.map(
    ({ id, properties: notionStat }) =>
      ({
        id,
        name: notionStat["Name"].title
          .map((run: any) => run.plain_text ?? run.text?.content ?? "")
          .join("")
          .trim(),
        value: plainText(notionStat["Value"]) ?? "",
        description: plainText(notionStat["Description"]) ?? "",
        order: notionStat["Order"]?.number ?? undefined,
      } as Stat)
  );
}

export async function fetchCapabilities(): Promise<Capability[]> {
  const databaseId = process.env.NOTION_CAPABILITIES_DB_ID;
  // the section falls back to the repo's own copy without this one, so an unset
  // id is a missing column of copy rather than a broken build
  if (!databaseId) {
    return [];
  }

  const notionCapabilities = await _fetchNotionData(databaseId);
  return notionCapabilities.map(
    ({ id, properties: notionCapability }) =>
      ({
        id,
        // titles here are typed with a trailing newline as often as not
        name: notionCapability["Name"].title
          .map((run: any) => run.plain_text ?? run.text?.content ?? "")
          .join("")
          .trim(),
        items: notionCapability["Items"].multi_select.map(
          (item: any) => item.name
        ),
        order: notionCapability["Order"]?.number ?? undefined,
      } as Capability)
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
        featured: notionPortfolioItem["Featured"]?.checkbox === true,
        kind: notionPortfolioItem["Kind"]?.select?.name,
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
