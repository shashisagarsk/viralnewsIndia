import { News, NewsFilters } from "../types/news";
import { readNewsFromDb, writeNewsToDb } from "../lib/db";
import { slugify, formatDate } from "../lib/utils";

export class NewsService {
  static getAll(filters?: NewsFilters): News[] {
    let list = readNewsFromDb();

    if (filters) {
      if (filters.category && filters.category.toLowerCase() !== "all" && filters.category.toLowerCase() !== "home") {
        list = list.filter(
          (item) => item.category.toLowerCase() === filters.category!.toLowerCase()
        );
      }

      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        list = list.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.excerpt.toLowerCase().includes(q) ||
            (item.content && item.content.toLowerCase().includes(q)) ||
            (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }

      if (filters.featured !== undefined) {
        list = list.filter((item) => Boolean(item.featured) === filters.featured);
      }

      if (filters.breaking !== undefined) {
        list = list.filter((item) => Boolean(item.breaking) === filters.breaking);
      }

      if (filters.limit && filters.limit > 0) {
        list = list.slice(0, filters.limit);
      }
    }

    return list;
  }

  static getById(id: number): News | null {
    const list = readNewsFromDb();
    const item = list.find((n) => Number(n.id) === Number(id));
    return item || null;
  }

  static getBySlug(slug: string): News | null {
    const list = readNewsFromDb();
    const item = list.find((n) => n.slug.toLowerCase() === slug.toLowerCase());
    return item || null;
  }

  static getBreaking(): News[] {
    const list = readNewsFromDb();
    return list.filter((item) => item.breaking);
  }

  static getCategories(): string[] {
    const list = readNewsFromDb();
    const categoriesSet = new Set<string>();
    list.forEach((item) => {
      if (item.category) categoriesSet.add(item.category);
    });
    return Array.from(categoriesSet);
  }

  static create(data: Partial<News>): News {
    const list = readNewsFromDb();
    const newId = list.length > 0 ? Math.max(...list.map((n) => Number(n.id) || 0)) + 1 : 1;
    
    const title = data.title?.trim() || "Untitled News";
    const slug = data.slug?.trim() ? slugify(data.slug) : slugify(title);

    // Ensure unique slug
    let finalSlug = slug;
    let counter = 1;
    while (list.some((n) => n.slug === finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const newItem: News = {
      id: newId,
      title,
      slug: finalSlug,
      category: data.category?.trim() || "General",
      excerpt: data.excerpt?.trim() || "",
      content: data.content?.trim() || "",
      image:
        data.image?.trim() ||
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=85",
      author: data.author?.trim() || "Editor Desk",
      date: data.date?.trim() || formatDate(),
      featured: Boolean(data.featured),
      breaking: Boolean(data.breaking),
      tags: Array.isArray(data.tags) ? data.tags : [],
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Prepend new article so it appears first in feed
    const updatedList = [newItem, ...list];
    writeNewsToDb(updatedList);
    return newItem;
  }

  static update(id: number, data: Partial<News>): News | null {
    const list = readNewsFromDb();
    const index = list.findIndex((n) => Number(n.id) === Number(id));

    if (index === -1) {
      return null;
    }

    const existing = list[index];
    let finalSlug = existing.slug;

    if (data.slug && data.slug !== existing.slug) {
      const slugCandidate = slugify(data.slug);
      let counter = 1;
      finalSlug = slugCandidate;
      while (list.some((n, idx) => idx !== index && n.slug === finalSlug)) {
        finalSlug = `${slugCandidate}-${counter}`;
        counter++;
      }
    } else if (data.title && data.title !== existing.title && !data.slug) {
      // Keep existing slug unless explicitly edited
    }

    const updatedItem: News = {
      ...existing,
      ...data,
      id: existing.id,
      slug: finalSlug,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updatedItem;
    writeNewsToDb(list);
    return updatedItem;
  }

  static delete(id: number): boolean {
    const list = readNewsFromDb();
    const filtered = list.filter((n) => Number(n.id) !== Number(id));
    if (filtered.length === list.length) {
      return false;
    }
    writeNewsToDb(filtered);
    return true;
  }
}
