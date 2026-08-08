import Header from "../components/layout/Header";
import BreakingNews from "../components/layout/BreakingNews";
import Footer from "../components/layout/Footer";

import HeroNews from "../components/news/Heronews";
import NewsCard from "../components/news/NewsCard";
import NewsSection from "../components/news/NewsSection";
import Sidebar from "../components/news/Sidebar";

import { newsData } from "../lib/news";

export default function Home() {
  const hero = newsData[0];
  const secondaryNews = newsData.slice(1, 3);
  const latestNews = newsData.slice(2, 5);
  const technologyNews = newsData.slice(1, 4);

  return (
    <>
      <Header />

      <BreakingNews />

      <main className="mx-auto max-w-7xl px-4">
        {/* HERO AREA */}
        <section className="grid gap-6 py-8 lg:grid-cols-[2fr_1fr]">
          <HeroNews news={hero} />

          <div className="grid gap-6">
            {secondaryNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </section>

        {/* CONTENT + SIDEBAR */}
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <NewsSection title="Latest News" news={latestNews} />

            <NewsSection title="Technology" news={technologyNews} />

            {/* FULL WIDTH FEATURE */}
            <section className="mt-14 bg-gray-950 p-7 text-white md:p-10">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-wide">
                  Editor's Choice
                </h2>

                <span className="text-xs text-gray-500">
                  Handpicked stories
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {newsData.slice(3, 5).map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-5 md:grid-cols-2"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                        {item.category}
                      </span>

                      <h3 className="mt-2 text-xl font-bold leading-6">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <Sidebar news={newsData} />
        </section>
      </main>

      <Footer />
    </>
  );
}