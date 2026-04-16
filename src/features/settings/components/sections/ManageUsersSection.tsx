import SearchBox from "@/components/ui/SearchBox";
import SectionWrapper from "../SectionWrapper";
import { User } from "lucide-react";
import UserTable from "./UserTable";
import PermissionCard from "../card/PermissionCard";

export default function ManageUsersSection() {
  return (
    <div>
      <SectionWrapper
        title="Manage Users"
        description="Add agency users and set permissions"
        icon={User}
      >
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <SearchBox />

          <div className="flex gap-2">
            {["All", "Active", "Invited", "Disabled"].map((f) => (
              <button
                key={f}
                className="px-3 py-1 text-xs border rounded-lg hover:bg-gray-50"
              >
                {f}
              </button>
            ))}
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">
            + Invite User
          </button>
        </div>

        <UserTable />
      </SectionWrapper>

      {/* Permissions + Notes */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Permissions */}
        <div className="col-span-2">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-4">
              Permissions
            </h3>

            <PermissionCard
              title="Orders"
              actions={["View", "Create", "Edit", "Send"]}
            />

            <PermissionCard
              title="Reports"
              actions={["View", "Export", "Schedule"]}
            />

            <PermissionCard
              title="Settings"
              actions={["View", "Edit"]}
            />

            <PermissionCard
              title="User Management"
              actions={["View", "Invite", "Edit", "Disable"]}
            />

            <div className="flex justify-end mt-4 gap-3">
              <button className="px-5 py-2 border rounded-lg">
                Reset
              </button>
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="border border-gray-200 rounded-lg p-4 text-sm text-gray-500">
          <h3 className="font-semibold mb-2">Notes</h3>
          <p className="mb-2">
            Role presets are shortcuts. You can fine-tune permissions.
          </p>

          <ul className="list-disc ml-4 space-y-1">
            <li>Admin: full access</li>
            <li>Sub Admin: operational access</li>
            <li>User: day-to-day workflows</li>
            <li>Read Only: view only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}