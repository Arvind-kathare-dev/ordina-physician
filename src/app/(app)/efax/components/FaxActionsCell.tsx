"use client";

import { HiOutlineInbox, HiOutlineArchive, HiOutlineTrash } from "react-icons/hi";
import { Fax } from "../types";
import LabelAssignDialog from "@/components/common/LabelAssignDialog";

import Tooltip from "@/components/common/Tooltip";
import Image from "next/image";
import deleteIcon from "../../../../assets/images/action-icons/delete.svg";
import mailIcon from "../../../../assets/images/action-icons/mail.svg";
import archiveIcon from "../../../../assets/images/action-icons/archive.svg";

interface Props {
  row: Fax;
}

export default function FaxActionsCell({ row }: Props) {
  const handleOpen = () => console.log("Open", row.id);

  // Map Fax to something compatible with OrderTableRow for dialogs
  const rowData: any = {
    ...row,
    id: String(row.id),
    patientName: row.from || "Fax Sender",
    orderType: row.subject || "Fax Document",
    serviceType: { text: "Fax", variant: "hospice" },
    pending: { text: row.time || "Today", dot: "green" },
    mailbox: "inbox",
    physicianName: "Dr. James Miller",
  };

  return (
    <div className="flex flex-nowrap items-center gap-2 shrink-0">
      <button
        type="button"
        onClick={handleOpen}
        className="cursor-pointer text-[#528DB5] text-[14px] font-medium hover:underline"
      >
        Open
      </button>

      <div className="flex flex-nowrap items-center gap-1.5 text-[#528DB5] shrink-0">
        <Tooltip text="Inbox">
          <button
            type="button"
            className="rounded-md cursor-pointer p-0.5 shrink-0"
            aria-label="Inbox"
          >
            {/* <HiOutlineInbox className="h-[18px] w-[18px]" /> */}
            <Image src={mailIcon} alt="Inbox" width={18} height={18} />
          </button>
        </Tooltip>

        <Tooltip text="Archive">
          <button
            type="button"
            className="rounded-md cursor-pointer p-0.5 shrink-0"
            aria-label="Archive"
          >
            {/* <HiOutlineArchive className="h-[18px] w-[18px]" /> */}
            <Image src={archiveIcon} alt="Archive" width={18} height={18} />
          </button>
        </Tooltip>

        <Tooltip text="Delete">
          <button
            type="button"
            className="rounded-md cursor-pointer p-0.5 shrink-0"
            aria-label="Delete"
          >
            {/* <HiOutlineTrash className="h-[18px] w-[18px]" /> */}
            <Image src={deleteIcon} alt="Delete" width={18} height={18} />
          </button>
        </Tooltip>

        <Tooltip text="Label">
          <LabelAssignDialog row={rowData} />
        </Tooltip>
      </div>
    </div>
  );
}
