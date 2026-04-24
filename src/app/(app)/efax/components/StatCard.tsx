type StatCardProps = {
  label: string;
  value: string | number;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div
      key={label}
      className="bg-white flex flex-col gap-2  shadow-card-shadow  rounded-xl px-5 py-4"
    >
      <p className="text-[15px] font-medium text-grayCustom-400">{label}</p>
      <p className="text-3xl font-bold text-grayCustom-600">{value}</p>
    </div>
  );
}
