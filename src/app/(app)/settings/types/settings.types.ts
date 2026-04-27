export type Rule = {
  serviceType: string;
  orderType: string;
  threshold: string;
  unit: string;
};

export interface UserProfile {
  fullName: string;
  role: string;
  email: string;
  phone?: string;
  licenseNumber?: string;
  signatureId?: string;
}

export interface PracticeDetails {
  organizationName: string;
  timezone: string;
  city: string;
  state: string;
}

export interface SettingsUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Sub Admin' | 'User' | 'Read Only';
  status: 'Active' | 'Invited' | 'Disabled';
  avatar?: string;
}

export interface VendorRule {
  id: string;
  serviceType: string;
  location: string;
  supplier: string;
}

export interface OrderDeliveryPreference {
  channels: string[];
  notifyOnFailure: string;
}