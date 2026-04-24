// types/delivery.ts
export type ChannelType = 'email' | 'efax';
export type ChannelPriority = 'primary' | 'secondary';
export type ChannelStatus = 'connected' | 'not-connected' | 'configured' | 'not-configured';

export interface Channel {
  id: string;
  type: ChannelType;
  priority: ChannelPriority;
  title: string;
  description: string;
  status: ChannelStatus;
  isOptional: boolean;
  value: string;
  actionLabel: string;
  actions: string[];
  badge?: string;
  badgeColor?: 'blue' | 'gray';
  helpText?: string;
  channelTypeLabel?: string;
}

export interface DeliveryBehavior {
  notifyOnFailure: boolean;
  autoFallbackEnabled: boolean;
  retryCount: number;
}