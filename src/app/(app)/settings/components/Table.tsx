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
    <div className="w-full overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-xs font-bold text-[#858585] uppercase tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
              <th className="px-4 py-3 text-xs font-bold text-[#858585] uppercase tracking-wider text-right whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-sm text-gray-400 italic"
                >
                  No data found. Add one above to get started.
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-[13px] text-[#4a4a4a] whitespace-nowrap"
                    >
                      {col.render
                        ? col.render(row)
                        : col.accessor
                        ? String(row[col.accessor])
                        : "-"}
                    </td>
                  ))}

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit?.(row)}
                        className="p-1 hover:text-[#528DB5] transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete?.(row)}
                        className="p-1 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}