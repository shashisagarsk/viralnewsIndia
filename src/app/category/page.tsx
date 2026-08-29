import React from "react";
import { NewsService } from "@/src/services/news.service";
import CategoryIndexClient from "./CategoryIndexClient";

export const metadata = {
  title: "Categories Directory | Viral News India",
  description: "Browse news by category and editorial desk.",
};

export default function CategoriesIndexPage() {
  const categories = NewsService.getCategories();
  const allNews = NewsService.getAll();

  return (
    <CategoryIndexClient
      categories={categories}
      allNews={allNews}
    />
  );
}
