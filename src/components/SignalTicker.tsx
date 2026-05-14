import { repeatCarousel } from '../utils/carousel';

const signalCarouselItems = [
  { type: 'feature', icon: 'bi-diagram-3', label: 'Planner → Executor → Critic', tone: 'teal' },
  { type: 'feature', icon: 'bi-folder2-open', label: 'Workspace Vaults', tone: 'gold' },
  { type: 'feature', icon: 'bi-cpu', label: 'Cofre Local + Aether Agent', tone: 'teal' },
  { type: 'feature', icon: 'bi-database', label: 'SQLite Memory + FTS5', tone: 'gold' },
  { type: 'feature', icon: 'bi-window-sidebar', label: 'CEF Desktop Runtime', tone: 'teal' },
  { type: 'feature', icon: 'bi-file-earmark-spreadsheet', label: 'Native XLSX / BI Tools', tone: 'gold' },
  { type: 'feature', icon: 'bi-shield-lock', label: 'Deny-first ARL Gates', tone: 'teal' },
  { type: 'feature', icon: 'bi-terminal', label: 'Rust IPC + Tool Registry', tone: 'gold' },
  { type: 'proof', icon: 'bi-folder2-open', kicker: 'LOCAL VAULT', label: 'Files stay local by default', tone: 'teal' },
  { type: 'proof', icon: 'bi-cpu', kicker: 'AETHER AGENT', label: 'Plans, acts, observes', tone: 'gold' },
  { type: 'proof', icon: 'bi-shield-lock', kicker: 'UPLINK GATE', label: 'Cloud only by explicit choice', tone: 'teal' },
  { type: 'proof', icon: 'bi-database', kicker: 'ARL LEDGER', label: 'Auditable execution trail', tone: 'violet' },
] as const;

export default function SignalTicker() {
  return (
    <section
      className="ticker-shell aether-scroll-carousel fade-in"
      data-aether-carousel
      data-direction="right"
      data-repeats="6"
      aria-label="AetherCore capability highlights"
    >
      <div className="aether-carousel-track signal-carousel-track" data-carousel-track>
        {repeatCarousel(signalCarouselItems, 6).map(({ item, loop, index }) => (
          <article
            key={`signal-${loop}-${index}`}
            className={`signal-card signal-card-${item.type} signal-tone-${item.tone}`}
            aria-hidden={loop > 0}
          >
            <div className="signal-icon" aria-hidden="true"><i className={`bi ${item.icon}`}></i></div>
            <div>
              {item.type === 'proof' && <p className="proof-kicker font-mono text-xs text-gold">{item.kicker}</p>}
              <h2 className={item.type === 'proof' ? 'proof-title font-display font-light text-text' : 'font-mono text-xs text-mid'}>
                {item.label}
              </h2>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
