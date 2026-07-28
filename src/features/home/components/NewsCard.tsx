import type { NewsItem } from '@/features/home/types';
import { formatDate } from '@/utils';

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer noopener"
      className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/50"
    >
      <img
        src={item.thumbnail}
        alt=""
        width={44}
        height={44}
        loading="lazy"
        className="h-11 w-11 shrink-0 rounded-md object-cover"
      />
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-medium leading-snug">{item.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {item.source} · {formatDate(item.publishedAt)}
        </p>
      </div>
    </a>
  );
}
