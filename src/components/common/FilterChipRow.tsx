"use client";

export type FilterChipRowItem = { id: string; label: string };

type FilterChipRowProps = {
  items: FilterChipRowItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
};

export function FilterChipRow({
  items,
  activeId,
  onChange,
  className = "",
}: FilterChipRowProps) {
  return (
    <div className={`flex justify-start w-full gap-1.5 ${className}`}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`flex min-h-[2.5rem] px-4 py-2 cursor-pointer w-fit min-w-0 items-center justify-center rounded-full border text-center text-[12px] font-medium transition sm:min-h-10 sm:text-[15px] sm:leading-none ${
              active
                ? "border-[#528DB5BF] bg-white text-[#528DB5BF] shadow-[2px_2px_10px_rgba(0,0,0,0.10)]"
                : "border-[#CDCDCD] bg-white text-[#858585] shadow-[2px_2px_10px_rgba(0,0,0,0.10)] hover:bg-[#F5F5F5]"
            }`}
          >
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
