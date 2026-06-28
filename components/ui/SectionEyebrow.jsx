export default function SectionEyebrow({ children, className = "" }) {
  return (
    <p
      className={`font-util text-[0.65rem] font-medium uppercase tracking-[0.18em] text-gold md:text-xs ${className}`}
    >
      {children}
    </p>
  );
}
