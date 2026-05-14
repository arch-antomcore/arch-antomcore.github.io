export default function Footer() {
  return (
    <footer className="footer-shell fade-up relative z-10 bg-opacity-0">
      <h2 className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <span className="brand-mark-sm" aria-hidden="true">
                <picture className="brand-picture">
                  <source srcSet="/assets/logo.avif" type="image/avif" />
                  <source srcSet="/assets/logo.webp" type="image/webp" />
                  <img src="/assets/logo-96.png" alt="" className="brand-logo w-10 h-10 object-contain" loading="lazy" decoding="async" />
                </picture>
              </span>
              <span className="font-display text-base font-light text-text">AetherCore</span>
            </div>
            <p className="max-w-48 text-xs font-light leading-relaxed text-dim">
              Local-first AI workspace with governed tools, explicit Uplink, and ARL visibility.
            </p>
          </div>

          <nav aria-labelledby="footer-product-title">
            <h3 id="footer-product-title" className="mb-5 font-mono text-xs text-dim">PRODUCT</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><a href="#what" className="footer-link" aria-label="Learn about Aether GO">Aether GO</a></li>
              <li><a href="#cta" className="footer-link" aria-label="Learn about Aether Enterprise">Aether Enterprise</a></li>
              <li><a href="#vision" className="footer-link" aria-label="View the AetherCore changelog">Changelog</a></li>
              <li><a href="#vision" className="footer-link" aria-label="View the AetherCore roadmap">Roadmap</a></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-enterprise-title">
            <h3 id="footer-enterprise-title" className="mb-5 font-mono text-xs text-dim">ENTERPRISE</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><a href="#capabilities" className="footer-link" aria-label="Open the AetherCore security overview">Security Overview</a></li>
              <li><a href="#how" className="footer-link" aria-label="Open the AetherCore deployment guide">Deployment Guide</a></li>
              <li><a href="#cta" className="footer-link" aria-label="Contact AetherCore sales">Contact Sales</a></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-company-title">
            <h3 id="footer-company-title" className="mb-5 font-mono text-xs text-dim">COMPANY</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><a href="#philosophy" className="footer-link" aria-label="Learn about AetherCore">About</a></li>
              <li><a href="#philosophy" className="footer-link" aria-label="Read the AetherCore privacy policy">Privacy</a></li>
              <li><a href="#cta" className="footer-link" aria-label="Read the AetherCore terms">Terms</a></li>
              <li><a href="#cta" className="footer-link" aria-label="Contact AetherCore">Contact</a></li>
            </ul>
          </nav>
        </div>

        <hr className="hr mb-6" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs text-dim">© 2026 AetherCore. Built with Rust, CEF, and local-first controls.</p>
          <p className="font-mono text-xs text-dim">Cofre Local · Aether Agent · Uplink by choice</p>
        </div>
      </div>
    </footer>
  );
}
