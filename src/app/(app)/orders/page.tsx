"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Plus, ArrowUpFromLine, CloudSync, ChevronDown, ListFilter } from "lucide-react";
import Tabs from "@/components/ui/tab/Tabs";
import { TabsActions } from "@/components/ui/tab/TabsActions";
import Button from "@/components/ui/button/Button";
import Table from "@/components/common/table/Table";
import MinimalPagination from "@/components/common/pagination/Pagination";
import SearchBox from "@/components/ui/SearchBox";
import { orders, tabs } from "./orders.data";
import { getOrderColumns } from "./components/getOrderColumns";
import OrdersFilterDialog from "@/components/common/OrdersFilterDialog";



// ─── Main Component ──────────────────────────────────────────────────────────
export default function OrdersTable() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filtered = orders.filter(
    (o) =>
      o.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.orderType.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const PAGE_SIZE = 4;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;

  const paginatedOrders = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const columns = getOrderColumns(activeTab);



  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto">
        {/* ── Top Bar ── */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-600">
            {tabs[activeTab]?.label} Orders
          </h1>

          <div className="flex flex-col sm:flex-row sm:justify-between flex-wrap items-start sm:items-center gap-3 w-full xl:w-auto">
            {/* Search */}
            <div className="w-full sm:w-auto">
              <SearchBox value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide max-w-full">
              <Button
                variant="secondary"
                size="md"
                leftIcon={<ArrowUpFromLine size={14} />}
                className="whitespace-nowrap shrink-0"
              >
                Export Orders
              </Button>
              <Button variant="tealGreen" size="md" leftIcon={<CloudSync size={14} />} className="whitespace-nowrap shrink-0">
                Sync
              </Button>

              {/* Filter Button */}
              <button
                className="h-[40px] px-3 flex items-center justify-center rounded-lg border border-green-540 text-green-540 hover:bg-green-50 transition-colors cursor-pointer shrink-0"
              >
                <ChevronDown size={18} />
              </button>

              <Button variant="primary" size="md" leftIcon={<Plus size={14} />} className="whitespace-nowrap shrink-0">
                New Order
              </Button>
            </div>
          </div>
        </div>

        <Tabs
          tabs={tabs}
          activeIndex={activeTab}
          onChange={setActiveTab}
          rightSection={
            <TabsActions
              onClick={() => setIsFilterOpen(true)}
              activeTab={activeTab}
              onMyOrdersClick={() => setActiveTab(6)} // 👈 change tab index here
            />
          }
        />
        <p className="hidden xl:block text-[12px] font-normal text-grayCustom-500 mt-2">Last synced on 11-19-2025 at 09:20 AM</p>

        {/* ── Table ── */}
        <div className="w-full overflow-y-hidden overflow-x-auto mt-4">
          <div className="min-w-[1200px] mb-4">
            <Table data={paginatedOrders} columns={columns} colNum={columns.length} />
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


      {/* <OrderFilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      /> */}
      <OrdersFilterDialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
}
