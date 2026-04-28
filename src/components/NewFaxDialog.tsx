"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import {
  HiBookmark,
  HiChevronDown,
} from "react-icons/hi";
import Dialog from "./common/Dialog";
import uploadIcon from "../assets/images/e-fex/upload.png";

import Image from "next/image";
import { CiBookmark } from "react-icons/ci";

const ACCENT = "#5798B8";
const BORDER = "#68646499";

const LABEL_CLASS = "mb-1 block text-[12px] font-medium text-[#9B9B9B]";

const inputBase =
  "w-full rounded-[10px] border bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#5798B8] focus:ring-1 focus:ring-[#5798B8]/20";

const TAG_OPTIONS = ["Reports", "Billing", "Pending Sign"] as const;

type NewFaxDialogProps = {
  open: boolean;
  onClose: () => void;
};

function dashOr(value: string) {
  const t = value.trim();
  return t ? t : "—";
}

export default function NewFaxDialog({ open, onClose }: NewFaxDialogProps) {
  const titleId = useId();
  const descId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [countryCode, setCountryCode] = useState("+1");
  const [faxNumber, setFaxNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [organization, setOrganization] = useState("");
  const [callerId, setCallerId] = useState("Ordina Clinic");
  const [subject, setSubject] = useState("");
  const [coverSheet, setCoverSheet] = useState(true);
  const [coverNote, setCoverNote] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    () => new Set()
  );
  const [files, setFiles] = useState<File[]>([]);
  const [sendTime, setSendTime] = useState("02:30 am");
  const [scheduleAt, setScheduleAt] = useState("10:30 pm");

  const resetForm = useCallback(() => {
    setCountryCode("+1");
    setFaxNumber("");
    setRecipientName("");
    setOrganization("");
    setCallerId("Ordina Clinic");
    setSubject("");
    setCoverSheet(true);
    setCoverNote("");
    setSelectedTags(new Set());
    setFiles([]);
    setSendTime("02:30 am");
    setScheduleAt("10:30 pm");
  }, []);

  const closeAndReset = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const previewTo = useMemo(() => {
    const num = faxNumber.trim();
    if (!num) return "—";
    return `${countryCode} ${num}`.trim();
  }, [countryCode, faxNumber]);

  const previewLabels = useMemo(() => {
    if (selectedTags.size === 0) return "—";
    return [...selectedTags].join(", ");
  }, [selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function addFilesFromList(list: FileList | File[] | null | undefined) {
    if (!list || list.length === 0) return;
    const arr = Array.isArray(list) ? list : Array.from(list);
    setFiles((prev) => [...prev, ...arr]);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    addFilesFromList(e.target.files);
    e.target.value = "";
  }

  function onDropZoneDrop(e: React.DragEvent) {
    e.preventDefault();
    addFilesFromList(e.dataTransfer.files);
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    closeAndReset();
  }

  return (
    <Dialog
      open={open}
      onClose={closeAndReset}
      labelledBy={titleId}
      describedBy={descId}
      panelClassName="max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
    >
      <form
        className="flex flex-col bg-white h-full overflow-hidden"
        onSubmit={handleSend}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2
            id={titleId}
            className="text-xl font-bold tracking-tight text-gray-800"
          >
            New Fax
          </h2>
          <p id={descId} className="mt-1 text-sm text-gray-500">
            Fill recipient details, add a cover sheet, attach files and send or schedule.
          </p>
        </div>
        
        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="flex flex-col lg:flex-row gap-6 p-6">
            
            {/* Form Section */}
            <div className="flex-1 space-y-6">
              {/* Recipient Details Section */}
              <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recipient Details</h3>
                
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <span className={LABEL_CLASS}>To Fax No.</span>
                    <div className="flex flex-row gap-2">
                      <div className="relative w-24 shrink-0">
                        <select
                          id="new-fax-cc"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full h-full cursor-pointer rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#5798B8]/20 focus:border-[#5798B8] appearance-none transition-all"
                        >
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+91">+91</option>
                        </select>
                        <HiChevronDown
                          className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-gray-400"
                          aria-hidden
                        />
                      </div>
                      <input
                        id="new-fax-number"
                        type="tel"
                        value={faxNumber}
                        onChange={(e) => setFaxNumber(e.target.value)}
                        placeholder="20 7946 0000"
                        className="flex-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5798B8]/20 focus:border-[#5798B8] transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-fax-recipient" className={LABEL_CLASS}>
                      Recipient Name
                    </label>
                    <input
                      id="new-fax-recipient"
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Person or Department"
                      className={`${inputBase} rounded-xl border-gray-200 focus:ring-2 focus:ring-[#5798B8]/20 focus:border-[#5798B8]`}
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="new-fax-org" className={LABEL_CLASS}>
                      Organization
                    </label>
                    <input
                      id="new-fax-org"
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Clinic / Agency"
                      className={`${inputBase} rounded-xl border-gray-200 focus:ring-2 focus:ring-[#5798B8]/20 focus:border-[#5798B8]`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-fax-caller" className={LABEL_CLASS}>
                      From (Caller ID)
                    </label>
                    <input
                      id="new-fax-caller"
                      type="text"
                      value={callerId}
                      onChange={(e) => setCallerId(e.target.value)}
                      className={`${inputBase} rounded-xl border-gray-200 focus:ring-2 focus:ring-[#5798B8]/20 focus:border-[#5798B8]`}
                    />
                  </div>
                </div>
              </section>

              {/* Message & Content Section */}
              <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Fax Content</h3>
                
                <div className="space-y-2">
                  <label htmlFor="new-fax-subject" className={LABEL_CLASS}>
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="new-fax-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Consent Form — Ms. Patel"
                    className={`${inputBase} rounded-xl border-gray-200 focus:ring-2 focus:ring-[#5798B8]/20 focus:border-[#5798B8]`}
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={coverSheet}
                        onChange={(e) => setCoverSheet(e.target.checked)}
                        className="size-5 rounded-md border-gray-300 text-[#5798B8] focus:ring-[#5798B8] transition-all cursor-pointer"
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                      Include cover sheet
                    </span>
                  </label>
                  
                  {coverSheet && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                      <textarea
                        id="new-fax-cover"
                        value={coverNote}
                        onChange={(e) => setCoverNote(e.target.value)}
                        rows={3}
                        placeholder="Short message or instructions (optional)"
                        className={`${inputBase} rounded-xl border-gray-200 focus:ring-2 focus:ring-[#5798B8]/20 focus:border-[#5798B8] resize-none`}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <span className={LABEL_CLASS}>Labels</span>
                  <div className="flex flex-wrap gap-2">
                    {TAG_OPTIONS.map((tag) => {
                      const isSelected = selectedTags.has(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            isSelected 
                              ? "bg-[#95DDFF4F] text-[#5599B8] shadow-sm" 
                              : "bg-[#FAFBFC] text-gray-400 border border-gray-100 hover:bg-[#95DDFF4F] hover:text-[#5599B8]"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Attachments & Scheduling Section */}
              <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Attachments & Schedule</h3>
                
                <div className="relative group">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,image/*"
                    multiple
                    className="sr-only"
                    onChange={onFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDropZoneDrop}
                    className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-[#FAFBFC] px-6 py-10 transition-all hover:border-[#B8D4E8] hover:bg-[#F3F8FB] group"
                  >
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4 transition-transform group-hover:scale-110">
                      <Image src={uploadIcon} alt="Upload" width={32} height={32} />
                    </div>
                    <p className="text-sm font-medium text-[#579EBA]">
                      Drag and drop <span className="text-[#000000] font-medium">PDF and images</span>
                    </p>
                    <p className="text-xs text-[#579EBA] mt-1">or click to <span className="font-medium text-[#579EBA]">Browse file</span></p>
                  </button>
                  
                  {files.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {files.map((file, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-600">
                          <div className="truncate flex-1">{file.name}</div>
                          <button 
                            type="button" 
                            onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                            className="text-red-400 hover:text-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="new-fax-send-time" className={LABEL_CLASS}>
                      Send Time
                    </label>
                    <input
                      id="new-fax-send-time"
                      type="text"
                      value={sendTime}
                      onChange={(e) => setSendTime(e.target.value)}
                      className={`${inputBase} rounded-xl border-gray-200 focus:ring-2 focus:ring-[#5798B8]/20 focus:border-[#5798B8]`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-fax-schedule" className={LABEL_CLASS}>
                      Schedule at
                    </label>
                    <input
                      id="new-fax-schedule"
                      type="text"
                      value={scheduleAt}
                      onChange={(e) => setScheduleAt(e.target.value)}
                      className={`${inputBase} rounded-xl border-gray-200 focus:ring-2 focus:ring-[#5798B8]/20 focus:border-[#5798B8]`}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Preview Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-0 space-y-6">
                <div className="bg-[#F8FAFC] rounded-2xl p-6 text-gray-800 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-black">
                    Preview
                  </h3>
                  
                  <dl className="text-sm mt-4">
                    <div className="flex justify-between items-center py-4 border-t border-gray-200">
                      <dt className="text-gray-600">To</dt>
                      <dd className="font-medium text-black">{previewTo}</dd>
                    </div>
                    <div className="flex justify-between items-center py-4 border-t border-gray-200">
                      <dt className="text-gray-600">Recipient</dt>
                      <dd className="font-medium text-black">{dashOr(recipientName)}</dd>
                    </div>
                    <div className="flex justify-between items-center py-4 border-t border-gray-200">
                      <dt className="text-gray-600">Subject</dt>
                      <dd className="font-medium text-black truncate max-w-[120px]">{dashOr(subject)}</dd>
                    </div>
                    <div className="flex justify-between items-center py-4 border-t border-gray-200">
                      <dt className="text-gray-600">Labels</dt>
                      <dd className="font-medium text-black">{previewLabels}</dd>
                    </div>
                    <div className="flex justify-between items-center py-4 border-t border-gray-200">
                      <dt className="text-gray-600">Files</dt>
                      <dd className="font-medium text-blue-400">{files.length}</dd>
                    </div>
                    <div className="flex justify-between items-center py-4 border-t border-gray-200">
                      <dt className="text-gray-600">Send</dt>
                      <dd className="font-medium text-blue-400">Now</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 flex-col gap-4 border-t border-gray-100 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#929292] transition-all hover:bg-gray-50 active:scale-95"
          >
            <CiBookmark className="size-5 text-[#686464]" aria-hidden />
            Save as Draft
          </button>
          
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeAndReset}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-[#929292] hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl px-8 py-2.5 bg-gradient-to-b from-[#579EBA] to-[#4F81B2] text-sm font-bold text-white shadow-sm transition-all hover:opacity-95 active:scale-95 flex items-center gap-2"
            >
              Send Fax
            </button>
          </div>
        </footer>
      </form>
    </Dialog>
  );
}
