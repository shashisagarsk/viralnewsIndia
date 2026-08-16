import React from "react";
import { notFound } from "next/navigation";
import { StoryService } from "@/src/services/story.service";
import StoryPlayerClient from "./StoryPlayerClient";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = StoryService.getBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found | Viral News India",
    };
  }

  return {
    title: `${story.title} | Visual Web Stories | Viral News India`,
    description: `Tap through "${story.title}" on Viral News India visual stories network.`,
    openGraph: {
      title: story.title,
      images: [story.coverImage],
    },
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = StoryService.getBySlug(slug);

  if (!story) {
    notFound();
  }

  // Increment view count
  StoryService.incrementViews(story.id);

  const allStories = StoryService.getAll();
  const nextStory = allStories.find((s) => s.id !== story.id) || null;

  return <StoryPlayerClient story={story} nextStory={nextStory} />;
}
