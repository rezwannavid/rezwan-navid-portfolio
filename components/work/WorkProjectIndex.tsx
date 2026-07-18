export function WorkProjectIndex({ count, active }: { count: number; active: number }) {
  return (
    <nav className="work-project-index" aria-label="Project index">
      {Array.from({ length: count }, (_, index) => (
        <a key={index} href={`#project-${String(index + 1).padStart(2, "0")}`} className={index === active ? "active" : ""} aria-label={`Go to project ${index + 1}`} aria-current={index === active ? "true" : undefined}>
          <span />
        </a>
      ))}
    </nav>
  );
}
