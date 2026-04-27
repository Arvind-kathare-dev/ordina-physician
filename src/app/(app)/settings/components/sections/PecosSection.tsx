import { User } from "lucide-react";
import SectionWrapper from "../SectionWrapper";
import ActionButtons from "../ActionButtons";
import { Input } from "@/components/ui/input/Input";
import { SectionWrapperBox } from "../SectionWrapperBox";

export default function PecosSection() {
  return (
    <SectionWrapperBox
      title="PECOS"
      group="Profile"
    >
      <SectionWrapper
        title="PECOS"
        description="Your account info used in ordina"
        icon={User}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="PECOS"
            name="pecos"
            type="text"
            required
            placeholder="PECOS"
          />

        </div>



        <ActionButtons />
      </SectionWrapper>
    </SectionWrapperBox>

  );
}