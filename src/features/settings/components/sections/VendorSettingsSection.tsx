import SectionWrapper from "../SectionWrapper";
import { FileText } from "lucide-react";
import FormRow from "../FormRow";
import SearchBox from "@/components/ui/SearchBox";
import Table from "../Table";
import CustomSelect from "@/components/ui/select/CustomSelect";
import { useState } from "react";
import { SectionWrapperBox } from "../SectionWrapperBox";
import Button from "@/components/ui/button/Button";

export default function VendorSettingsSection() {
    const [role, setRole] = useState("");
    return (
        <div className="flex flex-col gap-6">
  <SectionWrapperBox  title="Vendor Settings">
<SectionWrapper
                title="Vendor Settings"
                description="Ordina will route the signed order to the selected supplier agency"
                icon={FileText}
            >
                {/* Form */}
                <FormRow col="3">
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
                        label="Location"
                        value={role}
                        onChange={setRole}
                        options={[
                            { label: "Physician", value: "physician" },
                            { label: "Nurse", value: "nurse" },
                            { label: "Admin", value: "admin" },
                        ]}
                    />
                    <CustomSelect
                        label="Supplier"
                        value={role}
                        onChange={setRole}
                        options={[
                            { label: "Physician", value: "physician" },
                            { label: "Nurse", value: "nurse" },
                            { label: "Admin", value: "admin" },
                        ]}
                    />

                </FormRow>

                <div className="flex justify-end gap-3 mb-6">
                    <Button variant="danger">
                        Clear
                    </Button>
                    <Button variant="primary">
                        Save Settings
                    </Button>
                </div>

                {/* Search */}
                <div className="flex justify-between items-center mb-4">
                    <SearchBox />
                    <Button variant="danger" >Clear All</Button>
                </div>

                <Table />

                <p className="text-xs text-gray-400 mt-2">
                    Evaluation order: Exact match → Default → otherwise no SLA applied.
                </p>
            </SectionWrapper>

           
        </SectionWrapperBox>
        {/* Audit & Safety */}
<div className="bg-white shadow-card2 rounded-xl p-5">
  
  {/* Title */}
  <h3 className="text-sm font-semibold text-gray-900 mb-1">
    Audit & Safety
  </h3>

  {/* Description */}
  <p className="text-xs text-gray-500 mb-4 leading-4">
    If routing is misconfigured, signed DME orders may be sent to the wrong supplier. 
    Keep this limited to admins and log every routing change.
  </p>

  {/* Inner Container */}
  <div className="border border-gray-220 rounded-lg p-4 space-y-3">
    
    {/* Last Saved */}
    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm text-gray-500">
      <span>Last Saved</span>
      <span className="text-gray-400">—</span>
    </div>

    {/* Storage */}
    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm text-gray-500">
      <span>Storage</span>
      <span className="text-gray-400">local (demo)</span>
    </div>

  </div>
</div>
        </div>
      
            
    );
}