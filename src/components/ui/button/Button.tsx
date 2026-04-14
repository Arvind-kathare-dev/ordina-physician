"use client";

import React from "react";
import clsx from "clsx";

/* ───────────────── TYPES ───────────────── */

type Variant = "primary" | "secondary" | "ghost" | "teal" | "danger" | "outlinePrimary";
type Size = "sm" | "md" | "lg" | "base";
type Radius = "sm" | "md" | "lg" | "xl"  | "full";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  radius?: Radius;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

/* ───────────────── BASE STYLES ───────────────── */

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

/* ───────────────── VARIANTS ───────────────── */

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary-gradient text-white  hover:opacity-90 active:scale-[0.98]",

  secondary:
    " text-gray-400 border border-ordinaBorder-200 hover:opacity-90",

  teal:
    "bg-teal-500 text-white hover:bg-teal-600",

  ghost:
    "text-gray-500 hover:bg-gray-100",

  danger:
    "text-red-600 border border-red-opacity30  hover:bg-red-200",

  outlinePrimary:
    "border border-ordinaBorder-100 text-ordina-400 bg-transparent hover:opacity-90",
};

/* ───────────────── SIZES ───────────────── */

const sizeStyles: Record<Size, string> = {
  base: "text-base px-[18px] py-[13px] font-normal",
  sm: "text-xs px-3 py-1.5 font-normal",
  md: "text-sm px-4 py-2.5 font-mediem",
  lg: "text-base px-6 py-3 font-semibold",
};

/* ───────────────── RADIUS ───────────────── */

const radiusStyles: Record<Radius, string> = {
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

/* ───────────────── COMPONENT ───────────────── */

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  radius = "md",
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
        radiusStyles[radius],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {/* LEFT ICON */}
      {!loading && leftIcon && (
        <span className="flex items-center">{leftIcon}</span>
      )}

      {/* CONTENT / LOADING */}
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </span>
      ) : (
        <span className="flex items-center">{children}</span>
      )}

      {/* RIGHT ICON */}
      {!loading && rightIcon && (
        <span className="flex items-center">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;