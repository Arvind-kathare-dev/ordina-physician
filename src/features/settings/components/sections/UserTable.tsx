import { Search, Pencil, Trash2, Settings } from "lucide-react";

const users = [
  {
    initials: "JD",
    name: "John Doe",
    email: "Johndoe@agency.com",
    role: "Admin",
    status: "Active",
  },
  {
    initials: "OB",
    name: "Oliver Bennett",
    email: "Oliverbennett@agency.com",
    role: "Sub Admin",
    status: "Active",
  },
  {
    initials: "AC",
    name: "Amelia Carter",
    email: "Ameliacarter@agency.com",
    role: "User",
    status: "Invited",
  },
  {
    initials: "TS",
    name: "Taylor Sutton",
    email: "Taylorsutton@agency.com",
    role: "Read Only",
    status: "Disabled",
  },
];

export default function UserTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      
      {/* 🔍 Top Bar */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 border rounded-xl px-3 py-2 w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            placeholder="Search rules by name or email..."
            className="outline-none w-full text-sm"
          />
        </div>

        <div className="flex gap-2 border border-grayCustom-220 rounded-2xl p-2">
          {["All", "Active", "Invited", "Disabled"].map((tab) => (
            <button
              key={tab}
              className="px-3 py-1.5 text-sm rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 📊 Table */}
      <div className="rounded-xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="grid grid-cols-4 bg-primary-gradient  px-4 py-3 text-white text-sm font-medium ">
          <span>User</span>
          <span>Role</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Body */}
        <div>
          {users.map((user, i) => (
            <div
              key={i}
              className="grid grid-cols-4 items-center px-4 py-3 border-t border-gray-100"
            >
              
              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                  {user.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div>
                <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-600">
                  {user.role}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span
                  className={`w-2 h-2 rounded-full ${
                    user.status === "Active"
                      ? "bg-green-500"
                      : user.status === "Invited"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
                {user.status}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 text-gray-500">
                <Pencil className="w-4 h-4 cursor-pointer hover:text-blue-500" />
                <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-500" />
                <Settings className="w-4 h-4 cursor-pointer hover:text-gray-700" />
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}