import Link from "next/link";
import Image from "next/image";
import Header from "../components/layout/Header";
import BreakingNews from "../components/layout/BreakingNews";
import Footer from "../components/layout/Footer";

import HeroNews from "../components/news/Heronews";
import NewsCard from "../components/news/NewsCard";
import NewsSection from "../components/news/NewsSection";
import Sidebar from "../components/news/Sidebar";
import WebStoriesReel from "../components/news/WebStoriesReel";

import { NewsService } from "../services/news.service";
import { StoryService } from "../services/story.service";

export default function Home() {
  const allNews = NewsService.getAll();
  const allStories = StoryService.getAll();

  const hero = allNews.find((n) => n.featured) || allNews[0];
  const secondaryNews = allNews.filter((n) => n.id !== hero?.id).slice(0, 2);
  const latestNews = allNews.slice(0, 3);
  
  const techStories = allNews.filter(
    (n) => n.category.toLowerCase() === "technology"
  );
  const technologyNews = techStories.length > 0 ? techStories.slice(0, 3) : allNews.slice(1, 4);

  const editorsChoice = allNews.filter((n) => n.id !== hero?.id).slice(0, 2);

  return (
    <>
      <Header />
      <BreakingNews />

      <main className="mx-auto max-w-7xl px-4">
        {/* HERO AREA */}
        {hero && (
          <section className="grid gap-6 py-8 lg:grid-cols-[2fr_1fr]">
            <HeroNews news={hero} />

            <div className="grid gap-6">
              {secondaryNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </section>
        )}

        {/* VISUAL WEB STORIES REEL */}
        {allStories.length > 0 && (
          <WebStoriesReel stories={allStories} />
        )}

        {/* CONTENT + SIDEBAR */}
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <NewsSection
              title="Latest News"
              news={latestNews}
              categoryLink="/news"
            />

            <NewsSection
              title="Technology"
              news={technologyNews}
              categoryLink="/category/technology"
            />

            {/* FULL WIDTH EDITOR'S CHOICE */}
            {editorsChoice.length > 0 && (
              <section className="mt-14 rounded-sm bg-gray-950 p-6 text-white sm:p-10 shadow-xl">
                <div className="mb-7 flex items-center justify-between border-b border-gray-800 pb-4">
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wide text-white">
                      Editor&apos;s Choice
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Handpicked in-depth investigations
                    </p>
                  </div>

                  <span className="rounded bg-red-600/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400">
                    Curated
                  </span>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {editorsChoice.map((item) => (
                    <article
                      key={item.id}
                      className="group grid gap-4 sm:grid-cols-2"
                    >
                      <Link
                        href={`/news/${item.slug}`}
                        className="relative aspect-[16/10] sm:aspect-square overflow-hidden rounded bg-gray-900"
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
                          href={`/category/${item.category.toLowerCase()}`}
                          className="text-[10px] font-bold uppercase tracking-wider text-red-500 hover:underline"
                        >
                          {item.category}
                        </Link>

                        <Link href={`/news/${item.slug}`}>
                          <h3 className="mt-1.5 text-base font-bold leading-snug transition group-hover:text-red-400">
                            {item.title}
                          </h3>
                        </Link>

                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-400">
                          {item.excerpt}
                        </p>

                        <span className="mt-3 text-[10px] text-gray-500">
                          {item.author} • {item.date}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <Sidebar news={allNews} />
        </section>
      </main>

      <Footer />
    </>
  );
}