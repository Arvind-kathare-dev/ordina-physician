"use client";

import { PhysicianNotificationDocument } from "@/data/physicianNotificationsStaticData";
import { useId } from "react";
import Dialog from "../Dialog";

type PhysicianNotificationDocumentDialogProps = {
  open: boolean;
  onClose: () => void;
  document: PhysicianNotificationDocument | null;
};

export default function PhysicianNotificationDocumentDialog({
  open,
  onClose,
  document: doc,
}: PhysicianNotificationDocumentDialogProps) {
  const titleId = useId();

  if (!doc) return null;

  const patientRows: [string, string][] = [
    ["Patient Name", doc.patientName],
    ["Date of Birth", doc.dateOfBirth],
    ["Gender", doc.gender],
    ["Medical Record Number (MRN)", doc.mrn],
    ["Admission Date", doc.admissionDate],
    ["Discharge Date", doc.dischargeDate],
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      backdropClassName="bg-slate-600/45"
      panelClassName="max-h-[min(92vh,900px)] w-full max-w-[min(100%,760px)] flex-col overflow-visible rounded-none bg-transparent p-0 shadow-none ring-0"
    >
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <article className="mx-auto border border-slate-300 bg-white px-5 py-7 font-sans text-[#333] shadow-sm sm:px-8 sm:py-9">
          <h2
            id={titleId}
            className="text-center text-xl font-bold tracking-tight text-[#1a1a1a] sm:text-2xl"
          >
            {doc.title}
          </h2>

          <div className="mt-4 space-y-0.5 text-sm leading-snug sm:text-[15px]">
            <p>
              <span className="font-semibold text-[#1a1a1a]">Hospital Name: </span>
              {doc.hospitalName}
            </p>
            <p>
              <span className="font-semibold text-[#1a1a1a]">Address: </span>
              {doc.hospitalAddress}
            </p>
            <p>
              <span className="font-semibold text-[#1a1a1a]">Phone: </span>
              {doc.hospitalPhone}
            </p>
          </div>

          <section className="mt-5">
            <h3 className="text-sm font-bold text-[#1a1a1a] sm:text-[15px]">
              Patient Information
            </h3>
            <table className="mt-1.5 w-full table-fixed border-collapse text-sm leading-snug sm:text-[15px]">
              <colgroup>
                <col style={{ width: "38%" }} />
                <col style={{ width: "62%" }} />
              </colgroup>
              <tbody>
                {patientRows.map(([label, value]) => (
                  <tr key={label}>
                    <th
                      scope="row"
                      className="border border-slate-300 bg-slate-100 px-2.5 py-1.5 text-left text-[13px] font-semibold text-[#1a1a1a] align-top sm:px-3 sm:text-sm"
                    >
                      {label}
                    </th>
                    <td className="border border-slate-300 bg-white px-2.5 py-1.5 align-top text-[13px] text-[#333] sm:px-3 sm:text-sm">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className="mt-4 space-y-0.5 text-sm leading-snug sm:text-[15px]">
            <p>
              <span className="font-semibold text-[#1a1a1a]">Admitting Physician: </span>
              {doc.admittingPhysician}
            </p>
            <p>
              <span className="font-semibold text-[#1a1a1a]">Department: </span>
              {doc.department}
            </p>
          </div>

          <section className="mt-5">
            <h3 className="text-sm font-bold text-[#1a1a1a] sm:text-[15px]">
              Primary Diagnosis
            </h3>
            <p className="mt-1 text-sm leading-snug sm:text-[15px]">{doc.primaryDiagnosis}</p>
          </section>

          <section className="mt-4">
            <h3 className="text-sm font-bold text-[#1a1a1a] sm:text-[15px]">Hospital Course</h3>
            <p className="mt-1 text-sm leading-snug sm:text-[15px]">{doc.hospitalCourse}</p>
          </section>

          <section className="mt-4">
            <h3 className="text-sm font-bold text-[#1a1a1a] sm:text-[15px]">
              Discharge Medications
            </h3>
            <ol className="mt-1 list-decimal space-y-1 pl-4 text-sm leading-snug sm:pl-5 sm:text-[15px]">
              {doc.dischargeMedications.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ol>
          </section>

          <section className="mt-4">
            <h3 className="text-sm font-bold text-[#1a1a1a] sm:text-[15px]">
              Discharge Instructions
            </h3>
            <p className="mt-1 text-sm leading-snug sm:text-[15px]">
              {doc.dischargeInstructions.join(" ")}
            </p>
          </section>

          <div className="mt-7 text-sm leading-snug sm:text-[15px]">
            <p className="font-medium text-[#1a1a1a]">
              Physician Signature:{" "}
              <span className="inline-block min-w-[14rem] max-w-full border-b border-slate-400 align-bottom" />
            </p>
            <p className="mt-2">
              <span className="font-semibold text-[#1a1a1a]">Date: </span>
              {doc.signatureDate}
            </p>
          </div>
        </article>
      </div>
    </Dialog>
  );
}
