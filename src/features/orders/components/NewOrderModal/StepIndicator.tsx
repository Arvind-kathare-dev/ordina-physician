interface Props {
  currentStep: number;
}

const steps = [
  "Select Order",
  "Select Type",
  "Patient Detail",
  "Order Notes",
  "Signature",
];

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={label} className="flex-1 flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2
                  ${
                    isCompleted || isActive
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-400"
                  }`}
              >
                {isCompleted ? "✓" : step}
              </div>

              <span
                className={`text-xs mt-1 ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 ${
                  step < currentStep ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}