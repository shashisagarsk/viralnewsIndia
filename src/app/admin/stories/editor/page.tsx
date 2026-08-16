"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
import { WebStory, StorySlide } from "@/src/types/story";
import { slugify, formatDate } from "@/src/lib/utils";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  UploadCloud,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Smartphone,
  Eye,
  CheckCircle2,
  AlertCircle,
  MoveUp,
  MoveDown,
  Star,
  Link as LinkIcon,
} from "lucide-react";

const PRESET_STORY_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=85",
];

const DEFAULT_CATEGORIES = [
  "Technology",
  "Science",
  "India",
  "World",
  "Business",
  "Sports",
  "Entertainment",
  "Lifestyle",
];

function StoryEditorContent() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const isEditMode = Boolean(editId);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const slideInputRef = useRef<HTMLInputElement>(null);

  // Story Meta State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [category, setCategory] = useState("Technology");
  const [coverImage, setCoverImage] = useState(PRESET_STORY_IMAGES[0]);
  const [author, setAuthor] = useState("Visual Desk");
  const [featured, setFeatured] = useState(false);

  // Slides State
  const [slides, setSlides] = useState<StorySlide[]>([
    {
      id: "slide-1",
      image: PRESET_STORY_IMAGES[0],
      heading: "Key Headline for Slide 1",
      description: "Brief visual summary highlighting the core facts of this slide.",
    },
    {
      id: "slide-2",
      image: PRESET_STORY_IMAGES[1],
      heading: "Major Insight on Slide 2",
      description: "Detailed analysis and impact overview.",
      callToActionText: "Read Related Story →",
      callToActionUrl: "/news",
    },
  ]);

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [previewSlideIndex, setPreviewSlideIndex] = useState<number>(0);
  const [uploadingTarget, setUploadingTarget] = useState<"cover" | "slide" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
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

  useEffect(() => {
    if (user?.name && !isEditMode) {
      setAuthor(user.name);
    }
  }, [user, isEditMode]);

  // Load existing story
  useEffect(() => {
    if (isEditMode && editId) {
      const fetchStory = async () => {
        try {
          const res = await fetch(`/api/stories/${editId}`);
          const data = await res.json();
          if (data.success && data.data) {
            const story = data.data as WebStory;
            setTitle(story.title || "");
            setSlug(story.slug || "");
            setAutoSlug(false);
            setCategory(story.category || "Technology");
            setCoverImage(story.coverImage || PRESET_STORY_IMAGES[0]);
            setAuthor(story.author || "Visual Desk");
            setFeatured(Boolean(story.featured));
            if (Array.isArray(story.slides) && story.slides.length > 0) {
              setSlides(story.slides);
            }
          } else {
            showToast("error", "Story not found");
          }
        } catch {
          showToast("error", "Failed to load story details");
        } finally {
          setInitialLoading(false);
        }
      };

      fetchStory();
    }
  }, [isEditMode, editId]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  // Cloudinary Image Upload
  const handleUpload = async (file: File, target: "cover" | "slide") => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("error", "Please upload a valid image file");
      return;
    }

    setUploadingTarget(target);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.url) {
        if (target === "cover") {
          setCoverImage(data.url);
        } else {
          setSlides((prev) =>
            prev.map((s, idx) =>
              idx === activeSlideIndex ? { ...s, image: data.url } : s
            )
          );
        }
        showToast("success", "Image uploaded successfully to Cloudinary!");
      } else {
        showToast("error", data.error || "Upload failed");
      }
    } catch {
      showToast("error", "Network error during upload");
    } finally {
      setUploadingTarget(null);
    }
  };

  // Slide CRUD helpers
  const handleAddSlide = () => {
    const newSlide: StorySlide = {
      id: `slide-${Date.now()}`,
      image: coverImage || PRESET_STORY_IMAGES[0],
      heading: `Headline for Slide ${slides.length + 1}`,
      description: "Visual summary and details for this story slide.",
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
    setPreviewSlideIndex(slides.length);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) {
      showToast("error", "Story must have at least one slide");
      return;
    }
    const updated = slides.filter((_, idx) => idx !== index);
    setSlides(updated);
    const nextIdx = Math.max(0, index - 1);
    setActiveSlideIndex(nextIdx);
    setPreviewSlideIndex(nextIdx);
  };

  const handleMoveSlide = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;

    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    setSlides(updated);
    setActiveSlideIndex(targetIdx);
    setPreviewSlideIndex(targetIdx);
  };

  const handleUpdateCurrentSlide = (field: keyof StorySlide, val: string) => {
    setSlides((prev) =>
      prev.map((s, idx) =>
        idx === activeSlideIndex ? { ...s, [field]: val } : s
      )
    );
  };

  // Submit Story
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast("error", "Story title is required");
      return;
    }

    if (slides.length === 0) {
      showToast("error", "Please add at least one slide");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim() ? slugify(slug) : slugify(title),
      category: category.trim(),
      coverImage: coverImage.trim(),
      author: author.trim(),
      featured,
      slides,
    };

    try {
      const url = isEditMode ? `/api/stories/${editId}` : "/api/stories";
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
            ? "Web Story updated successfully!"
            : "Web Story published live!"
        );
        setTimeout(() => router.push("/admin"), 1200);
      } else {
        showToast("error", data.error || "Failed to save story");
      }
    } catch {
      showToast("error", "Network error saving web story");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeSlide = slides[activeSlideIndex] || slides[0];
  const previewSlide = slides[previewSlideIndex] || slides[0];

  if (authLoading || initialLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent mx-auto" />
          <p className="mt-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Loading Story Studio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
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

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={coverInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file, "cover");
        }}
      />
      <input
        type="file"
        ref={slideInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file, "slide");
        }}
      />

      {/* Header Bar */}
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
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-gray-950">
                {isEditMode ? "Edit Web Story" : "Visual Web Story Studio"}
              </h1>
              <span className="rounded bg-red-600/10 px-2 py-0.5 text-[10px] font-black uppercase text-red-600">
                Multi-Slide
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Build full-screen immersive tap-through stories with Cloudinary visual media.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEditMode && slug && (
            <Link
              href={`/stories/${slug}`}
              target="_blank"
              className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ExternalLink size={13} />
              <span>Preview Live Story</span>
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
            <span>{isEditMode ? "Save Changes" : "Publish Web Story"}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Workspace Grid */}
      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left Column: Story Settings & Multi-Slide Manager */}
        <div className="space-y-6">
          {/* Story Metadata Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
              Story Overview & Cover
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Story Title / Headline <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. 5 Autonomous AI Breakthroughs Transforming 2026"
                className="mt-1.5 w-full rounded-lg border border-gray-200 p-3 text-base font-bold text-gray-950 placeholder-gray-400 focus:border-red-600 focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white p-2.5 text-xs font-semibold text-gray-800 focus:border-red-600 focus:outline-none"
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Author Byline
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Visual Desk"
                  className="mt-1.5 w-full rounded-lg border border-gray-200 p-2.5 text-xs text-gray-900"
                />
              </div>
            </div>

            {/* Cover Image Uploader */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Story Cover Thumbnail
              </label>
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                  <Image
                    src={coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Cover image URL..."
                    className="w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploadingTarget === "cover"}
                    className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-gray-50 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-100"
                  >
                    {uploadingTarget === "cover" ? (
                      <Loader2 size={12} className="animate-spin text-blue-600" />
                    ) : (
                      <UploadCloud size={12} className="text-blue-600" />
                    )}
                    <span>Upload Cover to Cloudinary</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Selector & Tabs */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-red-600" />
                <h2 className="text-xs font-black uppercase tracking-wider text-gray-900">
                  Story Slides ({slides.length})
                </h2>
              </div>

              <button
                type="button"
                onClick={handleAddSlide}
                className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 transition"
              >
                <Plus size={13} />
                <span>Add Slide</span>
              </button>
            </div>

            {/* Slide Ribbon Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActiveSlideIndex(idx);
                    setPreviewSlideIndex(idx);
                  }}
                  className={`group relative flex h-20 w-14 shrink-0 flex-col justify-between overflow-hidden rounded-lg border-2 p-1 text-left transition ${
                    activeSlideIndex === idx
                      ? "border-red-600 shadow-md ring-2 ring-red-500/20"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="relative z-10 text-[10px] font-black text-white px-1">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Slide Customizer */}
            {activeSlide && (
              <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-red-600">
                    Editing Slide 0{activeSlideIndex + 1} of 0{slides.length}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleMoveSlide(activeSlideIndex, "up")}
                      disabled={activeSlideIndex === 0}
                      className="rounded p-1.5 text-gray-500 hover:bg-gray-200 disabled:opacity-30"
                      title="Move slide left/up"
                    >
                      <MoveUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveSlide(activeSlideIndex, "down")}
                      disabled={activeSlideIndex === slides.length - 1}
                      className="rounded p-1.5 text-gray-500 hover:bg-gray-200 disabled:opacity-30"
                      title="Move slide right/down"
                    >
                      <MoveDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(activeSlideIndex)}
                      className="rounded p-1.5 text-red-500 hover:bg-red-100 ml-2"
                      title="Delete this slide"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Slide Background Image */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Slide Vertical Image (9:16)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={activeSlide.image}
                      onChange={(e) =>
                        handleUpdateCurrentSlide("image", e.target.value)
                      }
                      placeholder="https://res.cloudinary.com/... or image URL"
                      className="w-full rounded-lg border border-gray-200 p-2.5 text-xs text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => slideInputRef.current?.click()}
                      disabled={uploadingTarget === "slide"}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100"
                    >
                      {uploadingTarget === "slide" ? (
                        <Loader2 size={14} className="animate-spin text-blue-600" />
                      ) : (
                        <UploadCloud size={14} />
                      )}
                      <span>Cloudinary Upload</span>
                    </button>
                  </div>
                </div>

                {/* Slide Heading */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Slide Headline / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={activeSlide.heading}
                    onChange={(e) =>
                      handleUpdateCurrentSlide("heading", e.target.value)
                    }
                    placeholder="Key takeaway headline..."
                    className="mt-1.5 w-full rounded-lg border border-gray-200 p-2.5 text-sm font-bold text-gray-950"
                  />
                </div>

                {/* Slide Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Slide Caption / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={activeSlide.description}
                    onChange={(e) =>
                      handleUpdateCurrentSlide("description", e.target.value)
                    }
                    placeholder="Brief 1-2 sentence description explaining this visual milestone..."
                    className="mt-1.5 w-full rounded-lg border border-gray-200 p-2.5 text-xs leading-relaxed text-gray-900"
                  />
                </div>

                {/* Optional Call to Action Button */}
                <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-gray-200">
                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-bold uppercase text-gray-600">
                      <LinkIcon size={11} />
                      CTA Button Text (Optional)
                    </label>
                    <input
                      type="text"
                      value={activeSlide.callToActionText || ""}
                      onChange={(e) =>
                        handleUpdateCurrentSlide("callToActionText", e.target.value)
                      }
                      placeholder="e.g. Read Full Article →"
                      className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-bold uppercase text-gray-600">
                      <ExternalLink size={11} />
                      CTA Link URL
                    </label>
                    <input
                      type="text"
                      value={activeSlide.callToActionUrl || ""}
                      onChange={(e) =>
                        handleUpdateCurrentSlide("callToActionUrl", e.target.value)
                      }
                      placeholder="e.g. /news/technology-ai-wave"
                      className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-xs text-gray-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Real-Time Phone Simulator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-900">
              <Smartphone size={15} className="text-red-600" />
              <span>Live Phone Simulator</span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">
              Slide 0{previewSlideIndex + 1}/{slides.length}
            </span>
          </div>

          {/* Smartphone Mockup Frame */}
          <div className="relative mx-auto h-[580px] w-[300px] overflow-hidden rounded-[36px] border-4 border-gray-900 bg-black shadow-2xl ring-1 ring-gray-800">
            {/* Phone Notch */}
            <div className="absolute top-2 left-1/2 z-30 h-4 w-24 -translate-x-1/2 rounded-full bg-gray-900" />

            {/* Slide Background Image */}
            <Image
              src={previewSlide.image}
              alt=""
              fill
              className="object-cover"
              sizes="300px"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/95" />

            {/* Segmented Top Progress Indicators */}
            <div className="absolute top-8 inset-x-3 z-20 flex gap-1">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"
                >
                  <div
                    className={`h-full bg-white transition-all duration-300 ${
                      idx <= previewSlideIndex ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Top Brand Tag in Simulator */}
            <div className="absolute top-12 left-4 z-20 flex items-center gap-2">
              <span className="rounded bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                {category}
              </span>
              <span className="text-[10px] font-bold text-white drop-shadow">
                ViralNewsIndia
              </span>
            </div>

            {/* Interactive Tap Zones */}
            <div
              onClick={() =>
                setPreviewSlideIndex((prev) => Math.max(0, prev - 1))
              }
              className="absolute inset-y-16 left-0 z-10 w-1/2 cursor-pointer"
              title="Tap left for previous slide"
            />
            <div
              onClick={() =>
                setPreviewSlideIndex((prev) =>
                  Math.min(slides.length - 1, prev + 1)
                )
              }
              className="absolute inset-y-16 right-0 z-10 w-1/2 cursor-pointer"
              title="Tap right for next slide"
            />

            {/* Bottom Caption & Content in Simulator */}
            <div className="absolute inset-x-0 bottom-4 z-20 p-4 text-white">
              <h3 className="text-base font-black leading-tight drop-shadow-md">
                {previewSlide.heading}
              </h3>
              <p className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-gray-200 drop-shadow">
                {previewSlide.description}
              </p>

              {previewSlide.callToActionText && (
                <div className="mt-3 block w-full rounded-lg bg-red-600 py-2 text-center text-[10px] font-extrabold uppercase tracking-wider text-white shadow">
                  {previewSlide.callToActionText}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1 text-xs text-gray-400">
            <button
              type="button"
              onClick={() =>
                setPreviewSlideIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={previewSlideIndex === 0}
              className="rounded p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-[11px] font-medium">Tap phone screen to test</span>
            <button
              type="button"
              onClick={() =>
                setPreviewSlideIndex((prev) =>
                  Math.min(slides.length - 1, prev + 1)
                )
              }
              disabled={previewSlideIndex === slides.length - 1}
              className="rounded p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AdminStoryEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
        </div>
      }
    >
      <StoryEditorContent />
    </Suspense>
  );
}
