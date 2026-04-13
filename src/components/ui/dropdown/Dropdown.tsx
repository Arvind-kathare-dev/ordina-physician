"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { DropdownProps } from "@/types/dropdown.types";



export default function Dropdown({
  options,
  value,
  placeholder = "Select",
  onChange,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

 const selected = (options ?? []).find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${className}`}
    >
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex text-grayCustom-600 items-center justify-between gap-1 px-2 py-1 w-24 bg-white border border-boxBorder rounded-[5px] shadow-sm text-xs font-normal hover:bg-gray-50 focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-gray-700">
          {selected?.label || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform text-grayCustom-600 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border border-boxBorder rounded-[5px]  z-50">
          <ul role="listbox" className="py-1">
            {options?.map((option) => (
              <li
                key={option.value}
                role="option"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="px-2 py-1 text-xs text-grayCustom-600 cursor-pointer hover:bg-gray-100"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}