import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 px-6 py-3 flex items-center justify-between text-xs text-gray-400 bg-white">
      <div className="flex items-center gap-1">
        <span>© Copyright 2026 – </span>
        <Image src="/images/nav-icon.svg" alt="logo" width={18} height={18} />
        <span>Ordina.</span>
      </div>

      <div className="flex items-center gap-2">
        <span>Connected with</span>
        <Image src="/images/footer-ads.png" alt="logo" width={60} height={60} />
      </div>

      <span>All Rights Reserved</span>
    </footer>
  );
};

export default Footer;
