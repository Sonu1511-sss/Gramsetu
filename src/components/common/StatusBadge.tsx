import React from 'react';
import { cn } from '../../utils/cn';

export type StatusVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'purple';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({ status, variant, className, dot = true }: StatusBadgeProps) {
  // Auto-detect variant from status name if not explicitly provided
  let resolvedVariant: StatusVariant = variant || 'neutral';

  const normalized = status.toLowerCase().replace(/_/g, ' ');

  if (!variant) {
    if (
      normalized.includes('completed') ||
      normalized.includes('resolved') ||
      normalized.includes('active') ||
      normalized.includes('passed') ||
      normalized.includes('implemented') ||
      normalized.includes('present')
    ) {
      resolvedVariant = 'success';
    } else if (
      normalized.includes('delayed') ||
      normalized.includes('critical') ||
      normalized.includes('urgent') ||
      normalized.includes('escalated') ||
      normalized.includes('absent')
    ) {
      resolvedVariant = 'danger';
    } else if (
      normalized.includes('risk') ||
      normalized.includes('pending') ||
      normalized.includes('in progress') ||
      normalized.includes('action') ||
      normalized.includes('high')
    ) {
      resolvedVariant = 'warning';
    } else if (
      normalized.includes('new') ||
      normalized.includes('assigned') ||
      normalized.includes('upcoming') ||
      normalized.includes('work order')
    ) {
      resolvedVariant = 'info';
    } else {
      resolvedVariant = 'neutral';
    }
  }

  const styles: Record<StatusVariant, { bg: string; text: string; dotColor: string; border: string }> = {
    success: {
      bg: 'bg-[#E8F5EF]',
      text: 'text-[#16865B]',
      border: 'border-[#16865B]/20',
      dotColor: 'bg-[#16865B]'
    },
    warning: {
      bg: 'bg-[#FEF6E7]',
      text: 'text-[#B54708]',
      border: 'border-[#F59E0B]/30',
      dotColor: 'bg-[#F59E0B]'
    },
    danger: {
      bg: 'bg-[#FEF3F2]',
      text: 'text-[#B42318]',
      border: 'border-[#DC3545]/20',
      dotColor: 'bg-[#DC3545]'
    },
    info: {
      bg: 'bg-[#EBF3FA]',
      text: 'text-[#1769AA]',
      border: 'border-[#1769AA]/20',
      dotColor: 'bg-[#1769AA]'
    },
    purple: {
      bg: 'bg-[#F4F3FF]',
      text: 'text-[#5925DC]',
      border: 'border-[#5925DC]/20',
      dotColor: 'bg-[#5925DC]'
    },
    neutral: {
      bg: 'bg-[#F2F4F7]',
      text: 'text-[#344054]',
      border: 'border-[#D0D5DD]',
      dotColor: 'bg-[#667085]'
    }
  };

  const current = styles[resolvedVariant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        current.bg,
        current.text,
        current.border,
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', current.dotColor)} />}
      <span className="capitalize">{status.replace(/_/g, ' ')}</span>
    </span>
  );
}

