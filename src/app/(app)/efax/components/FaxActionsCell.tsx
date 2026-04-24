// features/fax/components/FaxActionsCell.tsx

import { Trash, Tag, Mail, Archive } from "lucide-react";
import { Fax } from "../types";

interface Props {
  row: Fax;
}

export default function FaxActionsCell({ row }: Props) {
  const handleOpen = () => console.log("Open", row.id);

  return (
    <div className="flex items-center gap-2 text-ordinadark text-xs">
      <button onClick={handleOpen}>Open</button>
      <Mail size={14} className="cursor-pointer" />
      <Archive size={14} className="cursor-pointer" />
      <Trash size={14} className="cursor-pointer" />
      <Tag size={14} className="cursor-pointer" />
    </div>
  );
}