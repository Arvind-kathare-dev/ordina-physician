'use client';

import { Input } from "@/components/ui/input/Input";
import { InformationStepProps } from "../../types/information.types";

export function InformationStep({ data, onChange }: InformationStepProps) {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium text-gray-900">Information</h3>
        <p className="text-lg text-gray-500 py-[15px] px-[17px] border border-gray-200 rounded-md">
          This helps agencies identify the signing provider and route orders to the right inbox.
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
          name="eSignature"
          value={data.eSignature}
          onChange={(e) => onChange({ eSignature: e.target.value })}
          placeholder="Your Signature"
          required
        />
      </div>

      <hr />

      {/* PERSONAL INFO */}
      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-medium text-gray-900">Personal Information</h3>

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
            <Input
              label="Role"
              name="role"
              value={data.role}
              onChange={(e) => onChange({ role: e.target.value })}
              placeholder="Doctor / Nurse"
              required
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

      <hr />

      {/* PRACTICE DETAILS */}
      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-medium text-gray-900">Practice Details</h3>

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
            <Input
              label="Timezone"
              name="timeZone"
              value={data.timeZone}
              onChange={(e) => onChange({ timeZone: e.target.value })}
              placeholder="IST"
              required
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

      <p className="text-lg text-gray-500 py-[15px] px-[17px] border border-gray-200 rounded-md">
        This helps agencies identify the signing provider and route orders to the right inbox.
      </p>

      <hr />
    </div>
  );
}