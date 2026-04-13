"use client";

import EHRCard from "../EHRCard";

interface IntegrationStepProps {
  data: {
    ehrSystem: string;
    apiKey: string;
    webhookUrl: string;
  };
  onChange: (data: Partial<IntegrationStepProps["data"]>) => void;
}

export function IntegrationStep({ data, onChange }: IntegrationStepProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      {/* Info Banner */}
      <div className="border border-dashed border-gray-300 rounded-lg p-4 text-xs text-gray-600 mb-6">
        Ordina securely connects to your EHR using OAuth-based authorization. We
        only read required patient and provider context — no records are
        modified.
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <EHRCard
          name="Kareo"
          status="not_connected"
          description="Secure OAuth connection with drchrono required"
        />

        <EHRCard
          name="NextGen"
          status="connected"
          description="Secure OAuth connection with Nextgen required"
        />

        <EHRCard
          name="Epic"
          status="not_connected"
          description="Secure OAuth connection with epic required"
        />

        <EHRCard
          name="Athenahealth"
          status="not_connected"
          description="Secure OAuth connection with athenahealth required"
        />

        <EHRCard
          name="eClinicalWorks"
          status="not_connected"
          description="Secure OAuth connection with eClinicalWorks required"
        />

        <EHRCard
          name="Cerner"
          status="not_connected"
          description="Secure OAuth connection with symmetry required"
        />
      </div>
    </div>
  );
}
