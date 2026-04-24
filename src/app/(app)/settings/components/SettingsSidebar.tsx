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
    <div className="w-80">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-medium text-ordina-400 uppercase">
            SETTINGS
          </h2>
        </div>

        {/* Profile Section */}
        <div className="">
          <button
            onClick={() => setProfileExpanded(!profileExpanded)}
            className="w-full px-4 py-3 flex justify-between items-center border-transparent border-[0.5px] hover:border-ordinaBorder-250 transition-colors"
          >
            <span className="text-base font-medium text-black">Profile</span>

            {profileExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {profileExpanded && (
            <div className="pb-2">
              {profileItems?.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full  px-4 py-2.5 flex justify-between items-center text-sm  ${activeSection === item.key
                    ? "bg-grayCustom-340 text-gray-900"
                    : "text-gray-600 bg-grayCustom-330"
                    }`}
                >
                  <span>{item.label}</span>
                  {item.sub && (
                    <span className="text-xs text-gray-300">{item.sub}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Sections */}
        {mainItems?.map((item, index) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`w-full px-4 py-3 text-black border-[0.5px]  text-left text-base font-semibold transition-colors  ${activeSection === item.key
              ? " border-ordinaBorder-250"
              : " hover:border-ordinaBorder-250 border-transparent"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}