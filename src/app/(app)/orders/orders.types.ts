

export interface Order {
  id: string | number;
  date?: string;
  day?: string; 
  patientName: string;
  orderType: string;
  serviceType: string;
  agency: string;
  receivedVia: string;
  orderReceived: string;
  tags?: string[];
  labels?: { text: string; color: string }[];
}

export interface OrderState {
  step: number;
  method: "upload" | "create" | null;
  uploadedFile: File | null;

  serviceType: string;
  orderType: string[];
  subCategory: string;
  agency: string;
  patient: string;

  symptomAddressed: string;
  goalOfTreatment: string;
  medication: string;
  dose: string;
  nonPharma: string;

  notes: string;
  template: string;

  signature: string | null;
}