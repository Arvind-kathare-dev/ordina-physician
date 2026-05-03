
import { TableProps } from "@/types/table";

export default function Table<T>({ data, columns, colNum = 8 }: TableProps<T>) {

  return (
    <div className="w-full overflow-x-auto  pb-2">
      <div className="space-y-3 min-w-max lg:min-w-full">

        {/* HEADER */}
        <div
          className="grid bg-primary-gradient shadow-custom-bottom text-white text-sm px-4 py-3 rounded-10"
          style={{
            gridTemplateColumns: `repeat(${colNum}, minmax(max-content, 1fr))`,
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
            className="h-[80px] grid grid-cols-1 gap-3 md:gap-0 items-center bg-white shadow-custom-bottom rounded-10 border border-border p-4 relative"
            style={{
              gridTemplateColumns: `repeat(${colNum}, minmax(max-content, 1fr))`,
            }}
          >
            {columns.map((col) => (
              <div key={col.key}>{col.render(row)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}