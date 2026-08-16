import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/src/components/layout/Header";
import BreakingNews from "@/src/components/layout/BreakingNews";
import Footer from "@/src/components/layout/Footer";
import Sidebar from "@/src/components/news/Sidebar";
import NewsCard from "@/src/components/news/NewsCard";
import { NewsService } from "@/src/services/news.service";
import { estimateReadingTime, formatDate } from "@/src/lib/utils";
import {
  Calendar,
  User,
  Clock,
  Share2,
  Bookmark,
  ArrowLeft,
  Tag,
  ChevronRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = NewsService.getBySlug(slug);

  if (!article) {
    notFound();
  }

  const allNews = NewsService.getAll();
  const relatedNews = allNews
    .filter((n) => n.id !== article.id && n.category === article.category)
    .slice(0, 3);

  const fallbackRelated =
    relatedNews.length > 0
      ? relatedNews
      : allNews.filter((n) => n.id !== article.id).slice(0, 3);

  const readingTime = estimateReadingTime(article.content || article.excerpt);

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
          <Link
            href={`/category/${article.category.toLowerCase()}`}
            className="hover:text-red-600 transition uppercase font-semibold"
          >
            {article.category}
          </Link>
          <ChevronRight size={12} />
          <span className="truncate max-w-[280px] sm:max-w-md text-gray-900 font-bold">
            {article.title}
          </span>
        </nav>

        {/* Content Layout with Sidebar */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main Article Column */}
          <article>
            {/* Category Pill & Breaking Badge */}
            <div className="flex items-center gap-3">
              <Link
                href={`/category/${article.category.toLowerCase()}`}
                className="inline-block bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-red-700"
              >
                {article.category}
              </Link>

              {article.breaking && (
                <span className="inline-flex items-center gap-1 bg-red-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-red-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                  Breaking News
                </span>
              )}
            </div>

            {/* Article Headline */}
            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
              {article.title}
            </h1>

            {/* Subheading / Excerpt */}
            {article.excerpt && (
              <p className="mt-4 text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
                {article.excerpt}
              </p>
            )}

            {/* Author Byline & Meta */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-gray-200 py-3.5 text-xs text-gray-500">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <User size={14} className="text-red-600" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Calendar size={13} />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={13} />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-[11px] font-semibold text-gray-700 transition hover:border-red-600 hover:text-red-600"
                  title="Share Article"
                >
                  <Share2 size={12} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Featured Hero Cover Image */}
            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-sm bg-gray-100 sm:aspect-[16/9]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
            <p className="mt-2 text-right text-[11px] italic text-gray-400">
              Photo: Editorial Media Archives / ViralNewsIndia
            </p>

            {/* Rich Article Body */}
            <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-800">
              {article.content ? (
                article.content.split("\n\n").map((block, idx) => {
                  if (block.startsWith("## ")) {
                    return (
                      <h2
                        key={idx}
                        className="mt-8 text-2xl font-black tracking-tight text-gray-950 border-b border-gray-200 pb-2"
                      >
                        {block.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (block.startsWith("### ")) {
                    return (
                      <h3
                        key={idx}
                        className="mt-6 text-xl font-bold tracking-tight text-gray-900"
                      >
                        {block.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (block.startsWith("> ")) {
                    return (
                      <blockquote
                        key={idx}
                        className="my-6 border-l-4 border-red-600 bg-red-50/50 p-5 font-serif italic text-gray-800 text-lg leading-snug"
                      >
                        {block.replace("> ", "")}
                      </blockquote>
                    );
                  }
                  if (block.startsWith("* ") || block.startsWith("- ")) {
                    const items = block
                      .split("\n")
                      .map((i) => i.replace(/^[\*\-]\s+/, ""));
                    return (
                      <ul
                        key={idx}
                        className="my-4 list-disc list-inside space-y-2 text-gray-700 pl-2"
                      >
                        {items.map((item, iIdx) => (
                          <li key={iIdx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (/^\d+\.\s+/.test(block)) {
                    const items = block
                      .split("\n")
                      .map((i) => i.replace(/^\d+\.\s+/, ""));
                    return (
                      <ol
                        key={idx}
                        className="my-4 list-decimal list-inside space-y-2 text-gray-700 pl-2"
                      >
                        {items.map((item, iIdx) => (
                          <li key={iIdx}>{item}</li>
                        ))}
                      </ol>
                    );
                  }
                  if (block.trim() === "---") {
                    return (
                      <hr
                        key={idx}
                        className="my-8 border-t-2 border-gray-100"
                      />
                    );
                  }
                  return (
                    <p key={idx} className="text-gray-800 leading-8">
                      {block}
                    </p>
                  );
                })
              ) : (
                <p className="text-gray-700 leading-8">{article.excerpt}</p>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-gray-200 pt-6">
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-500 mr-2">
                  <Tag size={13} />
                  Tags:
                </span>
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-red-600 hover:text-white"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Author Box */}
            <div className="mt-10 flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-600 font-black text-xl text-white">
                {article.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-950">
                  Reported by {article.author}
                </h4>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Special Correspondent for ViralNewsIndia covering political, economic, and technological developments.
                </p>
              </div>
            </div>

            {/* Related News Section */}
            <section className="mt-14 border-t-2 border-gray-950 pt-8">
              <h3 className="text-lg font-black uppercase tracking-wider text-gray-950 mb-6">
                Related Stories in {article.category}
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {fallbackRelated.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <Sidebar news={allNews} />
        </div>
      </main>

      <Footer />
    </>
  );
}
