import Image from "next/image";
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
      <article className="group flex gap-4 border-b border-gray-200 pb-5">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="128px"
          />
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
            {news.category}
          </span>

          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-gray-900 transition group-hover:text-red-600">
            {news.title}
          </h3>

          <p className="mt-2 text-[11px] text-gray-400">
            {news.date}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="pt-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
          {news.category}
        </span>

        <h3 className="mt-2 text-xl font-bold leading-6 text-gray-950 transition group-hover:text-red-600">
          {news.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {news.excerpt}
        </p>

        <div className="mt-3 text-[11px] font-medium text-gray-400">
          {news.author} &nbsp; • &nbsp; {news.date}
        </div>
      </div>
    </article>
  );
}