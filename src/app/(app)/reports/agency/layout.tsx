import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agency Report | Ordina Agency",
};

export default function AgencyReportLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return children;
}
