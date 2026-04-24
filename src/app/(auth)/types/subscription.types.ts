export type PlanType = "standard" | "enterprise";

interface BasePlan {
  type: PlanType;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  features: {
    text: string;
  }[];
  highlight?: boolean;
}

/* ========================= */
/* STANDARD PLAN */
/* ========================= */

export interface StandardPlan extends BasePlan {
  type: "standard";
  price: number;
  orderLimit?: string;
  orderLimitColor?: string;
}

/* ========================= */
/* ENTERPRISE PLAN */
/* ========================= */

export interface EnterprisePlan extends BasePlan {
  type: "enterprise";
  contactInfo: {
    email: string;
    phone: string;
    note: string;
  };
}

/* ========================= */
/* FINAL UNION TYPE */
/* ========================= */

export type Plan = StandardPlan | EnterprisePlan;

/* Optional alias (your component uses this name) */
export type PricingPlan = Plan;