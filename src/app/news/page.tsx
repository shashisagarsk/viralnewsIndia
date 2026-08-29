import React from "react";
import { NewsService } from "@/src/services/news.service";
import AllNewsClient from "./AllNewsClient";

export const metadata = {
  title: "Complete News Archive | Viral News India",
  description: "Browse the complete news archive of Viral News India.",
};

export default function AllNewsPage() {
  const allNews = NewsService.getAll();

  return <AllNewsClient allNews={allNews} />;
}
