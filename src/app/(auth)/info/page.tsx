// app/page.tsx
"use client";

import { useState } from "react";
import { StepIndicator } from "../components/steps/StepIndicator";
import { OnboardingForm } from "../components/OnboardingForm";


export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState(1);

  const handleStepChange = (step: number) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndContinue = () => {
    // Here you would typically save the current step data to state/context/backend
    handleNext();
  };

  // ✅ hide only on preview (step 4 + subStep 3)
  const isPreviewPage = currentStep === 4 && subStep === 3;

  return (
    <main className="min-h-screen sm:p-8 lg:p-12 bg-white ">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white  overflow-hidden">
          {/* Step Indicator */}
          {!isPreviewPage && (
            <StepIndicator
              currentStep={currentStep}
              onStepClick={handleStepChange}
            />
          )}

          {/* Form Content */}
          <OnboardingForm
            currentStep={currentStep}
            subStep={subStep}
            setSubStep={setSubStep}
            onSaveAndContinue={handleSaveAndContinue}
            onPrevious={handlePrevious}
          />
        </div>
      </div>
    </main>
  );
}
