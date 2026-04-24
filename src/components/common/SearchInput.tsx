import type { InputHTMLAttributes } from "react";
import { HiSearch } from "react-icons/hi";

type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  wrapperClassName?: string;
  isNoShadow?: boolean;
  isGoButton?: boolean;
  value?: string;
  };

export default function SearchInput({
  className = "",
  wrapperClassName = "",
  placeholder = "Search",
  isNoShadow = false, 
  isGoButton = false,
  value = "",
  ...rest
}: SearchInputProps) {
  return (
    <div
      className={`relative flex-1 ${wrapperClassName}`}
    >
      <HiSearch
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 sm:left-4"
        aria-hidden
      />
      <input
        type="search"
        placeholder={placeholder}
        className={`w-full rounded-[10px] border-[0.5px] bg-white py-[8px] pl-10 pr-3 text-sm text-[#686464] ${className} ${isNoShadow ? "border-[#B8B8B8]" : "shadow-[2px_2px_8px_rgba(0,0,0,0.10)] border-[#579EBA]"} outline-none placeholder:text-[#9B9B9B] sm:pl-12`}
        {...rest}
      />
      
     {isGoButton && !value.trim() && (
        <button
          type="button"
          className="absolute right-3 text-xs border-[0.5px] border-[#579EBA] text-[#528DB5] rounded-full px-3 cursor-pointer py-1 top-1/2 -translate-y-1/2 sm:right-4"
        >
          <span className="pt-[2px]">Go</span>
        </button>
      )}
    </div>
  );
}
