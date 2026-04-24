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
       <Input
          label="PECOS"
          name="PECOS"
          type="text"
          required
          placeholder="PECOS"
        />
      <ActionButtons />
    </SectionWrapper>
    </SectionWrapperBox>
   
  );
}