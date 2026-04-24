"use client";

import { useEffect, useRef } from "react";

interface GoogleAccount {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  initials: string;
}

const ACCOUNTS: GoogleAccount[] = [
  {
    id: "1",
    name: "Michael Anderson",
    email: "michael.anderson1989@gmail.com",
    avatarColor: "#9B59B6",
    initials: "MA",
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.johnson.dev@gmail.com",
    avatarColor: "#2ECC71",
    initials: "EJ",
  },
  {
    id: "3",
    name: "Daniel Carter",
    email: "daniel.carter.us@gmail.com",
    avatarColor: "#F39C12",
    initials: "DC",
  },
  {
    id: "4",
    name: "Sophia Martinez",
    email: "sophia.martinez01@gmail.com",
    avatarColor: "#1ABC9C",
    initials: "SM",
  },
  {
    id: "5",
    name: "William Thompson",
    email: "william.thompson.work@gmail.com",
    avatarColor: "#E67E22",
    initials: "WT",
  },
  {
    id: "6",
    name: "Olivia Brown",
    email: "olivia.brown.mail@gmail.com",
    avatarColor: "#3498DB",
    initials: "OB",
  },
  {
    id: "7",
    name: "Michael",
    email: "michael.anderson@gmail.com",
    avatarColor: "#E91E63",
    initials: "M",
  },
  {
    id: "8",
    name: "Michael Work",
    email: "mike.anderson.work@gmail.com",
    avatarColor: "#CD853F",
    initials: "MW",
  },
  {
    id: "9",
    name: "Michael A",
    email: "michael.anderson.us@gmail.com",
    avatarColor: "#E74C3C",
    initials: "MA",
  },
];

interface ConnectEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (account: GoogleAccount) => void;
  onAddAccount: () => void;
  /** Highlights the last row (like "Michael A" in the screenshot) */
  // highlightedAccountId?: string;
}

export default function ConnectEmailModal({
  isOpen,
  onClose,
  onSelect,
  onAddAccount,
  // highlightedAccountId = "9",
}: ConnectEmailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  /* close on overlay click */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  /* close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    /* ── Overlay ── */
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      aria-modal="true"
      role="dialog"
      aria-label="Choose a Google account"
    >
      {/* ── Modal card ── */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] mx-4 overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        {/* Scrollable account list */}
        <ul className="overflow-y-auto divide-y divide-transparent">
          {ACCOUNTS.map((account) => {
            // const isHighlighted = account.id === highlightedAccountId;
            return (
              <li key={account.id}>
                <button
                  type="button"
                  onClick={() => onSelect(account)}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors duration-100 hover:bg-gray-100
                   
                  `}
                >
                  {/* Avatar */}
                  <span
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm select-none"
                    style={{ backgroundColor: account.avatarColor }}
                  >
                    {account.initials}
                  </span>

                  {/* Text */}
                  <span className="flex flex-col min-w-0">
                    <span className="text-[15px] font-semibold text-gray-900 leading-tight truncate">
                      {account.name}
                    </span>
                    <span className="text-sm text-gray-500 truncate">
                      {account.email}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}

          {/* Add Account row */}
          <li>
            <button
              type="button"
              onClick={onAddAccount}
              className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-100"
            >
              {/* + circle */}
              <span className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold text-gray-900">
                Add Account
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}