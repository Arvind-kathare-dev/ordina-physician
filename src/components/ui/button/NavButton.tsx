"use client";

import Link from "next/link";
import Image from "next/image";

interface NavButtonProps {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  label,
  href,
  icon,
  active = false,
}) => {
  return (
    <Link
      href={href}
      className={`nav-btn flex items-center gap-2  ${
        active ? "nav-btn-active" : ""
      }`}
    >
      {icon && (
        <Image
          src={`/images/${icon}.svg`}
          alt={label}
          width={18}
          height={18}
          className="nav-btn-icon"
        />
      )}

      <span className="text-gray-400 font-medium text-[12px]">{label}</span>
    </Link>
  );
};

export default NavButton;