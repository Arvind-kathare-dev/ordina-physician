"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  HiCheck,
  HiChevronDown,
  HiChevronUp,
  HiOutlineClock,
  HiOutlineOfficeBuilding,
  HiOutlineStatusOnline,
  HiOutlineTag,
  HiOutlineUser,
  HiOutlineViewGrid,
  HiSearch,
  HiX,
} from "react-icons/hi";
import Dialog from "./Dialog";
import {
  type FilterIconId,
  type MainFilterSection,
  type OrderTypeFilterItem,
  ORDERS_FILTER_STATIC,
  collectAllOptionIdsForSection,
  collectDefaultCheckedForAllMainFilters,
  collectDefaultExpandedOrderTypeIds,
  getOrderTypeSection,
} from "../../data/ordersFilterStaticData";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const FILTER_TITLE_ID = "orders-filter-dialog-title";

const FILTER_DIALOG_PANEL_CLASS =
  "w-full max-w-[min(100%,calc(100vw-1.5rem))] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl min-[1920px]:max-w-3xl";

const CHECKBOX_CLASS =
  "h-4 w-4 shrink-0 rounded-xl border-slate-300 accent-[#528DB5] focus:ring-2 focus:ring-[#528DB5]/25";

function getSectionIdsForAggregate(section: MainFilterSection): string[] {
  const all = collectAllOptionIdsForSection(section);
  if (section.kind === "orderTypeTree") {
    return all.filter((id) => id !== "ot_all");
  }
  return all;
}

function isSectionFullySelected(
  section: MainFilterSection,
  checked: Set<string>
): boolean {
  const ids = getSectionIdsForAggregate(section);
  if (ids.length === 0) return false;
  return ids.every((id) => checked.has(id));
}

function isSectionPartiallySelected(
  section: MainFilterSection,
  checked: Set<string>
): boolean {
  const ids = getSectionIdsForAggregate(section);
  const n = ids.filter((id) => checked.has(id)).length;
  return n > 0 && n < ids.length;
}

const ICON_MAP: Record<FilterIconId, SvgIcon> = {
  viewGrid: HiOutlineViewGrid,
  tag: HiOutlineTag,
  status: HiOutlineStatusOnline,
  clock: HiOutlineClock,
  user: HiOutlineUser,
  building: HiOutlineOfficeBuilding,
};

type OrdersFilterDialogProps = {
  open: boolean;
  onClose: () => void;
};

function Pill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex max-w-full min-h-9 items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 sm:min-h-0 md:px-3 md:py-1.5 md:text-sm">
      <span className="truncate">{label}</span>
      <button
        type="button"
        className="shrink-0 rounded-full p-1 text-slate-500 hover:bg-slate-200/80 hover:text-slate-700 active:bg-slate-200"
        aria-label={`Remove ${label}`}
        onClick={onRemove}
      >
        <HiX className="h-4 w-4" />
      </button>
    </span>
  );
}

function filterOrderTypeTree(
  items: OrderTypeFilterItem[],
  query: string
): OrderTypeFilterItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  const walk = (nodes: OrderTypeFilterItem[]): OrderTypeFilterItem[] => {
    const out: OrderTypeFilterItem[] = [];
    for (const node of nodes) {
      const selfMatch = node.label.toLowerCase().includes(q);
      const filteredChildren = node.children?.length
        ? walk(node.children)
        : [];
      if (selfMatch) {
        out.push({ ...node, children: node.children });
      } else if (filteredChildren.length) {
        out.push({ ...node, children: filteredChildren });
      }
    }
    return out;
  };
  return walk(items);
}

export default function OrdersFilterDialog({
  open,
  onClose,
}: OrdersFilterDialogProps) {
  const cfg = ORDERS_FILTER_STATIC;
  const orderTypeTree = useMemo(
    () => getOrderTypeSection(cfg.mainFilters)?.treeItems ?? [],
    [cfg.mainFilters]
  );

  const [pillIds, setPillIds] = useState<string[]>(() =>
    cfg.recentPills.map((p) => p.id)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMainIds, setExpandedMainIds] = useState<Set<string>>(() => {
    const s = new Set<string>();
    if (cfg.mainFilters[0]?.id) s.add(cfg.mainFilters[0].id);
    return s;
  });
  const [checkedOptionIds, setCheckedOptionIds] = useState<Set<string>>(() =>
    collectDefaultCheckedForAllMainFilters(cfg.mainFilters)
  );
  const [expandedOrderTypes, setExpandedOrderTypes] = useState<Set<string>>(
    () => collectDefaultExpandedOrderTypeIds(orderTypeTree)
  );

  useEffect(() => {
    if (!open) return;
    const c = ORDERS_FILTER_STATIC;
    const tree = getOrderTypeSection(c.mainFilters)?.treeItems ?? [];
    setPillIds(c.recentPills.map((p) => p.id));
    setSearchQuery("");
    setExpandedMainIds(() => {
      const s = new Set<string>();
      if (c.mainFilters[0]?.id) s.add(c.mainFilters[0].id);
      return s;
    });
    setCheckedOptionIds(collectDefaultCheckedForAllMainFilters(c.mainFilters));
    setExpandedOrderTypes(collectDefaultExpandedOrderTypeIds(tree));
  }, [open]);

  const filteredOrderItems = useMemo(
    () => filterOrderTypeTree(orderTypeTree, searchQuery),
    [orderTypeTree, searchQuery]
  );

  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) return;
    setExpandedOrderTypes((prev) => {
      const next = new Set(prev);
      const mark = (items: OrderTypeFilterItem[]) => {
        for (const it of items) {
          if (it.children?.length) {
            next.add(it.id);
            mark(it.children);
          }
        }
      };
      mark(filteredOrderItems);
      return next;
    });
  }, [searchQuery, filteredOrderItems]);

  const pillLabelById = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of cfg.recentPills) m.set(p.id, p.label);
    return m;
  }, [cfg.recentPills]);

  const removePill = useCallback((id: string) => {
    setPillIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const selectAllOptionsInSection = useCallback(
    (section: MainFilterSection) => {
      const ids = collectAllOptionIdsForSection(section);
      setCheckedOptionIds((prev) => {
        const next = new Set(prev);
        if (section.kind === "orderTypeTree") {
          for (const id of ids) {
            if (id !== "ot_all") next.add(id);
          }
          next.delete("ot_all");
        } else {
          for (const id of ids) next.add(id);
        }
        return next;
      });
    },
    []
  );

  const clearSectionOptions = useCallback((section: MainFilterSection) => {
    const toRemove = collectAllOptionIdsForSection(section);
    setCheckedOptionIds((prev) => {
      const next = new Set(prev);
      for (const id of toRemove) next.delete(id);
      return next;
    });
  }, []);

  const onSectionHeaderCheckboxChange = useCallback(
    (section: MainFilterSection, nextChecked: boolean) => {
      if (nextChecked) {
        selectAllOptionsInSection(section);
      } else {
        clearSectionOptions(section);
      }
    },
    [selectAllOptionsInSection, clearSectionOptions]
  );

  const toggleMainMenuOpen = useCallback((sectionId: string) => {
    setExpandedMainIds((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  }, []);

  const toggleExpandedOrderType = useCallback((id: string) => {
    setExpandedOrderTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleCheckOption = useCallback((id: string, nextChecked: boolean) => {
    if (id === "ot_all") {
      if (nextChecked) {
        setCheckedOptionIds(new Set(["ot_all"]));
      } else {
        setCheckedOptionIds((prev) => {
          const s = new Set(prev);
          s.delete("ot_all");
          return s;
        });
      }
      return;
    }

    setCheckedOptionIds((prev) => {
      const s = new Set(prev);
      if (nextChecked) {
        s.delete("ot_all");
        s.add(id);
      } else {
        s.delete(id);
      }
      return s;
    });
  }, []);

  const renderOrderTypeNodes = (items: OrderTypeFilterItem[]): ReactNode => {
    return items.map((item) => {
      const hasKids = Boolean(item.children?.length);
      const hasPlaceholder = Boolean(item.expandable && item.emptyExpandMessage);
      const showChevron = item.expandable && (hasKids || hasPlaceholder);
      const isExpanded = expandedOrderTypes.has(item.id);
      const checked = checkedOptionIds.has(item.id);

      return (
        <div key={item.id}>
          <div className="flex items-center gap-2 py-2 pr-1 sm:gap-3">
            <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 sm:gap-3">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) =>
                  toggleCheckOption(item.id, e.target.checked)
                }
                className={CHECKBOX_CLASS}
              />
              <span className="min-w-0 flex-1 select-none text-xs text-slate-700 md:text-sm">
                {item.label}
              </span>
            </label>
            {showChevron ? (
              <button
                type="button"
                className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-expanded={isExpanded}
                aria-label={
                  isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`
                }
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleExpandedOrderType(item.id);
                }}
              >
                {isExpanded ? (
                  <HiChevronUp className="h-4 w-4" aria-hidden />
                ) : (
                  <HiChevronDown className="h-4 w-4" aria-hidden />
                )}
              </button>
            ) : null}
          </div>
          {showChevron && isExpanded ? (
            <div className="border-l border-slate-100 pl-3 sm:pl-4">
              {hasKids
                ? renderOrderTypeNodes(item.children!)
                : hasPlaceholder ? (
                  <p className="py-2 pl-1 text-[12px] leading-snug text-slate-500 md:text-xs">
                    {item.emptyExpandMessage}
                  </p>
                ) : null}
            </div>
          ) : null}
        </div>
      );
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy={FILTER_TITLE_ID}
      panelClassName={FILTER_DIALOG_PANEL_CLASS}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <h2
            id={FILTER_TITLE_ID}
            className="min-w-0 flex-1 text-xs font-semibold tracking-tight text-slate-900 sm:text-sm md:text-base lg:text-lg"
          >
            {cfg.recentSectionTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 outline-none transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-slate-300/80 min-h-9 min-w-9"
            aria-label="Close dialog"
          >
            <HiX
              className="h-4 w-4"
              aria-hidden
            />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {pillIds.length === 0 ? (
            <p className="text-xs text-slate-400 md:text-sm">No recent filters</p>
          ) : (
            pillIds.map((id) => (
              <Pill
                key={id}
                label={pillLabelById.get(id) ?? id}
                onRemove={() => removePill(id)}
              />
            ))
          )}
        </div>

        <div className="relative mt-4">
          <HiSearch
            className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 md:left-3 md:h-5 md:w-5"
            aria-hidden
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={cfg.searchPlaceholder}
            className="min-h-10 w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-2.5 text-xs text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80 sm:min-h-9 sm:pl-10 sm:pr-3 sm:text-sm md:min-h-10 md:text-sm"
            aria-label="Search filters"
          />
        </div>

        <div className="mt-5">
          <div className="space-y-2">
            {cfg.mainFilters.map((section) => (
              <MainFilterBlock
                key={section.id}
                section={section}
                menuOpen={expandedMainIds.has(section.id)}
                checkedOptionIds={checkedOptionIds}
                filteredOrderItems={
                  section.kind === "orderTypeTree"
                    ? filteredOrderItems
                    : []
                }
                searchQuery={searchQuery}
                onSectionHeaderCheckboxChange={(checked) =>
                  onSectionHeaderCheckboxChange(section, checked)
                }
                onToggleMenu={() => toggleMainMenuOpen(section.id)}
                onToggleOption={toggleCheckOption}
                renderOrderTypeNodes={renderOrderTypeNodes}
              />
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function MainFilterBlock({
  section,
  menuOpen,
  checkedOptionIds,
  filteredOrderItems,
  searchQuery,
  onSectionHeaderCheckboxChange,
  onToggleMenu,
  onToggleOption,
  renderOrderTypeNodes,
}: {
  section: MainFilterSection;
  menuOpen: boolean;
  checkedOptionIds: Set<string>;
  filteredOrderItems: OrderTypeFilterItem[];
  searchQuery: string;
  onSectionHeaderCheckboxChange: (checked: boolean) => void;
  onToggleMenu: () => void;
  onToggleOption: (id: string, checked: boolean) => void;
  renderOrderTypeNodes: (items: OrderTypeFilterItem[]) => ReactNode;
}) {
  const Icon = ICON_MAP[section.icon];
  const headerCheckboxRef = useRef<HTMLInputElement>(null);
  const sectionFullySelected = isSectionFullySelected(
    section,
    checkedOptionIds
  );
  const sectionPartiallySelected = isSectionPartiallySelected(
    section,
    checkedOptionIds
  );

  useEffect(() => {
    const el = headerCheckboxRef.current;
    if (!el || menuOpen) return;
    el.indeterminate = sectionPartiallySelected && !sectionFullySelected;
  }, [menuOpen, sectionPartiallySelected, sectionFullySelected]);

  return (
    <div
      className={`overflow-hidden rounded-xl transition-colors`}
    >
      <div className="flex items-stretch bg-[#f5f5f5] rounded-xl p-1 px-3 gap-2">
        {menuOpen ? (
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-lg py-1 text-left text-slate-800 sm:gap-3"
            aria-expanded
            aria-controls={`${section.id}-submenu`}
            aria-label={`Close ${section.label} options`}
            onClick={onToggleMenu}
          >
            <Icon className="h-4 w-4 shrink-0 text-slate-400 md:h-5 md:w-5" aria-hidden />
            <span className="min-w-0 flex-1 text-xs font-medium md:text-sm">
              {section.label}
            </span>
            <HiChevronUp
              className="h-4 w-4 shrink-0 text-slate-500 md:h-5 md:w-5"
              aria-hidden
            />
          </button>
        ) : (
          <>
            <button
              type="button"
              className="flex min-w-0 flex-1 items-center gap-2 py-1 text-left text-slate-800 sm:gap-3"
              aria-expanded={false}
              aria-controls={`${section.id}-submenu`}
              aria-label={`Open ${section.label} options`}
              onClick={onToggleMenu}
            >
              <Icon className="h-4 w-4 shrink-0 text-slate-400 md:h-5 md:w-5" aria-hidden />
              <span className="min-w-0 flex-1 text-xs font-medium md:text-sm">
                {section.label}
              </span>
            </button>
            <div
              className="flex shrink-0 items-center justify-center rounded-lg px-2 py-1"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <label className="inline-flex cursor-pointer items-center justify-center">
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  className="sr-only"
                  checked={sectionFullySelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    onSectionHeaderCheckboxChange(e.target.checked);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Select all ${section.label}`}
                />
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-xl border transition-colors ${sectionFullySelected
                      ? "border-blue-600 bg-blue-600"
                      : sectionPartiallySelected && !sectionFullySelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-300 bg-white"
                    }`}
                  aria-hidden
                >
                  {sectionFullySelected ? (
                    <HiCheck className="h-3.5 w-3.5 text-white" />
                  ) : sectionPartiallySelected && !sectionFullySelected ? (
                    <span className="block h-0.5 w-2.5 rounded-full bg-blue-600" />
                  ) : null}
                </span>
              </label>
            </div>
          </>
        )}
      </div>

      {menuOpen ? (
        <div
          id={`${section.id}-submenu`}
          className="bg-white/95 pl-4"
        >
          {section.kind === "orderTypeTree" ? (
            <div className="pl-2 sm:pl-3">
              {filteredOrderItems.length === 0 ? (
                <p className="py-3 text-center text-xs text-slate-500 md:text-sm">
                  No matches for &quot;{searchQuery.trim()}&quot;
                </p>
              ) : (
                renderOrderTypeNodes(filteredOrderItems)
              )}
            </div>
          ) : (
            <ul className="space-y-0">
              {section.options.map((opt) => (
                <li key={opt.id}>
                  <label className="flex min-h-10 cursor-pointer items-center gap-2 py-1.5 sm:min-h-0 md:gap-3 md:py-2">
                    <input
                      type="checkbox"
                      checked={checkedOptionIds.has(opt.id)}
                      onChange={(e) =>
                        onToggleOption(opt.id, e.target.checked)
                      }
                      className={CHECKBOX_CLASS}
                    />
                    <span className="text-xs text-slate-700 md:text-sm">
                      {opt.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
