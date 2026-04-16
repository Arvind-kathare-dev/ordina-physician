export default function SettingsHeader() {
  return (
    <div className="mb-8 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-sm text-gray-500">
          Edit onboarding information anytime. Changes apply to future orders.
        </p>
      </div>

      {/* Setup Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-80">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          Setup status
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          25% complete • Finish missing sections
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-[25%]" />
        </div>
      </div>
    </div>
  );
}