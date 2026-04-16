import Button from "@/components/ui/button/Button";

export default function ActionButtons() {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <Button variant="secondary" size="base">
        Reset
      </Button>
      <Button variant="primary" size="base">
        Save
      </Button>
    </div>
  );
}