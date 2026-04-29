import { ChevronUp, FileText, User } from "lucide-react";
import ActionButtons from "../ActionButtons";
import SectionWrapper from "../SectionWrapper";
import { Input } from "@/components/ui/input/Input";
import { useState } from "react";
import CustomSelect from "@/components/ui/select/CustomSelect";
import { SectionWrapperBox } from "../SectionWrapperBox";
import { LOCATIONS } from "../../constant/vendorOptions";

export const InformationSection = () => {
  const initialData = {
    fullName: "",
    role: "",
    email: "",
    phone: "",
    license: "",
    sigMethod: "",
    practice: "",
    timezone: "",
    city: "",
    state: "",
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      
      // Auto-fill city/state if timezone changes
      if (field === "timezone") {
        const found = LOCATIONS.find((l) => l.value === value);
        if (found) {
          newData.city = found.city || prev.city;
          newData.state = found.state || prev.state;
        }
      }
      
      return newData;
    });
  };

  const handleReset = () => {
    setFormData(initialData);
  };

  const isFormValid = () => {
    return (
      !!formData.fullName &&
      !!formData.role &&
      !!formData.email &&
      !!formData.sigMethod &&
      !!formData.practice &&
      !!formData.timezone &&
      !!formData.city
    );
  };

  return (
    <SectionWrapperBox title="Information" group="Profile">
      {/* Information */}
      <SectionWrapper
        title="Information"
        description="Your account info used in ordina"
        icon={User}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 p-1 gap-4 mb-4">
          <Input
            label=" Full Name"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Dr. John Doe"
          />

          <CustomSelect
            label="Role"
            required
            placeholder="Select Role"
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            options={[
              { label: "Physician", value: "physician" },
              { label: "Therapist", value: "therapist" },
              { label: "Nurse", value: "nurse" },
              { label: "Administrator", value: "administrator" },
              { label: "Staff", value: "staff" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="doctor@proactive.com"
          />

          <Input
            label=" Phone (Optional)"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="State license number"
            name="license"
            type="text"
            value={formData.license}
            onChange={(e) => handleChange("license", e.target.value)}
            placeholder="License#"
          />

          <CustomSelect
            label="Create e-signature & initial"
            required
            placeholder="Select e-signature"
            value={formData.sigMethod}
            onChange={(val) => handleChange("sigMethod", val)}
            options={[
              { label: "Signature", value: "signature" },
              { label: "Initial", value: "initial" },
              { label: "Both signature and initial", value: "both" },
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Practice / organization name"
              name="practice"
              type="text"
              required
              value={formData.practice}
              onChange={(e) => handleChange("practice", e.target.value)}
              placeholder="e.g. Medical Group"
            />

            <CustomSelect
              label="Timezone"
              required
              placeholder="Select Timezone"
              value={formData.timezone}
              onChange={(val) => handleChange("timezone", val)}
              options={LOCATIONS}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <Input
              label="City"
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Los Angeles"
            />

            <Input
              label="State"
              name="state"
              type="text"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="CA"
            />
          </div>

          <p className="text-[13px] text-gray-400 ">
            Practice details appear on order documents and help agencies validate the request.
          </p>
        </div>
        <ActionButtons onReset={handleReset} isSaveDisabled={!isFormValid()} />
      </SectionWrapper>
    </SectionWrapperBox>
  );
};
