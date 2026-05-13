export default function Capabilities() {
  return (
    <section id="capabilities" className="section-border px-6 py-20" aria-labelledby="capabilities-title">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-16">
          <div className="mb-4 flex items-center">
            <span className="gold-line" aria-hidden="true"></span>
            <span className="label-kicker">05 — CAPABILITIES</span>
          </div>
          <h2 id="capabilities-title" className="section-title-lg">What it can do.</h2>
        </div>

        {/* ── BENTO GRID: asymmetric layout for visual hierarchy ── */}
        <div className="bento-capabilities">
          {/* Row 1: hero card + small card */}
          <article className="card gs-stagger bento-hero relative overflow-hidden p-8">
            <div className="cap-icon mb-5" aria-hidden="true"><i className="bi bi-folder2-open"></i></div>
            <h3 className="card-title-lg mb-3 font-display font-light">Controlled File Operations</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Reads, creates, edits, and stages changes across workspace files. Mutating actions require the right permission mode, and destructive actions route through ARL approval gates.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-bg p-4 font-mono text-xs" aria-label="Terminal preview">
              <span className="text-gold">aether</span> <span className="text-mid"><i className="bi bi-arrow-right-short" aria-hidden="true"></i></span> <span className="text-text">stage compliance_summary.md</span><br />
              <span className="text-dim">Security gate required... awaiting approval</span> <i className="bi bi-shield-lock text-coral" aria-hidden="true"></i>
            </div>
          </article>

          <article className="card gs-stagger bento-sm-1 p-8">
            <div className="cap-icon mb-5" aria-hidden="true"><i className="bi bi-code-slash"></i></div>
            <h3 className="card-title-md mb-3 font-display font-light">Code Execution</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Runs shell, PowerShell, and REPL workflows only under Full Access. Tool results are observable and can be blocked or sanitized by output guardrails.
            </p>
          </article>

          {/* Row 2: small + hero */}
          <article className="card gs-stagger bento-sm-2 p-8">
            <div className="cap-icon mb-5" aria-hidden="true"><i className="bi bi-globe2"></i></div>
            <h3 className="card-title-md mb-3 font-display font-light">Web Interaction</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Uses semantic web tools and BrowserReal automation in explicit, isolated browser contexts for fetches, screenshots, navigation, and page inspection.
            </p>
          </article>

          <article className="card gs-stagger bento-wide p-8">
            <div className="cap-icon mb-5" aria-hidden="true"><i className="bi bi-bar-chart-line"></i></div>
            <h3 className="card-title-lg mb-3 font-display font-light">Data Analysis</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Reads BI exports, PDFs, CSV, JSON, and native .xlsx spreadsheets locally. Rust XLSX generation is available through WriteExcel and requires approval.
            </p>
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Supported data formats">
              <span className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 font-mono text-xs text-gold">.xlsx</span>
              <span className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 font-mono text-xs text-gold">.pdf</span>
              <span className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 font-mono text-xs text-gold">.csv</span>
              <span className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 font-mono text-xs text-gold">.json</span>
              <span className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 font-mono text-xs text-gold">BI reports</span>
            </div>
          </article>

          {/* Row 3: 3 equal columns */}
          <article className="card gs-stagger aether-violet-card bento-third relative overflow-hidden p-8">
            <div className="cap-icon mb-5" aria-hidden="true"><i className="bi bi-shield-check"></i></div>
            <h3 className="card-title-md mb-3 font-display font-light">Governed Memory</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              ARL binds memory, approvals, JSONL traces, redacted previews, and execution dashboards. Sensitive actions require Human-in-the-Loop approval.
            </p>
          </article>

          <article className="card gs-stagger bento-third p-8">
            <div className="cap-icon mb-5" aria-hidden="true"><i className="bi bi-bezier2"></i></div>
            <h3 className="card-title-md mb-3 font-display font-light">Multi-step Reasoning</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Solves ambiguous goals through iterative planning, tool calls, observations, corrections, and auditable memory.
            </p>
          </article>

          <article className="card gs-stagger bento-third relative overflow-hidden p-8">
            <div className="cap-icon cap-icon-highlight mb-5" aria-hidden="true"><i className="bi bi-shield-lock"></i></div>
            <h3 className="card-title-md mb-3 font-display font-light">Data Sovereignty</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Local-first execution with explicit Uplink. Your files stay in local workspaces unless you intentionally route work through an external provider.
            </p>
          </article>
        </div>

        <div className="trust-strip mt-5 grid gap-5 md:grid-cols-4">
          <article className="trust-chip gs-stagger">
            <p className="font-mono text-xs text-gold">PERMISSIONS</p>
            <h3 className="font-display font-light text-text">Read-only by default</h3>
            <p className="text-sm font-light leading-relaxed text-mid">Standard mode inspects and searches. Workspace Write and Full Access must be chosen intentionally.</p>
          </article>
          <article className="trust-chip gs-stagger">
            <p className="font-mono text-xs text-gold">SECRETS</p>
            <h3 className="font-display font-light text-text">Redacted traces</h3>
            <p className="text-sm font-light leading-relaxed text-mid">Common tokens, passwords, API keys, hidden controls, and risky output patterns are filtered before persistence or display.</p>
          </article>
          <article className="trust-chip gs-stagger">
            <p className="font-mono text-xs text-gold">MEMORY</p>
            <h3 className="font-display font-light text-text">Governed SQLite</h3>
            <p className="text-sm font-light leading-relaxed text-mid">Session memory stores source, rationale, expiration metadata, and FTS5 search under the active workspace vault.</p>
          </article>
          <article className="trust-chip gs-stagger">
            <p className="font-mono text-xs text-gold">EXTENSIONS</p>
            <h3 className="font-display font-light text-text">Trust gates</h3>
            <p className="text-sm font-light leading-relaxed text-mid">Project MCP, plugin tools, and broad agent delegation stay behind explicit trust and permission boundaries.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
