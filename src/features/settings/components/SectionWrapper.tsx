import { ChevronUp, LucideIcon } from "lucide-react";

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
    <>
    

      <div className="p-5 rounded-[20px]  border border-gray-220 mx-6">
        <div className="flex items-start justify-between mb-6 ">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Icon size={18} />
            </div>
            <div>
              <h2 className="text-[15px] font-medium text-gray-600">{title}</h2>
              <p className="text-[13px] text-gray-400 max-w-[580px]">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 ">
            <button className="text-[11px] font-normal px-[13px] py-[5px] rounded-xl bg-yellow-250 text-yellow-650">Needs Review</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition">
              <ChevronUp className="w-4 h-4 text-gray-600" />
            </button>

          </div>
        </div>

        {children}
      </div>



    </>
  );
}