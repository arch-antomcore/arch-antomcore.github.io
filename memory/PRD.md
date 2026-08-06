# PRD — AetherCore Redesign Awwwards-Level

## Problema Original
Refatoração completa do design do site AetherCore (React + FastAPI + MongoDB): corrigir cursor customizado invisível, reformular seção de preços, padronizar cards e aplicar tendências Awwwards (tipografia editorial gigante, scroll-driven animations, micro-interações). Site original entregue via ZIP (`AetherCore-Awwwards.zip`); comportamento do cursor de referência em `cursor-preview.html`. Conteúdo PT-BR mantido; rotas preservadas. Entrega final: ZIP do site completo.

## Arquitetura
- Frontend: React 19 (CRA + craco), Tailwind, framer-motion, GSAP (dep), Lenis (smooth scroll), shadcn/ui
- Backend: FastAPI + MongoDB (template padrão, sem alterações — site é institucional/estático)
- 16 páginas: /, /produto, /precos, /arquitetura, /plugins, /casos-de-uso, /principios, /faq, /blog, /sustentabilidade, /sobre, /dossie, /roadmap, /referencias, /privacidade, /demo-glass
- Craco config: restaurado o shim de compatibilidade webpack-dev-server v5 do template (o do ZIP quebrava o dev server)

## Personas
- Empresas B2B (jurídico, financeiro, controladoria) que buscam IA local sem vazamento de dados
- Operadores individuais avaliando planos (Free/Go/Enterprise/Scale)

## Implementado (2026-06)
### Fase 1-2 — Cursor customizado (BUG RAIZ CORRIGIDO)
- Causa: `.motion-tier-low` escondia dot/ring com `display:none` mas `cursor:none` (via `@media pointer:fine`) permanecia → nenhum cursor em máquinas "low tier"/reduced-motion
- Fix: `cursor:none` agora só se aplica quando `html.aether-cursor-active` (classe adicionada/removida pelo componente `CustomCursor` em `AetherKit.jsx`); componente não ativa em pointer coarse ou prefers-reduced-motion; regra motion-tier-low removida
- Física fiel ao preview: dot 8px #FF3B00 instantâneo, ring 32px spring (stiffness 0.16, damping 0.75), hover cresce a 50px com fill translúcido

### Fase 3 — Preços reformulados
- `PricingSection.jsx` reescrito: cards editoriais numerados //01 //02 //03, plano Go com borda/glow laranja + chip Recomendado, tilt sutil no hover, checks laranja com stagger
- Toggle Mensal/Anual: pill spring animado com badge -20% integrado (inverte cores quando ativo)
- Preço com slide AnimatePresence; fonte reduz para 4 dígitos (1430 não corta)
- Transição claro→escuro suave (gradiente + grain, sem onda branca/violeta); aurora tangerine no lugar do violeta
- Nova tabela comparativa de features por plano (`FeatureMatrix`) com check-ins animados (spring rotate)
- `PrecosEditorial.jsx`: headings gigantes com scrub horizontal no scroll (fix de clipping em "geografia," — 7vw), marquee infinito de velocidade constante com separadores × laranja
- Fix técnico: whileInView movido para o wrapper externo (overflow-hidden clipava a interseção do observer)

### Fase 4 — Card system unificado (`.aether-card` em index.css)
- Grain texture, borda 1px, ícone em container laranja 56px (`.aether-card-icon`, inverte no hover), label monospace com dot (`.aether-card-label`), hover lift + border glow laranja
- Aplicado em: Sustentabilidade (cards reescritos com numeração //0N), Comparativo de Risco (rows + score cards + veredicto), Aether Scale banner, cards de hardware (SpecCard), alerta de coexistência

### Fase 5-6 — Scroll & padronização
- SectionRail adicionado em /sustentabilidade; já existia em /precos e /casos-de-uso
- Sistema SDA (scroll-driven animations), Lenis, KineticText, Magnetic buttons — preservados do original
- Paleta consolidada: creme #f4f1e8 / ink #211d18 / laranja #FF3B00 único accent (violeta removido do pricing)
- prefers-reduced-motion respeitado (cursor desativa, cards sem transform)

### Fase 7 — Entrega
- ZIP: `/app/frontend/public/downloads/AetherCore-Awwwards-Redesign.zip` (download: `{URL}/downloads/AetherCore-Awwwards-Redesign.zip`)

## Backlog / P1-P2
- P1: SectionRail nas demais páginas (produto, arquitetura, principios, faq...)
- P1: Regenerar ZIP após qualquer nova alteração
- P2: Contadores numéricos animados nos stats do PrecosEditorial (count-up)
- P2: Transições de página com clip-path (PageTransition atual usa fade)
- P2: Revisão mobile detalhada de todas as 16 rotas

## Notas técnicas
- NUNCA usar o craco.config.js do ZIP original (incompatível com webpack-dev-server 5.2.4 pinado nas resolutions)
- Marquee: `.aether-marquee` (42s linear infinite, translateX -50%, conteúdo duplicado 2x)
- Dark stage de preços usa escape-hatch CSS `[data-testid="pricing-stage"]` para não sofrer o remap light-theme
