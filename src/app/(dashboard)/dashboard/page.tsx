"use client";

import { NotificationPanel } from "@/features/dashboard/components/notification-section";
import EfaxSection from "@/features/dashboard/components/eFax-section";
import OrdersTable from "@/features/dashboard/components/orders-table";
import { BillableBarChart } from "@/features/dashboard/components/billable-bar-chart";
import CompletionBars from "@/features/dashboard/components/completion-bars";
import { ServicePieChart } from "@/features/dashboard/components/service-pie-chart";
import { StatCard } from "@/features/dashboard/components/stats-card";
import PhysicianSelector from "@/features/dashboard/components/physician-selector";
import SearchBox from "@/components/ui/SearchBox";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-3">
      {/* HEADER */}
      <header className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold text-grayCustom-600">Dashboard</h1>

        <div className="flex w-full sm:w-auto items-center gap-3">
          <SearchBox className="flex-1 sm:w-72" />
          <PhysicianSelector />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full mx-auto">
        <div className="grid grid-cols-12 gap-4">
          {/* LEFT CONTENT */}
          <div className="col-span-12 lg:col-span-9 space-y-4">
            {/* STATS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-gradient-light-yellow border-[0.3px] ">
                <StatCard
                  title="New Orders for the Day"
                  value={150}
                  desc="Today’s received orders across platform"
                />
                <StatCard
                  title="Signed Orders"
                  value={35}
                  desc="Completed signatures received across active physician orders"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-gradient-light-purple border-[0.3px]">
                <StatCard
                  title="Pending Orders"
                  value={68}
                  desc="Orders still awaiting signature before next care step"
                />
                <StatCard
                  title="MD Verification"
                  value={10}
                  desc="Received MD Verification orders across platform"
                />
              </div>
            </div>

            {/* TABLE + COMPLETION */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <OrdersTable />
              </div>
              <div>
                <BillableBarChart />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-[60%] ">
                <CompletionBars />
              </div>
              <div className="w-[40%]">
                <ServicePieChart />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="col-span-12 lg:col-span-3 space-y-4">
            <NotificationPanel />
            <EfaxSection />
          </aside>
        </div>
      </main>
    </div>
  );
}
