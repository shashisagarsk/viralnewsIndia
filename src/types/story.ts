export interface StorySlide {
  id: string | number;
  image: string;
  heading: string;
  description: string;
  heading_hi?: string;
  description_hi?: string;
  callToActionText?: string;
  callToActionText_hi?: string;
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
  title_hi?: string;
  category_hi?: string;
}

