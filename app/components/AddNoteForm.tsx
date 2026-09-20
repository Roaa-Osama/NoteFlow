"use client";

import { useState } from "react";

type AddNoteFormProps = {
  onAddNote: (title: string, content: string) => Promise<void>;
  onClose: () => void;
};

export default function AddNoteForm({
  onAddNote,
  onClose,
}: AddNoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

    await onAddNote(title.trim(), content.trim());

    setTitle("");
    setContent("");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17202A]/60 px-4 backdrop-blur-sm dark:bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-note-title"
    >
      <div className="animate-slide-up w-full max-w-lg rounded-2xl border border-white/70 bg-[#FFFDF9] p-6 shadow-[0_24px_70px_rgba(23,32,42,0.24)] dark:border-[#354149] dark:bg-[#1B252B] sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E76F51]">
              New note
            </p>

            <h2
              id="add-note-title"
              className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#17202A] dark:text-[#F5F2EB]"
            >
              Add a new note
            </h2>

            <p className="mt-1 text-sm text-[#71808A] dark:text-[#A7B0B4]">
              Capture an idea before it gets away.
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

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="note-title"
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#71808A] dark:text-[#A7B0B4]"
            >
              Title
            </label>

            <input
              id="note-title"
              type="text"
              placeholder="Give your idea a name"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);

                if (event.target.value.trim()) {
                  setTitleError("");
                }
              }}
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#17202A] outline-none transition placeholder:text-[#A7ADAD] focus:ring-4 focus:ring-[#F9DDD4] dark:bg-[#11181D] dark:text-[#F5F2EB] dark:placeholder:text-[#68757B] dark:focus:ring-[#4A302C] ${
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

          {/* Content */}
          <div>
            <label
              htmlFor="note-content"
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#71808A] dark:text-[#A7B0B4]"
            >
              Content
            </label>

            <textarea
              id="note-content"
              placeholder="Write your note..."
              value={content}
              onChange={(event) => {
                setContent(event.target.value);

                if (event.target.value.trim()) {
                  setContentError("");
                }
              }}
              rows={7}
              className={`mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm leading-6 text-[#17202A] outline-none transition placeholder:text-[#A7ADAD] focus:ring-4 focus:ring-[#F9DDD4] dark:bg-[#11181D] dark:text-[#F5F2EB] dark:placeholder:text-[#68757B] dark:focus:ring-[#4A302C] ${
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

          {/* Buttons */}
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
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
