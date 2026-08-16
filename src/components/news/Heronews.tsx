import Image from "next/image";
import Link from "next/link";
import { News } from "../../types/news";

interface HeroNewsProps {
  news: News;
}

export default function HeroNews({ news }: HeroNewsProps) {
  return (
    <article className="group relative h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] w-full overflow-hidden rounded-xl bg-gray-950 shadow-xl">
      <Link
        href={`/news/${news.slug}`}
        className="relative flex h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] w-full flex-col justify-end p-5 sm:p-7 md:p-9"
      >
        <Image
          src={news.image}
          alt={news.title}
          fill
          priority
          className="object-cover object-center transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-3xl text-white">
          <span className="mb-3 inline-block rounded bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
            {news.category}
          </span>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight transition group-hover:text-red-400">
            {news.title}
          </h2>

          <p className="mt-3 line-clamp-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-gray-200">
            {news.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs text-gray-300 font-medium">
            <span>{news.author}</span>
            <span>•</span>
            <span>{news.date}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}