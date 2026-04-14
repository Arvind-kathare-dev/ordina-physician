
export function LabelTag({ label }: any) {
  return (
    <span
      className={`${label.color} text-white text-[10px] font-bold px-2 py-1 rounded`}
    >
      {label.text}
    </span>
  );
}