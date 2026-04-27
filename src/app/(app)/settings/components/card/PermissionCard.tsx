"use client";

interface PermissionCardProps {
  title: string;
  description: string;
  actions: string[];
  selectedActions: string[];
  onToggle: (action: string) => void;
}

export default function PermissionCard({
  title,
  description,
  actions,
  selectedActions,
  onToggle,
}: PermissionCardProps) {
  return (
    <div className="border w-full border-gray-100 rounded-[15px] px-4 sm:px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white transition-all">
      
      {/* Left Content */}
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-[#4a4a4a] mb-1">
          {title}
        </h3>
        <p className="text-[12px] text-[#999] max-w-[280px] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Right Actions */}
      <div className="flex gap-2 flex-wrap justify-start sm:justify-end">
        {actions.map((action) => {
          const isSelected = selectedActions.includes(action);
          return (
            <button
              key={action}
              onClick={() => onToggle(action)}
              className={`px-4 py-1.5 text-[12px] font-medium rounded-full border transition-all shadow-sm ${
                isSelected 
                  ? "bg-[#eaf4ff] text-[#528DB5] border-[#d0e6ff]" 
                  : "bg-white text-[#858585] border-gray-100 hover:bg-gray-50"
              }`}
            >
              {action}
            </button>
          );
        })}
      </div>
    </div>
  );
}