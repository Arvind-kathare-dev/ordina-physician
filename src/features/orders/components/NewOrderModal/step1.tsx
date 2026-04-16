"use client";

import { useState } from "react";
import { FileText, PenLine, UploadCloud, X } from "lucide-react";

interface Props {
    state?: any;
  update: (data: any) => void;
  next?: () => void;
  back?: () => void;
}

type UploadState = "idle" | "preview" | "success";

export default function Step1({ update,state,next }: Props) {
  const [showUploadUI, setShowUploadUI] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [file, setFile] = useState<File | null>(null);

  // file select
  const handleFile = (f: File) => {
    setFile(f);
    setUploadState("preview");
  };

  const handleUpload = () => {
    setUploadState("success");

    setTimeout(() => {
      update({ method: "upload", step: 2 });
    }, 1200);
  };

  return (
    <div className="px-2 py-4 w-[800px]">

      {/* ───────── NORMAL STEP1 UI ───────── */}
      {!showUploadUI && (
        <>
          <h2 className="text-lg font-semibold mb-6">New Order</h2>

          <div className="grid grid-cols-2 gap-6 mb-8">

            {/* Upload PDF */}
            <button
              onClick={() => setShowUploadUI(true)}
              className="border rounded-2xl h-[180px] flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-blue-50 transition"
            >
              <FileText className="text-blue-500" size={28} />
              <span className="text-sm font-medium">Upload PDF</span>
            </button>

            {/* Create */}
            <button
              onClick={() => update({ method: "create", step: 2 })}
              className="border rounded-2xl h-[180px] flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-blue-50 transition"
            >
              <PenLine className="text-blue-500" size={28} />
              <span className="text-sm font-medium">
                Create New Order
              </span>
            </button>
          </div>
        </>
      )}

      {/* ───────── UPLOAD UI ───────── */}
      {showUploadUI && uploadState === "idle" && (
        <div className="border-2 border-dashed border-blue-200 rounded-xl p-10 flex flex-col items-center gap-4 bg-blue-50/30">

          <label className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer flex items-center gap-2">
            <UploadCloud size={16} />
            Choose File
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>

          <p className="text-xs text-gray-400">
            Supported Formats: PDF only; Max file size 1GB
          </p>

          {/* Back */}
          <button
            onClick={() => setShowUploadUI(false)}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Back
          </button>
        </div>
      )}

      {/* ───────── PREVIEW ───────── */}
      {showUploadUI && uploadState === "preview" && file && (
        <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 bg-blue-50/30">

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              onClick={() => {
                setFile(null);
                setUploadState("idle");
              }}
              className="text-red-500"
            >
              <X />
            </button>
          </div>

          <button
            onClick={handleUpload}
            className="border border-blue-400 text-blue-600 px-6 py-2 rounded-lg mx-auto block"
          >
            Upload PDF
          </button>
        </div>
      )}

      {/* ───────── SUCCESS ───────── */}
      {uploadState === "success" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-10 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-xl mb-4 mx-auto">
              ✓
            </div>
            <p className="font-semibold">PDF Upload Success!</p>
          </div>
        </div>
      )}
    </div>
  );
}