// components/Select.tsx
"use client";

import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Select Box */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            w-full
            appearance-none
            rounded-md
            border-[0.5px] border-border
            bg-white
            input-padding
            text-gray-400
            focus:outline-none
            focus:ring-1 focus:ring-primary
            focus:border-primary
            transition
          "
        >
          <option value="" disabled>
            Select {label}
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          ▼
        </div>
      </div>
    </div>
  );
};

export default Select;