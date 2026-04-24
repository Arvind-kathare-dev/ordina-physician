"use client";

interface PermissionCardProps {
  title: string;
  description: string;
  actions: string[];
}

export default function PermissionCard({
  title,
  description,
  actions,
}: PermissionCardProps) {
  return (
    <div className="border w-full border-gray-220 rounded-[15px] px-5 py-4 flex items-center justify-between bg-white">
      
      {/* Left Content */}
      <div>
        <h3 className="text-sm font-medium text-grayCustom-300 mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-300 max-w-[260px]">
          {description}
        </p>
      </div>

      {/* Right Actions */}
      <div className="flex gap-1 flex-wrap justify-end">
        {actions.map((action, index) => (
          <button
            key={index}
            className="px-3 py-1 text-xs font-normal rounded-full border border-ordinaBorder-350 text-ordina-400  hover:opacity-80 transition"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}