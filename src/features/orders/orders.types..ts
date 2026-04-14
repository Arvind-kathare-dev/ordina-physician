
export interface Label {
  text: string;
  color: string; // bg color class
}

export interface Order {
  id: number;
  date: string;
  patientName: string;
  orderType: string;
  serviceType: "Hospice" | "Home Health";
  agency: string;
  labels: Label[];
  receivedVia: "Symmetry" | "Email" | "efax";
  orderReceived: string;
  tags: string[]; // e.g. ["Modified", "Outbound"]
}