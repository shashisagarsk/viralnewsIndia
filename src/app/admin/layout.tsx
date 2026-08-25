"use client";

import React, { ReactNode, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import {
  LayoutDashboard,
  FilePlus2,
  FileText,
  Globe,
  LogOut,
  ShieldCheck,
  Loader2,
} from "lucide-react";

function AdminNavbar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-950 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="relative h-10 w-auto">
              <Image
                src="/logo.png"
                alt="ViralNews Logo"
                width={150}
                height={45}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="rounded bg-red-600/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-red-400 border border-red-500/30">
              Admin Desk
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                pathname === "/admin"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>

            <Link
              href="/admin/editor"
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                pathname === "/admin/editor"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FilePlus2 size={14} />
              Write Article
            </Link>

            <Link
              href="/admin/stories/editor"
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                pathname === "/admin/stories/editor"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FileText size={14} className="text-red-400" />
              Create Web Story
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1 rounded-md border border-gray-700 bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
            title="Open Live Public Site in new tab"
          >
            <Globe size={13} />
            <span className="hidden sm:inline">Live Portal</span>
          </Link>

          {!loading && user && (
            <div className="flex items-center gap-3 border-l border-gray-800 pl-3">
              <div className="hidden text-right lg:block">
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  {user.name}
                </div>
                <div className="text-[10px] text-gray-400">{user.email}</div>
              </div>

              <button
                onClick={() => logout()}
                className="flex items-center gap-1 rounded-md bg-red-600/10 px-2.5 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-600 hover:text-white"
                title="Logout from Admin session"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex border-t border-gray-800 bg-gray-900 px-4 py-2 md:hidden">
        <Link
          href="/admin"
          className={`flex-1 text-center text-xs font-semibold py-1 rounded ${
            pathname === "/admin" ? "bg-red-600 text-white" : "text-gray-300"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/admin/editor"
          className={`flex-1 text-center text-xs font-semibold py-1 rounded ${
            pathname === "/admin/editor" ? "bg-red-600 text-white" : "text-gray-300"
          }`}
        >
          New Post
        </Link>
        <Link
          href="/admin/stories/editor"
          className={`flex-1 text-center text-xs font-semibold py-1 rounded ${
            pathname === "/admin/stories/editor" ? "bg-red-600 text-white" : "text-gray-300"
          }`}
        >
          Web Story
        </Link>
      </div>
    </header>
  );
}

function AdminGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && !isLoginPage) {
        router.replace("/admin/login");
      } else if (isAuthenticated && isLoginPage) {
        router.replace("/admin");
      }
    }
  }, [isAuthenticated, loading, isLoginPage, router]);

  // If on login page
  if (isLoginPage) {
    if (loading || isAuthenticated) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="animate-spin text-red-500" />
            <p className="text-xs font-medium text-gray-400">Loading...</p>
          </div>
        </div>
      );
    }
    return <>{children}</>;
  }

  // If on protected admin pages
  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-red-500" />
          <p className="text-xs font-medium text-gray-400">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 antialiased selection:bg-red-600 selection:text-white">
      <AdminNavbar />
      {children}
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  );
}
