"use client";

import * as BrandIcons from "react-icons/fa6";

/**
 * Brand glyph in the current text colour, so it inverts with its row on hover.
 */
export const DynamicBrandedIcon = ({
  name,
  ...props
}: {
  name: keyof typeof BrandIcons;
}) => {
  const IconComponent = BrandIcons[name] ?? BrandIcons.FaUser;

  return <IconComponent className="shrink-0" {...props} />;
};
