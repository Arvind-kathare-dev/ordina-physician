import { useState } from "react";



const subCategoryFields = [
  { id: "symptom", label: "Symptom Addressed" },
  { id: "medications", label: "Medication(s)" },
  { id: "dose", label: "Dose/Route/Frequency" },
  { id: "non-pharma", label: "Non-pharmacologic Measures" },
  { id: "goal", label: "Goal of Treatment" },
  { id: "provider", label: "Provider Signature" },
];

const filledFields = new Set(["symptom", "goal"]);

const fieldForms: Record<string, { fields: { label: string; placeholder: string }[] }> = {
  symptom: { fields: [{ label: "Symptom Addressed", placeholder: "Write" }, { label: "Goal of Treatment", placeholder: "Write" }] },
  medications: { fields: [{ label: "Medication(s)", placeholder: "Write" }] },
  dose: { fields: [{ label: "Dose", placeholder: "Write" }, { label: "Route", placeholder: "Write" }, { label: "Frequency", placeholder: "Write" }] },
  "non-pharma": { fields: [{ label: "Non-pharmacologic Measures", placeholder: "Write" }] },
  goal: { fields: [{ label: "Symptom Addressed", placeholder: "Write" }, { label: "Goal of Treatment", placeholder: "Write" }] },
  provider: { fields: [{ label: "Provider Signature", placeholder: "Write" }] },
};



export function AddOrderDetailsModal({ onBack }: { onBack: () => void }) {
  const [activeField, setActiveField] = useState("symptom");
  const [formValues, setFormValues] = useState<Record<string, Record<string, string>>>({});

  const handleChange = (sectionId: string, fieldLabel: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [sectionId]: { ...(prev[sectionId] || {}), [fieldLabel]: value } }));
  };

  const currentForm = fieldForms[activeField];

  return (
    <div className="  w-[800px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-8 py-5 border-b border-gray-100">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Add Order Details</h2>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-[320px] flex-shrink-0 px-6 pt-7 pb-6 border-r border-gray-100">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Sub-Category Fields</p>
          <div className="flex flex-col gap-2">
            {subCategoryFields.map((field) => {
              const isActive = activeField === field.id;
              const isFilled = filledFields.has(field.id);
              return (
                <button key={field.id} onClick={() => setActiveField(field.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                    isActive ? "bg-[#e8f2f9] text-gray-800 border border-[#b8d8ee]" : "bg-white text-gray-700 border border-transparent hover:bg-gray-50"}`}>
                  <span>{field.label}</span>
                  {isFilled ? (
                    <span className="w-6 h-6 rounded-full bg-[#2b7eb0] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                  ) : (
                    <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 px-6 pt-7 pb-6">
          <div className="border border-gray-200 rounded-xl h-full flex flex-col" style={{ minHeight: "720px" }}>
            {/* Panel Header */}
            <div className="px-7 pt-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Add Details</h3>
              <p className="text-xs text-gray-400 mt-0.5">Order Sub-category fields</p>
            </div>

            {/* Panel Form */}
            <div className="px-7 pt-6 flex-1 flex flex-col gap-5">
              {currentForm?.fields.map((f) => (
                <div key={f.label}>
                  <label className="block text-sm text-gray-700 mb-2">{f.label}</label>
                  <textarea
                    placeholder={f.placeholder}
                    value={formValues[activeField]?.[f.label] || ""}
                    onChange={(e) => handleChange(activeField, f.label, e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b7eb0] resize-none"
                  />
                </div>
              ))}
            </div>

            {/* Panel Footer */}
            <div className="flex justify-end px-7 py-5">
              <button className="bg-[#a8cce0] hover:bg-[#2b7eb0] text-white text-sm font-semibold px-8 py-2.5 rounded-md transition-colors">
                Add &amp; Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
