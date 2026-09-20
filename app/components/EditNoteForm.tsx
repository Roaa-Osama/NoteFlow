"use client";

import { useState } from "react";

type EditNoteFormProps = {
  title: string;
  content: string;
  onUpdateNote: (title: string, content: string) => Promise<void>;
  onClose: () => void;
};

export default function EditNoteForm({
  title: initialTitle,
  content: initialContent,
  onUpdateNote,
  onClose,
}: EditNoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  async function handleSubmit() {
    let hasError = false;

    if (!title.trim()) {
      setTitleError("Title is required.");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!content.trim()) {
      setContentError("Content is required.");
      hasError = true;
    } else {
      setContentError("");
    }

    if (hasError) {
      return;
    }

    await onUpdateNote(title.trim(), content.trim());
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17202A]/60 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-note-title"
    >
      <div className="animate-slide-up w-full max-w-lg rounded-2xl border border-white/70 bg-[#FFFDF9] p-6 shadow-[0_24px_70px_rgba(23,32,42,0.24)] dark:border-[#354149] dark:bg-[#1B252B] sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E76F51]">
              Edit note
            </p>

            <h2
              id="edit-note-title"
              className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#17202A] dark:text-[#F5F2EB]"
            >
              Update your note
            </h2>

            <p className="mt-1 text-sm text-[#71808A] dark:text-[#A7B0B4]">
              Make changes and save them.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#9BA4A6] transition hover:bg-[#F1EEE8] hover:text-[#17202A] dark:hover:bg-[#27343B] dark:hover:text-[#F5F2EB]"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="edit-note-title-input"
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#71808A] dark:text-[#A7B0B4]"
            >
              Title
            </label>

            <input
              id="edit-note-title-input"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);

                if (event.target.value.trim()) {
                  setTitleError("");
                }
              }}
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#17202A] outline-none transition focus:ring-4 focus:ring-[#F9DDD4] dark:bg-[#11181D] dark:text-[#F5F2EB] dark:focus:ring-[#4A302C] ${
                titleError
                  ? "border-[#B7442E] focus:border-[#B7442E]"
                  : "border-[#D8D4CB] focus:border-[#E76F51] dark:border-[#354149]"
              }`}
            />

            {titleError && (
              <p className="mt-1.5 text-xs font-medium text-[#B7442E] dark:text-[#F2A18F]">
                {titleError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="edit-note-content"
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#71808A] dark:text-[#A7B0B4]"
            >
              Content
            </label>

            <textarea
              id="edit-note-content"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);

                if (event.target.value.trim()) {
                  setContentError("");
                }
              }}
              rows={7}
              className={`mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm leading-6 text-[#17202A] outline-none transition focus:ring-4 focus:ring-[#F9DDD4] dark:bg-[#11181D] dark:text-[#F5F2EB] dark:focus:ring-[#4A302C] ${
                contentError
                  ? "border-[#B7442E] focus:border-[#B7442E]"
                  : "border-[#D8D4CB] focus:border-[#E76F51] dark:border-[#354149]"
              }`}
            />

            {contentError && (
              <p className="mt-1.5 text-xs font-medium text-[#B7442E] dark:text-[#F2A18F]">
                {contentError}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#D8D4CB] px-4 py-3 text-sm font-medium text-[#52616A] transition hover:bg-[#F1EEE8] dark:border-[#354149] dark:text-[#B6C0C4] dark:hover:bg-[#27343B]"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 rounded-xl bg-[#E76F51] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#C9543A] active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}