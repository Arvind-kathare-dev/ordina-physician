export type FilterIconId =
  | "viewGrid"
  | "tag"
  | "status"
  | "clock"
  | "user"
  | "building";

export type OrderTypeFilterItem = {
  id: string;
  label: string;
  defaultChecked?: boolean;
  expandable?: boolean;
  defaultExpanded?: boolean;
  children?: OrderTypeFilterItem[];
  emptyExpandMessage?: string;
};

export type CheckboxOption = {
  id: string;
  label: string;
  defaultChecked?: boolean;
};

export type MainFilterSection =
  | {
      id: string;
      label: string;
      icon: FilterIconId;
      kind: "orderTypeTree";
      treeItems: OrderTypeFilterItem[];
    }
  | {
      id: string;
      label: string;
      icon: FilterIconId;
      kind: "checkboxList";
      options: CheckboxOption[];
    };

export type RecentFilterPill = {
  id: string;
  label: string;
};

export type OrdersFilterStaticConfig = {
  recentSectionTitle: string;
  searchPlaceholder: string;
  recentPills: RecentFilterPill[];
  /** Single source for the six main filters (Order Type … By Agency). */
  mainFilters: MainFilterSection[];
};

const ORDER_TYPE_TREE: OrderTypeFilterItem[] = [
  { id: "ot_all", label: "All" },
  { id: "ot_med", label: "Medication Orders", defaultChecked: true },
  {
    id: "ot_therapy",
    label: "Therapy Orders",
    expandable: true,
    defaultExpanded: true,
    children: [
      { id: "ot_pt", label: "Physical Therapy (PT)" },
      { id: "ot_ot", label: "Occupational Therapy (OT)" },
      { id: "ot_st", label: "Speech Therapy (ST)" },
    ],
  },
  {
    id: "ot_sn",
    label: "Skilled Nursing Orders",
    expandable: true,
    defaultExpanded: false,
    children: [
      { id: "ot_sn_sn", label: "Skilled Nursing (SN)" },
      { id: "ot_sn_lpn", label: "Licensed Practical Nurse (LPN)" },
    ],
  },
  {
    id: "ot_hha",
    label: "Home Health Aide Orders",
    expandable: true,
    defaultExpanded: false,
    children: [
      { id: "ot_hha_1", label: "Personal Care Aide" },
      { id: "ot_hha_2", label: "Home Health Aide (HHA)" },
    ],
  },
  {
    id: "ot_msw",
    label: "Medical Social Work Orders",
    expandable: true,
    defaultExpanded: false,
    emptyExpandMessage: "No additional sub-types.",
  },
  {
    id: "ot_diet",
    label: "Dietary Orders",
    expandable: true,
    defaultExpanded: false,
    children: [{ id: "ot_diet_1", label: "Nutrition Assessment" }],
  },
  {
    id: "ot_dme",
    label: "DME Orders",
    expandable: true,
    defaultExpanded: false,
    children: [{ id: "ot_dme_1", label: "Equipment Request" }],
  },
  {
    id: "ot_eq",
    label: "Equipment and Supplies Orders",
    expandable: true,
    defaultExpanded: false,
    children: [{ id: "ot_eq_1", label: "Supplies" }],
  },
  {
    id: "ot_hh",
    label: "Home Health Orders",
    expandable: true,
    defaultExpanded: false,
    children: [{ id: "ot_hh_1", label: "Home Health Certification" }],
  },
];

export const ORDERS_FILTER_STATIC: OrdersFilterStaticConfig = {
  recentSectionTitle: "Recently Used Filters",
  searchPlaceholder: "Search",
  recentPills: [
    { id: "pill_pt", label: "Physical Therapy (PT)" },
    { id: "pill_sn", label: "Skilled Nursing Orders" },
  ],
  mainFilters: [
    {
      id: "mf_order_type",
      label: "Order Type",
      icon: "viewGrid",
      kind: "orderTypeTree",
      treeItems: ORDER_TYPE_TREE,
    },
    {
      id: "mf_order_label",
      label: "Order Label",
      icon: "tag",
      kind: "checkboxList",
      options: [
        { id: "bf_l_1", label: "Urgent" },
        { id: "bf_l_2", label: "Review required" },
        { id: "bf_l_3", label: "Routine" },
      ],
    },
    {
      id: "mf_order_status",
      label: "Order Status",
      icon: "status",
      kind: "checkboxList",
      options: [
        { id: "bf_s_1", label: "Pending" },
        { id: "bf_s_2", label: "Sent" },
        { id: "bf_s_3", label: "Received" },
      ],
    },
    {
      id: "mf_by_time",
      label: "By Time",
      icon: "clock",
      kind: "checkboxList",
      options: [
        { id: "bf_t_1", label: "Last 7 days" },
        { id: "bf_t_2", label: "Last 30 days" },
        { id: "bf_t_3", label: "Custom range" },
      ],
    },
    {
      id: "mf_by_patient",
      label: "By Patient",
      icon: "user",
      kind: "checkboxList",
      options: [
        { id: "bf_p_1", label: "Active patients only" },
        { id: "bf_p_2", label: "Include discharged" },
      ],
    },
    {
      id: "mf_by_agency",
      label: "By Agency",
      icon: "building",
      kind: "checkboxList",
      options: [
        { id: "bf_a_1", label: "Primary agency" },
        { id: "bf_a_2", label: "Partner agencies" },
      ],
    },
  ],
};

export function collectOrderTypeIds(items: OrderTypeFilterItem[]): string[] {
  const out: string[] = [];
  for (const it of items) {
    out.push(it.id);
    if (it.children?.length) {
      out.push(...collectOrderTypeIds(it.children));
    }
  }
  return out;
}

export function collectDefaultCheckedOrderTypeIds(
  items: OrderTypeFilterItem[]
): Set<string> {
  const set = new Set<string>();
  for (const it of items) {
    if (it.defaultChecked) set.add(it.id);
    if (it.children?.length) {
      for (const id of collectDefaultCheckedOrderTypeIds(it.children)) {
        set.add(id);
      }
    }
  }
  return set;
}

export function collectDefaultExpandedOrderTypeIds(
  items: OrderTypeFilterItem[]
): Set<string> {
  const set = new Set<string>();
  for (const it of items) {
    if (it.expandable && it.defaultExpanded) set.add(it.id);
    if (it.children?.length) {
      for (const id of collectDefaultExpandedOrderTypeIds(it.children)) {
        set.add(id);
      }
    }
  }
  return set;
}

/** Every checkbox id under a main filter section. */
export function collectAllOptionIdsForSection(section: MainFilterSection): string[] {
  if (section.kind === "orderTypeTree") {
    return collectOrderTypeIds(section.treeItems);
  }
  return section.options.map((o) => o.id);
}

export function collectDefaultCheckedForAllMainFilters(
  sections: MainFilterSection[]
): Set<string> {
  const set = new Set<string>();
  for (const sec of sections) {
    if (sec.kind === "orderTypeTree") {
      for (const id of collectDefaultCheckedOrderTypeIds(sec.treeItems)) {
        set.add(id);
      }
    } else {
      for (const o of sec.options) {
        if (o.defaultChecked) set.add(o.id);
      }
    }
  }
  return set;
}

export function getOrderTypeSection(
  sections: MainFilterSection[]
): Extract<MainFilterSection, { kind: "orderTypeTree" }> | undefined {
  return sections.find(
    (s): s is Extract<MainFilterSection, { kind: "orderTypeTree" }> =>
      s.kind === "orderTypeTree"
  );
}
