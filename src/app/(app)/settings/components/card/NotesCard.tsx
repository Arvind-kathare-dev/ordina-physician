"use client";

export default function NotesCard() {
  return (
    <div className="border border-gray-100 rounded-[18px] bg-white overflow-hidden shadow-sm h-full">
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-6 border-b border-gray-50">
        <h3 className="text-[15px] font-bold text-[#4a4a4a]">Notes</h3>
        <span className="text-[12px] text-[#999]">
          How permissions work
        </span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 text-[13px] text-[#858585] leading-relaxed">
        {/* Description */}
        <p>
          Role presets are shortcuts. You can still fine-tune using toggles.
        </p>

        {/* Suggested Mapping */}
        <div>
          <p className="mb-2 font-medium">Suggested mapping:</p>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <span className="font-bold text-[#666]">Admin:</span> full access, can manage users.
            </li>
            <li>
              <span className="font-bold text-[#666]">Sub Admin:</span> operational access, limited settings.
            </li>
            <li>
              <span className="font-bold text-[#666]">User:</span> day-to-day workflows only.
            </li>
            <li>
              <span className="font-bold text-[#666]">Read Only:</span> view reports/orders but can’t edit/send.
            </li>
          </ul>
        </div>

        {/* Tip Box */}
        <div className="bg-[#f9fafb] text-[12px] text-[#666] border border-gray-100 rounded-xl p-4 leading-normal">
          <span className="font-bold text-[#999]">Tip:</span>{" "}
          Keep <span className="font-bold text-[#4a4a4a]">User Management</span> permission to a very small set of people. That prevents accidental access expansion across the agency.
        </div>
      </div>
    </div>
  );
}