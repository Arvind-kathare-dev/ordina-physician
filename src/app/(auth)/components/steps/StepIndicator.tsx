'use client';

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}


const steps = [
  {
    id: 1,
    name: "PECOS",
    title: "PECOS Enrollment",
    description: "Provide your PECOS enrollment details to continue.",
  },
  {
    id: 2,
    name: "Information",
    title: "Personal Information",
    description: "Enter your professional and contact details.",
  },
  {
    id: 3,
    name: "Order delivery prefer.",
    title: "Order Delivery Preferences",
    description: "Choose how you want to receive orders.",
  },
  {
    id: 4,
    name: "Integration",
    title: "Integration Setup",
    description: "Connect your system for seamless workflow.",
  },
];



export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {

  const currentStepData =
    steps.find((step) => step.id === currentStep) || steps[0];


  const getStatus = (id: number) => {
    if (id < currentStep) return 'completed';
    if (id === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-white px-4 md:px-6 pt-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-black transition-all duration-300">
          {currentStepData.title}
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          {currentStepData.description}
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-5">
        {steps.map((step) => {
          const status = getStatus(step.id);

          return (
            <div
              key={step.id}
              // onClick={() => onStepClick?.(step.id)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl border text-left
                transition-all duration-300 group
                ${status === 'current'
                  ? 'border-ordina-400 shadow-stepper bg-white ring-1 ring-ordina-400/10'
                  : status === 'completed'
                    ? 'border-green-400/30 bg-green-50/50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-[11px] text-lg md:text-xl font-semibold shrink-0
                  transition-all duration-300
                  ${status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : status === 'current'
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                  }
                `}
              >
                {status === 'completed' ? <Check className="w-5 h-5 md:w-6 md:h-6" /> : step.id}
              </div>

              {/* Text */}
              <div className="flex flex-col leading-tight overflow-hidden">
                <span className={`text-sm font-medium truncate transition-colors duration-300 ${status === 'current' ? 'text-black' : 'text-gray-500'
                  }`}>
                  {step.name}
                </span>
                <span
                  className={`
                    text-[11px] md:text-xs font-medium uppercase tracking-wider
                    ${status === 'completed'
                      ? 'text-green-600'
                      : status === 'current'
                        ? 'text-primary'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {status === 'completed'
                    ? 'Completed'
                    : status === 'current'
                      ? 'Active'
                      : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar Container */}
      <div className="mt-8 relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        {/* Animated Background Progress */}
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-700 ease-in-out"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
        {/* Shine effect */}
        <div
          className="absolute inset-y-0 left-0 w-full h-full opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-shine"
          style={{ transition: 'none' }}
        />
      </div>
    </div>
  );
}
