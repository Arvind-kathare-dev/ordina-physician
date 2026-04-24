"use client";

import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export const DEFAULT_LOCATIONS = [
  "San Jose",
  "San Francisco",
  "Los Angeles",
] as const;

type LocationSelectProps = {
  value: string;
  onChange: (location: string) => void;
  options?: readonly string[];
  className?: string;
  menuAlign?: "left" | "right";
  id?: string;
};

export default function LocationSelect({
  value,
  onChange,
  options = DEFAULT_LOCATIONS,
  className = "",
  menuAlign = "right",
  id,
}: LocationSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div className={`relative min-w-0 ${className}`} ref={ref}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Location, ${value}`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full max-w-[14rem] items-center justify-between gap-2 rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white px-3  text-left text-sm text-slate-800 outline-none ring-sky-500/20 transition hover:bg-slate-50/80 focus-visible:ring-2 sm:min-w-[14rem] h-11"
      >
        <span className="min-w-0 truncate">
          <span className="text-[#9B9B9B]">Location </span>
          <span className="font-semibold text-[#606060]">{value}</span>
        </span>
        <HiChevronDown
          className={`size-4 shrink-0 text-[#606060] transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label="Locations"
          className={`absolute top-full z-30 mt-1 max-h-60 min-w-full overflow-auto rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white py-1 text-sm shadow-lg ${
            menuAlign === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((opt) => (
            <li key={opt} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={opt === value}
                className={`w-full px-3 py-2 text-left hover:bg-slate-50 ${
                  opt === value ? "bg-sky-50 font-medium text-slate-900" : "text-slate-700"
                }`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
