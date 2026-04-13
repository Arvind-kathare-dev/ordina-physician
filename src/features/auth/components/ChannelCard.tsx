"use client";

import clsx from "clsx";
import { Input } from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";

type Status = "connected" | "not_connected" | "not_configured";

interface ChannelCardProps {
  title: string;
  label: string; // Primary / Secondary
  type: string; // Email / eFax
  optional?: boolean;
  description?: string;
  placeholder?: string;
  status: Status;
  avatarLetter?: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  dangerActionLabel?: string;
}

const statusConfig: Record<
  Status,
  { text: string; color: string; dot: string }
> = {
  connected: {
    text: "Connected",
    color: "text-green-400",
    dot: "bg-green-500",
  },
  not_connected: {
    text: "Not Connected",
    color: "text-red-400",
    dot: "bg-red-500",
  },
  not_configured: {
    text: "Not Configured",
    color: "text-red-500",
    dot: "bg-red-500",
  },
};

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
  const statusData = statusConfig[status];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-sm  flex items-center gap-2">
            {title}
            <span
              className={`text-xs ${label === "Primary" ? "bg-green-200 text-green-400" : ""}bg-gray-100 px-2 py-0.5 rounded`}
            >
              {label}
            </span>
            {optional && (
              <span className="text-xs bg-yellow-100 text-yellow-400 px-[13px] py-[5px] rounded">
                Optional
              </span>
            )}
            <span className="text-xs text-gray-500">{type}</span>
          </h3>

          {description && (
            <p className="text-xs text-gray-400 mt-1">{description}</p>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center gap-1 text-xs">
          <span className={clsx("w-2 h-2 rounded-full", statusData.dot)} />
          <span className={clsx(statusData.color)}>{statusData.text}</span>
        </div>
      </div>

      {/* Input / Display */}
      <div className="flex items-center gap-3 mb-4">
        <Input type="text" placeholder={placeholder} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="primary">{primaryActionLabel}</Button>

        {secondaryActionLabel && (
          <Button variant="secondary">{secondaryActionLabel}</Button>
        )}

        {dangerActionLabel && (
          <Button variant="danger">{dangerActionLabel}</Button>
        )}
      </div>
    </div>
  );
}
