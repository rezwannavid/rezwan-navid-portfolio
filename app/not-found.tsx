import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <img
          className="not-found-code"
          src="/404.png"
          alt="404"
          width={1632}
          height={864}
        />
        <p className="not-found-message">
          Took a wrong turn. Go <Link href="/">home</Link>. Or go big?
        </p>
      </div>
    </main>
  );
}
