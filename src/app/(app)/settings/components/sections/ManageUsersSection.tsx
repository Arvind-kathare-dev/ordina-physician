import SearchBox from "@/components/ui/SearchBox";
import SectionWrapper from "../SectionWrapper";
import { User, Plus } from "lucide-react";
import UserTable from "./UserTable";
import PermissionCard from "../card/PermissionCard";
import { SectionWrapperBox } from "../SectionWrapperBox";
import { useState } from "react";
import PermissionsUI from "./PermissionsUI";
import NotesCard from "../card/NotesCard";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  initials: string;
}

const initialUsers: UserData[] = [
  { id: '1', name: 'John Doe', email: 'JohnDoe@agency.com', role: 'Admin', status: 'Active', initials: 'JD' },
  { id: '2', name: 'Sarah Chen', email: 'SarahChen@agency.com', role: 'Sub Admin', status: 'Active', initials: 'SC' },
  { id: '3', name: 'Mike Johnson', email: 'MikeJohnson@agency.com', role: 'User', status: 'Invited', initials: 'MJ' },
  { id: '4', name: 'Emily Rivera', email: 'EmilyRivera@agency.com', role: 'Read Only', status: 'Disabled', initials: 'ER' },
];

export default function ManageUsersSection() {
  const [users, setUsers] = useState<UserData[]>(initialUsers);

  const handleEdit = (user: UserData) => {
    const newName = prompt("Enter new name:", user.name);
    if (newName) {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, name: newName, initials: newName.split(' ').map(n => n[0]).join('').toUpperCase() } : u));
    }
  };

  const handleDelete = (user: UserData) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(prev => prev.filter(u => u.id !== user.id));
    }
  };

  const handleSettings = (user: UserData) => {
    alert(`Settings for: ${user.name}`);
  };

  const handleAdd = () => {
    const name = prompt("Enter name:");
    const email = prompt("Enter email:");
    if (name && email) {
      const newUser: UserData = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'User',
        status: 'Invited',
        initials: name.split(' ').map(n => n[0]).join('').toUpperCase(),
      };
      setUsers(prev => [...prev, newUser]);
    }
  };

  return (
    <SectionWrapperBox title="Manage Users">
      <SectionWrapper
        title="Manage Users"
        description="Add agency users and set permissions (sub-admin access)"
        icon={User}
        badgeText="configured"
        badgeVariant="success"
        headerAction={
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#5b94b7] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[12px] sm:text-[14px] font-bold shadow-sm hover:bg-[#4a7a96] transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">Invite User</span>
            <span className="xs:hidden">Invite</span>
          </button>
        }
      >
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSettings={handleSettings}
          onAdd={handleAdd}
        />
      </SectionWrapper>

      {/* Permissions + Notes */}
      <div className="flex flex-col lg:flex-row gap-6 items-start px-3 sm:px-6 pb-6 w-full min-w-0 overflow-hidden">
        <div className="w-full lg:flex-1 min-w-0">
          <PermissionsUI users={users} />
        </div>
        <div className="w-full lg:w-80 shrink-0 min-w-0">
          <NotesCard />
        </div>
      </div>

    </SectionWrapperBox>
  );
}
