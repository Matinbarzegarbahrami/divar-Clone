# Divar Clone — Full Stack Next.js

A full-stack clone of Divar built with Next.js, featuring ad posting, user authentication, image upload, category filtering, and a modern responsive UI and with mock API.

## Preview

A marketplace web application inspired by Divar where users can create and browse ads for products, services, real estate, vehicles, and more.

---

## Features

- User Authentication (Sign up / Login)
- JWT-based authentication
- Create new advertisements
- Upload images for ads
- Browse all advertisements
- Category-based filtering
- Search functionality
- Ad details page
- User dashboard
- Manage personal ads
- Delete/Edit advertisements
- Responsive design for mobile and desktop
- API routes with Next.js backend

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- PostgreSQL / MySQL
- Drizzle ORM

### Authentication
- JWT
- Cookies

### Storage
- Local file upload / cloud storage

---

## Project Structure

```bash
src/
├── app/
│   ├── page.tsx
│   ├── ads/
│   ├── dashboard/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── forms/
│   ├── layout/
│
├── db/
│   ├── schema.ts
│   ├── db.ts
│
├── lib/
├── utils/
└── middleware.ts