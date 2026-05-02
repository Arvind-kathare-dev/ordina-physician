"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiChevronDown,
  HiMenu,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineIdentification,
  HiOutlineLogout,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiViewGrid,
  HiX,
} from "react-icons/hi";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import dashboard from "../../assets/images/dashboard.png";
import profile from "../../assets/images/profile.png";
import NavButton from "../ui/button/NavButton";

type NavItem = { id: string; label: string; href: string, icon?: string };

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "ProHealth Dashboard", href: "/dashboard", icon: "nav-icon" },
  { id: "orders", label: "Orders", href: "/orders" },
  { id: "efax", label: "eFax", href: "/efax" },
  { id: "reports", label: "Reports", href: "/reports" },
];

function navItemIsActive(pathname: string | null, href: string) {
  if (!pathname || href === "#") return false;
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  }
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const SETTINGS_OPTIONS = [
  {
    id: "general",
    label: "General settings",
    icon: HiOutlineCog,
    href: "/settings",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: HiOutlineBell,
    href: null,
  },
  {
    id: "security",
    label: "Security",
    icon: HiOutlineShieldCheck,
    href: null,
  },
] as const;

const PROFILE_OPTIONS = [
  { id: "profile", label: "My profile", icon: HiOutlineUser },
  { id: "account", label: "Account settings", icon: HiOutlineIdentification },
  { id: "signout", label: "Sign out", icon: HiOutlineLogout },
] as const;


function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void
) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const el = ref.current;
      if (el && !el.contains(e.target as Node)) onCloseRef.current();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, ref]);
}

function navPillClass(active: boolean) {
  const base =
    "inline-flex h-[33px] border-[0.5px] shrink-0 items-center justify-center gap-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.25)] whitespace-nowrap rounded-[12px] bg-white px-3 text-center text-xs font-medium text-slate-600 transition hover:text-slate-900 border";

  return `${base} ${active
    ? "border-[#528DB5] text-[#686464]"
    : "border-transparent"
    }`;
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);


  const settingsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useClickOutside(settingsRef, settingsOpen, () => setSettingsOpen(false));
  useClickOutside(profileRef, profileOpen, () => setProfileOpen(false));

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const closeMenus = () => {
    setSettingsOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40  bg-white">
      <div className="mx-auto flex max-w-[1600px] h-20 items-center justify-between gap-1.5 px-3 py-2 sm:gap-8 sm:px-4 sm:py-2.5 md:px-5 lg:px-6">
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-2.5">
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-[0.5px] border-slate-200 text-slate-700 hover:bg-slate-50 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <HiX className="h-5 w-5" aria-hidden />
            ) : (
              <HiMenu className="h-5 w-5" aria-hidden />
            )}
            <span className="sr-only">Toggle menu</span>
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/images/logo/ordina-logo.svg" alt="logo" width={36} height={36} />
            <div className="leading-tight">
              <p className="text-lg font-extrabold text-gray-900">Ordina</p>
              <p className="text-[8px] tracking-[0.24em] text-black font-medium">
                PHYSICIAN
              </p>
            </div>
          </Link>
        </div>

        <nav
          className="relative hidden min-h-0 min-w-0 flex-1 md:block"
          aria-label="Primary"
        >
          <div className="header-nav-scroll scroll-smooth flex justify-center lg:justify-end items-center">
            <div className="flex w-max flex-nowrap items-center gap-2 lg:gap-[10px] px-0.5 py-0.5">

              {NAV_ITEMS.map((item) => (
                <NavButton
                  key={item.href}
                  {...item}
                  active={isActive(item.href)}
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="relative hidden sm:block" ref={settingsRef}>
            <button
              type="button"
              className="inline-flex items-center gap-0.5 rounded-md bg-[#E2F1FF] px-2 py-1.5 text-slate-700 shadow-sm ring-1 ring-sky-100/80 hover:bg-sky-100/90 sm:gap-1 sm:px-2.5 sm:py-2 sm:rounded-xl cursor-pointer"
              aria-expanded={settingsOpen}
              aria-haspopup="menu"
              aria-controls="settings-menu"
              onClick={() => {
                setSettingsOpen((v) => !v);
                setProfileOpen(false);
              }}
            >
              <HiOutlineCog className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden />
              <HiChevronDown className="h-2.5 w-2.5 text-slate-500 sm:h-3 sm:w-3" aria-hidden />
              <span className="sr-only">Settings menu</span>
            </button>
            {settingsOpen && (
              <div
                id="settings-menu"
                role="menu"
                className="absolute right-0 z-50 mt-1.5 w-52 rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-slate-100"
              >
                {SETTINGS_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const row = (
                    <>
                      <Icon className="h-4 w-4 shrink-0 text-slate-400" />
                      {opt.label}
                    </>
                  );
                  if (opt.href) {
                    return (
                      <Link
                        key={opt.id}
                        href={opt.href}
                        role="menuitem"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        onClick={() => setSettingsOpen(false)}
                      >
                        {row}
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={opt.id}
                      href="#"
                      role="menuitem"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                      onClick={() => setSettingsOpen(false)}
                    >
                      {row}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="relative ml-3" ref={profileRef}>
            <button
              type="button"
              className="flex max-w-[200px] items-center gap-1.5"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-controls="profile-menu"
              onClick={() => {
                setProfileOpen((v) => !v);
                setSettingsOpen(false);
              }}
            >
              <Image
                src={profile}
                alt="Profile"
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 rounded-full object-cover ring-2 ring-white sm:h-7 sm:w-7"
              />
              <span className="hidden min-w-0 flex-1 sm:block">
                <span className="block truncate text-[11px] font-medium text-slate-900 sm:text-xs">
                  William Christiana
                </span>
              </span>
              <HiChevronDown
                className={`hidden h-3 w-3 shrink-0 text-slate-500 transition sm:block sm:h-3.5 sm:w-3.5 ${profileOpen ? "rotate-180" : ""
                  }`}
                aria-hidden
              />
            </button>
            {profileOpen && (
              <div
                id="profile-menu"
                role="menu"
                className="absolute right-0 z-50 mt-1.5 w-52 rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-slate-100"
              >
                {PROFILE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <a
                      key={opt.id}
                      href="#"
                      role="menuitem"
                      className={`flex items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50 ${opt.id === "signout"
                        ? "text-red-600"
                        : "text-slate-700"
                        }`}
                      onClick={() => setProfileOpen(false)}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-70" />
                      {opt.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          tabIndex={mobileOpen ? 0 : -1}
          className={`absolute inset-0 bg-slate-900/45 transition-opacity duration-300 ease-out ${mobileOpen ? "opacity-100" : "opacity-0"
            }`}
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />

        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          aria-hidden={!mobileOpen}
          className={`absolute left-0 top-0 flex h-full w-[min(90vw,20rem)] max-w-full flex-col bg-white shadow-2xl ring-1 ring-slate-200/80 transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
            <span
              id="mobile-nav-title"
              className="text-sm font-semibold text-slate-900"
            >
              Menu
            </span>
            <button
              type="button"
              tabIndex={mobileOpen ? 0 : -1}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <HiX className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav
            className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-4 py-4"
            aria-label="Mobile primary"
          >
            {NAV_ITEMS.map((item) => {
              const active = navItemIsActive(pathname, item.href);
              const pillClass = `${navPillClass(active)} w-full justify-start`;
              const inner = (
                <>
                  {item.id === "dashboard" && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
                      <HiViewGrid className="h-3 w-3 text-white" aria-hidden />
                    </span>
                  )}
                  {item.label}
                </>
              );
              if (item.href === "#") {
                return (
                  <a
                    key={item.id}
                    href="#"
                    tabIndex={mobileOpen ? 0 : -1}
                    className={pillClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    {inner}
                  </a>
                );
              }
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  tabIndex={mobileOpen ? 0 : -1}
                  className={pillClass}
                  onClick={() => setMobileOpen(false)}
                >
                  {inner}
                </Link>
              );
            })}

            <div className="mt-2 border-t border-slate-100 pt-4">
              <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Settings
              </p>
              {SETTINGS_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const shared =
                  "flex items-center gap-2 rounded-lg px-2 py-2.5 text-xs text-slate-700 hover:bg-slate-50";
                if (opt.href) {
                  return (
                    <Link
                      key={opt.id}
                      href={opt.href}
                      tabIndex={mobileOpen ? 0 : -1}
                      className={shared}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="h-4 w-4 text-slate-400" />
                      {opt.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={opt.id}
                    href="#"
                    tabIndex={mobileOpen ? 0 : -1}
                    className={shared}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="h-4 w-4 text-slate-400" />
                    {opt.label}
                  </a>
                );
              })}
              <p className="mt-3 px-1 pb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Profile
              </p>
              {PROFILE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <a
                    key={opt.id}
                    href="#"
                    tabIndex={mobileOpen ? 0 : -1}
                    className={`flex items-center gap-2 rounded-lg px-2 py-2.5 text-xs hover:bg-slate-50 ${opt.id === "signout" ? "text-red-600" : "text-slate-700"
                      }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="h-4 w-4 opacity-70" />
                    {opt.label}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
