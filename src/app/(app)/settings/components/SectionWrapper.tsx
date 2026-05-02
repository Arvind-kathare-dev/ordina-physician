"use client";

import { ChevronDown, LucideIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: React.ReactNode;
  badgeText?: string;
  badgeVariant?: "success" | "warning";
  headerAction?: React.ReactNode;
}

export default function SectionWrapper({
  title,
  description,
  icon: Icon,
  children,
  badgeText,
  badgeVariant = "warning",
  headerAction,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-4 sm:p-5 rounded-[20px] border border-gray-200 mx-0 sm:mx-6 mb-6 bg-white overflow-visible transition-all duration-300">
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isOpen ? 'border-b border-gray-100 pb-4 sm:pb-5 -mx-4 sm:-mx-5 px-4 sm:px-5 mb-5' : 'mb-0'}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
            <Icon size={20} className="text-[#4a4a4a]" />
          </div>
          <div className="min-w-0 w-fit">
            <h2 className="text-[15px] font-bold text-[#1a1a1a] leading-tight">{title}</h2>
            <p className="text-[13px] text-[#858585] mt-1 w-auto max-w-[600px]">{description}</p>
          </div>
        </div>

        <div className="flex w-fit items-center gap-3 self-start sm:self-center mt-2 sm:mt-0">
          {badgeText && (
            <span className={`text-[11px] font-normal px-3 py-2 rounded-full ${badgeVariant === "success" ? "bg-[#e7f8f2] text-[#42b883]" : "bg-amber-50 text-amber-700"
              }`}>
              {badgeText}
            </span>
          )}

          {headerAction}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition shadow-sm cursor-pointer"
          >
            <ChevronDown
              className={`w-4 h-4 text-[#606060] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className={isOpen ? "overflow-visible" : "overflow-hidden"}>
          {children}
        </div>
      </div>
    </div>
  );
}