import { News } from "../../types/news";
import NewsCard from "./NewsCard";

interface NewsSectionProps {
  title: string;
  news: News[];
}

export default function NewsSection({
  title,
  news,
}: NewsSectionProps) {
  return (
    <section className="mt-14">
      <div className="mb-7 flex items-center justify-between border-b-2 border-gray-950">
        <h2 className="relative bg-gray-950 px-5 py-3 text-sm font-black uppercase tracking-wider text-white">
          {title}
        </h2>

        <a
          href="#"
          className="text-xs font-bold uppercase tracking-wide text-red-600"
        >
          View All →
        </a>
      </div>

      <div className="grid gap-7 md:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
}