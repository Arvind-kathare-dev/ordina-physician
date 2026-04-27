"use client";

import { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  X, 
  LayoutGrid, 
  Tag, 
  CircleDot, 
  Clock, 
  Users, 
  Building2,
  Stethoscope,
  HeartPulse,
  ClipboardList,
  FlaskConical,
  MessageSquare,
  FileText
} from "lucide-react";
import Modal from "@/components/ui/modal/Modal";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const recentFilters = [
  "Physical Therapy (PT)",
  "Skilled Nursing Orders"
];

const orderTypeOptions = [
  { id: "medication", label: "Medication Orders", icon: <CircleDot size={16} /> },
  { 
    id: "therapy", 
    label: "Therapy Orders", 
    icon: <Stethoscope size={16} />,
    subItems: [
      { id: "pt", label: "Physical Therapy (PT)" },
      { id: "ot", label: "Occupational Therapy (OT)" },
      { id: "st", label: "Speech Therapy (ST)" }
    ]
  },
  { id: "nursing", label: "Skilled Nursing Orders", icon: <HeartPulse size={16} /> },
  { id: "hha", label: "Home Health Aide (HHA) Orders", icon: <Users size={16} /> },
  { id: "msw", label: "Medical Social Work (MSW) Orders", icon: <MessageSquare size={16} /> },
  { id: "equipment", label: "Equipment and Supplies Orders", icon: <ClipboardList size={16} /> },
  { id: "lab", label: "Lab, Diagnostic, or Procedure Orders", icon: <FlaskConical size={16} /> },
  { id: "followup", label: "Follow-Up / Physician Communication Orders", icon: <FileText size={16} /> },
  { id: "poc", label: "Plan of Care / Certification Orders", icon: <ClipboardList size={16} /> }
];

export default function OrderFilterModal({ isOpen, onClose }: FilterModalProps) {
  const [openSections, setOpenSections] = useState<string[]>(["type"]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["medication"]);
  const [search, setSearch] = useState("");

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleFilter = (id: string) => {
    setSelectedFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const removeRecentFilter = (filter: string) => {
    // Just mock removing for now
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Recently Used Filters"
      className="max-w-xl"
    >
      <div className="flex flex-col gap-6">
        
        {/* Recent Filters Tags */}
        <div className="flex flex-wrap gap-2">
          {recentFilters.map((filter) => (
            <div 
              key={filter} 
              className="flex items-center gap-2 bg-[#f2f4f7] text-[#475467] px-3 py-1.5 rounded-full text-sm font-medium"
            >
              {filter}
              <button onClick={() => removeRecentFilter(filter)} className="hover:text-gray-900 transition-colors">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#528DB5] transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#528DB5] focus:ring-4 focus:ring-[#528DB5]/10 transition-all text-sm"
          />
        </div>

        {/* Accordion Sections */}
        <div className="flex flex-col gap-3">
          
          {/* Order Type Section */}
          <FilterSection 
            title="Order Type" 
            id="type" 
            icon={<LayoutGrid size={18} />} 
            isOpen={openSections.includes("type")} 
            onToggle={() => toggleSection("type")}
          >
            <div className="flex flex-col gap-3 ml-2">
              {orderTypeOptions.map((option) => (
                <div key={option.id} className="flex flex-col gap-3">
                  <Checkbox 
                    label={option.label} 
                    id={option.id} 
                    icon={option.icon}
                    checked={selectedFilters.includes(option.id)}
                    onChange={() => toggleFilter(option.id)}
                    hasSubItems={!!option.subItems}
                    isSubItemOpen={openSections.includes(option.id)}
                    onSubItemToggle={() => toggleSection(option.id)}
                  />
                  {option.subItems && openSections.includes(option.id) && (
                    <div className="flex flex-col gap-3 ml-8 animate-in slide-in-from-top-2 duration-200">
                      {option.subItems.map((sub) => (
                        <Checkbox 
                          key={sub.id} 
                          label={sub.label} 
                          id={sub.id} 
                          checked={selectedFilters.includes(sub.id)}
                          onChange={() => toggleFilter(sub.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Other Sections (Placeholders as per image) */}
          <FilterSection 
            title="Order Label" 
            id="label" 
            icon={<Tag size={18} />} 
            isOpen={openSections.includes("label")} 
            onToggle={() => toggleSection("label")}
            isBadge
          />
          <FilterSection 
            title="Order Status" 
            id="status" 
            icon={<CircleDot size={18} />} 
            isOpen={openSections.includes("status")} 
            onToggle={() => toggleSection("status")}
            isBadge
          />
          <FilterSection 
            title="By Time" 
            id="time" 
            icon={<Clock size={18} />} 
            isOpen={openSections.includes("time")} 
            onToggle={() => toggleSection("time")}
            isBadge
          />
          <FilterSection 
            title="By Patient" 
            id="patient" 
            icon={<Users size={18} />} 
            isOpen={openSections.includes("patient")} 
            onToggle={() => toggleSection("patient")}
          />
          <FilterSection 
            title="By Agency" 
            id="agency" 
            icon={<Building2 size={18} />} 
            isOpen={openSections.includes("agency")} 
            onToggle={() => toggleSection("agency")}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#528DB5] text-white hover:bg-[#1485b3] transition-all shadow-md shadow-[#528DB5]/20"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Modal>
  );
}

function FilterSection({ 
  title, 
  id, 
  icon, 
  isOpen, 
  onToggle, 
  children,
  isBadge
}: { 
  title: string; 
  id: string; 
  icon: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void; 
  children?: React.ReactNode;
  isBadge?: boolean;
}) {
  return (
    <div className="flex flex-col overflow-hidden">
      <button 
        onClick={onToggle}
        className={`flex items-center justify-between p-4 rounded-xl transition-all ${
          isOpen ? "bg-[#f9fafb]" : "bg-[#f2f4f7]/30 hover:bg-[#f2f4f7]/60"
        }`}
      >
        <div className="flex items-center gap-3 text-[#344054]">
          <span className="text-gray-400">{icon}</span>
          <span className="text-[15px] font-bold">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {isBadge && <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
          {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen && children ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function Checkbox({ 
  label, 
  id, 
  icon, 
  checked, 
  onChange,
  hasSubItems,
  isSubItemOpen,
  onSubItemToggle
}: { 
  label: string; 
  id: string; 
  icon?: React.ReactNode; 
  checked: boolean; 
  onChange: () => void;
  hasSubItems?: boolean;
  isSubItemOpen?: boolean;
  onSubItemToggle?: () => void;
}) {
  return (
    <div className="flex items-center justify-between group cursor-pointer" onClick={onChange}>
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
          checked ? "bg-[#528DB5] border-[#528DB5]" : "bg-white border-gray-300 group-hover:border-gray-400"
        }`}>
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div className="flex items-center gap-2">
          {icon && <span className="text-gray-500">{icon}</span>}
          <span className={`text-[14px] transition-colors ${checked ? "text-gray-900 font-bold" : "text-[#475467]"}`}>
            {label}
          </span>
        </div>
      </div>
      {hasSubItems && (
        <button 
          onClick={(e) => { e.stopPropagation(); onSubItemToggle?.(); }}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          {isSubItemOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
      )}
    </div>
  );
}
