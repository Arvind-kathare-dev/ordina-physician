import SectionWrapper from "../SectionWrapper";
import ActionButtons from "../ActionButtons";
import { FileText, ChevronDown } from "lucide-react";
import FormRow from "../FormRow";
import SearchBox from "@/components/ui/SearchBox";
import Table from "../Table";
import CustomSelect from "@/components/ui/select/CustomSelect";
import { useState } from "react";
import { SectionWrapperBox } from "../SectionWrapperBox";
import Button from "@/components/ui/button/Button";
import { Rule } from "../../types/settings.types";

const serviceOptions = [
  { label: "Hospice", value: "hospice" },
  { label: "Home Health", value: "home_health" },
  { label: "Pharmacy", value: "pharmacy" },
  { label: "DME", value: "dme" },
  { label: "Lab", value: "lab" },
];

const orderOptions = [
  { label: "Medication Orders", value: "medication" },
  { label: "Lab Test Orders", value: "lab_tests" },
  { label: "Radiology Orders", value: "radiology" },
  { label: "Physician Certification", value: "physician_cert" },
  { label: "Treatment Plan Approval", value: "treatment_plan" },
];

const thresholdOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "7", value: "7" },
  { label: "14", value: "14" },
  { label: "30", value: "30" },


];

const unitOptions = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
];

const columns: any[] = [
  {
    key: "serviceType",
    header: "Service Type",
    accessor: "serviceType",
  },
  {
    key: "order",
    header: "Order",
    accessor: "order",
  },
  {
    key: "threshold",
    header: "Threshold",
    accessor: "threshold",
  },
];

export default function ReturnedDaysSection() {
  const [serviceType, setServiceType] = useState("");
  const [orderType, setOrderType] = useState("");
  const [threshold, setThreshold] = useState("");
  const [unit, setUnit] = useState("");
  const [rules, setRules] = useState<Rule[]>([]);
  const [isExampleOpen, setIsExampleOpen] = useState(false);
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(true);

  const handleAddRule = () => {
    if (!serviceType || !orderType || !threshold || !unit) return;

    const newRule: Rule = {
      serviceType,
      orderType,
      threshold,
      unit,
    };

    // Update if exists (Service + Order unique)
    setRules((prev) => {
      const exists = prev.find(
        (r) =>
          r.serviceType === serviceType &&
          r.orderType === orderType
      );

      if (exists) {
        return prev.map((r) =>
          r.serviceType === serviceType &&
            r.orderType === orderType
            ? newRule
            : r
        );
      }

      return [...prev, newRule];
    });

    // Reset form (optional)
    setServiceType("");
    setOrderType("");
    setThreshold("");
    setUnit("");
  };

  const handleDelete = (row: Rule) => {
    setRules((prev) => prev.filter((r) => r !== row));
  };


  return (
    <div className="flex flex-col gap-6">
      <SectionWrapperBox title="Returned-in Days Thresholds">
        <SectionWrapper
          title="Returned-in Days Thresholds"
          description="Define SLA limits that drive the Returned-in Days column (e.g., “Today”, “2 Days”, “7 Days”) and latency/alert logic. Rules are evaluated as: Service Type + Order Type → Threshold."
          icon={FileText}
        >
          {/* Add Rule */}
          <div className="border border-[#EBEBEB] rounded-2xl p-6 mb-8 bg-white transition-all duration-300">
            {/* Header */}
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsAddRuleOpen(!isAddRuleOpen)}
            >
              <div>
                <h3 className="text-[15px] font-bold text-[#303030]">Add / Update a Rule</h3>
                <p className="text-[13px] text-[#686464] mt-0.5">Set a threshold per Service Type + Order Type</p>
              </div>

              <button className="w-9 h-9 flex items-center justify-center border border-[#EBEBEB] rounded-xl bg-white hover:bg-gray-50 transition shadow-sm">
                <ChevronDown
                  className={`w-4 h-4 text-[#606060] transition-transform duration-300 ${isAddRuleOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Collapsible Content */}
            <div className={`grid transition-all duration-300 ease-in-out ${isAddRuleOpen ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <FormRow col="4">
                  <CustomSelect
                    label="Service Type"
                    required
                    value={serviceType}
                    onChange={setServiceType}
                    options={serviceOptions}
                  />
                  <CustomSelect
                    label="Order Type (within service)"
                    required
                    value={orderType}
                    onChange={setOrderType}
                    options={orderOptions}
                  />
                  <CustomSelect
                    label="Threshold"
                    required
                    value={threshold}
                    onChange={setThreshold}
                    options={thresholdOptions}
                  />
                  <CustomSelect
                    label="Unit"
                    required
                    value={unit}
                    onChange={setUnit}
                    options={unitOptions}
                  />
                </FormRow>

                <p className="text-[13px] text-[#686464] mt-4 leading-relaxed max-w-[800px]">
                  Tip: If you want “Returned-in Time” to turn “late” after 48 hours, set 2 Days (or 48 Hours). 
                  We recommend keeping units consistent (days) unless your workflow is hour-based.
                </p>

                <div className="flex justify-end gap-3 mt-8">
                  <Button 
                    variant="secondary"
                    className="min-w-[120px]"
                    onClick={() => {
                      setServiceType("");
                      setOrderType("");
                      setThreshold("");
                      setUnit("");
                    }}
                  >
                    Set Default
                  </Button>
                  <Button 
                    variant="primary" 
                    className="min-w-[120px]"
                    onClick={handleAddRule}
                    disabled={!serviceType || !orderType || !threshold || !unit}
                  >
                    Add/Update
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <SearchBox 
              className="w-full sm:w-auto" 
              placeholder="Search rules by service type, order type, or threshold..."
            />
            <Button variant="danger" className="w-full sm:w-auto">Clear All</Button>
          </div>

          <Table data={rules}
            columns={columns}
            onDelete={handleDelete}
            emptyMessage="No rules found. Add one above, or click Auto-fill Starter Rules."
          />

          <p className="text-[13px] text-gray-400 mt-4 font-medium">
            Evaluation order: Exact match (Service+Order) → Default (if configured) → otherwise no SLA applied.
          </p>
        </SectionWrapper>


      </SectionWrapperBox>
      {/* Info Card */}
      <div className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#F5F5F5] rounded-[24px] p-5 sm:p-8 mb-6">
        <h3 className="text-[16px] font-bold text-[#303030] mb-2">
          How this affects “Returned-in Days”
        </h3>
        <p className="text-[13px] text-[#686464] leading-relaxed max-w-[700px] mb-8">
          Ordina will compare time since sent vs your threshold for the matching service+order type. You can use this to drive Alerts, Undelivered follow-ups, and Physician Latency.
        </p>

        <div className="border border-[#EBEBEB] rounded-[20px] p-6">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsExampleOpen(!isExampleOpen)}
          >
            <div>
              <h4 className="text-[15px] font-bold text-[#303030]">Example logic (recommended)</h4>
              <p className="text-[13px] text-[#686464] mt-0.5">Green / Amber / Red based on how close to threshold you are</p>
            </div>
            <div className="w-9 h-9 flex items-center justify-center border border-[#EBEBEB] rounded-xl bg-white hover:bg-gray-50 transition-colors">
              <svg 
                className={`w-4 h-4 text-[#686464] transition-transform duration-200 ${isExampleOpen ? "rotate-180" : ""}`}
                fill="none" 
                stroke="currentColor" 
                strokeWidth={2.5} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {isExampleOpen && (
            <div className="mt-8 pt-8 border-t border-[#EBEBEB] animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="text-[13px] text-[#686464] space-y-5">
                <p>If you want the column to show the dot color similarly to your screenshot:</p>
                <ul className="list-disc list-inside space-y-2 ml-1">
                  <li>Green: elapsed ≤ 60% of threshold</li>
                  <li>Amber: 60% &lt; elapsed ≤ 100% of threshold</li>
                  <li>Red: elapsed &gt; threshold</li>
                </ul>
                <p className="pt-2">This page only configures the threshold. Your backend/FE can apply the above color rules consistently.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}