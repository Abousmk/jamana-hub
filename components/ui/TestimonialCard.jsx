export default function TestimonialCard({ quote, name, role, location }) {
  return (
    <blockquote className="flex h-full flex-col rounded-sm bg-green-abyss/40 p-8 md:p-10">
      <p className="font-display text-lg leading-relaxed text-cream/90 md:text-xl">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-8 pt-6">
        <cite className="not-italic">
          <span className="block font-util text-xs uppercase tracking-[0.12em] text-gold">
            {name}
          </span>
          <span className="mt-1 block font-body text-sm text-cream/55">
            {role} · {location}
          </span>
        </cite>
      </footer>
    </blockquote>
  );
}
