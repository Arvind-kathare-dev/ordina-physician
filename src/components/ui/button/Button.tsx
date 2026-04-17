"use client";

import React from "react";
import clsx from "clsx";

/* ───────────────── TYPES ───────────────── */

type Variant = "primary" | "secondary" | "ghost" | "tealGreen" | "danger" | "outlinePrimary";
type Size = "xs" | "sm" | "md" | "lg" | "base";
type Radius = "sm" | "md" | "lg" | "xl"  | "full";
type Padding = "none" | "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  radius?: Radius;
   padding?: Padding;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

/* ───────────────── BASE STYLES ───────────────── */

const baseStyles =
  "inline-flex items-center rounded-xl justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

/* ───────────────── VARIANTS ───────────────── */

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary-gradient text-white  hover:opacity-90 active:scale-[0.98]",

  secondary:
    " text-gray-400 bg-white border border-ordinaBorder-200 hover:opacity-90",

  tealGreen:
    "border border-green-540 text-green-540 hover:opacity-80",

  ghost:
    "text-gray-500 hover:bg-gray-100",

  danger:
    "text-red-600 border border-red-opacity30  hover:bg-red-200",

  outlinePrimary:
    "border border-ordinaBorder-100 text-ordina-400 bg-transparent hover:opacity-90",
};

/* ───────────────── SIZES ───────────────── */

const sizeStyles: Record<Size, string> = {
  xs: "px-[11px] py-[7px]",
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

/* ─────────────────  PADING ───────────────── */
const paddingStyles: Record<Padding, string> = {
  none: "p-0",
  xs: "px-2 py-1",
  sm: "px-3 py-1.5",
  md: "px-4 py-2",
  lg: "px-5 py-2.5",
  xl: "px-6 py-3",
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