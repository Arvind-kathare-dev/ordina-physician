import { Search, Pencil, Trash2, Settings, Plus, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  initials: string;
}

interface UserTableProps {
  users: UserData[];
  onEdit: (user: UserData) => void;
  onDelete: (user: UserData) => void;
  onSettings: (user: UserData) => void;
  onAdd: () => void;
}

export default function UserTable({ users, onEdit, onDelete, onSettings, onAdd }: UserTableProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || user.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [users, search, filter]);

  return (
    <div className="bg-white rounded-2xl  p-0">
      
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 w-full max-w-xl bg-white focus-within:border-[#528DB5] transition-all">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rules by name or email.."
            className="outline-none w-full text-[14px] bg-transparent placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center border border-gray-100 rounded-[14px] p-1 bg-white overflow-x-auto no-scrollbar w-full sm:w-auto">
            {["All", "Active", "Invited", "Disabled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 sm:px-5 py-2 text-[13px] font-medium rounded-[12px] transition-all whitespace-nowrap flex-1 sm:flex-none ${
                  filter === tab 
                    ? "bg-[#eaf4ff] text-[#528DB5] border border-[#d0e6ff]" 
                    : "text-[#858585] hover:text-[#528DB5] border border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5b94b7] text-white">
                <th className="px-5 py-3.5 text-sm font-bold first:rounded-tl-xl">
                  <div className="flex items-center gap-1 cursor-pointer">
                    User <ChevronDown size={14} className="opacity-60" />
                  </div>
                </th>
                <th className="px-5 py-3.5 text-sm font-bold">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Role <ChevronDown size={14} className="opacity-60" />
                  </div>
                </th>
                <th className="px-5 py-3.5 text-sm font-bold">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Status <ChevronDown size={14} className="opacity-60" />
                  </div>
                </th>
                <th className="px-5 py-3.5 text-sm font-bold text-right last:rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-sm text-gray-400 italic">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-[#f2f7fb] flex items-center justify-center text-sm font-bold text-[#5b94b7] border border-[#dce9f2] shrink-0">
                          {user.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[14px] font-bold text-[#333] leading-tight">
                            {user.name}
                          </p>
                          <p className="text-[12px] text-[#999] mt-0.5">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span className="px-3 py-1.5 text-[12px] font-bold rounded-[8px] bg-[#eaf4ff] text-[#528DB5]">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-[#4a4a4a]">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            user.status === "Active"
                              ? "bg-[#42b883]"
                              : user.status === "Invited"
                              ? "bg-[#ff9f43]"
                              : "bg-[#ea5455]"
                          }`}
                        />
                        {user.status}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-4 text-[#5b94b7]">
                        <button onClick={() => onEdit(user)} className="hover:text-[#528DB5] transition-colors">
                          <Pencil className="w-[18px] h-[18px]" />
                        </button>
                        <button onClick={() => onDelete(user)} className="hover:text-red-500 transition-colors">
                          <Trash2 className="w-[18px] h-[18px]" />
                        </button>
                        <button onClick={() => onSettings(user)} className="hover:text-[#4a4a4a] transition-colors">
                          <Settings className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}