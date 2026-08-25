"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      {/* Background Subtle Gradient Blobs */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center opacity-25">
        <div className="h-[500px] w-[500px] rounded-full bg-red-600/30 blur-[120px]" />
        <div className="h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center">
          <Link href="/" className="inline-block transition hover:scale-105">
            <div className="relative mx-auto h-20 w-auto">
              <Image
                src="/logo.png"
                alt="Viral News India"
                width={260}
                height={75}
                priority
                className="h-full w-auto object-contain mx-auto drop-shadow-lg"
              />
            </div>
          </Link>

          <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Admin Portal Access
          </h2>
          <p className="mt-2 text-xs font-medium text-gray-400">
            Sign in to manage news broadcasts, breaking tickers, and articles.
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/80 p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-950/50 p-4 text-xs text-red-200">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-300"
              >
                Admin Email
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full rounded-lg border border-gray-700 bg-gray-950/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-500 shadow-inner focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-300"
                >
                  Password
                </label>
              </div>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-700 bg-gray-950/80 py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-500 shadow-inner focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Security Badge Info */}
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-400" />
                256-bit JWT Session Guard
              </span>
              <span>Expires in 7 days</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/30 transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Sign In To Admin</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Site */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <Link href="/" className="transition hover:text-red-400">
            ← Return to ViralNewsIndia Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
