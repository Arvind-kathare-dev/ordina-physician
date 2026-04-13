'use client';

import React from 'react';
import clsx from 'clsx';

type Status = 'connected' | 'not_connected';

interface EHRCardProps {
  name: string;
  logo?: React.ReactNode;
  status: Status;
  description: string;
  onConnect?: () => void;
}

const statusConfig = {
  connected: {
    label: 'Connected',
    color: 'text-green-600',
    dot: 'bg-green-500',
  },
  not_connected: {
    label: 'Not Connected',
    color: 'text-red-500',
    dot: 'bg-red-500',
  },
};

export default function EHRCard({
  name,
  logo,
  status,
  description,
  onConnect,
}: EHRCardProps) {
  const statusData = statusConfig[status];

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-4 w-full shadow-sm hover:shadow-md transition-all">

      
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        {logo ? (
          <div className="h-5">{logo}</div>
        ) : (
          <span className="text-sm font-semibold text-gray-700">{name}</span>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-1 text-xs mb-2">
        <span className={clsx('w-2 h-2 rounded-full', statusData.dot)} />
        <span className={clsx(statusData.color)}>
          {statusData.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Action */}
      <button
        onClick={onConnect}
        className="w-full py-2 text-sm rounded-md bg-primary-gradient text-white font-medium hover:bg-primary-gradient transition-all"
      >
        Connect
      </button>
    </div>
  );
}