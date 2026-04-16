import { useState, useRef, useEffect } from "react";
import { Search, ChevronUp, ChevronDown, X } from "lucide-react";

interface Physician {
  id: number;
  name: string;
  specialty: string;
  status: "Active" | "Inactive";
}

const physicians: Physician[] = [
  {
    id: 1,
    name: "Dr. Daniel Smith",
    specialty: "Internal Medicine",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. James Miller",
    specialty: "Pulmonology",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Olivia Johnson",
    specialty: "Family Medicine",
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. Sophia Martinez",
    specialty: "Cardiology",
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. Michael Brown",
    specialty: "Orthopedics",
    status: "Active",
  },
  { id: 6, name: "Dr. Emily Chen", specialty: "Neurology", status: "Active" },
  {
    id: 7,
    name: "Dr. Robert Davis",
    specialty: "Dermatology",
    status: "Active",
  },
];

export default function PhysicianSelector() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([1]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = physicians.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const clearAll = () => setSelected([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
        ? (physicians
            .find((p) => p.id === selected[0])
            ?.name.replace("Dr. ", "") ?? "1 Selected")
        : `${selected.length} Selected`;

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={` flex items-center gap-2 rounded-10 border-[0.5px] px-[11px] py-[9px] text-sm bg-white border-border transition-all duration-200 ${
            open
              ? "border-ordinadark ring-1 ring-ordinadark "
              : "border-slate-200 hover:border-ordinadark"
          }`}
        >
          <span className="text-slate-400 font-medium">Physician</span>
          <span className="font-semibold text-slate-800">{label}</span>
          {open ? (
            <ChevronUp size={15} className="text-slate-500 ml-1" />
          ) : (
            <ChevronDown size={15} className="text-slate-500 ml-1" />
          )}
        </button>

        {/* Dropdown Panel */}
        {open && (
          <div className="absolute -left-16 top-[calc(100%+8px)] z-50 max-w-80  rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden animate-in">
            {/* Search */}
            <div className="p-3 border-b border-slate-100">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-ordinadark focus-within:ring-1 focus-within:ring-ordinadark transition-all">
                <Search size={14} className="text-slate-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search physicians..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
                {search && (
                  <button onClick={() => setSearch("")}>
                    <X
                      size={13}
                      className="text-slate-400 hover:text-slate-600"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Selection count + Clear */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
              <span className="text-xs text-slate-400 font-medium">
                {selected.length} Selected
              </span>
              {selected.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs font-semibold text-ordinalight hover:text-ordinadark transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-sm text-slate-400 py-6">
                  No physicians found
                </p>
              ) : (
                filtered.map((physician, i) => {
                  const isSelected = selected.includes(physician.id);
                  return (
                    <div
                      key={physician.id}
                      onClick={() => toggle(physician.id)}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${
                        i !== filtered.length - 1
                          ? "border-b border-slate-50"
                          : ""
                      } ${isSelected ? "bg-blue-50/60" : "hover:bg-slate-50"}`}
                    >
                      {/* Checkbox */}
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all duration-150 ${
                          isSelected
                            ? "bg-ordinadark border-ordinadark"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {physician.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {physician.specialty}
                        </p>
                      </div>

                      {/* Badge */}
                      <span className="shrink-0 text-xs text-slate-500 border border-slate-200 rounded-full px-2.5 py-0.5 bg-white">
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
    </>
  );
}
