export interface News {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  featured?: boolean;
  breaking?: boolean;
  tags?: string[];
  views?: number;
  createdAt?: string;
  updatedAt?: string;
  // Bilingual translation fields
  title_hi?: string;
  excerpt_hi?: string;
  content_hi?: string;
  category_hi?: string;
  tags_hi?: string[];
}

export interface NewsFilters {
  category?: string;
  search?: string;
  featured?: boolean;
  breaking?: boolean;
  limit?: number;
  page?: number;
}