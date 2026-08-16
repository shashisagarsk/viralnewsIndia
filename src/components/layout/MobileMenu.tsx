"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Search, ShieldAlert, ChevronRight, Layers, Flame, Home } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { name: string; href: string }[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  categories,
}: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-950 text-white shadow-2xl border-r border-gray-800">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="relative h-10 w-auto">
              <Image
                src="/logo.png"
                alt="Viral News India"
                width={160}
                height={45}
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Search */}
        <div className="p-4 border-b border-gray-800">
          <Link
            href="/search"
            onClick={onClose}
            className="flex items-center gap-2.5 rounded-lg border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-xs text-gray-400 hover:border-red-600 hover:text-white transition"
          >
            <Search size={14} className="text-red-500" />
            <span>Search articles & topics...</span>
          </Link>
        </div>

        {/* Category Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-gray-500">
            News Sections
          </div>

          {categories.map((cat) => {
            const isActive =
              cat.href === "/"
                ? pathname === "/"
                : pathname.startsWith(cat.href);

            return (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wide transition ${
                  isActive
                    ? "bg-red-600 text-white font-extrabold"
                    : "text-gray-300 hover:bg-gray-900 hover:text-white"
                }`}
              >
                <span>{cat.name}</span>
                <ChevronRight size={13} className={isActive ? "text-white" : "text-gray-600"} />
              </Link>
            );
          })}
        </div>

        {/* Bottom Shortcuts */}
        <div className="border-t border-gray-800 p-4 space-y-2 bg-black/40">
          <Link
            href="/news"
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2.5 text-xs font-semibold text-gray-300 hover:bg-gray-800 hover:text-white transition"
          >
            <Flame size={14} className="text-amber-500" />
            <span>All News Archives</span>
          </Link>

          <Link
            href="/category"
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2.5 text-xs font-semibold text-gray-300 hover:bg-gray-800 hover:text-white transition"
          >
            <Layers size={14} className="text-red-500" />
            <span>Categories Directory</span>
          </Link>

          <p className="pt-2 text-center text-[10px] text-gray-600">
            © 2026 ViralNewsIndia. Real-time Journalism.
          </p>
        </div>
      </div>
    </div>
  );
}
