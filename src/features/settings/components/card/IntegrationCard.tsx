import Image from "next/image";
import Button from "@/components/ui/button/Button";

interface Props {
  name: string;
  description: string;
  status: "connected" | "not_connected";
  logo: string;
}

export default function IntegrationCard({
  name,
  description,
  status,
  logo,
}: Props) {
  const isConnected = status === "connected";

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-sm transition">
      {/* Logo */}
      <div className="mb-3">
        <Image src={logo} alt={name} width={110} height={32} />
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-orange-400"
          }`}
        />
        <span className="text-sm font-medium text-gray-800">
          {isConnected ? "Connected" : "Not Connected"}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-4">{description}</p>

      {/* Action */}
      <Button
        variant="primary"
        className="w-full h-10 text-sm font-medium"
      >
        {isConnected ? "Manage" : "Connect"}
      </Button>
    </div>
  );
}