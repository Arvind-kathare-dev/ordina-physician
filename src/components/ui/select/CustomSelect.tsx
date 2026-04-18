"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    required?: boolean;
    placeholder?: string;
    options: Option[];
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
    error?: string;
    fullWidth?: boolean;
    className?: string;
}

export default function CustomSelect({
    label,
    required,
    placeholder = "Select",
    options,
    value,
    onChange,
    disabled = false,
    error,
    fullWidth = true,
    className,
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find((o) => o.value === value);

    // Close outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={clsx(fullWidth && "w-full", className)}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}

            <div ref={ref} className="relative">
                {/* Trigger */}
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setOpen((p) => !p)}
                    className={clsx(
                        "w-full  input-padding flex items-center justify-between",
                        "border rounded-lg bg-white text-sm",
                        "transition-all duration-150",
                        "focus:outline-none focus:ring-1 focus:ring-ordina-400",
                        disabled && "bg-gray-100 cursor-not-allowed",
                        error
                            ? "border-red-400"
                            : "border-gray-200 hover:border-gray-220"
                    )}
                >
                    <span
                        className={clsx(
                            "truncate",
                            selected ? "text-gray-900" : "text-gray-400"
                        )}
                    >
                        {selected?.label || placeholder}
                    </span>

                    <ChevronDown
                        className={clsx(
                            "w-4 h-4 text-gray-500 transition-transform",
                            open && "rotate-180"
                        )}
                    />
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        {options.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-gray-400">
                                No options
                            </div>
                        ) : (
                            options.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                    }}
                                    className={clsx(
                                        "w-full text-left px-4 py-2.5 text-sm",
                                        "hover:bg-gray-200 transition",
                                        value === opt.value
                                            ? "bg-gray-100 text-gray-900 font-medium"
                                            : "text-gray-700"
                                    )}
                                >
                                    {opt.label}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Error */}
            {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
}