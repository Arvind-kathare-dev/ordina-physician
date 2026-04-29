"use client";

import { integrations } from "@/data/integrations";
import EHRCard from "../card/EHRCard";

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
    <div className=" border border-gray-200 rounded-md p-6">
      {/* Info Banner */}
      <div className="input-border border-dashed  rounded-lg p-4 text-xs text-gray-600 mb-6">
        Ordina securely connects to your EHR using OAuth-based authorization. We
        only read required patient and provider context — no records are
        modified.
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {integrations.map((item) => (
          <EHRCard 
            key={item.id} 
            {...item} 
            onSelect={(name) => onChange({ ehrSystem: name })}
          />
        ))}
      </div>
    </div>
  );
}
