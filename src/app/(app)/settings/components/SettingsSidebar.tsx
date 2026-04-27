"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { SettingsSection } from "../hooks/useSettings";
import { mainItems, profileItems } from "../constant/data";

interface Props {
  activeSection: SettingsSection;
  setActiveSection: (val: SettingsSection) => void;
  profileExpanded: boolean;
  setProfileExpanded: (val: boolean) => void;
}

export default function SettingsSidebar({
  activeSection,
  setActiveSection,
  profileExpanded,
  setProfileExpanded,
}: Props) {


  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 ">
          <h2 className="text-xs font-bold text-[#858585] uppercase tracking-wider">
            Settings Menu
          </h2>
        </div>

        {/* Profile Section */}
        <div className="border-b border-gray-100 last:border-0">
          <button
            onClick={() => setProfileExpanded(!profileExpanded)}
            className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-gray-100 transition-colors"
          >
            <span className="text-[15px] font-semibold text-[#4a4a4a]">Profile Settings</span>

            {profileExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {profileExpanded && (
            <div className=" py-1">
              {profileItems?.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full px-8 py-2.5 flex justify-between items-center text-sm transition-all ${activeSection === item.key
                    ? "bg-[#E8F4FC] text-[#528DB5] font-semibold border-r-4 border-[#528DB5]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  <span>{item.label}</span>
                  {item.sub && (
                    <span className="text-[10px] text-gray-400 font-normal uppercase tracking-tighter">
                      {item.sub}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:divide-y lg:divide-gray-100">
          {mainItems?.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full px-4 py-3.5 text-left text-[15px] font-semibold transition-all ${activeSection === item.key
                ? "bg-[#E8F4FC] text-[#528DB5]"
                : "text-[#4a4a4a] hover:bg-gray-100"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}