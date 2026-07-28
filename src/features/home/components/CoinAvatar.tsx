import { Avatar } from '@/components/ui/avatar';

export interface CoinAvatarProps {
  image: string;
  name: string;
  size?: number;
}

/** Thin, feature-scoped wrapper around the generic `Avatar` primitive. */
export function CoinAvatar({ image, name, size = 28 }: CoinAvatarProps) {
  return <Avatar src={image} alt={name} size={size} />;
}
