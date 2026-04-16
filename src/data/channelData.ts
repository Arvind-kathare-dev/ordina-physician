export interface ChannelConfig {
  title: string;
  label: "Primary" | "Secondary";
  type: "Email" | "eFax";
  optional?: boolean;
  description: string;
  placeholder: string;
  status: "not_connected" | "not_configured" | "connected";
  avatarLetter?: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  dangerActionLabel: string;
}

export const channelData: ChannelConfig[] = [
  {
    title: "Primary Email",
    label: "Primary",
    type: "Email",
    description: "Used first for order delivery",
    placeholder: "Connect a Google account to fill this",
    status: "not_connected",
    avatarLetter: "K",
    primaryActionLabel: "Connect Primary Email",
    secondaryActionLabel: "Change",
    dangerActionLabel: "Disconnect",
  },
  {
    title: "Secondary Email",
    label: "Secondary",
    type: "Email",
    optional: true,
    description: "Fallback if primary email fails",
    placeholder: "Connect a Google account to fill this",
    status: "not_connected",
    primaryActionLabel: "Connect Secondary Email",
    secondaryActionLabel: "Change",
    dangerActionLabel: "Disconnect",
  },
  {
    title: "Primary eFax",
    label: "Primary",
    type: "eFax",
    description: "Primary fax number (optional)",
    placeholder: "Set up to fill a fax number",
    status: "not_configured",
    avatarLetter: "M",
    primaryActionLabel: "Set up primary eFax",
    secondaryActionLabel: "Edit",
    dangerActionLabel: "Remove",
  },
  {
    title: "Secondary eFax",
    label: "Secondary",
    type: "eFax",
    optional: true,
    description: "Backup fax number (optional)",
    placeholder: "Set up to fill a fax number",
    status: "not_configured",
    primaryActionLabel: "Set up secondary eFax",
    secondaryActionLabel: "Edit",
    dangerActionLabel: "Remove",
  },
];