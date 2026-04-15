import { CheckIcon } from "lucide-react";
import { PricingPlan } from "../../types/subscription.types";

export const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
  const isStandard = plan.type === "standard";
  const isEnterprise = plan.type === "enterprise";

  return (
    <div
      className={`relative bg-white rounded-2xl border p-4 flex flex-col gap-4  h-fit transition-all duration-300
      ${
        "highlight" in plan && plan.highlight
          ? "border-blue-500 shadow-lg scale-[1.02]"
          : "border-gray-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* 🔥 Highlight Badge */}
      {"highlight" in plan && plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold tracking-widest text-gray-400">
          {plan.name}
        </h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${plan.badgeColor}`}
        >
          {plan.badge}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-300 leading-relaxed min-h-[32px]">
        {plan.description}
      </p>

      {/* ========================= */}
      {/* CONDITIONAL SECTION */}
      {/* ========================= */}

      {/* Standard */}
      {isStandard && (
        <>
          {/* Price */}
          <div className="flex items-end gap-1">
            <span className="text-4xl lg:text-[42px] font-black text-gray-400 leading-none">
              ${plan.price}
            </span>
            <span className="text-gray-400 text-sm mb-1">/ month</span>
          </div>

          {/* Order Limit */}
          {plan.orderLimit && (
            <div
              className={`rounded-xl px-4 py-2 text-sm font-medium ${plan.orderLimitColor}`}
            >
              {plan.orderLimit}
            </div>
          )}
        </>
      )}

      {/* Enterprise */}
      {isEnterprise && (
        <div className="rounded-xl border border-gray-200 p-4 flex flex-col gap-1 bg-gray-50">
          <p className="text-sm font-semibold text-gray-800">
            Enterprise Contact
          </p>
          <p className="text-xs text-blue-400 font-normal">
            {plan.contactInfo.email}
          </p>
          <p className="text-xs text-gray-400 font-normal">
            {plan.contactInfo.phone}
          </p>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed font-normal">
            {plan.contactInfo.note}
          </p>
        </div>
      )}

      {/* ========================= */}
      {/* FEATURES */}
      {/* ========================= */}

      <ul className="flex flex-col gap-2 flex-1">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-400 leading-snug">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* ========================= */}
      {/* CTA BUTTON */}
      {/* ========================= */}

      {/* <button
        className={`mt-auto w-full rounded-xl py-2.5 text-sm font-semibold transition
        ${
          isStandard
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isStandard ? "Get Started" : "Contact Sales"}
      </button> */}
    </div>
  );
};