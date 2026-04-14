'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import ConnectEHRModal from '../model/ConnectEHRModal';

type Status = 'connected' | 'not_connected';

interface EHRCardProps {
  name: string;
  logo?: React.ReactNode;
  status?: Status;
  description: string;
  onSelect?: (name: string) => void; // ✅ NEW
}

const statusConfig = {
  connected: {
    label: 'Connected',
    color: 'text-green-600',
    dot: 'bg-green-500',
  },
  not_connected: {
    label: 'Not Connected',
    color: 'text-orange-500',
    dot: 'bg-orange-500',
  },
};

export default function EHRCard({
  name,
  logo,
  description,
  status = 'not_connected',
  onSelect,
}: EHRCardProps) {
  const [currentStatus, setCurrentStatus] = useState<Status>(status);
  const [open, setOpen] = useState(false);

  const statusData = statusConfig[currentStatus];

  const handleConnect = () => {
    if (currentStatus === 'connected') {
      setCurrentStatus('not_connected');
      onSelect?.(''); // optional reset
    } else {
      setOpen(true);
    }
  };

  const handleAuthorize = () => {
    setCurrentStatus('connected');
    setOpen(false);

    onSelect?.(name); // ✅ parent ko batao kaunsa select hua
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-4 w-full shadow-sm hover:shadow-md transition-all">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          {logo ? (
            <div className="h-5 w-auto">{logo}</div> 
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

        {/* Button */}
        <button
          onClick={handleConnect}
          className={clsx(
            'w-full py-2 text-sm rounded-md font-medium transition-all',
            currentStatus === 'connected'
              ? 'border border-red-200 text-red-500 hover:bg-red-50'
              : 'bg-primary-gradient text-white'
          )}
        >
          {currentStatus === 'connected' ? 'Disconnect' : 'Connect'}
        </button>
      </div>

      {/* Modal */}
      <ConnectEHRModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAuthorize={handleAuthorize}
      />
    </>
  );
}