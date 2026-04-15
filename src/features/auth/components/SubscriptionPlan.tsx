import React from "react";
import { PricingCard } from "./card/PricingCard";
import { Plan } from "../types/subscription.types";
import { plans } from "../constants/pricingData";

const SubscriptionPlan: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {plans.map((plan: Plan) => (
            <PricingCard key={plan.name} plan={plan} /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;