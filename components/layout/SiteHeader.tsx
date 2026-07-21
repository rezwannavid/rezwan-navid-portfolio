import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Mir Rezwan Navid, home">
          <img src="/rezwan-navid-logo.svg" alt="" width="107" height="39" loading="eager" />
          <span>Mir Rezwan Navid</span>
        </Link>

        <div className="header-socials">
          <a className="header-linkedin" href="https://www.linkedin.com/in/rezwannavid" target="_blank" rel="noreferrer" aria-label="Mir Rezwan Navid on LinkedIn">
            <img src="/icons/LinkedIn.svg" alt="" width="18" height="18" />
          </a>
          <a href="mailto:m.rezwannavid@gmail.com" aria-label="Email Mir Rezwan Navid">
            <img src="/icons/Email.svg" alt="" width="18" height="18" />
          </a>
        </div>
      </div>
      <div className="header-divider" aria-hidden="true" />
    </header>
  );
}
