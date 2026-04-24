import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billable Orders | Reports",
};

export default function BillableOrdersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
