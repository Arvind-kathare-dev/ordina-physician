"use client";

import { useState } from "react";
import clsx from "clsx";
import ConnectEmailModal from "../../model/ConnectEmailModal";
import EfaxModal from "../../model/EfaxModal";
import Button from "@/components/ui/button/Button";

// ─── Types ───────────────────────────────────────────────────────────────────

type Status = "connected" | "not_connected" | "not_configured";

interface GoogleAccount {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  initials: string;
}

interface SavedFax {
  faxNumber: string;
  label: string;
}

interface ChannelCardProps {
  title: string;
  label: string;
  type: string;
  optional?: boolean;
  description?: string;
  placeholder?: string;
  status: Status;
  avatarLetter?: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  dangerActionLabel?: string;
}

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig: Record<Status, { text: string; color: string; dot: string }> = {
  connected: { text: "Connected", color: "text-green-500", dot: "bg-green-500" },
  not_connected: { text: "Not Connected", color: "text-red-400", dot: "bg-red-400" },
  not_configured: { text: "Not Configured", color: "text-red-400", dot: "bg-red-400" },
};

// ─── Fax Icon ─────────────────────────────────────────────────────────────────

const FaxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0">
    <path d="M22 17H2a3 3 0 01-3-3V7a3 3 0 013-3h4l2 3h8l2-3h4a3 3 0 013 3v7a3 3 0 01-3 3z" />
    <path d="M6 14v.01M10 14v.01M14 14v.01M18 14v.01" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

export default function ChannelCard({
  title,
  label,
  type,
  optional,
  description,
  placeholder,
  status,
  primaryActionLabel,
  secondaryActionLabel,
  dangerActionLabel,
}: ChannelCardProps) {
  const isEmail = type === "Email";
  const isEfax = type === "eFax";

  // ── Modal open state ──
  const [modalOpen, setModalOpen] = useState(false);
  const [efaxModal, setEfaxModal] = useState(false);

  // ── Email: connected Google account ──
  const [connectedAccount, setConnectedAccount] = useState<GoogleAccount | null>(null);

  // ── eFax: saved fax data ──
  const [savedFax, setSavedFax] = useState<SavedFax | null>(null);

  // ── Derived status ──
  const isConnected = isEmail ? !!connectedAccount : isEfax ? !!savedFax : false;
  const currentStatus: Status = isConnected ? "connected" : status;
  const currentStatusData = statusConfig[currentStatus];

  // ── Handlers ──
  const handlePrimaryClick = () => {
    if (isEmail) setModalOpen(true);
    if (isEfax) setEfaxModal(true);
  };

  const handleAccountSelect = (account: GoogleAccount) => {
    setConnectedAccount(account);
    setModalOpen(false);
  };

  const handleEmailDisconnect = () => setConnectedAccount(null);

  const handleFaxSave = (faxNumber: string, faxLabel: string) => {
    setSavedFax({ faxNumber, label: faxLabel });
    setEfaxModal(false);
  };

  const handleFaxDisconnect = () => setSavedFax(null);

  return (
    <>
      <div className="w-full bg-white border border-ordinaBorder-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">

        {/* ── Header ── */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-gray-600 text-base font-medium flex items-center gap-3 flex-wrap">
              {title}
              <span
                className={clsx(
                  "text-xs px-[13px] py-[5px] rounded-lg text-gray-300",
                  label === "Primary"
                    ? "bg-green-200 text-green-400"
                    : "bg-gray-90 text-gray-400"
                )}
              >
                {label}
              </span>
              {optional && (
                <span className="text-xs bg-yellow-90 text-yellow-650 px-[13px] py-[5px] rounded-lg">
                  Optional
                </span>
              )}
              <span className="text-xs bg-gray-90 text-gray-400 px-[13px] py-[5px] rounded-lg">
                {type}
              </span>
            </h3>
            {description && (
              <p className="text-xs text-gray-400 mt-1">{description}</p>
            )}
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 text-xs flex-shrink-0 ml-2">
            <span className={clsx("w-2 h-2 rounded-full", currentStatusData.dot)} />
            <span className={currentStatusData.color}>{currentStatusData.text}</span>
          </div>
        </div>

        {/* ── Input / Display area ── */}
        <div className="mb-4">
          {/* Email: show connected Google account */}
          {isEmail && connectedAccount && (
            <div className="flex items-center gap-3 border border-gray-200 rounded-md px-3 py-2 bg-gray-50">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: connectedAccount.avatarColor }}
              >
                {connectedAccount.initials}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{connectedAccount.name}</p>
                <p className="text-xs text-gray-500 truncate">{connectedAccount.email}</p>
              </div>
            </div>
          )}

          {/* eFax: show saved fax number */}
          {isEfax && savedFax && (
            <div className="flex items-center gap-2.5 border border-gray-200 rounded-md px-3 py-2.5 bg-gray-50">
              {/* <FaxIcon /> */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800 truncate">{savedFax.faxNumber}</p>
                {savedFax.label && (
                  <p className="text-xs text-gray-500 truncate">{savedFax.label}</p>
                )}
              </div>
              {/* Connected pill */}
              <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full shrink-0">
                Verified
              </span>
            </div>
          )}

          {/* Default: placeholder input (no data yet) */}
          {!isConnected && (
            <input
              type="text"
              readOnly
              placeholder={placeholder}
              className="w-full font-normal border border-ordinaBorder-200 rounded-[8px] px-[17px] py-[15px] text-sm text-gray-300 placeholder-gray-300 bg-white cursor-default focus:outline-none"
            />
          )}
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-wrap gap-2">
          {/* Primary CTA — shown when not yet connected */}
          {!isConnected && (
            <Button
              onClick={handlePrimaryClick}
              variant={label === "Primary" ? "primary" : "outlinePrimary"}
              size="base"
              radius="md"
            >
              {primaryActionLabel}
            </Button>
          )}

          {/* Secondary — e.g. "Change Account" / "Edit" */}
          {isConnected && secondaryActionLabel && (
            <Button
              onClick={handlePrimaryClick}
              variant="secondary"
              radius="md"
            >
              {secondaryActionLabel}
            </Button>
          )}

          {/* Danger — disconnect */}
          {isConnected && dangerActionLabel && (
            <Button
              onClick={isEmail ? handleEmailDisconnect : handleFaxDisconnect}
              variant="danger"
              radius="md"
            >
              {dangerActionLabel}
            </Button>
          )}
        </div>
      </div>

      {/* ── Email modal ── */}
      {isEmail && (
        <ConnectEmailModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelect={handleAccountSelect}
          onAddAccount={() => {
            setModalOpen(false);
            alert("Redirect to Google OAuth to add a new account");
          }}
        />
      )}

      {/* ── eFax modal ── */}
      {isEfax && (
        <EfaxModal
          isOpen={efaxModal}
          onClose={() => setEfaxModal(false)}
          onSave={handleFaxSave}
        />
      )}
    </>
  );
}