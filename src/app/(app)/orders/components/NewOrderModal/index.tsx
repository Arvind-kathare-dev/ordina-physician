"use client";

import { useState } from "react";
import { OrderState } from "../../orders.types";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import StepIndicator from "./StepIndicator";

interface Props {
  onClose: () => void;
}

const initialState: OrderState = {
  step: 1,
  method: null,
  uploadedFile: null,

  serviceType: "",
  orderType: [],
  subCategory: "",
  agency: "",
  patient: "",

  symptomAddressed: "",
  goalOfTreatment: "",
  medication: "",
  dose: "",
  nonPharma: "",

  notes: "",
  template: "",

  signature: null,
};

export default function NewOrderModal({ onClose }: Props) {
  const [state, setState] = useState<OrderState>(initialState);

  const update = (data: Partial<OrderState>) =>
    setState((prev) => ({ ...prev, ...data }));

  const next = () => update({ step: state.step + 1 });
  const back = () => update({ step: state.step - 1 });

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-2xl  min-w-2xl w-auto p-6  overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {
          state.step !== 3 ? <StepIndicator currentStep={state.step} /> : ""
        }
        {/* <StepIndicator currentStep={state.step} /> */}

        {state.step === 1 && (
          <Step1  update={update} next={next} />
        )}

        {state.step === 2 && (
          <Step2 state={state} update={update} next={next} back={back} />
        )}

        {state.step === 3 && <Step3 state={state} update={update} />}
        {state.step === 4 && <Step4 state={state} update={update} />}
        {state.step === 5 && (
          <Step5 state={state} update={update} onClose={onClose} />
        )}
      </div>
    </div>
  );
}