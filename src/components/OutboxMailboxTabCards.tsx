"use client";

import { TabGroupCard, type FilterSection } from "./common/OrderFilterGroups";
import type { OrderMailboxFilter } from "../data/ordersStaticData";

const PENDING_SECTION: FilterSection = {
  title: "Pending Orders",
  titleCount: 22,
  items: [
    { id: "outbox", label: "Outbox", count: 21 },
    { id: "alert", label: "Alert", count: 10 },
    { id: "undelivered", label: "Undelivered", count: 10 },
  ],
};

const RECEIVED_SECTION: FilterSection = {
  title: "Received Orders",
  titleCount: 41,
  items: [
    { id: "inbox", label: "Inbox", count: "05" },
    { id: "rejected", label: "Rejected", count: 1, countVariant: "danger" },
    { id: "emr", label: "Transferred to EMR", count: 10 },
  ],
};

const PENDING_MAILBOX_IDS = new Set<OrderMailboxFilter>([
  "outbox",
  "alert",
  "undelivered",
]);
const RECEIVED_MAILBOX_IDS = new Set<OrderMailboxFilter>([
  "inbox",
  "rejected",
  "emr",
]);

export function mailboxTabLabel(id: OrderMailboxFilter): string {
  const found =
    PENDING_SECTION.items.find((i) => i.id === id) ??
    RECEIVED_SECTION.items.find((i) => i.id === id);
  return found?.label ?? "Orders";
}

type OutboxMailboxTabCardsProps = {
  selectedMailbox: OrderMailboxFilter;
  onMailboxChange: (id: OrderMailboxFilter) => void;
};

export function OutboxMailboxTabCards({
  selectedMailbox,
  onMailboxChange,
}: OutboxMailboxTabCardsProps) {
  const pendingCardActiveId = PENDING_MAILBOX_IDS.has(selectedMailbox)
    ? selectedMailbox
    : "";
  const receivedCardActiveId = RECEIVED_MAILBOX_IDS.has(selectedMailbox)
    ? selectedMailbox
    : "";

  return (
    <div className="grid min-h-0 grid-cols-1 items-stretch gap-2 md:grid-cols-2 md:gap-2">
      <TabGroupCard
        section={PENDING_SECTION}
        activeId={pendingCardActiveId}
        emphasized={PENDING_MAILBOX_IDS.has(selectedMailbox)}
        onChange={(id) => onMailboxChange(id as OrderMailboxFilter)}
      />
      <TabGroupCard
        section={RECEIVED_SECTION}
        activeId={receivedCardActiveId}
        emphasized={RECEIVED_MAILBOX_IDS.has(selectedMailbox)}
        onChange={(id) => onMailboxChange(id as OrderMailboxFilter)}
      />
    </div>
  );
}
