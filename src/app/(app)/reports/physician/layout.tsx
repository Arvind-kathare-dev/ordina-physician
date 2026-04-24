import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physician Report | Ordina Agency",
};

export default function PhysicianReportLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
