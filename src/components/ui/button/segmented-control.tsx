// components/ui/segmented-control.tsx
"use client";

import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

type SegmentedControlProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center bg-white shadow-card-shadow rounded-full p-1.5",
        "w-fit",
        className
      )}
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={clsx(
              "px-14 py-2 text-base font-semibold rounded-full transition-all duration-200",
              "whitespace-nowrap",
              isActive
                ? "bg-ordinadark text-white shadow-sm"
                : "text-grayCustom-500 hover:text-grayCustom-600"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}