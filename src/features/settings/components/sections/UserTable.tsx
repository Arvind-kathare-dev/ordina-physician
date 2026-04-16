import { Pencil, Trash2, Shield } from "lucide-react";

const users = [
  {
    name: "John Doe",
    email: "johndoe@agency.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Oliver Bennett",
    email: "oliver@agency.com",
    role: "Sub Admin",
    status: "Active",
  },
  {
    name: "Amelia Carter",
    email: "amelia@agency.com",
    role: "User",
    status: "Invited",
  },
  {
    name: "Taylor Sutton",
    email: "taylor@agency.com",
    role: "Read Only",
    status: "Disabled",
  },
];

export default function UserTable() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-4 bg-blue-600 text-white text-sm px-4 py-2">
        <span>User</span>
        <span>Role</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {/* Rows */}
      {users.map((user, i) => (
        <div
          key={i}
          className="grid grid-cols-4 items-center px-4 py-3 border-t text-sm"
        >
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <span className="text-xs bg-gray-100 px-2 py-1 rounded w-fit">
            {user.role}
          </span>

          <span
            className={`text-xs font-medium ${
              user.status === "Active"
                ? "text-green-600"
                : user.status === "Invited"
                ? "text-yellow-600"
                : "text-red-500"
            }`}
          >
            {user.status}
          </span>

          <div className="flex gap-2">
            <Pencil size={16} className="cursor-pointer text-gray-500" />
            <Shield size={16} className="cursor-pointer text-gray-500" />
            <Trash2 size={16} className="cursor-pointer text-gray-500" />
          </div>
        </div>
      ))}
    </div>
  );
}