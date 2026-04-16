import Button from "@/components/ui/button/Button";
import IntegrationCard from "../card/IntegrationCard";
import { integrations } from "@/data/integrations";

export default function IntegrationSection() {
  return (
    <div className="border border-gray-200 rounded-xl p-6">
      {/* Info Banner */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white mb-6 text-sm text-gray-600">
        Ordina securely connects to your EHR using OAuth-based authorization.
        We only read required patient and provider context — no records are modified.
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {integrations.map((item) => (
          <IntegrationCard key={item.id} {...item} />
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">Save</Button>
      </div>
    </div>
  );
}