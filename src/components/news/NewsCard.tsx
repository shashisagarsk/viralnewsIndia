import Image from "next/image";
import Link from "next/link";
import { News } from "../../types/news";

interface NewsCardProps {
  news: News;
  horizontal?: boolean;
}

export default function NewsCard({
  news,
  horizontal = false,
}: NewsCardProps) {
  if (horizontal) {
    return (
      <article className="group flex gap-4 border-b border-gray-100 pb-4">
        <Link
          href={`/news/${news.slug}`}
          className="relative h-20 w-28 shrink-0 overflow-hidden rounded bg-gray-100"
        >
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="112px"
          />
        </Link>

        <div className="flex-1">
          <Link
            href={`/category/${news.category.toLowerCase()}`}
            className="text-[10px] font-bold uppercase tracking-wider text-red-600 hover:underline"
          >
            {news.category}
          </Link>

          <Link href={`/news/${news.slug}`}>
            <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-snug text-gray-900 transition group-hover:text-red-600">
              {news.title}
            </h3>
          </Link>

          <p className="mt-1 text-[11px] text-gray-400">
            {news.date}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between">
      <div>
        <Link
          href={`/news/${news.slug}`}
          className="relative block aspect-[16/10] overflow-hidden rounded-sm bg-gray-100"
        >
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {news.breaking && (
            <span className="absolute top-2 left-2 bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase text-white tracking-wider">
              Breaking
            </span>
          )}
        </Link>

        <div className="pt-3.5">
          <Link
            href={`/category/${news.category.toLowerCase()}`}
            className="text-[10px] font-bold uppercase tracking-wider text-red-600 hover:underline"
          >
            {news.category}
          </Link>

          <Link href={`/news/${news.slug}`}>
            <h3 className="mt-1.5 text-base sm:text-lg font-black leading-snug text-gray-950 transition group-hover:text-red-600">
              {news.title}
            </h3>
          </Link>

          {news.excerpt && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500">
              {news.excerpt}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 text-[11px] font-medium text-gray-400">
        {news.author} &nbsp; • &nbsp; {news.date}
      </div>
    </article>
  );
}