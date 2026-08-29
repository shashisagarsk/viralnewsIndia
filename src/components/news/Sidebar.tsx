"use client";

import Link from "next/link";
import { News } from "../../types/news";
import NewsCard from "./NewsCard";
import { Flame, Clock } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

interface SidebarProps {
  news: News[];
}

export default function Sidebar({ news }: SidebarProps) {
  const { translateNews, formatShortDate, t } = useLanguage();

  return (
    <aside>
      {/* Advertisement Banner */}
      <div className="mb-8 flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center p-4">
        <span className="text-[10px] font-black uppercase tracking-[3px] text-gray-400">
          {t("advertisement")}
        </span>
        <span className="mt-1 text-xs font-semibold text-gray-500">
          {t("adSlotText")}
        </span>
      </div>

      {/* Popular News */}
      <div className="border-t-2 border-gray-950 pt-4">
        <div className="mb-5 flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-gray-950">
          <Flame size={16} className="text-red-600" />
          <span>{t("popularNews")}</span>
        </div>

        <div className="space-y-4">
          {news.slice(0, 4).map((rawItem, index) => {
            const item = translateNews(rawItem);
            return (
              <div key={item.id} className="flex gap-3.5 items-start">
                <div className="text-2xl font-black text-gray-200 leading-none pt-0.5">
                  0{index + 1}
                </div>

                <div>
                  <Link
                    href={`/category/${rawItem.category.toLowerCase()}`}
                    className="text-[10px] font-bold uppercase text-red-600 hover:underline"
                  >
                    {item.category}
                  </Link>

                  <Link href={`/news/${item.slug}`}>
                    <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-snug text-gray-900 transition hover:text-red-600">
                      {item.title}
                    </h3>
                  </Link>

                  <span className="mt-1 block text-[10px] text-gray-400">
                    {formatShortDate(item.date)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Latest Stories */}
      <div className="mt-10 border-t-2 border-gray-950 pt-4">
        <div className="mb-5 flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-gray-950">
          <Clock size={16} className="text-gray-900" />
          <span>{t("latestUpdates")}</span>
        </div>

        <div className="space-y-4">
          {news.slice(1, 4).map((item) => (
            <NewsCard key={item.id} news={item} horizontal />
          ))}
        </div>
      </div>
    </aside>
  );
}