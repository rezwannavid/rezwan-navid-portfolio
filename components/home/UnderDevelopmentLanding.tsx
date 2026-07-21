export function UnderDevelopmentLanding() {
  return (
    <main className="development-landing">
      <div className="development-stage">
        <h1 className="development-title">
          <span>Site in </span>
          <strong>Development</strong>
        </h1>

        <img
          className="development-portrait"
          src="/mir-rezwan-navid-portrait.svg"
          alt="Pixel portrait of Mir Rezwan Navid"
          width="380"
          height="380"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />

        <a className="development-email" href="mailto:m.rezwannavid@gmail.com">
          <span>Email me</span>
        </a>
      </div>
    </main>
  );
}
