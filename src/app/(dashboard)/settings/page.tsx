"use client";

import { InformationSection } from "@/features/settings/components/sections/InformationSection";
import IntegrationSection from "@/features/settings/components/sections/IntegrationSection";
import ManageUsersSection from "@/features/settings/components/sections/ManageUsersSection";
import { OrderDeliverySection } from "@/features/settings/components/sections/OrderDeliverySection";
import PecosSection from "@/features/settings/components/sections/PecosSection";
import ReturnedDaysSection from "@/features/settings/components/sections/ReturnedDaysSection";
import { SubscriptionSettingSection } from "@/features/settings/components/sections/SubscriptionSettingSection";
import VendorSettingsSection from "@/features/settings/components/sections/VendorSettingsSection";
import SettingsHeader from "@/features/settings/components/SettingsHeader";
import SettingsLayout from "@/features/settings/components/SettingsLayout";
import SettingsSidebar from "@/features/settings/components/SettingsSidebar";
import { useSettings } from "@/features/settings/hooks/useSettings";



export default function SettingsPage() {
    const state = useSettings();

    const renderSection = () => {
        switch (state.activeSection) {
            case "pecos":
                return <PecosSection />;
            case "information":
                return <InformationSection />;
            case "order-delivery":
                return <OrderDeliverySection />;
                  case "integration":
                return <IntegrationSection />;
            case "returned-days":
                return <ReturnedDaysSection />;
                  case "manage-users":
                return <ManageUsersSection />;
                  case "subscriptions":
                return <SubscriptionSettingSection />;
            case "vendor-settings":
                return <VendorSettingsSection />;
            default:
                return null;
        }
    };

    return (
        <SettingsLayout
            header={<SettingsHeader />}
            sidebar={<SettingsSidebar {...state} />}
        >
            {renderSection()}
        </SettingsLayout>
    );
}