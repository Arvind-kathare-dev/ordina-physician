"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { SettingsSection } from "../hooks/useSettings";

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
  // 🔹 Profile Sub-sections
  const profileItems: { key: SettingsSection; label: string; sub?: string }[] = [
    { key: "pecos", label: "PECOS", sub: "NPI / PECOS" },
    { key: "information", label: "Information", sub: "Details" },
    { key: "order-delivery", label: "Order delivery prefer..", sub: "Details" },
    { key: "integration", label: "Integration", sub: "Details" },

  ];

  // 🔹 Main Sections
  const mainItems: { key: SettingsSection; label: string }[] = [
    { key: "returned-days", label: "Returned-in Days Thre.." },
    { key: "manage-users", label: "Manage Users" },
    { key: "subscriptions", label: "Subscriptions" },
    { key: "vendor-settings", label: "Vendor Settings" },
  ];

  return (
    <div className="w-80">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            SETTINGS
          </h2>
        </div>

        {/* Profile Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => setProfileExpanded(!profileExpanded)}
            className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900">Profile</span>

            {profileExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {profileExpanded && (
            <div className="pb-2">
              {profileItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full px-4 py-2.5 flex justify-between items-center text-sm transition-colors ${
                    activeSection === item.key
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.sub && (
                    <span className="text-xs text-gray-400">{item.sub}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Sections */}
        {mainItems.map((item, index) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`w-full px-4 py-3 text-left font-medium transition-colors border-b border-gray-200 ${
              activeSection === item.key
                ? "bg-gray-100 text-gray-900"
                : "text-gray-900 hover:bg-gray-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}