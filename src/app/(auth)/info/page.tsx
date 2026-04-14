// app/page.tsx
'use client';

import { OnboardingForm } from '@/features/auth/components/OnboardingForm';
import { StepIndicator } from '@/features/auth/components/steps/StepIndicator';
import { useState } from 'react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

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

  return (
    <main className="min-h-screen sm:p-8 lg:p-12 bg-white ">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white  overflow-hidden">
         

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} />

          {/* Form Content */}
          <OnboardingForm 
            currentStep={currentStep}
            onSaveAndContinue={handleSaveAndContinue}
            onPrevious={handlePrevious}
          />
        </div>
      </div>
    </main>
  );
}