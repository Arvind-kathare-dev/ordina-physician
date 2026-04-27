"use client";

import { useState } from "react";
import { Plus, ChevronFirst } from "lucide-react";
import Tabs from "@/components/ui/tab/Tabs";
import Button from "@/components/ui/button/Button";
import MinimalPagination from "@/components/common/pagination/Pagination";
import SearchBox from "@/components/ui/SearchBox";
import SegmentedControl from "@/components/ui/button/segmented-control";
import { TabsActionsMinimal } from "@/components/ui/tab/TabsActionsMinimal";
import Table from "@/components/common/table/Table";
import { getFaxColumns } from "./components/getFaxColumns";
import StatCard from "./components/StatCard";
import { faxData, statsData, tabs } from "./efax.data";

export default function EFaxPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState("orders");

  const filteredFaxes = faxData.filter(
    (f) =>
      f.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.faxNo.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const PAGE_SIZE = 4;

  const totalPages = Math.ceil(filteredFaxes.length / PAGE_SIZE) || 1;

  const paginatedFaxes = filteredFaxes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const columns = getFaxColumns(activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2  flex-wrap">
          <h1 className="text-2xl font-semibold text-grayCustom-600">eFax</h1>
          <div className="w-2/3 justify-end flex items-center gap-3">
            <SearchBox value={searchQuery} onChange={setSearchQuery} />

            <Button variant="primary" size="md" leftIcon={<Plus size={14} />}>
              New Fax
            </Button>
          </div>
        </div>
        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4  relative">
          {statsData.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
          <button className="absolute top-0 -right-10 p-2  rounded-lg bg-btn ">
            <ChevronFirst size={16} className="text-ordinadark font-bold" />
          </button>
        </div>
        <SegmentedControl
          value={tab}
          onChange={setTab}
          options={[
            { label: "Orders", value: "orders" },
            { label: "Others", value: "others" },
          ]}
        />
        <Tabs
          tabs={tabs}
          activeIndex={activeTab}
          onChange={setActiveTab}
          rightSection={<TabsActionsMinimal />}
        />
        {/* Table */}
        <div className="w-full overflow-x-auto mt-4">
          <div className="min-w-[1200px] mb-4">
            <Table data={paginatedFaxes} columns={columns} colNum={columns.length} />
          </div>
        </div>
        <MinimalPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredFaxes.length}
          label="eFax"
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
