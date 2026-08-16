import React from "react";
import Link from "next/link";
import Header from "@/src/components/layout/Header";
import BreakingNews from "@/src/components/layout/BreakingNews";
import Footer from "@/src/components/layout/Footer";
import Sidebar from "@/src/components/news/Sidebar";
import NewsCard from "@/src/components/news/NewsCard";
import { NewsService } from "@/src/services/news.service";
import { ChevronRight, Newspaper } from "lucide-react";

export default function AllNewsPage() {
  const allNews = NewsService.getAll();

  return (
    <>
      <Header />
      <BreakingNews />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-red-600 transition">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-bold uppercase">
            All News Archives
          </span>
        </nav>

        <div className="mb-10 border-b-2 border-gray-950 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white font-black">
              <Newspaper size={20} />
            </span>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-gray-950">
                Complete News Archive
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Browse our complete editorial catalog of reports and coverage.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-8 sm:grid-cols-2">
            {allNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>

          <Sidebar news={allNews} />
        </div>
      </main>

      <Footer />
    </>
  );
}
