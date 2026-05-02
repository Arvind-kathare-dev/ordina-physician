"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="shrink-0 border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-3 px-3 py-3.5 text-[11px] leading-snug text-[#686464] sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-x-6 sm:px-4 sm:py-4 sm:text-sm md:px-5 lg:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 sm:justify-self-start">
          <span>© Copyright 2026 -</span>
          <Image
            src={"/images/nav-icon.svg"}
            alt=""
            width={15}
            height={15}
            className="h-[15px] w-auto max-h-5 object-contain object-left"
            aria-hidden
          />
          <span className="font-semibold text-[#4a4a4a]">Ordina.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-1 sm:justify-self-center">
          <span>Connected with</span>
          <Image src={"/images/footer-ads.png"} alt="" width={72} height={24} className="h-5 w-auto max-h-5 object-contain object-left" aria-hidden />
        </div>

        <p className="text-center sm:justify-self-end sm:text-right">
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
