import { cn } from '../../utils/cn';

export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-md',
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-5 rounded-xl border border-[#E4E7EC] space-y-3">
      <SkeletonLoader className="h-4 w-1/3" />
      <SkeletonLoader className="h-8 w-1/2" />
      <SkeletonLoader className="h-3 w-3/4" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-xl border border-[#E4E7EC] overflow-hidden p-4 space-y-3">
      <div className="flex gap-4 border-b pb-3">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonLoader key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 py-2 border-b border-gray-50 last:border-0">
          {Array.from({ length: cols }).map((_, c) => (
            <SkeletonLoader key={c} className="h-5 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
