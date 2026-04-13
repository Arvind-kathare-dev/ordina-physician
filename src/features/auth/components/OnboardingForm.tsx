// components/OnboardingForm.tsx
"use client";

import { useState, useEffect } from "react";
import { PECOSStep } from "./steps/PECOSStep";
import { InformationStep } from "./steps/InformationStep";
import { OrderDeliveryStep } from "./steps/OrderDeliveryStep";
import { IntegrationStep } from "./steps/IntegrationStep";
import Button from "@/components/ui/button/Button";
import { ArrowRight, Plus } from "lucide-react";

interface OnboardingFormProps {
  currentStep: number;
  onSaveAndContinue: () => void;
  onPrevious: () => void;
}

export function OnboardingForm({
  currentStep,
  onSaveAndContinue,
  onPrevious,
}: OnboardingFormProps) {
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

  const [isValid, setIsValid] = useState(false);

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step as keyof typeof prev], ...data },
    }));
  };

  // Validate current step (simplified - in production you'd have proper validation)
  useEffect(() => {
    const validateStep = () => {
      switch (currentStep) {
        case 1:
          setIsValid(!!formData.pecos.enrollmentId);
          break;
        case 2:
          setIsValid(
            !!formData.information.fullName && !!formData.information.email,
          );
          break;
        case 3:
          setIsValid(!!formData.orderDelivery.preferredMethod);
          break;
        case 4:
          setIsValid(!!formData.integration.ehrSystem);
          break;
        default:
          setIsValid(false);
      }
    };
    validateStep();
  }, [currentStep, formData]);

  const handleSaveAndContinue = () => {
    if (isValid) {
      onSaveAndContinue();
    }
  };

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
        return (
          <IntegrationStep
            data={formData.integration}
            onChange={(data) => updateFormData("integration", data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-6 py-8">
      {renderStep()}

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
        {currentStep !== 1 && (
          <Button
            onClick={onPrevious}
            variant="secondary"
            leftIcon={<span>←</span>}
          >
            Back
          </Button>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" size="md">
            Skip
          </Button>

         
          <Button
            onClick={handleSaveAndContinue}
            disabled={!isValid}
            // loading={isLoading}
            rightIcon={<ArrowRight />}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
