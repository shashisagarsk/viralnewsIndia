# ViralNewsIndia - Modern Digital News Portal

An editorial news platform built with **Next.js (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**, featuring an Admin Newsroom Control Center with **JWT Authentication** and a rich **Post & Headline Content Editor**.

---

## Key Features

- **Admin Portal & JWT Authentication**:
  - Secure JWT session authentication using `jose` with HTTP-Only cookies.
  - One-click demo credentials autofill on the login screen.
  - Protected API routes (`/api/news` POST/PUT/DELETE) and Admin routes (`/admin`, `/admin/editor`).
- **Newsroom Editor**:
  - Full article headline & slug auto-generator.
  - Category selector with custom category support.
  - Real-time **Breaking News Ticker** and **Featured Hero** promotion toggles.
  - Rich Markdown formatting toolbar (Headings, Quotes, Lists, Code, Dividers).
  - Side-by-side **Live Markdown Preview**.
  - Unsplash cover image presets with instant aspect-ratio live preview.
- **REST API Layer & Persistence**:
  - `GET /api/news`: Query news by category, search keywords, featured, or breaking status.
  - `POST /api/news`: Create news articles (Protected).
  - `GET /api/news/[id]`: Retrieve single article by ID or slug.
  - `PUT /api/news/[id]`: Update article (Protected).
  - `DELETE /api/news/[id]`: Delete article (Protected).
  - `POST /api/auth/login`: Admin authentication & cookie issuance.
  - `POST /api/auth/logout`: Clears session.
  - `GET /api/auth/me`: Verifies active JWT session.
  - File-backed JSON database persistence in `data/news.json`.
- **Public Portal Pages**:
  - **Homepage (`/`)**: Hero section, breaking ticker, categorized sections, Editor's Choice, and sidebar.
  - **Article Detail (`/news/[slug]`)**: Breadcrumbs, rich typography, reading time, share buttons, author box, and related articles.
  - **Category Archives (`/category/[category]`)**: Dynamic beat archives.
  - **Search Portal (`/search`)**: Live keyword search with instant filtering and trending topics.

---

## Admin Credentials (Default Demo)

- **Login URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Admin Email**: `admin@viralnewsindia.com`
- **Admin Password**: `admin@123`

*(You can configure custom credentials in `.env.local` via `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET`)*

---

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.
