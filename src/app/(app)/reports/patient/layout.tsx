import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Report | Ordina Agency",
};

export default function PatientReportLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
