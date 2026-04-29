import { useState } from "react";
import { Contact } from "lucide-react";
import SectionWrapper from "../SectionWrapper";
import ActionButtons from "../ActionButtons";
import { Input } from "@/components/ui/input/Input";
import { SectionWrapperBox } from "../SectionWrapperBox";

export default function PecosSection() {
  const [pecos, setPecos] = useState("");

  const handleReset = () => {
    setPecos("");
  };

  return (
    <SectionWrapperBox
      title="PECOS"
      group="Profile"
    >
      <SectionWrapper
        title="PECOS"
        description="Your account info used in ordina"
        icon={Contact}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="PECOS"
            name="pecos"
            type="text"
            required
            value={pecos}
            onChange={(e) => setPecos(e.target.value)}
            placeholder="PECOS"
          />
        </div>

        <ActionButtons onReset={handleReset} isSaveDisabled={!pecos} />
      </SectionWrapper>
    </SectionWrapperBox>
  );
}