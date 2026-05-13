import { repeatCarousel } from '../utils/carousel';

const architectureCarouselItems = [
  {
    type: 'layer',
    icon: 'bi-folder2-open',
    kicker: 'COFRE LOCAL',
    title: 'Local model and vault',
    body: 'Gemma/Ollama is the default local path. Workspaces, sessions, documents, logs, and vault data stay on the operator machine by default.',
    tone: 'teal',
  },
  {
    type: 'layer',
    icon: 'bi-cpu',
    kicker: 'AETHER AGENT',
    title: 'ReAct execution loop',
    body: 'The agent plans, calls tools, observes results, and persists governed context in SQLite memory under the active workspace vault.',
    tone: 'gold',
  },
  {
    type: 'layer',
    icon: 'bi-shield-lock',
    kicker: 'UPLINK GATE',
    title: 'Cloud only when explicit',
    body: 'Gemini and other external providers are labelled as Uplink paths. AetherCore does not describe cloud inference as local execution.',
    tone: 'teal',
  },
  {
    type: 'layer',
    icon: 'bi-database',
    kicker: 'ARL LEDGER',
    title: 'Approval and evidence',
    body: 'The Aether Reliability Layer records dashboards, JSONL traces, redacted previews, approval decisions, and output guardrails.',
    tone: 'violet',
  },
  {
    type: 'build',
    icon: 'bi-check2-circle',
    kicker: 'CURRENT BUILD',
    title: 'CEF desktop shell',
    body: 'The packaged runtime uses Chromium Embedded Framework with local assets, typed IPC, workspaces, sessions, settings, and ARL events.',
    tone: 'teal',
  },
  {
    type: 'build',
    icon: 'bi-file-earmark-spreadsheet',
    kicker: 'BI RUNTIME',
    title: 'Native XLSX tools',
    body: 'ReadExcel and WriteExcel run in Rust through calamine and rust_xlsxwriter. Writing spreadsheets requires Full Access and approval.',
    tone: 'gold',
  },
  {
    type: 'build',
    icon: 'bi-stars',
    kicker: 'EXTENSION SURFACE',
    title: 'Plugins, skills, MCP',
    body: 'Plugins, local skills, slash commands, BrowserReal, RAG search, and project MCP trust gates form the expansion layer.',
    tone: 'violet',
  },
] as const;

export default function Architecture() {
  return (
    <section id="architecture" className="section-border relative overflow-hidden px-6 py-20" aria-labelledby="architecture-title">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up glass-panel mb-16 max-w-3xl">
          <div className="mb-5 flex items-center">
            <span className="gold-line" aria-hidden="true"></span>
            <span className="label-kicker">03 — ARCHITECTURE</span>
          </div>
          <h2 id="architecture-title" className="section-title-lg mb-6">
            Hybrid Architecture: Real Autonomy.
          </h2>
          <p className="text-[1rem] font-light leading-relaxed text-mid">
            AetherCore is a three-pillar infrastructure: <strong className="font-light text-text">Cofre Local</strong> for local custody, <strong className="font-light text-text">Aether Agent</strong> for governed autonomy, and <strong className="font-light text-text">Uplink</strong> for external cloud providers only when explicitly selected.
          </p>
        </div>

        <div
          className="architecture-carousel-wrap aether-scroll-carousel fade-in"
          data-aether-carousel
          data-direction="left"
          data-repeats="4"
          aria-label="AetherCore architecture and current build carousel"
        >
          <div className="aether-carousel-track architecture-carousel-track" data-carousel-track>
            {repeatCarousel(architectureCarouselItems).map(({ item, loop, index }) => (
              <article
                key={`architecture-${loop}-${index}`}
                className={`aether-case-card aether-case-${item.type} signal-tone-${item.tone}`}
                aria-hidden={loop > 0}
              >
                <div className="aether-card-bg" aria-hidden="true"></div>
                <div className="aether-card-border" aria-hidden="true"></div>
                <div className="aether-card-content">
                  <div className="cap-icon" aria-hidden="true"><i className={`bi ${item.icon}`}></i></div>
                  <p className="font-mono text-xs text-gold">{item.kicker}</p>
                  <h3 className="font-display text-[1.35rem] font-light text-text">{item.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-mid">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
