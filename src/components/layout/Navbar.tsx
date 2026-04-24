"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NavButton from "../ui/button/NavButton";

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { label: "ProHealth Dashboard", href: "/dashboard", icon: "nav-icon" },
  { label: "Orders", href: "/orders", icon: "" },
  { label: "Efax", href: "/efax", icon: "" },
  { label: "Reports", href: "/reports/physician", icon: "" },
];

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* LEFT */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo/ordina-logo.svg" alt="logo" width={36} height={36} />
              <div className="leading-tight">
                <p className="text-lg font-extrabold text-gray-900">Ordina</p>
                <p className="text-[8px] tracking-[0.24em] text-black font-medium">
                  PHYSICIAN
                </p>
              </div>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavButton
                  key={item.href}
                  {...item}
                  active={isActive(item.href)}
                />
              ))}
            </nav>

            {/* SETTINGS */}
            <Link href="/settings">
            <div className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
              ⚙️
            </div>
            </Link>
            

            {/* USER */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shadow">
                WC
              </div>

              <span className="hidden sm:block text-sm font-medium text-gray-700">
                William Christiana 
              </span>

              <svg
                className="hidden sm:block w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="md:hidden border-t border-gray-100 px-4 py-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {navItems.map((item) => (
            <NavButton
              key={item.href}
              label={item.label}
              href={item.href}
              active={isActive(item.href)}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
