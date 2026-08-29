"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/src/components/layout/Header";
import BreakingNews from "@/src/components/layout/BreakingNews";
import Footer from "@/src/components/layout/Footer";
import { WebStory } from "@/src/types/story";
import { useLanguage } from "@/src/context/LanguageContext";
import { Smartphone, Play, Layers, Eye, ChevronRight } from "lucide-react";

interface WebStoriesDirectoryClientProps {
  stories: WebStory[];
}

export default function WebStoriesDirectoryClient({
  stories,
}: WebStoriesDirectoryClientProps) {
  const { translateStory, formatShortDate, t } = useLanguage();

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
          <span className="text-gray-900 font-bold">{t("visualWebStories")}</span>
        </nav>

        {/* Hero Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-black to-red-950/40 p-8 sm:p-12 text-white shadow-2xl border border-gray-900 mb-10">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-400 mb-4">
              <Smartphone size={14} className="animate-pulse" />
              <span>{t("fullScreenVisualJournalism")}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              {t("visualWebStories")}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
              {t("visualStoriesDescription")}
            </p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {stories.map((rawStory) => {
            const story = translateStory(rawStory);

            return (
              <Link
                key={story.id}
                href={`/stories/${rawStory.slug}`}
                className="group relative flex aspect-[9/16] flex-col justify-between overflow-hidden rounded-2xl border-2 border-transparent p-4 transition-all duration-300 hover:border-red-500 hover:scale-[1.03] hover:shadow-[0_10px_35px_rgba(220,38,38,0.35)] shadow-md bg-gray-900"
              >
                {/* Cover Image */}
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60" />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                    {story.category}
                  </span>

                  <span className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold text-gray-300 border border-white/10">
                    <Layers size={10} className="text-red-400" />
                    <span>{story.slides?.length || 1}</span>
                  </span>
                </div>

                {/* Center Play Button on Hover */}
                <div className="relative z-10 my-auto flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-xl scale-90 transition-transform group-hover:scale-100">
                    <Play size={20} className="fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="relative z-10">
                  <h3 className="line-clamp-3 text-xs sm:text-sm font-black leading-snug text-white drop-shadow-md transition group-hover:text-red-300">
                    {story.title}
                  </h3>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-gray-300 font-medium drop-shadow">
                    <span>{formatShortDate(story.date)}</span>
                    <span className="flex items-center gap-1">
                      <Eye size={10} />
                      {story.views?.toLocaleString() || 0}
                    </span>
                  </div>
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
