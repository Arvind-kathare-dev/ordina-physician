"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
  backdropClassName?: string;
  labelledBy?: string;
  ariaLabel?: string;
  describedBy?: string;
  lockBodyScroll?: boolean;
};

export default function Dialog({
  open,
  onClose,
  children,
  panelClassName = "",
  backdropClassName = "bg-black/40",
  labelledBy,
  ariaLabel = "Dialog",
  describedBy,
  lockBodyScroll = true,
}: DialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);

    if (!lockBodyScroll) {
      return () => {
        document.removeEventListener("keydown", onKeyDown);
      };
    }

    const scrollbarGap =
      window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [open, lockBodyScroll, onKeyDown]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:p-6 sm:pb-6"
      role="presentation"
    >
      <button
        type="button"
        className={`absolute inset-0 transition-opacity ${backdropClassName}`}
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        {...(labelledBy
          ? { "aria-labelledby": labelledBy }
          : { "aria-label": ariaLabel })}
        {...(describedBy ? { "aria-describedby": describedBy } : {})}
        className={`relative z-10  flex max-h-[min(90vh,720px)] w-full min-h-0 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 ${panelClassName}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export type { DialogProps };
