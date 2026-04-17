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

export default function ReturnedDaysSection() {
    const [serviceType, setServiceType] = useState("");
const [orderType, setOrderType] = useState("");
const [threshold, setThreshold] = useState("");
const [unit, setUnit] = useState("");
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
      options={[
        { label: "PECOS", value: "pecos" },
      ]}
    />

    <CustomSelect
      label="Order Type (within service)"
      value={orderType}
      onChange={setOrderType}
      options={[
        { label: "PECOS", value: "pecos" },
      ]}
    />

    <CustomSelect
      label="Threshold"
      value={threshold}
      onChange={setThreshold}
      options={[
        { label: "2", value: "2" },
      ]}
    />

    <CustomSelect
      label="Unit"
      value={unit}
      onChange={setUnit}
      options={[
        { label: "Days", value: "days" },
      ]}
    />
  </FormRow>

  {/* Tip Text */}
  <p className="text-xs text-gray-400 mt-3 leading-4">
    Tip: If you want "Returned-in Time" to turn "late" after 48 hours, set 2 Days (or 48 Hours). 
    We recommend keeping units consistent (days) unless your workflow is hour-based.
  </p>

  {/* Actions */}
  <div className="flex justify-end gap-3 mt-4">
    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
      Set Default
    </button>

    <button className="px-4 py-2 text-sm bg-[#5B97AE] text-white rounded-lg hover:opacity-90">
      Add / Update
    </button>
  </div>
</div>

        {/* Search + Table */}
        <div className="flex justify-between items-center mb-4">
          <SearchBox />
          <Button variant="danger" >Clear All</Button>
        </div>

        <Table />

        <p className="text-xs text-gray-400 mt-2">
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
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold text-gray-700">
        Example logic (recommended)
      </span>

      {/* Collapse icon */}
      <button className="w-5 h-5 flex items-center justify-center border border-ordinaBorder-200 rounded-md bg-white">
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

    {/* Helper text */}
    <p className="text-[11px] text-gray-400 mb-3 leading-4">
      Green / Amber / Red based on how close to threshold you are
    </p>

    {/* Rules */}
    <ul className="text-[11px] text-gray-600 space-y-1 leading-4">
      <li>• Green: elapsed ≤ 60% of threshold</li>
      <li>• Amber: 60% &lt; elapsed ≤ 100% of threshold</li>
      <li>• Red: elapsed &gt; threshold</li>
    </ul>

    {/* Footer Note */}
    <p className="text-[11px] text-gray-400 mt-3 leading-4">
      This page only configures the threshold. Your backend/FE can apply the above color rules consistently.
    </p>
  </div>
</div>
    </div>
  );
}