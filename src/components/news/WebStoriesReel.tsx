"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { WebStory } from "@/src/types/story";
import {
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Play,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

interface WebStoriesReelProps {
  stories: WebStory[];
  title?: string;
  subtitle?: string;
}

export default function WebStoriesReel({
  stories,
  title,
  subtitle,
}: WebStoriesReelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { translateStory, formatShortDate, t } = useLanguage();

  const sectionTitle = title || t("visualWebStories");
  const sectionSubtitle = subtitle || t("webStoriesSub");

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!stories || stories.length === 0) return null;

  return (
    <section className="my-10 rounded-2xl border border-gray-900 bg-gradient-to-b from-gray-950 via-black to-gray-950 p-5 sm:p-8 shadow-2xl text-white">
      {/* Header with Title & Scroll Arrows */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 shadow-inner">
            <Smartphone size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-black uppercase tracking-wide text-white">
                {sectionTitle}
              </h2>
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                {t("storiesBadge")}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-gray-400">{sectionSubtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-400 hover:border-red-600 hover:text-white transition shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-400 hover:border-red-600 hover:text-white transition shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 9:16 Visual Stories Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 pt-1 scrollbar-none scroll-smooth"
      >
        {stories.map((rawStory) => {
          const story = translateStory(rawStory);

          return (
            <Link
              key={story.id}
              href={`/stories/${rawStory.slug}`}
              className="group relative flex h-[290px] w-[170px] sm:h-[320px] sm:w-[190px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border-2 border-transparent p-3.5 transition-all duration-300 hover:border-red-500 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(220,38,38,0.35)]"
            >
              {/* Story Background Image */}
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 170px, 190px"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60 transition group-hover:via-black/20" />

              {/* Top Badges: Category + Slide Count */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="rounded bg-red-600/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                  {story.category}
                </span>

                <span className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold text-gray-300 border border-white/10">
                  <Layers size={10} className="text-red-400" />
                  <span>{story.slides?.length || 1}</span>
                </span>
              </div>

              {/* Center Play Icon on Hover */}
              <div className="relative z-10 my-auto flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-xl shadow-red-600/50 scale-90 transition-transform group-hover:scale-100">
                  <Play size={18} className="fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Title & Author */}
              <div className="relative z-10">
                <h3 className="line-clamp-3 text-xs sm:text-sm font-black leading-snug text-white drop-shadow-md transition group-hover:text-red-300">
                  {story.title}
                </h3>
                <p className="mt-1.5 text-[10px] font-medium text-gray-300 drop-shadow">
                  {formatShortDate(story.date)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
