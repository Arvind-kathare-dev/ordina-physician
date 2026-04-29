"use client";

import { Input } from "@/components/ui/input/Input";
import { InformationStepProps } from "../../types/information.types";
import { useState } from "react";
import ESignatureModal from "../../model/ESignatureModal";
import CustomSelect from "@/components/ui/select/CustomSelect";

export function InformationStep({ data, onChange }: InformationStepProps) {
  const [open, setOpen] = useState(false);

  const timezoneToLocation: Record<string, { city: string; state: string }> = {
    "IST_CH": { city: "Raipur", state: "Chhattisgarh" },
    "IST_MH": { city: "Mumbai", state: "Maharashtra" },
    "IST_MP": { city: "Bhopal", state: "Madhya Pradesh" },
    "IST_DL": { city: "New Delhi", state: "Delhi" },
  };

  const handleTimezoneChange = (val: string) => {
    const location = timezoneToLocation[val];
    if (location) {
      onChange({ 
        city: location.city, 
        state: location.state,
        timeZone: val 
      });
    } else {
      onChange({ timeZone: val });
    }
  };

  const getSignatureDisplayValue = () => {
    const sig = data.eSignature;
    const init = data.initial;
    
    if (!sig) return "";
    
    const initialPart = init ? ` (${init})` : "";
    
    // Detect if it's a data URL (image)
    if (sig.startsWith("data:") || sig.startsWith("blob:")) {
      return `Signed${initialPart}`;
    }
    
    // Otherwise it's the typed name
    return `${sig}${initialPart}`;
  };

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
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Input
            label="State license number"
            name="licenseNumber"
            value={data.licenseNumber}
            onChange={(e) => onChange({ licenseNumber: e.target.value })}
            placeholder="LIC123456789"
            required
          />
 
          <Input
            label="Create e-signature & Initial"
            name="signature"
            value={getSignatureDisplayValue()}
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

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full flex flex-col gap-6">
              <Input
                label="Full Name"
                name="fullName"
                value={data.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="Dr. John Smith"
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                placeholder="dr.john.smith@healthcare.com"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-6">
              <CustomSelect
                label="Role"
                required
                value={data.role}
                onChange={(val) => onChange({ role: val })}
                options={[
                  { label: "Physician", value: "physician" },
                  { label: "Nurse Practitioner", value: "nurse_practitioner" },
                  { label: "Medical Assistant", value: "medical_assistant" },
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

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full flex flex-col gap-6">
              <Input
                label="Practice / organization name"
                name="organizationName"
                value={data.organizationName}
                onChange={(e) => onChange({ organizationName: e.target.value })}
                placeholder="General Health Hospital"
                required
              />

              <Input
                label="City"
                name="city"
                value={data.city}
                onChange={(e) => onChange({ city: e.target.value })}
                placeholder="Select Timezone to auto-fill"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-6">
              <CustomSelect
                label="Timezone"
                required
                value={data.timeZone}
                onChange={handleTimezoneChange}
                placeholder="Select Timezone"
                options={[
                  { label: "IST (Chhattisgarh)", value: "IST_CH" },
                  { label: "IST (Maharashtra)", value: "IST_MH" },
                  { label: "IST (Madhya Pradesh)", value: "IST_MP" },
                  { label: "IST (Delhi)", value: "IST_DL" },
                ]}
              />

              <Input
                label="State"
                name="state"
                value={data.state}
                onChange={(e) => onChange({ state: e.target.value })}
                placeholder="Select Timezone to auto-fill"
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
        onSave={(sig, init) => {
          onChange({ 
            eSignature: sig.value,
            eSignatureName: sig.name || "",
            initial: init 
          });
          setOpen(false);
        }}
      />
    </>
  );
}
