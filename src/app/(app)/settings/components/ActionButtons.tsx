import Button from "@/components/ui/button/Button";

export default function ActionButtons() {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <Button variant="secondary" size="base" className="px-[20px] py-[10px]">
        Reset
      </Button>
      <Button variant="primary" size="base" className="px-[20px] py-[10px]">
        Save
      </Button>
    </div>
  );
}