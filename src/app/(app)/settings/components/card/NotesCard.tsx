"use client";

export default function NotesCard() {
  return (
    <div className="border max-w-[326px] border-gray-200 rounded-xl bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-6 border-b border-gray-220">
        <h3 className="text-[15px] font-medium text-gray-600">Notes</h3>
        <span className="text-xs text-gray-300">
          How permissions work
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 text-[13px] font-normal text-gray-300">
        {/* Description */}
        <p>
          Role presets are shortcuts. You can still fine-tune using toggles.
        </p>

        {/* Suggested Mapping */}
        <div>
          <p className="mb-1">Suggested mapping:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>
              <span className="">Admin:</span> full access, can manage users.
            </li>
            <li>
              <span className="font-medium">Sub Admin:</span> operational access, limited settings.
            </li>
            <li>
              <span className="font-medium ">User:</span> day-to-day workflows only.
            </li>
            <li>
              <span className="font-medium ">Read Only:</span> view reports/orders but can’t edit/send.
            </li>
          </ul>
        </div>

        {/* Tip Box */}
        <div className="bg-grayCustom-100 text-xs text-grayCustom-500 border border-gray-200 rounded-lg px-[15px] py-[15px] leading-4">
          <span className="text-gray-400">Tip:</span>{" "}
          Keep <span className="font-medium text-gray-700">User Management</span> permission to a very small set of people. That prevents accidental access expansion across the agency.
        </div>
      </div>
    </div>
  );
}