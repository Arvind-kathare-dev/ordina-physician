import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Settings | Ordina Agency",
  description: "Account and onboarding settings",
};

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${inter.className} flex min-h-screen flex-col bg-[#F8FAFC] text-slate-900 antialiased`}
    >
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
