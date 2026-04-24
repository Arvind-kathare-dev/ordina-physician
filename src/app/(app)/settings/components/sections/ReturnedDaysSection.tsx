import SectionWrapper from "../SectionWrapper";
import ActionButtons from "../ActionButtons";
import { FileText } from "lucide-react";
import FormRow from "../FormRow";
import SearchBox from "@/components/ui/SearchBox";
import Table from "../Table";
import CustomSelect from "@/components/ui/select/CustomSelect";
import { useState } from "react";
import { SectionWrapperBox } from "../SectionWrapperBox";
import Button from "@/components/ui/button/Button";
import { Rule } from "../../types/settings.types";

const serviceOptions = [
  { label: "Hospice Care", value: "hospice" },
  { label: "Home Health", value: "home_health" },
  { label: "Skilled Nursing", value: "skilled_nursing" },
  { label: "Durable Medical Equipment (DME)", value: "dme" },
];

const orderOptions = [
  { label: "Medication Orders", value: "medication" },
  { label: "Lab Test Orders", value: "lab_tests" },
  { label: "Radiology Orders", value: "radiology" },
  { label: "Physician Certification", value: "physician_cert" },
  { label: "Treatment Plan Approval", value: "treatment_plan" },
];

const thresholdOptions = [
  { label: "24", value: "24" },
  { label: "48", value: "48" },
  { label: "72", value: "72" },
  { label: "5", value: "5" },
  { label: "7", value: "7" },
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
          <div className="border border-gray-200 rounded-xl p-5 mb-6 bg-white">

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 leading-5">
                  Add / Update a Rule
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 leading-4">
                  Set a threshold per Service Type + Order Type
                </p>
              </div>

              {/* Collapse Icon (optional) */}
              <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-md">
                <svg
                  className="w-3 h-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Form Row */}
            <FormRow col="4">
              <CustomSelect
                label="Service Type"
                value={serviceType}
                onChange={setServiceType}
                options={serviceOptions}
              />

              <CustomSelect
                label="Order Type (within service)"
                value={orderType}
                onChange={setOrderType}
                options={orderOptions}
              />

              <CustomSelect
                label="Threshold"
                value={threshold}
                onChange={setThreshold}
                options={thresholdOptions}
              />

              <CustomSelect
                label="Unit"
                value={unit}
                onChange={setUnit}
                options={unitOptions}
              />
            </FormRow>

            {/* Tip Text */}
            <p className="text-[13px] text-gray-400 mt-3 leading-5">
              Tip: If you want "Returned-in Time" to turn "late" after 48 hours, set 2 Days (or 48 Hours).
              We recommend keeping units consistent (days) unless your workflow is hour-based.
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">

              <Button variant="secondary">
                Set Default
              </Button>

              <Button variant="primary" onClick={handleAddRule}>
                Add / Update
              </Button>
            </div>
          </div>

          {/* Search + Table */}
          <div className="flex justify-between items-center mb-4">
            <SearchBox />
            <Button variant="danger" >Clear All</Button>
          </div>

          <Table data={rules}
            columns={columns}
            onDelete={handleDelete} />

          <p className="text-[13px] text-gray-400 mt-4">
            Evaluation order: Exact match (Service+Order) → Default → otherwise no SLA applied.
          </p>
        </SectionWrapper>


      </SectionWrapperBox>
      {/* Info Card */}
      <div className="bg-white shadow-card2 rounded-[20px] p-5">

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          How this affects “Returned-in Days”
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-4 leading-4">
          Ordina will compare time since sent vs your threshold for the matching service+order type.
          You can use this to drive Alerts, Undelivered follow-ups, and Physician Latency.
        </p>

        {/* Inner Card */}
        <div className="border border-ordinaBorder-200 rounded-lg p-4">

          {/* Header */}
          <div className="flex  justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-700">
                Example logic (recommended)
              </span>
              {/* Helper text */}
              <p className="text-[11px] text-gray-400 ">
                Green / Amber / Red based on how close to threshold you are
              </p>
            </div>


            {/* Collapse icon */}
            <button className="w-10 h-10 flex items-center justify-center border border-ordinaBorder-200 rounded-md bg-white">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>




        </div>
      </div>
    </div>
  );
}