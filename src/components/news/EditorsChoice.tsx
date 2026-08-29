"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { News } from "@/src/types/news";
import { useLanguage } from "@/src/context/LanguageContext";

interface EditorsChoiceProps {
  news: News[];
}

export default function EditorsChoice({ news }: EditorsChoiceProps) {
  const { translateNews, formatShortDate, t } = useLanguage();

  if (!news || news.length === 0) return null;

  return (
    <section className="mt-14 rounded-2xl bg-gray-950 p-6 text-white sm:p-10 shadow-xl border border-gray-900">
      <div className="mb-7 flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-lg font-black uppercase tracking-wide text-white">
            {t("editorsChoice")}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {t("editorsChoiceSub")}
          </p>
        </div>

        <span className="rounded bg-red-600/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400 border border-red-500/30">
          {t("curated")}
        </span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {news.map((rawItem) => {
          const item = translateNews(rawItem);

          return (
            <article
              key={item.id}
              className="group grid gap-4 sm:grid-cols-2"
            >
              <Link
                href={`/news/${rawItem.slug}`}
                className="relative aspect-[16/10] sm:aspect-square overflow-hidden rounded-xl bg-gray-900"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 240px"
                />
              </Link>

              <div className="flex flex-col justify-center">
                <Link
                  href={`/category/${rawItem.category.toLowerCase()}`}
                  className="text-[10px] font-bold uppercase tracking-wider text-red-500 hover:underline"
                >
                  {item.category}
                </Link>

                <Link href={`/news/${rawItem.slug}`}>
                  <h3 className="mt-1.5 text-base font-bold leading-snug transition group-hover:text-red-400">
                    {item.title}
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-400">
                  {item.excerpt}
                </p>

                <span className="mt-3 text-[10px] text-gray-500">
                  {item.author} • {formatShortDate(item.date)}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
