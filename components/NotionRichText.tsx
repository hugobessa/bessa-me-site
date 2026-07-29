import { NotionRichTextItemType } from "@/app/notion-data";
import React from "react";

interface Props {
  richText: NotionRichTextItemType[];
}

const Link = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.LinkHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      className="border-b-2 border-accent text-ink"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

const NotionText = ({
  children,
  bold,
  italic,
  strikethrough,
  underline,
  code,
  color,
}: { children: React.ReactNode } & NotionRichTextItemType["annotations"]) => {
  const style: any = {};

  if (bold) {
    style.fontWeight = "bold";
  }

  if (italic) {
    style.fontStyle = "italic";
  }

  if (strikethrough) {
    style.textDecoration = "line-through";
  }

  if (underline) {
    style.textDecoration = "underline";
  }

  if (color && color !== "default") {
    style.color = color;
  }

  return (
    <span
      // Notion keeps a paragraph's line breaks inside a single run rather than
      // splitting it, so the newlines have to survive rendering. Kept as a
      // whole class per string — a utility written against `${` is not a
      // candidate Tailwind's extractor can see, so it silently goes unemitted.
      className={[
        "whitespace-pre-line",
        code && "font-mono text-[.9em] bg-surface-2 border-2 border-ink px-1 py-0.5",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </span>
  );
};

const NotionRichTextItemText = ({
  text,
  link,
  annotations,
}: {
  text: string;
  link?: string;
  annotations: NotionRichTextItemType["annotations"];
}) => {
  const LinkComponent = !!link ? Link : React.Fragment;

  return (
    <LinkComponent {...(link ? {href: link} : {})}>
      <NotionText {...annotations}>{text}</NotionText>
    </LinkComponent>
  );
};

const NotionRichTextItem = ({
  richTextItem,
}: {
  richTextItem: NotionRichTextItemType;
}) => {
  switch (richTextItem.type) {
    case "text":
      return (
        <NotionRichTextItemText
          text={richTextItem.text?.content || ''}
          link={richTextItem.text?.link?.url}
          annotations={richTextItem.annotations}
        />
      );
    default:
      return null;
  }
};

export const NotionRichText = ({ richText }: Props) => {
  return (
    <>
      {/* Notion's `rich_text` runs carry no id of their own, so the position in
          the array is the only stable identity a run has. The array is fixed
          for the lifetime of the page — it comes from the build-time fetch and
          is never reordered — so the index is safe as a key here. */}
      {richText?.map((item, index) => (
        <NotionRichTextItem key={item.id ?? index} richTextItem={item} />
      ))}
    </>
  );
};
