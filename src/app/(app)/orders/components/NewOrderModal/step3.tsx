import { AddOrderDetailsModal } from "../../model/AddOrderDetailModal";

export default function Step3({ update }: any) {
  return (
    <AddOrderDetailsModal
      onBack={() => update({ step: 2 })}
    />
  );
}