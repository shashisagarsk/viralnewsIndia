"use client";

import React from "react";
import { useLanguage } from "@/src/context/LanguageContext";
import { Languages, Globe, Check } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "header" | "navbar-center" | "compact" | "mobile" | "article" | "footer";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "navbar-center",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-900/90 px-2 py-0.5 text-[10px] font-bold text-gray-200 hover:border-red-500 hover:text-white transition shadow-sm ${className}`}
        title="Toggle language / भाषा बदलें"
        aria-label="Toggle language"
      >
        <Languages size={12} className="text-red-500" />
        <span>{language === "hi" ? "हिन्दी" : "English"}</span>
      </button>
    );
  }

  if (variant === "article") {
    return (
      <div
        className={`inline-flex items-center gap-1 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-black to-red-950/40 p-1 shadow-sm ${className}`}
      >
        <button
          type="button"
          onClick={() => setLanguage("hi")}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
            language === "hi"
              ? "bg-red-600 text-white shadow-md shadow-red-600/40 font-extrabold"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          {language === "hi" && <Check size={11} />}
          <span>हिन्दी</span>
        </button>

        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
            language === "en"
              ? "bg-red-600 text-white shadow-md shadow-red-600/40 font-extrabold"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          {language === "en" && <Check size={11} />}
          <span>English</span>
        </button>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-gray-400">
          <span className="flex items-center gap-1.5">
            <Languages size={12} className="text-red-500" />
            <span>{t("language")}</span>
          </span>
          <span className="text-[10px] text-gray-500">
            {language === "hi" ? "डिफ़ॉल्ट: हिन्दी" : "Active: English"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-gray-900/90 p-1 border border-gray-800">
          <button
            type="button"
            onClick={() => setLanguage("hi")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-bold transition ${
              language === "hi"
                ? "bg-red-600 text-white font-extrabold shadow"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {language === "hi" && <Check size={11} />}
            <span>हिन्दी (Hindi)</span>
          </button>

          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-bold transition ${
              language === "en"
                ? "bg-red-600 text-white font-extrabold shadow"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {language === "en" && <Check size={11} />}
            <span>English</span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <span className="text-[11px] text-gray-400 flex items-center gap-1">
          <Globe size={12} className="text-red-500" />
          <span>{t("language")}:</span>
        </span>
        <div className="inline-flex rounded-lg border border-gray-800 bg-gray-900 p-0.5 text-[10px]">
          <button
            type="button"
            onClick={() => setLanguage("hi")}
            className={`rounded-md px-2 py-0.5 font-bold transition ${
              language === "hi"
                ? "bg-red-600 text-white font-extrabold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            हिन्दी
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`rounded-md px-2 py-0.5 font-bold transition ${
              language === "en"
                ? "bg-red-600 text-white font-extrabold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  // Default: "navbar-center" / "header" placed in the top center with small font size
  return (
    <div
      className={`inline-flex items-center rounded-full border border-gray-800 bg-gray-900/95 px-1 py-0.5 shadow-md transition-all hover:border-gray-700 ${className}`}
    >
      <div className="flex items-center pl-1.5 pr-1 text-red-500">
        <Globe size={12} />
      </div>

      {/* Hindi Option (Default Selected) */}
      <button
        type="button"
        onClick={() => setLanguage("hi")}
        className={`rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-extrabold transition-all duration-200 ${
          language === "hi"
            ? "bg-red-600 text-white shadow-sm font-black"
            : "text-gray-400 hover:text-gray-200"
        }`}
        aria-label="हिंदी चुनें"
      >
        हिन्दी
      </button>

      {/* English Option */}
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-extrabold transition-all duration-200 ${
          language === "en"
            ? "bg-red-600 text-white shadow-sm font-black"
            : "text-gray-400 hover:text-gray-200"
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
    </div>
  );
}
