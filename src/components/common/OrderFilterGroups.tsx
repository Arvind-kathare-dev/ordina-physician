"use client";

import type { ReactNode } from "react";
import { FilterChipRow } from "./FilterChipRow";

export type FilterSubItem = {
  id: string;
  label: string;
  count?: string | number;
  countVariant?: "default" | "danger";
};

export type FilterSection = {
  title: string;
  titleCount: string | number;
  items: FilterSubItem[];
};

type TabGroupCardProps = {
  section: FilterSection;
  activeId: string;
  onChange: (id: string) => void;
  emphasized?: boolean;
  className?: string;
};

function CountBadge({ value }: { value: string | number }) {
  return (
    <span className="inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-[#E6E6E6] px-1 text-[9px] font-semibold leading-none text-[#858585] sm:h-[18px] sm:min-w-[18px] sm:text-[10px]">
      {value}
    </span>
  );
}

export function TabGroupCard({
  section,
  activeId,
  onChange,
  emphasized = false,
  className = "",
}: TabGroupCardProps) {
  const n = section.items.length;
  const gridCols =
    n === 1
      ? "grid-cols-1"
      : n === 2
        ? "grid-cols-2"
        : "grid-cols-3";

  return (
    <div
      className={`flex h-full p-4 min-w-0 w-full flex-row items-center justify-center rounded-xl bg-white ${
        emphasized
          ? "border border-[#528DB5BF] shadow-[2px_2px_8px_rgba(0,0,0,0.10)]"
          : "border border-[#CDCDCD] shadow-[2px_2px_8px_rgba(0,0,0,0.10)]"
      } ${className}`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-[12px] font-semibold text-[#858585] sm:text-[16px]">
            {section.title}
          </span>
          <CountBadge value={section.titleCount} />
        </div>
      </div>

      <div className={`flex justify-end w-full gap-1.5 ${gridCols}`}>
        {section.items.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex min-h-[2.5rem] px-4 py-2 cursor-pointer w-fit min-w-0 flex-col items-center justify-center gap-2 rounded-full border-[0.5px] text-center text-[12px] font-medium leading-tight transition sm:min-h-10 sm:flex-row sm:text-[15px] sm:leading-none ${
                active
                  ? "border-[#528DB5BF] bg-white text-[#528DB5BF] shadow-[2px_2px_10px_rgba(0,0,0,0.10)]"
                  : "border-[#CDCDCD] bg-white text-[#858585] shadow-[2px_2px_10px_rgba(0,0,0,0.10)] hover:bg-[#F5F5F5]"
              }`}
            >
              <span className="max-w-full truncate">{item.label}</span>
              {item.count !== undefined &&
                item.count !== "" &&
                (item.countVariant === "danger" ? (
                  <span className="inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-[#FF383C] px-1.5 text-[9px] font-bold leading-none text-white sm:h-[18px] sm:min-w-[18px] sm:text-[10px]">
                    {item.count}
                  </span>
                ) : active ? (
                  <span className="inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full border-[0.5px] border-[#528DB5BF] bg-white px-1.5 text-[9px] font-semibold leading-none text-[#858585] sm:h-[18px] sm:min-w-[18px] sm:text-[10px]">
                    {item.count}
                  </span>
                ) : (
                  <span className="inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-[#E6E6E6] px-1.5 text-[9px] font-semibold leading-none text-[#858585] sm:h-[18px] sm:min-w-[18px] sm:text-[10px]">
                    {item.count}
                  </span>
                ))}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type TimeChipItem = { id: string; label: string };

type TimeFilterBarProps = {
  items: TimeChipItem[];
  activeId: string;
  onChange: (id: string) => void;
  trailing?: ReactNode;
  className?: string;
};

export function TimeFilterBar({
  items,
  activeId,
  onChange,
  trailing,
  className = "",
}: TimeFilterBarProps) {
  return (
    <div
      className={`flex w-full min-w-0 flex-row items-center justify-center gap-2 my-4 ${className}`}
    >
      <FilterChipRow items={items} activeId={activeId} onChange={onChange} />
      {trailing ? (
        <div className="flex shrink-0 items-center justify-end gap-1.5 border-t border-slate-100 pt-2 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
          {trailing}
        </div>
      ) : null}
    </div>
  );
}
