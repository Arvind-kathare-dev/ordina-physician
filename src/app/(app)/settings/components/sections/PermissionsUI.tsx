"use client";

import { useState, useRef, useEffect } from "react";
import PermissionCard from "../card/PermissionCard";
import { ChevronDown } from "lucide-react";
import ActionButtons from "../ActionButtons";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  initials: string;
}

interface PermissionsUIProps {
  users: UserData[];
}

const sections = [
  {
    id: "orders",
    title: "Orders",
    description: "Create, view, forward, resend, and manage order states",
    actions: ["View", "Edit", "Send"],
  },
  {
    id: "reports",
    title: "Reports",
    description: "Run reports and export or schedule delivery.",
    actions: ["View", "Export", "Schedule"],
  },
  {
    id: "settings",
    title: "Settings",
    description: "View or change agency profile and preferences.",
    actions: ["View", "Edit"],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect and manage EHR and channel integrations.",
    actions: ["View", "Edit"],
  },
  {
    id: "user_management",
    title: "User Management",
    description: "Invite users and control roles and access.",
    actions: ["View", "Invite", "Edit", "Disable"],
  },
];

const presets: Record<string, Record<string, string[]>> = {
  "Admin": {
    orders: ["View", "Edit", "Send"],
    reports: ["View", "Export", "Schedule"],
    settings: ["View", "Edit"],
    integrations: ["View", "Edit"],
    user_management: ["View", "Invite", "Edit", "Disable"],
  },
  "Sub Admin": {
    orders: ["View", "Edit"],
    reports: ["View", "Export"],
    settings: ["View"],
    integrations: ["View"],
    user_management: ["View", "Invite"],
  },
  "User": {
    orders: ["View"],
    reports: ["View"],
    settings: ["View"],
    integrations: ["View"],
    user_management: ["View"],
  },
  "Read Only": {
    orders: ["View"],
    reports: ["View"],
    settings: ["View"],
    integrations: ["View"],
    user_management: ["View"],
  },
};

export default function PermissionsUI({ users }: PermissionsUIProps) {
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id || "");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedUser = users.find(u => u.id === selectedUserId) || users[0];
  const [permissions, setPermissions] = useState<Record<string, string[]>>(
    selectedUser ? (presets[selectedUser.role] || presets.Admin) : presets.Admin
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (sectionId: string, action: string) => {
    setPermissions((prev) => {
      const sectionPerms = prev[sectionId] || [];
      const newPerms = sectionPerms.includes(action)
        ? sectionPerms.filter((a) => a !== action)
        : [...sectionPerms, action];
      return { ...prev, [sectionId]: newPerms };
    });
  };

  const selectUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsOpen(false);
    const user = users.find(u => u.id === userId);
    if (user) {
      setPermissions(presets[user.role] || presets.Admin);
    }
  };

  const handleSave = () => {
    console.log("Saving permissions for", selectedUser?.name, permissions);
    alert("Permissions updated successfully!");
  };

  if (!selectedUser) return null;

  return (
    <div className="w-full bg-white border border-gray-100 rounded-[18px] shadow-sm">
      
      {/* Header */}
      <div className="border-b py-4 sm:py-5 px-4 sm:px-6 border-gray-100">
        <h2 className="text-[16px] sm:text-[17px] font-bold text-[#4a4a4a] mb-1">
          Permissions
        </h2>
        <p className="text-[12px] sm:text-[13px] text-[#999]">
          Select a user to edit permissions
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-6">
        
        {/* Editing Container */}
        <div className="relative border border-gray-100 rounded-[12px] p-4 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-[#c0c0c0] tracking-wider uppercase">EDITING</span>
            <span className="text-[10px] font-bold text-[#c0c0c0] tracking-wider uppercase">PRESET</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Custom Dropdown */}
            <div className="relative w-full flex-1" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-white border border-[#5b94b7] rounded-lg px-4 py-2.5 text-[14px] font-medium text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#5b94b7]/20 transition-all"
              >
                <span className="truncate mr-2">{selectedUser.name} — {selectedUser.role}</span>
                <ChevronDown size={18} className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {users.map(user => (
                    <button
                      key={user.id}
                      onClick={() => selectUser(user.id)}
                      className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${
                        selectedUserId === user.id 
                          ? 'bg-[#5b94b7] text-white' 
                          : 'text-[#4a4a4a] hover:bg-[#f0f7fb] hover:text-[#5b94b7]'
                      }`}
                    >
                      {user.name} — {user.role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="px-4 py-1.5 bg-[#f5f0ff] text-[#9474cc] rounded-full text-[12px] font-bold border border-[#e8dfff]">
              {selectedUser.role}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-4">
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
        <ActionButtons 
          onSave={handleSave}
          onReset={() => setPermissions({})}
          isSaveDisabled={Object.values(permissions).every(p => p.length === 0)}
        />
      </div>
    </div>
  );
}
