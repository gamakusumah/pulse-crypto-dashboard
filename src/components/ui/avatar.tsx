import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt: string;
  size?: number;
}

/**
 * Minimal image-with-fallback avatar. Coin logos come from
 * user-generated CoinGecko assets and occasionally 404, so this
 * degrades to an initial-letter badge rather than a broken image icon.
 */
export function Avatar({ src, alt, size = 28, className, ...props }: AvatarProps) {
  const [failed, setFailed] = React.useState(false);
  const showFallback = !src || failed;

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground',
        className,
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      {showFallback ? (
        alt.charAt(0).toUpperCase()
      ) : (
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </span>
  );
}
