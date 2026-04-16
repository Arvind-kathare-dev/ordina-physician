import SectionWrapper from "../SectionWrapper";
import FormSelect from "../FormSelect";
import ActionButtons from "../ActionButtons";
import { FileText } from "lucide-react";
import FormRow from "../FormRow";
import SearchBox from "@/components/ui/SearchBox";
import Table from "../Table";
import CustomSelect from "@/components/ui/select/CustomSelect";
import { useState } from "react";

export default function ReturnedDaysSection() {
    const [role, setRole] = useState("");
  return (
    <div>
      <SectionWrapper
        title="Returned-in Days Thresholds"
        description="Define SLA limits that drive the Returned-in Days column"
        icon={FileText}
      >
        {/* Add Rule */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold mb-4">
            Add / Update a Rule
          </h3>

          <FormRow>
              <CustomSelect
            label="Service Type"
            value={role}
            onChange={setRole}
            options={[
              { label: "Physician", value: "physician" },
              { label: "Nurse", value: "nurse" },
              { label: "Admin", value: "admin" },
            ]}
          />
           <CustomSelect
            label="Order Type"
            value={role}
            onChange={setRole}
            options={[
              { label: "Physician", value: "physician" },
              { label: "Nurse", value: "nurse" },
              { label: "Admin", value: "admin" },
            ]}
          />
           <CustomSelect
            label="Threshold"
            value={role}
            onChange={setRole}
            options={[
              { label: "Physician", value: "physician" },
              { label: "Nurse", value: "nurse" },
              { label: "Admin", value: "admin" },
            ]}
          />
           <CustomSelect
            label="Unit"
            value={role}
            onChange={setRole}
            options={[
              { label: "Physician", value: "physician" },
              { label: "Nurse", value: "nurse" },
              { label: "Admin", value: "admin" },
            ]}
          />
           
          </FormRow>

          

          <div className="flex justify-end gap-3 mt-4">
            <button className="px-4 py-2 border rounded-lg text-sm">
              Set Default
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
              Add / Update
            </button>
          </div>
        </div>

        {/* Search + Table */}
        <div className="flex justify-between items-center mb-4">
          <SearchBox />
          <button className="text-red-500 text-sm">Clear All</button>
        </div>

        <Table />

        <p className="text-xs text-gray-400 mt-2">
          Evaluation order: Exact match (Service+Order) → Default → otherwise no SLA applied.
        </p>
      </SectionWrapper>

      {/* Info Card */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2">
          How this affects “Returned-in Days”
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Ordina will compare time since sent vs your threshold for the matching recommended type.
        </p>

        <div className="border rounded-lg p-3 text-xs text-gray-600">
          Example logic (recommended)
        </div>
      </div>
    </div>
  );
}