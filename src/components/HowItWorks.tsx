export default function HowItWorks() {
  return (
    <section id="how" className="loop-section section-border relative overflow-hidden px-6 py-24" aria-labelledby="how-title">
      <div className="mx-auto max-w-7xl">
        <div className="scroll-kinetic-card fade-up glass-panel mb-12 text-center">
          <div className="mb-4 flex items-center justify-center">
            <span className="gold-line" aria-hidden="true"></span>
            <span className="label-kicker">04 — HOW IT WORKS</span>
          </div>
          <h2 id="how-title" className="section-title-lg">The cognitive loop.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[.98rem] font-light leading-relaxed text-mid">
            Every goal AetherCore receives passes through planning, tool execution, observation, and ARL supervision until the task reaches a useful result or asks for your decision.
          </p>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="loop-diagram-shell diagram-frame fade-in relative flex items-center justify-center" aria-label="Interactive cognitive loop diagram">
            <div id="loop-3d" className="loop-3d" aria-hidden="true"></div>
            <div className="ring-spin" aria-hidden="true"></div>
            <div className="ring-spin-rev" aria-hidden="true"></div>

            <div className="center-hub flex items-center justify-center p-2" aria-hidden="true">
              <img src="/assets/logo-96.png" alt="" className="w-full h-full object-contain" />
            </div>

            <button id="node-planner" className="loop-node node-planner absolute cursor-pointer" type="button" data-loop-node="planner" aria-controls="detail-planner" aria-expanded="false" aria-label="Show Planner phase details">
              <div className="loop-node-inner card px-5 py-4 text-center">
                <span className="node-icon block" aria-hidden="true"><i className="bi bi-diagram-3"></i></span>
                <span className="loop-label block font-display text-base font-light text-text">Planner</span>
                <span className="mt-1 block font-mono text-xs text-dim">Decomposes goal</span>
              </div>
            </button>

            <button id="node-executor" className="loop-node node-executor absolute cursor-pointer" type="button" data-loop-node="executor" aria-controls="detail-executor" aria-expanded="false" aria-label="Show Executor phase details">
              <div className="loop-node-inner card px-5 py-4 text-center">
                <span className="node-icon block" aria-hidden="true"><i className="bi bi-terminal"></i></span>
                <span className="loop-label block font-display text-base font-light text-text">Executor</span>
                <span className="mt-1 block font-mono text-xs text-dim">Runs actions</span>
              </div>
            </button>

            <button id="node-critic" className="loop-node node-critic absolute cursor-pointer" type="button" data-loop-node="critic" aria-controls="detail-critic" aria-expanded="false" aria-label="Show Critic phase details">
              <div className="loop-node-inner card px-5 py-4 text-center">
                <span className="node-icon block" aria-hidden="true"><i className="bi bi-search"></i></span>
                <span className="loop-label block font-display text-base font-light text-text">Critic</span>
                <span className="mt-1 block font-mono text-xs text-dim">Evaluates result</span>
              </div>
            </button>

            <svg className="diagram-arrows absolute" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true" focusable="false">
              <path className="loop-arrow" d="M200 50 A150 150 0 0 1 329.9 275"/>
              <path className="loop-arrow" d="M329.9 275 A150 150 0 0 1 70.1 275"/>
              <path className="loop-arrow" d="M70.1 275 A150 150 0 0 1 200 50"/>
              <defs>
                <marker id="arr" markerWidth="8" markerHeight="8" refX="5.5" refY="4" orient="auto" markerUnits="strokeWidth">
                  <path d="M1,1 L7,4 L1,7 Z" fill="rgba(216,189,120,.5)"/>
                </marker>
              </defs>
            </svg>
          </div>

          <div className="cascade space-y-5">
            <article id="detail-planner" className="scroll-kinetic-card card p-6 transition-all duration-300" role="region" aria-labelledby="node-planner">
              <div className="flex items-start gap-4">
                <div className="cap-icon" aria-hidden="true"><i className="bi bi-diagram-3"></i></div>
                <div>
                  <h3 className="detail-title mb-1 font-display font-light">Planner</h3>
                  <p className="mb-3 font-mono text-xs text-gold">PHASE 01</p>
                  <p className="text-sm font-light leading-relaxed text-mid">
                    Receives the high-level goal, checks available local context, decomposes it into ordered subtasks, and defines success criteria before any action is taken.
                  </p>
                </div>
              </div>
            </article>

            <article id="detail-executor" className="scroll-kinetic-card card p-6 transition-all duration-300" role="region" aria-labelledby="node-executor">
              <div className="flex items-start gap-4">
                <div className="cap-icon" aria-hidden="true"><i className="bi bi-terminal"></i></div>
                <div>
                  <h3 className="detail-title mb-1 font-display font-light">Executor</h3>
                  <p className="mb-3 font-mono text-xs text-gold">PHASE 02</p>
                  <p className="text-sm font-light leading-relaxed text-mid">
                    Translates the plan into real actions: reading files, searching workspaces, analyzing documents, using browser tools, writing outputs, or running code when permission allows.
                  </p>
                </div>
              </div>
            </article>

            <article id="detail-critic" className="scroll-kinetic-card card p-6 transition-all duration-300" role="region" aria-labelledby="node-critic">
              <div className="flex items-start gap-4">
                <div className="cap-icon" aria-hidden="true"><i className="bi bi-search"></i></div>
                <div>
                  <h3 className="detail-title mb-1 font-display font-light">Critic</h3>
                  <p className="mb-3 font-mono text-xs text-gold">PHASE 03</p>
                  <p className="text-sm font-light leading-relaxed text-mid">
                    Compares the result against the goal, records trace events, applies output guardrails, and either closes the loop or adjusts the plan for another iteration.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
