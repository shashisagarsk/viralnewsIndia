"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/src/components/layout/Header";
import BreakingNews from "@/src/components/layout/BreakingNews";
import Footer from "@/src/components/layout/Footer";
import NewsCard from "@/src/components/news/NewsCard";
import { News } from "@/src/types/news";
import { Search, ChevronRight, FileText, Sparkles } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      const url = searchTerm
        ? `/api/news?search=${encodeURIComponent(searchTerm)}`
        : "/api/news";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setResults(data.data);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch(initialQuery);
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <>
      <Header />
      <BreakingNews />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-red-600 transition">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-bold uppercase">
            Search News
          </span>
        </nav>

        {/* Search Header Bar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-black text-gray-950 sm:text-3xl">
            Search Across ViralNewsIndia
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Find breaking stories, archived reports, and topic analysis.
          </p>

          <form onSubmit={handleSearchSubmit} className="mt-5 flex gap-2">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by keyword, headline, author, or topic..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/30 transition hover:bg-red-700"
            >
              <Search size={14} />
              <span>Search</span>
            </button>
          </form>

          {/* Quick tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold flex items-center gap-1">
              <Sparkles size={12} className="text-amber-500" />
              Trending Topics:
            </span>
            {["Economy", "AI", "Cricket", "Quantum", "Markets", "Cities"].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(tag);
                    performSearch(tag);
                  }}
                  className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-700 hover:border-red-600 hover:text-red-600 transition"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>

        {/* Results Section */}
        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between border-b-2 border-gray-950 pb-3">
            <h2 className="text-lg font-black uppercase tracking-wider text-gray-950">
              {query ? `Search Results for "${query}"` : "All Articles"}
            </h2>
            <span className="text-xs font-bold text-gray-500">
              {results.length} Stories Found
            </span>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
              <p className="mt-3 text-xs text-gray-500 font-medium">
                Searching news database...
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
              <FileText size={40} className="mx-auto text-gray-300" />
              <h3 className="mt-3 text-base font-bold text-gray-900">
                No matching stories found
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Try searching for different terms or browse our latest coverage.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
