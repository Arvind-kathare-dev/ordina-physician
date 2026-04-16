interface Props {
  children: React.ReactNode;
}

export default function FormRow({ children }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {children}
    </div>
  );
}