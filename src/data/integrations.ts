export interface IntegrationConfig {
  id: string;
  name: string;
  description: string;
  status: "connected" | "not_connected";
  logo: string;
}

export const integrations: IntegrationConfig[] = [
  {
    id: "devero",
    name: "DeVero",
    description: "Secure connection with Devero required",
    status: "not_connected",
    logo: "/images/integrations/devero.png",
  },
  {
    id: "nextgen",
    name: "NextGen",
    description: "Secure connection with NextGen required",
    status: "not_connected",
    logo: "/images/integrations/nextgen.png",
  },
  {
    id: "epic",
    name: "Epic",
    description: "Secure connection with Epic required",
    status: "not_connected",
    logo: "/images/integrations/epic.png",
  },
  {
    id: "athena",
    name: "athenahealth",
    description: "Secure connection with athenahealth required",
    status: "not_connected",
    logo: "/images/integrations/athena.png",
  },
  {
    id: "eclinical",
    name: "eClinicalWorks",
    description: "Secure connection with eClinicalWorks required",
    status: "not_connected",
    logo: "/images/integrations/eclinical.png",
  },
];