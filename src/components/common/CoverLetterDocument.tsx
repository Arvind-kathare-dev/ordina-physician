"use client";

import { Mail, Phone, MapPin, Printer } from "lucide-react";
import Image from "next/image";

export default function CoverLetterDocument() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen print:bg-white  print:p-0 flex flex-col print:block items-center gap-8 print:gap-0 font-sans">

      {/* Action Header */}
      <div className="w-full max-w-[850px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-0 print:hidden">
        <h2 className="text-[18px] sm:text-[20px] font-bold text-black">Cover Letter + Order (2 Pages)</h2>
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#5F9EBE] hover:bg-[#528DB5] text-white px-5 py-2.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer"
        >
          <Printer size={16} />
          Print / Save PDF
        </button>
      </div>

      {/* PAGE 1: COVER LETTER (Image 3) */}
      <div className="w-full max-w-[850px] bg-white rounded-xl shadow-sm p-4 sm:p-8 shrink-0 border border-gray-100 print:border-none print:shadow-none print:p-0 print:m-0 break-after-page">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex items-center gap-4">

            <div className="text-lg font-semibold bg-white rounded-xl flex items-center border border-primary justify-center  w-[48px] h-[48px]">
              <Image
                src="/images/logo/ordina-logo.svg"
                alt="logo"
                width={25}
                height={25}
              />
            </div>

            <div>
              <h1 className="text-base font-bold text-[#303030] leading-tight">Ordina</h1>
              <p className="text-[11px] text-[#686464] font-normal">Smart Order & Care Management</p>
            </div>
          </div>
          <div className="text-[11px] text-[#686464] font-medium sm:pt-1">
            Reference: #8A21F0C9
          </div>
        </div>

        <hr className="border-[#E0E0E0] mb-8" />

        {/* Salutation & Body */}
        <div className="mb-10">
          <h2 className="text-[13px] font-bold text-[#303030] mb-4">Dear Dr. Cristofer Schleifer,</h2>
          <p className="text-[11px] text-[#686464] leading-relaxed font-medium">
            This cover letter serves to formally confirm that CarePlus Agency has submitted an order to Dr. Cristofer Schleifer for review and signature in connection with the care of the referenced patient. The complete order details are provided on the following page for your consideration. Execution of this order is required to proceed with the requested coordination of care.
          </p>
        </div>

        <hr className="border-[#E0E0E0] mb-4" />

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 mb-12 text-[13px] pb-8 border-b border-[#00000026]">
          <div className="flex justify-between items-center gap-2">
            <span className="text-[#656565] font-normal w-32 shrink-0">Patient:</span>
            <span className="text-[#303030] font-medium flex-1 text-right sm:text-left">Martin Korsgaard</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-[#656565] font-normal w-32 shrink-0">Sub Category:</span>
            <span className="text-[#303030] font-medium flex-1 text-right sm:text-left">PRN (as needed) Medications</span>
          </div>

          <div className="flex justify-between items-center gap-2">
            <span className="text-[#656565] font-normal w-32 shrink-0">Order Type:</span>
            <span className="text-[#303030] font-medium flex-1 text-right sm:text-left">Medication Orders</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-[#656565] font-normal w-32 shrink-0">Service:</span>
            <span className="text-[#303030] font-medium flex-1 text-right sm:text-left">Home Health</span>
          </div>

          <div className="flex justify-between items-center gap-2">
            <span className="text-[#656565] font-normal w-32 shrink-0">Date:</span>
            <span className="text-[#303030] font-medium flex-1 text-right sm:text-left">11/23/2025</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-[#656565] font-normal w-32 shrink-0">Order Received from:</span>
            <span className="text-[#303030] font-medium flex-1 text-right sm:text-left">Symmetry</span>
          </div>
        </div>

        {/* Sign Off */}
        <div className="mb-16">
          <p className="text-[13px] text-[#686464] font-medium mb-1">Thank you,</p>
          <p className="text-[13px] text-[#686464] font-medium mb-8">CarePlus Agency</p>

          <p className="text-[11px] text-[#686464] font-semibold">
            This is an auto-generated cover letter. For audit trail and tracking, use Ordina messaging within the order thread.
          </p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center justify-center pb-8 mt-16 text-center">
          <Image
            src="/images/qr-code.png"
            alt="QR Code"
            width={120}
            height={120}
          />
          <p className="text-[13px] text-gray-600 font-medium mt-5 px-4 break-words">
            To sign the order, please follow this link: <a href="https://ordina-sign-orders/" className="text-[#528DB5] underline hover:text-blue-700 block sm:inline mt-1 sm:mt-0">https://ordina-sign-orders/</a>
          </p>
        </div>

        <div className="w-full mt-12 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[#DBDBDBBF] pt-6 text-center sm:text-left">
          <p className="text-[10px] text-black font-medium">Powered by Ordina</p>
          <p className="text-[10px] text-black font-medium">www.ordina.health • support@ordina.health • © 2026 </p>
        </div>

      </div>

      {/* PAGE 2: ORDER DETAILS (Image 1 & 2) */}
      <div className="w-full max-w-[850px] bg-white rounded-xl shadow-sm p-4 sm:p-8 shrink-0 border border-gray-100 print:border-none print:shadow-none print:p-0 print:m-0">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
          <div className="w-full border-b border-[#E0E0E0] pb-5">
            <h1 className="text-[20px] sm:text-[22px] font-bold text-black mb-1">Dr. Cristofer Schleifer</h1>
            <p className="text-xs font-semibold text-primary mb-3">MBBS, MD (General Medicine)</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-400 text-[10px] px-2.5 py-1 rounded-full font-semibold">
                Reg. No: G-12345
              </span>
              <span className="bg-orange-50 text-orange-400 text-[10px] px-2.5 py-1 rounded-full font-semibold">
                Modified
              </span>
            </div>
          </div>
          <div className="w-full sm:w-28 h-24 bg-[#F6F6F6] rounded-2xl border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-semibold shrink-0">
            Logo Here
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-2 text-xs text-[#656565] font-medium">
            <Mail size={15} className="text-gray-400" />
            <span>Cristofer Schleifer@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#656565] font-medium">
            <Phone size={15} className="text-gray-400" />
            <span>+1 (555) 789-0123</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#656565] font-medium">
            <MapPin size={15} className="text-gray-400" />
            <span>200 Otis Street, Northborough MA 1532</span>
          </div>
        </div>

        {/* CarePlus Agency Box */}
        <div className="border border-[#00000026] shadow-xs rounded-xl overflow-hidden mb-8">
          <div className=" px-5 py-3 border-b border-[#00000026]">
            <h3 className="text-sm font-bold text-[#303030]">CarePlus Agency</h3>
          </div>
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-xs">
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#656565] font-medium w-32 shrink-0">Patient</span>
                <span className="text-[#303030] font-semibold flex-1 text-right sm:text-left">Martin Korsgaard</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#656565] font-medium w-36 shrink-0">Sub Category</span>
                <span className="text-[#303030] font-semibold flex-1 text-right sm:text-left">PRN (as needed) Medications</span>
              </div>

              <div className="flex justify-between items-center gap-2">
                <span className="text-[#656565] font-medium w-32 shrink-0">Order Type</span>
                <span className="text-[#303030] font-semibold flex-1 text-right sm:text-left">Medication Orders</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#656565] font-medium w-36 shrink-0">Home health/ Hospice</span>
                <span className="text-[#303030] font-semibold flex-1 text-right sm:text-left">Home Health</span>
              </div>

              <div className="flex justify-between items-center gap-2">
                <span className="text-[#656565] font-medium w-32 shrink-0">Date</span>
                <span className="text-[#303030] font-semibold flex-1 text-right sm:text-left">11/23/2025</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#656565] font-medium w-36 shrink-0">Order Received from</span>
                <span className="text-[#303030] font-semibold flex-1 flex items-center justify-end sm:justify-start gap-1">
                  <span className="text-[#528DB5] font-semibold"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>
                  Symmetry
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Box */}
        <div className="border border-[#00000026] shadow-xs rounded-xl overflow-hidden mb-8">
          <div className=" px-5 py-3 border-b border-[#00000026]">
            <h3 className="text-sm font-bold text-[#303030]">Order Details</h3>
          </div>

          <div className="p-5 border-b border-[#00000026]">
            <h4 className="text-xs font-bold text-[#303030] mb-2">Symptom Addressed</h4>
            <p className="text-xs text-[#656565] font-medium leading-relaxed">
              Persistent shortness of breath with reduced activity tolerance, bilateral lower extremity edema, and fatigue suggestive of volume overload and deconditioning.
            </p>
          </div>

          <div className="p-5 border-b border-[#00000026]">
            <h4 className="text-xs font-bold text-[#303030] mb-2">Medication(s)</h4>
            <ul className="text-xs text-[#656565] font-medium list-disc list-inside ml-1 flex flex-col gap-1">
              <li>Furosemide (Lasix)</li>
              <li>Lisinopril</li>
              <li>Metoprolol Succinate</li>
            </ul>
          </div>

          <div className="p-5">
            <h4 className="text-xs font-bold text-[#303030] mb-2">Dose / Route / Frequency</h4>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#656565] font-semibold">Furosemide</span>
                <span className="text-[#656565] font-medium">40 mg — PO — once daily</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#656565] font-semibold">Lisinopril</span>
                <span className="text-[#656565] font-medium">10 mg — PO — once daily</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#656565] font-semibold">Metoprolol Succinate</span>
                <span className="text-[#656565] font-medium">25 mg — PO — once daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Letter Footer text */}
        <div className="mb-12">
          <p className="text-xs text-[#4D4D4D] leading-relaxed whitespace-pre-wrap font-semibold">
            Dear Team,
            {"\n\n"}
            Please process the above order for patient Emily Carter. Attach results and confirmations to the case in Ordina.
            {"\n\n"}
            Notes:
            {"\n"}
            This is a PRN (as needed) medication instruction.
            {"\n"}
            Homehealth team to coordinate administration and documentation.
            {"\n\n"}
            Regards
          </p>
        </div>

        {/* QR Code & Signature */}
        <div className="flex flex-col items-center justify-center relative pb-8 mt-8">
          <Image
            src="/images/qr-code.png"
            alt="QR Code"
            width={120}
            height={120}
          />
          <p className="text-[13px] text-gray-600 font-semibold mt-5 text-center px-4">
            To sign the order, please follow this link: <a href="https://ordina-sign-orders/" className="text-[#528DB5] underline hover:text-blue-700 block sm:inline">https://ordina-sign-orders/</a>
          </p>

          <div className="mt-10 sm:mt-0 sm:absolute sm:bottom-0 sm:right-0 flex flex-col items-center sm:items-end text-center sm:text-right">
            <span className="text-[10px] text-[#528DB5] font-semibold mb-1">Digital Signature</span>
            <span className="text-[13px] font-bold text-gray-900">Dr. Cristofer Schleifer</span>
          </div>
        </div>

      </div>

    </div>
  );
}
