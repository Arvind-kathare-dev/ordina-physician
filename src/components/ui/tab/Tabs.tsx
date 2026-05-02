"use client";

import { TabItem } from "@/types/tabs.types";


interface TabsProps {
  tabs: TabItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  rightSection?: React.ReactNode;
}

export default function Tabs({
  tabs,
  activeIndex,
  onChange,
  rightSection,
}: TabsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-2">

      {/* LEFT: Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide w-full max-w-full">
        {tabs.map((tab, i) => {
          const isActive = activeIndex === i;

          return (
            <button
              key={tab.label}
              onClick={() => onChange(i)}
              className={`flex justify-center items-center gap-1.5 px-4 py-2.5 text-lg font-medium whitespace-nowrap border-b-2 transition-colors 
  ${tab.label === "Today" ? "w-[200px]" : "w-auto  px-6"} 
  ${isActive
                  ? "border-ordinadark text-ordinadark"
                  : "border-transparent text-grayCustom-500 hover:text-grayCustom-600"
                }`}
            >
              {tab.label}

              {tab.count !== null && tab.count !== undefined && (
                <span
                  className={`text-xs font-normal px-1.5 py-0.5 rounded-full ${tab.alert
                    ? "bg-red-500 text-white"
                    : isActive
                      ? "bg-ordina-220 text-ordinadark"
                      : "bg-grayCustom-220 text-grayCustom-500"
                    }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* RIGHT: Actions */}
      {rightSection && (
        <div className="flex items-center justify-start sm:justify-end gap-2 pb-1 w-full sm:w-auto mt-2 sm:mt-0">
          {rightSection}
        </div>
      )}
    </div>
  );
}