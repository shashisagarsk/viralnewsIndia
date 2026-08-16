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
}

export interface NewsFilters {
  category?: string;
  search?: string;
  featured?: boolean;
  breaking?: boolean;
  limit?: number;
  page?: number;
}