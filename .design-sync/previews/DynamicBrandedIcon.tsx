import { DynamicBrandedIcon } from 'bessa-me-site';

// The icon inherits font-size (react-icons defaults to 1em) and currentColor,
// so every cell sets those on a wrapper rather than on the component.

export const BrandIcons = () => (
  <div className="flex items-center gap-6 p-6 text-3xl text-orange-600">
    <DynamicBrandedIcon name="FaGithub" title="GitHub" />
    <DynamicBrandedIcon name="FaLinkedin" title="LinkedIn" />
    <DynamicBrandedIcon name="FaXTwitter" title="X" />
    <DynamicBrandedIcon name="FaInstagram" title="Instagram" />
    <DynamicBrandedIcon name="FaStackOverflow" title="Stack Overflow" />
    <DynamicBrandedIcon name="FaDev" title="dev.to" />
  </div>
);

export const InlineWithLabels = () => (
  <div className="p-6 space-y-3 text-gray-700">
    {[
      { name: 'FaGithub', label: 'github.com/hugobessa' },
      { name: 'FaLinkedin', label: 'linkedin.com/in/hugobessa' },
      { name: 'FaEnvelope', label: 'hugo@bessa.me' },
    ].map(({ name, label }) => (
      <div key={name} className="flex items-center gap-3 text-base">
        <DynamicBrandedIcon name={name} className="text-orange-600" />
        <span>{label}</span>
      </div>
    ))}
  </div>
);

export const Sizes = () => (
  <div className="flex items-end gap-6 p-6 text-orange-600">
    <DynamicBrandedIcon name="FaGithub" size={16} />
    <DynamicBrandedIcon name="FaGithub" size={24} />
    <DynamicBrandedIcon name="FaGithub" size={32} />
    <DynamicBrandedIcon name="FaGithub" size={48} />
  </div>
);

// An unrecognised name is not an error: the component falls back to FaUser.
export const UnknownNameFallsBackToUser = () => (
  <div className="flex items-center gap-6 p-6 text-3xl text-gray-500">
    <DynamicBrandedIcon name="FaGithub" />
    <DynamicBrandedIcon name="NotARealIconName" />
  </div>
);
