'use client';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'PECOS' },
  { id: 2, name: 'Information' },
  { id: 3, name: 'Order delivery prefer.' },
  { id: 4, name: 'Integration' },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const getStatus = (id: number) => {
    if (id < currentStep) return 'completed';
    if (id === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-white px-6 pt-6 border-b">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900">
        Personal information
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        US physician onboarding — you can skip and complete later.
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
                ${
                  status === 'current'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-gray-50'
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  w-12 h-12 flex items-center justify-center rounded-2xl text-xs font-semibold
                  ${
                    status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : status === 'current'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {status === 'completed' ? '✓' : step.id}
              </div>

              {/* Text */}
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-gray-900">
                  {step.name}
                </span>
                <span
                  className={`
                    text-xs
                    ${
                      status === 'completed'
                        ? 'text-green-600'
                        : status === 'current'
                        ? 'text-blue-600'
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
      <div className="mt-5 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}