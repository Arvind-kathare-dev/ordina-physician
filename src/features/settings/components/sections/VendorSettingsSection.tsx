import SectionWrapper from "../SectionWrapper";
import FormSelect from "../FormSelect";
import { FileText } from "lucide-react";
import FormRow from "../FormRow";
import SearchBox from "@/components/ui/SearchBox";
import Table from "../Table";
import CustomSelect from "@/components/ui/select/CustomSelect";
import { useState } from "react";

export default function VendorSettingsSection() {
    const [role, setRole] = useState("");
    return (
        <div>
            <SectionWrapper
                title="Vendor Settings"
                description="Ordina will route the signed order to the selected supplier agency"
                icon={FileText}
            >
                {/* Form */}
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
                    <button className="px-4 py-2 text-red-500 border border-red-200 rounded-lg text-sm">
                        Clear
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                        Save Settings
                    </button>
                </div>

                {/* Search */}
                <div className="flex justify-between items-center mb-4">
                    <SearchBox />
                    <button className="text-red-500 text-sm">Clear All</button>
                </div>

                <Table />

                <p className="text-xs text-gray-400 mt-2">
                    Evaluation order: Exact match → Default → otherwise no SLA applied.
                </p>
            </SectionWrapper>

            {/* Audit */}
            <div className="border border-gray-200 rounded-lg p-4 mt-6">
                <h3 className="text-sm font-semibold mb-2">Audit & Safety</h3>
                <div className="space-y-3 text-sm text-gray-500">
                    <div className="border rounded-lg px-3 py-2">Last Saved</div>
                    <div className="border rounded-lg px-3 py-2 flex justify-between">
                        Storage <span>local (demo)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}