import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initMain = () => {
        const nav = document.getElementById('navbar');
        const progress = document.querySelector('[data-scroll-progress]');
        const navToggle = document.getElementById('nav-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('[data-mobile-link]');
        const navLinks = document.querySelectorAll('[data-nav-link]');
        const langToggles = document.querySelectorAll('[data-lang-toggle]');
        const themeToggles = document.querySelectorAll('[data-theme-toggle]');
        const loopSteps = ['planner', 'executor', 'critic'];
        const flashTimers = new Map();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
        const browserLocale = browserLanguages.some((language) => /^pt\b/i.test(language)) ? 'pt-BR' : 'en';
        const storageKey = 'aethercore.locale';
        const themeStorageKey = 'aethercore.theme';
        let savedLocale = null;
        let savedTheme = null;

        try {
          savedLocale = window.localStorage?.getItem(storageKey);
        } catch {
          savedLocale = null;
        }

        try {
          savedTheme = window.localStorage?.getItem(themeStorageKey);
        } catch {
          savedTheme = null;
        }

        let currentLocale = savedLocale || browserLocale;
        let isPortuguese = /^pt\b/i.test(currentLocale);
        const getUiCopy = (locale) => /^pt\b/i.test(locale)
          ? {
              navOpen: 'Abrir menu de navegação',
              navClose: 'Fechar menu de navegação',
              invalidEmail: 'Digite um e-mail válido para entrar na lista.',
              action: 'Solicitar beta founder',
              queued: (email) => `Pedido registrado localmente para ${email}. Conecte seu backend quando estiver pronto.`
            }
          : {
              navOpen: 'Open navigation menu',
              navClose: 'Close navigation menu',
              invalidEmail: 'Enter a valid email to queue the request.',
              action: 'Request founder beta',
              queued: (email) => `Queued locally for ${email}. Connect your backend when ready.`
            };
        let uiCopy = getUiCopy(currentLocale);
        let currentTheme = savedTheme === 'navy' ? 'navy' : 'offwhite';

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Tab') document.body.classList.add('using-keyboard');
        });

        document.addEventListener('pointerdown', () => {
          document.body.classList.remove('using-keyboard');
        }, { passive: true });

        let activeIndex = 0;
        let loopTimer = null;
        let loopResumeTimer = null;
        let loopInView = !('IntersectionObserver' in window);
        let maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

        const syncLanguageToggle = () => {
          langToggles.forEach((button) => {
            const active = button.dataset.lang === currentLocale || (currentLocale === 'pt' && button.dataset.lang === 'pt-BR');
            button.setAttribute('aria-pressed', String(active));
            if (active) {
              const container = button.closest('.language-switch');
              if (container) container.dataset.activeLang = button.dataset.lang;
            }
          });
        };

        const syncThemeToggle = () => {
          themeToggles.forEach((button) => {
            const active = button.dataset.theme === currentTheme;
            button.setAttribute('aria-pressed', String(active));
            if (active) {
              const container = button.closest('.theme-switch');
              if (container) container.dataset.activeTheme = currentTheme;
            }
          });
        };

        const applyTheme = (theme, animate = false) => {
          const nextTheme = theme === 'navy' ? 'navy' : 'offwhite';
          const root = document.documentElement;

          if (animate && !prefersReducedMotion) {
            root.classList.remove('theme-switching');
            // Force the short veil animation to replay without transitioning every component.
            void root.offsetWidth;
            root.classList.add('theme-switching');
          }

          currentTheme = nextTheme;
          root.dataset.theme = currentTheme;
          document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
            meta.setAttribute('content', currentTheme === 'navy' ? '#081526' : '#f3efe3');
          });
          syncThemeToggle();

          if (animate && !prefersReducedMotion) {
            window.setTimeout(() => {
              root.classList.remove('theme-switching');
            }, 240);
          }
        };

        themeToggles.forEach((button) => {
          button.addEventListener('click', () => {
            const nextTheme = button.dataset.theme === 'navy' ? 'navy' : 'offwhite';
            if (nextTheme === currentTheme) return;

            try {
              window.localStorage?.setItem(themeStorageKey, nextTheme);
            } catch {
              // Theme still changes for the current session when storage is unavailable.
            }

            applyTheme(nextTheme, true);
          });
        });

        langToggles.forEach((button) => {
          button.addEventListener('click', () => {
            const nextLocale = button.dataset.lang || 'en';
            if (nextLocale === currentLocale) return;

            try {
              window.localStorage?.setItem(storageKey, nextLocale);
            } catch {
              // Locale still changes for the current session when storage is unavailable.
            }

            currentLocale = nextLocale;
            isPortuguese = /^pt\b/i.test(currentLocale);
            uiCopy = getUiCopy(currentLocale);
            applyBrowserLocale(true);
            window.dispatchEvent(new CustomEvent('aether:localechange', { detail: { locale: currentLocale } }));
          });
        });

        const applyBrowserLocale = (animate = false) => {
          document.documentElement.lang = isPortuguese ? 'pt-BR' : 'en';
          document.documentElement.dataset.locale = isPortuguese ? 'pt-BR' : 'en';
          navToggle?.setAttribute('aria-label', uiCopy.navOpen);
          syncLanguageToggle();

          // We now support translating both ways since some base HTML is in PT
          document.title = isPortuguese ? 'AetherCore | Sistema Operacional Cognitivo' : 'AetherCore | Cognitive Operating System';
          document.querySelector('meta[name="description"]')?.setAttribute('content', isPortuguese 
            ? 'AetherCore é um sistema operacional cognitivo local-first e cloud-optional.' 
            : 'AetherCore is a local-first, cloud-optional cognitive operating system.');

          const baseTranslations = new Map([
            ['Skip to content', 'Pular para o conteúdo'],
            ['What it is', 'O que é'],
            ['Architecture', 'Arquitetura'],
            ['How it works', 'Como funciona'],
            ['Capabilities', 'Capacidades'],
            ['Vision', 'Visão'],
            ['Language', 'Idioma'],
            ['Theme', 'Tema'],
            ['Use off-white theme', 'Usar tema off-white'],
            ['Use navy theme', 'Usar tema navy'],
            ['Open navigation menu', 'Abrir menu de navegação'],
            ['Close navigation menu', 'Fechar menu de navegação'],
            ['AetherCore home', 'Início do AetherCore'],
            ['Primary navigation', 'Navegacao principal'],
            ['AetherCore architecture and current build carousel', 'Carrossel de arquitetura e build atual do AetherCore'],
            ['Go to What it is section', 'Ir para secao O que e'],
            ['Go to Architecture section', 'Ir para secao Arquitetura'],
            ['Go to How it works section', 'Ir para secao Como funciona'],
            ['Go to Capabilities section', 'Ir para secao Capacidades'],
            ['Go to Vision section', 'Ir para secao Visao'],
            ['Get early access to AetherCore', 'Acesso antecipado ao AetherCore'],
            ['Watch AetherCore execution loop', 'Ver loop de execucao do AetherCore'],
            ['AetherCore capability highlights', 'Destaques de capacidades do AetherCore'],
            ['AetherCore interface preview', 'Previa da interface do AetherCore'],
            ['Prompt field placeholder', 'Campo de prompt'],
            ['Execute demo prompt', 'Executar demonstracao'],
            ['Request early access', 'Solicitar acesso antecipado'],
            ['Email address', 'Endereco de e-mail'],
            ['Do not fill this out if you are human:', 'Nao preencha isto se voce e humano:'],
            ['Read the AetherCore documentation', 'Ler a documentacao do AetherCore'],
            ['Footer', 'Rodape'],
            ['Learn about Aether GO', 'Saiba mais sobre Aether GO'],
            ['Learn about Aether Enterprise', 'Saiba mais sobre Aether Enterprise'],
            ['View the AetherCore changelog', 'Ver changelog do AetherCore'],
            ['View the AetherCore roadmap', 'Ver roadmap do AetherCore'],
            ['Open the AetherCore security overview', 'Abrir visao de seguranca do AetherCore'],
            ['Open the AetherCore deployment guide', 'Abrir guia de implantacao do AetherCore'],
            ['Contact AetherCore sales', 'Falar com vendas do AetherCore'],
            ['Learn about AetherCore', 'Saiba mais sobre o AetherCore'],
            ['Read the AetherCore privacy policy', 'Ler politica de privacidade do AetherCore'],
            ['Read the AetherCore terms', 'Ler termos do AetherCore'],
            ['Contact AetherCore', 'Contato AetherCore'],
            ['Get Early Access', 'Acesso antecipado'],
            ['v1.0 — Early Access', 'v1.0 — Acesso antecipado'],
            ['Cognitive Operating System', 'Sistema Operacional Cognitivo'],
            ["doesn't just answer.", 'não só responde.'],
            ['It', 'Ele'],
            ['executes', 'executa'],
            ['Install a local AI runtime that can inspect files, draft outputs, run governed actions, and pause for approval before anything sensitive leaves your device. AetherCore is local-first by default and cloud-optional by design.', 'Instale um runtime local de IA que inspeciona arquivos, rascunha entregáveis, executa ações governadas e pausa para aprovação antes que algo sensível saia do seu dispositivo. AetherCore é local-first por padrão e cloud-optional por design.'],
            ['Request Founder Access', 'Solicitar acesso founder'],
            ['See how it works', 'Ver como funciona'],
            ['9 mo', '9 meses'],
            ['of R&D', 'de P&D'],
            ['local-first', 'local-first'],
            ['memory-safe core', 'núcleo memory-safe'],
            ['scroll', 'rolar'],
            ['Planner → Executor → Critic', 'Planejador → Executor → Crítico'],
            ['PDF · Excel · HTML · JS · CSS', 'PDF · Excel · HTML · JS · CSS'],
            ['Inspect layer', 'Inspecionar camada'],
            ['View milestone', 'Ver marco'],
            ['Planner → Executor → Critic', 'Planejador → Executor → Crítico'],
            ['File Creation & Editing', 'Criação e edição de arquivos'],
            ['Local-First Execution', 'Execução local-first'],
            ['Persistent Memory', 'Memória persistente'],
            ['Sandboxed Browser', 'Navegador em sandbox'],
            ['PDF · Excel · HTML · JS · CSS', 'PDF · Excel · HTML · JS · CSS'],
            ['Data Sovereignty', 'Soberania de dados'],
            ['Rust IPC Core', 'Núcleo IPC em Rust'],
            ['AetherCore operational guarantees', 'Garantias operacionais do AetherCore'],
            ['LOCAL VAULT', 'COFRE LOCAL'],
            ['Files stay on device', 'Arquivos ficam no dispositivo'],
            ['AGENT RUNTIME', 'RUNTIME DO AGENTE'],
            ['Plans, acts, observes', 'Planeja, age, observa'],
            ['UPLINK GATE', 'PORTÃO UPLINK'],
            ['Cloud only by approval', 'Nuvem só com aprovação'],
            ['ARL LEDGER', 'LEDGER ARL'],
            ['Auditable memory trail', 'Trilha de memória auditável'],
            ['00 — PRODUCT REALITY', '00 — REALIDADE DO PRODUTO'],
            ['What you install.', 'O que você instala.'],
            ['What it can do in 30 seconds.', 'O que ele faz em 30 segundos.'],
            ['AetherCore is packaged as a local desktop runtime: a governed agent session, a file-aware workspace, and an approval layer for every write, delete, or cloud handoff.', 'AetherCore é empacotado como um runtime local de desktop: uma sessão de agente governada, um workspace ciente dos arquivos e uma camada de aprovação para cada gravação, exclusão ou envio para nuvem.'],
            ['INSTALL', 'INSTALAR'],
            ['Local runtime', 'Runtime local'],
            ['Runs beside your files with a private workspace and no default cloud sync.', 'Roda ao lado dos seus arquivos com workspace privado e sem sincronização em nuvem por padrão.'],
            ['ASK', 'PEDIR'],
            ['Real task', 'Tarefa real'],
            ['Drop in a report, ask for anomalies, and watch the execution trace.', 'Inclua um relatório, peça anomalias e acompanhe o rastro de execução.'],
            ['APPROVE', 'APROVAR'],
            ['Controlled output', 'Saída controlada'],
            ['The agent pauses before writing files or using Uplink, then logs the decision.', 'O agente pausa antes de gravar arquivos ou usar Uplink, e então registra a decisão.'],
            ['01 — WHAT IT IS', '01 — O QUE É'],
            ['A cognitive', 'Um sistema'],
            ['operating system', 'operacional cognitivo'],
            ['for the real world.', 'para o mundo real.'],
            ['Most AI tools live in a browser tab. They generate text. They answer questions. They stop there.', 'A maioria das IAs vive em uma aba do navegador. Elas geram texto. Elas respondem perguntas. Elas param ali.'],
            ['AetherCore was built on a different premise: intelligence without agency is incomplete. True capability requires the ability to act — to create, modify, and execute within your actual environment.', 'AetherCore foi construído sobre uma premissa diferente: inteligência sem agência é incompleta. A verdadeira capacidade exige o poder de agir — criar, modificar e executar dentro do seu ambiente real.'],
            ['This is not just a tool. It is a cognitive infrastructure layer that sits between you and your machine, ensuring execution happens where it should: locally.', 'Esta não é apenas uma ferramenta. É uma camada de infraestrutura cognitiva que se posiciona entre você e sua máquina, garantindo que a execução aconteça onde deve: localmente.'],
            ['Sovereign cognitive infrastructure', 'Infraestrutura cognitiva soberana'],
            ['Not an upgrade.', 'Não é um upgrade.'],
            ["It's a paradigm shift.", 'É uma mudança de paradigma.'],
            ['aether·core /ˈeɪθər kɔːr/', 'aether·core /ˈeɪθər kɔːr/'],
            ['noun · software architecture', 'substantivo · arquitetura de software'],
            ['"An autonomous reasoning engine capable of decomposing goals, executing multi-step actions, and iterating toward outcomes — entirely within the user\'s local environment."', '"Um motor autônomo de raciocínio capaz de decompor objetivos, executar ações em múltiplas etapas e iterar até o resultado — inteiramente no ambiente local do usuário."'],
            ['Architecture: Trinity (Cofre Local · Agent · Uplink)', 'Arquitetura: Trinity (Cofre Local · Agent · Uplink)'],
            ['Core language: Rust (memory-safe, zero-overhead)', 'Linguagem central: Rust (memory-safe, zero-overhead)'],
            ['Loop pattern: ReAct (Reason → Act → Observe)', 'Padrão de loop: ReAct (Raciocinar → Agir → Observar)'],
            ['02 — THE SHIFT', '02 — A VIRADA'],
            ['03 — ARCHITECTURE', '03 — ARQUITETURA'],
            ['This is not an upgrade.', 'Isto não é um upgrade.'],
            ["It's a different paradigm.", 'É outro paradigma.'],
            ['TRADITIONAL AI', 'IA TRADICIONAL'],
            ['Responds to prompts', 'Responde a prompts'],
            ['Passive, reactive, terminal', 'Passiva, reativa, terminal'],
            ['Lives in the browser', 'Vive no navegador'],
            ['Cloud-dependent, data-exposed', 'Dependente da nuvem, expõe dados'],
            ['One shot per query', 'Uma tentativa por pergunta'],
            ['No iteration, no memory', 'Sem iteração, sem memória'],
            ['Generates text and answers', 'Gera texto e respostas'],
            ['You still have to do the real work', 'Você ainda precisa fazer o trabalho real'],
            ['Acts toward goals', 'Age em direção a objetivos'],
            ['Plans, executes, self-corrects', 'Planeja, executa, autocorrige'],
            ['Runs on your hardware', 'Roda no seu hardware'],
            ['Local-first, Uplink explicit', 'Local-first, Uplink explícito'],
            ['Maintains persistent memory', 'Mantém memória persistente'],
            ['Context survives across sessions', 'O contexto sobrevive entre sessões'],
            ['Creates real results', 'Cria resultados reais'],
            ['Files, code, reports — executed', 'Arquivos, código, relatórios — executados'],
            ['AetherCore was built on a different premise: intelligence without agency is incomplete. True capability requires the ability to', 'AetherCore foi construído sobre uma premissa diferente: inteligência sem agência é incompleta. Capacidade real exige poder'],
            ['act', 'agir'],
            ['— to read files, call tools, write outputs, and stop when an approval gate is required.', '— ler arquivos, chamar ferramentas, gravar saídas e parar quando uma aprovação for necessária.'],
            ['Hybrid Architecture: Real Autonomy.', 'Arquitetura Híbrida: Autonomia Real.'],
            ['AetherCore is a three-pillar infrastructure: Cofre Local for local custody, Aether Agent for governed autonomy, and Uplink for external cloud providers only when explicitly selected.', 'AetherCore é uma infraestrutura de três pilares: Cofre Local para custódia local, Aether Agent para autonomia governada e Uplink para provedores externos em nuvem apenas quando selecionados explicitamente.'],
            ['AetherCore is designed around one constraint: useful autonomy without surrendering custody. The system separates local data, agent execution, cloud access, and audit memory into explicit gates.', 'AetherCore foi desenhado em torno de uma restrição: autonomia útil sem abrir mão da custódia. O sistema separa dados locais, execução do agente, acesso à nuvem e memória auditável em portões explícitos.'],
            ['Private file boundary', 'Fronteira privada de arquivos'],
            ['Documents, exports, prompts, and generated files stay in the local workspace unless a user-approved handoff occurs.', 'Documentos, exportações, prompts e arquivos gerados ficam no workspace local, exceto quando o usuário aprova uma transferência.'],
            ['The ReAct loop (Reasoning and Acting) decomposes the goal, executes Rust-powered tool calls, and reviews the plan before final output.', 'O loop ReAct (Reasoning and Acting) decompõe a meta, executa chamadas de ferramenta Rust-powered e revisa o plano antes da saída final.'],
            ['Approvals, actions, and results become an auditable trail via SQLite with FTS5, instead of hidden chat context.', 'Aprovações, ações e resultados tornam-se uma trilha auditável via SQLite com FTS5, em vez de contexto de chat oculto.'],
            ['Cloud by consent', 'Nuvem por consentimento'],
            ['External APIs are treated as a permissioned bridge, not a default dependency. The user sees what is being sent and why.', 'APIs externas são tratadas como uma ponte permissionada, não como dependência padrão. O usuário vê o que será enviado e por quê.'],
            ['Memory with evidence', 'Memória com evidência'],
            ['Approvals, actions, and outcomes become an auditable trail instead of hidden chat context.', 'Aprovações, ações e resultados viram trilha auditável em vez de contexto escondido de chat.'],
            ['CURRENT BUILD VS VISION', 'BUILD ATUAL VS VISÃO'],
            ['Real today', 'Real hoje'],
            ['Local session UI, execution trace model, approval pattern, local assets, and deployable static site pipeline.', 'UI de sessão local, modelo de rastro de execução, padrão de aprovação, assets locais e pipeline estático para deploy.'],
            ['Next', 'Próximo'],
            ['Installer packaging, signed local runtime, persisted ARL ledger, and first private beta task packs.', 'Empacotamento do instalador, runtime local assinado, ledger ARL persistente e primeiros pacotes de tarefas do beta privado.'],
            ['Hybrid sovereign network with local nodes and optional dedicated AetherCore servers.', 'Rede soberana híbrida com nós locais e servidores AetherCore dedicados opcionais.'],
            ['04 — HOW IT WORKS', '04 — COMO FUNCIONA'],
            ['The cognitive loop.', 'O loop cognitivo.'],
            ['Every goal AetherCore receives passes through three recursive phases — ceaselessly refining until the task is complete.', 'Todo objetivo recebido pelo AetherCore passa por três fases recursivas — refinando sem parar até a tarefa estar concluída.'],
            ['Planner', 'Planejador'],
            ['Decomposes goal', 'Decompõe objetivo'],
            ['Executor', 'Executor'],
            ['Runs actions', 'Executa ações'],
            ['Critic', 'Crítico'],
            ['Evaluates result', 'Avalia resultado'],
            ['PHASE 01', 'FASE 01'],
            ['Receives the high-level goal. Decomposes it into ordered subtasks. Builds an execution strategy, estimates tool requirements, and defines success criteria before any action is taken.', 'Recebe o objetivo de alto nível. Divide em subtarefas ordenadas. Monta a estratégia de execução, estima ferramentas necessárias e define critérios de sucesso antes de qualquer ação.'],
            ['PHASE 02', 'FASE 02'],
            ['Translates the plan into real actions: reading files, running code, writing to disk, browsing the web inside a sandboxed environment. Each step produces an observable result.', 'Transforma o plano em ações reais: ler arquivos, executar código, gravar em disco e navegar pela web em ambiente isolado. Cada passo produz um resultado observável.'],
            ['PHASE 03', 'FASE 03'],
            ['Reviews output against the original goal. If criteria are met, the loop closes. If not, it annotates the failure, adjusts the plan, and feeds back into the Planner for the next iteration.', 'Compara a saída com o objetivo original. Se os critérios forem atingidos, o loop fecha. Caso contrário, anota a falha, ajusta o plano e volta ao Planejador.'],
            ['05 — CAPABILITIES', '05 — CAPACIDADES'],
            ['What it can do.', 'O que ele consegue fazer.'],
            ['Controlled File Operations', 'Operações controladas de arquivos'],
            ['Natively reads, creates, edits, and stages changes across regulated formats — Excel, PDF, Markdown, HTML, JS, CSS, plain text. Destructive actions are routed through approval gates.', 'Lê, cria, edita e prepara alterações nativamente em formatos regulados — Excel, PDF, Markdown, HTML, JS, CSS e texto puro. Ações destrutivas passam por controles de aprovação.'],
            ['Security gate required... awaiting approval', 'Pausa de segurança obrigatória... aguardando aprovação'],
            ['Code Execution', 'Execução de código'],
            ['Writes, tests, and runs code in isolated environments. Reads error output. Iterates until it works.', 'Escreve, testa e executa código em ambientes isolados. Lê erros. Itera até funcionar.'],
            ['Web Interaction', 'Interação web'],
            ['Browses the web through a sandboxed internal browser. Scrapes, reads, summarizes — without exposing your network activity.', 'Navega pela web por um browser interno isolado. Extrai, lê e resume — sem expor sua atividade de rede.'],
            ['Data Analysis', 'Análise de dados'],
            ['Processes Business Intelligence reports, identifies patterns across large datasets, and produces structured summaries — all without a single byte leaving your machine.', 'Processa relatórios de Business Intelligence, identifica padrões em grandes datasets e produz resumos estruturados — sem um único byte sair da sua máquina.'],
            ['Persistent Memory', 'Memória persistente'],
            ['Governed Memory & Auditability', 'Memória governada e auditabilidade'],
            ['The Aether Reliability Layer (ARL) binds memory, approvals, and immutable execution logs. Destructive actions require Human-in-the-Loop approval before anything is written or deleted.', 'A Camada de Confiabilidade Aether (ARL) conecta memória, aprovações e logs imutáveis de execução. Ações destrutivas exigem aprovação humana supervisionada antes de qualquer gravação ou remoção.'],
            ['Multi-step Reasoning', 'Raciocínio multi-etapa'],
            ['Solves complex, ambiguous goals through a chain of interdependent decisions — not single-shot completions.', 'Resolve objetivos complexos e ambíguos por uma cadeia de decisões interdependentes — não por respostas únicas.'],
            ['Local-first execution with explicit Uplink. Your files stay in local workspaces unless you intentionally route work through an external provider.', 'Execução local-first com Uplink explícito. Seus arquivos ficam em workspaces locais salvo quando você direciona intencionalmente o trabalho para um provedor externo.'],
            ["06 — WHO IT'S FOR", '06 — PARA QUEM É'],
            ['Built for regulated operations.', 'Feito para operações reguladas.'],
            ['Legal & Compliance', 'Jurídico e Compliance'],
            ['Run auditable contract analysis, policy review, and evidence extraction locally with privacy preserved by design.', 'Execute análise auditável de contratos, revisão de políticas e extração de evidências localmente, com privacidade preservada por design.'],
            ['Financial & Auditing', 'Financeiro e Auditoria'],
            ['Process BI exports, audit workpapers, and anomaly detection with zero data exposure beyond controlled environments.', 'Processe exportações de BI, papéis de trabalho de auditoria e detecção de anomalias sem exposição de dados fora de ambientes controlados.'],
            ['Healthcare & Clinics', 'Saúde e Clínicas'],
            ['Analyze patient records and clinic operations under strict compliance and LGPD-aligned local processing.', 'Analise prontuários e operações clínicas sob compliance rigoroso e processamento local alinhado à LGPD.'],
            ['Enterprise Developers', 'Desenvolvedores corporativos'],
            ['Automate internal systems securely on local infrastructure without cloud API keys or secret sprawl.', 'Automatize sistemas internos com segurança em infraestrutura local, sem chaves de API em nuvem ou dispersão de segredos.'],
            ['07 — PHILOSOPHY', '07 — FILOSOFIA'],
            ['Intelligence is not about answering better.', 'Inteligência não é responder melhor.'],
            ["It's about solving better.", 'É resolver melhor.'],
            ['The history of computing is a history of abstraction — each layer freeing us to think at a higher level. AetherCore is the next layer: not a tool you use, but a system that acts alongside you, transparently, with your goals as its own.', 'A história da computação é uma história de abstração — cada camada nos liberta para pensar em um nível mais alto. AetherCore é a próxima camada: não uma ferramenta que você usa, mas um sistema que age ao seu lado, com transparência, assumindo seus objetivos como direção.'],
            ['Sovereign', 'Soberano'],
            ['Your data belongs to you. Always. The system runs where you choose, processes what you permit.', 'Seus dados pertencem a você. Sempre. O sistema roda onde você escolhe e processa o que você permite.'],
            ['Transparent', 'Transparente'],
            ['Every action is visible, auditable, and reversible. You are always in control of what the agent does.', 'Cada ação é visível, auditável e reversível. Você permanece no controle do que o agente faz.'],
            ['Purposeful', 'Objetivo'],
            ['Not built to impress — built to complete. Every design decision bends toward actual utility.', 'Não foi feito para impressionar — foi feito para concluir. Cada decisão de design aponta para utilidade real.'],
            ['08 — INTERFACE', '08 — INTERFACE'],
            ['Simple to talk to.', 'Simples de conversar.'],
            ['Deep enough to trust.', 'Profundo o bastante para confiar.'],
            ['The first screen is a governed task session. You type a concrete request, attach or reference local files, watch each action, and approve only the operations that change state.', 'A primeira tela é uma sessão de tarefa governada. Você descreve um pedido concreto, anexa ou referencia arquivos locais, acompanha cada ação e aprova apenas as operações que mudam estado.'],
            ['Plain-language task input with file-aware context', 'Entrada em linguagem natural com contexto de arquivos'],
            ['Real-time execution trace with visible tool calls', 'Rastro de execução em tempo real com chamadas de ferramenta visíveis'],
            ['Interrupt, redirect, or approve at any point', 'Interrompa, redirecione ou aprove a qualquer momento'],
            ['System-level access gated by local permissions', 'Acesso de sistema protegido por permissões locais'],
            ['aethercore — local session', 'aethercore — sessão local'],
            ['Analyze Q3 audit report, flag anomalies, and draft a compliance memo.', 'Analise o relatório de auditoria Q3, sinalize anomalias e rascunhe um memorando de compliance.'],
            ['security gate active', 'pausa de segurança ativa'],
            ['Planner: decomposed request into 4 governed steps', 'Planejador: solicitação dividida em 4 etapas governadas'],
            ['Executor: parsed Q3_report.xlsx locally (847 rows)', 'Executor: Q3_report.xlsx analisado localmente (847 linhas)'],
            ['Security Gate: awaiting Human-in-the-Loop approval to write files', 'Pausa de segurança: aguardando aprovação humana para gravar arquivos'],
            ['User approved: compliance_summary.md', 'Usuário aprovou: compliance_summary.md'],
            ['Completed: immutable audit log recorded', 'Concluído: log de auditoria imutável registrado'],
            ['Give AetherCore a goal...', 'Dê um objetivo ao AetherCore...'],
            ['Execute', 'Executar'],
            ['09 — VISION', '09 — VISÃO'],
            ['From assistant', 'De assistente'],
            ['to', 'para'],
            ['infrastructure.', 'infraestrutura.'],
            ['TODAY', 'HOJE'],
            ['Cognitive Desktop OS', 'SO Cognitivo de Desktop'],
            ['A sovereign AI agent that operates on your hardware first — reading, writing, reasoning, and delivering results locally, with Uplink available only when a cloud API is explicitly approved.', 'Um agente de IA soberano que opera primeiro no seu hardware — lendo, escrevendo, raciocinando e entregando resultados localmente, com Uplink disponível apenas quando uma API em nuvem é aprovada explicitamente.'],
            ['NEXT — 12 MONTHS', 'PRÓXIMO — 12 MESES'],
            ['Hybrid Sovereign Network', 'Rede Soberana Híbrida'],
            ['Cofre Local instances paired with dedicated AetherCore servers. Processing scales dynamically across local and cloud-optional Uplink paths — with granular control over where every operation runs.', 'Instâncias do Cofre Local pareadas com servidores dedicados AetherCore. O processamento escala dinamicamente entre o local e caminhos Uplink cloud-optional — com controle granular sobre onde cada operação roda.'],
            ['HORIZON', 'HORIZONTE'],
            ['AI Infrastructure Layer', 'Camada de Infraestrutura de IA'],
            ["A programmable backbone for autonomous systems — where intelligence flows between local devices and distributed nodes, solving problems that today's infrastructure cannot reach.", 'Uma espinha dorsal programável para sistemas autônomos — onde a inteligência flui entre dispositivos locais e nós distribuídos, resolvendo problemas que a infraestrutura atual não alcança.'],
            ['FOUNDER BETA ACCESS', 'ACESSO AO BETA FOUNDER'],
            ['Test the local beta', 'Teste o beta local'],
            ['with real files.', 'com arquivos reais.'],
            ['Join the founder list for the desktop runtime. We will send onboarding, supported task packs, and what to expect before you connect it to sensitive workflows.', 'Entre na lista founder do runtime desktop. Enviaremos onboarding, pacotes de tarefas suportadas e o que esperar antes de conectar a fluxos sensíveis.'],
            ['Email address', 'Endereço de e-mail'],
            ['Request Local Beta', 'Solicitar beta local'],
            ['See the execution loop', 'Ver o loop de execução'],
            ['After signup: product brief · beta intake · no automatic data collection', 'Após cadastro: brief do produto · intake do beta · sem coleta automática de dados'],
            ['A cognitive operating system for local-first AI execution and data sovereignty.', 'Um sistema operacional cognitivo para execução local-first de IA e soberania de dados.'],
            ['PRODUCT', 'PRODUTO'],
            ['Changelog', 'Changelog'],
            ['Roadmap', 'Roadmap'],
            ['ENTERPRISE', 'EMPRESARIAL'],
            ['Security Overview', 'Visão de segurança'],
            ['Deployment Guide', 'Guia de implantação'],
            ['Contact Sales', 'Falar com vendas'],
            ['COMPANY', 'EMPRESA'],
            ['About', 'Sobre'],
            ['Privacy', 'Privacidade'],
            ['Terms', 'Termos'],
            ['Contact', 'Contato'],
            ['© 2026 AetherCore. Built with Rust. Runs anywhere.', '© 2026 AetherCore. Construído com Rust. Roda em qualquer lugar.'],
            ['Local-first · Sovereign · Proprietary Stack', 'Local-first · Soberano · Stack Proprietária']
          ]);

          [
            ['0.1.0-pre — Founder Beta', '0.1.0-pre — Beta founder'],
            ['Local-first by default', 'Local-first por padrão'],
            ['CEF desktop runtime', 'Runtime desktop CEF'],
            ["doesn't answer.", 'não responde.'],
            ['It executes.', 'Executa.'],
            ['AetherCore is a local-first AI workspace that plans, acts, and executes real tasks beside your files. It uses local engines by default, exposes cloud Uplink as an explicit choice, and routes sensitive actions through ARL approval gates.', 'AetherCore é um workspace de IA local-first que planeja, age e executa tarefas reais ao lado dos seus arquivos. Usa motores locais por padrão, expõe Uplink em nuvem como escolha explícita e passa ações sensíveis por aprovações ARL.'],
            ['Request founder beta access in Curitiba', 'Solicitar acesso ao beta founder em Curitiba'],
            ['Founder beta — Curitiba', 'Beta founder — Curitiba'],
            ['Invite only • limited batch', 'Acesso por convite • grupo limitado'],
            ['Watch the execution loop', 'Ver o loop de execução'],
            ['desktop shell', 'shell desktop'],
            ['approval layer', 'camada de aprovação'],
            ['native BI tools', 'ferramentas nativas de BI'],
            ['What is already real.', 'O que já é real.'],
            ['AetherCore is packaged as a local CEF desktop runtime: governed sessions, file-aware workspaces, RAG search, engine routing, native Rust tools, and an approval layer before sensitive writes or cloud Uplink.', 'AetherCore é empacotado como runtime local desktop em CEF: sessões governadas, workspaces cientes de arquivos, busca RAG, roteamento de motores, ferramentas Rust nativas e uma camada de aprovação antes de gravações sensíveis ou Uplink em nuvem.'],
            ['RUN', 'RODAR'],
            ['CEF shell', 'Shell CEF'],
            ['Loads local assets through Chromium Embedded Framework without a localhost dev server.', 'Carrega assets locais pelo Chromium Embedded Framework sem servidor dev em localhost.'],
            ['ACT', 'AGIR'],
            ['Agent runtime', 'Runtime do agente'],
            ['Uses ReAct, tools, workspace memory, and visible execution events instead of hidden context.', 'Usa ReAct, ferramentas, memória de workspace e eventos de execução visíveis em vez de contexto oculto.'],
            ['ARL decision', 'Decisão ARL'],
            ['Write, delete, shell, PowerShell, REPL, and WriteExcel actions pause for human approval.', 'Ações de escrita, remoção, shell, PowerShell, REPL e WriteExcel pausam para aprovação humana.'],
            ['AetherCore was built on a different premise: intelligence without agency is incomplete. True capability requires the ability to act — to read files, call tools, write outputs, and stop when an approval gate is required.', 'AetherCore foi construído sobre outra premissa: inteligência sem agência é incompleta. Capacidade real exige poder agir — ler arquivos, chamar ferramentas, gravar saídas e parar quando um portão de aprovação é necessário.'],
            ['This is not a cloud chatbot with a desktop skin. It is a local-first workspace that separates local data, agent execution, optional Uplink, and audit memory into explicit boundaries.', 'Isto não é um chatbot em nuvem com aparência de desktop. É um workspace local-first que separa dados locais, execução do agente, Uplink opcional e memória auditável em fronteiras explícitas.'],
            ['Trinity: Cofre Local · Aether Agent · Uplink', 'Trindade: Cofre Local · Aether Agent · Uplink'],
            ['Core runtime: Rust tools, CEF shell, typed IPC', 'Runtime central: ferramentas Rust, shell CEF, IPC tipado'],
            ['Loop: ReAct → ARL approval → auditable trace', 'Loop: ReAct → aprovação ARL → rastro auditável'],
            ['Local-first, Uplink explicit', 'Local-first, Uplink explícito'],
            ['AetherCore is a three-pillar infrastructure:', 'AetherCore é uma infraestrutura de três pilares:'],
            ['for local custody,', 'para custódia local,'],
            ['for governed autonomy, and', 'para autonomia governada, e'],
            ['for external cloud providers only when explicitly selected.', 'para provedores externos em nuvem apenas quando selecionados explicitamente.'],
            ['Local model and vault', 'Modelo local e cofre'],
            ['Gemma/Ollama is the default local path. Workspaces, sessions, documents, logs, and vault data stay on the operator machine by default.', 'Gemma/Ollama é o caminho local padrão. Workspaces, sessões, documentos, logs e dados do cofre ficam na máquina do operador por padrão.'],
            ['AETHER AGENT', 'AETHER AGENT'],
            ['ReAct execution loop', 'Loop de execução ReAct'],
            ['The agent plans, calls tools, observes results, and persists governed context in SQLite memory under the active workspace vault.', 'O agente planeja, chama ferramentas, observa resultados e persiste contexto governado em memória SQLite sob o cofre ativo do workspace.'],
            ['Cloud only when explicit', 'Nuvem apenas quando explícita'],
            ['Gemini and other external providers are labelled as Uplink paths. AetherCore does not describe cloud inference as local execution.', 'Gemini e outros provedores externos são rotulados como caminhos Uplink. AetherCore não descreve inferência em nuvem como execução local.'],
            ['Approval and evidence', 'Aprovação com evidência'],
            ['The Aether Reliability Layer records dashboards, JSONL traces, redacted previews, approval decisions, and output guardrails.', 'A Aether Reliability Layer registra dashboards, rastros JSONL, prévias redigidas, decisões de aprovação e guardrails de saída.'],
            ['CURRENT BUILD', 'BUILD ATUAL'],
            ['CEF desktop shell', 'Shell desktop CEF'],
            ['The packaged runtime uses Chromium Embedded Framework with local assets, typed IPC, workspaces, sessions, settings, and ARL events.', 'O runtime empacotado usa Chromium Embedded Framework com assets locais, IPC tipado, workspaces, sessões, configurações e eventos ARL.'],
            ['BI RUNTIME', 'RUNTIME BI'],
            ['Native XLSX tools', 'Ferramentas XLSX nativas'],
            ['ReadExcel and WriteExcel run in Rust through calamine and rust_xlsxwriter. Writing spreadsheets requires Full Access and approval.', 'ReadExcel e WriteExcel rodam em Rust via calamine e rust_xlsxwriter. Gravar planilhas exige Acesso Completo e aprovação.'],
            ['EXTENSION SURFACE', 'SUPERFÍCIE DE EXTENSÕES'],
            ['Plugins, skills, MCP', 'Plugins, skills, MCP'],
            ['Plugins, local skills, slash commands, BrowserReal, RAG search, and project MCP trust gates form the expansion layer.', 'Plugins, skills locais, slash commands, BrowserReal, busca RAG e portões de confiança MCP formam a camada de expansão.'],
            ['Local Gemma/Ollama routing, workspace files, documents, sessions, logs, and vault data remain on the operator machine by default.', 'Roteamento local Gemma/Ollama, arquivos de workspace, documentos, sessões, logs e dados do vault ficam na máquina do operador por padrão.'],
            ['Planner, tools, observer', 'Planejador, ferramentas, observador'],
            ['The ReAct loop decomposes goals, calls permission-aware desktop tools, observes results, and persists governed memory in SQLite.', 'O loop ReAct decompõe objetivos, chama ferramentas desktop cientes de permissões, observa resultados e persiste memória governada em SQLite.'],
            ['Cloud by explicit choice', 'Nuvem por escolha explícita'],
            ['Gemini and other external providers are visible Uplink routes, with engine identity kept explicit so cloud work is never described as local.', 'Gemini e outros provedores externos são rotas Uplink visíveis, com identidade de motor explícita para que trabalho em nuvem nunca seja descrito como local.'],
            ['Approval with evidence', 'Aprovação com evidência'],
            ['ARL records dashboards, JSONL traces, redacted previews, approval requests, approval decisions, and output guardrails.', 'A ARL registra dashboards, rastros JSONL, prévias redigidas, pedidos de aprovação, decisões e guardrails de saída.'],
            ['CEF desktop shell, engine switcher, workspaces, sessions, RAG search, ARL dashboard events, BrowserReal, and native ReadExcel.', 'Shell desktop CEF, seletor de motor, workspaces, sessões, busca RAG, eventos do dashboard ARL, BrowserReal e ReadExcel nativo.'],
            ['Signed installer, enterprise workspace-root enforcement, richer approval diffs, and founder beta task packs.', 'Instalador assinado, enforcement corporativo de raiz de workspace, diffs de aprovação mais ricos e pacotes de tarefas para o beta founder.'],
            ['Every goal AetherCore receives passes through planning, tool execution, observation, and ARL supervision until the task reaches a useful result or asks for your decision.', 'Todo objetivo recebido pelo AetherCore passa por planejamento, execução de ferramentas, observação e supervisão ARL até chegar a um resultado útil ou pedir sua decisão.'],
            ['Receives the high-level goal, checks available local context, decomposes it into ordered subtasks, and defines success criteria before any action is taken.', 'Recebe o objetivo de alto nível, verifica o contexto local disponível, decompõe em subtarefas ordenadas e define critérios de sucesso antes de qualquer ação.'],
            ['Translates the plan into real actions: reading files, searching workspaces, analyzing documents, using browser tools, writing outputs, or running code when permission allows.', 'Transforma o plano em ações reais: ler arquivos, buscar em workspaces, analisar documentos, usar ferramentas de navegador, gravar saídas ou executar código quando a permissão permite.'],
            ['Compares the result against the goal, records trace events, applies output guardrails, and either closes the loop or adjusts the plan for another iteration.', 'Compara o resultado com o objetivo, registra eventos de rastreio, aplica guardrails de saída e fecha o loop ou ajusta o plano para outra iteração.'],
            ['Reads, creates, edits, and stages changes across workspace files. Mutating actions require the right permission mode, and destructive actions route through ARL approval gates.', 'Lê, cria, edita e prepara alterações em arquivos do workspace. Ações mutáveis exigem o modo de permissão correto, e ações destrutivas passam por aprovações ARL.'],
            ['Runs shell, PowerShell, and REPL workflows only under Full Access. Tool results are observable and can be blocked or sanitized by output guardrails.', 'Executa fluxos de shell, PowerShell e REPL apenas com Acesso Completo. Resultados de ferramentas são observáveis e podem ser bloqueados ou sanitizados por guardrails de saída.'],
            ['Uses semantic web tools and BrowserReal automation in explicit, isolated browser contexts for fetches, screenshots, navigation, and page inspection.', 'Usa ferramentas web semânticas e automação BrowserReal em contextos de navegador explícitos e isolados para fetches, screenshots, navegação e inspeção de páginas.'],
            ['Reads BI exports, PDFs, CSV, JSON, and native .xlsx spreadsheets locally. Rust XLSX generation is available through WriteExcel and requires approval.', 'Lê exportações BI, PDFs, CSV, JSON e planilhas .xlsx nativas localmente. A geração XLSX em Rust está disponível via WriteExcel e exige aprovação.'],
            ['ARL binds memory, approvals, JSONL traces, redacted previews, and execution dashboards. Sensitive actions require Human-in-the-Loop approval before dispatch.', 'A ARL conecta memória, aprovações, rastros JSONL, prévias redigidas e dashboards de execução. Ações sensíveis exigem aprovação humana antes do despacho.'],
            ['Solves ambiguous goals through iterative planning, tool calls, observations, corrections, and auditable memory rather than one-shot completions.', 'Resolve objetivos ambíguos com planejamento iterativo, chamadas de ferramenta, observações, correções e memória auditável, não respostas únicas.'],
            ['Local-first execution with explicit Uplink. Your files stay in local workspaces unless you intentionally route work through an external provider.', 'Execução local-first com Uplink explícito. Seus arquivos ficam em workspaces locais salvo quando você direciona intencionalmente o trabalho para um provedor externo.'],
            ['PERMISSIONS', 'PERMISSÕES'],
            ['Read-only by default', 'Read-only por padrão'],
            ['Standard mode inspects and searches. Workspace Write and Full Access must be chosen intentionally.', 'O modo Standard inspeciona e busca. Workspace Write e Acesso Completo precisam ser escolhidos intencionalmente.'],
            ['SECRETS', 'SEGREDOS'],
            ['Redacted traces', 'Rastros redigidos'],
            ['Common tokens, passwords, API keys, hidden controls, and risky output patterns are filtered before persistence or display.', 'Tokens comuns, senhas, chaves de API, controles ocultos e padrões arriscados de saída são filtrados antes de persistência ou exibição.'],
            ['MEMORY', 'MEMÓRIA'],
            ['Governed SQLite', 'SQLite governado'],
            ['Session memory stores source, rationale, expiration metadata, and FTS5 search under the active workspace vault.', 'A memória de sessão armazena fonte, racional, metadados de expiração e busca FTS5 sob o vault do workspace ativo.'],
            ['EXTENSIONS', 'EXTENSÕES'],
            ['Trust gates', 'Portões de confiança'],
            ['Project MCP, plugin tools, and broad agent delegation stay behind explicit trust and permission boundaries.', 'MCP de projeto, ferramentas de plugin e delegação ampla de agentes ficam atrás de limites explícitos de confiança e permissão.'],
            ['Workspace Vaults', 'Cofres de workspace'],
            ['SQLite Memory + FTS5', 'Memória SQLite + FTS5'],
            ['CEF Desktop Runtime', 'Runtime desktop CEF'],
            ['Native XLSX / BI Tools', 'XLSX nativo / BI'],
            ['Deny-first ARL Gates', 'Portões ARL deny-first'],
            ['Rust IPC + Tool Registry', 'IPC Rust + registro de ferramentas'],
            ['Files stay local by default', 'Arquivos ficam locais por padrão'],
            ['The first screen is a governed task session. You attach or reference local files, choose the engine, watch the execution trace, and approve only operations that change state.', 'A primeira tela é uma sessão de tarefa governada. Você anexa ou referencia arquivos locais, escolhe o motor, acompanha o rastro de execução e aprova apenas operações que mudam estado.'],
            ['Plain-language task input with file, workspace, and RAG context', 'Entrada em linguagem natural com contexto de arquivos, workspace e RAG'],
            ['System-level access gated by local permissions and ARL approval', 'Acesso de sistema protegido por permissões locais e aprovação ARL'],
            ['Analyze the BI workbook, find anomalies, and draft a local audit memo.', 'Analise a planilha de BI, encontre anomalias e rascunhe um memorando local de auditoria.'],
            ['ARL approval gate active', 'Portão de aprovação ARL ativo'],
            ['Planner: decomposed workbook review into 4 governed steps', 'Planejador: revisão da planilha decomposta em 4 etapas governadas'],
            ['Executor: ReadExcel parsed local sheets and classified BI columns', 'Executor: ReadExcel analisou abas locais e classificou colunas de BI'],
            ['Memory: rationale and source stored in workspace SQLite', 'Memória: racional e fonte armazenados no SQLite do workspace'],
            ['ARL: awaiting approval before writing audit_summary.xlsx', 'ARL: aguardando aprovação antes de gravar audit_summary.xlsx'],
            ['Complete: redacted trace appended to local ARL ledger', 'Concluído: rastro redigido anexado ao ledger ARL local'],
            ['Local cognitive workspace', 'Workspace cognitivo local'],
            ['A CEF desktop runtime with local workspaces, engine routing, Aether Agent, RAG search, ARL approval flows, and native Rust tools for real file work.', 'Um runtime desktop CEF com workspaces locais, roteamento de motores, Aether Agent, busca RAG, aprovações ARL e ferramentas Rust nativas para trabalho real com arquivos.'],
            ['Enterprise-ready control plane', 'Plano de controle enterprise-ready'],
            ['Signed packaging, stronger workspace-root enforcement, richer approval diffs, configurable memory retention, and private beta task packs for regulated teams.', 'Empacotamento assinado, enforcement mais forte de raiz de workspace, diffs de aprovação mais ricos, retenção de memória configurável e pacotes de tarefas beta para equipes reguladas.'],
            ['Hybrid sovereign nodes where local devices and optional dedicated AetherCore servers share governed work without surrendering custody by default.', 'Nós soberanos híbridos em que dispositivos locais e servidores AetherCore dedicados opcionais compartilham trabalho governado sem abrir mão da custódia por padrão.'],
            ['Bring real files.', 'Traga arquivos reais.'],
            ['Keep the controls visible.', 'Mantenha os controles visíveis.'],
            ['Founder beta starts with a small Curitiba cohort. The goal is practical: test governed local execution on real workflows before broad release.', 'O beta founder começa com um pequeno grupo em Curitiba. O objetivo é prático: testar execução local governada em fluxos reais antes da abertura ampla.'],
            ['Request an invitation to the founder beta', 'Solicitar convite para o beta founder'],
            ['Request founder beta', 'Solicitar beta founder'],
            ['Local-first AI workspace with governed tools, explicit Uplink, and ARL visibility.', 'Workspace de IA local-first com ferramentas governadas, Uplink explícito e visibilidade ARL.'],
            ['© 2026 AetherCore. Built with Rust, CEF, and local-first controls.', '© 2026 AetherCore. Construído com Rust, CEF e controles local-first.'],
            ['Cofre Local · Aether Agent · Uplink by choice', 'Cofre Local · Aether Agent · Uplink por escolha']
          ].forEach(([en, pt]) => baseTranslations.set(en, pt));

          let activeTranslations = baseTranslations;
          
          if (!isPortuguese) {
            // Reverse the map and add specific overrides for the new Portuguese base HTML
            activeTranslations = new Map();
            baseTranslations.forEach((pt, en) => activeTranslations.set(pt, en));
            
            // Hardcoded PT -> EN overrides for Hero and positioning
            activeTranslations.set('Soberania de Dados', 'Data Sovereignty');
            activeTranslations.set('Não responde. Age.', "Doesn't just answer. Executes.");
            activeTranslations.set('🚀 Primeiros usuários — Curitiba', '🚀 Early Access — Curitiba');
            activeTranslations.set('Primeiros usuários — Curitiba', 'Early Access — Curitiba');
            activeTranslations.set('Solicitar acesso antecipado — Curitiba', 'Request Early Access — Curitiba');
            activeTranslations.set('Acesso por convite • Grupo Limitado', 'Invite only • Limited Batch');
            activeTranslations.set('Infraestrutura de Autonomia', 'Autonomy Infrastructure');
            activeTranslations.set('Ver infraestrutura em ação', 'See infrastructure in action');
            activeTranslations.set('Estamos liberando para um', 'We are opening access to a');
            activeTranslations.set('grupo limitado e exclusivo.', 'limited and exclusive group.');
            activeTranslations.set('Iniciando pelos primeiros usuários em Curitiba. Junte-se à lista de fundadores para testar a infraestrutura em fluxos reais de trabalho.', 'Starting with early users in Curitiba. Join the founder list to test the infrastructure in real workflows.');
            activeTranslations.set('Solicitar convite para o grupo exclusivo', 'Request invitation for the exclusive group');
            activeTranslations.set('Execução Local + Agente Autônomo + Integração com Nuvem', 'Local Execution + Autonomous Agent + Cloud Integration');
            activeTranslations.set('AetherCore não é um chatbot. É uma infraestrutura cognitiva local-first que planeja, age e executa tarefas reais diretamente no seu hardware. Soberania de dados com execução governada.', 'AetherCore is not a chatbot. It is local-first cognitive infrastructure that plans, acts, and executes real tasks on your hardware, with governed execution and explicit Uplink.');
            activeTranslations.set('Infraestrutura cognitiva soberana', 'Sovereign cognitive infrastructure');
            activeTranslations.set('Não é um upgrade.', "It's not an upgrade.");
            activeTranslations.set('É uma mudança de paradigma.', "It's a paradigm shift.");
            activeTranslations.set('Arquitetura Híbrida: Autonomia Real.', 'Hybrid Architecture: Real Autonomy.');
            activeTranslations.set('Architecture: Trinity (Cofre Local · Agent · Uplink)', 'Architecture: Trinity (Local Vault · Agent · Uplink)');
            activeTranslations.set('Soberania de Dados', 'Data Sovereignty');
          } else {
            // Hardcoded EN -> PT for elements that might still be EN in HTML
            activeTranslations.set('Invite only • Limited Batch', 'Acesso por convite • Grupo Limitado');
            activeTranslations.set('Autonomy Infrastructure', 'Infraestrutura de Autonomia');
            activeTranslations.set('Early Access — Curitiba', 'Primeiros usuários — Curitiba');
            activeTranslations.set('🚀 Early Access — Curitiba', '🚀 Primeiros usuários — Curitiba');
            activeTranslations.set('Request Early Access — Curitiba', 'Solicitar acesso antecipado — Curitiba');
            activeTranslations.set('See infrastructure in action', 'Ver infraestrutura em ação');
            activeTranslations.set('We are opening access to a', 'Estamos liberando para um');
            activeTranslations.set('limited and exclusive group.', 'grupo limitado e exclusivo.');
            activeTranslations.set('Starting with early users in Curitiba. Join the founder list to test the infrastructure in real workflows.', 'Iniciando pelos primeiros usuários em Curitiba. Junte-se à lista de fundadores para testar a infraestrutura em fluxos reais de trabalho.');
            activeTranslations.set('Request invitation for the exclusive group', 'Solicitar convite para o grupo exclusivo');
          }

          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
              if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
              if (node.parentElement?.closest('script, style, noscript, [data-no-i18n]')) return NodeFilter.FILTER_REJECT;
              return NodeFilter.FILTER_ACCEPT;
            }
          });

          const nodes = [];
          while (walker.nextNode()) nodes.push(walker.currentNode);

          nodes.forEach((node) => {
            const raw = node.nodeValue;
            const normalized = raw.replace(/\s+/g, ' ').trim();
            const translated = activeTranslations.get(normalized);
            if (!translated) return;

            const leading = raw.match(/^\s*/)?.[0] || '';
            const trailing = raw.match(/\s*$/)?.[0] || '';
            node.nodeValue = `${leading}${translated}${trailing}`;
          });

          // Global attribute translation loop (aria-label, placeholder, title)
          document.querySelectorAll('[aria-label], [placeholder], [title]').forEach(el => {
            ['aria-label', 'placeholder', 'title'].forEach(attr => {
              const val = el.getAttribute(attr);
              if (val && activeTranslations.has(val.trim())) {
                el.setAttribute(attr, activeTranslations.get(val.trim()));
              }
            });
          });

          if (animate && !prefersReducedMotion) {
            document.documentElement.classList.add('language-transitioning');
            gsap.fromTo(
              '[data-nav-link], .language-switch, .theme-switch, .hero-headline, .hero-fade, .section-title-lg, .section-title-md, .section-title-xl, .card, .trust-chip',
              { opacity: 0.86, y: 2 },
              { opacity: 1, y: 0, duration: 0.22, stagger: 0.005, ease: 'power2.out', overwrite: true }
            );
            window.setTimeout(() => {
              document.documentElement.classList.remove('language-transitioning');
            }, 320);
          }
        };

        applyTheme(currentTheme);
        applyBrowserLocale();

        let lastScrollY = window.scrollY;
        let navStateFrame = 0;
        let navHiddenByScroll = false;

        const measureScrollBounds = () => {
          maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        };

        const showNav = () => {
          navHiddenByScroll = false;
          nav?.classList.remove('nav-hidden');
        };

        const hideNav = () => {
          navHiddenByScroll = true;
          nav?.classList.add('nav-hidden');
        };

        const setNavState = () => {
          navStateFrame = 0;
          const currentScrollY = window.scrollY;
          nav?.classList.toggle('scrolled', currentScrollY > 60);

          const isMenuOpen = mobileMenu?.classList.contains('open');
          const scrollingDown = currentScrollY > lastScrollY + 5;
          const scrollingUp = currentScrollY < lastScrollY - 3;

          if (!isMenuOpen && currentScrollY > 118 && scrollingDown) hideNav();
          if (scrollingUp || currentScrollY < 72 || isMenuOpen) showNav();

          lastScrollY = currentScrollY;

          if (progress) {
            const value = maxScroll > 0 ? Math.min(currentScrollY / maxScroll, 1) : 0;
            progress.style.transform = `scaleX(${value})`;
          }
        };

        const requestNavState = () => {
          if (navStateFrame) return;
          navStateFrame = window.requestAnimationFrame(setNavState);
        };

        const initHeroScrollDrift = () => {
          const hero = document.getElementById('hero');
          if (!hero || prefersReducedMotion) return;

          let frame = 0;
          const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

          const write = () => {
            frame = 0;
            const rect = hero.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight || 1;
            const progress = clamp(-rect.top / Math.max(1, Math.min(rect.height, vh * 1.15)), 0, 1);
            const ease = progress * progress * (3 - 2 * progress);

            hero.style.setProperty('--hero-scroll-p', ease.toFixed(4));
            hero.style.setProperty('--hero-drift-y', `${(-26 * ease).toFixed(2)}px`);
            hero.style.setProperty('--hero-drift-bg', `${(18 * ease).toFixed(2)}px`);
            hero.style.setProperty('--hero-drift-field', `${(34 * ease).toFixed(2)}px`);
            hero.style.setProperty('--hero-drift-scale', (1 + ease * 0.014).toFixed(4));

            if (progress > 0.08) {
              hero.dataset.scrollIntent = 'down';
            } else {
              hero.removeAttribute('data-scroll-intent');
            }
          };

          const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(write);
          };

          schedule();
          window.addEventListener('scroll', schedule, { passive: true });
          window.addEventListener('resize', schedule, { passive: true });
        };

        const initScrollDynamicLayers = () => {
          const sections = Array.from(document.querySelectorAll('main > section[id]:not(#hero):not(#scroll-driven-top-tier), .ticker-shell'))
            .filter((section) => section instanceof HTMLElement);

          if (!sections.length) return;

          sections.forEach((section) => {
            section.classList.add('scroll-dynamic');
            const hasLayer = Array.from(section.children).some((child) => child.classList?.contains('scroll-dynamic-glow'));
            if (!hasLayer) {
              const layer = document.createElement('span');
              layer.className = 'scroll-dynamic-glow';
              layer.setAttribute('aria-hidden', 'true');
              section.insertBefore(layer, section.firstElementChild);
            }
          });

          if (prefersReducedMotion) {
            sections.forEach((section) => {
              section.style.setProperty('--section-p', '1');
              section.style.setProperty('--section-glow-o', '.10');
            });
            return;
          }

          let frame = 0;
          const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

          const update = () => {
            frame = 0;
            const vh = window.innerHeight || document.documentElement.clientHeight || 1;

            sections.forEach((section) => {
              const rect = section.getBoundingClientRect();
              const progressValue = clamp((vh - rect.top) / Math.max(1, vh + rect.height), 0, 1);
              const wave = Math.sin(progressValue * Math.PI);
              const visible = rect.bottom > 0 && rect.top < vh;

              section.style.setProperty('--section-p', progressValue.toFixed(4));
              section.style.setProperty('--section-glow-x', `${(8 + progressValue * 84).toFixed(2)}%`);
              section.style.setProperty('--section-glow-y', `${(22 + wave * 44).toFixed(2)}%`);
              section.style.setProperty('--section-band-y', `${((progressValue - 0.5) * 46).toFixed(2)}px`);
              section.style.setProperty('--section-glow-o', visible ? (0.06 + wave * 0.22).toFixed(4) : '0');
            });
          };

          const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(update);
          };

          schedule();
          window.addEventListener('scroll', schedule, { passive: true });
          window.addEventListener('resize', schedule, { passive: true });
        };

        const setMobileMenu = (isOpen) => {
          mobileMenu?.classList.toggle('open', isOpen);
          mobileMenu?.setAttribute('aria-hidden', String(!isOpen));
          navToggle?.setAttribute('aria-expanded', String(isOpen));
          navToggle?.setAttribute('aria-label', isOpen ? uiCopy.navClose : uiCopy.navOpen);
          window.AetherIcons?.setIcon(navToggle, isOpen ? 'x' : 'menu');
        };

        const setActiveNavLink = (id) => {
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('is-active', href === `#${id}`);
          });
        };

        const flashDetail = (name, duration = 900) => {
          const detail = document.getElementById(`detail-${name}`);
          if (!detail) return;

          window.clearTimeout(flashTimers.get(name));
          detail.classList.add('detail-active');
          flashTimers.set(name, window.setTimeout(() => {
            detail.classList.remove('detail-active');
          }, duration));
        };

        const setActiveNode = (name, options = {}) => {
          const { scroll = false, flash = true } = options;

          loopSteps.forEach((step) => {
            const isActive = step === name;
            const node = document.getElementById(`node-${step}`);

            if (!node) return;

            node.classList.toggle('loop-active', isActive);
            node.setAttribute('aria-expanded', String(isActive));

            if (isActive) {
              node.setAttribute('aria-current', 'step');
            } else {
              node.removeAttribute('aria-current');
            }
          });

          if (flash) flashDetail(name, scroll ? 1200 : 900);

          if (scroll) {
            document.getElementById(`detail-${name}`)?.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }
        };

        setNavState();
        initHeroScrollDrift();
        initScrollDynamicLayers();
        window.addEventListener('scroll', requestNavState, { passive: true });
        window.addEventListener('resize', () => {
          measureScrollBounds();
          requestNavState();
        }, { passive: true });

        document.addEventListener('pointermove', (event) => {
          if (!nav || mobileMenu?.classList.contains('open')) return;
          if (event.clientY < 92 && navHiddenByScroll) showNav();
          if (event.clientY > 170 && navHiddenByScroll === false && window.scrollY > 160 && window.scrollY >= lastScrollY) hideNav();
        }, { passive: true });

        navToggle?.addEventListener('click', () => {
          setMobileMenu(!mobileMenu?.classList.contains('open'));
        });

        mobileLinks.forEach((link) => {
          link.addEventListener('click', () => setMobileMenu(false));
        });

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') setMobileMenu(false);
        });

        if ('IntersectionObserver' in window) {
          const sections = Array.from(navLinks)
            .map((link) => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

          const observer = new IntersectionObserver((entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible?.target?.id) setActiveNavLink(visible.target.id);
          }, {
            rootMargin: '-32% 0px -52% 0px',
            threshold: [0.12, 0.32, 0.62]
          });

          sections.forEach((section) => observer.observe(section));
        }

        loopSteps.forEach((step) => {
          document.getElementById(`node-${step}`)?.addEventListener('click', () => {
            activeIndex = loopSteps.indexOf(step);
            window.clearInterval(loopTimer);
            window.clearTimeout(loopResumeTimer);
            setActiveNode(step, { scroll: window.innerWidth < 1024 });
            loopResumeTimer = window.setTimeout(() => startLoopRotation(), 5200);
          });
        });

        setActiveNode(loopSteps[activeIndex], { flash: false });

        const advanceLoop = () => {
          activeIndex = (activeIndex + 1) % loopSteps.length;
          setActiveNode(loopSteps[activeIndex]);
        };

        const startLoopRotation = () => {
          window.clearInterval(loopTimer);
          if (!prefersReducedMotion && loopInView) {
            loopTimer = window.setInterval(advanceLoop, 2400);
          }
        };

        const howSection = document.getElementById('how');
        if ('IntersectionObserver' in window && howSection) {
          const loopObserver = new IntersectionObserver(([entry]) => {
            loopInView = entry.isIntersecting;
            if (loopInView) {
              startLoopRotation();
            } else {
              window.clearInterval(loopTimer);
              loopTimer = null;
            }
          }, {
            rootMargin: '12% 0px 12% 0px',
            threshold: 0.08
          });

          loopObserver.observe(howSection);
        } else {
          startLoopRotation();
        }

        const initTerminalDemo = () => {
          const prompt = document.getElementById('demo-user-prompt');
          const status = document.getElementById('demo-status');
          const log = document.getElementById('demo-log');
          const field = document.getElementById('demo-prompt-field');
          const button = document.getElementById('demo-execute');
          if (!prompt || !status || !log || !field || !button) return;



          let isProcessing = false;

          const appendLine = ([iconName, text, tone = '']) => {
            const line = document.createElement('p');
            line.className = `typing-line-demo mt-1 ${tone}`.trim();

            const icon = window.AetherIcons?.createIcon(iconName) || document.createElement('i');
            if (!window.AetherIcons) {
              icon.className = `bi ${iconName}`;
              icon.setAttribute('aria-hidden', 'true');
            }

            const copy = document.createElement('span');
            copy.textContent = text;

            line.append(icon, copy);
            return line;
          };

          const decodeText = (element, newText) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';
            let iterations = 0;
            const maxIterations = 15;
            const length = Math.max(element.textContent.length, newText.length);
            
            const interval = window.setInterval(() => {
              element.textContent = newText.split('').map((char, index) => {
                if(index < iterations) return newText[index];
                return chars[Math.floor(Math.random() * chars.length)];
              }).join('').padEnd(length, ' ').slice(0, length);
              
              if(iterations >= newText.length) {
                element.textContent = newText;
                window.clearInterval(interval);
              }
              iterations += Math.max(1, newText.length / maxIterations);
            }, 30);
          };

          const runDynamicDemo = (userText) => {
            if (isProcessing || !userText.trim()) return;
            isProcessing = true;
            field.value = '';
            field.placeholder = 'Processing task...';
            field.disabled = true;
            button.disabled = true;
            
            const isBr = isPortuguese;
            
            // Extract some keywords to make it look contextual
            const keywords = userText.split(' ').filter(w => w.length > 4);
            const targetWord = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'data';

            const dynamicDemo = {
              prompt: userText,
              status: isBr ? 'pausa de segurança ativa' : 'security gate active',
              lines: [
                ['bi-list-task', isBr ? `Planejador: decompondo objetivo [${targetWord}] em tarefas governadas` : `Planner: decomposing goal [${targetWord}] into governed tasks`],
                ['bi-terminal', isBr ? `Executor: lendo workspaces locais para analisar o alvo` : `Executor: reading local workspaces to analyze target`],
                ['bi-cpu', isBr ? `Crítico: validando integridade do artefato na memória SQLite` : `Critic: validating artifact integrity in SQLite memory`],
                ['bi-shield-lock', isBr ? `Pausa de segurança: aguardando aprovação humana para modificar arquivos` : `Security Gate: awaiting human approval to modify files`, 'text-coral'],
                ['bi-check2-circle', isBr ? 'Pronto: log de auditoria selado com sucesso' : 'Complete: audit log sealed successfully', 'text-gold']
              ]
            };

            const fragment = document.createDocumentFragment();

            decodeText(prompt, dynamicDemo.prompt);
            decodeText(status, dynamicDemo.status);

            dynamicDemo.lines.forEach((line) => fragment.append(appendLine(line)));
            log.replaceChildren(fragment);
            
            if (gsap) {
              const lines = Array.from(log.children);
              gsap.fromTo(lines,
                { opacity: 0, x: -12, skewX: 6 },
                { opacity: 1, x: 0, skewX: 0, duration: 0.34, stagger: 0.6, ease: 'power4.out', onComplete: () => {
                  isProcessing = false;
                  field.disabled = false;
                  button.disabled = false;
                  field.placeholder = 'Type a goal...';
                  field.focus();
                }}
              );
            } else {
              isProcessing = false;
              field.disabled = false;
              button.disabled = false;
              field.placeholder = 'Type a goal...';
            }
          };

          button.addEventListener('click', () => {
            const val = field.value.trim() || field.placeholder;
            runDynamicDemo(val === 'Type a goal...' ? (isPortuguese ? 'Analisar arquivos confidenciais' : 'Analyze confidential files') : val);
          });
          
          field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              button.click();
            }
          });

          window.addEventListener('aether:localechange', () => {
            const val = field.value.trim() || field.placeholder;
            runDynamicDemo(val === 'Type a goal...' ? (isPortuguese ? 'Analisar arquivos confidenciais' : 'Analyze confidential files') : val);
          });
        };

        const initSignupForm = () => {
          const form = document.getElementById('early-access-form');
          const input = document.getElementById('early-access-email');
          const honeypot = document.getElementById('early-access-bot');
          const feedback = document.getElementById('signup-feedback');
          const submitBtn = form?.querySelector('button[type="submit"]');
          if (!form || !input || !feedback || !submitBtn) return;
          const submitContent = submitBtn.innerHTML;

          form.addEventListener('submit', (event) => {
            event.preventDefault();

            // Honeypot check
            if (honeypot && honeypot.value) {
              // Silently abort for bots
              form.reset();
              return;
            }

            if (!input.checkValidity()) {
              feedback.textContent = uiCopy.invalidEmail;
              input.focus();
              return;
            }

            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.textContent = '...';

            // Simulate API request
            window.setTimeout(() => {
              feedback.textContent = uiCopy.queued(input.value.trim());
              form.reset();
              submitBtn.disabled = false;
              submitBtn.style.opacity = '1';
              submitBtn.innerHTML = submitContent;
              window.AetherIcons?.hydrate(submitBtn);
            }, 800);
          });
        };

        const initLiquidGlassPointers = () => {
          const targets = document.querySelectorAll('.glass-panel, .card:not(.loop-node), .proof-cell, .spec-stack, .signal-card, .aether-case-card, .hero-metric, .btn-primary, .btn-ghost, .signup-form, .terminal-card, .philosophy-card');
          if (!targets.length || prefersReducedMotion) return;

          targets.forEach((target) => {
            target.addEventListener('pointermove', (event) => {
              const rect = target.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 100;
              const y = ((event.clientY - rect.top) / rect.height) * 100;
              target.style.setProperty('--mx', `${x.toFixed(2)}%`);
              target.style.setProperty('--my', `${y.toFixed(2)}%`);
            }, { passive: true });

            target.addEventListener('pointerleave', () => {
              target.style.removeProperty('--mx');
              target.style.removeProperty('--my');
            }, { passive: true });
          });
        };



        initTerminalDemo();
        initSignupForm();

        initLiquidGlassPointers();

        if (!gsap || !ScrollTrigger || prefersReducedMotion) {
          document.querySelectorAll('.fade-up, .fade-in, .scale-in, .terminal-reveal, .motion-stable, .timeline-item, .timeline-item > *, .word-inner, .hero-fade, .gs-stagger, .cascade:not(.motion-stable) > *').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.filter = 'none';
          });
          return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const isMobileMotion = () => window.innerWidth < 768;
        const refreshAfterAssets = () => {
          const imagePromises = Array.from(document.images).map((image) => {
            if (typeof image.decode === 'function') return image.decode().catch(() => {});
            if (image.complete) return Promise.resolve();

            return new Promise((resolve) => {
              image.addEventListener('load', resolve, { once: true });
              image.addEventListener('error', resolve, { once: true });
            });
          });

          Promise.all([
            document.fonts?.ready || Promise.resolve(),
            Promise.all(imagePromises)
          ]).then(() => {
            window.requestAnimationFrame(() => {
              measureScrollBounds();
              ScrollTrigger.refresh(true);
              setNavState();
            });
          });
        };

        const withLayer = (vars) => {
          const { onStart, onComplete, ...rest } = vars;

          return {
            ...rest,
            onStart() {
              gsap.set(this.targets(), { willChange: 'transform, opacity, filter' });
              if (typeof onStart === 'function') onStart.call(this);
            },
            onComplete() {
              gsap.set(this.targets(), { willChange: 'auto' });
              if (typeof onComplete === 'function') onComplete.call(this);
            }
          };
        };

        const runIntroMotion = performance.now() < 2200;

        if (runIntroMotion) {
          gsap.fromTo('.word-inner',
            { y: '105%', opacity: 0 },
            withLayer({
              y: '0%',
              opacity: 1,
              duration: isMobileMotion() ? 0.9 : 1.1,
              stagger: isMobileMotion() ? 0.08 : 0.10,
              ease: 'power4.out',
              delay: 0.1
            })
          );

          gsap.fromTo('.hero-fade',
            {
              opacity: 0,
              y: () => isMobileMotion() ? 10 : 14
            },
            withLayer({
              opacity: 1,
              y: 0,
              duration: isMobileMotion() ? .50 : .62,
              stagger: isMobileMotion() ? 0.06 : 0.09,
              ease: 'power3.out',
              delay: 0.32
            })
          );
        } else {
          gsap.set('.word-inner', { y: '0%', opacity: 1 });
          gsap.set('.hero-fade', { opacity: 1, y: 0, filter: 'none' });
        }

        gsap.to('.hero-grid', {
          y: 70,
          opacity: .18,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        gsap.to('.hero-metrics', {
          y: -24,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        const revealStableGroup = (selector, triggerSelector, stagger = 0.04) => {
          const targets = gsap.utils.toArray(selector);
          if (!targets.length) return;

          gsap.fromTo(targets,
            {
              y: () => isMobileMotion() ? 8 : 12,
              opacity: 0,
              force3D: true
            },
            withLayer({
              y: 0,
              opacity: 1,
              duration: () => isMobileMotion() ? .42 : .56,
              stagger: () => isMobileMotion() ? Math.min(stagger, .025) : stagger,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: triggerSelector || targets[0],
                start: () => isMobileMotion() ? 'top 94%' : 'top 88%',
                once: true,
                invalidateOnRefresh: true
              },
              onComplete() {
                gsap.set(targets, { clearProps: 'transform,willChange' });
              }
            })
          );
        };

        revealStableGroup('.proof-cell.motion-stable', '.proof-grid', 0.055);
        revealStableGroup('aside.motion-stable', '#what', 0);
        revealStableGroup('.terminal-reveal.motion-stable', '#interface', 0);
        revealStableGroup('.spec-row', '.spec-stack', 0.08);

        gsap.utils.toArray('.terminal-reveal').forEach((el) => {
          const parts = el.querySelectorAll('.terminal-bar, .terminal-body, .terminal-input-bar');

          if (el.classList.contains('motion-stable')) {
            return;
          }

          gsap.set(el, {
            opacity: 0
          });
          gsap.set(parts, { opacity: 0 });

          const terminalTimeline = gsap.timeline({
            paused: true,
            onStart() {
              gsap.set([el, ...parts], { willChange: 'opacity' });
            },
            onComplete() {
              gsap.set([el, ...parts], { willChange: 'auto' });
            }
          });

          terminalTimeline
            .to(el, {
              opacity: 1,
              duration: () => isMobileMotion() ? .24 : .32,
              ease: 'power1.out'
            })
            .to(parts, {
              opacity: 1,
              duration: () => isMobileMotion() ? .18 : .24,
              stagger: () => isMobileMotion() ? .018 : .024,
              ease: 'power1.out'
            }, '-=.18');

          let played = false;
          let terminalObserver = null;
          const playTerminal = () => {
            if (played) return;
            played = true;
            terminalObserver?.disconnect();
            terminalTimeline.play(0);
          };

          if ('IntersectionObserver' in window) {
            terminalObserver = new IntersectionObserver(([entry]) => {
              if (!entry.isIntersecting) return;
              playTerminal();
            }, {
              rootMargin: isMobileMotion() ? '0px 0px -8% 0px' : '0px 0px -14% 0px',
              threshold: isMobileMotion() ? 0.12 : 0.18
            });

            terminalObserver.observe(el);
          } else {
            playTerminal();
          }
        });

        const timelineList = document.querySelector('.timeline-list');
        const timelineItems = gsap.utils.toArray('.timeline-item');

        if (timelineList && timelineItems.length) {
          const timelineChildren = timelineItems.flatMap((el) => Array.from(el.children));

          gsap.set(timelineItems, {
            y: () => isMobileMotion() ? 14 : 22,
            opacity: 0,
            force3D: true
          });
          gsap.set(timelineChildren, {
            y: () => isMobileMotion() ? 7 : 10,
            opacity: 0,
            force3D: true
          });

          const visionTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: timelineList,
              start: () => isMobileMotion() ? 'top 92%' : 'top 84%',
              once: true,
              invalidateOnRefresh: true
            },
            onStart() {
              gsap.set([...timelineItems, ...timelineChildren], { willChange: 'transform, opacity' });
            },
            onComplete() {
              gsap.set([...timelineItems, ...timelineChildren], { willChange: 'auto' });
            }
          });

          visionTimeline
            .to(timelineItems, {
              y: 0,
              opacity: 1,
              duration: () => isMobileMotion() ? .52 : .72,
              stagger: () => isMobileMotion() ? .07 : .12,
              ease: 'power2.out'
            })
            .to(timelineChildren, {
              y: 0,
              opacity: 1,
              duration: () => isMobileMotion() ? .34 : .48,
              stagger: () => isMobileMotion() ? .018 : .024,
              ease: 'power2.out'
            }, '-=.44');
        }

        gsap.utils.toArray('.fade-up:not(.hero-fade):not(.scale-in):not(.motion-stable):not(.proof-cell)').forEach((el) => {
          gsap.fromTo(el,
            { y: () => isMobileMotion() ? 12 : 18, opacity: 0 },
            withLayer({
              y: 0,
              opacity: 1,
              duration: () => isMobileMotion() ? .46 : .62,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: () => isMobileMotion() ? 'top 92%' : 'top 88%',
                once: true,
                invalidateOnRefresh: true
              }
            })
          );
        });

        gsap.utils.toArray('.fade-in:not(.hero-fade):not(.motion-stable)').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0 },
            withLayer({
              opacity: 1,
              duration: () => isMobileMotion() ? .42 : .58,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: el,
                start: () => isMobileMotion() ? 'top 92%' : 'top 85%',
                once: true,
                invalidateOnRefresh: true
              }
            })
          );
        });

        gsap.utils.toArray('.scale-in').forEach((el) => {
          gsap.fromTo(el,
            { y: () => isMobileMotion() ? 16 : 0, scale: () => isMobileMotion() ? .985 : .95, opacity: 0 },
            withLayer({
              y: 0,
              scale: 1,
              opacity: 1,
              duration: () => isMobileMotion() ? .85 : 1.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: el,
                start: () => isMobileMotion() ? 'top 92%' : 'top 85%',
                once: true,
                invalidateOnRefresh: true
              }
            })
          );
        });

        gsap.utils.toArray('.cascade:not(.motion-stable)').forEach((el) => {
          const children = Array.from(el.children);
          if (!children.length) return;

          gsap.fromTo(children,
            { y: () => isMobileMotion() ? 6 : 8, opacity: 0 },
            withLayer({
              y: 0,
              opacity: 1,
              duration: () => isMobileMotion() ? .32 : .4,
              stagger: () => isMobileMotion() ? .018 : .024,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: () => isMobileMotion() ? 'top 92%' : 'top 84%',
                once: true,
                invalidateOnRefresh: true
              }
            })
          );
        });

        gsap.utils.toArray('.glass-panel p, .card > p, .trust-chip > p, .philosophy-card > p, .timeline-item > p:not(.label-kicker)').forEach((el, i) => {
          gsap.fromTo(el,
            {
              y: () => isMobileMotion() ? 8 : 12,
              opacity: 0
            },
            withLayer({
              y: 0,
              opacity: 1,
              duration: () => isMobileMotion() ? .38 : .52,
              delay: () => isMobileMotion() ? (i % 2) * .012 : (i % 4) * .025,
              ease: 'power2.out',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: el.closest('section') || el,
                start: () => isMobileMotion() ? 'top 90%' : 'top 82%',
                once: true,
                invalidateOnRefresh: true
              }
            })
          );
        });

        gsap.utils.toArray('.gs-stagger').forEach((el, i) => {
          gsap.fromTo(el,
            { y: () => isMobileMotion() ? 10 : 18, opacity: 0 },
            withLayer({
              y: 0,
              opacity: 1,
              duration: () => isMobileMotion() ? .4 : .56,
              delay: () => isMobileMotion() ? (i % 2) * 0.018 : (i % 3) * 0.035,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el.parentElement,
                start: () => isMobileMotion() ? 'top 91%' : 'top 82%',
                once: true,
                invalidateOnRefresh: true
              }
            })
          );
        });

        if (document.readyState === 'complete') {
          refreshAfterAssets();
        } else {
          window.addEventListener('load', refreshAfterAssets, { once: true });
        }
      };
