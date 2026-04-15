
import { Pencil, Bell, Info, Copy, Tag } from "lucide-react";
import { Order } from "../orders.types";

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

  /* ---------- Tab 4 (Override Mode) ---------- */
  if (isTab4) {
    return (
      <div className="flex items-center gap-2 text-ordinadark text-xs">
        <button className="underline" onClick={handleReopen}>
          Re-open
        </button>
        <Info size={14} />
        <Copy size={14} />
        <Tag size={14} />
      </div>
    );
  }

  /* ---------- Default Mode ---------- */
  return (
    <div className="flex items-center gap-2 text-ordinadark text-xs">
      {/* Resend → Only Tab 3 */}
      {isTab3 && !isTab5 && (
        <button onClick={handleResend} className="underline">Resend</button>
      )}

      {/* Open */}
      <button onClick={handleOpen} className="underline">Open</button>

      {/* Edit → Hide in Tab 5 */}
      {!isTab5 && <Pencil size={14} />}

      {/* Bell → Hide in Tab 3 & 5 */}
      {!isTab3 && !isTab5 && <Bell size={14} />}

      {/* Always visible */}
      <Info size={14} />
      <Copy size={14} />
      <Tag size={14} />
    </div>
  );
}