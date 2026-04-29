import React from "react";
import { PricingCard } from "./card/PricingCard";
import { Plan } from "../types/subscription.types";
import { plans } from "../constants/pricingData";

interface SubscriptionPlanProps {
  data: {
    selectedPlan: string;
  };
  onChange: (data: { selectedPlan: string }) => void;
}

const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({ data, onChange }) => {
  return (
    <div className=" bg-white  py-12 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {plans.map((plan: Plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              isSelected={data.selectedPlan === plan.name}
              onSelect={(name) => onChange({ selectedPlan: name })}
            /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;