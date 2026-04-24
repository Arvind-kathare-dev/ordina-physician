"use client";

import { useState } from "react";

export type SettingsSection = "pecos" | "information" | "order-delivery" | "returned-days" | "integration" | "vendor-settings" | "manage-users" | "subscriptions";

export function useSettings() {
    const [activeSection, setActiveSection] = useState<SettingsSection>("pecos");
    const [profileExpanded, setProfileExpanded] = useState(true);

    return {
        activeSection,
        setActiveSection,
        profileExpanded,
        setProfileExpanded,
    };
}