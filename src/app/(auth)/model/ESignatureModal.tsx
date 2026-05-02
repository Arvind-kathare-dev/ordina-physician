"use client";

import Button from "@/components/ui/button/Button";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "type" | "draw" | "image";
type Step = 1 | 2;

interface SignatureData {
  type: Tab;
  value: string; // typed text | base64 canvas | uploaded file base64
  name?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** Called with the final signature + initial values when user clicks Save */
  onSave: (signature: SignatureData, initial: string) => void;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const KeyboardIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
  </svg>
);

const PenIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const ImageIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const SignIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 17c3-3 4-7 8-7s5 4 8 1" />
    <path d="M7 12c1-3 3-5 5-5" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 4v6h-6" />
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
  </svg>
);

const XIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ─── Sign Bookmark Badge ─────────────────────────────────────────────────────

const SignBadge = ({ size = "lg" }: { size?: "lg" | "sm" }) => {
  const width = size === "lg" ? 48 : 38;
  const height = size === "lg" ? 140 : 110;

  const centerX = width / 2;

  const logoSize = size === "lg" ? 20 : 16;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Ribbon Shape */}
      <path
        d={`
          M0 0 
          H${width} 
          V${height - 28} 
          L${centerX} ${height} 
          L0 ${height - 28} 
          Z
        `}
        fill="#5B97AE"
      />

      {/* Logo (Centered) */}
      <foreignObject
        x={centerX - logoSize / 2}
        y={size === "lg" ? 28 : 22}
        width={logoSize}
        height={logoSize}
      >
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/images/logo/eSign-logo.svg"
            alt="logo"
            width={logoSize}
            height={logoSize}
            className="object-contain"
          />
        </div>
      </foreignObject>

      {/* Vertical Text */}
      <text
        x={centerX}
        y={size === "lg" ? height - 35 : height - 28}
        fill="white"
        fontSize={size === "lg" ? 13 : 10}
        fontFamily="Georgia, serif"
        fontStyle="italic"
        letterSpacing="1.2"
        textAnchor="middle"
        transform={`rotate(-90, ${centerX}, ${size === "lg" ? height - 35 : height - 28
          })`}
      >
        Sign
      </text>
    </svg>
  );
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────

interface SidebarProps {
  step: Step;
}

const Sidebar = ({ step }: SidebarProps) => {
  const steps: { id: Step; label: string }[] = [
    { id: 1, label: "Add Signature" },
    { id: 2, label: "Add Initial" },
  ];

  return (
    <div className="w-full md:w-52 shrink-0 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 p-4 md:p-6 flex flex-row md:flex-col justify-center md:justify-start gap-6 md:gap-5">
      {steps.map(({ id, label }) => {
        const isActive = step === id;
        const isPast = step > id;
        return (
          <div key={id} className="flex items-center gap-2 md:gap-3">
            <span
              className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-semibold shrink-0 transition-colors duration-200
                ${isActive ? "bg-[#4A90B8] text-white" : isPast ? "bg-[#4A90B8] text-white" : "bg-slate-200 text-slate-500"}`}
            >
              {id}
            </span>
            <span
              className={`text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap
                ${isActive ? "text-[#4A90B8]" : "text-slate-400"}`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Tab Bar ─────────────────────────────────────────────────────────────────

interface TabBarProps {
  active: Tab;
  onChange: (t: Tab) => void;
}

const TABS: { id: Tab; label: string; Icon: React.FC }[] = [
  { id: "type", label: "Type", Icon: KeyboardIcon },
  { id: "draw", label: "Draw", Icon: PenIcon },
  { id: "image", label: "Image", Icon: ImageIcon },
];

const TabBar = ({ active, onChange }: TabBarProps) => (
  <div className="flex justify-center gap-8 md:gap-8 border-b border-slate-100 pb-0 pt-4 md:pt-8 rounded-tl-2xl rounded-tr-2xl mb-4 md:mb-6 bg-gray-250">
    {TABS.map(({ id, label, Icon }) => {
      const isActive = active === id;
      return (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex flex-col items-center gap-1 md:gap-1.5 pb-2 md:pb-3 border-b-2 transition-all duration-200 -mb-px shrink-0
            ${isActive ? "border-ordina-400 text-ordina-400" : "border-transparent text-gray-400 hover:text-ordina-400"}`}
        >
          <div className="scale-90 md:scale-100">
            <Icon />
          </div>
          <span className="text-xs md:text-sm font-medium">{label}</span>
        </button>
      );
    })}
  </div>
);

// ─── Type Tab ────────────────────────────────────────────────────────────────

interface TypeTabProps {
  value: string;
  onChange: (v: string) => void;
  saveSignature: boolean;
  onSaveSignatureChange: (v: boolean) => void;
}

const FONT_STYLES = [
  { label: "Italic Serif", className: "font-['Georgia'] italic text-3xl" },
  { label: "Script", className: "font-['Brush_Script_MT','cursive'] text-3xl" },
  { label: "Bold", className: "font-bold text-2xl tracking-tight" },
  {
    label: "Classic Italic",
    className: "font-['Georgia'] italic text-3xl tracking-wide",
  },
  {
    label: "Elegant Serif",
    className: "font-['Times_New_Roman'] italic text-3xl tracking-wide",
  },
  {
    label: "Signature Script",
    className: "font-['Brush_Script_MT','cursive'] text-4xl",
  },
  {
    label: "Handwritten",
    className: "font-['Segoe_Script','cursive'] text-3xl",
  },
  {
    label: "Casual Script",
    className: "font-[cursive] text-3xl",
  },
  {
    label: "Strong Signature",
    className: "font-semibold italic text-2xl tracking-tight",
  },


];

const TypeTab = ({
  value,
  onChange,
  saveSignature,
  onSaveSignatureChange,
}: TypeTabProps) => {
  const [fontIdx, setFontIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Signature area */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="flex items-stretch min-h-[100px] md:min-h-[130px] pt-4 md:pt-6 px-3 md:px-4">
          {/* Badge */}
          <div className="flex-1 flex border-b border-ordina-300">
            <div className="flex items-center justify-center px-1 md:px-2 bg-white scale-75 md:scale-100 origin-center">
              <SignBadge size="lg" />
            </div>
            <div className="w-full justify-end flex items-end">
              <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type signature"
                className={`w-full bg-transparent p-1 md:p-2 outline-none text-slate-800 placeholder:text-slate-300 
                ${FONT_STYLES[fontIdx].className.replace("text-3xl", "text-xl md:text-3xl").replace("text-4xl", "text-2xl md:text-4xl").replace("text-2xl", "text-lg md:text-2xl")}`}
                style={{
                  fontFamily:
                    fontIdx === 0
                      ? "Georgia, serif"
                      : fontIdx === 1
                        ? "'Brush Script MT', cursive"
                        : "inherit",
                }}
              />
            </div>
          </div>
        </div>

        {/* Change Style row */}

        <div className="relative flex justify-end px-4 py-2 bg-slate-50">
          {/* Trigger */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-sm text-[#4A90B8] font-medium flex items-center gap-1 hover:underline"
          >
            Change Style
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute bottom-12 right-4 w-[260px] h-[112px] overflow-y-scroll bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {FONT_STYLES.map((font, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFontIdx(index);
                    setIsOpen(false);
                  }}
                  className={`
            w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition
            ${index === fontIdx ? "bg-slate-100 font-semibold" : ""}
          `}
                  style={{
                    fontFamily:
                      index === 0
                        ? "Georgia, serif"
                        : index === 1
                          ? "'Brush Script MT', cursive"
                          : "inherit",
                  }}
                >
                  {font.label || `Style ${index + 1}`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Save checkbox */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none w-fit">
        <input
          type="checkbox"
          checked={saveSignature}
          onChange={(e) => onSaveSignatureChange(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 accent-[#528DB5] cursor-pointer"
        />
        <span className="text-sm text-slate-600">Save Signature</span>
      </label>
    </div>
  );
};

// ─── Draw Tab ────────────────────────────────────────────────────────────────

interface DrawTabProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onClear: () => void;
  name: string;
  onNameChange: (v: string) => void;
}

const DrawTab = ({ canvasRef, onClear, name, onNameChange }: DrawTabProps) => {
  const isDrawing = useRef(false);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: e.nativeEvent.offsetX * scaleX,
      y: e.nativeEvent.offsetY * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    isDrawing.current = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1a1a1a";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    isDrawing.current = false;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Canvas area */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="flex items-stretch min-h-[120px] md:min-h-[160px]">
          {/* Badge */}
          <div className="flex items-center justify-center px-1 md:px-2 bg-white scale-75 md:scale-100 origin-center">
            <SignBadge size="lg" />
          </div>

          {/* Canvas */}
          <div className="flex-1 relative bg-white">
            <canvas
              ref={canvasRef}
              width={700}
              height={160}
              className="w-full h-full touch-none"
              style={{ display: "block" }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
            {/* Bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-ordina-300" />
          </div>
        </div>

        {/* Clear button */}
        <div className="flex justify-end px-4 py-2 bg-white border-t border-slate-100">
          <button
            onClick={onClear}
            className="text-sm text-[#4A90B8] font-medium hover:underline"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Name input */}
      <input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Enter your name"
        className="w-full max-w-xs border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#4A90B8]/30 focus:border-[#4A90B8]"
      />
    </div>
  );
};

// ─── Image Tab ───────────────────────────────────────────────────────────────

interface ImageTabProps {
  preview: string | null;
  onFile: (file: File) => void;
  onClear: () => void;
  searchText: string;
  onSearchTextChange: (v: string) => void;
}

const ImageTab = ({
  preview,
  onFile,
  onClear,
  searchText,
  onSearchTextChange,
}: ImageTabProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Preview / drop zone */}
      <div
        className="border border-slate-200 rounded-xl overflow-hidden bg-white min-h-[200px] flex items-center justify-center relative cursor-pointer"
        onClick={() => !preview && fileInputRef.current?.click()}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Uploaded signature"
              className="max-h-[200px] object-contain p-4"
            />
            {/* Clear */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="absolute bottom-3 right-4 text-sm text-[#4A90B8] font-medium hover:underline"
            >
              Clear
            </button>
          </>
        ) : (
          <div className="text-center text-slate-400 p-8">
            <ImageIcon />
            <p className="mt-2 text-sm">Click to upload signature image</p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />

      {/* Bottom row: search tag + refresh */}
      <div className="flex items-center gap-3">
        {/* Tag pill */}
        <div className="flex items-center gap-1.5 border border-[#4A90B8] rounded-lg px-3 py-2 bg-[#4A90B8]/5">
          <span className="text-sm text-[#4A90B8] font-medium">
            {searchText || "Signature"}
          </span>
          <button
            onClick={onClear}
            className="text-[#4A90B8] hover:text-red-400 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        {/* Refresh / search icon */}
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <RefreshIcon />
        </button>
      </div>
    </div>
  );
};

// ─── Step 2 — Add Initial ────────────────────────────────────────────────────

interface AddInitialProps {
  value: string;
  onChange: (v: string) => void;
}

const AddInitial = ({ value, onChange }: AddInitialProps) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-base font-semibold text-slate-700">Add Initial</h2>
    <div className="border border-slate-200 rounded-xl bg-white">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write initial here"
        rows={4}
        className="w-full bg-transparent outline-none resize-none px-4 py-3 text-slate-700 placeholder:text-slate-300 text-lg rounded-xl"
      />
    </div>
  </div>
);

// ─── Main Modal ──────────────────────────────────────────────────────────────

export default function ESignatureModal({ isOpen, onClose, onSave }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [tab, setTab] = useState<Tab>("type");

  // Type state
  const [typedSig, setTypedSig] = useState("");
  const [saveSignature, setSaveSignature] = useState(false);

  // Draw state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawName, setDrawName] = useState("");

  // Image state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSearchText, setImageSearchText] = useState("Signature");

  // Step 2 — Initial
  const [initial, setInitial] = useState("");

  // Persistent signature data captured before moving to Step 2
  const [capturedSig, setCapturedSig] = useState<SignatureData | null>(null);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setTab("type");
      setTypedSig("");
      setSaveSignature(false);
      setDrawName("");
      setImagePreview(null);
      setInitial("");
      setCapturedSig(null);
      const ctx = canvasRef.current?.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }
  }, [isOpen]);

  const clearCanvas = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const getSignatureData = (): SignatureData => {
    if (tab === "draw") {
      return {
        type: "draw",
        value: canvasRef.current?.toDataURL() ?? "",
        name: drawName
      };
    }
    if (tab === "image") {
      return { type: "image", value: imagePreview ?? "" };
    }
    return { type: "type", value: typedSig };
  };

  const handleApplyNext = () => {
    if (step === 1) {
      setCapturedSig(getSignatureData());
      setStep(2);
    } else {
      onSave(capturedSig || getSignatureData(), initial);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 bg-black/60 flex items-end md:items-center justify-center z-50 p-0 md:p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Dialog */}
      <div
        className="bg-white w-full max-w-3xl rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[95vh] md:max-h-[90vh] animate-in"
        role="dialog"
        aria-modal="true"
        aria-label="E-Signature"
      >
        {/* Sidebar */}
        <Sidebar step={step} />

        {/* Content */}
        <div className="flex-1 flex flex-col p-4 md:p-6 min-h-0 overflow-y-auto">
          {step === 1 && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Tab bar */}
              <TabBar active={tab} onChange={setTab} />

              {/* Tab content */}
              <div className="flex-1 min-h-0">
                {tab === "type" && (
                  <TypeTab
                    value={typedSig}
                    onChange={setTypedSig}
                    saveSignature={saveSignature}
                    onSaveSignatureChange={setSaveSignature}
                  />
                )}
                {tab === "draw" && (
                  <DrawTab
                    canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
                    onClear={clearCanvas}
                    name={drawName}
                    onNameChange={setDrawName}
                  />
                )}
                {tab === "image" && (
                  <ImageTab
                    preview={imagePreview}
                    onFile={handleImageFile}
                    onClear={() => setImagePreview(null)}
                    searchText={imageSearchText}
                    onSearchTextChange={setImageSearchText}
                  />
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1">
              <AddInitial value={initial} onChange={setInitial} />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-4 md:mt-6 pt-4 border-t border-slate-100 bg-white sticky bottom-0">
            <button
              onClick={onClose}
              className="text-sm font-semibold text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg transition-colors"
            >
              Close
            </button>

            <Button variant="primary" onClick={handleApplyNext} className="min-w-[120px]">
              {step === 1 ? "Apply & Next" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
