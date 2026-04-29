"use client";

import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            hint,
            required,
            fullWidth = true,
            leftIcon,
            rightIcon,
            onClear,
            className = '',
            value,
            onChange,
            disabled,
            ...props
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const hasValue = value && String(value).length > 0;

        return (
            <div className={`${fullWidth ? 'w-full' : ''} space-y-1.5`}>
                {/* Label */}
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                        {required && <span className="text-red-500 ml-0.5">*</span>}
                    </label>
                )}

                {/* Input wrapper */}
                <div className="relative">
                    {/* Left Icon */}
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`
              w-full input-padding rounded-md border border-ordinaBorder-300 text-gray-900 placeholder:text-gray-400
              transition-all duration-200 outline-none
              bg-white
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon || onClear ? 'pr-10' : ''}
              ${error
                                ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                                : isFocused
                                    ? 'border-primary ring-1 ring-primary'
                                    : ' hover:border-primary'
                            }
              ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}
              ${className}
            `}
                        {...props}
                    />

                    {/* Clear button */}
                    {onClear && hasValue && !disabled && (
                        <button
                            type="button"
                            onClick={onClear}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                    {/* Right Icon */}
                    {rightIcon && !onClear && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {/* Hint text */}
                {hint && !error && (
                    <p className="text-xs text-gray-500 mt-1">{hint}</p>
                )}

                {/* Error message */}
                {error && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };