'use client';

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

// const steps = [
//   { id: 1, name: 'PECOS' },
//   { id: 2, name: 'Information' },
//   { id: 3, name: 'Order delivery prefer.' },
//   { id: 4, name: 'Integration' },
// ];

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



export function StepIndicator({ currentStep }: StepIndicatorProps) {

  const currentStepData =
  steps.find((step) => step.id === currentStep) || steps[0];


  const getStatus = (id: number) => {
    if (id < currentStep) return 'completed';
    if (id === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-white px-6 pt-6">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-black">
       {currentStepData.title}
      </h2>
      <p className="text-base text-gray-300 mt-1">
       {currentStepData.description}
      </p>

      {/* Steps */}
      <div className="flex gap-3 mt-5">
        {steps.map((step) => {
          const status = getStatus(step.id);

          return (
            <div
              key={step.id}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl border w-full 
                transition-all duration-200
                ${status === 'current'
                  ? 'border-ordina-100 shadow-stepper bg-white'
                  : 'border-200 bg-white'
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  w-12 h-12 flex items-center justify-center rounded-[11px] text-xl font-semibold
                  ${status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : status === 'current'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-black'
                  }
                `}
              >
                {status === 'completed' ? <Check/> : step.id}
              </div>

              {/* Text */}
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-gray-400">
                  {step.name}
                </span>
                <span
                  className={`
                    text-xs
                    ${status === 'completed'
                      ? 'text-green-600'
                      : status === 'current'
                        ? 'text-gray-400'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {status === 'completed'
                    ? 'Completed'
                    : status === 'current'
                      ? 'Current Step'
                      : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-8 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}