import { Avatar } from '@/components/ui/Avatar';
import type { CoinAvatarProps } from './CoinAvatar.type';

/** Thin, feature-scoped wrapper around the generic `Avatar` primitive. */
export function CoinAvatar({ image, name, size = 28 }: CoinAvatarProps) {
  return <Avatar src={image} alt={name} size={size} />;
}
