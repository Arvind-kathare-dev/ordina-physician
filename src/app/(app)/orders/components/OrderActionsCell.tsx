"use client";

import { HiOutlinePencil, HiOutlineDocumentAdd } from "react-icons/hi";
import { Order } from "../orders.types";
import OutboxNotifyBellWithDialog from "@/components/common/OutboxNotifyBellWithDialog";
import OrderDetailsInfoDialog from "@/components/common/OrderDetailsInfoDialog";
import LabelAssignDialog from "@/components/common/LabelAssignDialog";

import Tooltip from "@/components/common/Tooltip";

interface Props {
  row: Order;
  activeTab: number;
}

export default function OrderActionsCell({ row, activeTab }: Props) {
  const isTab3 = activeTab === 3;
  const isTab4 = activeTab === 4;
  const isTab5 = activeTab === 5;

  /* ---------- Action Handlers ---------- */
  const handleOpen = () => console.log("Open", row.id);
  const handleResend = () => console.log("Resend", row.id);
  const handleReopen = () => console.log("Re-open", row.id);

  // Map Order to something compatible with OrderTableRow
  const rowData: any = {
    ...row,
    id: String(row.id),
    serviceType: typeof row.serviceType === "string"
      ? { text: row.serviceType, variant: "hospice" }
      : row.serviceType,
    pending: { text: row.day || "Today", dot: "green" },
    mailbox: "outbox",
    physicianName: "Dr. Physician", // Default fallback
  };

  /* ---------- Tab 4 (Override Mode) ---------- */
  if (isTab4) {
    return (
      <div className="flex flex-nowrap items-center gap-2">
        <button
          type="button"
          onClick={handleReopen}
          className="cursor-pointer text-[#528DB5] text-[14px] font-medium underline"
        >
          Re-open
        </button>
        <div className="flex flex-nowrap items-center gap-1 text-[#528DB5]">
          <Tooltip text="Edit">
            <button type="button" className="rounded-md cursor-pointer p-0.5" aria-label="Edit">
              <HiOutlinePencil className="h-[18px] w-[18px]" />
            </button>
          </Tooltip>

          <Tooltip text="Info">
            <OrderDetailsInfoDialog row={rowData} />
          </Tooltip>

          <Tooltip text="Add Document">
            <button type="button" className="rounded-md cursor-pointer p-0.5" aria-label="Add Document">
              <HiOutlineDocumentAdd className="h-[18px] w-[18px]" />
            </button>
          </Tooltip>

          <Tooltip text="Tag">
            <LabelAssignDialog row={rowData} />
          </Tooltip>
        </div>
      </div>
    );
  }

  /* ---------- Default Mode ---------- */
  return (
    <div className="flex flex-nowrap items-center gap-2">
      {/* Resend → Only Tab 3 */}
      {isTab3 && !isTab5 && (
        <button
          type="button"
          onClick={handleResend}
          className="cursor-pointer text-[#528DB5] text-[14px] font-medium underline"
        >
          Resend
        </button>
      )}

      {/* Open */}
      <button
        type="button"
        onClick={handleOpen}
        className="cursor-pointer text-[#528DB5] text-[14px] font-medium underline"
      >
        Open
      </button>

      <div className="flex flex-nowrap items-center gap-1 text-[#528DB5]">
        <Tooltip text="Edit">
          <button type="button" className="rounded-md cursor-pointer p-0.5" aria-label="Edit">
            <HiOutlinePencil className="h-[18px] w-[18px]" />
          </button>
        </Tooltip>

        {/* Bell → Hide in Tab 3 & 5 */}
        {!isTab3 && !isTab5 && (
          <Tooltip text="Notification">
            <OutboxNotifyBellWithDialog row={rowData} />
          </Tooltip>
        )}

        <Tooltip text="Info">
          <OrderDetailsInfoDialog row={rowData} />
        </Tooltip>

        <Tooltip text="New Order">
          <button type="button" className="rounded-md cursor-pointer p-0.5" aria-label="New Order">
            <HiOutlineDocumentAdd className="h-[18px] w-[18px]" />
          </button>
        </Tooltip>

        <Tooltip text="Tag">
          <LabelAssignDialog row={rowData} />
        </Tooltip>
      </div>
    </div>
  );
}
