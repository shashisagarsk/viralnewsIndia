import { News } from "../../types/news";
import NewsCard from "./NewsCard";

interface SidebarProps {
  news: News[];
}

export default function Sidebar({ news }: SidebarProps) {
  return (
    <aside>
      {/* Advertisement */}
      <div className="mb-8 flex h-44 items-center justify-center bg-gray-100 text-xs font-bold uppercase tracking-[3px] text-gray-400">
        Advertisement
      </div>

      {/* Popular */}
      <div className="border-t-2 border-gray-950 pt-4">
        <h2 className="mb-5 text-sm font-black uppercase tracking-wider">
          Popular News
        </h2>

        <div className="space-y-5">
          {news.slice(0, 4).map((item, index) => (
            <div key={item.id} className="flex gap-4">
              <div className="text-2xl font-black text-gray-200">
                0{index + 1}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-red-600">
                  {item.category}
                </span>

                <h3 className="mt-1 text-sm font-bold leading-5">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest */}
      <div className="mt-12 border-t-2 border-gray-950 pt-4">
        <h2 className="mb-5 text-sm font-black uppercase tracking-wider">
          Latest News
        </h2>

        <div className="space-y-5">
          {news.slice(1, 4).map((item) => (
            <NewsCard key={item.id} news={item} horizontal />
          ))}
        </div>
      </div>
    </aside>
  );
}