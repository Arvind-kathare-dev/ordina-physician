"use client";

import { useState } from "react"
import { FileText } from "lucide-react"
import SectionWrapper from "../SectionWrapper"
import { Plan } from "@/app/(auth)/types/subscription.types"
import { SectionWrapperBox } from "../SectionWrapperBox"
import { PricingCard } from "@/app/(auth)/components/card/PricingCard"
import { plans } from "@/app/(auth)/constants/pricingData"

export const SubscriptionSettingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState("Scale");

  return (
    <SectionWrapperBox title="Subscriptions">
      <SectionWrapper
        title="Subscription Plans"
        description="Choose the plan that best fits your agency's scale. Upgrade or downgrade at any time to adjust your feature set and limits."
        icon={FileText}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan: Plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isSelected={selectedPlan === plan.name}
              onSelect={(name) => setSelectedPlan(name)}
            />
          ))}
        </div>
      </SectionWrapper>
    </SectionWrapperBox>
  )
}
