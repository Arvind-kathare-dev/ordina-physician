"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  InputHTMLAttributes,
} from "react";
import { Search, X } from "lucide-react";
import clsx from "clsx";

type SearchBoxProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onChange?: (query: string) => void;
  debounce?: number;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

export default function SearchBox({
  value,
  defaultValue = "",
  placeholder = "Search",
  onSearch,
  onChange,
  debounce = 0,
  className,
  ...props
}: SearchBoxProps) {
  const isControlled = value !== undefined;

  const [internalQuery, setInternalQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const query = isControlled ? value! : internalQuery;

  // 🔁 Sync controlled value
  useEffect(() => {
    if (isControlled) return;
    setInternalQuery(defaultValue);
  }, [defaultValue, isControlled]);

  // ⏳ Debounce support
  useEffect(() => {
    if (!debounce) return;
    const handler = setTimeout(() => {
      onChange?.(query);
    }, debounce);

    return () => clearTimeout(handler);
  }, [query, debounce, onChange]);

  const updateValue = useCallback(
    (val: string) => {
      if (!isControlled) setInternalQuery(val);

      if (!debounce) {
        onChange?.(val);
      }
    },
    [isControlled, debounce, onChange]
  );

  const handleClear = useCallback(() => {
    updateValue("");
    onSearch?.("");
    inputRef.current?.focus();
  }, [updateValue, onSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const trimmed = query.trim();
        if (trimmed) onSearch?.(trimmed);
      }
      if (e.key === "Escape") handleClear();
    },
    [query, onSearch, handleClear]
  );

  return (
    <div
      className={clsx(
        "w-full max-w-lg",
        className
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-3 rounded-lg border bg-white px-[11px] py-[7px]",
          "shadow-sm transition-all duration-200",
          isFocused
            ? "border-ordinadark ring-1 ring-ordinadark"
            : "border-slate-200 hover:border-ordinadark"
        )}
      >
        {/* ICON */}
        <Search
          size={18}
          className={clsx(
            "shrink-0 transition-colors",
            isFocused ? "text-ordinadark" : "text-slate-400"
          )}
        />

        {/* INPUT */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => updateValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search"
          className={clsx(
            "flex-1 bg-transparent outline-none",
            "text-sm text-slate-700 placeholder-slate-400"
          )}
          {...props}
        />

        {/* CLEAR BUTTON */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className={clsx(
              "shrink-0 rounded-full ",
              "text-slate-400 hover:text-slate-600",
              "hover:bg-slate-100 transition"
            )}
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}