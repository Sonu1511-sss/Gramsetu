import React from 'react';
import { FolderSearch2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionText,
  onAction,
  className
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'p-10 sm:p-14 text-center bg-white rounded-xl border border-dashed border-[#D0D5DD] flex flex-col items-center justify-center my-4',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#667085] mb-3">
        {icon || <FolderSearch2 className="w-6 h-6" />}
      </div>
      <h3 className="text-sm sm:text-base font-bold text-[#17212B] mb-1">{title}</h3>
      <p className="text-xs text-[#667085] max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

