import { PortfolioItem } from "@/app/notion-data";

/**
 * The tags that answer "what kind of thing is this?" rather than "what is it
 * about?". They lead the content filter header; every topic tag waits behind
 * `+n more`, which is the difference between a reader scanning for talks and a
 * reader scanning for an alphabet.
 *
 * Standing in for the `Kind` column the content DB doesn't have — which is also
 * why the leadership band reads its proof formats off this same list.
 *
 * Kept out of Portfolio itself because that module is `"use client"`: the page
 * is a server component, and a client module's exports reach it as reference
 * proxies rather than as functions it can call.
 */
export const CONTENT_FORMAT_TAGS = ["blog", "talk", "open source"];

/** The format an item declares, if any — the first format tag it carries. */
export const contentFormat = (item: PortfolioItem) =>
  item.tags?.find((tag) => CONTENT_FORMAT_TAGS.includes(tag.toLowerCase()));
