"use client";

import { useEffect, useEffectEvent } from "react";

type LoadingScreenProps = {
  autoAdvance: boolean;
  onComplete: () => void;
};

export default function LoadingScreen({
  autoAdvance,
  onComplete,
}: LoadingScreenProps) {
  const completeLoading = useEffectEvent(onComplete);

  useEffect(() => {
    if (!autoAdvance) {
      return;
    }

    const timeoutId = window.setTimeout(completeLoading, 2200);
    return () => window.clearTimeout(timeoutId);
  }, [autoAdvance]);

  return (
    <main
      className="splash-screen"
      data-auto-advance={autoAdvance}
      aria-busy={autoAdvance}
    >
      <div className="splash-content">
        <h1 className="splash-wordmark" aria-label="NoteFlow">
          {Array.from("NoteFlow", (letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={`splash-letter${index > 3 ? " splash-letter-accent" : ""}`}
              style={{ animationDelay: `${index * 75}ms` }}
              aria-hidden="true"
            >
              {letter}
            </span>
          ))}
        </h1>
        <div className="splash-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </main>
  );
}
