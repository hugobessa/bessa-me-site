// design-sync shim for `next/image`.
//
// next/image needs Next's build pipeline and runtime image loader, neither of
// which exists inside the design-system bundle. The site only ever uses the
// plain raster form (`src` as a URL string, plus width/height/className/alt),
// so a straight <img> is a faithful stand-in: same box, same classes, same
// remote URL. Wired in via `paths` in .design-sync/tsconfig.sync.json.
import React from 'react';

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
    src={src}
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
