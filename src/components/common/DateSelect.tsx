"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export type DatePreset = { value: string; label: string };

export const DASHBOARD_DATE_PRESETS: DatePreset[] = [
  { value: "today", label: "today" },
  { value: "7d", label: "last 7 days" },
  { value: "30d", label: "last 30 days" },
];

export const EFAX_DATE_PRESETS: DatePreset[] = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
];

type DateSelectProps = {
  value: string;
  onChange: (presetValue: string) => void;
  presets: DatePreset[];
  /** When set, shows muted label then the selected preset label (dashboard bands). */
  leadingLabel?: string;
  /**
   * When true, the trigger shows only the selected option label (e.g. eFax "Today").
   * When false and leadingLabel is set, shows "Date" + value.
   */
  compact?: boolean;
  className?: string;
  menuAlign?: "left" | "right";
  id?: string;
};

export default function DateSelect({
  value,
  onChange,
  presets,
  leadingLabel,
  compact = false,
  className = "",
  menuAlign = "right",
  id,
}: DateSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(() => {
    return presets.find((p) => p.value === value)?.label ?? presets[0]?.label ?? "";
  }, [presets, value]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const showLeading = Boolean(leadingLabel) && !compact;

  return (
    <div className={`relative shrink-0 ${className}`} ref={ref}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={
          showLeading
            ? `${leadingLabel}, ${selectedLabel}`
            : `Period, ${selectedLabel}`
        }
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border-[0.5px] border-[#E0E0E0] bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-sky-500/20 transition hover:bg-slate-50/80 focus-visible:ring-2 sm:py-[8px]"
      >
        {showLeading ? (
          <>
            <span className="text-slate-600">{leadingLabel}</span>
            <span className="font-semibold text-slate-900">{selectedLabel}</span>
          </>
        ) : (
          <span className="font-medium text-slate-800">{selectedLabel}</span>
        )}
        <HiChevronDown
          className={`size-4 shrink-0 text-slate-500 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          className={`absolute top-full z-30 mt-1 min-w-[9.5rem] rounded-[10px] border border-[#579EBA] bg-white py-1 text-sm shadow-lg ${
            menuAlign === "right" ? "right-0" : "left-0"
          }`}
        >
          {presets.map((p) => (
            <li key={p.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={p.value === value}
                className={`w-full px-3 py-2 text-left hover:bg-slate-50 ${
                  p.value === value ? "bg-sky-50 font-medium text-slate-900" : "text-slate-700"
                }`}
                onClick={() => {
                  onChange(p.value);
                  setOpen(false);
                }}
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
