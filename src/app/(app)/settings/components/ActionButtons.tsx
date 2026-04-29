import Button from "@/components/ui/button/Button";

interface ActionButtonsProps {
  onSave?: () => void;
  onReset?: () => void;
  isSaveDisabled?: boolean;
}

export default function ActionButtons({ onSave, onReset, isSaveDisabled }: ActionButtonsProps) {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <Button 
        variant="secondary" 
        size="base" 
        className="px-[20px] py-[10px]" 
        onClick={onReset}
      >
        Reset
      </Button>
      <Button 
        variant="primary" 
        size="base" 
        className="px-[20px] py-[10px]" 
        onClick={onSave} 
        disabled={isSaveDisabled}
      >
        Save
      </Button>
    </div>
  );
}