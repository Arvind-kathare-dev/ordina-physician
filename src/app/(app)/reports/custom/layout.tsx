import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Report | Ordina Agency",
};

export default function CustomReportLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
