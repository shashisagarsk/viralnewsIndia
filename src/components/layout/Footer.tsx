"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useLanguage } from "@/src/context/LanguageContext";

export default function Footer() {
  const { t, translateCategory } = useLanguage();

  return (
    <footer className="mt-20 bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        {/* Brand Column */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-block">
            <div className="relative h-14 w-auto">
              <Image
                src="/logo.png"
                alt="ViralNewsIndia"
                width={220}
                height={60}
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <p className="mt-4 max-w-md text-xs leading-relaxed text-gray-400">
            {t("footerBrandBio")}
          </p>

          <div className="mt-6">
            <LanguageSwitcher variant="footer" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-red-500">
            {t("sectionsAndBeats")}
          </h3>

          <div className="mt-4 space-y-2 text-xs text-gray-400">
            <p>
              <Link href="/category/india" className="hover:text-white transition">
                {translateCategory("india")}
              </Link>
            </p>
            <p>
              <Link href="/category/world" className="hover:text-white transition">
                {translateCategory("world")}
              </Link>
            </p>
            <p>
              <Link href="/category/business" className="hover:text-white transition">
                {translateCategory("business")}
              </Link>
            </p>
            <p>
              <Link href="/category/technology" className="hover:text-white transition">
                {translateCategory("technology")}
              </Link>
            </p>
            <p>
              <Link href="/category/sports" className="hover:text-white transition">
                {translateCategory("sports")}
              </Link>
            </p>
            <p>
              <Link href="/category/science" className="hover:text-white transition">
                {translateCategory("science")}
              </Link>
            </p>
          </div>
        </div>

        {/* Navigation & Company */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-red-500">
            {t("quickNavigation")}
          </h3>

          <div className="mt-4 space-y-2 text-xs text-gray-400">
            <p>
              <Link href="/news" className="hover:text-white transition">
                {t("allNewsArchives")}
              </Link>
            </p>
            <p>
              <Link href="/stories" className="hover:text-white text-red-400 font-bold transition">
                {t("visualWebStories")}
              </Link>
            </p>
            <p>
              <Link href="/category" className="hover:text-white transition">
                {t("browseCategories")}
              </Link>
            </p>
            <p>
              <Link href="/search" className="hover:text-white transition">
                {t("searchCoverage")}
              </Link>
            </p>
            <p>
              <Link href="/" className="hover:text-white transition">
                {t("liveEditorialFeed")}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-gray-500 sm:flex-row sm:px-6">
          <div>© 2026 ViralNewsIndia. {t("allRightsReserved")}</div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{t("privacyPolicy")}</span>
            <span>{t("termsOfService")}</span>
            <span>{t("editorialStandards")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}