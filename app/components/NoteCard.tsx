"use client";

import { Note } from "../types/note";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type NoteCardProps = {
  note: Note;
  searchTerm?: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onRestore?: (id: number) => void;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedText({ text, searchTerm = "" }: { text: string; searchTerm?: string }) {
  const query = searchTerm.trim();

  if (!query) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "giu"));

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark
            key={`${part}-${index}`}
            className="rounded bg-[#F9B8A7] px-0.5 text-[#7F2F20] dark:bg-[#8E4A3C] dark:text-[#FFF1EC]"
          >
            {part}
          </mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

export default function NoteCard({
  note,
  searchTerm,
  onDelete,
  onEdit,
  onToggleFavorite,
  onRestore,
}: NoteCardProps) {
  const isTrash = note.deletedAt !== null;

  return (
    <article className="group h-full min-w-0 rounded-2xl border border-[#DEDAD1] border-t-4 border-t-[#E76F51] bg-[#FFFDF9] p-4 shadow-[0_8px_22px_rgba(23,32,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9C4B9] hover:shadow-[0_16px_32px_rgba(23,32,42,0.1)] dark:border-[#354149] dark:border-t-[#E9856D] dark:bg-[#1B252B] dark:hover:border-[#4A565D] sm:p-6">
      <div className="flex h-full flex-col">
        {/* Top */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 dir="auto" className="truncate text-lg font-semibold tracking-[-0.02em] text-[#17202A] transition-colors group-hover:text-[#C9543A] dark:text-[#F5F2EB] dark:group-hover:text-[#E9856D] sm:text-xl">
              <HighlightedText text={note.title} searchTerm={searchTerm} />
            </h2>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#8D979A] dark:text-[#8C999F]">
              <p className="text-[#B0B7B7] dark:text-[#68757B]">
                {isTrash ? "Moved to trash" : "Updated"} {formatDate(note.updatedAt)}
              </p>

              <p>Created {formatDate(note.createdAt)}</p>
            </div>
          </div>

          <button
            onClick={() => onToggleFavorite(note.id)}
            disabled={isTrash}
            aria-label={
              note.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className={`shrink-0 text-xl transition-all duration-200 ${
              isTrash
                ? "cursor-not-allowed text-[#D5D0C7] dark:text-[#4B555A]"
                : note.isFavorite
                  ? "scale-110 text-[#E76F51]"
                  : "text-[#B8B2A8] hover:scale-110 hover:text-[#E76F51] dark:text-[#68757B] dark:hover:text-[#E9856D]"
            }`}
          >
            {note.isFavorite ? "★" : "☆"}
          </button>
        </div>

        {/* Content */}
        <p dir="auto" className="mt-5 line-clamp-4 flex-1 break-words text-sm leading-6 text-[#52616A] dark:text-[#B6C0C4]">
          <HighlightedText text={note.content} searchTerm={searchTerm} />
        </p>

        {/* Actions */}
        <div className="mt-6 flex gap-2 border-t border-[#ECE8E1] pt-4 dark:border-[#354149]">
          {isTrash ? (
            <button
              onClick={() => onRestore?.(note.id)}
              className="w-full whitespace-nowrap rounded-xl bg-[#EEF5F1] px-3 py-2.5 text-sm font-medium text-[#3E765A] transition-all duration-200 hover:bg-[#DDEDE4] active:scale-[0.98] dark:bg-[#20372E] dark:text-[#8BC7A8] dark:hover:bg-[#29473B] sm:px-4"
            >
              Restore
            </button>
          ) : (
            <>
              <button
                onClick={() => onEdit(note.id)}
                className="flex-1 whitespace-nowrap rounded-xl bg-[#17202A] px-3 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#273642] active:scale-[0.98] sm:px-4"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(note.id)}
                className="whitespace-nowrap rounded-xl bg-[#FFF0EC] px-3 py-2.5 text-sm font-medium text-[#B7442E] transition-all duration-200 hover:bg-[#FADDD5] active:scale-[0.98] dark:bg-[#35211F] dark:text-[#F2A18F] dark:hover:bg-[#472B27] sm:px-4"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}