import { useEffect, useRef, type CSSProperties } from 'react';

const lineStyle = (delay: string) => ({ '--line-delay': delay }) as CSSProperties;

const runtimeCards = [
  {
    number: '01',
    title: 'Entrada real',
    body: 'Arquivos, pastas e metas entram como material de trabalho, não como conversa solta.',
  },
  {
    number: '02',
    title: 'Plano auditável',
    body: 'O agente divide a tarefa em passos visíveis antes de tocar no workspace.',
  },
  {
    number: '03',
    title: 'Execução nativa',
    body: 'Ferramentas locais fazem leitura, escrita, diffs e geração de artefatos com controle.',
  },
  {
    number: '04',
    title: 'Controle humano',
    body: 'Quando há risco, a ação para. Aprovação explícita vira parte da infraestrutura.',
  },
];

const runtimeSlides = [
  {
    kicker: 'Camada 01',
    title: 'Local',
    body: 'O dispositivo continua sendo o ponto de custódia padrão.',
  },
  {
    kicker: 'Camada 02',
    title: 'Agente',
    body: 'O runtime entende arquivos, contexto e intenção operacional.',
  },
  {
    kicker: 'Camada 03',
    title: 'Governança',
    body: 'Política, diffs, memória e aprovações ficam visíveis no loop.',
  },
  {
    kicker: 'Camada 04',
    title: 'Infra',
    body: 'O horizonte é híbrido: local por padrão, servidores dedicados quando fizer sentido.',
  },
  {
    kicker: 'Beta',
    title: 'Founder',
    body: 'Quem entra agora testa fluxo real antes da abertura ampla.',
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function ScrollDrivenRuntime() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cta = document.getElementById('cta');
    const previous = section.previousElementSibling;

    cta?.classList.add('ac-sda-cta-enhanced');
    previous?.classList.add('ac-sda-vision-enhanced');

    const measure = () => {
      const track = section.querySelector<HTMLElement>('.ac-sda-track');
      if (!track) return;

      const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1;
      const distance = Math.max(0, track.scrollWidth - viewportWidth);
      track.style.setProperty('--ac-track-distance', `${distance}px`);
    };

    const update = () => {
      frame = 0;
      measure();

      const vh = window.innerHeight || document.documentElement.clientHeight || 1;
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, rect.height - vh);
      const sectionProgress = reduceMotion ? 1 : clamp(-rect.top / total);

      section.style.setProperty('--ac-section-p', sectionProgress.toFixed(4));
      section.style.setProperty('--ac-bg-angle', `${(sectionProgress * 260).toFixed(2)}deg`);
      section.style.setProperty('--ac-bg-y', `${((sectionProgress - 0.5) * -56).toFixed(2)}px`);
      section.style.setProperty('--ac-bg-rotate', `${(sectionProgress * 2).toFixed(2)}deg`);

      section.querySelectorAll<HTMLElement>('[data-ac-reveal]').forEach((el) => {
        const itemRect = el.getBoundingClientRect();
        const start = vh * 0.92;
        const end = -itemRect.height * 0.1;
        const progress = reduceMotion
          ? 1
          : clamp((start - itemRect.top) / Math.max(1, start - end));

        const isHead = el.classList.contains('ac-sda-head');
        const opacityBase = isHead ? 0.62 : 0.28;
        const yRange = isHead ? 12 : 24;
        const blurRange = isHead ? 0.8 : 3;
        const scaleBase = isHead ? 0.996 : 0.99;

        el.style.setProperty('--ac-p', progress.toFixed(4));
        el.style.setProperty('--ac-o', (opacityBase + progress * (1 - opacityBase)).toFixed(4));
        el.style.setProperty('--ac-y', `${((1 - progress) * yRange).toFixed(2)}px`);
        el.style.setProperty('--ac-scale', (scaleBase + progress * (1 - scaleBase)).toFixed(4));
        el.style.setProperty('--ac-blur', `${((1 - progress) * blurRange).toFixed(2)}px`);
        el.classList.toggle('is-visible', progress > 0.08);

        if (el.classList.contains('ac-sda-card')) {
          el.style.setProperty('--ac-card-o', (0.24 + progress * 0.76).toFixed(4));
          el.style.setProperty('--ac-card-y', `${((1 - progress) * 28).toFixed(2)}px`);
          el.style.setProperty('--ac-card-rx', `${((1 - progress) * 5).toFixed(2)}deg`);
          el.style.setProperty('--ac-card-blur', `${((1 - progress) * 4).toFixed(2)}px`);
          el.style.setProperty('--ac-card-glow-y', `${((1 - progress) * 32).toFixed(2)}px`);
        }
      });

      section.querySelectorAll<HTMLElement>('[data-ac-section-progress]').forEach((el) => {
        const itemRect = el.getBoundingClientRect();
        const denominator = Math.max(1, itemRect.height - vh);
        const progress = reduceMotion ? 1 : clamp(-itemRect.top / denominator);
        const consoleRange = window.innerWidth <= 980 ? 24 : 34;
        const nodeFactor = 0.62 + progress * 0.38;
        const lineProgress = (line: HTMLElement) => {
          const delay = Number.parseFloat(line.style.getPropertyValue('--line-delay') || '0');
          return clamp((progress - delay) * 4);
        };

        el.style.setProperty('--ac-sp', progress.toFixed(4));
        el.style.setProperty('--ac-console-y', `${((0.5 - progress) * consoleRange).toFixed(2)}px`);
        el.style.setProperty('--ac-console-rx', `${((0.5 - progress) * 6).toFixed(2)}deg`);
        el.style.setProperty('--ac-console-ry', `${(-11 + progress * 20).toFixed(2)}deg`);
        el.style.setProperty('--ac-console-shine-x', `${(-72 + progress * 150).toFixed(2)}%`);
        el.style.setProperty('--ac-core-rx', `${(58 - progress * 34).toFixed(2)}deg`);
        el.style.setProperty('--ac-core-rz', `${(-42 + progress * 86).toFixed(2)}deg`);
        el.style.setProperty('--ac-core-scale', (0.86 + progress * 0.22).toFixed(4));
        el.style.setProperty('--node-scale', (0.92 + progress * 0.08).toFixed(4));
        el.style.setProperty('--ac-beam-rotate', `${(progress * 160).toFixed(2)}deg`);
        el.style.setProperty('--ac-beam-scale', (0.78 + progress * 0.22).toFixed(4));
        el.style.setProperty('--ac-beam-o', (0.34 + progress * 0.42).toFixed(4));

        el.querySelectorAll<HTMLElement>('.ac-sda-line').forEach((line) => {
          const itemProgress = lineProgress(line);
          line.style.setProperty('--line-o', Math.max(0.26, itemProgress).toFixed(4));
          line.style.setProperty('--line-x', `${((1 - itemProgress) * -16).toFixed(2)}px`);
        });

        el.querySelectorAll<HTMLElement>('.ac-sda-node').forEach((node) => {
          const styles = window.getComputedStyle(node);
          const x = Number.parseFloat(styles.getPropertyValue('--x') || '0');
          const y = Number.parseFloat(styles.getPropertyValue('--y') || '0');
          node.style.setProperty('--node-tx', `${(x * nodeFactor).toFixed(2)}px`);
          node.style.setProperty('--node-ty', `${(y * nodeFactor).toFixed(2)}px`);
        });

        if (el.classList.contains('ac-sda-native')) {
          const track = el.querySelector<HTMLElement>('.ac-sda-track');
          const distance = Number.parseFloat(track?.style.getPropertyValue('--ac-track-distance') || '0');
          track?.style.setProperty('--ac-track-x', `${(-distance * progress).toFixed(2)}px`);
        }
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    measure();
    schedule();
    window.setTimeout(schedule, 80);
    window.setTimeout(schedule, 500);
    window.dispatchEvent(new CustomEvent('aether:sda-mounted'));

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(section);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', schedule, { once: true });
    window.addEventListener('aether:localechange', schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
      window.removeEventListener('aether:localechange', schedule);
      cta?.classList.remove('ac-sda-cta-enhanced');
      previous?.classList.remove('ac-sda-vision-enhanced');
    };
  }, []);

  return (
    <section
      id="scroll-driven-top-tier"
      ref={sectionRef}
      className="ac-sda-section"
      aria-labelledby="ac-sda-title"
      data-ac-section-progress
    >
      <div className="ac-sda-wrap">
        <header className="ac-sda-head ac-sda-reveal" data-ac-reveal>
          <p className="ac-sda-eyebrow">10 — Scroll-Driven Runtime</p>
          <h2 id="ac-sda-title" className="ac-sda-title">Do plano de controle ao loop vivo.</h2>
          <p className="ac-sda-copy">
            Uma camada visual para mostrar o que acontece entre a visão de infraestrutura e o acesso ao beta:
            arquivos entram, o agente planeja, ferramentas nativas executam, a política segura e o humano aprova.
          </p>
          <div className="ac-sda-badges" aria-label="Recursos de animação aplicados">
            <span className="ac-sda-badge ac-sda-native-css-note">Scroll timeline</span>
            <span className="ac-sda-badge">Sticky 3D</span>
            <span className="ac-sda-badge">Parallax governado</span>
            <span className="ac-sda-badge">JS fallback</span>
          </div>
        </header>

        <div className="ac-sda-stage" data-ac-section-progress>
          <div className="ac-sda-sticky">
            <article className="ac-sda-console" aria-label="Simulação de execução governada">
              <div className="ac-sda-console-top">
                <span className="ac-sda-dots" aria-hidden="true"><span></span><span></span><span></span></span>
                <span>Aether loop / local-first</span>
              </div>
              <div className="ac-sda-console-body">
                <p className="ac-sda-kicker">execução governada</p>
                <h3 className="ac-sda-console-title">O scroll mostra a cadeia inteira.</h3>
                <div className="ac-sda-lines">
                  <p className="ac-sda-line" style={lineStyle('.04')}><i></i><span>Workspace local indexado sem tirar custódia dos arquivos.</span></p>
                  <p className="ac-sda-line" style={lineStyle('.18')}><i></i><span>Aether Agent roteia motor, memória e busca RAG por contexto.</span></p>
                  <p className="ac-sda-line" style={lineStyle('.34')}><i></i><span>Ferramentas Rust preparam diffs, ações e artefatos verificáveis.</span></p>
                  <p className="ac-sda-line" style={lineStyle('.50')}><i></i><span>ARL pausa o que é sensível antes de modificar ou enviar.</span></p>
                  <p className="ac-sda-line" style={lineStyle('.66')}><i></i><span>Log selado: trabalho real, rastreável e reversível.</span></p>
                </div>
                <div className="ac-sda-progress-shell" aria-hidden="true"><div className="ac-sda-progress-fill"></div></div>
              </div>
            </article>

            <div className="ac-sda-orchestrator" aria-hidden="true">
              <div className="ac-sda-beam"></div>
              <div className="ac-sda-core">
                <img src="/assets/logo-96.png" alt="" className="ac-sda-core-logo" />
              </div>
              <div className="ac-sda-node local"><strong>Cofre Local</strong><span>custódia</span></div>
              <div className="ac-sda-node rag"><strong>RAG Search</strong><span>contexto</span></div>
              <div className="ac-sda-node arl"><strong>ARL Gate</strong><span>aprovação</span></div>
              <div className="ac-sda-node rust"><strong>Rust Tools</strong><span>execução</span></div>
            </div>
          </div>
        </div>

        <div className="ac-sda-cards">
          {runtimeCards.map((card) => (
            <article className="ac-sda-card" data-ac-reveal key={card.number}>
              <span className="ac-sda-card-number">{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>

        <div className="ac-sda-native" data-ac-section-progress>
          <div className="ac-sda-native-sticky">
            <div className="ac-sda-native-head ac-sda-reveal" data-ac-reveal>
              <p className="ac-sda-eyebrow">Scroll-Driven Animation — melhorado</p>
              <h3>Uma narrativa horizontal antes do beta.</h3>
            </div>
            <div className="ac-sda-track" aria-label="Linha de transformação do AetherCore">
              {runtimeSlides.map((slide) => (
                <article className="ac-sda-slide" key={slide.kicker}>
                  <div>
                    <strong>{slide.kicker}</strong>
                    <h4>{slide.title}</h4>
                  </div>
                  <p>{slide.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
