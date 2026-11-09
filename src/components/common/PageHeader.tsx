import React from 'react';
import { cn } from '../../utils/cn';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  statusBadge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  statusBadge,
  actions,
  className
}: PageHeaderProps) {
  const displayBadge = statusBadge || badge;

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#E4E7EC]',
        className
      )}
    >
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-[#17212B] tracking-tight leading-snug">
            {title}
          </h1>
          {displayBadge}
        </div>
        {description && (
          <p className="text-xs sm:text-sm text-[#667085] mt-1 font-normal max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
