


import SectionWrapper from "../SectionWrapper";
import { FileText } from "lucide-react";
import FormRow from "../FormRow";
import SearchBox from "@/components/ui/SearchBox";
import Table from "../Table";
import CustomSelect from "@/components/ui/select/CustomSelect";
import { useState } from "react";
import { SectionWrapperBox } from "../SectionWrapperBox";
import Button from "@/components/ui/button/Button";
import { LOCATIONS, SERVICE_TYPES, SUPPLIERS } from "../../constant/vendorOptions";

type Rule = {
  serviceType: string;
  location: string;
  supplier: string;
};

const columns: any[] = [
  {
    key: "serviceType",
    header: "Service Type",
    accessor: "serviceType",
  },
  {
    key: "location",
    header: "Location",
    accessor: "location",
  },
  {
    key: "supplier",
    header: "Supplier",
    accessor: "supplier",
  },
];

export default function VendorSettingsSection() {
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [rules, setRules] = useState<Rule[]>([]);

  const handleAddRule = () => {
    if (!serviceType || !location || !supplier) return;

    const newRule: Rule = {
      serviceType,
      location,
      supplier,
    };

    setRules((prev) => [...prev, newRule]);

    // reset form
    setServiceType("");
    setLocation("");
    setSupplier("");
  };

  const handleDelete = (row: Rule) => {
    setRules((prev) => prev.filter((r) => r !== row));
  };


  return (
    <div className="flex flex-col gap-6">
      <SectionWrapperBox title="Vendor Settings">
        <SectionWrapper
          title="Vendor Settings"
          description="Ordina will route the signed order to the selected supplier agency"
          icon={FileText}
        >
          {/* Form */}
          <FormRow col="3">
            <CustomSelect
              label="Service Type"
              value={serviceType}
              onChange={setServiceType}
              options={SERVICE_TYPES}
            />

            <CustomSelect
              label="Location"
              value={location}
              onChange={setLocation}
              options={LOCATIONS}
            />

            <CustomSelect
              label="Supplier"
              value={supplier}
              onChange={setSupplier}
              options={SUPPLIERS}
            />

          </FormRow>

          <div className="flex justify-end gap-3 mb-6">
            <Button variant="danger" onClick={() => {
              setServiceType("");
              setLocation("");
              setSupplier("");
            }}>
              Clear
            </Button>
            <Button variant="primary" onClick={handleAddRule}>
              Save Settings
            </Button>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <SearchBox className="w-full sm:w-auto" />
            <Button variant="danger" className="w-full sm:w-auto">Clear All</Button>
          </div>

          <Table data={rules}
            columns={columns}
            onDelete={handleDelete} />

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