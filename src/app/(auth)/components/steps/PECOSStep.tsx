"use client";

import { Input } from "@/components/ui/input/Input";

interface PECOSStepProps {
  data: {
    enrollmentId: string;
  };
  onChange: (data: Partial<PECOSStepProps["data"]>) => void;
}

export function PECOSStep({ data, onChange }: PECOSStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium text-gray-900">Credentials</h3>
        <p className="text-lg font-normal text-gray-500 py-[15px] px-[17px] border border-gray-200 rounded-md">
          This helps agencies identify the signing provider and route orders to
          the right inbox.
        </p>
      </div>

      <div className="max-w-[400px] w-full">
        <Input
          label="PECOS"
          name="PECOS"
          type="text"
          value={data.enrollmentId}
          onChange={(e) => onChange({ enrollmentId: e.target.value })}
          required
          hint="Used for Medicare enrollment and provider validation."
        />
      </div>
    </div>
  );
}
