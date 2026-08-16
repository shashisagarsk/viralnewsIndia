import { News } from "../types/news";
import { newsData as defaultNews } from "./news";

let memoryCache: News[] = [...defaultNews];

export function readNewsFromDb(): News[] {
  if (typeof window === "undefined") {
    try {
      /* eslint-disable @typescript-eslint/no-require-imports */
      const fs = require("fs");
      const path = require("path");
      /* eslint-enable @typescript-eslint/no-require-imports */

      const dataDir = path.join(process.cwd(), "data");
      const dataFilePath = path.join(dataDir, "news.json");

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, JSON.stringify(defaultNews, null, 2), "utf-8");
      } else {
        const fileData = fs.readFileSync(dataFilePath, "utf-8");
        const parsed = JSON.parse(fileData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryCache = parsed;
          return parsed;
        }
      }
    } catch (error) {
      console.warn("FS read fallback to memory store:", error);
    }
  }
  return memoryCache;
}

export function writeNewsToDb(news: News[]): boolean {
  memoryCache = news;
  if (typeof window === "undefined") {
    try {
      /* eslint-disable @typescript-eslint/no-require-imports */
      const fs = require("fs");
      const path = require("path");
      /* eslint-enable @typescript-eslint/no-require-imports */

      const dataDir = path.join(process.cwd(), "data");
      const dataFilePath = path.join(dataDir, "news.json");

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(dataFilePath, JSON.stringify(news, null, 2), "utf-8");
      return true;
    } catch (error) {
      console.warn("FS write fallback to memory store:", error);
      return false;
    }
  }
  return true;
}
