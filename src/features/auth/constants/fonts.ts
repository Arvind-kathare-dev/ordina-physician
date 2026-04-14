// constants/fonts.ts
import { Great_Vibes, Dancing_Script, Pacifico, Allura, Satisfy, Caveat } from "next/font/google";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: "400" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const allura = Allura({ subsets: ["latin"], weight: "400" });
const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });
const caveat = Caveat({ subsets: ["latin"] });



export const FONT_STYLES = [
  {
    label: "Elegant Script",
    value: "great-vibes",
    className: "font-['Great_Vibes','cursive'] text-3xl",
  },
  {
    label: "Handwritten",
    value: "dancing-script",
    className: "font-['Dancing_Script','cursive'] text-3xl",
  },
  {
    label: "Classic Signature",
    value: "pacifico",
    className: "font-['Pacifico','cursive'] text-3xl",
  },
  {
    label: "Stylish Signature",
    value: "satisfy",
    className: "font-['Satisfy','cursive'] text-3xl",
  },
  {
    label: "Professional Italic",
    value: "playfair",
    className: "font-['Playfair_Display'] italic text-2xl",
  },
  {
    label: "Modern Clean",
    value: "poppins",
    className: "font-['Poppins'] text-2xl",
  },
  {
    label: "Bold Identity",
    value: "bold",
    className: "font-bold text-2xl tracking-tight",
  },
];