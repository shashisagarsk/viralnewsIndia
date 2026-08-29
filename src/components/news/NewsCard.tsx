"use client";

import Image from "next/image";
import Link from "next/link";
import { News } from "../../types/news";
import { useLanguage } from "@/src/context/LanguageContext";

interface NewsCardProps {
  news: News;
  horizontal?: boolean;
}

export default function NewsCard({
  news,
  horizontal = false,
}: NewsCardProps) {
  const { translateNews, formatShortDate, t } = useLanguage();
  const localizedNews = translateNews(news);

  if (horizontal) {
    return (
      <article className="group flex gap-4 border-b border-gray-100 pb-4">
        <Link
          href={`/news/${localizedNews.slug}`}
          className="relative h-20 w-28 shrink-0 overflow-hidden rounded bg-gray-100"
        >
          <Image
            src={localizedNews.image}
            alt={localizedNews.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="112px"
          />
        </Link>

        <div className="flex-1">
          <Link
            href={`/category/${localizedNews.category.toLowerCase()}`}
            className="text-[10px] font-bold uppercase tracking-wider text-red-600 hover:underline"
          >
            {localizedNews.category}
          </Link>

          <Link href={`/news/${localizedNews.slug}`}>
            <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-snug text-gray-900 transition group-hover:text-red-600">
              {localizedNews.title}
            </h3>
          </Link>

          <p className="mt-1 text-[11px] text-gray-400">
            {formatShortDate(localizedNews.date)}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between">
      <div>
        <Link
          href={`/news/${localizedNews.slug}`}
          className="relative block aspect-[16/10] overflow-hidden rounded-sm bg-gray-100"
        >
          <Image
            src={localizedNews.image}
            alt={localizedNews.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {localizedNews.breaking && (
            <span className="absolute top-2 left-2 bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase text-white tracking-wider">
              {t("breaking")}
            </span>
          )}
        </Link>

        <div className="pt-3.5">
          <Link
            href={`/category/${localizedNews.category.toLowerCase()}`}
            className="text-[10px] font-bold uppercase tracking-wider text-red-600 hover:underline"
          >
            {localizedNews.category}
          </Link>

          <Link href={`/news/${localizedNews.slug}`}>
            <h3 className="mt-1.5 text-base sm:text-lg font-black leading-snug text-gray-950 transition group-hover:text-red-600">
              {localizedNews.title}
            </h3>
          </Link>

          {localizedNews.excerpt && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500">
              {localizedNews.excerpt}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 text-[11px] font-medium text-gray-400">
        {localizedNews.author} &nbsp; • &nbsp; {formatShortDate(localizedNews.date)}
      </div>
    </article>
  );
}