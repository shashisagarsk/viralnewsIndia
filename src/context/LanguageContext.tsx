"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  Language,
  translations,
  getLocalizedCategory,
  formatLocalizedDate,
  formatShortLocalizedDate,
} from "../lib/translations";
import { News } from "../types/news";
import { WebStory } from "../types/story";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  formatDate: (dateString?: string) => string;
  formatShortDate: (dateString?: string) => string;
  translateCategory: (category: string) => string;
  translateNews: (item: News) => News;
  translateStory: (story: WebStory) => WebStory;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "viralnews_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("hi");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize from localStorage or cookie on mount (defaulting to Hindi)
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language;
      if (savedLang === "en" || savedLang === "hi") {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        setLanguageState("hi");
        document.documentElement.lang = "hi";
      }
    } catch {
      // Ignore localStorage access restrictions
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.cookie = `${STORAGE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = lang;
    } catch {
      // Ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "hi" : "en");
  }, [language, setLanguage]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      if (translations[key]) {
        return translations[key][language] || fallback || key;
      }
      return fallback || key;
    },
    [language]
  );

  const formatDate = useCallback(
    (dateString?: string): string => {
      return formatLocalizedDate(dateString, language);
    },
    [language]
  );

  const formatShortDate = useCallback(
    (dateString?: string): string => {
      return formatShortLocalizedDate(dateString, language);
    },
    [language]
  );

  const translateCategory = useCallback(
    (category: string): string => {
      return getLocalizedCategory(category, language);
    },
    [language]
  );

  const translateNews = useCallback(
    (item: News): News => {
      if (!item) return item;
      if (language === "hi") {
        return {
          ...item,
          title: item.title_hi || item.title,
          excerpt: item.excerpt_hi || item.excerpt,
          content: item.content_hi || item.content,
          category: item.category_hi || getLocalizedCategory(item.category, "hi"),
          tags: item.tags_hi && item.tags_hi.length > 0 ? item.tags_hi : item.tags,
        };
      }
      return item;
    },
    [language]
  );

  const translateStory = useCallback(
    (story: WebStory): WebStory => {
      if (!story) return story;
      if (language === "hi") {
        return {
          ...story,
          title: story.title_hi || story.title,
          category: story.category_hi || getLocalizedCategory(story.category, "hi"),
          slides: story.slides?.map((slide) => ({
            ...slide,
            heading: slide.heading_hi || slide.heading,
            description: slide.description_hi || slide.description,
            callToActionText: slide.callToActionText_hi || slide.callToActionText,
          })),
        };
      }
      return story;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        formatDate,
        formatShortDate,
        translateCategory,
        translateNews,
        translateStory,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
