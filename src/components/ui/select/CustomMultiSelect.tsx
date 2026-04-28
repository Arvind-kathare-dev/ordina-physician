"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface Option {
    label: string;
    value: string;
}

interface CustomMultiSelectProps {
    label?: string;
    required?: boolean;
    placeholder?: string;
    options: Option[];
    value: string[];
    onChange: (val: string[]) => void;
    disabled?: boolean;
    error?: string;
    fullWidth?: boolean;
    className?: string;
    maxSelections?: number;
    maxSelectionMessage?: string;
}

export default function CustomMultiSelect({
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
    maxSelections,
    maxSelectionMessage,
}: CustomMultiSelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOptions = options.filter((o) => value.includes(o.value));
    const displayText = selectedOptions.map(o => o.label).join(", ");

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

    const toggle = (optValue: string) => {
        if (value.includes(optValue)) {
            onChange(value.filter((v) => v !== optValue));
        } else {
            if (maxSelections && value.length >= maxSelections) {
                return; // prevent selecting more than max
            }
            onChange([...value, optValue]);
        }
    };

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
                        "w-full input-padding flex items-center justify-between",
                        "border border-ordinaBorder-300 rounded-lg bg-white text-sm",
                        "transition-all duration-150",
                        "focus:outline-none focus:ring-1 focus:ring-ordina-400 min-h-[42px] text-left",
                        disabled && "bg-gray-100 cursor-not-allowed",
                        error
                            ? "border-red-400"
                            : "border-gray-200 hover:border-gray-220"
                    )}
                >
                    <span
                        className={clsx(
                            "truncate",
                            selectedOptions.length > 0 ? "text-gray-900" : "text-gray-400"
                        )}
                    >
                        {displayText || placeholder}
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
                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col max-h-64">
                        {maxSelectionMessage && (
                            <div className="px-4 py-3 text-[13px] text-[#4ab1d9] bg-white">
                                {maxSelectionMessage}
                            </div>
                        )}
                        <div className="overflow-y-auto pb-2">
                            {options.length === 0 ? (
                                <div className="px-4 py-2 text-sm text-gray-400">
                                    No options
                                </div>
                            ) : (
                                options.map((opt) => (
                                    <label
                                        key={opt.value}
                                        className={clsx(
                                            "flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer text-[13px] text-gray-600",
                                            (maxSelections && value.length >= maxSelections && !value.includes(opt.value)) && "opacity-50 cursor-not-allowed hover:bg-white"
                                        )}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={value.includes(opt.value)}
                                            onChange={() => toggle(opt.value)}
                                            disabled={maxSelections && value.length >= maxSelections && !value.includes(opt.value) ? true : false}
                                            className="w-4 h-4 rounded border-gray-300 text-[#528DB5] focus:ring-[#528DB5] cursor-pointer disabled:cursor-not-allowed"
                                        />
                                        {opt.label}
                                    </label>
                                ))
                            )}
                        </div>
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
