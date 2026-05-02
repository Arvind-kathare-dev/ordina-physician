"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, X } from "lucide-react";
import Image from "next/image";

interface Physician {
  id: number;
  name: string;
  specialty: string;
  status: "Active" | "Inactive";
}

const physicians: Physician[] = [
  { id: 1, name: "Dr. Daniel Smith", specialty: "Internal Medicine", status: "Active" },
  { id: 2, name: "Dr. James Miller", specialty: "Pulmonology", status: "Active" },
  { id: 3, name: "Dr. Olivia Johnson", specialty: "Family Medicine", status: "Active" },
  { id: 4, name: "Dr. Sophia Martinez", specialty: "Cardiology", status: "Active" },
  { id: 5, name: "Dr. Michael Brown", specialty: "Orthopedics", status: "Active" },
  { id: 6, name: "Dr. Emily Chen", specialty: "Neurology", status: "Active" },
  { id: 7, name: "Dr. Robert Davis", specialty: "Dermatology", status: "Active" },
];

export default function PhysicianMultiSelect() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([1, 2]); // Initial selection as seen in some views
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = physicians.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const clearAll = () => setSelected([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const label =
    selected.length === 0
      ? "All Physicians"
      : selected.length === 1
        ? physicians.find((p) => p.id === selected[0])?.name.replace("Dr. ", "")
        : `${selected.length} Selected`;

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between sm:justify-start gap-3 px-4 py-[11px] border rounded-xl bg-white transition-all duration-200 ${open ? "border-[#528DB5] ring-1 ring-[#528DB5]" : "border-[#E0E0E0] hover:border-gray-300"
          }`}
      >
        <span className="text-[#9B9B9B] text-[14px] font-medium">Physician</span>
        <span className="text-[#333333] font-semibold text-[14px]">{label}</span>
        {open ? (
          <ChevronUp size={16} className="text-[#606060] ml-1" />
        ) : (
          <ChevronDown size={16} className="text-[#606060] ml-1" />
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute left-0 sm:left-auto sm:right-0 top-[calc(100%+8px)] z-50 w-full sm:w-[350px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#F0F0F0] overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* Search */}
          <div className="p-4 pb-2">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9B9B]"
              />
              <input
                autoFocus
                type="text"
                placeholder="Search physicians..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E0E0E0] rounded-xl text-[14px] text-[#333333] placeholder-[#9B9B9B] outline-none transition-all focus:border-[#528DB5] focus:ring-1 focus:ring-[#528DB5]/20"
              />
            </div>
          </div>

          {/* Selection count + Clear */}
          <div className="flex items-center justify-between px-4 py-1 text-[12px]">
            <span className="text-[#9B9B9B]">{selected.length} Selected</span>
            <button
              onClick={clearAll}
              className="text-[#528DB5] font-semibold hover:underline transition-colors"
            >
              Clear
            </button>
          </div>

          {/* List */}
          <div className="max-h-[320px] overflow-y-auto px-2 pb-4 pt-2 custom-scrollbar">
            {filtered.length === 0 ? (
              <p className="text-center text-sm text-[#9B9B9B] py-8">No physicians found</p>
            ) : (
              filtered.map((physician) => {
                const isSelected = selected.includes(physician.id);
                return (
                  <div
                    key={physician.id}
                    onClick={() => toggle(physician.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl transition-colors duration-150 ${isSelected ? "bg-[#F6F9FB]" : "hover:bg-gray-100"
                      }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 border transition-all duration-150 ${isSelected ? "bg-[#528DB5] border-[#528DB5]" : "border-[#D1D1D1] bg-white"
                        }`}
                    >
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#333333] truncate">
                        {physician.name}
                      </p>
                      <p className="text-[12px] text-[#9B9B9B] truncate">{physician.specialty}</p>
                    </div>

                    {/* Status Badge */}
                    <span className="shrink-0 text-[10px] text-[#9B9B9B] border border-[#E0E0E0] rounded-full px-2.5 py-0.5 bg-white">
                      {physician.status}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}


    </div>
  );
}
