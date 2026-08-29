"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Flame, Home as HomeIcon } from "lucide-react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useLanguage } from "@/src/context/LanguageContext";

const categories = [
  { key: "home", defaultName: "Home", href: "/", isHome: true },
  { key: "stories", defaultName: "Web Stories", href: "/stories" },
  { key: "india", defaultName: "India", href: "/category/india" },
  { key: "world", defaultName: "World", href: "/category/world" },
  { key: "business", defaultName: "Business", href: "/category/business" },
  { key: "technology", defaultName: "Technology", href: "/category/technology" },
  { key: "sports", defaultName: "Sports", href: "/category/sports" },
  { key: "entertainment", defaultName: "Entertainment", href: "/category/entertainment" },
  { key: "lifestyle", defaultName: "Lifestyle", href: "/category/lifestyle" },
  { key: "science", defaultName: "Science", href: "/category/science" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { formatDate, translateCategory, t } = useLanguage();

  const formattedDate = formatDate();

  return (
    <header className="bg-black text-white shadow-2xl">
      {/* Top Utility Bar with Center Language Switcher */}
      <div className="border-b border-gray-900 bg-gray-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-gray-400">
          {/* Left: Mobile Menu Trigger + Date & Edition */}
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1.5 rounded-md bg-gray-900 border border-gray-800 px-2 py-1 text-gray-300 hover:border-red-600 hover:text-white lg:hidden transition"
              aria-label="Open mobile menu"
            >
              <Menu size={15} className="text-red-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{t("menu")}</span>
            </button>

            <span className="hidden sm:inline font-medium text-gray-300">
              {formattedDate} &nbsp;|&nbsp;
            </span>

            <span className="hidden md:inline text-gray-400">
              {t("editionLabel")}
            </span>
          </div>

          {/* Top Center: Language Switcher (Hindi Default, Small Font Size) */}
          <div className="flex items-center justify-center">
            <LanguageSwitcher variant="navbar-center" />
          </div>

          {/* Right: Trending & Live Newsroom */}
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs text-gray-400 font-medium">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-gray-300">
              <Flame size={13} className="text-amber-500" />
              <span>{t("trendingBar")}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{t("liveNewsroom")}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Logo & Centered Branding Section */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Centered Logo Graphic */}
          <Link href="/" className="group inline-flex flex-col items-center">
            <div className="relative h-14 sm:h-18 md:h-22 w-auto transition duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Viral News India"
                width={340}
                height={100}
                priority
                className="h-full w-auto object-contain drop-shadow-[0_4px_20px_rgba(220,38,38,0.3)]"
              />
            </div>

            {/* Centered Brand Title & Editorial Subtitle */}
            <div className="mt-1 text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
                Viral News <span className="text-red-600">India</span>
              </h1>
              <p className="mt-0.5 text-[9px] sm:text-[11px] font-bold tracking-[3px] sm:tracking-[4px] uppercase text-gray-400">
                {t("siteTagline")}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Enlarged, Beautiful & Fully Visible Navigation Bar */}
      <div className="relative z-30 border-y-2 border-red-600/40 bg-gradient-to-r from-gray-950 via-black to-gray-950 shadow-xl">
        <nav className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="overflow-x-auto scrollbar-none py-2 px-1">
            <div className="flex min-w-max items-center justify-start lg:justify-center gap-1.5 sm:gap-2 md:gap-3">
              {categories.map((cat) => {
                const isActive =
                  cat.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(cat.href);

                const displayName = translateCategory(cat.key) || cat.defaultName;

                return (
                  <Link
                    key={cat.key}
                    href={cat.href}
                    className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5 text-xs sm:text-[13px] md:text-sm font-black uppercase tracking-wider transition-all duration-200 rounded-lg ${
                      isActive
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/40 font-black scale-100"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat.isHome && <HomeIcon size={14} className="shrink-0" />}
                    <span>{displayName}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      {/* Responsive Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={categories.map((c) => ({
          name: translateCategory(c.key) || c.defaultName,
          href: c.href,
        }))}
      />
    </header>
  );
}