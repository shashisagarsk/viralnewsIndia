import React from "react";
import { NewsService } from "@/src/services/news.service";
import CategoryDetailClient from "./CategoryDetailClient";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category: rawCategory } = await params;
  const decodedCategory = decodeURIComponent(rawCategory);
  const displayTitle =
    decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

  return {
    title: `${displayTitle} News | Viral News India`,
    description: `Latest breaking headlines and coverage in ${displayTitle}.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: rawCategory } = await params;
  const decodedCategory = decodeURIComponent(rawCategory);

  const allNews = NewsService.getAll();
  const categoryNews = NewsService.getAll({
    category: decodedCategory,
  });

  return (
    <CategoryDetailClient
      categorySlug={decodedCategory}
      categoryNews={categoryNews}
      allNews={allNews}
    />
  );
}
