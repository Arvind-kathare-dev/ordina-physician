// components/ConnectEHRModal.tsx
"use client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAuthorize: () => void;
}

export default function ConnectEHRModal({
  isOpen,
  onClose,
  onAuthorize,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

        {/* Title */}
        <h2 className="text-lg font-semibold mb-2">Connect NextGen</h2>

        {/* Content */}
        <p className="text-sm text-gray-500 mb-2">
          Ordina will securely access:
        </p>

        <ul className="text-sm text-gray-500 list-disc pl-5 mb-3 space-y-1">
          <li>Patient demographics</li>
          <li>Encounter summaries (read-only)</li>
          <li>Provider identifiers</li>
        </ul>

        <p className="text-xs text-gray-400 mb-5">
          HIPAA-compliant • OAuth 2.0 • Secure & encrypted
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={onAuthorize}
            className="px-4 py-2 text-sm bg-primary-gradient text-white rounded-md"
          >
            Authorize & Connect
          </button>
        </div>
      </div>
    </div>
  );
}