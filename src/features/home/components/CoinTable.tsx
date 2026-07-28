import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { CoinAvatar } from '@/features/home/components/CoinAvatar';
import { CoinPrice } from '@/features/home/components/CoinPrice';
import { PriceChange } from '@/features/home/components/PriceChange';
import { SparklineChart } from '@/features/home/components/SparklineChart';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatNumber } from '@/utils';
import { cn } from '@/lib/utils';
import type { MarketCoin } from '@/features/home/types';

export interface CoinTableProps {
  data: MarketCoin[];
  page: number;
  hasNextPage: boolean;
  isFetching: boolean;
  onPageChange: (page: number) => void;
}

/**
 * Sorting here operates on the currently loaded page only — CoinGecko's
 * `/coins/markets` supports server-side ordering by a limited set of
 * fields, not every visible column, so per-column sort works on the
 * fetched page while pagination still moves through the full ranked
 * list server-side. This mirrors how most CoinGecko-data dashboards
 * behave in practice.
 */
export function CoinTable({ data, page, hasNextPage, isFetching, onPageChange }: CoinTableProps) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<MarketCoin>[]>(
    () => [
      {
        id: 'rank',
        header: t('home.table.rank'),
        accessorKey: 'rank',
        cell: ({ getValue }) => (
          <span className="font-mono text-xs text-muted-foreground">
            {getValue<number | null>() ?? '—'}
          </span>
        ),
      },
      {
        id: 'coin',
        header: t('home.table.coin'),
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="flex min-w-0 items-center gap-2.5">
            <CoinAvatar image={row.original.image} name={row.original.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{row.original.name}</p>
              <p className="truncate text-xs uppercase text-muted-foreground">
                {row.original.symbol}
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'price',
        header: t('home.table.price'),
        accessorKey: 'priceUsd',
        cell: ({ getValue }) => <CoinPrice value={getValue<number | null>()} />,
      },
      {
        id: '1h',
        header: t('home.table.change1h'),
        accessorKey: 'priceChangePercentage1h',
        cell: ({ getValue }) => <PriceChange value={getValue<number | null>()} showIcon={false} />,
      },
      {
        id: '24h',
        header: t('home.table.change24h'),
        accessorKey: 'priceChangePercentage24h',
        cell: ({ getValue }) => <PriceChange value={getValue<number | null>()} showIcon={false} />,
      },
      {
        id: '7d',
        header: t('home.table.change7d'),
        accessorKey: 'priceChangePercentage7d',
        cell: ({ getValue }) => <PriceChange value={getValue<number | null>()} showIcon={false} />,
      },
      {
        id: 'marketCap',
        header: t('home.table.marketCap'),
        accessorKey: 'marketCapUsd',
        cell: ({ getValue }) => (
          <span className="font-mono text-xs tabular-nums text-foreground">
            {formatCurrency(getValue<number | null>(), { compact: true })}
          </span>
        ),
      },
      {
        id: 'volume',
        header: t('home.table.volume'),
        accessorKey: 'volumeUsd',
        cell: ({ getValue }) => (
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {formatNumber(getValue<number | null>())}
          </span>
        ),
      },
      {
        id: 'sparkline',
        header: t('home.table.sparkline'),
        accessorKey: 'sparkline',
        enableSorting: false,
        cell: ({ getValue }) => <SparklineChart data={getValue<number[]>()} />,
      },
    ],
    [t],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-xl border border-border">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-2.5 text-xs font-medium text-muted-foreground"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        disabled={!header.column.getCanSort()}
                        onClick={header.column.getToggleSortingHandler()}
                        className={cn(
                          'inline-flex items-center gap-1 whitespace-nowrap',
                          header.column.getCanSort() && 'cursor-pointer hover:text-foreground',
                        )}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() ? (
                          <ArrowUpDown
                            className={cn('h-3 w-3', header.column.getIsSorted() && 'text-accent')}
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={cn(isFetching && 'opacity-60 transition-opacity')}>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border/60 last:border-0 hover:bg-secondary/30"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border px-3 py-2.5">
        <span className="text-xs text-muted-foreground">{t('home.table.page', { page })}</span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            aria-label={t('home.table.prevPage')}
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={t('home.table.nextPage')}
            disabled={!hasNextPage}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
