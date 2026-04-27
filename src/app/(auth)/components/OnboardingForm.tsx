"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { PECOSStep } from "./steps/PECOSStep";
import { InformationStep } from "./steps/InformationStep";
import { OrderDeliveryStep } from "./steps/OrderDeliveryStep";
import { IntegrationStep } from "./steps/IntegrationStep";

import Button from "@/components/ui/button/Button";
import SubscriptionPlan from "./SubscriptionPlan";
import DetailPreviewPage from "./DetailPreviewPage";

interface OnboardingFormProps {
  currentStep: number;
  onSaveAndContinue: () => void;
  onPrevious: () => void;
  subStep: number;
  setSubStep: React.Dispatch<React.SetStateAction<number>>;
}

export function OnboardingForm({
  currentStep,
  onSaveAndContinue,
  onPrevious,
  subStep,
  setSubStep,
}: OnboardingFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    pecos: {
      enrollmentId: "",
    },
    information: {
      fullName: "",
      email: "",
      phone: "",
      role: "",
      licenseNumber: "",
      eSignature: "",
      organizationName: "",
      city: "",
      timeZone: "",
      state: "",
    },
    orderDelivery: {
      preferredMethod: "email",
      email: "",
      faxNumber: "",
      deliveryTime: "asap",
    },
    integration: {
      ehrSystem: "",
      apiKey: "",
      webhookUrl: "",
    },
  });

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step as keyof typeof prev], ...data },
    }));
  };

  /* ========================= */
  /* SAVE & CONTINUE */
  /* ========================= */

  const handleSaveAndContinue = () => {
    // ✅ Step 4 has substeps
    if (currentStep === 4) {
      if (subStep < 3) {
        setSubStep((prev) => prev + 1);
      } else {
        // ✅ Final → Dashboard
        router.push("/dashboard");
      }
      return;
    }

    onSaveAndContinue();
  };

  /* ========================= */
  /* BACK */
  /* ========================= */

  const handleBack = () => {
    if (currentStep === 4 && subStep > 1) {
      setSubStep((prev) => prev - 1);
    } else {
      onPrevious();
    }
  };

  /* ========================= */
  /* RENDER STEP */
  /* ========================= */

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PECOSStep
            data={formData.pecos}
            onChange={(data) => updateFormData("pecos", data)}
          />
        );

      case 2:
        return (
          <InformationStep
            data={formData.information}
            onChange={(data) => updateFormData("information", data)}
          />
        );

      case 3:
        return (
          <OrderDeliveryStep
            data={formData.orderDelivery}
            onChange={(data) => updateFormData("orderDelivery", data)}
          />
        );

      case 4:
        // ✅ Substeps inside Step 4
        switch (subStep) {
          case 1:
            return (
              <IntegrationStep
                data={formData.integration}
                onChange={(data) => updateFormData("integration", data)}
              />
            );

          case 2:
            return <SubscriptionPlan />;

          case 3:
            return <DetailPreviewPage />;

          default:
            return null;
        }

      default:
        return null;
    }
  };

  const isFinalStep = currentStep === 4 && subStep === 3;

  return (
    <div className="px-6 py-8">
      {renderStep()}

      {/* ========================= */}
      {/* FOOTER BUTTONS */}
      {/* ========================= */}

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <Button 
          onClick={handleSaveAndContinue}
          variant="secondary" 
          size="base" 
          className="w-full sm:w-auto px-[20px] py-[10px] rounded-xl order-2 sm:order-1"
        >
          Skip for now
        </Button>

        <div className="flex gap-3 w-full sm:w-auto order-1 sm:order-2">
          {(currentStep !== 1 || subStep > 1) && (
            <Button 
              onClick={handleBack} 
              variant="secondary" 
              size="base" 
              className="flex-1 sm:flex-none px-[20px] py-[10px] rounded-xl"
            >
              Back
            </Button>
          )}

          <Button 
            onClick={handleSaveAndContinue} 
            size="base" 
            variant="primary" 
            className="flex-1 sm:flex-none px-[20px] py-[10px] rounded-xl"
          >
            {isFinalStep ? "Finish Setup" : "Save & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
