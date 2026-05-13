export default function Navbar() {
  return (
    <nav id="navbar" aria-label="Primary navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#hero" className="group flex items-center gap-3" aria-label="AetherCore home">
          <span className="brand-mark" aria-hidden="true">
            <picture className="brand-picture">
              <source srcSet="/assets/logo.avif" type="image/avif" />
              <source srcSet="/assets/logo.webp" type="image/webp" />
              <img src="/assets/logo-96.png" alt="" className="brand-logo w-10 h-10 object-contain" loading="eager" decoding="async" />
            </picture>
          </span>
          <span className="font-display text-lg font-light text-text">AetherCore</span>
        </a>

        <div className="desktop-nav hidden items-center gap-8 md:flex">
          <a href="#what" className="nav-link text-sm font-light" data-nav-link aria-label="Go to What it is section">What it is</a>
          <a href="#architecture" className="nav-link text-sm font-light" data-nav-link aria-label="Go to Architecture section">Architecture</a>
          <a href="#how" className="nav-link text-sm font-light" data-nav-link aria-label="Go to How it works section">How it works</a>
          <a href="#capabilities" className="nav-link text-sm font-light" data-nav-link aria-label="Go to Capabilities section">Capabilities</a>
          <a href="#vision" className="nav-link text-sm font-light" data-nav-link aria-label="Go to Vision section">Vision</a>
        </div>

        <div className="header-controls hidden items-center gap-3 md:flex">
          <div className="language-switch" role="group" aria-label="Language">
            <button type="button" data-lang-toggle data-lang="en" aria-pressed="true">EN</button>
            <button type="button" data-lang-toggle data-lang="pt-BR" aria-pressed="false">PT</button>
          </div>

          <div className="theme-switch" role="group" aria-label="Theme">
            <button type="button" data-theme-toggle data-theme="offwhite" aria-pressed="true" aria-label="Use off-white theme" title="Off-white">
              <i className="bi bi-sun" aria-hidden="true"></i>
            </button>
            <button type="button" data-theme-toggle data-theme="navy" aria-pressed="false" aria-label="Use navy theme" title="Navy">
              <i className="bi bi-moon-stars" aria-hidden="true"></i>
            </button>
          </div>

          <a href="#cta" className="btn-primary btn-nav desktop-cta" data-nav-link aria-label="Get early access to AetherCore">
            Get Early Access
            <i className="bi bi-arrow-right-short" aria-hidden="true"></i>
          </a>
        </div>

        <button id="nav-toggle" className="nav-toggle md:hidden" type="button" aria-label="Open navigation menu" aria-controls="mobile-menu" aria-expanded="false">
          <i className="bi bi-list" aria-hidden="true"></i>
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu md:hidden" aria-hidden="true">
        <div className="flex flex-col gap-1 p-3">
          <a href="#what" className="nav-link rounded-md px-4 py-3 text-sm" data-nav-link data-mobile-link>What it is</a>
          <a href="#architecture" className="nav-link rounded-md px-4 py-3 text-sm" data-nav-link data-mobile-link>Architecture</a>
          <a href="#how" className="nav-link rounded-md px-4 py-3 text-sm" data-nav-link data-mobile-link>How it works</a>
          <a href="#capabilities" className="nav-link rounded-md px-4 py-3 text-sm" data-nav-link data-mobile-link>Capabilities</a>
          <a href="#vision" className="nav-link rounded-md px-4 py-3 text-sm" data-nav-link data-mobile-link>Vision</a>
          <div className="language-switch mobile-language-switch" role="group" aria-label="Language">
            <button type="button" data-lang-toggle data-lang="en" aria-pressed="true">EN</button>
            <button type="button" data-lang-toggle data-lang="pt-BR" aria-pressed="false">PT</button>
          </div>
          <div className="theme-switch mobile-theme-switch" role="group" aria-label="Theme">
            <button type="button" data-theme-toggle data-theme="offwhite" aria-pressed="true" aria-label="Use off-white theme" title="Off-white">
              <i className="bi bi-sun" aria-hidden="true"></i>
            </button>
            <button type="button" data-theme-toggle data-theme="navy" aria-pressed="false" aria-label="Use navy theme" title="Navy">
              <i className="bi bi-moon-stars" aria-hidden="true"></i>
            </button>
          </div>
          <a href="#cta" className="btn-primary mt-2 w-full" data-nav-link data-mobile-link>Get Early Access <i className="bi bi-arrow-right-short" aria-hidden="true"></i></a>
        </div>
      </div>
    </nav>
  );
}
