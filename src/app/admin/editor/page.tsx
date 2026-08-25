"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
import { slugify, formatDate } from "@/src/lib/utils";
import {
  ArrowLeft,
  Save,
  Zap,
  Star,
  Image as ImageIcon,
  Eye,
  Edit3,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Minus,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Tag,
  User,
  Calendar,
  UploadCloud,
  Loader2,
  Cloud,
} from "lucide-react";

const PRESET_IMAGES = [
  {
    name: "India / Governance",
    url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Technology & AI",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Business & Finance",
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Science & Space",
    url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Sports & Stadium",
    url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Lifestyle & Cities",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=85",
  },
];

const DEFAULT_CATEGORIES = [
  "India",
  "World",
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
  "Lifestyle",
  "Science",
];

function EditorContent() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const isEditMode = Boolean(editId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [category, setCategory] = useState("India");
  const [customCategory, setCustomCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [author, setAuthor] = useState("Staff Reporter");
  const [date, setDate] = useState(formatDate());
  const [featured, setFeatured] = useState(false);
  const [breaking, setBreaking] = useState(false);
  const [tagsInput, setTagsInput] = useState("News, India, Latest");

  // UI State
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Auth Guard
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, authLoading, router]);

  // Set default author name when user loads
  useEffect(() => {
    if (user?.name && !isEditMode) {
      setAuthor(user.name);
    }
  }, [user, isEditMode]);

  // If editing, load existing article
  useEffect(() => {
    if (isEditMode && editId) {
      const fetchArticle = async () => {
        try {
          const res = await fetch(`/api/news/${editId}`);
          const data = await res.json();
          if (data.success && data.data) {
            const art = data.data;
            setTitle(art.title || "");
            setSlug(art.slug || "");
            setAutoSlug(false);
            if (DEFAULT_CATEGORIES.includes(art.category)) {
              setCategory(art.category);
            } else {
              setCategory("custom");
              setCustomCategory(art.category);
            }
            setExcerpt(art.excerpt || "");
            setContent(art.content || "");
            setImage(art.image || PRESET_IMAGES[0].url);
            setAuthor(art.author || "Staff Reporter");
            setDate(art.date || formatDate());
            setFeatured(Boolean(art.featured));
            setBreaking(Boolean(art.breaking));
            setTagsInput(Array.isArray(art.tags) ? art.tags.join(", ") : "");
          } else {
            showToast("error", "Article not found");
          }
        } catch (error) {
          console.error("Error loading article:", error);
          showToast("error", "Failed to fetch article details");
        } finally {
          setInitialLoading(false);
        }
      };

      fetchArticle();
    }
  }, [isEditMode, editId]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync slug with title if autoSlug enabled
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  // Cloudinary File Upload Handler
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("error", "Please upload an image file (JPG, PNG, WEBP, GIF)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast("error", "File size must be under 10MB");
      return;
    }

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.url) {
        setImage(data.url);
        showToast(
          "success",
          data.isCloudinary
            ? "Image uploaded to Cloudinary CDN!"
            : "Image uploaded and stored successfully!"
        );
      } else {
        showToast("error", data.error || "Image upload failed");
      }
    } catch {
      showToast("error", "Network error during image upload");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Content formatting helper
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById(
      "content-textarea"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || "text";
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent =
      content.substring(0, start) +
      replacement +
      content.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  // Submit article
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast("error", "Title is required");
      return;
    }

    const finalCategory =
      category === "custom" ? customCategory.trim() : category;
    if (!finalCategory) {
      showToast("error", "Please provide a category");
      return;
    }

    setIsSubmitting(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      slug: slug.trim() ? slugify(slug) : slugify(title),
      category: finalCategory,
      excerpt: excerpt.trim(),
      content: content.trim(),
      image: image.trim(),
      author: author.trim(),
      date: date.trim() || formatDate(),
      featured,
      breaking,
      tags,
    };

    try {
      const url = isEditMode ? `/api/news/${editId}` : "/api/news";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(
          "success",
          isEditMode
            ? "Article updated successfully!"
            : "Article published live!"
        );

        setTimeout(() => {
          router.push("/admin");
        }, 1200);
      } else {
        showToast("error", data.error || "Failed to save article");
      }
    } catch {
      showToast("error", "Network error saving article");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !isAuthenticated || initialLoading) {
    if (!isAuthenticated) return null;
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
          <p className="mt-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            {initialLoading ? "Loading Article Content..." : "Verifying Admin..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Toast Alert */}
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

      {/* Top Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-sm transition hover:bg-gray-100"
            title="Back to Dashboard"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-950">
              {isEditMode ? "Edit News Article" : "Write & Publish Article"}
            </h1>
            <p className="text-xs text-gray-500">
              {isEditMode
                ? "Update headlines, Cloudinary media, or broadcast flags."
                : "Craft breaking headlines and store article media in Cloudinary."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEditMode && slug && (
            <Link
              href={`/news/${slug}`}
              target="_blank"
              className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ExternalLink size={13} />
              <span>View Live</span>
            </Link>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/30 transition hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save size={14} />
            )}
            <span>{isEditMode ? "Save Changes" : "Publish Live"}</span>
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Left Column: Core Content & Editor */}
        <div className="space-y-6">
          {/* Article Title */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Article Headline / Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Government Announces Historic Infrastructure Package Across Major Metro Hubs"
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-base font-bold text-gray-950 placeholder-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />

            {/* Slug Info */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span className="truncate">
                URL Path: <strong className="text-gray-700">/news/{slug || "slug-preview"}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setAutoSlug(!autoSlug);
                  if (!autoSlug) setSlug(slugify(title));
                }}
                className="text-[11px] text-red-600 hover:underline shrink-0 ml-2"
              >
                {autoSlug ? "Manual Slug" : "Auto-Sync with Title"}
              </button>
            </div>
            {!autoSlug && (
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="custom-slug-url"
                className="mt-2 w-full rounded-md border border-gray-200 p-2 text-xs font-mono text-gray-800"
              />
            )}
          </div>

          {/* Excerpt / Summary */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Summary / Excerpt
              </label>
              <span className="text-[11px] text-gray-400">
                {excerpt.length} characters
              </span>
            </div>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A concise 1-2 sentence overview displayed in news card summaries and social previews..."
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 text-xs leading-relaxed text-gray-900 placeholder-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>

          {/* Rich Content Editor */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "write"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Edit3 size={13} />
                  Write & Markdown
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "preview"
                      ? "bg-red-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Eye size={13} />
                  Live Preview
                </button>
              </div>

              <span className="text-[11px] text-gray-400">
                {content.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            {/* Formatting Toolbar (Only in write mode) */}
            {activeTab === "write" && (
              <div className="mt-3 flex flex-wrap items-center gap-1 border-b border-gray-100 pb-3 text-gray-600">
                <button
                  type="button"
                  onClick={() => insertFormatting("## ", "\n")}
                  className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-900"
                  title="Heading 2"
                >
                  <Heading2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("### ", "\n")}
                  className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-900"
                  title="Heading 3"
                >
                  <Heading3 size={16} />
                </button>
                <div className="h-4 w-px bg-gray-200 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting("**", "**")}
                  className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-900"
                  title="Bold"
                >
                  <Bold size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("*", "*")}
                  className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-900"
                  title="Italic"
                >
                  <Italic size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("> ", "\n")}
                  className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-900"
                  title="Blockquote"
                >
                  <Quote size={16} />
                </button>
                <div className="h-4 w-px bg-gray-200 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting("* ", "\n")}
                  className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-900"
                  title="Bullet List"
                >
                  <List size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("1. ", "\n")}
                  className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-900"
                  title="Numbered List"
                >
                  <ListOrdered size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("\n---\n\n")}
                  className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-900"
                  title="Divider Line"
                >
                  <Minus size={16} />
                </button>
              </div>
            )}

            {/* Editor Textarea vs Live Preview */}
            <div className="mt-3 min-h-[380px]">
              {activeTab === "write" ? (
                <textarea
                  id="content-textarea"
                  rows={16}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`Write the full article body here...\n\nSupports standard markdown:\n## Subheading\n* Bullet item 1\n* Bullet item 2\n\n> "Important quote from spokesperson"\n\nParagraph text explaining detailed facts...`}
                  className="w-full rounded-lg border border-gray-200 p-4 font-mono text-xs leading-relaxed text-gray-900 placeholder-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6">
                  {content ? (
                    <div className="prose prose-sm max-w-none text-gray-800 space-y-4">
                      {content.split("\n\n").map((block, idx) => {
                        if (block.startsWith("## ")) {
                          return (
                            <h2
                              key={idx}
                              className="text-xl font-black text-gray-950 pt-2 border-b border-gray-200 pb-1"
                            >
                              {block.replace("## ", "")}
                            </h2>
                          );
                        }
                        if (block.startsWith("### ")) {
                          return (
                            <h3
                              key={idx}
                              className="text-lg font-bold text-gray-900 pt-1"
                            >
                              {block.replace("### ", "")}
                            </h3>
                          );
                        }
                        if (block.startsWith("> ")) {
                          return (
                            <blockquote
                              key={idx}
                              className="border-l-4 border-red-600 bg-red-50/60 p-4 italic text-gray-700 font-serif"
                            >
                              {block.replace("> ", "")}
                            </blockquote>
                          );
                        }
                        if (block.startsWith("* ") || block.startsWith("- ")) {
                          const items = block
                            .split("\n")
                            .map((i) => i.replace(/^[\*\-]\s+/, ""));
                          return (
                            <ul
                              key={idx}
                              className="list-disc list-inside space-y-1 text-sm text-gray-700"
                            >
                              {items.map((item, iIdx) => (
                                <li key={iIdx}>{item}</li>
                              ))}
                            </ul>
                          );
                        }
                        if (/^\d+\.\s+/.test(block)) {
                          const items = block
                            .split("\n")
                            .map((i) => i.replace(/^\d+\.\s+/, ""));
                          return (
                            <ol
                              key={idx}
                              className="list-decimal list-inside space-y-1 text-sm text-gray-700"
                            >
                              {items.map((item, iIdx) => (
                                <li key={iIdx}>{item}</li>
                              ))}
                            </ol>
                          );
                        }
                        if (block.trim() === "---") {
                          return (
                            <hr
                              key={idx}
                              className="my-6 border-t border-gray-200"
                            />
                          );
                        }
                        return (
                          <p
                            key={idx}
                            className="text-sm leading-relaxed text-gray-700"
                          >
                            {block}
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-xs text-gray-400">
                      No content written yet. Switch to "Write" tab to begin composing.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Flags & Cloudinary Image Upload */}
        <div className="space-y-6">
          {/* Promotion Toggles */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
              Broadcast Settings
            </h3>

            {/* Breaking News Toggle */}
            <label className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 transition">
              <input
                type="checkbox"
                checked={breaking}
                onChange={(e) => setBreaking(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-red-300 text-red-600 focus:ring-red-500"
              />
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 uppercase tracking-wide">
                  <Zap size={14} className="fill-red-600" />
                  Breaking News Ticker
                </div>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Instantly highlights this story across the top breaking news banner.
                </p>
              </div>
            </label>

            {/* Featured Hero Toggle */}
            <label className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg border border-amber-100 bg-amber-50/50 hover:bg-amber-50 transition">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wide">
                  <Star size={14} className="fill-amber-500" />
                  Featured / Hero Story
                </div>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Promotes this article to the primary visual hero slot on the homepage.
                </p>
              </div>
            </label>
          </div>

          {/* Category Selector */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              News Category <span className="text-red-600">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-white p-2.5 text-xs font-semibold text-gray-800 focus:border-red-600 focus:outline-none"
            >
              {DEFAULT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="custom">+ Custom Category</option>
            </select>

            {category === "custom" && (
              <input
                type="text"
                required
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter custom category name..."
                className="mt-2 w-full rounded-lg border border-gray-200 p-2.5 text-xs text-gray-900"
              />
            )}
          </div>

          {/* Cloudinary Media Storage & Cover Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Cloud size={15} className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Cloudinary Media Storage
                </span>
              </div>
              <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                Cloud CDN
              </span>
            </div>

            {/* Drag & Drop Cloudinary Upload Zone */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50/50"
                    : isUploadingImage
                    ? "border-gray-300 bg-gray-50 opacity-80"
                    : "border-gray-200 bg-gray-50/70 hover:border-red-500 hover:bg-red-50/20"
                }`}
              >
                {isUploadingImage ? (
                  <div className="py-2 text-center">
                    <Loader2 size={24} className="mx-auto animate-spin text-blue-600" />
                    <p className="mt-2 text-xs font-bold text-gray-700">
                      Uploading to Cloud Storage...
                    </p>
                    <p className="text-[10px] text-gray-400">Optimizing resolution & web delivery</p>
                  </div>
                ) : (
                  <>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <UploadCloud size={20} />
                    </div>
                    <p className="mt-2 text-xs font-bold text-gray-800">
                      Click to upload or drag & drop image
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray-400">
                      Direct Cloudinary CDN upload (PNG, JPG, WEBP up to 10MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Direct URL Input */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                Or enter image URL directly:
              </label>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://res.cloudinary.com/... or https://..."
                className="w-full rounded-lg border border-gray-200 p-2.5 text-xs text-gray-900 placeholder-gray-400 focus:border-red-600 focus:outline-none"
              />
            </div>

            {/* Quick Unsplash Preset Gallery */}
            <div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 mb-2">
                <Sparkles size={12} className="text-amber-500" />
                Quick Editorial Presets:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`truncate rounded border px-2 py-1 text-left text-[10px] font-medium transition ${
                      image === preset.url
                        ? "border-red-600 bg-red-50 text-red-700 font-bold"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Image Preview */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <div className="relative aspect-[16/9] w-full">
                {image ? (
                  <Image
                    src={image}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    <ImageIcon size={24} />
                  </div>
                )}
              </div>
              <div className="p-2 text-center text-[10px] font-medium text-gray-500">
                16:9 Display Aspect Ratio
              </div>
            </div>
          </div>

          {/* Author & Publication Metadata */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
              Metadata
            </h3>

            {/* Author */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                <User size={13} />
                Author Byline
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="mt-1.5 w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-900"
              />
            </div>

            {/* Publication Date */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                <Calendar size={13} />
                Display Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Aug 16, 2026"
                className="mt-1.5 w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-900"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                <Tag size={13} />
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="India, Economy, Tech"
                className="mt-1.5 w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-900"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AdminEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
