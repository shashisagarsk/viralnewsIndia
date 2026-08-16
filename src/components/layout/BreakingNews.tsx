"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { News } from "@/src/types/news";

interface BreakingNewsProps {
  initialNews?: News;
}

export default function BreakingNews({ initialNews }: BreakingNewsProps) {
  const [headline, setHeadline] = useState<{ title: string; slug: string }>(
    initialNews || {
      title:
        "Latest headlines: Economic reforms and technological innovations accelerate across nation",
      slug: "india-major-economic-reforms",
    }
  );

  useEffect(() => {
    let isMounted = true;
    const fetchBreaking = async () => {
      try {
        const res = await fetch("/api/news?breaking=true");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
            setHeadline(data.data[0]);
          }
        }
      } catch {
        // Fallback to initial
      }
    };

    fetchBreaking();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="border-b border-gray-200 bg-gray-50/80">
      <div className="mx-auto flex max-w-7xl items-center px-4">
        <div className="flex shrink-0 items-center gap-1.5 bg-red-600 px-3.5 py-2.5 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
          <Zap size={13} className="fill-white animate-pulse" />
          <span>Breaking</span>
        </div>

        <div className="overflow-hidden px-4 py-2">
          <Link
            href={`/news/${headline.slug}`}
            className="block truncate text-xs font-semibold text-gray-800 transition hover:text-red-600 hover:underline"
          >
            {headline.title}
          </Link>
        </div>
      </div>
    </div>
  );
}