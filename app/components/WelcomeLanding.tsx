"use client";

import BrandMark from "./BrandMark";

type WelcomeLandingProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  onEnter: () => void;
};

export default function WelcomeLanding({
  isDark,
  onToggleTheme,
  onEnter,
}: WelcomeLandingProps) {
  return (
    <main className="welcome-shell min-h-screen px-5 py-5 text-[#17252A] dark:text-[#EAF0EB] sm:px-8 sm:py-7">
      <div className="welcome-grain" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-6xl flex-col sm:min-h-[calc(100svh-3.5rem)]">
        <header className="welcome-header flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandMark className="welcome-logo" />
            <span className="text-lg font-semibold tracking-[0.01em]">NoteFlow</span>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="welcome-theme-button"
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.7 8.7 0 1 0 20.2 15.4Z" />
                <path d="M16.5 3v4m-2-2h4" />
              </svg>
            )}
          </button>
        </header>

        <section className="welcome-main grid flex-1 items-center gap-12 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-16">
          <div className="welcome-copy">
            <div className="welcome-eyebrow">
              <span className="welcome-status-dot" />
              A clear space for your next thought
            </div>

            <h1 className="mt-7 max-w-xl text-5xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]">
              Think it.
              <br />
              <span className="welcome-accent-word">Catch it.</span>
              <br />
              Keep it.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[#64736F] dark:text-[#A8B4AE] sm:text-lg sm:leading-8">
              A thoughtful home for the ideas, plans, and little details you
              want to come back to.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button type="button" onClick={onEnter} className="welcome-enter-button">
                <span>Open my workspace</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
              <span className="text-xs font-medium tracking-[0.02em] text-[#7C8985] dark:text-[#8E9C96]">
                Your thoughts, in good company.
              </span>
            </div>

            <div className="welcome-principles mt-12 grid max-w-md grid-cols-3 border-t border-[#D9DFDA] pt-5 dark:border-[#34413D]">
              <div>
                <span className="welcome-principle-index">01</span>
                <p>Capture</p>
              </div>
              <div>
                <span className="welcome-principle-index">02</span>
                <p>Find</p>
              </div>
              <div>
                <span className="welcome-principle-index">03</span>
                <p>Keep</p>
              </div>
            </div>
          </div>

          <div className="welcome-art" aria-label="A preview of the NoteFlow notes workspace">
            <div className="welcome-art-caption">
              <span>YOUR IDEAS, AT A GLANCE</span>
              <span className="welcome-caption-line" />
              <span>NF / 01</span>
            </div>

            <div className="welcome-note-stack">
              <div className="welcome-note-back welcome-note-back--one" />
              <div className="welcome-note-back welcome-note-back--two" />
              <article className="welcome-note-card">
                <div className="flex items-center justify-between">
                  <span className="welcome-note-label">TODAY&apos;S NOTE</span>
                  <span className="welcome-note-star" aria-label="Favorite note">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="m12 2.8 2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.36l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93L12 2.8Z" />
                    </svg>
                  </span>
                </div>
                <h2>Small ideas,<br />bright futures.</h2>
                <p className="welcome-note-body">
                  Make room for the thought that keeps finding its way back.
                </p>
                <div className="welcome-note-rule" />
                <div className="flex items-center justify-between text-xs text-[#84918B]">
                  <span>Personal notes</span>
                  <span>Just now</span>
                </div>
                <div className="welcome-note-mark" aria-hidden="true">N</div>
              </article>

              <div className="welcome-floating-note welcome-floating-note--top">
                <span className="welcome-floating-icon">✳</span>
                <span>Ideas worth keeping</span>
              </div>
              <div className="welcome-floating-note welcome-floating-note--bottom">
                <span className="welcome-floating-check">✓</span>
                <span>Saved for later</span>
              </div>
            </div>

            <div className="welcome-art-index"><span>01</span> / 03</div>
          </div>
        </section>

        <footer className="welcome-footer flex items-center justify-between gap-4 border-t border-[#D9DFDA] py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#84918B] dark:border-[#34413D] dark:text-[#86948E]">
          <span>Made for the thoughts that matter</span>
          <span>NoteFlow · Personal knowledge space</span>
        </footer>
      </div>
    </main>
  );
}