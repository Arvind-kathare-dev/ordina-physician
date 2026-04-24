"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { IconType } from "react-icons";
import {
  HiArrowLeft,
  HiChevronDown,
  HiOutlineArchive,
  HiOutlineBell,
  HiOutlineDotsHorizontal,
  HiOutlineExclamation,
  HiOutlineExternalLink,
  HiOutlineInformationCircle,
  HiOutlineInboxIn,
  HiOutlineMail,
  HiOutlinePencil,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineRefresh,
  HiOutlineSearch,
  HiOutlineTrash,
} from "react-icons/hi";


import duplicateReportDialogIcon from "../../../../assets/images/report/archive-image.png";
import Image from "next/image";

import DataTable, { DataTableColumn } from "@/components/common/DataTable";
import ReportFiltersRow, { ReportFilterConfig, ReportTimelinePreset } from "@/components/common/ReportFiltersRow";
import { REPORT_PHYSICIAN_MULTI_OPTIONS } from "@/data/reportFilterPhysicianOptions";
import { REPORT_PHYSICIAN_PAGE_PATIENT_MULTI_OPTIONS } from "@/data/reportFilterPatientOptions";
import { REPORT_ORDER_TYPE_MULTI_OPTIONS } from "@/data/reportFilterOrderTypeOptions";
import { REPORT_INSURANCE_MULTI_OPTIONS, REPORT_LOCATION_SELECT_OPTIONS } from "@/data/reportFilterLocationOptions";
import Dialog from "@/components/common/Dialog";

const KPI_METRICS = [
  { key: "orders_signed", label: "Orders signed" },
  { key: "orders_pending", label: "Pending orders" },
  { key: "orders_received", label: "Orders received" },
  { key: "undelivered", label: "Undelivered" },
] as const;

const ALL_COLUMNS = [
  { key: "date", label: "Date" },
  { key: "patient", label: "Patient Name" },
  { key: "orderType", label: "Order Type" },
  { key: "serviceType", label: "Service Type" },
  { key: "physician", label: "Physician Name" },
  { key: "label", label: "Label" },
  { key: "returnedInTime", label: "Returned-in-time" },
  { key: "pendingDays", label: "Pending Days" },
  { key: "location", label: "Location" },
  { key: "status", label: "Status" },
  { key: "insurance", label: "Insurance" },
  { key: "daysHash", label: "#Days" },
  { key: "ep", label: "Ep" },
  { key: "time", label: "Time" },
] as const;

type RowActionDef = {
  key: string;
  label: string;
  Icon: IconType;
  /** Optional Tailwind classes for the icon (e.g. destructive actions). */
  iconClassName?: string;
};

const ROW_ACTIONS: readonly RowActionDef[] = [
  { key: "open", label: "Open", Icon: HiOutlineExternalLink },
  { key: "resend", label: "Resend", Icon: HiOutlineRefresh },
  { key: "notification", label: "Notification", Icon: HiOutlineBell },
  { key: "info", label: "Info", Icon: HiOutlineInformationCircle },
  { key: "new_order", label: "New Order", Icon: HiOutlinePlus },
  { key: "mail", label: "Mail", Icon: HiOutlineMail },
  { key: "inbox", label: "Inbox", Icon: HiOutlineInboxIn },
  {
    key: "delete",
    label: "Delete",
    Icon: HiOutlineTrash,
    iconClassName: "text-[#FF383C]",
  },
  { key: "call", label: "Call", Icon: HiOutlinePhone },
  { key: "edit", label: "Edit", Icon: HiOutlinePencil },
];

const CHART_TYPES = [
  { key: "line", label: "Line" },
  { key: "bar", label: "Bar" },
  { key: "pie", label: "Pie" },
] as const;

type MockRow = Record<string, string> & { _id: string };

const MOCK_ROWS: MockRow[] = [
  {
    _id: "r1",
    date: "11/20/2025",
    patient: "John Doe",
    orderType: "Medication Orders",
    serviceType: "Hospice",
    physician: "Dr. Emily Carter",
    label: "LD",
    returnedInTime: "Yes",
    pendingDays: "Today",
    status: "Open",
    location: "San Jose",
    insurance: "Aetna",
    daysHash: "0",
    ep: "—",
    time: "10:20 AM",
  },
  {
    _id: "r2",
    date: "11/01/2025",
    patient: "Oliver Bennett",
    orderType: "Therapy Orders",
    serviceType: "Pharmacy",
    physician: "Dr. Sophia Martinez",
    label: "UR • PS • CR",
    returnedInTime: "No",
    pendingDays: "2 Days",
    status: "Pending",
    location: "Walnut Creek",
    insurance: "BlueCross",
    daysHash: "2",
    ep: "E1",
    time: "02:05 PM",
  },
  {
    _id: "r3",
    date: "10/15/2025",
    patient: "Amelia Carter",
    orderType: "Skilled Nursing Orders",
    serviceType: "DME",
    physician: "Dr. James Miller",
    label: "PS",
    returnedInTime: "Yes",
    pendingDays: "3 Days",
    status: "Signed",
    location: "Stockton",
    insurance: "United",
    daysHash: "3",
    ep: "E2",
    time: "09:15 AM",
  },
  {
    _id: "r4",
    date: "09/27/2025",
    patient: "Taylor Sutton",
    orderType: "Equipment & Supplies",
    serviceType: "Home Health",
    physician: "Dr. Olivia Johnson",
    label: "DME",
    returnedInTime: "—",
    pendingDays: "Today",
    status: "Open",
    location: "Sacramento",
    insurance: "Cigna",
    daysHash: "0",
    ep: "E3",
    time: "05:40 PM",
  },
];

type WidgetType = "kpi" | "table" | "chart";

type TileConfig = {
  title: string;
  metric?: string;
  range?: string;
  columns?: string[];
  actions?: string[];
  chartType?: string;
};

type Tile = {
  id: string;
  type: WidgetType;
  colSpan: number;
  config: TileConfig;
};

type GlobalFilters = {
  physician: string;
  orderType: string;
  timelinePreset: ReportTimelinePreset;
  timelineCustomFrom: string;
  timelineCustomTo: string;
  status: string;
  location: string;
};

function timelineStatusLabel(
  preset: ReportTimelinePreset,
  from: string,
  to: string
): string {
  if (preset === "custom" && from && to) {
    const fmt = (iso: string) => {
      const [y, m, d] = iso.split("-");
      if (!y || !m || !d) return iso;
      return `${m}/${d}/${y}`;
    };
    return `${fmt(from)} – ${fmt(to)}`;
  }
  const labels: Record<ReportTimelinePreset, string> = {
    today: "Today",
    yesterday: "Yesterday",
    last_7_days: "Last 7 days",
    last_30_days: "Last 30 days",
    this_month: "This month",
    custom: "Custom range",
  };
  return labels[preset];
}

function chartTimelineCaption(f: GlobalFilters): string {
  if (f.timelinePreset === "today") return "Today";
  if (f.timelinePreset === "custom") return "Custom";
  return "Range";
}

function uid(prefix = "w"): string {
  return (
    prefix +
    "_" +
    Math.random().toString(16).slice(2) +
    Date.now().toString(16).slice(2)
  );
}

function metricLabel(key: string): string {
  const m = KPI_METRICS.find((x) => x.key === key);
  return m?.label ?? key;
}

function defaultConfig(type: WidgetType): TileConfig {
  if (type === "kpi") {
    return { title: "Signed Orders", metric: "orders_signed", range: "last_7_days" };
  }
  if (type === "table") {
    return {
      title: "Pending Orders (Preview)",
      columns: [
        "date",
        "patient",
        "orderType",
        "serviceType",
        "label",
        "pendingDays",
      ],
      actions: [
        "open",
        "resend",
        "notification",
        "info",
        "new_order",
        "mail",
        "inbox",
        "delete",
        "call",
        "edit",
      ],
    };
  }
  if (type === "chart") {
    return {
      title: "Orders Trend",
      metric: "orders_received",
      range: "last_30_days",
      chartType: "line",
    };
  }
  return { title: "" };
}

function drawChartPreview(
  canvas: HTMLCanvasElement,
  type: string,
  rows: MockRow[]
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const w = (canvas.width = canvas.clientWidth * dpr);
  const h = (canvas.height = 130 * dpr);
  ctx.clearRect(0, 0, w, h);

  const ink = "rgba(74,74,74,.9)";
  const soft = "rgba(87,158,186,.22)";
  const stroke = "rgba(79,129,178,.9)";
  const fill = "rgba(87,158,186,.16)";

  const statuses = ["Open", "Pending", "Signed", "Rejected"];
  const vals = statuses.map((s) => rows.filter((r) => r.status === s).length);
  const max = Math.max(1, ...vals);

  const pad = 12 * dpr;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;

  ctx.strokeStyle = soft;
  ctx.lineWidth = 1 * dpr;
  for (let i = 1; i <= 3; i++) {
    const y = pad + (innerH * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(pad + innerW, y);
    ctx.stroke();
  }

  if (type === "bar") {
    const barW = ((innerW / statuses.length) * 0.55) / 1;
    statuses.forEach((s, i) => {
      const x =
        pad +
        (innerW / statuses.length) * i +
        (innerW / statuses.length - barW) / 2;
      const bh = (vals[i] / max) * (innerH * 0.85);
      const y = pad + innerH - bh;

      ctx.fillStyle = fill;
      ctx.fillRect(x, y, barW, bh);

      ctx.strokeStyle = stroke;
      ctx.strokeRect(x, y, barW, bh);

      ctx.fillStyle = ink;
      ctx.font = `${10 * dpr}px sans-serif`;
      ctx.fillText(
        s[0],
        x + barW / 2 - 3 * dpr,
        pad + innerH + 10 * dpr
      );
    });
  } else if (type === "line") {
    const pts = statuses.map((s, i) => {
      const x = pad + (innerW / (statuses.length - 1)) * i;
      const y = pad + innerH - (vals[i] / max) * (innerH * 0.85);
      return { x, y, s };
    });

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pad + innerH);
    pts.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, pad + innerH);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();

    ctx.beginPath();
    pts.forEach((p, i) =>
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
    );
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2 * dpr;
    ctx.stroke();

    pts.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.2 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = stroke;
      ctx.fill();

      ctx.fillStyle = ink;
      ctx.font = `${10 * dpr}px sans-serif`;
      ctx.fillText(p.s[0], p.x - 3 * dpr, pad + innerH + 10 * dpr);
    });
  } else if (type === "pie") {
    const total = vals.reduce((a, b) => a + b, 0) || 1;
    const cx = pad + innerW * 0.27;
    const cy = pad + innerH * 0.5;
    const r = Math.min(innerW, innerH) * 0.28;

    let start = -Math.PI / 2;
    statuses.forEach((s, i) => {
      const frac = vals[i] / total;
      const end = start + frac * Math.PI * 2;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();

      ctx.fillStyle = `rgba(87,158,186,${0.1 + i * 0.12})`;
      ctx.fill();
      ctx.strokeStyle = soft;
      ctx.stroke();

      start = end;
    });

    ctx.fillStyle = ink;
    ctx.font = `${10 * dpr}px sans-serif`;
    statuses.forEach((s, i) => {
      const lx = pad + innerW * 0.6;
      const ly = pad + 14 * dpr + i * 16 * dpr;

      ctx.fillStyle = `rgba(87,158,186,${0.1 + i * 0.12})`;
      ctx.fillRect(lx, ly - 9 * dpr, 10 * dpr, 10 * dpr);

      ctx.fillStyle = ink;
      ctx.fillText(`${s}: ${vals[i]}`, lx + 14 * dpr, ly);
    });
  }
}

export type CustomReportBuilderStepProps = {
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
  /** Archived report: show Unarchive control, report heading, and confirm before save. */
  isArchived?: boolean;
  /** Top bar title when `isArchived` (e.g. Patient Report). */
  reportHeading?: string;
  /** Subtitle under the report heading when `isArchived`. */
  reportDescription?: string;
  /** Notifies parent when the save/unarchive confirmation dialog opens or closes (e.g. to block outer dialog Escape). */
  onSaveConfirmOpenChange?: (open: boolean) => void;
  /** After user confirms save/unarchive from an archived report. */
  onUnarchiveConfirm?: () => void;
};

export default function CustomReportBuilderStep({
  onBack,
  onNext,
  onClose,
  isArchived = false,
  reportHeading = "Patient Report",
  reportDescription = "Define what shows when someone clicks the report: tiles, charts, tables, and the metric logic behind them.",
  onSaveConfirmOpenChange,
  onUnarchiveConfirm,
}: CustomReportBuilderStepProps) {
  const toastId = useId();
  const saveConfirmTitleId = useId();
  const saveConfirmDescId = useId();
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [orderTypeSelection, setOrderTypeSelection] = useState<string[]>([]);
  const [statusType, setStatusType] = useState("");
  const [patientSelection, setPatientSelection] = useState<string[]>([]);
  const [physicianSelection, setPhysicianSelection] = useState<string[]>([]);
  const [locationSelection, setLocationSelection] = useState<string[]>([]);
  const [insuranceSelection, setInsuranceSelection] = useState<string[]>([]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1200);
  }, []);

  const [globalFilters, setGlobalFilters] = useState<GlobalFilters>({
    physician: "ALL",
    orderType: "ALL",
    timelinePreset: "today",
    timelineCustomFrom: "",
    timelineCustomTo: "",
    status: "ALL",
    location: "ALL",
  });

  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bubbleFilter, setBubbleFilter] = useState("");
  const [actionsCollapsed, setActionsCollapsed] = useState(false);
  const [dropzoneOver, setDropzoneOver] = useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);

  useEffect(() => {
    onSaveConfirmOpenChange?.(saveConfirmOpen);
  }, [saveConfirmOpen, onSaveConfirmOpenChange]);

  const draggedTileId = useRef<string | null>(null);

  const globallyFilteredRows = useMemo(() => {
    return MOCK_ROWS.filter((r) => {
      if (
        globalFilters.physician !== "ALL" &&
        r.physician !== globalFilters.physician
      )
        return false;
      if (
        globalFilters.orderType !== "ALL" &&
        r.orderType !== globalFilters.orderType
      )
        return false;
      if (globalFilters.status !== "ALL" && r.status !== globalFilters.status)
        return false;
      if (
        globalFilters.location !== "ALL" &&
        r.location !== globalFilters.location
      )
        return false;
      return true;
    });
  }, [globalFilters]);

  const selectedTile = tiles.find((t) => t.id === selectedId) ?? null;

  const onGlobalFilterChange = useCallback(
    (patch: Partial<GlobalFilters>) => {
      setGlobalFilters((prev) => ({ ...prev, ...patch }));
      showToast("Filters applied to all tiles");
    },
    [showToast]
  );

  const filterStatusText = useMemo(() => {
    const noDropdownFilters =
      patientSelection.length === 0 &&
      orderTypeSelection.length === 0 &&
      statusType === "";
    if (noDropdownFilters) {
      return "No filters applied (showing all).";
    }
    const parts: string[] = [];
    if (patientSelection.length > 0) {
      parts.push(`Patient: ${patientSelection.join(", ")}`);
    }
    if (orderTypeSelection.length > 0) {
      parts.push(`Order type: ${orderTypeSelection.join(", ")}`);
    }
    if (statusType) {
      parts.push(`Status: ${statusType}`);
    }
    return `${parts.join(" · ")}.`;
  }, [patientSelection, orderTypeSelection, statusType]);

  const reportFilters = useMemo((): ReportFilterConfig[] => {
    return [
      {
        kind: "multiSelect",
        id: "physician",
        label: "Physician",
        values: physicianSelection,
        onValuesChange: setPhysicianSelection,
        options: [...REPORT_PHYSICIAN_MULTI_OPTIONS],
        searchPlaceholder: "Search physician…",
        emptySummaryLabel: "All Physicians",
      },
      {
        kind: "multiSelect",
        id: "patient",
        label: "Patient",
        values: patientSelection,
        onValuesChange: setPatientSelection,
        options: [...REPORT_PHYSICIAN_PAGE_PATIENT_MULTI_OPTIONS],
        searchPlaceholder: "Search patient…",
        emptySummaryLabel: "All Patients",
      },
      {
        kind: "multiSelect",
        id: "orderType",
        label: "Order Type",
        values: orderTypeSelection,
        onValuesChange: setOrderTypeSelection,
        options: [...REPORT_ORDER_TYPE_MULTI_OPTIONS],
        searchPlaceholder: "Search order types…",
        emptySummaryLabel: "All types",
      },
      {
        kind: "timeline",
        id: "timeline",
        label: "Timeline",
        preset: globalFilters.timelinePreset,
        customFrom: globalFilters.timelineCustomFrom,
        customTo: globalFilters.timelineCustomTo,
        onPresetChange: (preset) => {
          setGlobalFilters((prev) => ({
            ...prev,
            timelinePreset: preset,
            timelineCustomFrom: "",
            timelineCustomTo: "",
          }));
          showToast("Filters applied to all tiles");
        },
        onCustomRangeApply: (from, to) => {
          setGlobalFilters((prev) => ({
            ...prev,
            timelinePreset: "custom",
            timelineCustomFrom: from,
            timelineCustomTo: to,
          }));
          showToast("Filters applied to all tiles");
        },
        onReset: () => {
          setGlobalFilters((prev) => ({
            ...prev,
            timelinePreset: "today",
            timelineCustomFrom: "",
            timelineCustomTo: "",
          }));
          showToast("Filters applied to all tiles");
        },
      },
      {
        kind: "multiSelect",
        id: "insurance",
        label: "Insurance",
        values: insuranceSelection,
        onValuesChange: setInsuranceSelection,
        options: [...REPORT_INSURANCE_MULTI_OPTIONS],
        searchPlaceholder: "Search insurance…",
        emptySummaryLabel: "All insurance",
      },
      {
        kind: "select",
        id: "location",
        label: "Location",
        value: locationSelection[0] || "",
        onChange: (value) => setLocationSelection([value] as string[]),
        options: [...REPORT_LOCATION_SELECT_OPTIONS],
        optionLayout: "radio",
      },
    ];
  }, [
    patientSelection,
    physicianSelection,
    orderTypeSelection,
    statusType,
    locationSelection,
    insuranceSelection,
    globalFilters.timelinePreset,
    globalFilters.timelineCustomFrom,
    globalFilters.timelineCustomTo,
    showToast,
  ]);

  const canvasFilterStatusText = useMemo(() => {
    const timelineLabel = timelineStatusLabel(
      globalFilters.timelinePreset,
      globalFilters.timelineCustomFrom,
      globalFilters.timelineCustomTo
    );
    const parts: string[] = [];
    if (globalFilters.physician !== "ALL") {
      parts.push(`Physician: ${globalFilters.physician}`);
    }
    if (globalFilters.orderType !== "ALL") {
      parts.push(`Order type: ${globalFilters.orderType}`);
    }
    if (globalFilters.status !== "ALL") {
      parts.push(`Status: ${globalFilters.status}`);
    }
    if (globalFilters.location !== "ALL") {
      parts.push(`Location: ${globalFilters.location}`);
    }
    if (parts.length === 0) {
      return `Timeline: ${timelineLabel}. No row filters applied (showing all).`;
    }
    return `Timeline: ${timelineLabel}. ${parts.join(" · ")}.`;
  }, [globalFilters]);

  function hasActions(tile: Tile): boolean {
    return (
      tile.type === "table" &&
      Array.isArray(tile.config.actions) &&
      tile.config.actions.length > 0
    );
  }

  function effectiveColumns(tile: Tile): string[] {
    const cols = Array.isArray(tile.config.columns)
      ? [...tile.config.columns]
      : [];
    if (hasActions(tile)) return [...cols, "__actions__"];
    return cols;
  }

  function actionMeta(key: string): RowActionDef {
    return (
      ROW_ACTIONS.find((a) => a.key === key) ?? {
        key,
        label: key,
        Icon: HiOutlineDotsHorizontal,
      }
    );
  }

  function tablePreviewGridTemplate(columnKeys: string[]): string {
    return columnKeys
      .map((k) =>
        k === "__actions__"
          ? "minmax(11rem, 1.45fr)"
          : "minmax(5.25rem, 1fr)"
      )
      .join(" ");
  }

  function buildTablePreviewColumns(
    tile: Tile
  ): DataTableColumn<MockRow>[] {
    const keys = effectiveColumns(tile).slice(0, 7);
    return keys.map((c) => {
      if (c === "__actions__") {
        return {
          key: "__actions__",
          header: "Action",
          headerAlign: "left",
          className: "min-w-0",
          cell: () => (
            <div className="flex min-w-40 max-w-60 flex-nowrap items-center justify-start gap-2 overflow-hidden">
              {(tile.config.actions ?? []).slice(0, 6).map((ak) => {
                const m = actionMeta(ak);
                const ActionIcon = m.Icon;
                return (
                  <div
                    key={ak}
                    title={m.label}
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-[10px] border border-[rgba(31,95,125,0.14)] bg-linear-to-b from-white to-[#eef6fb] text-[#1f5f7d] shadow-[inset_0_0_0_1px_rgba(79,148,181,0.12)]"
                  >
                    <ActionIcon
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${m.iconClassName ?? "text-[#528DB5]"}`}
                      aria-hidden
                    />
                  </div>
                );
              })}
            </div>
          ),
        };
      }
      const label = ALL_COLUMNS.find((x) => x.key === c)?.label ?? c;
      const isDate = c === "date";
      return {
        key: c,
        header: label,
        className: "min-w-0",
        allowWrap: true,
        cell: (row) => (
          <span
            className={`whitespace-nowrap text-left text-[12px] sm:text-sm ${isDate ? "text-[#000000]" : "text-[#686464]"
              }`}
          >
            {String(row[c] ?? "")}
          </span>
        ),
      };
    });
  }

  function mockKpiValue(metricKey: string, rows: MockRow[]): number {
    if (metricKey === "orders_signed")
      return rows.filter((r) => r.status === "Signed").length;
    if (metricKey === "orders_pending")
      return rows.filter((r) => r.status === "Pending").length;
    if (metricKey === "orders_received") return rows.length;
    if (metricKey === "undelivered")
      return Math.max(0, rows.filter((r) => r.pendingDays !== "Today").length - 1);
    return 0;
  }

  function summarizeGlobalFilters(): string {
    const parts: string[] = [];
    if (globalFilters.physician !== "ALL") parts.push("Physician");
    if (globalFilters.orderType !== "ALL") parts.push("Order Type");
    if (globalFilters.status !== "ALL") parts.push("Status");
    if (globalFilters.location !== "ALL") parts.push("Location");
    parts.push("Timeline");
    return parts.length ? parts.join(", ") : "None";
  }

  function addTile(type: WidgetType) {
    const t: Tile = {
      id: uid(type),
      type,
      colSpan: type === "table" ? 12 : 6,
      config: defaultConfig(type),
    };
    setTiles((prev) => [...prev, t]);
    setSelectedId(t.id);
    showToast("Widget added");
  }

  function clearCanvas() {
    setTiles([]);
    setSelectedId(null);
    showToast("Canvas cleared");
  }

  function quickAddDemo() {
    const k = uid("kpi");
    const ch = uid("chart");
    const tb = uid("table");
    setTiles((prev) => [
      ...prev,
      { id: k, type: "kpi", colSpan: 6, config: defaultConfig("kpi") },
      { id: ch, type: "chart", colSpan: 6, config: defaultConfig("chart") },
      { id: tb, type: "table", colSpan: 12, config: defaultConfig("table") },
    ]);
    setSelectedId(tb);
    showToast("Demo widgets added");
  }

  function reorderTiles(fromId: string, overId: string) {
    if (!fromId || fromId === overId) return;
    setTiles((prev) => {
      const fromIdx = prev.findIndex((t) => t.id === fromId);
      const toIdx = prev.findIndex((t) => t.id === overId);
      if (fromIdx < 0 || toIdx < 0) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  }

  function deleteSelectedTile() {
    const idToRemove = selectedId;
    if (!idToRemove) return;
    let newSel: string | null = null;
    setTiles((prev) => {
      const idx = prev.findIndex((t) => t.id === idToRemove);
      if (idx < 0) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      newSel =
        next[idx]?.id ?? next[idx - 1]?.id ?? next[0]?.id ?? null;
      return next;
    });
    setSelectedId(newSel);
    showToast("Tile deleted");
  }

  function doSave() {
    const payload = {
      globalFilters: { ...globalFilters },
      widgets: tiles.map((t) => ({
        id: t.id,
        type: t.type,
        colSpan: t.colSpan,
        config: {
          ...t.config,
          columns: Array.isArray(t.config.columns) ? t.config.columns : [],
        },
      })),
    };
    console.log("SAVE PAYLOAD:", payload);
    if (isArchived) {
      onUnarchiveConfirm?.();
    }
    onClose();
    showToast(
      isArchived
        ? "Report saved and unarchived (mock)."
        : "Saved (mock). Check console JSON."
    );
  }

  function openSaveConfirm() {
    setSaveConfirmOpen(true);
  }

  function closeSaveConfirm() {
    setSaveConfirmOpen(false);
  }

  function requestSave() {
    if (isArchived) {
      openSaveConfirm();
      return;
    }
    doSave();
  }

  useEffect(() => {
    const k = uid("kpi");
    const ch = uid("chart");
    const tb = uid("table");
    setTiles([
      { id: k, type: "kpi", colSpan: 6, config: defaultConfig("kpi") },
      { id: ch, type: "chart", colSpan: 6, config: defaultConfig("chart") },
      { id: tb, type: "table", colSpan: 12, config: defaultConfig("table") },
    ]);
    setSelectedId(k);
  }, []);

  const chartRefs = useRef<Map<string, HTMLCanvasElement>>(new Map());

  const redrawCharts = useCallback(() => {
    tiles.forEach((tile) => {
      if (tile.type !== "chart") return;
      const canvas = chartRefs.current.get(tile.id);
      if (canvas)
        drawChartPreview(
          canvas,
          tile.config.chartType ?? "line",
          globallyFilteredRows
        );
    });
  }, [tiles, globallyFilteredRows]);

  useLayoutEffect(() => {
    redrawCharts();
  }, [redrawCharts]);

  useEffect(() => {
    const onResize = () => redrawCharts();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [redrawCharts]);

  const filteredBubbles = ALL_COLUMNS.filter((c) => {
    const f = bubbleFilter.trim().toLowerCase();
    if (!f) return true;
    return (
      c.label.toLowerCase().includes(f) || c.key.toLowerCase().includes(f)
    );
  });

  const hasSelection =
    !!selectedId && tiles.some((t) => t.id === selectedId);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[#F8F9FA]">
      <div
        className="z-20 flex shrink-0 flex-wrap items-center gap-3 border-b border-[#E0E0E0] px-4 py-3.5 text-[#606060] sm:gap-3"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1 font-semibold tracking-wide">
          {isArchived ? (
            <>
              <div className="min-w-0 text-sm text-[#606060] sm:text-base">
                {reportHeading}
              </div>
              <p className="m-0 max-w-3xl text-xs font-normal leading-relaxed text-[#858585] sm:text-sm">
                {reportDescription}
              </p>
            </>
          ) : (
            <div className="min-w-0 text-sm sm:text-base">
              Custom Report Builder
            </div>
          )}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2.5">
          {isArchived ? (
            <button
              type="button"
              onClick={openSaveConfirm}
              className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border-[0.5px] border-[#FF383C] bg-white px-3 py-2.5 text-xs font-semibold text-[#FF383C] shadow-none transition hover:bg-red-50 active:translate-y-px sm:text-sm"
            >
              <HiOutlineArchive className="h-4 w-4 shrink-0" aria-hidden />
              Unarchive
            </button>
          ) : null}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white px-3 py-2.5 text-xs font-semibold text-[#858585] shadow-none transition hover:bg-neutral-50 active:translate-y-px sm:text-sm"
          >
            <HiArrowLeft className="h-4 w-4 shrink-0" aria-hidden /> Back
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white px-3 py-2.5 text-xs font-semibold text-[#858585] shadow-none transition hover:bg-neutral-50 active:translate-y-px sm:text-sm"
          >
            Clear Canvas
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="grid grid-cols-1 gap-3.5 p-3.5 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-3.5 lg:p-3.5 xl:mx-auto xl:w-full xl:max-w-375">
          <div className="flex min-h-0 flex-col rounded-xl border-[0.5px] border-[#E0E0E0] bg-white shadow-[0_4px_-6px_rgba(0,0,0,0.06)] sm:rounded-2xl">
            <div className="flex shrink-0 items-center justify-between gap-2.5 border-b border-[#E0E0E0] px-3.5 py-3.5">
              <h3 className="m-0 text-sm font-semibold text-[#606060] sm:text-base">
                Custom Report Builder
              </h3>
              <span className="text-xs text-[#858585]">
                {selectedTile
                  ? `${selectedTile.type.toUpperCase()} • ${selectedTile.config.title || "Untitled"}`
                  : "No tile selected"}
              </span>
            </div>

            <div className="p-3.5">
              <div className="flex flex-col gap-3">
                <div className="overflow-hidden rounded-2xl border border-[#E0E0E0] bg-linear-to-b from-white to-[#fbfdff] shadow-[0_6px_14px_rgba(16,24,40,0.04)]">
                  <div className="flex items-center justify-between gap-2.5 border-b border-[#E0E0E0] px-3 py-3">
                    <div className="flex min-w-0 flex-col gap-1">
                      <b className="text-[13px] text-[#606060]">
                        Column Configuration
                      </b>
                      <span className="text-xs font-bold text-[#858585]">
                        {selectedTile
                          ? `${selectedTile.config.title || "Untitled"} settings`
                          : "Select a tile to configure"}
                      </span>
                    </div>
                    <span className="shrink-0 whitespace-nowrap rounded-full border border-[#1696C8]/25 bg-[#1696C8]/10 px-2.5 py-1.5 text-[11px] font-semibold text-[#1485b3]">
                      {selectedTile ? selectedTile.type.toUpperCase() : "—"}
                    </span>
                  </div>

                  <div className="p-3">
                    {!selectedTile ? (
                      <div className="rounded-2xl border border-dashed border-[#E0E0E0] bg-linear-to-b from-white to-[#fbfdff] p-3 text-xs leading-relaxed text-[#858585]">
                        Click a tile on the canvas to configure it here.
                        <br />
                        <b className="text-[#606060]">Note:</b> Global filters live
                        in the center and apply to all tiles.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-[#606060]">
                            Title
                          </label>
                          <input
                            type="text"
                            value={selectedTile.config.title}
                            onChange={(e) => {
                              const v = e.target.value;
                              setTiles((prev) =>
                                prev.map((t) =>
                                  t.id === selectedId
                                    ? { ...t, config: { ...t.config, title: v } }
                                    : t
                                )
                              );
                            }}
                            className="w-full rounded-[14px] border border-[#E0E0E0] bg-white px-3 py-3 text-sm font-bold text-[#606060] outline-none focus:border-[#1696C8] focus:ring-[0.5px] focus:ring-[#1696C8] focus:shadow-[0_0_0_3px_rgba(22,150,200,0.15)]"
                          />
                        </div>

                        {selectedTile.type === "kpi" && (
                          <>
                            <div>
                              <label className="mb-2 block text-xs font-semibold text-[#606060]">
                                Metric
                              </label>
                              <select
                                value={selectedTile.config.metric ?? ""}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setTiles((prev) =>
                                    prev.map((t) =>
                                      t.id === selectedId
                                        ? {
                                          ...t,
                                          config: { ...t.config, metric: v },
                                        }
                                        : t
                                    )
                                  );
                                }}
                                className="w-full rounded-[14px] border border-[#E0E0E0] bg-white px-3 py-3 text-sm font-bold outline-none focus:border-[#1696C8] focus:ring-[0.5px] focus:ring-[#1696C8] focus:shadow-[0_0_0_3px_rgba(22,150,200,0.15)]"
                              >
                                {KPI_METRICS.map((m) => (
                                  <option key={m.key} value={m.key}>
                                    {m.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="rounded-2xl border border-dashed border-[#E0E0E0] bg-linear-to-b from-white to-[#fbfdff] p-3 text-xs text-[#858585]">
                              Tile-level range is separate from Global Timeline
                              (middle filters). Global filters always apply first.
                            </div>
                          </>
                        )}

                        {selectedTile.type === "chart" && (
                          <>
                            <div>
                              <label className="mb-2 block text-xs font-semibold text-[#606060]">
                                Metric
                              </label>
                              <select
                                value={selectedTile.config.metric ?? ""}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setTiles((prev) =>
                                    prev.map((t) =>
                                      t.id === selectedId
                                        ? {
                                          ...t,
                                          config: { ...t.config, metric: v },
                                        }
                                        : t
                                    )
                                  );
                                }}
                                className="w-full rounded-[14px] border border-[#E0E0E0] bg-white px-3 py-3 text-sm font-bold outline-none focus:border-[#1696C8] focus:ring-[0.5px] focus:ring-[#1696C8] focus:shadow-[0_0_0_3px_rgba(22,150,200,0.15)]"
                              >
                                {KPI_METRICS.map((m) => (
                                  <option key={m.key} value={m.key}>
                                    {m.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="mb-2 block text-xs font-semibold text-[#606060]">
                                Chart type
                              </label>
                              <select
                                value={selectedTile.config.chartType ?? "line"}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setTiles((prev) =>
                                    prev.map((t) =>
                                      t.id === selectedId
                                        ? {
                                          ...t,
                                          config: { ...t.config, chartType: v },
                                        }
                                        : t
                                    )
                                  );
                                }}
                                className="w-full rounded-[14px] border border-[#E0E0E0] bg-white px-3 py-3 text-sm font-bold outline-none focus:border-[#1696C8] focus:ring-[0.5px] focus:ring-[#1696C8] focus:shadow-[0_0_0_3px_rgba(22,150,200,0.15)]"
                              >
                                {CHART_TYPES.map((c) => (
                                  <option key={c.key} value={c.key}>
                                    {c.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}

                        {selectedTile.type === "table" && (
                          <>
                            <div className="pt-1">
                              <h4 className="mb-2 text-[12px] font-normal uppercase tracking-wide text-[#858585]">
                                Columns (Bubble Picker)
                              </h4>
                              <div className="rounded-2xl border border-[#E0E0E0] bg-linear-to-b from-white to-[#fbfdff] p-3">
                                <div className="mb-2.5 flex items-center gap-2.5 rounded-[14px] border border-[#E0E0E0] bg-white px-2.5 py-2.5">
                                  <HiOutlineSearch
                                    className="h-4 w-4 shrink-0 text-[#858585]"
                                    aria-hidden
                                  />
                                  <input
                                    placeholder="Search columns"
                                    value={bubbleFilter}
                                    onChange={(e) =>
                                      setBubbleFilter(e.target.value)
                                    }
                                    className="w-full border-0 bg-transparent text-sm font-bold outline-none"
                                  />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {filteredBubbles.map((col) => {
                                    const sel =
                                      selectedTile.config.columns?.includes(
                                        col.key
                                      ) ?? false;
                                    return (
                                      <button
                                        key={col.key}
                                        type="button"
                                        onClick={() => {
                                          setTiles((prev) =>
                                            prev.map((t) => {
                                              if (t.id !== selectedId) return t;
                                              const cols = [
                                                ...(t.config.columns ?? []),
                                              ];
                                              const ix = cols.indexOf(col.key);
                                              if (ix >= 0) cols.splice(ix, 1);
                                              else cols.push(col.key);
                                              return {
                                                ...t,
                                                config: {
                                                  ...t.config,
                                                  columns: cols,
                                                },
                                              };
                                            })
                                          );
                                        }}
                                        className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-2.5 py-2 text-xs font-semibold transition ${sel
                                          ? "border-[#1696C8]/35 bg-[#1696C8]/10 text-[#1485b3]"
                                          : "border-[#E0E0E0] bg-white text-[#606060]"
                                          }`}
                                      >
                                        {col.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-2 text-[12px] font-normal uppercase tracking-wide text-[#858585]">
                                Actions
                              </h4>
                              <div className="overflow-hidden rounded-2xl border border-[#E0E0E0] bg-linear-to-b from-white to-[#fbfdff]">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActionsCollapsed((c) => !c)
                                  }
                                  className="flex w-full items-center justify-between gap-2 border-b border-[#E0E0E0] px-3 py-3 text-left"
                                >
                                  <b className="text-xs uppercase tracking-wide text-[#858585]">
                                    Actions
                                  </b>
                                  <span
                                    className={`grid h-7 w-7 place-items-center rounded-[10px] border border-[#E0E0E0] bg-white text-[#858585] transition ${actionsCollapsed ? "-rotate-90" : ""}`}
                                  >
                                    <HiChevronDown
                                      className="h-4 w-4"
                                      aria-hidden
                                    />
                                  </span>
                                </button>
                                {!actionsCollapsed && (
                                  <div className="flex flex-wrap gap-2.5 p-3">
                                    {ROW_ACTIONS.map((a) => {
                                      const on = (
                                        selectedTile.config.actions ?? []
                                      ).includes(a.key);
                                      return (
                                        <button
                                          key={a.key}
                                          type="button"
                                          onClick={() => {
                                            setTiles((prev) =>
                                              prev.map((t) => {
                                                if (t.id !== selectedId)
                                                  return t;
                                                const acts = [
                                                  ...(t.config.actions ?? []),
                                                ];
                                                const has = acts.includes(a.key);
                                                if (has)
                                                  return {
                                                    ...t,
                                                    config: {
                                                      ...t.config,
                                                      actions: acts.filter(
                                                        (x) => x !== a.key
                                                      ),
                                                    },
                                                  };
                                                return {
                                                  ...t,
                                                  config: {
                                                    ...t.config,
                                                    actions: [...acts, a.key],
                                                  },
                                                };
                                              })
                                            );
                                          }}
                                          className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-semibold transition active:translate-y-px ${on
                                            ? "border-[#1696C8]/40 bg-[#1696C8]/10 text-[#1485b3] shadow-[0_0_0_3px_rgba(22,150,200,0.12)]"
                                            : "border-[#E0E0E0] bg-white text-[#858585]"
                                            }`}
                                        >
                                          {a.label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                              <p className="mt-2 rounded-2xl border border-dashed border-[#E0E0E0] bg-linear-to-b from-white to-[#fbfdff] p-3 text-xs text-[#858585]">
                                If you select any action, an &apos;Action&apos;
                                column will automatically appear as the LAST column
                                in the table.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2.5 border-t border-[#E0E0E0] p-3">
                    <button
                      type="button"
                      disabled={!hasSelection}
                      onClick={deleteSelectedTile}
                      className="flex flex-1 cursor-pointer items-center justify-center rounded-[10px] border border-[#E0E0E0] bg-white px-3 py-2.5 text-sm font-semibold text-[#606060] shadow-none transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      disabled={!hasSelection}
                      onClick={() => showToast("Applied")}
                      className="flex flex-1 cursor-pointer items-center justify-center rounded-[10px] bg-[#1696C8] px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1485b3] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Widget library */}
                <div className="overflow-hidden rounded-2xl border border-[#E0E0E0] bg-linear-to-b from-white to-[#fbfdff] shadow-[0_6px_14px_rgba(16,24,40,0.04)]">
                  <div className="flex items-center justify-between gap-2.5 border-b border-[#E0E0E0] px-3 py-3">
                    <div className="flex flex-col gap-1">
                      <b className="text-[13px] text-[#606060]">
                        Widget Library
                      </b>
                      <span className="text-xs font-bold text-[#858585]">
                        Drag onto canvas
                      </span>
                    </div>
                    <span className="rounded-full border border-[#1696C8]/25 bg-[#1696C8]/10 px-2.5 py-1.5 text-[11px] font-semibold text-[#1485b3]">
                      Drag
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="grid gap-2.5">
                      {(
                        [
                          ["kpi", "K", "KPI Tile", "Big number with metric + range"],
                          ["table", "T", "Table Tile", "Pick columns + actions"],
                          ["chart", "C", "Chart Tile", "Choose chart type + metric"],
                        ] as const
                      ).map(([widget, letter, title, desc]) => (
                        <div
                          key={widget}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/widgetType", widget);
                            e.dataTransfer.effectAllowed = "copy";
                          }}
                          className="relative flex cursor-grab gap-2.5 rounded-[14px] border border-[#E0E0E0] bg-linear-to-b from-white to-[#fbfdff] p-3 shadow-[0_6px_14px_rgba(16,24,40,0.04)] active:cursor-grabbing"
                        >
                          <div className="grid h-9.5 w-9.5 shrink-0 place-items-center rounded-xl bg-[#579EBA]/15 text-sm font-semibold text-[#4F81B2] shadow-[inset_0_0_0_1px_rgba(87,158,186,0.25)]">
                            {letter}
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <b className="block text-[13px] text-[#606060]">
                              {title}
                            </b>
                            <span className="mt-1 block text-xs text-[#858585]">
                              {desc}
                            </span>
                          </div>
                          <span className="absolute right-3 top-3 rounded-full border border-[#1696C8]/25 bg-[#1696C8]/10 px-2 py-1 text-[11px] font-semibold text-[#1485b3]">
                            Drag
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-dashed border-[#E0E0E0] bg-linear-to-b from-white to-[#fbfdff] px-3.5 py-2.5 text-xs text-[#858585]">
                    <b className="text-[#606060]">Global Filters:</b> set filters in
                    the middle screen. All tiles will update automatically based on
                    these filters.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col gap-3.5">
            <div className="rounded-xl border border-[#E0E0E0] bg-white p-3 shadow-[0_4px_-6px_rgba(0,0,0,0.06)] sm:rounded-2xl sm:p-3.5">
              <ReportFiltersRow
                moreFiltersIcon="menu"
                isMoreOptions={false}
                filters={reportFilters}
                filterStatusText={canvasFilterStatusText}
              />
            </div>

            <div
              className={`relative flex min-h-[min(400px,55vh)] flex-col overflow-hidden rounded-xl border-[0.5px] border-dashed p-3.5 shadow-[0_4px_-6px_rgba(0,0,0,0.06)] transition-colors sm:rounded-2xl ${dropzoneOver
                ? "border-[#1696C8]/55 bg-[rgba(22,150,200,0.1)]"
                : "border-[#579EBA]/35 bg-white"
                }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDropzoneOver(true);
                e.dataTransfer.dropEffect = "copy";
              }}
              onDragLeave={() => setDropzoneOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDropzoneOver(false);
                const type = e.dataTransfer.getData("text/widgetType");
                if (type === "kpi" || type === "table" || type === "chart") {
                  addTile(type);
                }
              }}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2.5">
                <div>
                  <h2 className="m-0 text-base font-semibold text-[#606060] sm:text-lg">
                    Canvas
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#858585] sm:text-sm">
                    Drag widgets here — drag tiles to reorder. Global filters apply
                    to all tiles.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-3">
                {tiles.map((tile) => {
                  const isSel = selectedId === tile.id;
                  return (
                    <div
                      key={tile.id}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={(e) => {
                        draggedTileId.current = tile.id;
                        e.dataTransfer.setData("text/tileId", tile.id);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const fromId =
                          e.dataTransfer.getData("text/tileId") ||
                          draggedTileId.current;
                        if (fromId) reorderTiles(fromId, tile.id);
                      }}
                      onClick={() => setSelectedId(tile.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(tile.id);
                        }
                      }}
                      style={{
                        gridColumn: `span ${tile.colSpan} / span ${tile.colSpan}`,
                      }}
                      className={`relative min-h-30 cursor-pointer overflow-hidden rounded-xl border bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition hover:-translate-y-px sm:rounded-2xl ${isSel
                        ? "border-[#1696C8]/55 shadow-[0_0_0_3px_rgba(22,150,200,0.2),0_1px_3px_rgba(15,23,42,0.06)]"
                        : "border-[#E0E0E0]"
                        }`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2.5">
                        <div className="text-xs font-semibold uppercase tracking-wide text-[#606060]">
                          {tile.config.title || "Untitled"}
                        </div>
                        <div className="shrink-0 rounded-full border border-[#579EBA]/35 bg-[#579EBA]/12 px-2 py-1 text-[11px] font-semibold text-[#4F81B2]">
                          {tile.type.toUpperCase()}
                        </div>
                      </div>

                      {tile.type === "kpi" && (
                        <div className="mt-1 text-[30px] font-semibold leading-none tracking-tight text-[#555] sm:text-[1.75rem]">
                          {mockKpiValue(
                            tile.config.metric ?? "",
                            globallyFilteredRows
                          )}
                        </div>
                      )}

                      {tile.type === "table" && (
                        <div className="mt-2.5 min-w-0">
                          <DataTable<MockRow>
                            columns={buildTablePreviewColumns(tile)}
                            rows={globallyFilteredRows.slice(0, 4)}
                            getRowKey={(r) => r._id}
                            gridTemplateColumns={tablePreviewGridTemplate(
                              effectiveColumns(tile).slice(0, 7)
                            )}
                            isBorderlessTable={true}
                          />
                        </div>
                      )}

                      {tile.type === "chart" && (
                        <div className="mt-2.5 overflow-hidden rounded-[10px] border border-[#BFBFBF] bg-white shadow-[0px_3px_0px_rgba(0,0,0,0.10)]">
                          <div className="flex h-8 items-center justify-between gap-2.5 bg-[linear-gradient(180deg,#579EBA_0%,#4F81B2_100%)] px-3 text-[10px] font-semibold uppercase tracking-wide text-white shadow-[0px_3px_0px_rgba(0,0,0,0.25)] sm:h-9 sm:text-xs">
                            <span>
                              {
                                CHART_TYPES.find(
                                  (c) => c.key === tile.config.chartType
                                )?.label
                              }{" "}
                              • {metricLabel(tile.config.metric ?? "")}
                            </span>
                            <span className="opacity-90">
                              {chartTimelineCaption(globalFilters)}
                            </span>
                          </div>
                          <div className="p-2.5">
                            <canvas
                              ref={(el) => {
                                if (el) chartRefs.current.set(tile.id, el);
                                else chartRefs.current.delete(tile.id);
                              }}
                              className="block h-32.5 w-full"
                              height={130}
                            />
                          </div>
                        </div>
                      )}

                      <div className="mt-2.5 flex flex-wrap gap-2.5 text-xs text-[#858585]">
                        <div className="flex items-center gap-1.5 rounded-xl border border-[#E0E0E0] bg-[#fbfdff] px-2 py-1.5">
                          <b className="text-[11px]">Global Filters</b>
                          <span className="text-[11px] font-bold text-[#858585]">
                            {summarizeGlobalFilters()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-30 flex shrink-0 flex-col justify-end gap-3 border-t border-[#E0E0E0] bg-[#F8F9FA]/95 px-3 py-3 backdrop-blur-sm sm:flex-row">
        <button
          type="button"
          onClick={requestSave}
          className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#1696C8] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1485b3] sm:order-2"
        >
          Save Report
        </button>
      </div>

      <Dialog
        open={saveConfirmOpen}
        onClose={closeSaveConfirm}
        lockBodyScroll={false}
        panelClassName="max-w-[min(100%,420px)] rounded-[28px] p-0 shadow-[0_8px_40px_rgba(15,23,42,0.12)] sm:rounded-[32px]"
        labelledBy={saveConfirmTitleId}
        describedBy={saveConfirmDescId}
        ariaLabel="Confirm save report"
      >
        <div className="relative bg-white px-5 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
          <button
            type="button"
            className="mb-2 inline-flex cursor-pointer rounded-lg p-1.5 text-neutral-900 transition hover:bg-slate-100"
            aria-label="Go back"
            onClick={closeSaveConfirm}
          >
            <HiArrowLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex flex-col items-center text-center">
            <Image src={duplicateReportDialogIcon} alt="Duplicate report" className="mb-5 h-[80px] w-[80px] object-contain" width={88} height={88} />

            <h2
              id={saveConfirmTitleId}
              className="text-xl font-semibold text-[#000000] sm:text-2xl"
            >
              Are you sure?
            </h2>
            <p
              id={saveConfirmDescId}
              className="mt-2 max-w-sm text-sm leading-relaxed text-[#9B9B9B] sm:text-[15px]"
            >
              Are you sure you want to unarchive this report? Saving will restore
              it as an active report.
            </p>

            <div className="mt-8 flex w-full gap-3 sm:mt-9 sm:gap-4">
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-slate-50"
                onClick={closeSaveConfirm}
              >
                No, Keep it!
              </button>
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-xl bg-gradient-to-b from-[#579EBA] to-[#4F81B2] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-[0.97]"
                onClick={() => {
                  closeSaveConfirm();
                  doSave();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      <div
        id={toastId}
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-3.5 left-1/2 z-[999] -translate-x-1/2 rounded-xl bg-[#0f172a] px-3 py-2.5 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(0,0,0,0.22)] transition-opacity duration-200 ${toastVisible && toastMsg ? "opacity-100" : "opacity-0"
          }`}
        style={{
          transform: toastVisible
            ? "translate(-50%, -6px)"
            : "translate(-50%, 0)",
        }}
      >
        {toastMsg ?? ""}
      </div>
    </div>
  );
}