



export const ordersTableData:any = [
  { agency: "ABC Pvt-Ltd", patients: 25, orders: 85 },
  { agency: "MedSync", patients: 29, orders: 35 },
  { agency: "AlphaCure", patients: 35, orders: 47 },
  { agency: "PureWell Health", patients: 10, orders: 20 },
  { agency: "CurePoint", patients: 40, orders: 65 },
  { agency: "MedHealth", patients: 35, orders: 47 },
  { agency: "PureWell Health", patients: 10, orders: 20 },
  { agency: "CurePoint", patients: 40, orders: 65 },
];

export const billableOrdersData = [
  { name: "MD\nVerification", value: 9200 },
  { name: "DME", value: 1600 },
  { name: "485", value: 2100 },
  { name: "Lab", value: 6900 },
  { name: "Hospice", value: 5100 },
  { name: "Home\nHealth", value: 3200 },
  { name: "Order", value: 8121 },
  { name: "Other", value: 4250 },
];


export const avgCompletionData = [
  { name: "MD Verification", selected: 4, avg: 3 },
  { name: "Orders", selected: 3.2, avg: 3.8 },
];

export const serviceTypeData = [
  { name: "MD", value: 40, color: "#6366f1" },
  { name: "Hospice", value: 25, color: "#a5b4fc" },
  { name: "Home Health", value: 15, color: "#c7d2fe" },
  { name: "Imaging", value: 20, color: "#e0e7ff" },
];


export const pendingOrdersData = {
  title: "Pending Order Breakdown",
  value: 50,
  desc: "Orders currently pending",
  total: 50,

  breakdown: [
    { label: "POC / 485", count: 10, color: "blue" },
    { label: "F2F", count: 18, color: "green" },
    { label: "IPD", count: 22, color: "yellow" },
  ],

  aging: [
    { label: "0–7 days", count: 20 },
    { label: "8–15 days", count: 30 },
    { label: "16–30 days", count: 10 },
  ],
};

export const signedOrdersData = {
  title: "Signed Order Breakdown",
  value: 12,
  desc: "Orders successfully signed",
  total: 12,

  breakdown: [
    { label: "POC / 485", count: 4, color: "blue" },
    { label: "F2F", count: 6, color: "green" },
    { label: "IPD", count: 2, color: "yellow" },
  ],
};