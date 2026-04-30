export default function SettingsHeader() {
  return (
    <div className="mb-8 flex flex-col lg:flex-row justify-between items-start gap-6">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Edit onboarding information anytime. Changes apply to future orders.
        </p>
      </div>

      {/* Setup Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 w-full lg:w-80 shrink-0">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          Setup status
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          25% complete • Finish missing sections
        </p>

        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-[#528DB5] h-2 rounded-full w-[25%] transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}