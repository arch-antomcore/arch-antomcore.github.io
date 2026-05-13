export default function InterfaceDemo() {
  return (
    <section id="interface" className="section-border px-6 py-20" aria-labelledby="interface-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="fade-up">
            <div className="mb-6 flex items-center">
              <span className="gold-line" aria-hidden="true"></span>
              <span className="label-kicker">08 — INTERFACE</span>
            </div>
            <h2 id="interface-title" className="section-title-md mb-6">
              Simple to talk to.<br /><em className="text-mid">Deep enough to trust.</em>
            </h2>
            <p className="mb-6 text-[.98rem] font-light leading-relaxed text-mid">
              The first screen is a governed task session. You attach or reference local files, choose the engine, watch the execution trace, and approve only operations that change state.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bullet-dot" aria-hidden="true"></span>
                <span className="text-sm font-light leading-relaxed text-mid">Plain-language task input with file, workspace, and RAG context</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bullet-dot" aria-hidden="true"></span>
                <span className="text-sm font-light leading-relaxed text-mid">Real-time execution trace with visible tool calls</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bullet-dot" aria-hidden="true"></span>
                <span className="text-sm font-light leading-relaxed text-mid">Interrupt, redirect, or approve at any point</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bullet-dot" aria-hidden="true"></span>
                <span className="text-sm font-light leading-relaxed text-mid">System-level access gated by local permissions and ARL approval</span>
              </li>
            </ul>
          </div>

          <div className="terminal-reveal motion-stable">
            <div className="card terminal-card overflow-hidden" aria-label="AetherCore interface preview">
              <div className="terminal-scanline" aria-hidden="true"></div>
              <div className="terminal-bar flex items-center gap-2 px-5 py-4">
                <span className="terminal-dot bg-[#ff5f56]" aria-hidden="true"></span>
                <span className="terminal-dot bg-[#febc2e]" aria-hidden="true"></span>
                <span className="terminal-dot bg-[#28c840]" aria-hidden="true"></span>
                <span className="ml-3 font-mono text-xs text-dim">aethercore — local session</span>
              </div>

              <div className="terminal-body space-y-5 p-6 font-mono text-sm">
                <div className="flex items-start justify-end gap-3">
                  <p id="demo-user-prompt" className="user-bubble max-w-xs rounded-2xl rounded-tr-sm px-4 py-3 text-sm font-light leading-relaxed">
                    Analyze the BI workbook, find anomalies, and draft a local audit memo.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="agent-avatar" aria-hidden="true">
                    <i className="bi bi-cpu"></i>
                  </div>
                  <div className="flex-1 space-y-2">
                    <p id="demo-status" className="text-xs leading-relaxed text-gold">ARL approval gate active</p>
                    <div id="demo-log" className="agent-bubble rounded-2xl rounded-tl-sm px-4 py-3 text-xs" aria-live="polite">
                      <p className="typing-line-demo"><i className="bi bi-diagram-3" aria-hidden="true"></i><span>Planner: decomposed workbook review into 4 governed steps</span></p>
                      <p className="typing-line-demo mt-1"><i className="bi bi-file-earmark-spreadsheet" aria-hidden="true"></i><span>Executor: ReadExcel parsed local sheets and classified BI columns</span></p>
                      <p className="typing-line-demo mt-1 text-gold"><i className="bi bi-database" aria-hidden="true"></i><span>Memory: rationale and source stored in workspace SQLite</span></p>
                      <p className="typing-line-demo mt-1 text-coral"><i className="bi bi-shield-lock" aria-hidden="true"></i><span>ARL: awaiting approval before writing audit_summary.xlsx</span></p>
                      <p className="typing-line-demo mt-1 text-teal"><i className="bi bi-check2-circle" aria-hidden="true"></i><span>Complete: redacted trace appended to local ARL ledger</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="terminal-input-bar flex items-center gap-3 px-5 py-4">
                <input
                  type="text"
                  id="demo-prompt-field"
                  className="prompt-field flex-1 rounded-lg px-3 py-2 font-mono text-xs bg-transparent border border-border text-text placeholder-dim focus:outline-none focus:border-gold"
                  aria-label="Prompt field placeholder"
                  placeholder="Type a goal (e.g. Find anomalies in Q3 reports)..."
                  autoComplete="off"
                />
                <button id="demo-execute" type="button" className="terminal-button rounded-lg px-4 py-2 font-mono text-xs transition-all" aria-label="Execute demo prompt">
                  Execute
                  <i className="bi bi-arrow-return-left ml-1" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
