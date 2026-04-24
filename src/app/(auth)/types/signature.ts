export type Tab = "type" | "draw" | "image";
export type Step = 1 | 2;

export interface SignatureData {
  type: Tab;
  value: string;
}