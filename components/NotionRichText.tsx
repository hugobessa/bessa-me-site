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
    <a {...props} target="blank" rel="noreferrer">
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

  if (code) {
    style.fontFamily = "monospaced";
    style.backgroundColor = "gainsboro";
    style.color = "#CC3366";
  }

  return <p className="whitespace-pre-line" style={style}>{children}</p>;
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
    <LinkComponent href={link}>
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
          link={richTextItem.text?.link}
          annotations={richTextItem.annotations}
        />
      );
    default:
      return null;
  }
};

export const NotionRichText = ({ richText }: Props) => {
  console.log(richText);
  return (
    <>
      {richText && richText?.map((item) => (
        <NotionRichTextItem key={item.id} richTextItem={item} />
      ))}
    </>
  );
};
