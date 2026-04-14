import { Info } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  desc: string;
}

export const StatCard = ({ title, value, desc }: StatCardProps) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border border-gray-100 p-4 w-full h-[165px]">
      <div className="flex justify-between">
        <span className="text-lg font-medium text-grayCustom-600">{title}</span>
        <Info size={16} className="text-grayCustom-400" />
      </div>

      <h2 className="text-[32px] font-semibold text-grayCustom-600">{value}</h2>

      <p className="text-[11px] font-normal text-grayCustom-400">{desc}</p>
    </div>
  );
};
