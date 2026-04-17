interface Props {
  children: React.ReactNode;
  col?: string,
}

export default function FormRow({ children,col="4" }: Props) {
  return (
    <div className={`grid grid-cols-${col} gap-4 mb-4`}>
      {children}
    </div>
  );
}