"use client";

import { useState } from "react";
import PermissionCard from "../card/PermissionCard";
import ActionButtons from "../ActionButtons";

type Action = {
  label: string;
};

type Section = {
  title: string;
  description: string;
  actions: Action[];
};

const sections: Section[] = [
  {
    title: "Orders",
    description: "Create, view, forward, resend, and manage order states",
    actions: ["View", "Create", "Edit", "Send"].map((a) => ({ label: a })),
  },
  {
    title: "Reports",
    description:
      "Access patient/physician/enterprise reports and exports",
    actions: ["View", "Export", "Schedule"].map((a) => ({ label: a })),
  },
  {
    title: "Settings",
    description: "Edit onboarding + agency configuration",
    actions: ["View", "Edit"].map((a) => ({ label: a })),
  },
  {
    title: "Integrations",
    description: "Manage channels, EHR connections, and routing",
    actions: ["View", "Edit"].map((a) => ({ label: a })),
  },
  {
    title: "User Management",
    description:
      "Invite users, edit permissions, disable accounts",
    actions: ["View", "Invite", "Edit", "Disable"].map((a) => ({
      label: a,
    })),
  },
];

export default function PermissionsUI() {
  const [selectedUser, setSelectedUser] = useState("John Doe • Admin");

  return (
    <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b py-4 px-6 border-gray-220 mb-6">
        <h2 className="text-[15px] font-medium text-gray-600">
          Permissions
        </h2>
        <p className="text-xs text-gray-300">
          Select a user to edit permissions
        </p>
      </div>

<div className="flex flex-col gap-4 p-6">
 {/* Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        
        {/* Editing */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Editing:</span>
          <button className="px-3 py-1.5 rounded-full border border-gray-220 text-[13px] text-grayCustom-500 ">
            {selectedUser}
          </button>
        </div>

        {/* Preset */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Preset:</span>
          <button className="px-3 py-1.5 rounded-full border border-gray-220 text-[13px] text-grayCustom-500">
            Admin
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-3">
      {sections.map((section, i) => (
  <PermissionCard
    key={i}
    title={section.title}
    description={section.description}
    actions={section.actions.map((a) => a.label)}
  />
))}
      </div>

    
      <ActionButtons/>
</div>
     
    </div>
  );
}