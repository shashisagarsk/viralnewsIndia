import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, Globe, Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        {/* Brand Column */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-block">
            <div className="relative h-14 w-auto">
              <Image
                src="/logo.png"
                alt="ViralNewsIndia"
                width={220}
                height={60}
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <p className="mt-4 max-w-md text-xs leading-relaxed text-gray-400">
            Independent digital journalism covering India and world affairs, business markets, breakthroughs in artificial intelligence, science, sports, and culture.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-red-500">
            Sections & Beats
          </h3>

          <div className="mt-4 space-y-2 text-xs text-gray-400">
            <p>
              <Link href="/category/india" className="hover:text-white transition">
                India News
              </Link>
            </p>
            <p>
              <Link href="/category/world" className="hover:text-white transition">
                World Affairs
              </Link>
            </p>
            <p>
              <Link href="/category/business" className="hover:text-white transition">
                Business & Markets
              </Link>
            </p>
            <p>
              <Link href="/category/technology" className="hover:text-white transition">
                Technology & AI
              </Link>
            </p>
            <p>
              <Link href="/category/sports" className="hover:text-white transition">
                Sports & Leagues
              </Link>
            </p>
            <p>
              <Link href="/category/science" className="hover:text-white transition">
                Science & Space
              </Link>
            </p>
          </div>
        </div>

        {/* Navigation & Company */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-red-500">
            Quick Navigation
          </h3>

          <div className="mt-4 space-y-2 text-xs text-gray-400">
            <p>
              <Link href="/news" className="hover:text-white transition">
                All News Archives
              </Link>
            </p>
            <p>
              <Link href="/stories" className="hover:text-white text-red-400 font-bold transition">
                Visual Web Stories
              </Link>
            </p>
            <p>
              <Link href="/category" className="hover:text-white transition">
                Browse Categories
              </Link>
            </p>
            <p>
              <Link href="/search" className="hover:text-white transition">
                Search Coverage
              </Link>
            </p>
            <p>
              <Link href="/" className="hover:text-white transition">
                Live Editorial Feed
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-gray-500 sm:flex-row sm:px-6">
          <div>© 2026 ViralNewsIndia. All rights reserved.</div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Editorial Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}