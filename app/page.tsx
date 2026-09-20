"use client";

import { useEffect, useState } from "react";
import AddNoteForm from "./components/AddNoteForm";
import NoteCard from "./components/NoteCard";
import EditNoteForm from "./components/EditNoteForm";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { Note } from "./types/note";

type View = "active" | "favorites" | "trash";

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<View>("active");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az">("newest");

  // Dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("noteflow-theme");

    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleDarkMode() {
    setIsDark((current) => {
      const next = !current;

      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("noteflow-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("noteflow-theme", "light");
      }

      return next;
    });
  }

  // Fetch notes
  useEffect(() => {
    async function fetchNotes() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/notes?view=${view}`);

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data: Note[] = await response.json();
        setNotes(data);
      } catch {
        setError("Something went wrong while loading your notes.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchNotes();
  }, [view]);

  // Add note
  async function handleAddNote(title: string, content: string) {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const newNote: Note = await response.json();

      if (view === "active") {
        setNotes((currentNotes) => [newNote, ...currentNotes]);
      }
    } catch {
      setError("Something went wrong while adding the note.");
    }
  }

  // Ask for delete confirmation
  function handleDeleteNote(id: number) {
    setNoteToDelete(id);
  }

  // Confirm delete
  async function confirmDeleteNote() {
    if (noteToDelete === null) {
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: noteToDelete }),
      });

      if (!response.ok) {
        throw new Error("Failed to move note to trash");
      }

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== noteToDelete)
      );

      setNoteToDelete(null);
    } catch {
      setError("Something went wrong while moving the note to trash.");
    }
  }

  // Restore note
  async function handleRestoreNote(id: number) {
    try {
      const response = await fetch("/api/notes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to restore note");
      }

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== id)
      );
    } catch {
      setError("Something went wrong while restoring the note.");
    }
  }

  // Toggle favorite
  async function handleToggleFavorite(id: number) {
    const note = notes.find((item) => item.id === id);

    if (!note) {
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          isFavorite: !note.isFavorite,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      const updatedNote: Note = await response.json();

      if (view === "favorites" && !updatedNote.isFavorite) {
        setNotes((currentNotes) =>
          currentNotes.filter((item) => item.id !== id)
        );
      } else {
        setNotes((currentNotes) =>
          currentNotes.map((item) =>
            item.id === updatedNote.id ? updatedNote : item
          )
        );
      }
    } catch {
      setError("Something went wrong while updating the favorite.");
    }
  }

  // Open edit modal
  function handleEditNote(id: number) {
    const noteToEdit = notes.find((note) => note.id === id);

    if (!noteToEdit) {
      return;
    }

    setEditingNote(noteToEdit);
  }

  // Update note
  async function handleUpdateNote(title: string, content: string) {
    if (!editingNote) {
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingNote.id,
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote: Note = await response.json();

      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );

      setEditingNote(null);
    } catch {
      setError("Something went wrong while updating the note.");
    }
  }

  // Search
  const filteredNotes = notes
  .filter((note) => {
    const searchTerm = search.toLowerCase().trim();

    return (
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm)
    );
  })
  .sort((a, b) => {
    if (sortBy === "oldest") {
      return (
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
      );
    }

    if (sortBy === "az") {
      return a.title.localeCompare(b.title);
    }

    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  });

  const viewLabels = {
    active: "All Notes",
    favorites: "Favorites",
    trash: "Trash",
  };

  return (
    <main className="min-h-screen px-4 py-6 transition-colors duration-300 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="animate-fade-in">
<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#E76F51]">
                <span className="h-2 w-2 rounded-full bg-[#E76F51]" />
                Personal knowledge space
              </div>

              <div className="mt-3 flex flex-wrap items-end gap-3">
                <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#17202A] dark:text-[#F5F2EB] sm:text-5xl">
                  NoteFlow
                </h1>

                <span className="mb-1 rounded-full border border-[#D8D4CB] bg-[#FFFDF9] px-3 py-1 text-xs font-semibold text-[#71808A] dark:border-[#354149] dark:bg-[#1B252B] dark:text-[#A7B0B4]">
                  {notes.length.toString().padStart(2, "0")} notes
                </span>
              </div>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#71808A] dark:text-[#A7B0B4] sm:text-base">
                A quiet place for the thoughts worth keeping.
              </p>
            </div>

            <div className="flex w-full items-center gap-2 sm:w-auto">
              {/* Dark mode */}
              <button
  onClick={toggleDarkMode}
  aria-label={
    isDark ? "Switch to light mode" : "Switch to dark mode"
  }
  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D8D4CB] bg-[#FFFDF9] text-lg text-[#52616A] transition-all duration-200 hover:border-[#C9C4B9] hover:bg-[#F1EEE8] dark:border-[#303C43] dark:bg-[#182127] dark:text-[#F4F1EA] dark:hover:bg-[#243139]"
>
  {isDark ? "☀" : "☾"}
</button>

              {view === "active" && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#17202A] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(23,32,42,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#273642] hover:shadow-[0_12px_24px_rgba(23,32,42,0.2)] active:translate-y-0"
                >
                  <span className="text-lg leading-none text-[#F6B5A5] transition-transform duration-200 group-hover:rotate-90">
                    +
                  </span>
                  Add Note
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Navigation */}
<nav className="mt-8 flex w-full items-center rounded-2xl border border-[#DEDAD1] bg-[#EDE9E1] p-1 dark:border-[#303C43] dark:bg-[#182127] sm:inline-flex sm:p-1.5">
  <button
    onClick={() => setView("active")}
    className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-all duration-200 sm:flex-none sm:gap-2 sm:px-4 sm:text-sm ${
      view === "active"
        ? "bg-[#17202A] text-white shadow-sm dark:bg-[#F4F1EA] dark:text-[#17202A]"
        : "text-[#71808A] hover:bg-[#FFFDF9] hover:text-[#17202A] dark:text-[#9AA7AD] dark:hover:bg-[#243139] dark:hover:text-[#F4F1EA]"
    }`}
  >
    <span>All Notes</span>
  </button>

  <button
    onClick={() => setView("favorites")}
    className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-all duration-200 sm:flex-none sm:gap-2 sm:px-4 sm:text-sm ${
      view === "favorites"
        ? "bg-[#17202A] text-white shadow-sm dark:bg-[#F4F1EA] dark:text-[#17202A]"
        : "text-[#71808A] hover:bg-[#FFFDF9] hover:text-[#17202A] dark:text-[#9AA7AD] dark:hover:bg-[#243139] dark:hover:text-[#F4F1EA]"
    }`}
  >
    <span className="text-base">★</span>
    <span>Favorites</span>
  </button>

  <button
    onClick={() => setView("trash")}
    className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-all duration-200 sm:flex-none sm:gap-2 sm:px-4 sm:text-sm ${
      view === "trash"
        ? "bg-[#17202A] text-white shadow-sm dark:bg-[#F4F1EA] dark:text-[#17202A]"
        : "text-[#71808A] hover:bg-[#FFFDF9] hover:text-[#17202A] dark:text-[#9AA7AD] dark:hover:bg-[#243139] dark:hover:text-[#F4F1EA]"
    }`}
  >
    <span className="text-base">🗑</span>
    <span>Trash</span>
  </button>
</nav>

        {/* Search & Sort */}
<section className="mt-8 animate-slide-up">
  <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <label
      htmlFor="note-search"
      className="text-xs font-semibold uppercase tracking-[0.16em] text-[#71808A] dark:text-[#A7B0B4]"
    >
      {viewLabels[view]}
    </label>

    {search && (
      <span className="text-xs text-[#71808A] dark:text-[#A7B0B4]">
        {filteredNotes.length} result
        {filteredNotes.length === 1 ? "" : "s"}
      </span>
    )}
  </div>

  <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
    {/* Search */}
    <div className="relative flex-1">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9BA4A6] dark:text-[#71808A]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>

      <input
        id="note-search"
        type="text"
        dir="auto"
        placeholder="Search by title or content..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="h-14 w-full rounded-xl border border-[#D8D4CB] bg-[#FFFDF9] pl-12 pr-12 text-sm text-[#17202A] shadow-[0_4px_14px_rgba(23,32,42,0.04)] outline-none transition-all duration-200 placeholder:text-[#9BA4A6] focus:border-[#E76F51] focus:shadow-[0_8px_22px_rgba(23,32,42,0.08)] dark:border-[#303C43] dark:bg-[#182127] dark:text-[#F4F1EA] dark:placeholder:text-[#71808A] dark:focus:border-[#E9856D]"
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-lg text-[#9BA4A6] transition hover:bg-[#F1EEE8] hover:text-[#17202A] dark:hover:bg-[#243139] dark:hover:text-[#F4F1EA]"
        >
          ×
        </button>
      )}
    </div>

    {/* Sort */}
    <div className="relative w-full lg:w-auto">
      <select
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value as "newest" | "oldest" | "az")
        }
        className="h-14 w-full appearance-none rounded-xl border border-[#D8D4CB] bg-[#FFFDF9] px-4 pr-14 text-sm font-semibold text-[#52616A] shadow-[0_4px_14px_rgba(23,32,42,0.04)] outline-none transition-all duration-200 hover:border-[#C9C4B9] focus:border-[#E76F51] focus:shadow-[0_8px_22px_rgba(23,32,42,0.08)] dark:border-[#303C43] dark:bg-[#182127] dark:text-[#F4F1EA] dark:hover:border-[#46555D] dark:focus:border-[#E9856D] dark:focus:shadow-[0_8px_22px_rgba(0,0,0,0.18)] sm:w-48"
        aria-label="Sort notes"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="az">Title A–Z</option>
      </select>

      {/* Custom arrow */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-lg bg-[#F1EEE8] p-2 text-[#71808A] transition-colors dark:bg-[#243139] dark:text-[#A7B0B4]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </div>
</section>
        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-[#F4B9AC] bg-[#FFF0EC] px-4 py-3 text-sm font-medium text-[#B7442E] dark:border-[#6B3A34] dark:bg-[#35211F] dark:text-[#F2A18F]">
            {error}
          </div>
        )}

        {/* Notes */}
        <section className="mt-7">
          {isLoading ? (
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl border border-[#E3DFD6] bg-[#FFFDF9] dark:border-[#354149] dark:bg-[#1B252B]"
                />
              ))}
            </div>
          ) : filteredNotes.length > 0 ? (
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note, index) => (
                <div
                  key={note.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <NoteCard
                    note={note}
                    searchTerm={search}
                    onDelete={handleDeleteNote}
                    onEdit={handleEditNote}
                    onToggleFavorite={handleToggleFavorite}
                    onRestore={
                      view === "trash" ? handleRestoreNote : undefined
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-slide-up rounded-2xl border border-dashed border-[#CEC9BF] bg-[#FFFDF9] px-6 py-16 text-center shadow-[0_8px_24px_rgba(23,32,42,0.04)] dark:border-[#354149] dark:bg-[#1B252B]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F9DDD4] text-2xl text-[#C9543A] dark:bg-[#4A302C] dark:text-[#E9856D]">
                {view === "favorites"
                  ? "★"
                  : view === "trash"
                    ? "🗑"
                    : "✦"}
              </div>

              <h2 className="mt-5 text-xl font-semibold text-[#17202A] dark:text-[#F5F2EB]">
                {view === "favorites"
                  ? "No favorite notes"
                  : view === "trash"
                    ? "Trash is empty"
                    : search
                      ? "No notes found"
                      : "No notes yet"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#71808A] dark:text-[#A7B0B4]">
                {view === "favorites"
                  ? "Star the notes you want to keep close."
                  : view === "trash"
                    ? "Notes you delete will appear here."
                    : search
                      ? "Try searching for another title or keyword."
                      : "Create your first note and start organizing your ideas."}
              </p>

              {!search && view === "active" && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-6 rounded-xl bg-[#17202A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#273642]"
                >
                  Create your first note
                </button>
              )}
            </div>
          )}
        </section>

        {/* Add Modal */}
        {isAddModalOpen && (
          <AddNoteForm
            onAddNote={handleAddNote}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}

        {/* Edit Modal */}
        {editingNote && (
          <EditNoteForm
            title={editingNote.title}
            content={editingNote.content}
            onUpdateNote={handleUpdateNote}
            onClose={() => setEditingNote(null)}
          />
        )}

        {/* Delete Confirmation Modal */}
        {noteToDelete !== null && (
          <DeleteConfirmModal
            onConfirm={confirmDeleteNote}
            onClose={() => setNoteToDelete(null)}
          />
        )}
      </div>
    </main>
  );
}