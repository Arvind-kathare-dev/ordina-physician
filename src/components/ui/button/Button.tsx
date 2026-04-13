"use client";

import React from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "teal" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary-gradient text-white shadow-card hover:opacity-90 active:scale-95",

  secondary:
    "bg-white text-text-primary border border-border hover:bg-gray-50",

  teal:
    "bg-teal-400 text-white hover:bg-teal-500",

  ghost:
    "text-text-secondary hover:bg-gray-100",

  danger:
    "bg-white text-red-500 border border-red-400 hover:text-red-600",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {/* LEFT ICON */}
      {leftIcon && !loading && (
        <span className="flex items-center">{leftIcon}</span>
      )}

      {/* LOADING STATE */}
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}

      {/* RIGHT ICON */}
      {rightIcon && !loading && (
        <span className="flex items-center">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;