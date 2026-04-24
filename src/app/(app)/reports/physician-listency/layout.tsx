import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physician Latency | Ordina Agency",
};

export default function PhysicianListencyReportLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
