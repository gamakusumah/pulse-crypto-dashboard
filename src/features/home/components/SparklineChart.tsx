import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Renders a minimal SVG polyline. Deliberately dependency-free (no
 * charting library) since a sparkline is just two numbers' worth of
 * visual information repeated ~100 times per page — recharts/d3 would
 * be a lot of weight for that.
 */
export function SparklineChart({ data, width = 120, height = 36, className }: SparklineChartProps) {
  const { points, isPositive } = useMemo(() => {
    if (data.length < 2) return { points: '', isPositive: true };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const coords = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    });

    return { points: coords.join(' '), isPositive: data[data.length - 1] >= data[0] };
  }, [data, width, height]);

  if (!points) {
    return (
      <div
        className={cn(
          'flex items-center justify-center text-[10px] text-muted-foreground',
          className,
        )}
        style={{ width, height }}
      >
        —
      </div>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={isPositive ? 'Tren 7 hari naik' : 'Tren 7 hari turun'}
    >
      <polyline
        points={points}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isPositive ? 'stroke-success' : 'stroke-danger'}
      />
    </svg>
  );
}
