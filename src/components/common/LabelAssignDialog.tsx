"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  HiChevronDown,
  HiOutlineTag,
  HiSearch,
  HiX,
} from "react-icons/hi";
import Dialog from "./Dialog";
import type { OrderTableRow } from "../../data/ordersStaticData";
import Image from "next/image";
import labelIcon from "../../assets/images/action-icons/label.svg";

const PRIMARY = "#528DB5";

const PRESET_LABELS = [
  { id: "1", name: "Error", hex: "#FF303C" },
  { id: "2", name: "Pending Sign", hex: "#34C759" },
  { id: "3", name: "Report", hex: "#FF802B" },
  { id: "4", name: "Critical", hex: "#AC7F5E" },
  { id: "5", name: "Urgent", hex: "#00C3FF" },
] as const;

function orderLabelRef(row: OrderTableRow) {
  const n = row.id.padStart(2, "0");
  return `OR25PHY${n}`;
}

type View = "assign" | "create";

export default function LabelAssignDialog({ row }: { row: OrderTableRow }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("assign");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);
  const [labelName, setLabelName] = useState("Urgent");
  const [selectedColorHex, setSelectedColorHex] = useState<string>(
    PRESET_LABELS[4].hex
  );
  const [colorMenuOpen, setColorMenuOpen] = useState(false);

  const titleId = useId();
  const subtitleId = useId();

  const orderRef = useMemo(() => orderLabelRef(row), [row]);

  useEffect(() => {
    if (!open) return;
    setView("assign");
    setSearchQuery("");
    setSelectedLabelId(null);
    setLabelName("Urgent");
    setSelectedColorHex(PRESET_LABELS[4].hex);
    setColorMenuOpen(false);
  }, [open]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [...PRESET_LABELS];
    return PRESET_LABELS.filter(
      (l) =>
        l.name.toLowerCase().includes(q) || l.hex.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const isSearchEmptyState =
    view === "assign" && searchQuery.trim().length > 0 && filtered.length === 0;

  const title =
    view === "create"
      ? "Create New Label"
      : isSearchEmptyState
        ? "Search Label"
        : "Assign Label";

  const subtitle =
    view === "create"
      ? "If it doesn't exist, create & assign it"
      : `Select or create a label for ${orderRef}`;

  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="rounded-md text-[#528DB5] hover:bg-slate-100"
        aria-label="Tag"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Image
          src={labelIcon}
          alt="Tag"
          width={18}
          height={18}
        />
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        panelClassName="max-w-[min(100%,499px)] rounded-[10px] max-h-[min(92vh,392px)]"
        labelledBy={titleId}
        describedBy={view === "assign" ? subtitleId : undefined}
      >
        <div className="relative flex max-h-[min(92vh,392px)] flex-col overflow-hidden bg-white">
          <button
            type="button"
            className="absolute right-4 cursor-pointer top-4 rounded-md p-1 text-[#9B9B9B] hover:bg-slate-100 hover:text-[#666]"
            aria-label="Close"
            onClick={handleClose}
          >
            <HiX className="h-5 w-5" />
          </button>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 px-6 pt-5">
            <div className="pr-10">
              <h2
                id={titleId}
                className="text-lg font-semibold leading-tight text-[#606060]"
              >
                {title}
              </h2>
              <p
                id={subtitleId}
                className="mt-1.5 text-sm leading-snug text-[#858585]"
              >
                {subtitle}
              </p>
            </div>

            {view === "create" ? (
              <div className="mt-4 flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="label-assign-name"
                    className="mb-1.5 block text-sm font-medium text-[#9B9B9B]"
                  >
                    Label Name
                  </label>
                  <input
                    id="label-assign-name"
                    type="text"
                    value={labelName}
                    onChange={(e) => setLabelName(e.target.value)}
                    className="w-full rounded-[6px] border-[0.5px] border-[#68646499] px-3 h-[40px] text-sm text-[#3D3D3D] outline-none ring-0 placeholder:text-[#9B9B9B] focus:border-[#528DB5]"
                    placeholder="Label name"
                  />
                </div>
                <div className="relative">
                  <span className="mb-1.5 block text-sm font-medium text-[#9B9B9B]">
                    Color
                  </span>
                  <button
                    type="button"
                    aria-expanded={colorMenuOpen}
                    aria-haspopup="listbox"
                    onClick={() => setColorMenuOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-[6px] border-[0.5px] border-[#68646499] bg-white px-3 h-[40px] text-left outline-none focus:border-[#528DB5]"
                  >
                    <span
                      className="h-6 w-14 shrink-0 rounded border border-black/5"
                      style={{ backgroundColor: selectedColorHex }}
                      aria-hidden
                    />
                    <HiChevronDown className="h-5 w-5 shrink-0 text-[#9B9B9B]" />
                  </button>
                  {colorMenuOpen ? (
                    <ul
                      className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-md border border-[#E0E0E0] bg-white py-1 shadow-lg"
                      role="listbox"
                    >
                      {PRESET_LABELS.map((opt) => (
                        <li key={opt.id}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={opt.hex === selectedColorHex}
                            className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-slate-50"
                            onClick={() => {
                              setSelectedColorHex(opt.hex);
                              setColorMenuOpen(false);
                            }}
                          >
                            <span
                              className="h-5 w-10 shrink-0 rounded border border-black/5"
                              style={{ backgroundColor: opt.hex }}
                            />
                            <span className="text-[#3D3D3D]">{opt.name}</span>
                            <span className="ml-auto text-xs text-[#9B9B9B]">
                              {opt.hex}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="mt-4 flex min-h-0 flex-1 flex-col">
                <div className="relative shrink-0">
                  <HiSearch
                    className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9B9B9B]"
                    aria-hidden
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Labels"
                    className="w-full rounded-[8px] border-[0.5px] border-[#CDCDCD] bg-white py-2.5 pl-10 pr-3 text-sm text-[#606060] outline-none placeholder:text-[#9B9B9B] focus:border-[#528DB5]"
                  />
                </div>

                <div className="mt-4 flex min-h-0 flex-1 flex-col bg-[#FFFFFF] overflow-hidden rounded-[8px] border border-[#D1D1D6]">
                  <div className="flex items-center justify-between bg-[#F4F4F4] border-b-[0.5px] border-[#DDDDDD] px-3 py-2">
                    <p className="text-xs font-semibold text-[#9B9B9B]">Existing Labels</p>
                    <p className="text-xs font-medium text-[#9B9B9B]">{filtered.length} Found</p>
                  </div>

                  <div className="min-h-[200px] flex-1 bg-white overflow-y-auto">
                    {filtered.length === 0 ? (
                      <p className="flex min-h-[180px] items-center justify-center px-4 text-center text-sm text-[#9B9B9B]">
                        No matching labels.
                      </p>
                    ) : (
                      <ul className="" role="listbox">
                        {filtered.map((l) => {
                          const selected = selectedLabelId === l.id;
                          return (
                            <li key={l.id}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={selected}
                                onClick={() =>
                                  setSelectedLabelId((cur) =>
                                    cur === l.id ? null : l.id
                                  )
                                }
                                className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-[#F9FAFB] ${selected ? "bg-[#F0F7FC]" : ""}`}
                              >
                                <span
                                  className="h-2 w-2 shrink-0 rounded-full shadow-sm ring-1 ring-black/5"
                                  style={{ backgroundColor: l.hex }}
                                  aria-hidden
                                />
                                <span className="min-w-0 flex-1 text-sm font-medium text-[#686464]">
                                  {l.name}
                                </span>
                                <span className="shrink-0 text-xs tabular-nums text-[#858585]">
                                  {l.hex}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap justify-end gap-2 pt-1">
              {view === "create" ? (
                <>
                  <button
                    type="button"
                    onClick={() => setView("assign")}
                    className="rounded-[8px] cursor-pointer border-[0.5px] border-[#9B9B9B] bg-white px-4 py-2 text-sm font-medium text-[#6B6B6B] hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-[8px] cursor-pointer bg-gradient-to-b from-[##579EBA] to-[#4F81B2] px-4 py-2 text-sm font-medium text-[#FFFFFF] hover:bg-slate-50"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    Create &amp; Assign
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setView("create")}
                    className="rounded-[8px] cursor-pointer border-[0.5px] border-[#4F81B2] bg-white px-4 py-2 text-sm font-medium text-[#579EBA] hover:bg-slate-50"
                    style={{ borderColor: PRIMARY, color: PRIMARY }}
                  >
                    Create Label
                  </button>
                  <button
                    type="button"
                    disabled={!selectedLabelId}
                    className="rounded-[8px] cursor-pointer border-[0.5px] border-[#9B9B9B] bg-white px-4 py-2 text-sm font-medium text-[#9B9B9B] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remove Label
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-[8px] cursor-pointer border-[0.5px] border-[#4F81B2] bg-white px-4 py-2 text-sm font-medium text-[#579EBA] hover:bg-slate-50"
                    style={{ borderColor: PRIMARY, color: PRIMARY }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
