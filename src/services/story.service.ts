import { WebStory, StorySlide } from "../types/story";
import { slugify, formatDate } from "../lib/utils";

const defaultStories: WebStory[] = [
  {
    id: 1,
    title: "5 Autonomous AI Breakthroughs Transforming 2026",
    slug: "5-autonomous-ai-breakthroughs-2026",
    category: "Technology",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85",
    author: "Ankit Verma",
    date: "Aug 16, 2026",
    views: 8940,
    featured: true,
    createdAt: "2026-08-16T10:00:00.000Z",
    updatedAt: "2026-08-16T10:00:00.000Z",
    slides: [
      {
        id: "slide-1",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85",
        heading: "1. Autonomous Code Generation",
        description:
          "Software engineering teams are deploying AI agents that autonomously debug, test, and deploy entire distributed microservices in real time.",
        callToActionText: "Read AI Special Report →",
        callToActionUrl: "/news/technology-ai-wave",
      },
      {
        id: "slide-2",
        image:
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=85",
        heading: "2. Molecular Protein Synthesis",
        description:
          "AI models simulate drug interactions at atomic resolution, compressing clinical drug discovery timelines from a decade to under two weeks.",
      },
      {
        id: "slide-3",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=85",
        heading: "3. Hyper-Realistic Voice & Vision",
        description:
          "Zero-latency conversational agents now process multi-lingual dialogues with human-level nuance, humor, and emotional context.",
      },
      {
        id: "slide-4",
        image:
          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=85",
        heading: "4. Smart Urban Grid Optimization",
        description:
          "Metro cities across India are integrating autonomous traffic and energy distribution grids, cutting municipal emissions by 35%.",
        callToActionText: "Explore Indian Cities →",
        callToActionUrl: "/news/modern-indian-cities",
      },
    ],
  },
  {
    id: 2,
    title: "India's Historic Space Mission: Key Milestones",
    slug: "india-space-mission-milestones",
    category: "Science",
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=85",
    author: "Neha Kapoor",
    date: "Aug 15, 2026",
    views: 12400,
    featured: true,
    createdAt: "2026-08-15T12:00:00.000Z",
    updatedAt: "2026-08-15T12:00:00.000Z",
    slides: [
      {
        id: "slide-1",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=85",
        heading: "Deep Space Exploration",
        description:
          "The national space agency successfully placed its next-generation solar observatory probe into halo orbit at Lagrange point L1.",
      },
      {
        id: "slide-2",
        image:
          "https://images.unsplash.com/photo-1517976487541-002fec553648?auto=format&fit=crop&w=800&q=85",
        heading: "Reusable Launch Vehicle",
        description:
          "Autonomous runway landings for winged orbital launch vehicles achieved 100% mission precision during hypersonic re-entry tests.",
      },
      {
        id: "slide-3",
        image:
          "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=85",
        heading: "Human Spaceflight Habitat",
        description:
          "Astronaut training simulators and environmental life-support capsules are undergoing final astronaut crew certifications.",
        callToActionText: "Read Science Coverage →",
        callToActionUrl: "/category/science",
      },
    ],
  },
  {
    id: 3,
    title: "Championship Season: Key Squad Profiles",
    slug: "championship-season-key-squad-profiles",
    category: "Sports",
    coverImage:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=85",
    author: "Vikram Rao",
    date: "Aug 14, 2026",
    views: 6520,
    featured: false,
    createdAt: "2026-08-14T14:00:00.000Z",
    updatedAt: "2026-08-14T14:00:00.000Z",
    slides: [
      {
        id: "slide-1",
        image:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=85",
        heading: "1. High-Performance Field Tactics",
        description:
          "The team is introducing specialized GPS velocity tracking to optimize sprint recovery and death-overs fielding precision.",
      },
      {
        id: "slide-2",
        image:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=85",
        heading: "2. The Spin Masterclass",
        description:
          "Tactical spin net sessions utilizing robotic bowling technology simulated all major international pitch variations.",
        callToActionText: "Read Sports Report →",
        callToActionUrl: "/news/sports-new-season",
      },
    ],
  },
  {
    id: 4,
    title: "Global Financial Markets in 4 Infographics",
    slug: "global-financial-markets-infographics",
    category: "Business",
    coverImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=85",
    author: "Priya Mehta",
    date: "Aug 13, 2026",
    views: 7410,
    featured: false,
    createdAt: "2026-08-13T09:00:00.000Z",
    updatedAt: "2026-08-13T09:00:00.000Z",
    slides: [
      {
        id: "slide-1",
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=85",
        heading: "Equities Rebound Globally",
        description:
          "Major international stock indices recorded robust gains led by tech infrastructure and consumer demand recovery.",
      },
      {
        id: "slide-2",
        image:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=85",
        heading: "Commodities & Energy",
        description:
          "Crude oil and industrial metals stabilized following lower freight indices and enhanced maritime trade supply chains.",
        callToActionText: "View Market Analysis →",
        callToActionUrl: "/news/global-markets-economic-signals",
      },
    ],
  },
];

let memoryStories: WebStory[] = [...defaultStories];

function readStoriesFromStorage(): WebStory[] {
  if (typeof window === "undefined") {
    try {
      /* eslint-disable @typescript-eslint/no-require-imports */
      const fs = require("fs");
      const path = require("path");
      /* eslint-enable @typescript-eslint/no-require-imports */

      const dataDir = path.join(process.cwd(), "data");
      const dataFilePath = path.join(dataDir, "stories.json");

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(
          dataFilePath,
          JSON.stringify(defaultStories, null, 2),
          "utf-8"
        );
      } else {
        const fileData = fs.readFileSync(dataFilePath, "utf-8");
        const parsed = JSON.parse(fileData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryStories = parsed;
          return parsed;
        }
      }
    } catch (error) {
      console.warn("Error reading stories JSON:", error);
    }
  }
  return memoryStories;
}

function writeStoriesToStorage(stories: WebStory[]): boolean {
  memoryStories = stories;
  if (typeof window === "undefined") {
    try {
      /* eslint-disable @typescript-eslint/no-require-imports */
      const fs = require("fs");
      const path = require("path");
      /* eslint-enable @typescript-eslint/no-require-imports */

      const dataDir = path.join(process.cwd(), "data");
      const dataFilePath = path.join(dataDir, "stories.json");

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(dataFilePath, JSON.stringify(stories, null, 2), "utf-8");
      return true;
    } catch (error) {
      console.warn("Error writing stories JSON:", error);
      return false;
    }
  }
  return true;
}

export class StoryService {
  static getAll(): WebStory[] {
    return readStoriesFromStorage();
  }

  static getById(id: number): WebStory | null {
    const list = readStoriesFromStorage();
    return list.find((s) => Number(s.id) === Number(id)) || null;
  }

  static getBySlug(slug: string): WebStory | null {
    const list = readStoriesFromStorage();
    return list.find((s) => s.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  static create(data: Partial<WebStory>): WebStory {
    const list = readStoriesFromStorage();
    const newId =
      list.length > 0 ? Math.max(...list.map((s) => Number(s.id) || 0)) + 1 : 1;

    const title = data.title?.trim() || "Untitled Visual Story";
    const slugCandidate = data.slug?.trim()
      ? slugify(data.slug)
      : slugify(title);

    let finalSlug = slugCandidate;
    let counter = 1;
    while (list.some((s) => s.slug === finalSlug)) {
      finalSlug = `${slugCandidate}-${counter}`;
      counter++;
    }

    const defaultSlides: StorySlide[] = [
      {
        id: "slide-1",
        image:
          data.coverImage ||
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85",
        heading: title,
        description: "Swipe or tap to explore this visual news story.",
      },
    ];

    const newStory: WebStory = {
      id: newId,
      title,
      slug: finalSlug,
      category: data.category?.trim() || "General",
      coverImage:
        data.coverImage?.trim() ||
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85",
      author: data.author?.trim() || "Visual Desk",
      date: data.date?.trim() || formatDate(),
      slides:
        Array.isArray(data.slides) && data.slides.length > 0
          ? data.slides
          : defaultSlides,
      views: 0,
      featured: Boolean(data.featured),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newStory, ...list];
    writeStoriesToStorage(updated);
    return newStory;
  }

  static update(id: number, data: Partial<WebStory>): WebStory | null {
    const list = readStoriesFromStorage();
    const index = list.findIndex((s) => Number(s.id) === Number(id));

    if (index === -1) return null;

    const existing = list[index];
    let finalSlug = existing.slug;

    if (data.slug && data.slug !== existing.slug) {
      const candidate = slugify(data.slug);
      let counter = 1;
      finalSlug = candidate;
      while (list.some((s, idx) => idx !== index && s.slug === finalSlug)) {
        finalSlug = `${candidate}-${counter}`;
        counter++;
      }
    }

    const updatedStory: WebStory = {
      ...existing,
      ...data,
      id: existing.id,
      slug: finalSlug,
      slides: Array.isArray(data.slides) ? data.slides : existing.slides,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updatedStory;
    writeStoriesToStorage(list);
    return updatedStory;
  }

  static delete(id: number): boolean {
    const list = readStoriesFromStorage();
    const filtered = list.filter((s) => Number(s.id) !== Number(id));
    if (filtered.length === list.length) return false;
    writeStoriesToStorage(filtered);
    return true;
  }

  static incrementViews(id: number): void {
    const list = readStoriesFromStorage();
    const index = list.findIndex((s) => Number(s.id) === Number(id));
    if (index !== -1) {
      list[index].views = (list[index].views || 0) + 1;
      writeStoriesToStorage(list);
    }
  }
}
