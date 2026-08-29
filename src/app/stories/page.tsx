import React from "react";
import { StoryService } from "@/src/services/story.service";
import WebStoriesDirectoryClient from "./WebStoriesDirectoryClient";

export const metadata = {
  title: "Visual Web Stories | Viral News India",
  description:
    "Explore immersive tap-through visual stories, infographics, and breaking multimedia coverage from Viral News India.",
};

export default function WebStoriesDirectoryPage() {
  const stories = StoryService.getAll();

  return <WebStoriesDirectoryClient stories={stories} />;
}
