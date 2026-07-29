// design-sync shim for `next/image`.
//
// next/image needs Next's build pipeline and runtime image loader, neither of
// which exists inside the design-system bundle. The site only ever uses the
// plain raster form (`src` as a URL string, plus width/height/className/alt),
// so a straight <img> is a faithful stand-in: same box, same classes, same
// remote URL. Wired in via `paths` in .design-sync/tsconfig.sync.json.
import React from 'react';

/* Site-root asset paths only resolve when something is serving the site's
 * public/ directory. Nothing is: not a preview card, and not a design the
 * claude.ai/design agent builds out of these components — both would render a
 * broken image. Components that reference site assets by root-relative path
 * (today: Hero's portrait, `/imgs/my-pic.png`) are pointed at the deployed
 * origin instead, which serves the identical file.
 *
 * Inlining the bytes as a data URI was the alternative; at 768 KB for the
 * portrait alone it would have cost more than a third of the whole bundle.
 *
 * Only bare root-relative paths are rewritten — `//host/…` and absolute URLs
 * (the Notion-hosted logos and covers) pass through untouched. */
const SITE_ORIGIN = 'https://bessa.me';

const resolveSrc = (src: string): string =>
  src.startsWith('/') && !src.startsWith('//') ? `${SITE_ORIGIN}${src}` : src;

export type ImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height'
> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  loader?: unknown;
  sizes?: string;
};

const Image = ({
  src,
  alt,
  width,
  height,
  fill,
  // Next-only props: accepted so callers type-check, dropped so they never
  // reach the DOM as unknown attributes.
  priority: _priority,
  quality: _quality,
  unoptimized: _unoptimized,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  loader: _loader,
  style,
  ...props
}: ImageProps) => (
  <img
    src={resolveSrc(src)}
    alt={alt}
    width={fill ? undefined : width}
    height={fill ? undefined : height}
    style={
      fill
        ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style }
        : style
    }
    {...props}
  />
);

export default Image;
