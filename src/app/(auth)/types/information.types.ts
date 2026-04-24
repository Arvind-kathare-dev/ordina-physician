export interface InformationStepProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    licenseNumber: string;
    eSignature: string;
    organizationName: string;
    city: string;
    timeZone: string;
    state: string;
  };
  onChange: (data: Partial<InformationStepProps['data']>) => void;
}