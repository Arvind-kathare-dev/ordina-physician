"use client";

interface DetailSectionProps {
  title: string;
  fields: { label: string; value: React.ReactNode }[][];
}

interface DetailPreviewPageProps {
  data: {
    pecos: { enrollmentId: string };
    information: {
      fullName: string;
      email: string;
      phone: string;
      role: string;
      licenseNumber: string;
      eSignature: string;
      eSignatureName: string;
      organizationName: string;
      city: string;
      timeZone: string;
      state: string;
    };
    orderDelivery: {
      preferredMethod: string;
      email: string;
      faxNumber: string;
      deliveryTime: string;
      notifyFailureRole: string;
    };
    integration: {
      ehrSystem: string;
      apiKey: string;
      webhookUrl: string;
    };
  };
}

// ─── Signature SVG (cursive handwriting style) ────────────────────────────────

const SignatureDisplay = ({ value, printedName }: { value: string; printedName?: string }) => {
  const isImage = value && (value.startsWith("data:image/") || value.startsWith("blob:"));
  
  return (
    <div className="flex flex-col mt-1 min-h-[40px] justify-center">
      {isImage ? (
        <img 
          src={value} 
          alt="User Signature" 
          className="max-h-12 w-fit object-contain border-b border-gray-100 pb-1" 
        />
      ) : (
        <span 
          className="text-2xl text-gray-800 italic leading-none"
          style={{ fontFamily: "'Brush Script MT', cursive, sans-serif" }}
        >
          {value || "No signature"}
        </span>
      )}
      <div className="flex flex-col mt-1">
        <span className="text-[10px] text-gray-400 italic uppercase tracking-tight">
          {isImage ? "Digitally Signed" : "E-Signature"}
        </span>
        {printedName && (
          <span className="text-sm font-semibold text-gray-800 mt-0.5">{printedName}</span>
        )}
      </div>
    </div>
  );
};

// ─── Integration Row ──────────────────────────────────────────────────────────

const IntegrationRow = ({ ehrSystem }: { ehrSystem: string }) => (
  <div className="flex items-center gap-2">
    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
    <span className="text-sm font-medium text-gray-600">Connected</span>
    <div className="flex items-center gap-0.5 ml-1">
      <span className="text-sm font-semibold text-gray-600 capitalize">{ehrSystem || "None"}</span>
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

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs text-gray-400 font-normal leading-snug">{label}</span>
    {label.toLowerCase().includes("signature") ? (
      <div className="mt-1">{value}</div>
    ) : (
      <span className="text-sm font-semibold text-gray-600 leading-snug">
        {value || "N/A"}
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

const IntegrationSection = ({ ehrSystem }: { ehrSystem: string }) => (
  <div className="py-6">
    <p className="text-xs font-semibold tracking-widest text-[#4A90B8] uppercase mb-4">
      INTEGRATION
    </p>
    <IntegrationRow ehrSystem={ehrSystem} />
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DetailPreviewPage({ data }: DetailPreviewPageProps) {
  const sections = [
    {
      title: "CREDENTIALS",
      fields: [
        [{ label: "PECOS", value: data.pecos.enrollmentId }],
      ],
    },
    {
      title: "INFORMATION",
      fields: [
        [
          { label: "State license number", value: data.information.licenseNumber },
          {
            label: "Create e-signature & Initial",
            value: <SignatureDisplay value={data.information.eSignature} printedName={data.information.eSignatureName} />, 
          },
        ],
      ],
    },
    {
      title: "PERSONAL INFORMATION",
      fields: [
        [
          { label: "Full Name", value: data.information.fullName },
          { label: "Role", value: data.information.role },
        ],
        [
          { label: "Email", value: data.information.email },
          { label: "Phone (Optional)", value: data.information.phone },
        ],
      ],
    },
    {
      title: "PRACTICE DETAILS",
      fields: [
        [
          { label: "Practice / organization name", value: data.information.organizationName },
          { label: "Timezone", value: data.information.timeZone },
        ],
        [
          { label: "City", value: data.information.city },
          { label: "State", value: data.information.state },
        ],
      ],
    },
    {
      title: "ORDER DELIVERY PREFERENCE",
      fields: [
        [
          { label: "Delivery Method", value: data.orderDelivery.preferredMethod },
          { label: "Notify on delivery failure", value: data.orderDelivery.notifyFailureRole },
        ],
      ],
    },
  ];

  return (
    <div className="min-h-screen  flex items-start justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
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
          <IntegrationSection ehrSystem={data.integration.ehrSystem} />
        </div>
      </div>
    </div>
  );
}