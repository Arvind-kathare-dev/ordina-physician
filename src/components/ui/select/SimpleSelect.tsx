"use client";

import { useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface SimpleSelectProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  options?: Option[];
  value: string; // selected value
  onChange: (val: any) => void; // ✅ only value
  className?: string;
  onClick?: (val: string) => void;
}

export function SimpleSelect({
  label,
  required = false,
  placeholder = "Select",
  options = [],
  value,
  onChange,
  className = "",
}: SimpleSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // find selected option
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      
      {/* Label */}
      {label && (
        <label className="block text-sm text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div ref={ref} className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full input-padding flex items-center justify-between  border-[0.5px] border-border rounded-md  bg-white text-sm text-left focus:outline-none focus:ring-2 focus:ring-[#2b7eb0] min-h-[40px]"
        >
          <span className={selected ? "text-gray-800" : "text-gray-400"}>
            {selected?.label || placeholder}
          </span>

          <svg
            className="w-4 h-4 text-gray-500 ml-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {open && options.length > 0 && (
          <div className="absolute z-50 left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
            {options.map((opt) => (
              <button
                key={opt.value} // ✅ fixed
                type="button"
                onClick={() => {
                  onChange(opt.value); // ✅ only value
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                  value === opt.value ? "bg-gray-100 font-medium" : "text-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}