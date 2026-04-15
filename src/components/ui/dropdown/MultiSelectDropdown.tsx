"use client";

import { useEffect, useRef, useState } from "react";

interface MultiSelectDropdownProps {
  options: string[];
  placeholder: string;
  value: string[];
  onChange: (val: string[]) => void;
}
 
export function MultiSelectDropdown({ options, placeholder, value, onChange }: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };
 
  const displayText = value.length === 0 ? "" : value.join(", ");
 
  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white text-sm text-left focus:outline-none focus:ring-2 focus:ring-[#2b7eb0] min-h-[40px]"
      >
        <span className={displayText ? "text-gray-800 truncate" : "text-gray-400"}>
          {displayText || placeholder}
        </span>
        <svg className="w-4 h-4 text-gray-500 ml-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
 
      {open && (
        <div className="absolute z-50 left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={value.includes(opt)}
                onChange={() => toggle(opt)}
                className="w-4 h-4 rounded border-gray-300 accent-[#2b7eb0]"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}