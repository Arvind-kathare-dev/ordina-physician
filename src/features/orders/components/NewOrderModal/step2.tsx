"use client";

import Button from "@/components/ui/button/Button";
import { MultiSelectDropdown } from "@/components/ui/dropdown/MultiSelectDropdown";
import { SimpleSelect } from "@/components/ui/select/SimpleSelect";
import { useState } from "react";

interface Props {
  state?: any;
  update?: (data: any) => void;
  next?: () => void;
  back?: () => void;
}

const orderTypeOptions = [
  "Medications",
  "Frequency Orders",
  "Add a New Discipline Orders",
  "Update Wound Care Orders",
  "Add Supplies Orders",
  "Update Plan of Care",
  "Reassessment Orders",
];

export default function Step2({ update, state, next }: Props) {
  const [serviceType, setServiceType] = useState("");
  const [orderType, setOrderType] = useState<string[]>([]);
  const [orderSubCategory, setOrderSubCategory] = useState("");
  const [agency, setAgency] = useState("");
  const [patient, setPatient] = useState("");

  return (
    <div className="w-[600px]">
      {/* Form */}
      <div className="space-y-5">
        {/* Service Type */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Service Type<span className="text-red-500">*</span>
          </label>
          <SimpleSelect
            placeholder="Select"
            value={serviceType}
            onChange={setServiceType}
            options={["Home Health", "Hospice", "Palliative Care"]}
          />
        </div>

        {/* Order Type + Order Sub-category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Order Type<span className="text-red-500">*</span>
            </label>
            <MultiSelectDropdown
              options={orderTypeOptions}
              placeholder="Select"
              value={orderType}
              onChange={setOrderType}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Order Sub-category<span className="text-red-500">*</span>
            </label>
            <SimpleSelect
              placeholder="Select"
              value={orderSubCategory}
              onChange={setOrderSubCategory}
              options={["Category A", "Category B", "Category C"]}
            />
          </div>
        </div>

        {/* Select Agency */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Select Agency<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3 items-start">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name/ID"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b7eb0] min-h-[40px] text-gray-800 placeholder-gray-400"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <button className="border border-[#2b7eb0] text-[#2b7eb0] text-sm font-medium px-4 py-2 rounded-md hover:bg-[#2b7eb0] hover:text-white transition-colors whitespace-nowrap min-h-[40px]">
              Sync Patient
            </button>
          </div>
          <p className="text-xs mt-1 text-gray-500">
            <span className="text-red-500 font-medium">Note:</span> If patient name does not exist add manually.
          </p>
        </div>

        {/* Select Patient */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Select Patient<span className="text-red-500">*</span>
          </label>
          <SimpleSelect
            placeholder="Select"
            value={patient}
            onChange={setPatient}
            options={["Patient A", "Patient B", "Patient C"]}
            className="max-w-[48%]"
          />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        {/* <button  className="bg-[#2b7eb0] hover:bg-[#246a99] text-white text-sm font-semibold px-8 py-2.5 rounded-md transition-colors">
            Next
          </button> */}
        <Button variant="primary" size="md" onClick={next}>
          Next
        </Button>
      </div>
    </div>
  );
}