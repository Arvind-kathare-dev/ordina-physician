"use client";

import { useState } from "react";
import PermissionCard from "../card/PermissionCard";
import { ChevronDown } from "lucide-react";

const sections = [
  {
    id: "orders",
    title: "Orders",
    description: "Create, view, forward, resend, and manage order states",
    actions: ["View", "Create", "Edit", "Send"],
  },
  {
    id: "reports",
    title: "Reports",
    description: "Access patient/physician/enterprise reports and exports",
    actions: ["View", "Export", "Schedule"],
  },
  {
    id: "settings",
    title: "Settings",
    description: "Edit onboarding + agency configuration",
    actions: ["View", "Edit"],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Manage channels, EHR connections, and routing",
    actions: ["View", "Edit"],
  },
  {
    id: "user_management",
    title: "User Management",
    description: "Invite users, edit permissions, disable accounts",
    actions: ["View", "Invite", "Edit", "Disable"],
  },
];

const presets: Record<string, Record<string, string[]>> = {
  Admin: {
    orders: ["View", "Create", "Edit", "Send"],
    reports: ["View", "Export", "Schedule"],
    settings: ["View", "Edit"],
    integrations: ["View", "Edit"],
    user_management: ["View", "Invite", "Edit", "Disable"],
  },
  User: {
    orders: ["View", "Create"],
    reports: ["View"],
    settings: ["View"],
    integrations: ["View"],
    user_management: ["View"],
  },
};

export default function PermissionsUI() {
  const [selectedUser, setSelectedUser] = useState("John Doe • Admin");
  const [currentPreset, setCurrentPreset] = useState("Admin");
  const [permissions, setPermissions] = useState<Record<string, string[]>>(presets.Admin);

  const handleToggle = (sectionId: string, action: string) => {
    setPermissions((prev) => {
      const sectionPerms = prev[sectionId] || [];
      const newPerms = sectionPerms.includes(action)
        ? sectionPerms.filter((a) => a !== action)
        : [...sectionPerms, action];
      return { ...prev, [sectionId]: newPerms };
    });
  };

  const handleReset = () => {
    setPermissions(presets[currentPreset] || presets.Admin);
  };

  const handleSave = () => {
    console.log("Saving permissions for", selectedUser, permissions);
    alert("Permissions updated successfully!");
  };

  return (
    <div className="w-full bg-white border border-gray-100 rounded-[18px] shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b py-4 px-6 border-gray-50 gap-2">
        <h2 className="text-[15px] font-bold text-[#4a4a4a]">
          Permissions
        </h2>
        <p className="text-[12px] text-[#999]">
          Select a user to edit permissions
        </p>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {/* Controls */}
        <div className="flex items-center gap-6 flex-wrap">
          
          {/* Editing Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#999]">Editing:</span>
            <button className="flex items-center gap-6 px-4 py-2 rounded-full border border-gray-100 text-[13px] text-[#4a4a4a] font-bold bg-white shadow-sm hover:border-[#5b94b7] transition-all">
              {selectedUser}
              <ChevronDown size={14} className="text-[#999]" />
            </button>
          </div>

          {/* Preset Badge */}
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#999]">Preset:</span>
            <button 
              onClick={() => {
                const next = currentPreset === "Admin" ? "User" : "Admin";
                setCurrentPreset(next);
                setPermissions(presets[next]);
              }}
              className="px-5 py-2 rounded-full border border-gray-100 text-[13px] text-[#4a4a4a] font-bold bg-white shadow-sm hover:border-[#5b94b7] transition-all"
            >
              {currentPreset}
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <PermissionCard
              key={section.id}
              title={section.title}
              description={section.description}
              actions={section.actions}
              selectedActions={permissions[section.id] || []}
              onToggle={(action) => handleToggle(section.id, action)}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 text-[14px] font-bold text-[#4a4a4a] bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 text-[14px] font-bold text-white bg-[#5b94b7] rounded-xl hover:bg-[#4a7a96] transition-all shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}