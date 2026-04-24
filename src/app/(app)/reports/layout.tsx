import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ReportsShell from "./ReportsShell";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Operational Reports | Ordina Agency",
  description: "Operational reports for Ordina Agency",
};

export default function ReportsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${inter.className} flex min-h-screen flex-col bg-[#F8F9FA] text-neutral-900 antialiased`}
    >
      <div className="min-h-0 flex-1">
        <ReportsShell>{children}</ReportsShell>
      </div>
    </div>
  );
}
