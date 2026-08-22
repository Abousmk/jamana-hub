export default function SectionEyebrow({ children, className = "" }) {
  return (
    <p
      className={`inline-flex max-w-full items-center gap-4 font-util text-[11px] font-medium uppercase tracking-[0.25em] text-gold/50 ${className}`}
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-[50px] shrink-0 bg-gold/60"
      />
      <span className="min-w-0">{children}</span>
    </p>
  );
}
