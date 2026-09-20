"use client";

type DeleteConfirmModalProps = {
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteConfirmModal({
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17202A]/60 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-note-title"
    >
      <div className="animate-slide-up w-full max-w-md rounded-2xl border border-white/70 bg-[#FFFDF9] p-6 shadow-[0_24px_70px_rgba(23,32,42,0.24)] dark:border-[#354149] dark:bg-[#1B252B] sm:p-7">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0EC] text-xl text-[#B7442E] dark:bg-[#35211F] dark:text-[#F2A18F]">
          🗑
        </div>

        <div className="mt-5">
          <h2
            id="delete-note-title"
            className="text-xl font-bold tracking-[-0.02em] text-[#17202A] dark:text-[#F5F2EB]"
          >
            Move note to trash?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#71808A] dark:text-[#A7B0B4]">
            This note will be moved to the trash. You can restore it later.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#D8D4CB] px-4 py-3 text-sm font-medium text-[#52616A] transition hover:bg-[#F1EEE8] dark:border-[#354149] dark:text-[#B6C0C4] dark:hover:bg-[#27343B]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-[#B7442E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#963522] active:scale-[0.98]"
          >
            Move to Trash
          </button>
        </div>
      </div>
    </div>
  );
}