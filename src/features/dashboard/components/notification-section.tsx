import { AlertTriangle, Clock, Package, UserCheck } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: <AlertTriangle size={14} className="text-red-500" />,
    bg: "bg-red-200",
    text: "Order #1224 delayed",
    time: "12:14 pm",
    badge: "New",
  },
  {
    id: 2,
    icon: <Clock size={14} className="text-purple-500" />,
    bg: "bg-purple-200",
    text: "Dr. John Doe's License expires",
    time: "11:11 am",
  },
  {
    id: 3,
    icon: <Package size={14} className="text-yellow-500" />,
    bg: "bg-yellow-200",
    text: "Low stock alert: Antacid drug",
    time: "10:11 am",
  },
  {
    id: 4,
    icon: <UserCheck size={14} className="text-green-500" />,
    bg: "bg-green-200",
    text: "5 New Registrations this week",
    time: "09:27 am",
  },
  {
    id: 5,
    icon: <Clock size={14} className="text-purple-500" />,
    bg: "bg-purple-200",
    text: "Dr. John Doe's License expires",
    time: "11:11 am",
  },
  {
    id: 6,
    icon: <Package size={14} className="text-yellow-500" />,
    bg: "bg-yellow-200",
    text: "Low stock alert: Antacid drug",
    time: "10:11 am",
  },
];

export const NotificationPanel = () => {
  return (
    <div className="bg-white p-4 flex flex-col gap-3 rounded-[12px] border border-gray-200">
      <div className="flex gap-2 items-center">
        <span className="font-semibold text-base text-grayCustom-600">
          Notifications
        </span>
        <span className="bg-ordina-100 text-ordina-300 text-[10px] px-2 py-1 rounded-lg">
          1 New
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-center justify-between  px-2 py-2.5 rounded-md bg-accent border border-grayCustom-200 gap-3"
          >
            <div className="flex gap-2 items-center">
              <div className={`${n.bg} p-2 rounded-full `}>{n.icon}</div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-400 font-medium leading-tight">
                  {n.text}
                </p>

                <p className="text-[10px] font-normal text-gray-300">
                  {n.time}
                </p>
              </div>
            </div>

            {n.badge && (
              <span className="bg-ordina-100 text-ordina-300 text-[9px] px-1.5 py-0.5 rounded-lg">
                New
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
