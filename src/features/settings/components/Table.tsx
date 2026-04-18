import { Column } from "@/types/table";
import { Pencil, Trash2 } from "lucide-react";

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function Table<T>({
  data,
  columns,
  onEdit,
  onDelete,
}: TableProps<T>) {
  return (
    <div className="border border-ordinaBorder-200 rounded-lg overflow-hidden">

      {/* Header */}
      <div
        className={`grid grid-cols-${columns.length + 1} bg-purple-120 text-xs font-medium text-gray-500 px-4 py-2`}
      >
        {columns.map((col) => (
          <span key={col.key}>{col.header}</span>
        ))}
        <span>Actions</span>
      </div>

      {/* Empty */}
      {data.length === 0 ? (
        <div className="px-4 py-6 text-sm text-gray-400">
          No data found. Add one above.
        </div>
      ) : (
        <div className="divide-y">
          {data?.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-${columns?.length + 1} px-4 py-3 text-sm text-gray-700 items-center`}
            >
              {columns.map((col) => (
                <span key={col.key}>
                  {col.render
                    ? col.render(row)
                    : col.accessor
                      ? String(row[col.accessor])
                      : "-"}
                </span>
              ))}

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => onEdit?.(row)}>
                  <Pencil size={14}/>
                </button>
                <button onClick={() => onDelete?.(row)}>
                  <Trash2 size={14} className="text-ordina-40"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}