export interface News {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  featured?: boolean;
}