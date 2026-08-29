import React from "react";
import { notFound } from "next/navigation";
import { NewsService } from "@/src/services/news.service";
import ArticleDetailClient from "./ArticleDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = NewsService.getBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Viral News India",
    };
  }

  return {
    title: `${article.title} | Viral News India`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = NewsService.getBySlug(slug);

  if (!article) {
    notFound();
  }

  const allNews = NewsService.getAll();
  const relatedNews = allNews
    .filter((n) => n.id !== article.id && n.category === article.category)
    .slice(0, 3);

  const fallbackRelated =
    relatedNews.length > 0
      ? relatedNews
      : allNews.filter((n) => n.id !== article.id).slice(0, 3);

  return (
    <ArticleDetailClient
      article={article}
      allNews={allNews}
      relatedNews={fallbackRelated}
    />
  );
}
