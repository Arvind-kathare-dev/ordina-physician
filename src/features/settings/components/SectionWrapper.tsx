import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function SectionWrapper({
  title,
  description,
  icon: Icon,
  children,
}: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>

        <button className="text-sm text-orange-600">Needs Review</button>
      </div>

      {children}
    </div>
  );
}