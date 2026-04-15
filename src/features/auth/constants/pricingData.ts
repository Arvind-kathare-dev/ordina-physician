import { Plan } from "../types/subscription.types";

export const plans: Plan[] = [
  {
    type: "standard",
    name: "TRIAL",
    badge: "1 Month",
    badgeColor: "bg-gray-200 text-gray-600",
    description: "Best for agencies starting with Ordina.",
    price: 0,
    features: [
      { text: "All Ordina platform features included" },
      { text: "Agency and physician workflows enabled" },
      { text: "Order processing, monitoring, and reporting" },
      { text: "Email / eFax / delivery workflow support" },
    ],
  },
  {
    type: "standard",
    name: "STARTER",
    badge: "Up to 1,500",
    badgeColor: "bg-blue-100 text-blue-600",
    description: "Best for smaller agencies starting with Ordina.",
    price: 299,
    orderLimit: "Monthly order limit: Up to 1,500 orders",
    orderLimitColor: "bg-blue-50 text-blue-500",
    features: [
      { text: "All Ordina platform features included" },
      { text: "Agency and physician workflows enabled" },
      { text: "Order processing, monitoring, and reporting" },
      { text: "Email / eFax / delivery workflow support" },
    ],
  },
  {
    type: "standard",
    name: "GROWTH",
    badge: "Up to 5,000",
    badgeColor: "bg-blue-100 text-blue-600",
    description: "For agencies handling growing operational volume.",
    price: 699,
    orderLimit: "Monthly order limit: Up to 5,000 orders",
    orderLimitColor: "bg-blue-50 text-blue-500",
    features: [
      { text: "All Ordina platform features included" },
      { text: "Shared functionality identical to all paid plans" },
      { text: "Built for larger daily order processing needs" },
      { text: "Operational visibility for agency teams" },
    ],
  },
  {
    type: "standard",
    name: "SCALE",
    badge: "Up to 10,000",
    badgeColor: "bg-purple-100 text-purple-600",
    description:
      "For high-throughput agencies managing major order flow.",
    price: 1199,
    orderLimit: "Monthly order limit: Up to 10,000 orders",
    orderLimitColor: "bg-purple-50 text-purple-500",
    features: [
      { text: "All Ordina platform features included" },
      { text: "Designed for larger agency scale and throughput" },
      { text: "Supports higher processing and coordination volume" },
      { text: "No feature restrictions versus smaller plans" },
    ],
  },
  {
    type: "enterprise",
    name: "ENTERPRISE",
    badge: "Contact Us",
    badgeColor: "bg-green-100 text-green-600",
    description:
      "Custom pricing and support for large networks and health groups.",
    contactInfo: {
      email: "sales@ordinahealth.com",
      phone: "+1 (202) 555-0148",
      note:
        "Contact our enterprise team for custom order volumes, onboarding, and commercial terms.",
    },
    features: [
      { text: "All Ordina platform features included" },
      { text: "Custom order volume and pricing arrangements" },
      { text: "Enterprise onboarding and tailored commercial setup" },
      { text: "Direct coordination with sales / implementation team" },
    ],
  },
];