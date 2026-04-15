"use client";

import { useState } from "react";
import { ArrowLeft, Plus, ArrowUpFromLine, CloudSync } from "lucide-react";
import Tabs from "@/components/ui/tab/Tabs";
import { TabsActions } from "@/components/ui/tab/TabsActions";
import Button from "@/components/ui/button/Button";
import Table from "@/components/common/table/Table";
import { orders, tabs } from "@/features/orders/orders.data";
import MinimalPagination from "@/components/common/pagination/Pagination";
import SearchBox from "@/components/ui/SearchBox";
import { getOrderColumns } from "@/features/orders/components/getOrderColumns";
import NewOrderModal from "@/features/orders/components/NewOrderModal";


// ─── Main Component ──────────────────────────────────────────────────────────
export default function OrdersTable() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  // const totalPages = 25;

  const filtered = orders.filter(
    (o) =>
      o.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.orderType.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const PAGE_SIZE = 2;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const columns = getOrderColumns(activeTab);

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto">
        {/* ── Top Bar ── */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {/* <button className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors">
            <ArrowLeft size={16} />
          </button> */}
          <h1 className="text-2xl font-semibold text-gray-600 mr-auto">
            {tabs[activeTab]?.label} Orders
          </h1>

          {/* Search */}
          <SearchBox value={searchQuery} onChange={setSearchQuery} />

          <Button
            variant="secondary"
            size="md"
            leftIcon={<ArrowUpFromLine size={14} />}
          >
            Export Orders
          </Button>
          <Button variant="teal" size="md" leftIcon={<CloudSync size={14} />}>
            Sync
          </Button>
          <Button variant="primary" size="md" onClick={() => setOpen(true)} leftIcon={<Plus size={14}  />}>
            New Order
          </Button>
        </div>

        <Tabs
          tabs={tabs}
          activeIndex={activeTab}
          onChange={setActiveTab}
          rightSection={<TabsActions />}
        />

        {/* Sync timestamp */}
        <p className="text-xs font-normal text-slate-400 my-2">
          Last synced on 11-19-2025 at 09:20 AM ↺
        </p>

        {/* ── Table ── */}
        <div className="w-full overflow-y-hidden overflow-x-auto">
          <div className="min-w-[1200px] mb-4">
            <Table data={orders} columns={columns} colNum={columns.length} />

          </div>
        </div>

        <MinimalPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          label="Orders"
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      {open && <NewOrderModal onClose={() => setOpen(false)} />}
    </div>
  );
}
