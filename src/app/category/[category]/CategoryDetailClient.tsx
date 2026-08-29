"use client";

import React from "react";
import Link from "next/link";
import Header from "@/src/components/layout/Header";
import BreakingNews from "@/src/components/layout/BreakingNews";
import Footer from "@/src/components/layout/Footer";
import Sidebar from "@/src/components/news/Sidebar";
import NewsCard from "@/src/components/news/NewsCard";
import { News } from "@/src/types/news";
import { useLanguage } from "@/src/context/LanguageContext";
import { ChevronRight, Layers } from "lucide-react";

interface CategoryDetailClientProps {
  categorySlug: string;
  categoryNews: News[];
  allNews: News[];
}

export default function CategoryDetailClient({
  categorySlug,
  categoryNews,
  allNews,
}: CategoryDetailClientProps) {
  const { translateCategory, t } = useLanguage();

  const localizedCategoryName =
    translateCategory(categorySlug) ||
    (categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1));

  return (
    <>
      <Header />
      <BreakingNews />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-red-600 transition">
            {t("home")}
          </Link>
          <ChevronRight size={12} />
          <Link href="/category" className="hover:text-red-600 transition">
            {t("categoryDirectory")}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-bold uppercase">
            {localizedCategoryName}
          </span>
        </nav>

        {/* Category Hero Banner */}
        <div className="mb-10 border-b-2 border-gray-950 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white font-black shadow-sm">
                <Layers size={20} />
              </span>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tight text-gray-950">
                  {localizedCategoryName}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t("exploreCategorySub")}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
              {categoryNews.length}{" "}
              {categoryNews.length === 1
                ? t("storiesCountSingle")
                : t("storiesCountPlural")}
            </span>
          </div>
        </div>

        {/* Category Content + Sidebar */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            {categoryNews.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center">
                <p className="text-sm font-bold text-gray-700">
                  {t("noArticlesInCategory")}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {t("beFirstToPublish")}
                </p>
                <Link
                  href="/admin/editor"
                  className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-xs font-bold uppercase text-white shadow"
                >
                  {t("writePost")}
                </Link>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2">
                {categoryNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar news={allNews} />
        </div>
      </main>

      <Footer />
    </>
  );
}
