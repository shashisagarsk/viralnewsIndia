import Image from "next/image";
import { News } from "../../types/news";

interface HeroNewsProps {
  news: News;
}

export default function HeroNews({ news }: HeroNewsProps) {
  return (
    <section className="relative overflow-hidden rounded-sm">
      <Image
        src={news.image}
        alt={news.title}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 66vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <div className="relative flex min-h-[480px] items-end p-6 md:min-h-[560px] md:p-10">
        <div className="max-w-3xl text-white">
          <span className="mb-4 inline-block bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
            {news.category}
          </span>

          <h2 className="text-3xl font-black leading-tight tracking-[-1px] md:text-5xl">
            {news.title}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-200 md:text-base">
            {news.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-3 text-xs text-gray-300">
            <span>{news.author}</span>
            <span>•</span>
            <span>{news.date}</span>
          </div>
        </div>
      </div>
    </section>
  );
}