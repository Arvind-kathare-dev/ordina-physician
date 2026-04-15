"use client";

import Button from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (faxNumber: string, label: string) => void;
}

type VerificationState = "idle" | "sending" | "sent" | "confirmed";

// ─── Icons ───────────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const RadioChecked = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8" stroke="#4A90B8" strokeWidth="1.8" fill="white" />
    <circle cx="9" cy="9" r="4.5" fill="#4A90B8" />
  </svg>
);

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-ordinaBorder-200 rounded-xl p-5 bg-white">{children}</div>
);

const StepBadge = ({ label }: { label: string }) => (
  <span className="text-xs text-gray-500 border border-ordinaBorder-200 rounded-full px-3 py-1 bg-white font-medium">
    {label}
  </span>
);

// ─── Main Modal ──────────────────────────────────────────────────────────────

export default function EfaxModal({ isOpen, onClose, onSave }: Props) {
  const [faxNumber, setFaxNumber] = useState("");
  const [label, setLabel] = useState("");
  const [verificationState, setVerificationState] = useState<VerificationState>("idle");
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const resetState = () => {
    setFaxNumber("");
    setLabel("");
    setVerificationState("idle");
    setConfirmed(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSendTestFax = () => {
    if (!faxNumber.trim()) return;
    setVerificationState("sending");
    setTimeout(() => setVerificationState("sent"), 1200);
  };

  const handleConfirm = () => {
    if (verificationState === "sent") {
      setConfirmed(true);
      setVerificationState("confirmed");
    }
  };

  const handleSave = () => {
    onSave(faxNumber.trim(), label.trim());
    resetState();
    onClose();
  };

  const isSending = verificationState === "sending";

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="bg-white w-full max-w-[886px] rounded-2xl shadow-2xl my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="efax-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h2 id="efax-modal-title" className="text-lg font-semibold text-gray-900 leading-snug">
              Set up primary eFax
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Choose an existing fax number or get a new one, then verify with a test fax.
            </p>
          </div>
          <button onClick={handleClose} aria-label="Close" className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5 ml-4 shrink-0">
            <CloseIcon />
          </button>

        </div>

        {/* Body */}
        <div className="px-6 pb-6 flex flex-col gap-4">

          {/* Step 1 */}
          <SectionCard>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <RadioChecked />
                <span className="text-sm font-semibold text-gray-800">Use existing eFax number</span>
              </div>
              <StepBadge label="Step 1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              {/* <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Fax number</label>
                <input
                  type="tel"
                  value={faxNumber}
                  onChange={(e) => setFaxNumber(e.target.value)}
                  placeholder="eg. +1 212 565 0125"
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-[#4A90B8]/30 focus:border-[#4A90B8] transition-all"
                />
              </div> */}
              <Input
                label="Fax number"
                type="tel"
                value={faxNumber}
                onChange={(e) => setFaxNumber(e.target.value)}
                placeholder="eg. +1 212 565 0125"
                required
                fullWidth
              />
              {/* <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Label <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="eg. Main clinic fax"
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-[#4A90B8]/30 focus:border-[#4A90B8] transition-all"
                />
              </div> */}
              <Input
                label="Label (optional)"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="eg. Main clinic fax"
                required
                fullWidth
              />
            </div>

            <p className="text-xs text-gray-400">We&apos;ll send a test fax to verify this line.</p>
          </SectionCard>

          {/* Step 2 */}
          <SectionCard>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-800">Verification</span>
              <StepBadge label="Step 2" />
            </div>
            <p className="text-sm text-gray-500 mb-4">We will send a test fax. Confirm once received.</p>

            <button
              type="button"
              onClick={handleSendTestFax}
              disabled={!faxNumber.trim() || isSending || verificationState === "confirmed"}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: verificationState === "confirmed"
                  ? "#319F43"
                  : "linear-gradient(225.61deg, #579EBA 18.17%, #4F81B2 89.91%)",
              }}
            >
              {isSending ? "Sending…" : verificationState === "confirmed" ? "✓ Test fax sent" : "Send test fax"}
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={verificationState !== "sent"}
              className={`w-full border border-ordinaBorder-300 rounded-lg px-4 py-3 text-sm text-left transition-all duration-200 
                ${confirmed
                  ? "border-primary bg-[#4A90B8]/5 text-primary font-medium"
                  : verificationState === "sent"
                    ? "border-gray-200 bg-white text-gray-600 hover:border-[#4A90B8]/50 cursor-pointer"
                    : "border-gray-200 bg-white text-gray-300 cursor-not-allowed"}`}
            >
              {confirmed ? "✓ I received the test fax" : "I received the test fax"}
            </button>
          </SectionCard>

          {/* Fallback info */}
          <div className="input-border border-dashed  rounded-md px-5 py-4 ">
            <p className="text-sm text-gray-500 leading-relaxed">
              <span className="font-medium text-gray-600">Fallback logic:</span>{" "}
              If primary fails, Ordina retries once, then uses secondary (if configured).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">

          <Button variant="secondary" size="base" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="primary" onClick={handleSave}
            disabled={!confirmed} size="base" >
            Save eFax
          </Button>
        </div>
      </div>
    </div>
  );
}