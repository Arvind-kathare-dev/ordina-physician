"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReportsIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/reports/patient");
  }, [router]);

  return null;
}
