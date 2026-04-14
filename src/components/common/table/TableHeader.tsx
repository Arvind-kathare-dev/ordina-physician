// components/ui/table/TableHeader.tsx

const columns = [
  "Date",
  "Patient Name",
  "Order Type",
  "Service Type",
  "Agency",
  "Label",
  "Order Received",
  "Received",
  "Actions",
];

export default function TableHeader() {
  return (
    <div className="hidden md:grid grid-cols-9 bg-gradient-to-r from-teal-600 to-blue-500 text-white text-sm px-4 py-3 rounded-t-xl">
      {columns.map((col) => (
        <div key={col} className="font-medium">
          {col}
        </div>
      ))}
    </div>
  );
}