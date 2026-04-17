export default function Table() {
  return (
    <div className="border border-ordinaBorder-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-4 bg-purple-120 text-xs font-medium text-gray-500 px-4 py-2">
        <span>Service Type</span>
        <span>Order Type</span>
        <span>Threshold</span>
        <span>Actions</span>
      </div>

      <div className="px-4 py-6 text-sm text-gray-400">
        No rules found. Add one above, or click Auto-fill Starter Rules.
      </div>
    </div>
  );
}