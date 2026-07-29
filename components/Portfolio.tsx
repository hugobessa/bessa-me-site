"use client";

import { PortfolioItem } from "@/app/notion-data";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { CONTENT_FORMAT_TAGS } from "./contentFormat";
import { Section } from "./Section";
import { chipClassName, fieldBaseClassName } from "./styles";

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
      <a className={className} href={link} target="_blank" rel="noreferrer" {...props}>
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

/**
 * Cover for items with no image or embed: the 45° hatch from the reference
 * carrying a bordered tile, in the same idiom as the history logos.
 *
 * The tile holds a 4x4 block pattern derived from the title and mirrored down
 * the middle, so each item gets its own mark. An initial was the obvious
 * choice, but too many titles here start with the same letter to tell apart.
 * Everything is a pure function of the title: stable across re-renders and
 * identical on server and client.
 */
const DefaultThumb = ({ title }: { title: string }) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  }

  const cells: boolean[] = [];
  for (let row = 0; row < 4; row++) {
    const outer = ((hash >> (row * 2)) & 1) === 1;
    const inner = ((hash >> (row * 2 + 1)) & 1) === 1;
    cells.push(outer, inner, inner, outer);
  }

  const fill = hash % 3 === 0 ? "bg-accent" : "bg-ink";

  return (
    <div className="w-full aspect-16/10 bg-stripes-45 border-b-2 border-ink flex items-center justify-center">
      <div className="grid grid-cols-4 w-14 h-14 border-2 border-ink bg-surface">
        {cells.map((isFilled, index) => (
          <span key={index} className={isFilled ? fill : undefined} />
        ))}
      </div>
    </div>
  );
};

/**
 * The card's cover plus, when the item declares one, its format. The tag reads
 * the format — talk, writing, open source — which the tag row below can't: those
 * are topics, so a conference talk and a blog post look identical without this.
 */
const CardCover = ({ item }: { item: PortfolioItem }) => (
  <div className="relative">
    {item.image ? (
      <Image
        alt={item.title}
        width={400}
        height={250}
        className="w-full aspect-16/10 object-cover border-b-2 border-ink"
        src={item.image}
      />
    ) : item.embed ? (
      /* Embeds carry their own width/height attributes, so pin them to the cell
         to keep every cover the same size. Audio players render a fixed-height
         widget inside the iframe, so stretching one just adds its own blank
         background — centre those at their natural height instead. */
      <div
        className={`w-full aspect-16/10 overflow-hidden border-b-2 border-ink bg-accent flex items-center [&_iframe]:block [&_iframe]:w-full ${
          /soundcloud\.com/.test(item.embed) ? "" : "[&_iframe]:h-full"
        }`}
        dangerouslySetInnerHTML={{ __html: item.embed }}
      />
    ) : (
      <DefaultThumb title={item.title} />
    )}
    {item.kind && (
      /* an embed cover is an interactive iframe — the tag must not eat clicks
         meant for its play button */
      <span className="meta absolute left-2.5 bottom-2.5 bg-ink text-surface px-2 py-1 pointer-events-none">
        {item.kind}
      </span>
    )}
  </div>
);

const ContentCard = ({ item, selectedTags, onTagClick }: { item: PortfolioItem, selectedTags: string[], onTagClick: (tag: string) => void }) => (
  <ContentCardWrapper
    link={item.link}
    className="flex flex-col border-r-2 border-b-2 border-ink"
  >
    <CardCover item={item} />
    <div className="flex flex-col gap-2.5 flex-1 p-3.5">
      <h3 className="font-titles font-black text-[17px] leading-[1.2] text-ink">
        {item.title}
      </h3>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {item.tags.map((tag: string) => (
          <button
            key={tag}
            onClick={(e: MouseEvent) => {
              // the whole card may be a link — keep a tag click to filtering only
              e.preventDefault();
              onTagClick(tag);
            }}
            className={chipClassName(selectedTags.includes(tag))}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  </ContentCardWrapper>
);

const unaccent = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const priorityRank = (tag: string) => {
  const index = CONTENT_FORMAT_TAGS.indexOf(tag.toLowerCase());
  return index === -1 ? CONTENT_FORMAT_TAGS.length : index;
};

/**
 * Floor for how many filter tags the header shows, in case the vocabulary ever
 * carries none of the tags above — a header holding nothing but `+18 more`
 * reads as broken.
 */
const HEADER_TAG_COUNT = 3;

/** Cards shown before the section folds — two full rows on a three-up grid. */
const FOLDED_CARD_COUNT = 6;

/** Pinned picks above the grid — one full row on a three-up grid. */
const FEATURED_CARD_COUNT = 3;

const tagClassName = (isSelected: boolean) =>
  `font-mono text-[11px] font-bold uppercase tracking-[.12em] px-2.5 py-[7px] border-2 border-ink whitespace-nowrap transition-hard duration-120 ease-linear ${
    isSelected
      ? "bg-accent text-on-accent"
      : "bg-surface text-ink hover:bg-surface-2"
  }`;

export const Portfolio = ({ portfolioData, tags }: { portfolioData: PortfolioItem[], tags: string[] }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);

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

  // selected tags sort to the front so an active filter is never the one
  // hidden behind `+n more`, then the formats, then the topics in the order
  // they came (Array.sort is stable, so that order survives within each rank)
  const orderedTags = [...(tags ?? [])].sort(
    (a, b) =>
      Number(selectedTags.includes(b)) - Number(selectedTags.includes(a)) ||
      priorityRank(a) - priorityRank(b)
  );
  // the header holds every format plus whatever is actively filtering — both
  // groups have already sorted to the front, so one slice takes them all
  const headerTagCount = Math.max(
    HEADER_TAG_COUNT,
    orderedTags.filter(
      (tag) =>
        priorityRank(tag) < CONTENT_FORMAT_TAGS.length ||
        selectedTags.includes(tag)
    ).length
  );
  const headerTags = orderedTags.slice(0, headerTagCount);
  const remainingTags = orderedTags.slice(headerTagCount);
  const hasFilters = selectedTags.length > 0 || searchText !== "";

  // The pinned row is an editorial default, so a reader who has started
  // filtering has overruled it — once that happens the picks go back into the
  // grid and the results are just the results.
  const featuredContent = hasFilters
    ? []
    : (portfolioData ?? [])
        .filter((item: PortfolioItem) => item.featured)
        .slice(0, FEATURED_CARD_COUNT);
  const featuredIds = new Set(featuredContent.map((item) => item.id));
  const gridContent = filteredContent.filter(
    (item: PortfolioItem) => !featuredIds.has(item.id)
  );

  const visibleContent = isUnfolded
    ? gridContent
    : gridContent.slice(0, FOLDED_CARD_COUNT);
  // counted off the total, not off what's on screen, so the control survives
  // its own expansion and can offer `show less`
  const foldedCount = Math.max(0, gridContent.length - FOLDED_CARD_COUNT);

  return (
    <Section
      id="content"
      title={`content — ${filteredContent.length} ${
        filteredContent.length === 1 ? "item" : "items"
      }`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`${fieldBaseClassName} w-40 px-2.5 py-1.5`}
            placeholder="search..."
          />
          {headerTags.map((tag: string) => (
            <button
              key={tag}
              className={tagClassName(selectedTags.includes(tag))}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
          {remainingTags.length > 0 && (
            <button
              className="font-mono text-[11px] font-bold uppercase tracking-[.12em] px-2.5 py-[7px] border-2 border-dashed border-ink-muted text-ink-muted whitespace-nowrap hover:border-ink hover:text-ink"
              aria-expanded={showAllTags}
              onClick={() => setShowAllTags(!showAllTags)}
            >
              {showAllTags ? "less" : `+${remainingTags.length} more`}
            </button>
          )}
          {hasFilters && (
            <button
              className="font-mono text-[11px] font-bold uppercase tracking-[.12em] px-1 py-[7px] text-accent whitespace-nowrap"
              onClick={handleClearFilters}
            >
              clear
            </button>
          )}
        </div>
      }
      subheader={
        /* the overflow tags drop into their own band so the header stays one
           line — inside the sticky block, so they open under a pinned header
           rather than back at the top of the section */
        showAllTags && remainingTags.length > 0 ? (
          <div className="flex flex-wrap gap-2 px-5 sm:px-6 py-3 border-b-2 border-ink bg-surface-2">
            {remainingTags.map((tag: string) => (
              <button
                key={tag}
                className={tagClassName(selectedTags.includes(tag))}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null
      }
    >
      {filteredContent.length === 0 && (
        <div className="px-5 sm:px-6 py-6 font-mono text-[11px] font-bold uppercase tracking-[.12em] text-ink-muted">
          no items match this filter
        </div>
      )}
      {featuredContent.length > 0 && (
        <>
          <div className="flex items-center gap-2.5 flex-wrap px-5 sm:px-6 py-3 border-b-2 border-ink bg-surface">
            <span className="meta bg-accent text-on-accent px-2 py-1">
              featured
            </span>
          </div>
          {/* keeps its bottom rule, unlike the grid below — that rule is what
              separates the pinned row from the rest */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 -mr-0.5">
            {featuredContent.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                selectedTags={selectedTags}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        </>
      )}
      {/* cells carry right/bottom rules; the negative margin tucks the outer
          ones under the card border — or under the unfold bar — instead of
          doubling it */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 -mr-0.5 -mb-0.5">
        {visibleContent.map((link) => (
          <ContentCard
            key={link.id}
            item={link}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
          />
        ))}
      </div>
      {foldedCount > 0 && (
        <button
          className="block w-full px-5 sm:px-6 py-3.5 font-mono text-xs font-extrabold uppercase tracking-[.14em] text-ink bg-surface-2 transition-hard duration-120 ease-linear hover:bg-accent hover:text-on-accent"
          aria-expanded={isUnfolded}
          onClick={() => setIsUnfolded(!isUnfolded)}
        >
          {isUnfolded ? "show less" : `show ${foldedCount} more`}
        </button>
      )}
    </Section>
  )
}
