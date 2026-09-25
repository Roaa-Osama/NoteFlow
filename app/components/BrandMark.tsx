type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M9 25V11l18 14V11" />
        <path d="M7 29h22" />
      </svg>
    </span>
  );
}