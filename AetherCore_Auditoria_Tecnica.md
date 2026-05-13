# 🛡️ AETHERCORE: AUDITORIA TÉCNICA DE CLASSE EMPRESARIAL (SAAS)

## 1. Resumo Executivo
O **AetherSite** apresenta um design visual excepcional, focado no padrão "Premium Dark Glassmorphism", e demonstra um conceito sólido de produto. A integração com Three.js e animações GSAP cria uma "primeira impressão" imersiva e de alto valor.
No entanto, sob a ótica de um SaaS maduro, **o projeto técnico atual é um protótipo estático monolítico**. O front-end carece de arquitetura de escalabilidade (ausência de bundler, frameworks declarativos, TypeScript e componentização). A segurança contra XSS baseada em DOM é frágil, o controle de estado e internacionalização (i18n) é rudimentar e a performance depende puramente do hardware do cliente (renderização WebGL sem pausa em background). 
Para que o AetherCore vá para produção real (hospedagem, marketing e escala), o projeto exige uma refatoração arquitetural crítica.

## 2. Diagnóstico Geral do Projeto
*   **Arquitetura:** Monolítica (HTML/JS/CSS puros). Frágil para manutenção de longo prazo.
*   **Performance:** Excelente visualmente, mas perigosa no consumo de GPU/CPU em idle.
*   **Segurança:** Sem headers de segurança, vulnerável a DOM XSS via injeção interna, formulário desprotegido.
*   **UX/UI:** Estética de Nível S. Microinterações e feedback de erros precisam de evolução.
*   **SEO & Acessibilidade:** Básico. Faltam metadados dinâmicos e controle rígido de foco.

---

## 3. Tier List Completa

*   **S Tier (Imediato / Estrutural):** Migração para Bundler (Vite), Implementação de TypeScript, Refatoração para React/Vue, CSP (Content Security Policy), Otimização do Loop WebGL (Intersection Observer).
*   **A Tier (Produto / Qualidade):** Componentização da UI, Sistema robusto de i18n (i18next), Proteção do formulário de captura (CORS/CSRF), Controle de Estado Global, Tratamento de erros do Lead.
*   **B Tier (Melhorias de Impacto):** Lazy Loading de Scripts pesados, Preload de Fontes, Minificação de CSS/JS, Correção de Contrastes WCAG, Estados de Loading explícitos.
*   **C Tier (Polimento):** Sanitização avançada de SVGs, Fallback para WebGL, Scroll Snapping sem bloqueios, Efeitos Sonoros pontuais (Opcional).
*   **D Tier (Experimentais):** SSR/SSG (Next.js) para SEO extremo, PWA support, Analytics avançado com mapas de calor.

---

## 4. Lista Detalhada de 50 Melhorias

### ARQUITETURA E FERRAMENTAS (1-10)

**1. Migração para Bundler Moderno (Vite)**
*   **Área Afetada:** Build / DX
*   **Descrição:** O projeto carrega dependências via tags nativas.
*   **Por que importa:** Permite minificação, tree-shaking, cache-busting e Hot Module Replacement.
*   **Impacto / Risco:** Alto / Código exposto, carregamento não otimizado.
*   **Complexidade / Prioridade:** Média / Alta (A)
*   **Prática:** `npm create vite@latest`, mover arquivos, configurar `vite.config.js`.
*   **Arquivos:** Todos.
*   **Dependências:** Node.js.
*   **Critério de Aceite:** `npm run build` gerando `/dist` minificado.

**2. Adoção de TypeScript**
*   **Área Afetada:** Código-fonte
*   **Descrição:** `main.js` e `hero-3d.js` não possuem tipagem, dificultando refatorações.
*   **Por que importa:** Previne 40% dos bugs em tempo de compilação.
*   **Impacto / Risco:** Altíssimo / Retrabalho futuro.
*   **Complexidade / Prioridade:** Alta / Alta (A)
*   **Prática:** Renomear para `.ts`, configurar `tsconfig.json`, adicionar types do Three/GSAP.
*   **Arquivos:** `main.js`, `hero-3d.js`, `icons.js`.
*   **Critério de Aceite:** Build sem erros de tipagem.

**3. Migração para Framework Declarativo (React/Vue)**
*   **Área Afetada:** UI/Componentes
*   **Descrição:** HTML de quase 1000 linhas é insustentável para um SaaS vivo.
*   **Por que importa:** Escalabilidade de equipe, componentização, controle de ciclo de vida.
*   **Impacto / Risco:** Crítico / Manutenção impossível pós-lançamento.
*   **Complexidade / Prioridade:** Alta / Crítica (S)
*   **Prática:** Reescrever os blocos HTML em componentes (`Hero.tsx`, `Features.tsx`).
*   **Arquivos:** `index.html`.
*   **Critério de Aceite:** Todo o HTML modularizado em componentes independentes.

**4. Implementação de React-Three-Fiber (R3F)**
*   **Área Afetada:** WebGL (`hero-3d.js`)
*   **Descrição:** O WebGL imperativo é suscetível a memory leaks.
*   **Por que importa:** R3F limpa memória automaticamente ao desmontar o componente.
*   **Impacto / Risco:** Alto / Vazamento de RAM travando a aba do usuário.
*   **Complexidade / Prioridade:** Alta / A
*   **Prática:** Converter a cena Three.js para tags `<mesh>` e `<points>`.
*   **Arquivos:** `hero-3d.js`.
*   **Critério de Aceite:** Cena 3D rodando de forma declarativa e descartada no unmount.

**5. Sistema de Internacionalização Robusto (i18next)**
*   **Área Afetada:** Global (i18n)
*   **Descrição:** `main.js` faz mapeamento hardcoded em arrays `[EN, PT]`.
*   **Por que importa:** Impede a adição ágil de ES, FR ou DE.
*   **Impacto / Risco:** Médio / Escalabilidade global bloqueada.
*   **Complexidade / Prioridade:** Média / A
*   **Prática:** Instalar `i18next`, extrair strings para `en.json` e `pt.json`.
*   **Arquivos:** `main.js`.
*   **Critério de Aceite:** Idioma alternado via chave JSON sem hardcode no JS.

**6. Componentização de CSS (Tailwind/Modules)**
*   **Área Afetada:** Estilização (`styles.css`)
*   **Descrição:** Arquivo CSS massivo (1800+ linhas) com classes globais.
*   **Por que importa:** Risco de conflito de estilos; dead code (CSS não usado em produção).
*   **Impacto / Risco:** Alto / Regressão visual.
*   **Complexidade / Prioridade:** Média / A
*   **Prática:** Usar Tailwind `apply` ou CSS Modules acoplados aos componentes React.
*   **Arquivos:** `styles.css`.
*   **Critério de Aceite:** Ausência de estilos globais não mapeados por componentes.

**7. Linting e Formatação (ESLint + Prettier)**
*   **Área Afetada:** DX
*   **Descrição:** Sem regras de padrão de código.
*   **Por que importa:** Mantém qualidade visual do código quando mais devs entrarem.
*   **Impacto / Risco:** Médio / Código "espaguete".
*   **Complexidade / Prioridade:** Baixa / B
*   **Prática:** Adicionar `.eslintrc` e `.prettierrc`.
*   **Critério de Aceite:** Comando `lint` falha se houver código fora do padrão.

**8. Automação CI/CD (GitHub Actions)**
*   **Área Afetada:** Deploy
*   **Descrição:** Deploy presumivelmente manual.
*   **Por que importa:** Garantia que o que está na main vai para a cloud sem intervenção.
*   **Impacto / Risco:** Alto / Quebras em produção por esquecimento humano.
*   **Complexidade / Prioridade:** Média / A
*   **Prática:** Criar `.github/workflows/deploy.yml`.
*   **Critério de Aceite:** Commit na `main` gera build e deploy na Vercel/Netlify.

**9. Husky & Pre-commit Hooks**
*   **Área Afetada:** DX/Qualidade
*   **Descrição:** Commits aceitam código quebrado.
*   **Por que importa:** Evita que erros básicos sujem a master.
*   **Impacto / Risco:** Baixo / Perda de tempo.
*   **Complexidade / Prioridade:** Baixa / B
*   **Prática:** Instalar Husky, rodar lint-staged.
*   **Critério de Aceite:** Commits bloqueados se contiverem erros de Lint.

**10. Gerenciamento de Variáveis de Ambiente (.env)**
*   **Área Afetada:** Configuração
*   **Descrição:** Chaves de API de formulário serão hardcoded se não houver um env.
*   **Por que importa:** Segurança vital. Chaves no HTML são públicas.
*   **Impacto / Risco:** Crítico / Vazamento de dados de Mailchimp/Backend.
*   **Complexidade / Prioridade:** Baixa / S
*   **Prática:** Usar `VITE_API_URL` e injetar dinamicamente no build.
*   **Critério de Aceite:** Endpoint base de APIs vindo do env local.

### PERFORMANCE (11-20)

**11. Controle do Loop WebGL com IntersectionObserver**
*   **Área Afetada:** `hero-3d.js`
*   **Descrição:** O loop de renderização continua rodando mesmo se o usuário está no rodapé.
*   **Por que importa:** Economiza bateria e GPU do usuário, reduzindo rejeição por travamento.
*   **Impacto / Risco:** Crítico / Alta taxa de rejeição em notebooks na bateria.
*   **Complexidade / Prioridade:** Média / S
*   **Prática:** Pausar `requestAnimationFrame` quando o `.hero-3d` estiver `isIntersecting === false`.
*   **Critério de Aceite:** CPU cai de 30% para 0% (relativo à aba) quando a página está no fim.

**12. Dinamic Import do Three.js**
*   **Área Afetada:** Rede
*   **Descrição:** Three.js bloqueia ou retarda o First Contentful Paint.
*   **Por que importa:** LCP mais rápido melhora conversão e SEO.
*   **Impacto / Risco:** Alto / LCP pobre no Google PageSpeed.
*   **Complexidade / Prioridade:** Alta / A
*   **Prática:** `import('three')` via split bundle ou Suspense.
*   **Critério de Aceite:** O core da página (texto/HTML) carrega milissegundos antes do 3D.

**13. Otimização de Fontes (Preload & Display Swap)**
*   **Área Afetada:** `fonts.css` / Head HTML
*   **Descrição:** Fontes carregam sequencialmente e causam FOIT.
*   **Por que importa:** O texto "pisca" na tela.
*   **Impacto / Risco:** Médio / Má experiência de UX visual.
*   **Complexidade / Prioridade:** Baixa / B
*   **Prática:** Usar `font-display: swap` e `<link rel="preload" as="font">` para a fonte crítica (Manrope).
*   **Critério de Aceite:** FOUC mitigado nos primeiros 300ms de render.

**14. Debounce no Window Resize (Three.js)**
*   **Área Afetada:** `hero-3d.js`
*   **Descrição:** Event listener de `resize` recalcula câmera a cada pixel redimensionado.
*   **Por que importa:** Causa extrema lentidão ao reajustar janela.
*   **Impacto / Risco:** Médio / Drop extremo de FPS.
*   **Complexidade / Prioridade:** Baixa / B
*   **Prática:** Adicionar utilitário de debounce limitando recalculo a cada 150ms.
*   **Critério de Aceite:** Resize suave sem travar o navegador.

**15. Will-Change Management no GSAP**
*   **Área Afetada:** Animações CSS
*   **Descrição:** GSAP define `will-change: auto` mas em animações massivas GPU sofre.
*   **Por que importa:** Mantém os 60fps no scroll.
*   **Impacto / Risco:** Alto / Scroll travando.
*   **Complexidade / Prioridade:** Média / A
*   **Prática:** Somente acionar `will-change: transform` no `onStart` e remover no `onComplete`.
*   **Critério de Aceite:** DevTools sem paint flashing anômalo.

**16. Limite de Instâncias no Loop 3D Inferior**
*   **Área Afetada:** `loop-3d` container
*   **Descrição:** Mesma topologia do Hero para um container menor.
*   **Por que importa:** Desperdício de recursos.
*   **Impacto / Risco:** Médio / Sobrecarga Mobile.
*   **Complexidade / Prioridade:** Média / C
*   **Prática:** Reduzir contagem de partículas.
*   **Critério de Aceite:** Loop inferior com 50% dos vértices do Hero.

**17. Controle Sensível de prefers-reduced-motion**
*   **Área Afetada:** Acessibilidade/Performance
*   **Descrição:** Lógica manual tenta tratar animações lentas, mas ignora OS strict checks.
*   **Por que importa:** Questões médicas (labirintite).
*   **Impacto / Risco:** Alto / Risco com usuários sensíveis a movimento.
*   **Complexidade / Prioridade:** Média / A
*   **Prática:** Se `prefers-reduced-motion` ativo, travar Three.js totalmente.
*   **Critério de Aceite:** Cena 3D vira imagem estática.

**18. Imagens WebP / AVIF (Se existirem futuras)**
*   **Área Afetada:** Assets
*   **Descrição:** Prevenção para futuras imagens.
*   **Critério de Aceite:** Componente `<picture>` implementado.

**19. PurgeCSS para estilos não utilizados**
*   **Área Afetada:** `styles.css` / Tailwind
*   **Descrição:** Variáveis globais carregam byte inútil.
*   **Critério de Aceite:** CSS final < 30KB.

**20. Otimização do SVG Injector (`icons.js`)**
*   **Área Afetada:** Performance
*   **Descrição:** Percorre a DOM toda em runtime, atrasando TTI.
*   **Prática:** SVG inlining via build tools.

### SEGURANÇA (21-30)

**21. Headers Content-Security-Policy (CSP)**
*   **Área Afetada:** Server/Cloudflare
*   **Descrição:** Ausência de travas estruturais de headers.
*   **Por que importa:** Evita que scripts de terceiros injetem malwares na sua página.
*   **Impacto / Risco:** Crítico / Acesso a dados se invadido.
*   **Complexidade / Prioridade:** Alta / S
*   **Critério de Aceite:** Header permitindo apenas `'self'` e CDN específica.

**22. Vulnerabilidade XSS via innerHTML**
*   **Área Afetada:** `icons.js`
*   **Descrição:** `svg.innerHTML = ICONS[name]`.
*   **Por que importa:** Se nomes vierem da URL/Input, injeta `<script>`.
*   **Prática:** Usar `DOMParser.parseFromString`.
*   **Critério de Aceite:** Fim do uso de innerHTML.

**23. Prevenção de CSRF no Formulário de Acesso**
*   **Área Afetada:** Endpoint de conversão.
*   **Descrição:** Form submit não possui token.
*   **Por que importa:** Evita ataques de requisição forjada.
*   **Critério de Aceite:** Anti-forgery token no payload.

**24. Rate Limiting no Formulário**
*   **Área Afetada:** Conversão/Cloud
*   **Descrição:** Frontend não impede submissões massivas.
*   **Critério de Aceite:** Bloqueio do botão pós-submissão por 15s.

**25. Escopo Global Poluído**
*   **Área Afetada:** `main.js`
*   **Descrição:** Scripts expõem `window.AetherIcons`.
*   **Por que importa:** Extensões maliciosas podem injetar códigos.
*   **Prática:** Uso de `export/import` modules.
*   **Critério de Aceite:** Objeto `window` limpo de referências do projeto.

**26. Sanitização de Input (E-mail)**
*   **Área Afetada:** Form.
*   **Prática:** Regex robusto no front-end para evitar injeção SQL no back.

**27. Honeypot Anti-Spam**
*   **Área Afetada:** Segurança de Lead.
*   **Prática:** Input invisível via CSS para pegar bots bobos.
*   **Critério de Aceite:** Submissão aborta silenciosamente se input preenchido.

**28. Proteção contra Clickjacking**
*   **Área Afetada:** Meta/Headers.
*   **Prática:** `X-Frame-Options: DENY`.
*   **Critério de Aceite:** Site não abre em um `<iframe>`.

**29. Auditoria de Dependências NPM (Futuro)**
*   **Área Afetada:** Tooling.
*   **Prática:** Instalar pipeline de verificação.

**30. Subresource Integrity (SRI)**
*   **Área Afetada:** Scripts CDN.
*   **Descrição:** Faltam integridades no GSAP.
*   **Critério de Aceite:** Atributo `integrity` adicionado na tag de script.

### UX/UI & ESTADOS (31-40)

**31. Feedback de Loading no Formulário**
*   **Área Afetada:** Conversão.
*   **Descrição:** O botão "Acesso Antecipado" não possui spin.
*   **Impacto / Risco:** Alto / Múltiplos cliques e frustração.
*   **Critério de Aceite:** Ícone de Spinner e botão `disabled` ao clicar.

**32. Tratamento de Erro do Formulário**
*   **Área Afetada:** UX SaaS.
*   **Descrição:** Erro exibe só um texto vermelho seco.
*   **Prática:** Adicionar animação shake e borda vermelha suave.

**33. Floating Action Button (Voltar ao Topo)**
*   **Área Afetada:** UX de Navegação Longa.
*   **Critério de Aceite:** Botão fade in após 50% de scroll.

**34. Focus Visible Customizado**
*   **Área Afetada:** Acessibilidade UI.
*   **Descrição:** TAB outline é o padrão feio do navegador.
*   **Critério de Aceite:** `*:focus-visible` ring-glow Ouro.

**35. Magic Numbers no CSS -> Variáveis**
*   **Área Afetada:** Design System.
*   **Prática:** Trocar px fixos por espaçamentos globais CSS (Tokens).

**36. Aumentar Touch Targets no Mobile**
*   **Área Afetada:** UI Mobile.
*   **Descrição:** Áreas de clique devem respeitar o mínimo da Apple (44x44px).

**37. Scroll Snapping Opcional**
*   **Área Afetada:** Navegação.
*   **Prática:** `scroll-snap-type` suave em containers vitais.

**38. Tooltips para Jargões Técnicos**
*   **Área Afetada:** Retenção.
*   **Descrição:** Termos complexos soltos (Ledger ARL).
*   **Critério de Aceite:** Hover exibe explicação leve.

**39. Microinterações Sonoras**
*   **Área Afetada:** Branding.
*   **Prática:** O terminal demo acionado emite um soft-click espacial (Opcional, impacto WoWW).

**40. Suporte Temático (Light Mode SaaS)**
*   **Área Afetada:** Setor Enterprise Diurno.
*   **Critério de Aceite:** Botão switch alterando tokens CSS para tema branco limpo.

### SEO, CONVERSÃO E ESCALABILIDADE (41-50)

**41. Metadados OpenGraph Dinâmicos**
*   **Área Afetada:** SEO/Compartilhamento.
*   **Descrição:** Tags OG são estáticas. O idioma alternado no front não muda a thumbnail do link partilhado.
*   **Prática:** Geração de rotas em Back-End (Next.js).
*   **Complexidade / Prioridade:** Alta / Crítica.

**42. Geração de Sitemap.xml**
*   **Área Afetada:** Google Indexing.
*   **Prática:** Automatizar o build da sitemap root.

**43. Analytics Privacy-First (PostHog/Plausible)**
*   **Área Afetada:** Conversão SaaS B2B.
*   **Prática:** Instalar scripts de tracking para entender onde a leitura para.

**44. Atributos aria-live no Terminal Demo**
*   **Área Afetada:** Acessibilidade.
*   **Descrição:** O screen-reader precisa ler a execução do seu log para cegos.
*   **Critério de Aceite:** Uso rigoroso de `aria-live="polite"`.

**45. Hierarquia Semântica Rígida**
*   **Área Afetada:** SEO.
*   **Prática:** Consertar pulos diretos de H2 para H4 sem justificativa no HTML.

**46. Arquitetura E2E (Cypress)**
*   **Área Afetada:** Estabilidade Geral.
*   **Critério de Aceite:** Suite validando a carga WebGL, os cards em GSAP e envio do Form.

**47. Onboarding / Thank You Page**
*   **Área Afetada:** Conversão/Comunidade.
*   **Descrição:** Não existe loop de fechamento pro Lead.
*   **Prática:** Fazer redirecionamento pro canal do Discord ao dar OK no e-mail.

**48. Validação de Email Corporativo**
*   **Área Afetada:** Leads Qualificados.
*   **Prática:** Evitar o cadastro de @gmail / @hotmail se focado em ticket médio alto.

**49. Tratamento SSG vs CSR para Múltiplos Idiomas**
*   **Área Afetada:** SEO Internacional.
*   **Descrição:** SEO bots não indexam `main.js` de forma limpa, logo, sua página só existe em Inglês nos buscadores.
*   **Impacto:** Queda fatal de buscas em Português.
*   **Prioridade:** S TIER.

**50. Separação de Rotas para SaaS**
*   **Área Afetada:** Escalabilidade de Produto.
*   **Descrição:** Monolitos bloqueiam a criação de sub-páginas (Pricing, Login, App).
*   **Prática:** Dividir App (Desktop/Tauri/Web) da Landing Page de Marketing.

---

## 5. Top 10 Riscos Atuais (Ameaças Ocultas)
1. **Invisibilidade Internacional (SEO Fatal):** O Google só indexará a página principal em Inglês devido ao switch de idioma ocorrer no lado do cliente.
2. **GPU Burnout (Three.js Sem Pausa):** Falta do *Intersection Observer* superaquece notebooks inutilmente na seção do rodapé.
3. **Bloqueio Estrutural para Escalar Novas Páginas:** O uso de HTML estático + Vanilla JS bloqueia a adição eficiente de telas de Auth, Pricing, About.
4. **Vazamento de Variáveis Cloud (Security):** Qualquer chave API inserida sem um bundler será raspada e vazada em texto plano no Inspecionar do Chrome.
5. **XSS Latente em Ícones SVG (Security):** Uso irresponsável de `innerHTML` que possibilita exploração.
6. **Zero Feedback em Leads Falhos:** Se o sistema backend demorar, o lead sairá achando que ocorreu erro.
7. **Quebras Visuais em Dispositivos Low-End:** Falta da trava real global `prefers-reduced-motion` no ThreeJS.
8. **Submissão Massiva em Formulário Aberto:** DDoS no funil se exposto publicamente.
9. **Poluição de Escopo Global JS:** Extensões locais sobreescrevendo funções críticas do `window`.
10. **Single Point of Failure em Componentes UI:** Ausência de arquitetura que garanta testes granulares.

---

## 6. Top 10 Oportunidades (Ouro de SaaS)
1. Mudança IMEDIATA para **SSG (Next.js/Astro)** garantindo SEO fenomenal Global simultâneo (PT e EN).
2. Refatoração 3D para **React-Three-Fiber** (Cortando peso, tempo de carregamento e aumentando imersão declarativa).
3. Criação de rota dedicada `/thank-you` jogando Leads quentes diretamente no funil de um Servidor de Comunidade Discord.
4. Modularização para "Design Tokens" garantindo reaproveitamento da landing para o aplicativo AetherCore App Desktop.
5. Injeção Efeitos Audiovisuais Sutis no evento de "Execução de Terminal" para reforçar qualidade Apple-like.
6. Lógica E2E para evitar noites de stress do CTO via testes do Cypress no CI.
7. Integração simples, rápida e invisível de reCaptcha (v3) no Input de Form.
8. Otimizar a entrega das fontes via Preload CSS, o texto surge instantâneo ao abrir a aba.
9. Injeção de Tooltips Hover Educacionais sobre jargões de Rust/Memória ARL.
10. Hospedagem via arquitetura Edge (Vercel ou Cloudflare) resolvendo todos os problemas de CORS/CSP nativamente.

---

## 7. ~~Os 10 Quick Wins~~ (✅ Todos Concluídos ou Convertidos para React)
1. ~~Trocar `svg.innerHTML` por Parser DOM nativo no arquivo de ícones.~~
2. ~~Implementar `IntersectionObserver` básico no GSAP/Three.js parando os canvas ao saírem da view.~~
3. ~~Colocar `<link rel="preload">` explícito nas Fontes Principais (IBM Plex / Manrope).~~
4. ~~Configurar CSP Básico nas `<meta>` tags.~~
5. ~~Inserir `disabled` dinâmico e o placeholder mudando ao clicar em *"Solicitar Acesso"*.~~
6. ~~Adicionar `aria-live="polite"` no wrapper do simulador de terminal.~~
7. ~~Ocultar o ícone dos botões e svgs para screen-readers usando `aria-hidden="true"`.~~
8. ~~Centralizar cores fixas repetitivas do arquivo css gigante nas variáveis Root nativas.~~
9. ~~Ativar a tag global SRI do GSAP puxado via CDN no `index.html`.~~ (Substituído via npm install)
10. ~~Executar o preenchimento de metadados rígidos para redes sociais baseadas na Locale Padrão no HTML original.~~

---

## 8. Plano de Execução & Ordem Recomendada

### ~~Fase 1: Blindagem Core e Quick Wins (Esforço: Baixo - 1 Sem)~~ ✅ **[100% CONCLUÍDO]**
*   ~~**Foco:** Aplicar tudo da sessão 7 (Acima). Segurança imediata do forms, bloqueios anti-DDoS básicos, Pausa de Performance do Three.js e headers de segurança CSP.~~
*   ~~**Por quê:** Garante que se o lançamento for "vazado", o site vai suportar tráfego grande sem quebrar maquinas de cliente nem sua base de emails.~~

### Fase 2: Salto Arquitetural Estratégico (Esforço: Alto - 3 a 4 Sem) 🟡 **[EM ANDAMENTO - INFRAESTRUTURA BASE CRIADA]**
*   ~~**Infraestrutura Vite + React + TSX Instalada e Transpilando.**~~ ✅
*   ~~**Configuração Base Node e Linter/Prettier/Husky.**~~ ✅
*   ~~**Motor de Tradução (i18next) Configurado.**~~ ✅
*   **PENDENTE:** Fatiar as 900 linhas do `App.tsx` em Componentes Reais (`<Hero />`, `<Footer />`).
*   **PENDENTE:** Implementar a troca dinâmica de chaves de texto `{t('texto')}` no HTML.

### Fase 3: R3F, UI State e Refinamento (Esforço: Médio - 2 Sem) 🔴 **[PENDENTE]**
*   **Foco:** Transformar a lógica imperativa crua do `hero-3d.js` em algo contido pelo React Three Fiber. Adicionar Efeitos de Estado vazios (Erro, Loading), Onboarding `/thank-you` no Forms. Efeitos sonoros.
*   **Por quê:** Economia gigante de processamento unificada a um polimento final digno de produtos ultra-premium.

### Fase 4: DevOps, C.I. & Escala Produtiva (Esforço: Baixo - 1 Sem) 🔴 **[PENDENTE]**
*   **Foco:** Fechar a conta com GitHub Actions, Cypress E2E para checagem principal, e SSG (Next.js) para SEO.
*   **Por quê:** Estabilidade de repetição. Você dorme sabendo que nenhum dev júnior vai quebrar a página de vendas.

---

## 9. O que NÃO FAZER agora (Prevenção de Retrabalho Mortal)
🚫 **NÃO CRIE MAIS HTML ESTRUTURAL (PÁGINA DE LOGIN, PRICING) NESSE FORMATO.** Se você continuar fazendo páginas monolíticas, o "Débito Técnico" na Fase 2 de migração vai explodir em custos de horas e bugs de quebra de CSS. Pare de adicionar páginas novas até ir para uma lib React/Next.js.  
🚫 **NÃO ADICIONE BANCO DE DADOS DIRETO NO FRONTEND.** Colete Leads para uma API segura ou serviço simples como Formspree/Mailchimp até o back-end do produto estar robusto.  
🚫 **NÃO CRIE MAIS CÓDIGOS DE ANIMAÇÃO 3D PUROS.** Aguarde migrar para ecossistemas R3F, é muito mais barato manter!

---

## 10. Observações Finais
Você construiu um protótipo visual digno de estúdios premiados (Awwwards level). O desafio atual não é design, é "Transformar a Arte em Produto Escalável". Os maiores riscos do seu projeto são estruturais (escalabilidade do código e penalidade de SEO por tradução ser puramente dinâmica via client-side). Siga o Plano (Fase 1 seguida da Fase 2) e o seu lançamento técnico baterá recordes em estabilidade, conversão e percepção do usuário.
