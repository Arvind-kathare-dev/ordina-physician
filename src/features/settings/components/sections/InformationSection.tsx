import { ChevronUp, FileText, User } from "lucide-react";
import ActionButtons from "../ActionButtons";
import SectionWrapper from "../SectionWrapper";
import { Input } from "@/components/ui/input/Input";
import { useState } from "react";
import CustomSelect from "@/components/ui/select/CustomSelect";
import { SectionWrapperBox } from "../SectionWrapperBox";

export const InformationSection = () => {
  const [role, setRole] = useState<string>("");

  return (
    <SectionWrapperBox title="Information" group="Profile">
          {/* Information */}

      <SectionWrapper
        title="Information"
        description="Your account info used in ordina"
        icon={User}
      >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label=" Full Name"
                name="fullName"
                type="text"
                required
                placeholder="Dr. John Doe"
              />

              <CustomSelect
                label="Role"
                required
                placeholder="Select Role"
                value={role}
                onChange={setRole}
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Sub Admin", value: "sub_admin" },
                  { label: "User", value: "user" },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Email"
                name="email"
                type="email"
                required
                placeholder="doctor@proactive.com"
              />

              <Input
                label=" Phone (Optional)"
                name="phone"
                type="tel"
                placeholder="+1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="State license number"
                name="license"
                type="text"
                placeholder="License#"
              />

              <CustomSelect
                label="Create e-signature & initial"
                required
                placeholder="Select e-signature"
                value={role}
                onChange={setRole}
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Sub Admin", value: "sub_admin" },
                  { label: "User", value: "user" },
                ]}
              />
            </div>

            <p className="text-[13px] text-gray-400">
             This information helps agencies identify the signing provider and route order updates to the right inbox.
            </p>
      </SectionWrapper>
      {/* Practice Details */}
      <SectionWrapper
        title="Practice Details"
        description="Your account info used in ordina"
        icon={FileText}
      >
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              label="Practice / organization name"
              name="practice"
              type="text"
              required
              placeholder="e.g. Medical Group"
            />

            <CustomSelect
              label="Timezone"
              required
              placeholder="Select Timezone"
              value={role}
              onChange={setRole}
              options={[
                { label: "Admin", value: "admin" },
                { label: "Sub Admin", value: "sub_admin" },
                { label: "User", value: "user" },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <Input
              label="City"
              name="city"
              type="text"
              required
              placeholder="Los Angeles"
            />

            <Input label="State" name="state" type="text" placeholder="CA" />
          </div>

          <p className="text-[13px] text-gray-400 ">
           Practice details appear on order documents and help agencies validate the request.
          </p>
        </div>
        <ActionButtons />

      </SectionWrapper>
    </SectionWrapperBox>
  );
};
