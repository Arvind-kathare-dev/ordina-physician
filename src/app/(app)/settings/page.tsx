"use client";

import IntegrationSection from "./components/sections/IntegrationSection";
import ManageUsersSection from "./components/sections/ManageUsersSection";
import { OrderDeliverySection } from "./components/sections/OrderDeliverySection";
import PecosSection from "./components/sections/PecosSection";
import ReturnedDaysSection from "./components/sections/ReturnedDaysSection";
import { SubscriptionSettingSection } from "./components/sections/SubscriptionSettingSection";
import VendorSettingsSection from "./components/sections/VendorSettingsSection";
import SettingsHeader from "./components/SettingsHeader";
import SettingsLayout from "./components/SettingsLayout";
import SettingsSidebar from "./components/SettingsSidebar";
import { useSettings } from "./hooks/useSettings";
import { InformationSection } from "./components/sections/InformationSection";



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