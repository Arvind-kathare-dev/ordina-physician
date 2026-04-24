type ReportPlaceholderProps = {
  title: string;
  description?: string;
};

export default function ReportPlaceholder({
  title,
  description = "Content for this report will appear here.",
}: ReportPlaceholderProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] md:rounded-2xl md:p-8">
      <h2 className="text-lg font-semibold text-neutral-900 sm:text-xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#686464]">
        {description}
      </p>
    </div>
  );
}
