import EfaxSection from "./components/eFax-section";
import OrdersTable from "./components/orders-table";
import { BillableBarChart } from "./components/billable-bar-chart";
import CompletionBars from "./components/completion-bars";
import { ServicePieChart } from "./components/service-pie-chart";
import { StatCard } from "./components/stats-card";
import PhysicianSelector from "./components/physician-selector";
import SearchBox from "@/components/ui/SearchBox";
import { NotificationPanel } from "./components/notification-section";
import PhysicianMultiSelect from "./components/physician-multi-select";


export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      {/* HEADER */}
      <header className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold text-black">Dashboard</h1>

        <div className="flex flex-wrap w-full sm:w-auto items-center gap-3">
          <SearchBox className="flex-1 w-auto  md:w-[455px]" />
          <PhysicianMultiSelect />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full mx-auto">
        <div className="grid grid-cols-12 gap-4">
          {/* LEFT CONTENT */}
          <div className="col-span-12 lg:col-span-9 space-y-4">
            {/* STATS ROW */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-gradient-light-yellow border-[0.3px] border-yellow-450 ">
                <StatCard
                  title="New Orders for the Day"
                  subTitle="Order Type Breakdown"
                  value={150}
                  desc="Today’s received orders across platform"
                  total={150}
                  breakdown={[
                    { label: "POC / 485", count: 4, color: "blue" },
                    { label: "F2F", count: 6, color: "green" },
                    { label: "IPD", count: 2, color: "yellow" },
                  ]}
                />
                <StatCard
                  title="Signed Orders"
                  subTitle="By Order Type"
                  value={35}
                  desc="Completed signatures received across active physician orders"
                  total={35}
                  breakdown={[
                    { label: "POC / 485", count: 4, color: "blue" },
                    { label: "F2F", count: 6, color: "green" },
                    { label: "IPD", count: 2, color: "yellow" },
                  ]}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-gradient-light-purple border-[0.2px] border-purple-450">
                <StatCard
                  title="Pending Orders"
                  subTitle="By Order Type"
                  value={68}
                  desc="Orders still awaiting signature before next care step"
                  total={68}
                  breakdown={[
                    { label: "POC / 485", count: 10, color: "blue" },
                    { label: "F2F", count: 18, color: "green" },
                    { label: "IPD", count: 22, color: "yellow" },
                  ]}
                  aging={[
                    { label: "0-7 days", count: 10, color: "blue" },
                    { label: "8-15 days", count: 18, color: "green" },
                    { label: "16-24 days", count: 22, color: "yellow" },
                  ]}
                />
                <StatCard
                  title="MD Verification"
                  subTitle="By Order Type"
                  value={10}
                  desc="Received MD Verification orders across platform"
                  total={10}
                // breakdown={[
                //   { label: "POC / 485", count: 4, color: "blue" },
                //   { label: "F2F", count: 6, color: "green" },
                //   { label: "IPD", count: 2, color: "yellow" },
                // ]}
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
            <div className="w-full flex flex-col  md:flex-row gap-4">
              <div className="w-full md:w-[60%] ">
                <CompletionBars />
              </div>
              <div className="w-full md:w-[40%]">
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
