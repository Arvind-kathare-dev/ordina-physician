// components/PricingCard.tsx
interface PricingCardProps {
  title: string;
  price: string;
  subtitle?: string;
  features: string[];
  highlight?: boolean;
  onSelect: () => void;
}

export default function PricingCard({
  title,
  price,
  subtitle,
  features,
  highlight,
  onSelect,
}: PricingCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`border rounded-2xl p-5 cursor-pointer transition hover:shadow-lg ${
        highlight ? "border-blue-500 shadow-md" : "border-gray-200"
      }`}
    >
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>

      <div className="mt-2">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-gray-500 text-sm"> / month</span>
      </div>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {features.map((feature, i) => (
          <li key={i}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}