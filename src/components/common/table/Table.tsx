
import { TableProps } from "@/types/table";

export default function Table<T>({ data, columns, colNum = 8 }: TableProps<T>) {
  
  return (
    <div className="space-y-3">

      {/* HEADER */}
      <div
        className="hidden md:grid  bg-primary-gradient shadow-custom-bottom  text-white text-sm px-4 py-3 rounded-md"
        style={{
          gridTemplateColumns: `repeat(${colNum}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((col) => (
          <div key={col.key}>{col.header}</div>
        ))}
      </div>

      {/* ROWS */}
      {data.map((row: any, index) => (
        <div
          key={index}
          className="h-[80px] grid grid-cols-1  gap-3 md:gap-0 items-center bg-white shadow-custom-bottom rounded-md border  border-border p-4 relative"
          style={{
            gridTemplateColumns: `repeat(${colNum}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((col) => (
            <div key={col.key}>{col.render(row)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}