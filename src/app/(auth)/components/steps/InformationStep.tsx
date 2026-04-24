"use client";

import { Input } from "@/components/ui/input/Input";
import { InformationStepProps } from "../../types/information.types";
import { useState } from "react";
import ESignatureModal from "../../model/ESignatureModal";
import CustomSelect from "@/components/ui/select/CustomSelect";

export function InformationStep({ data, onChange }: InformationStepProps) {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [signature, setSignature] = useState(null);

  const stateOptions = [
    { label: "Chhattisgarh", value: "chhattisgarh" },
    { label: "Maharashtra", value: "maharashtra" },
    { label: "Madhya Pradesh", value: "madhya_pradesh" },
    { label: "Delhi", value: "delhi" },
  ];

  const cityOptionsMap: Record<string, { label: string; value: string }[]> = {
    chhattisgarh: [
      { label: "Raipur", value: "raipur" },
      { label: "Bilaspur", value: "bilaspur" },
      { label: "Durg", value: "durg" },
    ],
    maharashtra: [
      { label: "Mumbai", value: "mumbai" },
      { label: "Pune", value: "pune" },
      { label: "Nagpur", value: "nagpur" },
    ],
    madhya_pradesh: [
      { label: "Bhopal", value: "bhopal" },
      { label: "Indore", value: "indore" },
      { label: "Gwalior", value: "gwalior" },
    ],
    delhi: [
      { label: "New Delhi", value: "new_delhi" },
      { label: "Dwarka", value: "dwarka" },
      { label: "Rohini", value: "rohini" },
    ],
  };

  const options = [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];
  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-medium text-gray-900">Information</h3>
          <p className="text-lg text-gray-500 py-[15px] px-[17px] input-border border-dashed  rounded-md">
            This helps agencies identify the signing provider and route orders
            to the right inbox.
          </p>
        </div>

        {/* LICENSE + SIGNATURE */}
        <div className="flex items-center gap-6">
          <Input
            label="State license number"
            name="licenseNumber"
            value={data.licenseNumber}
            onChange={(e) => onChange({ licenseNumber: e.target.value })}
            placeholder="JH0865523"
            required
          />

        
            <Input
                label="Create e-signature & Initial"
                name="signature"
                value={signature ? "Signature Added" : ""}
  onClick={() => setOpen(true)}
                placeholder="Your e-signature"
                required
                readOnly 
              />
        </div>

        <hr className="border-gray-50" />

        {/* PERSONAL INFO */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-medium text-gray-900">
            Personal Information
          </h3>

          <div className="flex gap-3">
            <div className="w-full flex flex-col gap-6">
              <Input
                label="Full Name"
                name="fullName"
                value={data.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="John Doe"
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-6">
              <CustomSelect
                label="Role"
                required
                value={role}
                onChange={setRole}
                options={[
                  { label: "Physician", value: "physician" },
                  { label: "Nurse", value: "nurse" },
                  { label: "Admin", value: "admin" },
                ]}
              />

              <Input
                label="Phone (Optional)"
                name="phone"
                value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="+91 9876543210"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-50" />

        {/* PRACTICE DETAILS */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-medium text-gray-900">
            Practice Details
          </h3>

          <div className="flex gap-6">
            <div className="w-full flex flex-col gap-6">
              <Input
                label="Practice / organization name"
                name="organizationName"
                value={data.organizationName}
                onChange={(e) => onChange({ organizationName: e.target.value })}
                placeholder="ABC Hospital"
                required
              />

              <Input
                label="City"
                name="city"
                value={data.city}
                onChange={(e) => onChange({ city: e.target.value })}
                placeholder="Raipur"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-6">
              <CustomSelect
                label="Timezone"
                required
                value={role}
                onChange={setRole}
                placeholder="IST"
                options={[
                  { label: "Physician", value: "physician" },
                  { label: "Nurse", value: "nurse" },
                  { label: "Admin", value: "admin" },
                ]}
              />

              <Input
                label="State"
                name="state"
                value={data.state}
                onChange={(e) => onChange({ state: e.target.value })}
                placeholder="Chhattisgarh"
                required
              />
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-500 py-[15px] px-[17px] input-border border-dashed  rounded-md">
          This helps agencies identify the signing provider and route orders to
          the right inbox.
        </p>
      </div>

      <ESignatureModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={(sig, initial) => {
          setOpen(false);
        }}
      />
    </>
  );
}
