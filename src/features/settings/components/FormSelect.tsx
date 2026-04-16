interface Props {
  label: string;
  options: string[];
}

export default function FormSelect({ label, options }: Props) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">{label}</label>
      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}