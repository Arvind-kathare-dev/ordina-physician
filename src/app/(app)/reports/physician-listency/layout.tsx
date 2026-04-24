import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospice Report | Ordina Agency",
};

export default function PhysicianListencyReportLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
