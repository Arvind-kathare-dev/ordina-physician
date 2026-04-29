"use client";

import { useId, useState } from "react";
import { HiOutlineArrowLeft, HiOutlineBell } from "react-icons/hi";
import Image from "next/image";
import Dialog from "./Dialog";
import type { OrderTableRow } from "../../data/ordersStaticData";
import noAlertsImage from "../../assets/images/noti-image.png";
import urgentBellImage from "../../assets/images/noti-icon.png";

type OutboxNotifyBellWithDialogProps = {
  row: OrderTableRow;
};

function orderIdLabel(row: OrderTableRow) {
  const n = Number.parseInt(row.id, 10);
  if (Number.isFinite(n)) return `ORD${String(10000 + n).slice(1)}`;
  return `ORD${row.id.padStart(5, "0")}`;
}

function physicianAsChatSender(name: string) {
  const rest = name.replace(/^Dr\.?\s*/i, "").trim();
  return `DR. ${rest.toUpperCase()}`;
}

type ChatMessage = {
  sender: string;
  senderVariant: "admin" | "doctor";
  text: string;
  borderVariant?: "admin" | "doctor";
};

function ChatMessageBlock({
  sender,
  senderVariant,
  text,
  borderVariant,
}: ChatMessage) {
  const labelClass =
    senderVariant === "admin"
      ? "text-[#579EBA]"
      : "text-[#F7A51E]";
  const borderClass =
    (borderVariant ?? senderVariant) === "admin"
      ? "border-[#579EBA]"
      : "border-[#F7A51E]";
  return (
    <div className="mb-3">
      <p className={`text-[11px] font-semibold uppercase tracking-wide ${labelClass}`}>
        {sender}
      </p>
      <div
        className={`border-l-[2px] ${borderClass} pl-3 py-1`}
        aria-hidden
      >
        <p className="text-[13px] leading-snug text-[#333333]">{text}</p>
      </div>
    </div>
  );
}

export default function OutboxNotifyBellWithDialog({
  row,
}: OutboxNotifyBellWithDialogProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const titleId = useId();
  const descId = useId();
  const chatTitleId = useId();

  const urgent = Boolean(row.bellUrgent) || row.mailbox === "alert";
  const doctorChatLabel = physicianAsChatSender(row.physicianName);

  const chatMessages: ChatMessage[] = [
    {
      sender: "PROHEALTHADMIN",
      senderVariant: "admin",
      text: "Hello! We've received your order for the Health Pro subscription.",
    },
    {
      sender: doctorChatLabel,
      senderVariant: "doctor",
      text: "Hi, yes. Can you confirm the activation timeline?",
    },
    {
      sender: "PROHEALTHADMIN",
      senderVariant: "admin",
      text: "Your order is approved and will be activated within 24 hours.",
      borderVariant: "doctor",
    }, {
      sender: "PROHEALTHADMIN",
      senderVariant: "admin",
      text: "Hello! We've received your order for the Health Pro subscription.",
    },
    {
      sender: doctorChatLabel,
      senderVariant: "doctor",
      text: "Hi, yes. Can you confirm the activation timeline?",
    },
    {
      sender: "PROHEALTHADMIN",
      senderVariant: "admin",
      text: "Your order is approved and will be activated within 24 hours.",
      borderVariant: "doctor",
    },
  ];

  return (
    <>
      <button
        type="button"
        className="rounded-md cursor-pointer p-0.5"
        aria-label="Notify"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <HiOutlineBell
          className={`h-[18px] w-[18px] ${urgent ? "text-[#E33629]" : "text-[#528DB5]"}`}
        />
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        panelClassName={
          urgent
            ? "max-w-[min(100%,563px)] rounded-[10px] max-h-[min(92vh,417px)] h-[min(92vh,417px)]"
            : "max-w-[min(100%,563px)] rounded-[10px]"
        }
        labelledBy={urgent ? chatTitleId : titleId}
        describedBy={urgent ? undefined : descId}
      >
        {urgent ? (
          <div className="relative flex h-full min-h-0 flex-col bg-white">
            <button
              type="button"
              className="absolute left-3 cursor-pointer top-3 z-[2] rounded-full p-2 text-black hover:bg-slate-100"
              aria-label="Back"
              onClick={() => setOpen(false)}
            >
              <HiOutlineArrowLeft className="h-6 w-6" />
            </button>

            <header className="shrink-0 border-b border-[#E0E0E0] px-4 pb-3 pl-16 pr-4 pt-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2
                    id={chatTitleId}
                    className="truncate text-base font-bold text-black"
                  >
                    {row.physicianName}
                  </h2>
                  <p className="mt-0.5 text-xs text-[#686464]">
                    Order ID: {orderIdLabel(row)}
                  </p>
                </div>
                <div className="relative shrink-0 pt-1">
                  <div
                    className="absolute bottom-[calc(100%+10px)] right-0 z-[1] w-[min(260px,calc(100vw-4rem))] rounded-xl bg-white p-3 text-left shadow-lg ring-1 ring-black/5"
                    role="status"
                  >
                    <p className="text-xs font-bold leading-snug text-black">
                      You have a new reminder from ProHealth!
                    </p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-[#9B9B9B]">
                      This is a sample message from the agency to the physician
                      while sending out a reminder.
                    </p>
                  </div>
                  <Image src={urgentBellImage} alt="Urgent" className="h-10 w-10 object-contain" />
                </div>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <p className="mb-4 text-center text-[12px] font-medium uppercase tracking-wide text-[#9B9B9B]">
                Today
              </p>
              <div className="flex flex-col gap-2">
                {chatMessages.map((m, i) => (
                  <ChatMessageBlock key={`${m.sender}-${i}`} {...m} />
                ))}
              </div>
            </div>

            <footer className="shrink-0 border-t border-slate-200/90 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type message"
                  className="min-w-0 flex-1 rounded-full border-[0.5px] border-[#DDDDDD] bg-white px-4 py-2.5 text-sm text-black placeholder:text-[#9B9B9B] outline-none focus:border-[#528DB5] focus:ring-1 focus:ring-[#528DB5]/30"
                />
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-gradient-to-b from-[#579EBA] to-[#4F81B2] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4679a0]"
                >
                  Send
                </button>
              </div>
            </footer>
          </div>
        ) : (
          <div className="relative flex min-h-[min(85vh,368px)] flex-col bg-white">
            <button
              type="button"
              className="absolute left-3 cursor-pointer top-3 z-[2] rounded-full p-2 text-black hover:bg-slate-100"
              aria-label="Back"
              onClick={() => setOpen(false)}
            >
              <HiOutlineArrowLeft className="h-6 w-6" />
            </button>

            <div className="flex flex-1 flex-col items-center justify-center px-6 pt-12 text-center">
              <Image
                src={noAlertsImage}
                alt="No Alerts"
                className="h-[120px] w-full object-contain"
              />

              <div className="mt-5 flex flex-col items-center gap-1">
                <p
                  id={titleId}
                  className="inline-block text-base font-semibold text-black sm:text-lg"
                >
                  No New Alerts!
                </p>
                <p
                  id={descId}
                  className="max-w-[340px] text-sm leading-relaxed text-[#9B9B9B] sm:text-[15px]"
                >
                  You don&apos;t have any notifications at the moment.
                  <br />
                  Check back later for updates.
                </p>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
