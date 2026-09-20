# NoteFlow 📝

A modern and responsive notes management application built with Next.js, React, TypeScript, Tailwind CSS, Prisma, and SQLite.

NoteFlow lets users create, edit, search, favorite, delete, and restore notes through a clean and responsive interface.

## ✨ Features

- Create, edit, and delete notes
- Soft delete with Trash, and restore deleted notes
- Favorite and unfavorite notes
- Search notes by title or content
- Sort notes by newest first, oldest first, or title A–Z
- Delete confirmation modal
- Form validation
- Loading, error, and empty states
- Dark mode
- Responsive UI for mobile, tablet, and desktop
- Smooth UI animations
- REST-style API
- SQLite database with Prisma ORM

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (REST-style)
- **Database:** SQLite, Prisma ORM, Prisma Better SQLite3 Adapter
- **Tools:** Git, GitHub, VS Code, npm

## 📁 Project Structure

```text
noteflow/
├── app/
│   ├── api/
│   │   └── notes/
│   │       └── route.ts
│   ├── components/
│   │   ├── AddNoteForm.tsx
│   │   ├── DeleteConfirmModal.tsx
│   │   ├── EditNoteForm.tsx
│   │   └── NoteCard.tsx
│   ├── types/
│   │   └── note.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── generated/
│   └── prisma/
├── public/
├── .env
├── package.json
├── prisma.config.ts
└── README.md
```

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Some Screenshots

![alt text](<Screenshot (661).png>) ![alt text](<Screenshot (662).png>) ![alt text](<Screenshot (663).png>) ![alt text](<Screenshot (664).png>) ![alt text](<Screenshot (665).png>) ![alt text](<Screenshot (666).png>)
