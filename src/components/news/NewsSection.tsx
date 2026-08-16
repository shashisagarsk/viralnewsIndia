import Link from "next/link";
import { News } from "../../types/news";
import NewsCard from "./NewsCard";

interface NewsSectionProps {
  title: string;
  news: News[];
  categoryLink?: string;
}

export default function NewsSection({
  title,
  news,
  categoryLink,
}: NewsSectionProps) {
  const linkHref = categoryLink || `/category/${title.toLowerCase()}`;

  return (
    <section className="mt-14">
      <div className="mb-7 flex items-center justify-between border-b-2 border-gray-950">
        <h2 className="relative bg-gray-950 px-5 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white">
          {title}
        </h2>

        <Link
          href={linkHref}
          className="text-xs font-bold uppercase tracking-wide text-red-600 transition hover:text-gray-950"
        >
          View All →
        </Link>
      </div>

      <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
}