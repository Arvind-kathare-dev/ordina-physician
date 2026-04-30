// types/table.ts

export type ServiceType = "Hospice" | "Home Health";

export interface Label {
  text: string;
  color: string;
}

export interface Order {
  id: string | number;
  date: string;
  patientName: string;
  orderType: string;
  serviceType: ServiceType;
  agency: string;
  labels: Label[];
  receivedVia: "Symmetry" | "Email" | "efax";
  orderReceived: string;
  tags?: string[];
}

// types/table.ts

export interface Column<T> {
  key: string;
  header: string;
  accessor?: keyof T;
  gridWidth?: string;
  render: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  colNum?: Number;
}

