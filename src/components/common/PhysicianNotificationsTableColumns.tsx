"use client";

import type { StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { useId, useMemo, useState } from "react";
import type { DataTableColumn } from "./DataTable";
import type { PhysicianNotificationRow } from "../../data/physicianNotificationsStaticData";
import doctorimage from "../../assets/images/physician.png";
import PhysicianNotificationDocumentDialog from "./physician-notifications/PhysicianNotificationDocumentDialog";

/** Ordina accent — exact #528DB5 for conditional icon (mask fill) + tooltip */
const ORDINA_BRAND = "#528DB5";

const PHYSICIAN_MASK_URL = (doctorimage as StaticImageData).src;

function physicianIconMaskStyle(fill: string): CSSProperties {
  return {
    WebkitMaskImage: `url(${PHYSICIAN_MASK_URL})`,
    maskImage: `url(${PHYSICIAN_MASK_URL})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    backgroundColor: fill,
  };
}

const ORDINA_PHYSICIAN_ICON_MASK_STYLE = physicianIconMaskStyle(ORDINA_BRAND);

/** Non-Ordina: neutral grey silhouette (Figma-style), still same 16×16 mask asset */
const NON_ORDINA_PHYSICIAN_ICON_GREY = "#8E8E8E";
const NON_ORDINA_PHYSICIAN_ICON_MASK_STYLE =
  physicianIconMaskStyle(NON_ORDINA_PHYSICIAN_ICON_GREY);

/** Tooltip background when physician is not on Ordina */
const PHYSICIAN_TOOLTIP_GRAY = "#4B5563";

/** Same 16×16 footprint as MD Verification physician icon. */
const PHYSICIAN_IMG_BASE = "h-[16px] w-[16px]";

function PhysicianNetworkTooltip({
  tipId,
  onOrdina,
}: {
  tipId: string;
  onOrdina: boolean;
}) {
  const label = onOrdina
    ? "Physician is on Ordina"
    : "Physician is not on Ordina";

  const backgroundColor = onOrdina ? ORDINA_BRAND : PHYSICIAN_TOOLTIP_GRAY;

  return (
    <span
      id={tipId}
      role="tooltip"
      className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 w-max max-w-[min(260px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg px-2.5 py-1.5 text-center text-[10px] font-medium leading-snug text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 sm:text-[11px]"
      style={{ backgroundColor }}
    >
      {label}
    </span>
  );
}

/**
 * Physician name cell — layout aligned with MD Verification (`OutboxOrdersTableColumns`).
 * Ordina: `#528DB5` mask icon + `#528DB5` tooltip “Physician is on Ordina”.
 * Not on Ordina: grey mask icon + gray tooltip “Physician is not on Ordina”.
 * Tooltip has no down arrow (Figma).
 */
function PhysicianNameCell({ row }: { row: PhysicianNotificationRow }) {
  const tipId = useId();
  const onOrdina = row.physicianOnOrdina;

  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span
        className={`group relative inline-flex shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-offset-1 ${
          onOrdina
            ? "focus-visible:ring-[#528DB5]"
            : "focus-visible:ring-slate-400"
        }`}
        tabIndex={0}
        aria-describedby={tipId}
      >
        <span
          role="img"
          aria-label="Doctor"
          className={`inline-block shrink-0 ${PHYSICIAN_IMG_BASE}`}
          style={
            onOrdina
              ? ORDINA_PHYSICIAN_ICON_MASK_STYLE
              : NON_ORDINA_PHYSICIAN_ICON_MASK_STYLE
          }
        />
        <PhysicianNetworkTooltip tipId={tipId} onOrdina={onOrdina} />
      </span>
      <span>{row.physicianName}</span>
    </span>
  );
}

function ViewSendActions({ row }: { row: PhysicianNotificationRow }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-3">
        <button
          type="button"
          className="cursor-pointer text-[14px] font-medium text-[#528DB5] underline"
          onClick={() => setOpen(true)}
        >
          View
        </button>
        <button
          type="button"
          className="cursor-pointer text-[14px] font-medium text-[#528DB5] underline"
        >
          Send
        </button>
      </div>
      <PhysicianNotificationDocumentDialog
        open={open}
        onClose={() => setOpen(false)}
        document={row.document}
      />
    </>
  );
}

export function usePhysicianNotificationsTableColumns(): DataTableColumn<PhysicianNotificationRow>[] {
  return useMemo<DataTableColumn<PhysicianNotificationRow>[]>(
    () => [
      {
        key: "dateCreated",
        header: "Date Created",
        className: "min-w-0",
        cell: (row) => (
          <span className="whitespace-nowrap text-[#686464]">{row.dateCreated}</span>
        ),
      },
      {
        key: "dateSent",
        header: "Date Sent",
        className: "min-w-0",
        cell: (row) => (
          <span className="whitespace-nowrap text-[#686464]">{row.dateSent}</span>
        ),
      },
      {
        key: "patient",
        header: "Patient Name",
        className: "min-w-0",
        cell: (row) => (
          <span className="block truncate whitespace-nowrap text-[#686464]">
            {row.patientName}
          </span>
        ),
      },
      {
        key: "physician",
        header: "Physician Name",
        className: "min-w-0",
        cell: (row) => <PhysicianNameCell row={row} />,
      },
      {
        key: "documentType",
        header: "Document Type",
        className: "min-w-0",
        allowWrap: true,
        cell: (row) => (
          <span className="text-[#686464] sm:whitespace-nowrap">{row.documentType}</span>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        headerAlign: "center",
        className: "min-w-0",
        cell: (row) => <ViewSendActions row={row} />,
      },
    ],
    []
  );
}
