"use client";

import React, { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: "top" | "bottom";
}

export default function Tooltip({ children, text, position = "bottom" }: TooltipProps) {
  return (
    <div className="group relative flex flex-col items-center shrink-0">
      {children}

      <div className="absolute bottom-full mb-0.5 hidden group-hover:flex animate-in fade-in slide-in-from-bottom-1 duration-200">
        <span className="whitespace-nowrap text-[8px] font-normal text-[#528DB5] bg-[#528DB5]/5 px-1.5 py-0.5 rounded-sm">
          {text}
        </span>
      </div>
    </div>
  );
}
