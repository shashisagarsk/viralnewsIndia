"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WebStory, StorySlide } from "@/src/types/story";
import {
  X,
  Play,
  Pause,
  Share2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Check,
  Smartphone,
  Layers,
} from "lucide-react";

interface StoryPlayerClientProps {
  story: WebStory;
  nextStory: WebStory | null;
}

const SLIDE_DURATION_MS = 5000;

export default function StoryPlayerClient({
  story,
  nextStory,
}: StoryPlayerClientProps) {
  const router = useRouter();
  const slides = story.slides && story.slides.length > 0 ? story.slides : [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const holdStartRef = useRef<number>(0);

  const activeSlide: StorySlide = slides[currentIndex] || {
    id: "fallback",
    image: story.coverImage,
    heading: story.title,
    description: "Visual news story by Viral News India.",
  };

  const goToNextSlide = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
      setIsPaused(true);
    }
  }, [currentIndex, slides.length]);

  const goToPrevSlide = useCallback(() => {
    if (isCompleted) {
      setIsCompleted(false);
      setIsPaused(false);
      setProgress(0);
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentIndex, isCompleted]);

  // Handle slide timer & smooth progress
  useEffect(() => {
    if (isPaused || isCompleted) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / SLIDE_DURATION_MS) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, isCompleted, currentIndex, goToNextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToNextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPrevSlide();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      } else if (e.key === "Escape") {
        router.push("/stories");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, router]);

  // Share story
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: `Check out "${story.title}" on Viral News India`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Hold to pause
  const handleTouchOrMouseDown = () => {
    holdStartRef.current = Date.now();
    setIsPaused(true);
  };

  const handleTouchOrMouseUp = (direction: "left" | "right") => {
    const holdDuration = Date.now() - holdStartRef.current;
    setIsPaused(false);

    // If tap was brief (not a long press), navigate slide
    if (holdDuration < 250) {
      if (direction === "left") {
        goToPrevSlide();
      } else {
        goToNextSlide();
      }
    }
  };

  const handleReplay = () => {
    setCurrentIndex(0);
    setProgress(0);
    setIsCompleted(false);
    setIsPaused(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black select-none overflow-hidden">
      {/* Desktop Background Blur from Active Slide */}
      <div className="absolute inset-0 hidden md:block opacity-25 filter blur-3xl scale-125 pointer-events-none">
        <Image
          src={activeSlide.image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Main Story Viewport (Mobile-first 9:16 frame) */}
      <div className="relative flex h-full w-full max-w-md flex-col justify-between overflow-hidden bg-gray-950 md:h-[94vh] md:max-h-[860px] md:rounded-3xl md:border-2 md:border-gray-800 md:shadow-[0_0_50px_rgba(220,38,38,0.25)]">
        {/* Background Image of Current Slide */}
        <div className="absolute inset-0">
          <Image
            src={activeSlide.image}
            alt={activeSlide.heading}
            fill
            priority
            className="object-cover transition-transform duration-1000 ease-out"
            sizes="(max-width: 768px) 100vw, 448px"
          />
          {/* Multi-layered cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/70" />
        </div>

        {/* TOP BAR: Segmented Progress Lines & Controls */}
        <div className="relative z-30 p-4 pt-3 space-y-3">
          {/* Segmented Progress Indicators */}
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/30 backdrop-blur-xs"
              >
                <div
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{
                    width:
                      idx < currentIndex
                        ? "100%"
                        : idx === currentIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header Metadata & Story Actions */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <Link
                href="/"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 font-black text-[10px] text-white shadow"
              >
                V
              </Link>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-red-600/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                    {story.category}
                  </span>
                  <span className="text-xs font-bold text-white drop-shadow">
                    Viral News India
                  </span>
                </div>
              </div>
            </div>

            {/* Top Right Controls: Play/Pause, Share, Close */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="rounded-full bg-black/40 backdrop-blur-md p-2 text-white/90 hover:bg-black/60 transition"
                title={isPaused ? "Play story" : "Pause story"}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play size={14} className="fill-white" /> : <Pause size={14} />}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="rounded-full bg-black/40 backdrop-blur-md p-2 text-white/90 hover:bg-black/60 transition"
                title="Share story"
                aria-label="Share"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              </button>

              <button
                type="button"
                onClick={() => router.push("/stories")}
                className="rounded-full bg-black/40 backdrop-blur-md p-2 text-white/90 hover:bg-black/60 transition"
                title="Close story"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* INTERACTIVE TAP ZONES (Left = Prev, Right = Next) */}
        <div className="absolute inset-x-0 top-20 bottom-36 z-20 flex">
          <div
            className="h-full w-1/3 cursor-pointer"
            onMouseDown={handleTouchOrMouseDown}
            onMouseUp={() => handleTouchOrMouseUp("left")}
            onTouchStart={handleTouchOrMouseDown}
            onTouchEnd={() => handleTouchOrMouseUp("left")}
            title="Tap left for previous slide"
          />
          <div
            className="h-full w-2/3 cursor-pointer"
            onMouseDown={handleTouchOrMouseDown}
            onMouseUp={() => handleTouchOrMouseUp("right")}
            onTouchStart={handleTouchOrMouseDown}
            onTouchEnd={() => handleTouchOrMouseUp("right")}
            title="Tap right for next slide"
          />
        </div>

        {/* BOTTOM CONTENT AREA */}
        {!isCompleted ? (
          <div className="relative z-30 p-5 sm:p-6 text-white">
            <div className="rounded-2xl bg-black/60 backdrop-blur-md p-5 border border-white/10 shadow-2xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400">
                0{currentIndex + 1} / 0{slides.length}
              </span>

              <h2 className="mt-1 text-lg sm:text-xl font-black leading-snug tracking-tight text-white drop-shadow-md">
                {activeSlide.heading}
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-gray-200 drop-shadow">
                {activeSlide.description}
              </p>

              {/* Call to Action Link */}
              {activeSlide.callToActionText && activeSlide.callToActionUrl && (
                <Link
                  href={activeSlide.callToActionUrl}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 px-4 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/40 transition hover:bg-red-700 active:scale-98"
                >
                  <span>{activeSlide.callToActionText}</span>
                  <ExternalLink size={13} />
                </Link>
              )}
            </div>
          </div>
        ) : (
          /* End of Story Screen */
          <div className="relative z-30 p-6 text-white my-auto">
            <div className="rounded-2xl bg-black/80 backdrop-blur-lg p-6 border border-red-500/30 text-center shadow-2xl space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white mx-auto shadow-lg shadow-red-600/50">
                <Check size={24} />
              </div>

              <div>
                <h3 className="text-lg font-black text-white">
                  You&apos;ve Caught Up!
                </h3>
                <p className="mt-1 text-xs text-gray-300">
                  You completed all slides for this visual story.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                {nextStory && (
                  <Link
                    href={`/stories/${nextStory.slug}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/40 hover:bg-red-700"
                  >
                    <span>Next Story: {nextStory.title.substring(0, 24)}... →</span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleReplay}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-700 bg-gray-900 py-2.5 text-xs font-bold text-gray-200 hover:bg-gray-800"
                >
                  <RotateCcw size={14} />
                  <span>Replay Story</span>
                </button>

                <Link
                  href="/stories"
                  className="pt-2 text-[11px] font-semibold text-gray-400 hover:text-white"
                >
                  Browse All Visual Stories
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Left/Right Click Navigators */}
      <button
        type="button"
        onClick={goToPrevSlide}
        disabled={currentIndex === 0}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 transition disabled:opacity-20"
        title="Previous slide (←)"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        type="button"
        onClick={goToNextSlide}
        disabled={isCompleted}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 transition disabled:opacity-20"
        title="Next slide (→)"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
