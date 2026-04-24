import SearchBox from "@/components/ui/SearchBox";
import SectionWrapper from "../SectionWrapper";
import { User } from "lucide-react";
import UserTable from "./UserTable";
import PermissionCard from "../card/PermissionCard";
import { SectionWrapperBox } from "../SectionWrapperBox";
import { useState } from "react";
import PermissionsUI from "./PermissionsUI";
import NotesCard from "../card/NotesCard";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Sub Admin' | 'User' | 'Read Only';
  status: 'Active' | 'Invited' | 'Disabled';
}

// Sample data matching the image
const initialUsers: User[] = [
  {
    id: 'JD',
    name: 'John Doe',
    email: 'JohnDoe@agency.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 'OB',
    name: 'Oliver Bennett',
    email: 'Oliverbennett@agency.com',
    role: 'Sub Admin',
    status: 'Active',
  },
  {
    id: 'AC',
    name: 'Amelia Carter',
    email: 'Ameliacarter@agency.com',
    role: 'User',
    status: 'Invited',
  },
  {
    id: 'TS',
    name: 'Taylor Sutton',
    email: 'TaylorSutton@agency.com',
    role: 'Read Only',
    status: 'Disabled',
  },
];

export default function ManageUsersSection() {
    const [users, setUsers] = useState<User[]>(initialUsers);
 
  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
    alert(`Edit user: ${user.name}`);
  };
 
  const handleDelete = (user: User) => {
    console.log('Delete user:', user);
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter(u => u.id !== user.id));
    }
  };
 
  const handleSettings = (user: User) => {
    console.log('Settings for user:', user);
    alert(`Settings for: ${user.name}`);
  };

  return (
    <SectionWrapperBox title="Manage Users">
      <SectionWrapper
        title="Manage Users"
        description="Add agency users and set permissions"
        icon={User}
      >
       

       <UserTable
          
          />
      </SectionWrapper>

      {/* Permissions + Notes */}
      <div className="flex gap-4 items-start px-6" >
      <PermissionsUI/>
<NotesCard/>
      </div>
      
    </SectionWrapperBox>
  );
}
