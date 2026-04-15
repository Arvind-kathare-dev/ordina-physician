"use client";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DetailField {
  label: string;
  value: React.ReactNode;
}

interface DetailSectionProps {
  title: string;
  fields: DetailField[][];  // each inner array = one row (1 or 2 columns)
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const sections: DetailSectionProps[] = [
  {
    title: "CREDENTIALS",
    fields: [
      [{ label: "PECOS", value: "PECOS" }],
    ],
  },
  {
    title: "INFORMATION",
    fields: [
      [
        { label: "State license number", value: "JH0865523" },
        {
          label: "Create e-signature & Initial",
          value: "SIGNATURE", // special render
        },
      ],
    ],
  },
  {
    title: "PERSONAL INFORMATION",
    fields: [
      [
        { label: "Full Name", value: "Dr. John Doe" },
        { label: "Role", value: "Physician" },
      ],
      [
        { label: "Email", value: "drjohn.doe@gmail.com" },
        { label: "Phone (Optional)", value: "+1" },
      ],
    ],
  },
  {
    title: "PRACTICE DETAILS",
    fields: [
      [
        { label: "Practice / organization name", value: "Medical Group" },
        { label: "Timezone", value: "San Diego, CA, USA (GMT-8)" },
      ],
      [
        { label: "City", value: "Los Angeles" },
        { label: "State", value: "CA" },
      ],
    ],
  },
  {
    title: "ORDER DELIVERY PREFERENCE",
    fields: [
      [
        { label: "Primary Email", value: "michael.anderson.us@gmail.com" },
        { label: "Notify on delivery failure", value: "No" },
      ],
    ],
  },
];

// ─── Signature SVG (cursive handwriting style) ────────────────────────────────

const SignatureDisplay = () => (
  <svg
    width="120"
    height="40"
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1"
  >
    <path
      d="M8 28 C12 10, 18 8, 22 18 C26 28, 28 14, 34 16 C40 18, 38 26, 44 22
         C50 18, 52 10, 58 14 C64 18, 62 28, 68 24 C74 20, 76 16, 82 20
         C88 24, 86 30, 94 26 C100 23, 104 20, 112 22"
      stroke="#1a1a1a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// ─── Integration Row ──────────────────────────────────────────────────────────

const IntegrationRow = () => (
  <div className="flex items-center gap-2">
    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
    <span className="text-sm font-medium text-gray-600">Connected</span>
    <div className="flex items-center gap-0.5 ml-1">
      <span className="text-sm font-semibold text-gray-600">NextGen</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="text-blue-600"
      >
        <path
          d="M9 18l6-6-6-6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

// ─── Field ────────────────────────────────────────────────────────────────────

const Field = ({ label, value }: DetailField) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs text-gray-400 font-normal leading-snug">{label}</span>
    {value === "SIGNATURE" ? (
      <SignatureDisplay />
    ) : (
      <span className="text-sm font-semibold text-gray-600 leading-snug">
        {value}
      </span>
    )}
  </div>
);

// ─── Section ─────────────────────────────────────────────────────────────────

const DetailSection = ({ title, fields }: DetailSectionProps) => (
  <div className="py-6 border-b border-gray-100 last:border-b-0">
    {/* Section title */}
    <p className="text-xs font-semibold tracking-widest text-[#4A90B8] uppercase mb-4">
      {title}
    </p>

    {/* Rows */}
    <div className="flex flex-col gap-6">
      {fields.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`grid gap-x-8 gap-y-4 ${
            row.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {row.map((field, fieldIdx) => (
            <Field key={fieldIdx} label={field.label} value={field.value} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// ─── Integration Section ──────────────────────────────────────────────────────

const IntegrationSection = () => (
  <div className="py-6">
    <p className="text-xs font-semibold tracking-widest text-[#4A90B8] uppercase mb-4">
      INTEGRATION
    </p>
    <IntegrationRow />
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DetailPreviewPage() {
  return (
    <div className="min-h-screen  flex items-start justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        {/* Page heading */}
        <h1 className="text-xl font-bold text-gray-900 mb-4">Detail Preview</h1>

        {/* Card */}
        <div className="bg-white flex flex-col gap-6 border border-ordinaBorder-200 rounded-2xl px-6 sm:px-8 ">
          {/* Sections */}
          {sections.map((section) => (
            <DetailSection
              key={section.title}
              title={section.title}
              fields={section.fields}
            />
          ))}

          {/* Integration — special layout */}
          <IntegrationSection />
        </div>
      </div>
    </div>
  );
}