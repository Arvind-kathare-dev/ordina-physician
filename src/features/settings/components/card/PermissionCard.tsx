interface Props {
  title: string;
  actions: string[];
}

export default function PermissionCard({ title, actions }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-3">
      <h4 className="text-sm font-medium mb-2">{title}</h4>

      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <span
            key={a}
            className="text-xs bg-gray-100 px-2 py-1 rounded"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}