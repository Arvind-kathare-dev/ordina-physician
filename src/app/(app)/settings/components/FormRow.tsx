interface Props {
  children: React.ReactNode;
  col?: "1" | "2" | "3" | "4";
}

export default function FormRow({ children, col = "4" }: Props) {
  const gridClasses = {
    "1": "grid-cols-1",
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-3",
    "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridClasses[col]} gap-4 p-1 mb-4`}>
      {children}
    </div>
  );
}