

export type FaxStatus = "Delivered" | "Pending" | "Failed";
export type FaxLabel = "Report" | "Pending Sign" | "Error" | null;

export interface Fax {
  id: number;
  faxNo: string;
  from: string;
  to: string;
  subject: string;
  status: FaxStatus;
  label: FaxLabel;
  time: string;
}

export type Stat = {
  label: string;
  value: string | number;
};

