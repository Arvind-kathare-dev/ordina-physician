import { HiChevronDown } from "react-icons/hi";
import Image from "next/image";
import SearchInput from "./common/SearchInput";
import donwloadimage from "../assets/images/donwload.png";
import refreshimage from "../assets/images/sync-icon.png";

type OutboxOrdersPageHeaderProps = {
  pageHeading: string;
};

export default function OutboxOrdersPageHeader({
  pageHeading,
}: OutboxOrdersPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h1 className="text-[16px] font-semibold tracking-tight text-[#000000] sm:text-[24px]">
        {pageHeading}
      </h1>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:max-w-4xl lg:flex-1">
        <SearchInput aria-label="Search orders" />
        <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[8px] border-[0.5px] border-[#CDCDCD] bg-[#FFFFFF] px-3 h-[40px] text-sm font-medium text-[#686464]"
          >
            <Image
              src={donwloadimage}
              className="w-[16px] h-[16px]"
              alt="Download"
              width={16}
              height={16}
            />
            <span className="hidden sm:inline">Export Orders</span>
            <span className="sm:hidden">Export</span>
          </button>
          <div className="flex gap-2 overflow-hidden">
            <button
              type="button"
              className="inline-flex items-center border px-3 h-[40px] gap-2 rounded-[8px] border-[0.5px] border-[#209F7F] bg-[#FFFFFF] px-3 h-[40px] text-sm font-medium text-[#209F7F]"
            >
              <Image
                src={refreshimage}
                className="w-[16px] h-[16px] object-content"
                alt="Refresh"
                width={16}
                height={16}
              />
              Sync
            </button>
            <button
              type="button"
              className="border-[0.5px] border-[#209F7F] px-1 h-[40px] rounded-[8px] text-[#209F7F] hover:bg-[#209F7F]/10"
              aria-label="Sync options"
            >
              <HiChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
