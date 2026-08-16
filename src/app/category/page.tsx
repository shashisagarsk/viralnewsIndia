import React from "react";
import Link from "next/link";
import Header from "@/src/components/layout/Header";
import BreakingNews from "@/src/components/layout/BreakingNews";
import Footer from "@/src/components/layout/Footer";
import { NewsService } from "@/src/services/news.service";
import { Layers, ChevronRight, ArrowRight } from "lucide-react";

export default function CategoriesIndexPage() {
  const categories = NewsService.getCategories();
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
            Categories Directory
          </span>
        </nav>

        <div className="mb-10 border-b-2 border-gray-950 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white font-black">
              <Layers size={20} />
            </span>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-gray-950">
                Explore by Category
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Navigate through specialized beats and editorial desks.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = allNews.filter(
              (n) => n.category.toLowerCase() === cat.toLowerCase()
            ).length;
            const topArticle = allNews.find(
              (n) => n.category.toLowerCase() === cat.toLowerCase()
            );

            return (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-red-600 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black uppercase tracking-wide text-gray-950 group-hover:text-red-600 transition">
                    {cat}
                  </span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-600">
                    {count} {count === 1 ? "story" : "stories"}
                  </span>
                </div>

                {topArticle && (
                  <p className="mt-3 line-clamp-2 text-xs text-gray-500">
                    Latest: {topArticle.title}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red-600">
                  <span>Browse Section</span>
                  <ArrowRight size={13} className="transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
