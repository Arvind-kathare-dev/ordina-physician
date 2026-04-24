"use client";

import DataTable from "@/components/common/DataTable";
import { TimeChipItem, TimeFilterBar } from "@/components/common/OrderFilterGroups";
import OrdersFilterDialog from "@/components/common/OrdersFilterDialog";
import { OrderTimeFilterTrailingActions } from "@/components/common/OrderTimeFilterTrailingActions";
import { usePhysicianNotificationsTableColumns } from "@/components/common/PhysicianNotificationsTableColumns";
import Header from "@/components/layout/Header";
import OutboxOrdersPageHeader from "@/components/OutboxOrdersPageHeader";
import { PHYSICIAN_NOTIFICATION_ROWS } from "@/data/physicianNotificationsStaticData";
import { useState } from "react";


const PHYSICIAN_NOTIFICATIONS_TABLE_GRID_COLUMNS =
  "minmax(6.75rem, 0.9fr) minmax(6.75rem, 0.9fr) minmax(8rem, 1fr) minmax(10rem, 1.15fr) minmax(11rem, 1.25fr) minmax(5.75rem, 0.72fr)";

const TIME_CHIPS: TimeChipItem[] = [
  { id: "all", label: "All" },
  { id: "30plus", label: "30+ Days" },
  { id: "24-30", label: "24-30 Days" },
  { id: "16-23", label: "16-23 Days" },
  { id: "8-15", label: "8-15 Days" },
  { id: "0-7", label: "0-7 Days" },
];

export default function PhysicianNotificationsPage() {
  const [timeRange, setTimeRange] = useState("all");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [tablePage, setTablePage] = useState(1);

  const pageHeading = "Physician Notifications";
  const columns = usePhysicianNotificationsTableColumns();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="min-h-0 flex-1 bg-slate-50">
        <div className="mx-auto max-w-400 space-y-4 px-3 py-4 sm:space-y-5 sm:px-4 sm:py-6 lg:px-6">
          <OutboxOrdersPageHeader pageHeading={pageHeading} />
          <div className="space-y-2 sm:space-y-2.5">
            <TimeFilterBar
              items={TIME_CHIPS}
              activeId={timeRange}
              onChange={setTimeRange}
              trailing={
                <OrderTimeFilterTrailingActions
                  filterDialogOpen={filterDialogOpen}
                  onOpenFilters={() => setFilterDialogOpen(true)}
                />
              }
            />
          </div>

          <DataTable
            columns={columns}
            rows={PHYSICIAN_NOTIFICATION_ROWS}
            getRowKey={(r) => r.id}
            gridTemplateColumns={PHYSICIAN_NOTIFICATIONS_TABLE_GRID_COLUMNS}
            pagination={{
              page: tablePage,
              onPageChange: setTablePage,
              summaryLabel: "Orders",
            }}
          />

          <OrdersFilterDialog
            open={filterDialogOpen}
            onClose={() => setFilterDialogOpen(false)}
          />
        </div>
      </main>
    </div>
  );
}
