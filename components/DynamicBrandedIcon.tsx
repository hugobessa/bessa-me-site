"use client";

import * as BrandIcons from "react-icons/fa6";

export const DynamicBrandedIcon = ({
  name,
  ...props
}: {
  name: keyof typeof BrandIcons;
}) => {
  const IconComponent = BrandIcons[name];

  if (!IconComponent) {
    // Return a default one
    return <BrandIcons.FaUser {...props} />;
  }

  return <IconComponent {...props} />;
};