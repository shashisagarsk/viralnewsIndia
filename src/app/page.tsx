import Header from "../components/layout/Header";
import BreakingNews from "../components/layout/BreakingNews";
import Footer from "../components/layout/Footer";

import HeroNews from "../components/news/Heronews";
import NewsCard from "../components/news/NewsCard";
import NewsSection from "../components/news/NewsSection";
import Sidebar from "../components/news/Sidebar";
import WebStoriesReel from "../components/news/WebStoriesReel";
import EditorsChoice from "../components/news/EditorsChoice";

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
              <EditorsChoice news={editorsChoice} />
            )}
          </div>

          <Sidebar news={allNews} />
        </section>
      </main>

      <Footer />
    </>
  );
}