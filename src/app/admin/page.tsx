"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
import { News } from "@/src/types/news";
import { WebStory } from "@/src/types/story";
import {
  FileText,
  Zap,
  Star,
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  SlidersHorizontal,
  Smartphone,
  Eye,
  Flame,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"articles" | "stories">("articles");
  const [newsList, setNewsList] = useState<News[]>([]);
  const [storiesList, setStoriesList] = useState<WebStory[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deleteItem, setDeleteItem] = useState<{
    id: number;
    type: "article" | "story";
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Authentication check
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, loading, router]);

  // Fetch data
  const fetchData = async () => {
    setFetching(true);
    try {
      const [newsRes, storiesRes] = await Promise.all([
        fetch("/api/news", { cache: "no-store" }),
        fetch("/api/stories", { cache: "no-store" }),
      ]);

      const newsData = await newsRes.json();
      const storiesData = await storiesRes.json();

      if (newsData.success && Array.isArray(newsData.data)) {
        setNewsList(newsData.data);
      }
      if (storiesData.success && Array.isArray(storiesData.data)) {
        setStoriesList(storiesData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showToast("error", "Failed to fetch data from API");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle breaking/featured status directly
  const handleToggleFlag = async (
    item: News,
    field: "breaking" | "featured"
  ) => {
    try {
      const updatedValue = !item[field];
      const res = await fetch(`/api/news/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: updatedValue }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNewsList((prev) =>
          prev.map((n) => (n.id === item.id ? { ...n, [field]: updatedValue } : n))
        );
        showToast(
          "success",
          `Updated "${item.title.substring(0, 30)}..." ${field} status!`
        );
      } else {
        showToast("error", data.error || "Failed to update status");
      }
    } catch {
      showToast("error", "Network error updating article");
    }
  };

  // Handle deletion
  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);

    try {
      const endpoint =
        deleteItem.type === "article"
          ? `/api/news/${deleteItem.id}`
          : `/api/stories/${deleteItem.id}`;

      const res = await fetch(endpoint, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (deleteItem.type === "article") {
          setNewsList((prev) => prev.filter((n) => n.id !== deleteItem.id));
        } else {
          setStoriesList((prev) => prev.filter((s) => s.id !== deleteItem.id));
        }
        showToast(
          "success",
          `${deleteItem.type === "article" ? "Article" : "Web Story"} deleted successfully`
        );
      } else {
        showToast("error", data.error || "Failed to delete item");
      }
    } catch {
      showToast("error", "Network error while deleting");
    } finally {
      setIsDeleting(false);
      setDeleteItem(null);
    }
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(newsList.map((n) => n.category));
    return ["all", ...Array.from(set)];
  }, [newsList]);

  // Filtered articles
  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat =
        selectedCategory === "all" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCat;
    });
  }, [newsList, searchTerm, selectedCategory]);

  // Filtered stories
  const filteredStories = useMemo(() => {
    return storiesList.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [storiesList, searchTerm]);

  // Metrics
  const stats = useMemo(() => {
    return {
      total: newsList.length,
      breaking: newsList.filter((n) => n.breaking).length,
      featured: newsList.filter((n) => n.featured).length,
      stories: storiesList.length,
      storyViews: storiesList.reduce((acc, s) => acc + (s.views || 0), 0),
    };
  }, [newsList, storiesList]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent mx-auto" />
          <p className="mt-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Loading Newsroom Desk...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-2xl transition-all ${
            toastMessage.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={24} />
            </div>
            <h3 className="mt-4 text-lg font-black text-gray-950">
              Delete {deleteItem.type === "article" ? "Article" : "Web Story"}?
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              Are you sure you want to delete &ldquo;{deleteItem.title}&rdquo;? This action is permanent.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteItem(null)}
                disabled={isDeleting}
                className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
              Live Control
            </span>
            <h1 className="text-2xl font-black text-gray-950 sm:text-3xl">
              Editorial Newsroom Desk
            </h1>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Publish articles, curate breaking tickers, and build multi-slide visual Web Stories.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchData}
            disabled={fetching}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
            title="Refresh feeds"
          >
            <RefreshCw
              size={13}
              className={fetching ? "animate-spin text-red-600" : ""}
            />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/stories/editor"
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-700 shadow-sm hover:bg-red-100 transition"
          >
            <Smartphone size={14} className="text-red-600" />
            <span>Create Story</span>
          </Link>

          <Link
            href="/admin/editor"
            className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/30 transition hover:bg-red-700"
          >
            <Plus size={15} />
            <span>Write Article</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Articles
            </span>
            <FileText size={16} className="text-gray-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-gray-950">
            {stats.total}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Breaking Tickers
            </span>
            <Zap size={16} className="text-red-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-red-600">
            {stats.breaking}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Web Stories
            </span>
            <Smartphone size={16} className="text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600">
            {stats.stories}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Story Views
            </span>
            <Eye size={16} className="text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-blue-600">
            {stats.storyViews.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="mb-6 flex items-center gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("articles")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition ${
            activeTab === "articles"
              ? "border-red-600 text-red-600"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <FileText size={15} />
          <span>Articles & Headlines ({newsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("stories")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition ${
            activeTab === "stories"
              ? "border-red-600 text-red-600"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Smartphone size={15} />
          <span>Visual Web Stories ({storiesList.length})</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder={
              activeTab === "articles"
                ? "Search articles by title, excerpt, author..."
                : "Search stories by title or author..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-gray-900 placeholder-gray-400 focus:border-red-600 focus:outline-none"
          />
        </div>

        {activeTab === "articles" && (
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-700 focus:border-red-600 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: ARTICLES TABLE */}
      {activeTab === "articles" && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 bg-gray-50/80 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3.5">Article Details</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5 text-center">Breaking</th>
                  <th className="px-4 py-3.5 text-center">Featured</th>
                  <th className="px-4 py-3.5">Author & Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredNews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      No news articles found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredNews.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-gray-100">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="max-w-md">
                            <Link
                              href={`/news/${item.slug}`}
                              target="_blank"
                              className="font-bold text-gray-950 hover:text-red-600 transition line-clamp-1"
                            >
                              {item.title}
                            </Link>
                            <p className="mt-0.5 text-[11px] text-gray-400 line-clamp-1">
                              {item.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-gray-700">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFlag(item, "breaking")}
                          className={`rounded-full p-1 transition ${
                            item.breaking
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                          title="Toggle Breaking News Ticker"
                        >
                          <Zap size={14} className={item.breaking ? "fill-red-600" : ""} />
                        </button>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFlag(item, "featured")}
                          className={`rounded-full p-1 transition ${
                            item.featured
                              ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                          title="Toggle Hero Spotlight"
                        >
                          <Star size={14} className={item.featured ? "fill-amber-500" : ""} />
                        </button>
                      </td>

                      <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{item.author}</div>
                        <div className="text-[10px] text-gray-400">{item.date}</div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/news/${item.slug}`}
                            target="_blank"
                            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                            title="View live article"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <Link
                            href={`/admin/editor?id=${item.id}`}
                            className="rounded p-1.5 text-blue-600 hover:bg-blue-50"
                            title="Edit article"
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteItem({
                                id: item.id,
                                type: "article",
                                title: item.title,
                              })
                            }
                            className="rounded p-1.5 text-red-500 hover:bg-red-50"
                            title="Delete article"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: WEB STORIES TABLE */}
      {activeTab === "stories" && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 bg-gray-50/80 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3.5">Web Story</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5 text-center">Slides</th>
                  <th className="px-4 py-3.5 text-center">Views</th>
                  <th className="px-4 py-3.5">Author & Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      No web stories found. Click &ldquo;Create Story&rdquo; to publish your first visual story!
                    </td>
                  </tr>
                ) : (
                  filteredStories.map((story) => (
                    <tr key={story.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-gray-900 border border-gray-200">
                            <Image
                              src={story.coverImage}
                              alt={story.title}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <span className="absolute bottom-0.5 left-0.5 text-[8px] font-black text-white px-1">
                              {story.slides?.length || 1}p
                            </span>
                          </div>
                          <div className="max-w-md">
                            <Link
                              href={`/stories/${story.slug}`}
                              target="_blank"
                              className="font-bold text-gray-950 hover:text-red-600 transition line-clamp-1"
                            >
                              {story.title}
                            </Link>
                            <p className="mt-0.5 text-[11px] text-gray-400">
                              /stories/{story.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-red-700">
                          {story.category}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center font-bold text-gray-900">
                        {story.slides?.length || 0} slides
                      </td>

                      <td className="px-4 py-4 text-center font-bold text-blue-600">
                        {story.views?.toLocaleString() || 0}
                      </td>

                      <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{story.author}</div>
                        <div className="text-[10px] text-gray-400">{story.date}</div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/stories/${story.slug}`}
                            target="_blank"
                            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                            title="Play Web Story"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <Link
                            href={`/admin/stories/editor?id=${story.id}`}
                            className="rounded p-1.5 text-blue-600 hover:bg-blue-50"
                            title="Edit Web Story"
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteItem({
                                id: story.id,
                                type: "story",
                                title: story.title,
                              })
                            }
                            className="rounded p-1.5 text-red-500 hover:bg-red-50"
                            title="Delete Web Story"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
