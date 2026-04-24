import Image from "next/image";
import repBlue1 from "../../../../assets/images/report/rep-blue-1.png";
import repBlue2 from "../../../../assets/images/report/rep-blue-2.png";
import repBlue3 from "../../../../assets/images/report/rep-blue-3.png";
import repBlue4 from "../../../../assets/images/report/rep-blue-4.png";
import repBlue5 from "../../../../assets/images/report/rep-blue-5.png";
import repBlue6 from "../../../../assets/images/report/rep-blue-6.png";
import repWhite1 from "../../../../assets/images/report/rep-white-1.png";
import repWhite2 from "../../../../assets/images/report/rep-white-2.png";
import repWhite3 from "../../../../assets/images/report/rep-white-3.png";
import repWhite4 from "../../../../assets/images/report/rep-white-4.png";
import repWhite5 from "../../../../assets/images/report/rep-white-5.png";
import repWhite6 from "../../../../assets/images/report/rep-white-6.png";

const BLUE = [
  repBlue1,
  repBlue2,
  repBlue3,
  repBlue4,
  repBlue5,
  repBlue6,
] as const;

const WHITE = [
  repWhite1,
  repWhite2,
  repWhite3,
  repWhite4,
  repWhite5,
  repWhite6,
] as const;

const ID_TO_SLOT: Record<string, number> = {
  billable: 0,
  patient: 0,
  physician: 1,
  f2f: 2,
  poc: 3,
  addon: 4,
  custom: 5,
  listency: 5,
};

type ReportSidebarNavIconProps = {
  id: string;
  active: boolean;
  custom?: boolean;
  className?: string;
};

export function ReportSidebarNavIcon({
  id,
  active,
  custom,
  className = "",
}: ReportSidebarNavIconProps) {
  const slot = ID_TO_SLOT[id];
  if (slot === undefined) return null;
  const src = active && !custom ? BLUE[slot] : WHITE[slot];

  return (
    <span
      className={`relative flex h-[28px] w-[32px] shrink-0 items-start justify-start ${className}`}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        width={28}
        height={32}
        className="h-[28px] w-[32px] object-contain"
        sizes="28px 32px"
      />
    </span>
  );
}
