import Link from "next/link";

export function PillButton() {
  return (
    <Link className="pill-button" href="mailto:hello@rezwannavid.me">
      <span>Email me</span>
      <img src="/icons/Diagonal Arrow.svg" alt="" width="20" height="20" />
    </Link>
  );
}
