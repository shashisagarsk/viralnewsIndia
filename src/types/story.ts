export interface StorySlide {
  id: string | number;
  image: string;
  heading: string;
  description: string;
  callToActionText?: string;
  callToActionUrl?: string;
}

export interface WebStory {
  id: number;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  author: string;
  date: string;
  slides: StorySlide[];
  views: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}
