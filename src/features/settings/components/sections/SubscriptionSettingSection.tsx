import { FileText } from "lucide-react"
import SectionWrapper from "../SectionWrapper"
import { plans } from "@/features/auth/constants/pricingData"
import { PricingCard } from "@/features/auth/components/card/PricingCard"
import { Plan } from "@/features/auth/types/subscription.types"
import { SectionWrapperBox } from "../SectionWrapperBox"

export const SubscriptionSettingSection = () => {
  return (
    <SectionWrapperBox title="Subscriptions">
  <SectionWrapper
        title="Subscriptions"
        description="Define SLA limits that drive the Returned-in Days column (e.g., “Today”, “2 Days”, “7 Days”) and latency/alert logic. Rules are evaluated as: Service Type + Order Type → Threshold."
        icon={FileText}
      >
        <div className="grid grid-cols-3 gap-5">
          {plans.map((plan: Plan) => (
                     <PricingCard key={plan.name} plan={plan} /> 
                   ))}
        </div>
      </SectionWrapper>
    </SectionWrapperBox>
  )
}
