export const BLOG_POSTS = [
  {
    id: "v0.6.0-quintessence-ide-launch",
    title: "AetherCore v0.6.0 — Quintessence: A Nossa IDE Nativa",
    titleEn: "AetherCore v0.6.0 — Quintessence: Our Native IDE",
    excerpt: "Apresentamos o lançamento do Quintessence, nossa IDE local com Aether Chat nativo, controle de execução silenciosa e protocolo IPC JSON-RPC.",
    excerptEn: "Introducing the launch of Quintessence, our local IDE featuring native Aether Chat, silent execution control, and JSON-RPC IPC bridge.",
    version: "v0.6.0",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "15 de Julho de 2026",
    dateEn: "July 15, 2026",
    readTime: "6 min read",
    tags: ["IDE", "Quintessence", "IPC Bridge", "Inline Diff"],
    content: `### O Ecossistema Unificado

Temos o orgulho de anunciar o maior marco de engenharia do projeto até hoje: o lançamento e validação do **Quintessence**, nossa IDE integrada local-first. AetherCore e Quintessence agora trabalham em simbiose, compartilhando o mesmo Kernel de execução e o estado da sessão de trabalho.

Agora, o AetherCore Hub serve como a central de controle e cockpit, enquanto o Quintessence atua como o seu ambiente de escrita e manipulação de arquivos de alta performance.

![Quintessence IDE Home Page](/assets/img/blog/ide-quintessence.png)

---

### Principais Funcionalidades do Quintessence

- **Aether Chat Nativo**: A inteligência dos agentes diretamente na barra lateral da IDE, sem necessidade de janelas flutuantes ou troca de contextos.
- **Ponte IPC em Rust**: Comunicação extremamente rápida utilizando mensagens JSON-RPC 2.0 e NDJSON via stdin/stdout, eliminando totalmente a necessidade de abrir portas de rede locais vulneráveis.
- **Modo de Execução Silencioso**: Permite que os agentes executem comandos determinísticos rápidos sem poluir o log visual do usuário.
- **Inline Diff Avançado**: Revisão de código inteligente linha a linha com cores clássicas de papel e nanquim, permitindo aceitar ou rejeitar trechos propostos com um único clique.
- **Suporte a Open VSX**: Compatibilidade nativa com extensões padrão do mercado diretamente do registro aberto.`,
    contentEn: `### The Unified Ecosystem

We are proud to announce the biggest engineering milestone of the project to date: the launch and validation of **Quintessence**, our local-first integrated IDE. AetherCore and Quintessence now work in symbiosis, sharing the same execution Kernel and workspace session state.

AetherCore Hub acts as your control cockpit, while Quintessence serves as your high-performance file editing and coding environment.

![Quintessence IDE Home Page](/assets/img/blog/ide-quintessence.png)

---

### Key Features of Quintessence

- **Native Aether Chat**: Agent intelligence directly in the IDE sidebar, eliminating context switching or floating window clutter.
- **Rust IPC Bridge**: Blazing-fast communication using JSON-RPC 2.0 and NDJSON over stdin/stdout, completely avoiding vulnerable local network ports.
- **Silent Execution Mode**: Allows agents to run fast deterministic commands without polluting the user's visual history log.
- **Advanced Inline Diff**: Line-by-line smart code review rendered in warm paper/ink tones, enabling accepting or rejecting changes with a single click.
- **Open VSX Support**: Out-of-the-box compatibility with industry-standard extensions from the open registry.`,
  },
  {
    id: "v0.5.4-878-tests-arl-security",
    title: "AetherCore v0.5.4 — 878 Testes e Segurança Blindada",
    titleEn: "AetherCore v0.5.4 — 878 Tests & Hardened Security",
    excerpt: "Validação completa de 878 testes automatizados no Rust, 0 warnings de compilação e implementação do ARL com 5 níveis de permissão.",
    excerptEn: "Full validation of 878 automated Rust tests, 0 compiler warnings, and ARL security architecture with 5 permission levels.",
    version: "v0.5.4",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "15 de Julho de 2026",
    dateEn: "July 15, 2026",
    readTime: "5 min read",
    tags: ["Rust", "Security", "ARL", "Testing"],
    content: `### Integridade Técnica Excepcional

Nossa rodada de auditoria geral consolidou a estabilidade do Kernel em Rust com **878 testes automatizados** passando com sucesso total. Conseguimos atingir a marca de **zero warnings** de compilação em todas as crates do Rust e no build do TypeScript, garantindo que o software está pronto para escala.

---

### Arquitetura de Segurança ARL

Refatoramos e solidificamos o Limite de Execução de Agentes (ARL - Agent Runtime Limit) estruturando a segurança em 5 níveis rígidos:
1. **Nível 1 (Leitura Pura)**: Ferramentas de exploração que lêem arquivos ou coletam status do sistema.
2. **Nível 2 (Escrita no Workspace)**: Permissão de alteração restrita à pasta do projeto aberto.
3. **Nível 3 (Acesso de Rede)**: Execução de chamadas HTTP se explicitamente autorizadas.
4. **Nível 4 (Acesso ao Sistema)**: Acesso a ferramentas perigosas fora do workspace (como o Code Interpreter local).
5. **Nível 5 (Controle Total)**: Sessão interativa supervisionada com aprovação manual passo a passo.

Todos os logs de auditoria agora registram o hash criptográfico do estado antes e depois de cada alteração de arquivo, oferecendo rastreabilidade completa.`,
    contentEn: `### Exceptional Technical Integrity

Our latest audit round consolidated the stability of the Rust Kernel with **878 automated tests** passing successfully. We achieved **zero compiler warnings** across all Rust crates and the TypeScript build, ensuring production-level stability.

---

### ARL Security Architecture

We refactored and hardened the Agent Runtime Limit (ARL), structuring tool access across 5 strict permission tiers:
1. **Tier 1 (Read-Only)**: Exploration tools for scanning files or system status.
2. **Tier 2 (Workspace Write)**: File modifications strictly isolated to the active project folder.
3. **Tier 3 (Network Access)**: Managed HTTP requests, enabled only when explicitly authorized.
4. **Tier 4 (System Access)**: Dangerous tools outside the workspace (such as the local Code Interpreter).
5. **Tier 5 (Full Control)**: Interactive supervised session requiring manual step-by-step approval.

All audit logs now record cryptographic hashes of file states before and after each agent action, offering 100% trace accountability.`,
  },
  {
    id: "v0.5.3-granite-orchestrator-slash-commands",
    title: "AetherCore v0.5.3 — Orquestrador Granite e Comandos Determinísticos",
    titleEn: "AetherCore v0.5.3 — Granite Orchestrator & Deterministic Commands",
    excerpt: "IBM Granite adotado como modelo orquestrador sob licença Apache-2.0, e introdução de slash commands determinísticos de latência zero.",
    excerptEn: "IBM Granite adopted as our Apache-2.0 orchestrator model, and introduction of zero-latency deterministic slash commands.",
    version: "v0.5.3",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "07 de Julho de 2026",
    dateEn: "July 7, 2026",
    readTime: "4 min read",
    tags: ["Granite", "LLM", "Slash Commands", "Performance"],
    content: `### Orquestração com IBM Granite

Após testes intensivos comparando 8 modelos sob licença permissiva Apache-2.0, selecionamos o **IBM Granite** como nosso modelo orquestrador de referência para tarefas locais complexas. O Granite se destacou na geração de JSON estruturado, utilizado pelo Aether para propor chamadas de ferramentas e delegar subtarefas aos modelos auxiliares (como o Qwen).

---

### Comandos Determinísticos (Slash Commands)

Nem toda interação precisa passar pela lentidão de uma inteligência artificial. Introduzimos os comandos \`/status\`, \`/config\` e \`/help\` que rodam diretamente na engine do Kernel de forma determinística.

- **Latência Zero**: Resposta instantânea em menos de 10ms.
- **Consumo Zero**: Sem gastar tokens locais ou sobrecarregar a memória RAM.
- **Confiança de 100%**: Sem risco de alucinações de formato ou erros de sintaxe.`,
    contentEn: `### Shaping local agent behavior with IBM Granite

Following intensive benchmarking against 8 Apache-2.0 permissive models, we selected **IBM Granite** as our reference orchestrator model for complex local agent workflows. Granite outperformed its peers in generating structured JSON schemas used by Aether to plan tool invocations and delegate subtasks to execution models (like Qwen).

---

### Deterministic Slash Commands

Not all actions require the overhead of a large language model. We introduced deterministic \`/status\`, \`/config\`, and \`/help\` slash commands that run directly inside our Rust runtime.

- **Zero Latency**: Instant responses in less than 10ms.
- **Zero Overhead**: Bypasses token processing entirely, preserving RAM.
- **100% Reliability**: Zero risk of syntax hallucinations or formatting errors.`,
  },
  {
    id: "v0.5.2-sustainability-centelha-grant",
    title: "AetherCore v0.5.2 — IA Verde e Candidatura ao Programa Centelha",
    titleEn: "AetherCore v0.5.2 — Green AI & Centelha Innovation Grant",
    excerpt: "Redução de 80% no consumo de energia através do processamento local e preparação para o edital de inovação Centelha 3 SP.",
    excerptEn: "80% reduction in energy consumption through local computing and active submission for the Centelha 3 SP innovation grant.",
    version: "v0.5.2",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "07 de Julho de 2026",
    dateEn: "July 7, 2026",
    readTime: "4 min read",
    tags: ["Sustainability", "Centelha", "Funding", "Innovation"],
    content: `### Sustentabilidade por Design (IA Verde)

Ao computar modelos localmente nas máquinas dos usuários, o AetherCore reduz em média **80% o consumo elétrico** em comparação à infraestrutura de servidores de nuvem necessários para processar o mesmo fluxo. O processamento distribuído não apenas blinda a privacidade do usuário (garantindo conformidade com LGPD/GDPR), mas também reduz drasticamente a pegada de carbono geral do processamento de inteligência artificial.

Nossas métricas indicam que 100 instalações ativas poupam mais de 200.000 kWh em um ano.

---

### Candidatura ao Programa Centelha 3 SP

Estamos participando do processo seletivo do **Programa Centelha 3 SP** (parceria com FAPESP, FINEP e CNPq). O projeto foi validado tecnicamente como uma plataforma desktop inovadora de alta viabilidade comercial e impacto social, concorrendo a até R$ 242.440 em recursos não-reembolsáveis para fomento e aceleração do desenvolvimento.`,
    contentEn: `### Green AI (Sustainability by Design)

By running model inference locally on user hardware, AetherCore reduces electrical usage by **80% on average** compared to the massive cloud server networks required for the same tasks. Local computing protects your data privacy (complying with LGPD/GDPR by design) while slashing the carbon footprint of AI workloads.

Our projection indicates that 100 active installations save over 200,000 kWh per year.

---

### Centelha 3 SP Grant Application

We have submitted our project to the **Centelha 3 SP Innovation Program** (partnered with FAPESP, FINEP, and CNPq). AetherCore was validated as a highly viable, high-impact desktop agent platform. We are competing for up to R$ 242,440 in non-reimbursable funding to accelerate our R&D roadmap.`,
  },
  {
    id: "v0.5.1-capability-guards-model-resolution",
    title: "AetherCore v0.5.1 — Capability Guards e Resolução de Modelos",
    titleEn: "AetherCore v0.5.1 — Capability Guards & Model Resolution",
    excerpt: "Validação preditiva de ferramentas por capacidade, hierarquia rígida de resolução de modelos locais e política de interrupção contra uploads na nuvem.",
    excerptEn: "Predictive validation of tools by model capability, strict local model resolution hierarchy, and clear abort policy against silent cloud uploads.",
    version: "v0.5.1",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "06 de Julho de 2026",
    dateEn: "July 6, 2026",
    readTime: "4 min read",
    tags: ["Kernel", "Security", "Guards", "Model Resolution"],
    content: `### Hierarquia e Isolamento de Modelos

Estabelecemos um sistema rigoroso de precedência que respeita as fronteiras de segurança quando um modelo é escolhido para atuar:
1. **Tarefas Específicas**: Regras amarradas diretamente a uma ação têm precedência máxima.
2. **Workflows**: Definições da sessão de trabalho.
3. **Padrão do Workspace**: O motor escolhido para o seu projeto isolado atual.
4. **Padrão Global**: O motor de segurança de fallback final.

*(Esta arquitetura garante que dados sensíveis de um projeto fechado nunca vazem para um modelo de nuvem acidentalmente se a precedência correta não for respeitada.)*

---

### Validação Preditiva (Capability Guards)

O motor de execução agora é "Fail-Fast". Antes de enviar comandos a qualquer inteligência artificial (seja local ou remota), o sistema inspeciona se aquele modelo possui as capacidades corretas exigidas pela tarefa.

Se for solicitada automação complexa (uso de ferramentas) a um modelo que foi configurado puramente para resumo de textos, o AetherCore aborta a execução instantaneamente e avisa o usuário, evitando o uso corrompido ou desperdício de tempo e processamento.

---

### Proteção Contra Quedas (Zero Fallback Silencioso)

Em alinhamento aos pilares de privacidade de dados do AetherCore, introduzimos a política de interrupção clara. Se um modelo local falhar por insuficiência de hardware ou erro, o AetherCore **não enviará os dados** para os servidores globais na nuvem silenciosamente, blindando a telemetria e o ciclo de vida do que é processado localmente.

---

### Melhorias de Observabilidade e Testes
- **provider_id na Telemetria**: O barramento de relatórios do \`ExecutionDashboard\` agora grava com exatidão o \`provider_id\` do motor ativo durante a sessão.
- **PluginRegistry**: Corrigimos a hidratação das dependências locais no registro de plugins, acelerando a execução de testes unitários em ambientes isolados.`,
    contentEn: `### Model Hierarchy and Resolution

We established a strict model precedence system to respect security boundaries when selecting active models:
1. **Task-specific configurations**: Direct tool rules take maximum precedence.
2. **Workspaces settings**: Current active workspace defaults.
3. **Workspace Standard**: Default engine for active environments.
4. **Global Fallback**: Central safety fallback engine.

This architecture ensures that sensitive data from closed workspaces never accidentally leaks to cloud endpoints if direct local routing is missed.

---

### Predictive Validation (Capability Guards)

The execution engine is now "Fail-Fast". Before dispatching runs to local or remote AIs, the system audits if target models support the required capabilities.

If complex tool execution is requested from a model configured only for text summaries, AetherCore halts execution instantly to save processing time.

---

### Dropped Model Protections (Zero Cloud Fallback)

In alignment with our privacy pillars, we implemented a clear interruption policy. If a local model fails due to hardware constraints or runtimes crashes, AetherCore **will not silently forward queries** to public cloud APIs.

---

### Observability and Testing Improvements
- **provider_id in Telemetry**: System trace reports inside \`ExecutionDashboard\` now record the active \`provider_id\` dynamic signature.
- **PluginRegistry**: Hydrated local testing suits registries to speed up execution of isolated modules.`
  },
  {
    id: "v0.5.0-workspace-scope-memory-kernel-v1",
    title: "AetherCore v0.5.0 — Workspace Scope e Memory Kernel v1",
    titleEn: "AetherCore v0.5.0 — Workspace Scope & Memory Kernel v1",
    excerpt: "Consolidação de WorkspaceScope contra Path Traversal, e lançamento do Memory Kernel com RAG híbrido (SQLite FTS5 + Embeddings).",
    excerptEn: "Consolidation of WorkspaceScope against Path Traversal, and release of the Memory Kernel with hybrid RAG (SQLite FTS5 + Embeddings).",
    version: "v0.5.0",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "05 de Julho de 2026",
    dateEn: "July 5, 2026",
    readTime: "4 min read",
    tags: ["RAG", "Security", "SQLite", "Sandbox"],
    content: `### Segurança e Isolamento de Execução

Consolidamos o **Workspace Isolation** e a governança da execução, garantindo que agentes não possam acessar arquivos indevidos:
- **WorkspaceScope**: Módulo que converte e resolve caminhos absolutos e relativos, comparando com a raiz de permissão. Ele oferece proteção estrita contra *Path Traversal* (e.g. \`../../../Windows/System32\`) e bloqueia automaticamente diretórios de controle como \`.git/\`.
- **Níveis de Escopo**: Definidos três níveis: \`WorkspaceOnly\` (padrão seguro), \`CustomRoots\` (diretórios mapeados e aprovados) e \`FullComputer\` (acesso global sob auditoria severa). Workflows não podem realizar auto-elevação sem permissão humana explícita.

---

### AetherCore Memory Kernel v1

Lançamos o **Memory Kernel**, superando o conceito de "arquivos anexados" em memória através de um pipeline nativo e de alta velocidade:
- **SQLite FTS5**: SQLite armazena \`documents\` e \`document_chunks\` indexados por Full Text Search nativo (FTS5). Integramos hashes SHA256 para staleness checking, evitando reindexação de arquivos inalterados e gerenciando chunks órfãos automaticamente.
- **Retrieval Híbrido**: O pipeline combina busca textual (BM25) com busca semântica baseada em Cosine Similarity, armazenando embeddings no próprio SQLite. Conta com ingestion resiliente: se o gerador de embeddings estiver offline, o FTS5 continua funcionando como fallback.
- **ContextAssembler**: Recupera chunks respeitando o token budget e injeta no prompt do LLM referências e scores de proveniência precisos.

---

### Camada de Provedores Plugáveis e Armazenamento Vetorial
- **Desacoplamento de Providers**: Mapeamos múltiplos provedores de inferência atrás do \`OpenAICompatibleProvider\`. Com isso, o LocalAI foi rebaixado ao seu devido lugar de motor de inferência opcional e isolado do Kernel.
- **key_vault Criptografado**: O armazenamento de chaves de API locais/nuvem (LM Studio, Ollama Proxy, Anthropic, OpenAI) passa a utilizar criptografia simétrica local.
- **Embeddings JSON f32**: A tabela de embeddings semânticos armazena vetores flutuantes \`f32\` diretamente em formato JSON serializado nativamente no SQLite.`,
    contentEn: `### Security and Execution Isolation

We consolidated **Workspace Isolation** and execution governance to prevent unauthorized file access:
- **WorkspaceScope**: A module that resolves paths relative to the permission root, providing strict protection against *Path Traversal* (e.g. \`../../../Windows/System32\`) and blocking directory metadata like \`.git/\`.
- **Scope Levels**: Configured three access scopes: \`WorkspaceOnly\` (safe default), \`CustomRoots\` (pre-approved folders), and \`FullComputer\` (audited global access). Automated workflows cannot request self-escalation without human approvals.

---

### AetherCore Memory Kernel v1

Released the **Memory Kernel**, moving past basic file attachments to implement a native, high-speed retrieval pipeline:
- **SQLite FTS5**: SQLite handles \`documents\` and \`document_chunks\` indexation via native Full Text Search. We use SHA256 hashes to perform staleness checking, preventing reindexing unchanged files and clean orphans.
- **Hybrid Retrieval**: Combines keyword search (BM25) with Cosine Similarity vector queries, storing float embeddings arrays inside SQLite. Built with fail-soft ingestion: if the embedding model is offline, FTS5 works as fallback.
- **ContextAssembler**: Recovers chunks under token budgets and appends context snippets with clear scoring logs.

---

### Pluggable Providers & Vector Storage
- **Decoupled Providers**: Integrated multiple inference engines behind \`OpenAICompatibleProvider\`. LocalAI is now positioned in its correct place as a pluggable backend isolated from the Kernel.
- **Encrypted key_vault**: Session credentials for cloud or local gateways (LM Studio, Ollama Proxy, Anthropic, OpenAI) are secured via symmetric encryption keys.
- **f32 JSON Embeddings**: Semantic vector tables serialize raw \`f32\` float arrays directly as JSON objects inside SQLite.`
  },
  {
    id: "v0.4.9-refatoracao-estrutural-god-module",
    title: "AetherCore v0.4.9 — Desacoplamento do God Module e FFI Seguro",
    titleEn: "AetherCore v0.4.9 — God Module Decoupling & Safe FFI",
    excerpt: "Desacoplamento de turn_logic.rs com injetor de comandos determinísticos, isolamento FFI seguro da API Win32 e build livre de warnings.",
    excerptEn: "Decoupled turn_logic.rs with deterministic commands injection, safe FFI isolation for Win32 API, and zero-warning build baseline.",
    version: "v0.4.9",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "04 de Julho de 2026",
    dateEn: "July 4, 2026",
    readTime: "3 min read",
    tags: ["Arquitetura", "Refatoração", "Safe Rust", "Win32"],
    content: `### Desacoplamento e Responsabilidade Única

Realizamos uma refatoração profunda no módulo central do Kernel de Execução de Sessões (\`turn_logic.rs\`):
- **Deterministic Commands**: Toda a lógica de comandos de telemetria estáticos (\`/status\`, \`/config\`, etc) foi movida para um injetor próprio desacoplado, limpando a máquina de estados principal.
- **Limpeza de Ghost Code**: Removemos a injeção da variável obsoleta \`AETHERCORE_TODO_STORE\` no sistema de Ferramentas, que agora funciona sob guards de compilação restritos a Testes.

---

### Segurança de Memória e FFI

- **Safe Rust**: Eliminamos possíveis violações de memória crua provenientes da biblioteca de telemetria \`sysinfo\`. As chamadas à API Win32 foram isoladas atrás de um módulo FFI rígido.
- **Mutex Poisoning Recovery**: Implementamos rotinas de recuperação assíncrona imediata da thread para cenários onde pânicos de I/O corromperiam o estado de locks da UI.
- **Zero Warnings**: O workspace completo composto por 19 projetos Rust atingiu a marca de zero warnings no compilador Rust 2021.`,
    contentEn: `### Decoupling and Single Responsibility

Executed a deep architectural refactoring in the core workspace package (\`turn_logic.rs\`):
- **Deterministic Commands**: Isolated diagnostic and setup commands (\`/status\`, \`/config\`, etc) into an independent commands pipeline, cleaning session states.
- **Ghost Code cleanup**: Deleted obsoletes references to \`AETHERCORE_TODO_STORE\` variables in the Tool executor, which now runs behind compilation flags in Tests contexts.

---

### Safe FFI and Memory Safeguards

- **Safe Rust wrappers**: Removed raw memory mappings used to collect hardware telemetries in \`sysinfo\`. Win32 calls are now isolated in a safe FFI layer.
- **Mutex Poisoning Recovery**: Added async mutex recovery handlers to ensure CEF layout does not freeze if an I/O panics during transaction drops.
- **Zero Warnings**: The entire workspace of 19 Rust crates reached a baseline of zero compile warnings under Rust 2021.`
  },
  {
    id: "v0.4.8-motor-prompt-128k-performance",
    title: "AetherCore v0.4.8 — Prompt Engine 128k e Win32 APIs",
    titleEn: "AetherCore v0.4.8 — Prompt Engine 128k & Win32 APIs",
    excerpt: "Expansão de contexto para 128k, Git assíncrono com timeout e eliminação de processos PowerShell por consultas Win32/DXGI nativas.",
    excerptEn: "Context limit expansion to 128k, async Git timeout, and PowerShell elimination in favor of native Win32/DXGI memory queries.",
    version: "v0.4.8",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "03 de Julho de 2026",
    dateEn: "July 3, 2026",
    readTime: "4 min read",
    tags: ["Performance", "Win32", "DXGI", "Git", "Contexto"],
    content: `### Expansão do Motor de Prompt e Contexto

- **Teto de 128k**: Expandimos o limite de caracteres de instruções de 12k para 128k (\`MAX_TOTAL_INSTRUCTION_CHARS\`) e o limite por arquivo individual de 4k para 32k (\`MAX_INSTRUCTION_FILE_CHARS\`), habilitando processamento de grandes códigos.
- **Git Assíncrono com Timeout**: Rotinas de consulta Git (\`git status\` e \`git diff\`) agora usam lógica assíncrona não-bloqueante via canais \`mpsc\` com timeout forçado de 500ms. Isso evita congelamento da UI em repositórios massivos ou corrompidos.
- **Regex Caching**: Otimizamos o roteamento de instruções do System Prompt substituindo loops por expressões regulares em cache (\`OnceLock<Regex>\`).

---

### Win32 e DXGI Nativo (Fim do PowerShell)

- **Zero PowerShell em Idle**: Eliminamos as consultas periódicas que rodavam \`powershell.exe\` a cada 15 segundos para obter o status do sistema.
- **Win32 Nativo**: A telemetria de CPU/RAM agora usa chamadas in-process diretas para a API do Windows \`GlobalMemoryStatusEx\`, reduzindo o uso de CPU em standby para 0%.
- **VRAM via DXGI**: Mapeamos os dados de consumo de placa de vídeo diretamente via interfaces DirectX (DXGI) e ponteiros COM.
- **Process Management**: A finalização do \`llama-server.exe\` passou a ser tratada nativamente no SO via handles de processo, eliminando engasgos intermitentes na UI.`,
    contentEn: `### Prompt Engine & Context Expansion

- **128k Limit**: Expanded character constraints from 12k to 128k (\`MAX_TOTAL_INSTRUCTION_CHARS\`) and file sizes up to 32k (\`MAX_INSTRUCTION_FILE_CHARS\`) to process large repositories.
- **Async Git Timeout**: Git status queries use async channels (\`mpsc\`) with a 500ms timeout cap, preventing locks when indexing large files.
- **Regex Caching**: Cached system prompt routes via statically compiled regular expressions (\`OnceLock<Regex>\`).

---

### Native Win32 & DXGI (PowerShell Removed)

- **No PowerShell Spawning**: Terminated periodic \`powershell.exe\` runs (previously spawning every 15s) to request memory status.
- **In-Process Win32 Queries**: Telemetry now queries raw Win32 APIs via \`GlobalMemoryStatusEx\`, droping background CPU load to 0%.
- **Direct DXGI Hook**: Graphic memory load is queried via DXGI and COM bindings.
- **Native Process Handles**: Local \`llama-server.exe\` shutdowns use OS process handles directly, eliminating UI micro-stutters.`
  },
  {
    id: "v0.4.7-auditoria-validacao-modelos-locais",
    title: "AetherCore v0.4.7 — Auditoria de Governança e Modelos Locais",
    titleEn: "AetherCore v0.4.7 — Governance Audit & Local Models",
    excerpt: "Revalidação completa do Qwen, GLM local e Granite, além de polimento de caminhos ativos no CONTRIBUTING.md.",
    excerptEn: "Full validation of Qwen, local GLM, and Granite orchestrator, combined with contributing path alignments.",
    version: "v0.4.7",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "02 de Julho de 2026",
    dateEn: "July 2, 2026",
    readTime: "4 min read",
    tags: ["Auditoria", "Modelos Locais", "Ollama", "llama.cpp"],
    content: `### Auditoria de Governança

- **CONTRIBUTING.md**: Alinhamos todas as diretivas e manuais técnicos para apontar para a raiz do workspace \`aethercore/\`, estabelecendo as marcas históricas anteriores como evidências arquivadas.
- **Workspace Flow**: O guia de fluxo de desenvolvimento foi reajustado para descrever a bridge de compilação do frontend Vite para o bundle CEF.
- **Correções Menores**: Removemos dependências não utilizadas no linter do frontend, simplificamos imports no gateway de comandos e limpamos whitespaces para formatação estrita do código-fonte.

---

### Revalidação dos Modelos Locais

Concluímos testes de fumaça reais nas três frentes de IA ativas:
- **Qwen**: \`qwen2.5-coder:3b\` respondeu com sucesso sob a política \`keep_alive=0s\`.
- **GLM Local**: O endpoint respondeu perfeitamente via \`llama.cpp\` CUDA, alocando contexto de 2048 tokens.
- **Aether Orchestrator**: Validamos a inferência do \`granite3.3:8b\` sob o contrato JSON estruturado do Kernel, testando com sucesso a decisão de delegação de turnos (\`delegate_to_qwen\`).`,
    contentEn: `### Governance Auditing

- **CONTRIBUTING.md**: Synced technical contribution guidelines to use workspace root \`aethercore/\` actively, tagging older folders as historical records.
- **Developer Workflows**: Updated workspace flow descriptions to reflect Vite compilation into CEF layouts.
- **Lint and Whitespaces**: Removed dead code from frontend linter setups and cleaned formatting to align with strict rustfmt guidelines.

---

### Local Models Revalidation

Ran end-to-end smoke checks on active LLMs:
- **Qwen**: Verified \`qwen2.5-coder:3b\` runs correctly under \`keep_alive=0s\` settings.
- **GLM Local**: Hooked llama.cpp CUDA endpoints with contextual allocations of 2048 tokens.
- **Aether Orchestrator**: Audited \`granite3.3:8b\` JSON response models under Kernel schemas, executing model delegations (\`delegate_to_qwen\`) successfully.`
  },
  {
    id: "v0.4.5-inicializacao-rapida-granite",
    title: "AetherCore v0.4.5 — Boot Rápido e Otimização do Bundle CEF",
    titleEn: "AetherCore v0.4.5 — Fast Startup & CEF Bundle Optimization",
    excerpt: "Consolidação da v0.4.5: launcher rápido de ambiente local, divisão sob demanda do bundle CEF para 143 KB, e carregamento assíncrono de telemetria de hardware.",
    excerptEn: "Release v0.4.5: fast local launcher script, on-demand CEF bundle split to 143 KB, and asynchronous hardware telemetry loading.",
    version: "v0.4.5",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "29 de Junho de 2026",
    dateEn: "June 29, 2026",
    readTime: "4 min read",
    tags: ["Performance", "Launcher", "CEF", "Bundle"],
    content: `### Aceleração de Inicialização e Otimização do Bundle

Nesta atualização, otimizamos drasticamente a velocidade de inicialização do AetherCore na máquina do usuário:
- **Launcher Rápido (\`AetherCore.bat\`):** Desenvolvemos um inicializador rápido que define variáveis de ambiente portátil e abre a interface sem a obrigatoriedade de cooldown ou encerramento preventivo dos runtimes. Ele agora é auto-relançado de forma invisível em janela oculta do Windows.
- **Launcher de Recuperação (\`AetherCore_Reset.bat\`):** Criado para reset explícito do ambiente. Ele faz o cleanup forçado do Ollama/GLM, aguarda o resfriamento de memória e inicia um fluxo limpo.
- **Divisão do Bundle CEF:** Retiramos chat, visualizadores de Markdown, configurações e o drawer do carregamento inicial. O bundle básico minificado caiu de 207 KB para **143 KB**, permitindo tempos de carregamento instantâneos.
- **Carregamento Assíncrono de Telemetria:** O barramento Rust de telemetria não bloqueia mais a montagem da interface gráfica (\`UiReady\`). As estatísticas de hardware (RAM/VRAM) são fornecidas de forma assíncrona após o bootstrap visual.`,
    contentEn: `### Boot Performance and Bundle Optimization

In this release, we optimized the startup speed of AetherCore on local machines:
- **Fast Launcher (\`AetherCore.bat\`):** Developed a quick launch script that sets portable environment variables and launches the application without mandatory runtime cooldowns, running invisibly as a background process.
- **Recovery Launcher (\`AetherCore_Reset.bat\`):** Built to perform explicit cleanup. It terminates previous Ollama/GLM instances, waits for memory cool-off, and boots clean.
- **Bundle Splitting:** Lazy-loaded chat components, Markdown engines, options menus, and the activities drawer. The base bundle decreased from 207 KB to **143 KB**.
- **Asynchronous Telemetry:** The Rust hardware telemetry handler no longer blocks UI assembly (\`UiReady\`). RAM and VRAM measurements are updated asynchronously after UI paint.`
  },
  {
    id: "v0.4.4-auditoria-sessao-resiliencia-local",
    title: "AetherCore v0.4.4 — Auditoria de Estado de Sessão e Resiliência Local",
    titleEn: "AetherCore v0.4.4 — Session State Auditing & Local Resilience",
    excerpt: "Otimização de integridade conversacional: correção de vazamento lógico de tarefas com session_id, e retry curto para endpoints locais do GLM.",
    excerptEn: "Optimized conversational integrity: fixed cross-session task leaks using session_id, and short retries for local GLM endpoints.",
    version: "v0.4.4",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "28 de Junho de 2026",
    dateEn: "June 28, 2026",
    readTime: "4 min read",
    tags: ["Resiliência", "Auditoria", "GLM", "UX"],
    content: `### Auditoria e Confinamento de Estado Conversacional

Realizamos uma auditoria lógica profunda no fluxo de telemetria e tarefas do agente conversacional:
- **session_id em Tarefas:** O evento de execução \`agent_task\` agora carrega ativamente o \`session_id\` correspondente. A UI foi atualizada para ignorar e descartar atividades, logs e carregamentos de conversas antigas ou turnos já concluídos. Isso elimina o vazamento visual de progresso entre conversas.
- **Controle de Erro da Bridge:** Falhas na ponte de comunicação (como envio de mensagens ou aprovação pendente) agora limpam os loadings visuais e exibem avisos controlados no chat, evitando o congelamento da interface.

---

### Resiliência do Endpoint Local do GLM

- **Retry Curto e Ágil:** O provedor compatível com OpenAI do GLM local deixou de herdar a rotina de retentativas longas utilizada para conexões na nuvem. Agora, em caso de instabilidade do servidor local do GLM, a UI aborta rapidamente a requisição e sinaliza erro, evitando que a tela pareça travada.
- **Limpeza de Microtipografias:** Removemos fontes excessivamente pequenas (9px/10px) das áreas funcionais como titlebar, barra lateral, configurações e prompt dock, melhorando a scannabilidade.`,
    contentEn: `### Session State Confinement & Auditing

We executed a logical audit on the agent task reporting channel:
- **session_id Confinement:** The \`agent_task\` event now maps directly to its corresponding \`session_id\`. The frontend filters out updates, logs, and progress indicators from old sessions, preventing visual task leakages across tabs.
- **Bridge Error Handling:** Communication failures in the bridge (such as prompt submissions or pending approvals) now automatically clear loading states and return clean inline warnings.

---

### Local GLM Endpoint Resilience

- **Short Network Retries:** The local OpenAI-compatible GLM provider now uses a brief retry policy instead of long cloud-based timeout routines, providing rapid feedback if the local server goes offline.
- **UI Typography Cleanups:** Polished small micro-layouts, removing hard-to-read 9px and 10px fonts from the titlebar, sidebar, settings, and dock.`
  },
  {
    id: "v0.4.3-alinhamento-ferramentas-ui-runtime",
    title: "AetherCore v0.4.3 — Alinhamento de Ferramentas e UI de Runtime",
    titleEn: "AetherCore v0.4.3 — Tooling Alignment & Runtime UI",
    excerpt: "Centralização da allowlist de 25 ferramentas do Kernel Rust no CEF, logs JavaScript do host em arquivos físicos e melhorias em Configurações.",
    excerptEn: "Centralized the allowlist of 25 Rust Kernel tools in the CEF layer, routed host JavaScript console logs to files, and cleaned up options.",
    version: "v0.4.3",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "27 de Junho de 2026",
    dateEn: "June 27, 2026",
    readTime: "4 min read",
    tags: ["Segurança", "CEF", "Allowlist", "Runtime"],
    content: `### Centralização da Allowlist de Ferramentas

Eliminamos a dispersão das diretivas de ferramentas no projeto unificando a allowlist de execução diretamente no Kernel Rust em \`rust/crates/aethercore-cef/src/backend/tool_catalog.rs\`:
- **Fonte Única:** As 25 ferramentas expostas ao desktop (leitura, escrita, shell, Excel, etc.) seguem o mesmo catálogo consumido pelo executor e pela camada de turnos do CEF.
- **Segurança e PermissionMode:** Corrigimos o tratamento de \`PermissionMode::Prompt\` no runtime. Agora, qualquer chamada de ferramenta bloqueante exige a aprovação do usuário ativamente, não passando mais pela ordenação implícita dos enums de privilégio.

---

### Logs de Host e Interface Humana

- **Rastreabilidade de Telas Pretas:** Implementamos no CEF o registro de logs do console JavaScript e eventos de carregamento do frame principal em arquivos locais (\`host-trace.log\`), permitindo diagnosticar travamentos na inicialização.
- **UI Humana de Runtime:** A aba de configurações de runtime substituiu a grade técnica de chips por grupos descritivos com nomes comuns, escopo de permissão e descrições claras para o usuário final.`,
    contentEn: `### Centralized Tool Allowlist

We centralized desktop tool permissions inside the Rust Kernel at \`rust/crates/aethercore-cef/src/backend/tool_catalog.rs\`:
- **Single Source of Truth:** All 25 allowed desktop tools share a unified catalog referenced by the CEF controller and task runner.
- **PermissionMode Correction:** Fixed the runtime handling of \`PermissionMode::Prompt\` to guarantee prompt requests are presented to the user before running, bypassing default enum precedence logic.

---

### Host Trace Logging & Clean Config UI

- **White Screen Diagnostics:** Configured the CEF load handler to record console outputs and frame loading states to physical log files (\`host-trace.log\`).
- **Human-Friendly Runtime UI:** Swapped out the crowded chip grid in the Runtime settings tab for simple, human-readable groups mapping tools to their safety descriptions.`
  },
  {
    id: "v0.4.2-ibm-granite-aether-orchestrator",
    title: "AetherCore v0.4.2 — IBM Granite como Aether Orchestrator",
    titleEn: "AetherCore v0.4.2 — IBM Granite as Aether Orchestrator",
    excerpt: "Integração do granite3.3:8b via Ollama local para tomada de decisão estruturada em JSON e delegação inteligente de sub-tarefas.",
    excerptEn: "Integrated granite3.3:8b via local Ollama for structured JSON decisions and smart model delegation.",
    version: "v0.4.2",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "26 de Junho de 2026",
    dateEn: "June 26, 2026",
    readTime: "4 min read",
    tags: ["Orquestrador", "Granite", "Ollama", "JSON"],
    content: `### Roteamento e Planejamento por IBM Granite

Introduzimos o modelo **IBM Granite 3.3 8B** (\`granite3.3:8b\`) no papel de **Aether Orchestrator** local-first:
- **Contrato Estruturado:** O Kernel Rust orquestra o Granite exigindo respostas exclusivamente estruturadas em formato JSON contendo decisões estritas (como \`delegate_to_qwen\`, \`delegate_to_glm\`, \`create_plan\`, \`ask_user\` e \`propose_tool_call\`).
- **Delegador Sequencial:** O Granite avalia a intenção e delega a inferência técnica. O Qwen2.5 Coder 3B é acionado para códigos e escrita, enquanto o GLM-4 9B é reservado para raciocínio denso local.
- **Seletor Dedicado:** O seletor superior de modelos agora diferencia o Aether Orchestrator dos demais modelos de inferência simples.

---

### Setup de Cache e Download de GGUF

- **Robustez no Pull:** O download inicial do Granite falhou por indisponibilidade de DNS nos servidores de blobs do Ollama/Cloudflare. Adicionamos suporte de fallback para puxar os pesos GGUF diretamente da Hugging Face (\`hf.co/ibm-granite/granite-3.3-8b-instruct-GGUF:Q4_K_M\`), permitindo a gravação bem-sucedida do manifesto local.`,
    contentEn: `### Structured Planning via IBM Granite

Integrated the **IBM Granite 3.3 8B** (\`granite3.3:8b\`) model as the local **Aether Orchestrator**:
- **Structured Decisions:** Granite returns strict JSON contracts containing choices (\`delegate_to_qwen\`, \`delegate_to_glm\`, \`create_plan\`, \`propose_tool_call\`, etc.) parsed directly by the Rust Kernel.
- **Model Delegation:** Granite manages task routing, assigning coding to Qwen2.5 Coder 3B and deep logical analysis to GLM-4 9B.
- **Ollama GGUF Fallbacks:** Added registry retries to pull the Q4_K_M GGUF model files directly from Hugging Face if Ollama's Cloudflare DNS times out.`
  },
  {
    id: "v0.4.1-aether-runtime-kernel-validacao-rust",
    title: "AetherCore v0.4.1 — Aether Runtime Kernel e Validação Rust",
    titleEn: "AetherCore v0.4.1 — Aether Runtime Kernel & Rust Validation",
    excerpt: "Formalização da camada Rust de baixo nível como Aether Runtime Kernel, e passagem limpa em mais de 750 testes de unidade do workspace.",
    excerptEn: "Formalized the low-level Rust execution layer as the Aether Kernel, passing over 750 unit tests.",
    version: "v0.4.1",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "25 de Junho de 2026",
    dateEn: "June 25, 2026",
    readTime: "4 min read",
    tags: ["Rust", "Kernel", "Testes", "Performance"],
    content: `### Formalização do Aether Runtime Kernel

Adotamos formalmente a nomenclatura **Aether Runtime Kernel** para a camada de execução local desenvolvida em Rust. Esse kernel centraliza o ciclo de vida do Ollama/GLM, o roteamento de sessões locais, a verificação ARL de ferramentas e o isolamento de sandboxes corporativas.

---

### Bateria de Testes e Otimização do GLM

- **750+ Testes Aprovados:** Validamos a integridade do Kernel rodando testes completos de workspace (crates \`api\`, \`tools\`, \`runtime\`, \`aethercore-cef\` e \`aether-agentic\`), assegurando formatação e checagens 100% livres de falhas.
- **Otimização de RAM do GLM:** Calibramos o runtime do GLM-4-9B-Chat IQ3_M servido por \`llama-server.exe\` usando as flags \`--no-mmap\` e \`--cache-ram 0\`. Isso reduziu o custo de RAM de ~4.4 GiB para **~0.64 GiB**, concentrando o processamento em VRAM e liberando memória do sistema.`,
    contentEn: `### Aether Runtime Kernel Naming

Officially designated the low-level Rust execution engine as the **Aether Runtime Kernel**, separating core sandbox logic from UI and AI models.

---

### Unit Test Suite & GLM RAM Tuning

- **750+ Test Passes:** Successfully ran the workspace check and test suites across \`api\`, \`tools\`, \`runtime\`, and \`aether-agentic\` packages.
- **GLM memory footprint reduction:** Configured the GLM-4-9B-Chat IQ3_M GGUF runner with \`--no-mmap\` and \`--cache-ram 0\` flags. Working set RAM dropped from ~4.4 GiB to **~0.64 GiB**, preserving local OS performance.`
  },
  {
    id: "v0.4.0-demo-local-sob-demanda",
    title: "AetherCore v0.4.0 — Demo Local e Inicialização Sob Demanda",
    titleEn: "AetherCore v0.4.0 — Local Demo & On-Demand Inference",
    excerpt: "Consolidação da v0.4.0: carregamento do modelo Qwen sob demanda, otimizações de performance do runtime CEF e interface 100% polida em PT-BR para demonstração.",
    excerptEn: "Release v0.4.0: dynamic on-demand Qwen model loading, CEF runtime performance tuning, and fully polished PT-BR interface for local demos.",
    version: "v0.4.0",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "17 de Junho de 2026",
    dateEn: "June 17, 2026",
    readTime: "4 min read",
    tags: ["IA Local", "Qwen", "Performance", "CEF"],
    content: `### Inicialização Sob Demanda (Lazy Loading) do Motor Local
    
Para tornar a inicialização do AetherCore extremamente leve, eliminamos o carregamento automático de modelos e do daemon do Ollama na abertura da interface gráfica CEF (Chromium Embedded Framework). 

O motor de inferência local e o modelo \`qwen2.5-coder:3b\` passam a inicializar **sob demanda**, ou seja, apenas no momento em que a primeira interação ou tarefa real do usuário exigir inferência de inteligência artificial.

- **Consumo de Memória Zerado**: Em estado de espera (idle), o consumo de RAM fica limitado unicamente ao custo do shell CEF, eliminando o bloqueio preventivo de memória VRAM/RAM antes do uso.
- **keep_alive=0s**: O provedor do Ollama local passa a utilizar a opção de descarregamento imediato do modelo da GPU após o encerramento do processamento, evitando que a IA resida na memória após a conclusão da tarefa.

---

### Integração de Tool Calling com o Qwen

Consolidamos o suporte nativo a chamadas de ferramentas (*tool use*) no modelo local Qwen:
- **Tradução Automática**: O provider do Ollama local intercepta respostas em texto estruturado emitidas pelo Qwen e as converte automaticamente em chamadas nativas do runtime Rust.
- **allowlist de Ferramentas**: As chamadas de ferramentas catalogadas (como leitura/escrita de planilhas e manipulação local) são validadas de acordo com a política de segurança e exigem aprovação humana explícita (*Human-in-the-loop*).

---

### Polimento de Interface para a Demonstração Local

Revisamos e localizamos toda a experiência do aplicativo para a versão de demonstração (Demo local):
- **Tradução PT-BR Completa**: Placeholders de entrada, feedbacks de prompts, estados de atividade do agente e mensagens de erro foram traduzidos para português, garantindo consistência com o Pitch do Programa Centelha Paraná.
- **Conectividade Dinâmica**: O frontend está integrado com o barramento do backend Rust para monitorar atividades de tarefas em tempo real (\`agent_task\`), histórico de sessões e status de sandboxes.
- **Novos Componentes Premium**: Substituímos o cabeçalho de navegação estático pelas Abas Expansivas (Expandable Tabs) integradas com rotas dinâmicas, e incluímos o FAQ Pro com filtragem de pesquisa em tempo real.
- **Fundo Aurora Acelerado (GPU)**: O novo fundo aurora animado foi otimizado para executar translações e rotações via GPU (\`transform: translate3d(...) rotate(...)\`) em vez de repaints de tela (\`background-position\`), garantindo rolagem de página estável a 60fps/120fps.`,
    contentEn: `### On-Demand Inference & Lazy Loading
    
To make the startup of AetherCore lightweight, we removed the automatic loading of models and the Ollama daemon on window initialization. 

The local inference engine and the \`qwen2.5-coder:3b\` model now boot **on demand**, starting exclusively when the user's first prompt or task requires local intelligence.

- **Zero Memory Idle Cost**: During idle states, RAM usage is strictly confined to the CEF (Chromium Embedded Framework) renderer, preventing VRAM/RAM lockups before execution.
- **keep_alive=0s**: The local Ollama provider now uses a default keep-alive of 0 seconds, immediately offloading the model from GPU memory after inference finishes.

---

### Native Qwen Tool Calling Integration

We consolidated native support for tool usage inside the local Qwen model:
- **Automatic Translation**: The Ollama provider intercepts structured text answers from Qwen and automatically converts them into Rust-native tool calls.
- **Tool Allowlist & Policies**: Cataloged tool calls (e.g., local XLSX reads/writes) are strictly validated against security rules and blocked until granted human permission (*Human-in-the-loop*).

---

### Interface Polishing & GPU-Optimized UI

We polished the entire interface copy to present a cohesive localized demonstration flow:
- **Full PT-BR Translation**: Placeholders, prompt feedback, agent activity status, and error logs were localized to Portuguese, aligning with the Centelha Paraná program guidelines.
- **Dynamic Connection**: The frontend consumes real-time task events (\`agent_task\`), sessions history, and active workspace confinement status directly from the Rust backend.
- **Modern Premium UI components**: Integrated the Victor Welander Expandable Tabs navigation header synced with active routes, and Edwin Vakayil's search-enabled FAQ Pro accordion page.
- **GPU-Accelerated Aurora Background**: Optimized the animated aurora gradient to perform translate/rotate transitions directly on the GPU composite layer using native CSS keyframe rules, avoiding repaint-heavy background-position shifts or fixed attachments to ensure buttery-smooth scrolling.`
  },
  {
    id: "frontend-dinamico-design-system",
    title: "Frontend Dinâmico e Novo Design System do AetherCore",
    titleEn: "Dynamic Frontend and New AetherCore Design System",
    excerpt: "Adaptação do novo frontend em CEF para representar sessões, documentos, ARL, atividades reais, permissões e estado do runtime Rust.",
    excerptEn: "Adapted the new CEF frontend to represent sessions, documents, ARL, live activities, permissions, and Rust runtime state.",
    version: "v0.3.9",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "30 de Maio de 2026",
    dateEn: "May 30, 2026",
    readTime: "4 min read",
    tags: ["Frontend", "CEF", "UX", "Rust"],
    content: `### Novo Frontend Conectado ao Runtime Real

O template visual em \`C:\\Users\\Xgm\\Desktop\\app\` foi adaptado para se tornar a nova face do AetherCore dentro do runtime CEF. A mudança não foi apenas estética: a interface passou a representar estados reais do produto.

- **Sessões e Documentos**: A sidebar e o shell passam a refletir conversas, documentos e contexto de workspace.
- **Atividades Reais**: O drawer de atividades consome eventos do backend, incluindo \`agent_task\`, em vez de exibir uma timeline fixa.
- **Permissões e ARL**: A interface expõe acesso completo, aprovações humanas, auditoria ARL e estados de runtime de forma mais clara.

---

### Design System Mais Adequado ao Produto

O novo visual mantém o posicionamento premium, mas com linguagem mais operacional: menos tela conceitual e mais produto utilizável. O app passou a comunicar melhor o fluxo local-first, o modelo Qwen, o runtime Rust e as ferramentas disponíveis.`,
    contentEn: `### New Frontend Connected to the Real Runtime

The visual template in \`C:\\Users\\Xgm\\Desktop\\app\` was adapted to become the new AetherCore interface inside the CEF runtime. This was not just a visual change: the interface now represents actual product state.

- **Sessions and Documents**: The sidebar and shell reflect conversations, documents, and workspace context.
- **Live Activities**: The activity drawer consumes backend events, including \`agent_task\`, instead of showing a static timeline.
- **Permissions and ARL**: Full access, human approvals, ARL auditing, and runtime state are now surfaced clearly.

---

### Product-Aligned Design System

The new interface keeps the premium direction while becoming more operational: less concept screen, more usable product. It better communicates the local-first flow, Qwen model, Rust runtime, and available tools.`
  },
  {
    id: "qwen-tool-use-runtime-rust",
    title: "Qwen com Tool Use e Runtime Rust Permission-Aware",
    titleEn: "Qwen Tool Use with Permission-Aware Rust Runtime",
    excerpt: "O provider Ollama agora transforma JSON textual emitido pelo Qwen em chamadas ToolUse quando a ferramenta existe na lista permitida.",
    excerptEn: "The Ollama provider now translates textual JSON emitted by Qwen into ToolUse calls when the tool is present in the allowed list.",
    version: "v0.3.8",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "08 de Maio de 2026",
    dateEn: "May 8, 2026",
    readTime: "4 min read",
    tags: ["Qwen", "Ferramentas", "Rust", "Segurança"],
    content: `### Tool Use Local no Qwen

O AetherCore passou a reconhecer quando o modelo local Qwen emite uma intenção estruturada de ferramenta em JSON textual. Quando a ferramenta existe na lista permitida da requisição, o provider Ollama converte essa saída em uma chamada nativa \`ToolUse\`.

- **Conversão Controlada**: O modelo pode propor uma ação, mas o runtime Rust decide se a chamada é válida.
- **Allowlist de Ferramentas**: Apenas ferramentas presentes na requisição podem ser encaminhadas.
- **Política Antes da Execução**: O runtime aplica permissões e aprovações antes de qualquer efeito colateral.

---

### Ponte Mais Clara Entre IA e Ferramentas

Essa etapa aproxima o AetherCore da ideia central do produto: modelos locais, como o Qwen, podem usar ferramentas reais do workspace quando necessário, mas sem ultrapassar a camada de governança e revisão humana.`,
    contentEn: `### Local Tool Use in Qwen

AetherCore can now recognize when the local Qwen model emits a structured tool intent as textual JSON. When the tool exists in the request allowlist, the Ollama provider converts that output into a native \`ToolUse\` call.

- **Controlled Conversion**: The model can propose an action, but the Rust runtime decides whether the call is valid.
- **Tool Allowlist**: Only tools present in the request can be forwarded.
- **Policy Before Execution**: Permissions and approvals are applied before any side effect.

---

### Clearer Bridge Between AI and Tools

This step brings AetherCore closer to the core product idea: local models such as Qwen can use real workspace tools when needed, while still going through governance and human review.`
  },
  {
    id: "qwen-checkpoints-ferramentas-dinamicas",
    title: "Checkpoints Dinâmicos e Registro Único de Ferramentas",
    titleEn: "Dynamic Checkpoints and Unified Tool Registry",
    excerpt: "O Qwen pode conduzir perguntas específicas por tarefa, enquanto as ferramentas desktop ficam organizadas em um único registro Rust.",
    excerptEn: "Qwen can drive task-specific questions while desktop tools remain organized in a unified Rust registry.",
    version: "v0.3.7",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "15 de Abril de 2026",
    dateEn: "April 15, 2026",
    readTime: "3 min read",
    tags: ["Qwen", "Checkpoints", "Ferramentas"],
    content: `### Checkpoints Guiados Pela Tarefa

O painel inicial do AetherCore continua reservado para saudações simples e início de fluxo. Fora desse contexto, os checkpoints passam a ser orientados pela necessidade real da tarefa.

- **Perguntas Específicas**: O Qwen deve perguntar quando houver ambiguidade, em vez de supor ou repetir um hub fixo.
- **Checkboxes Semânticos**: As opções devem nascer do contexto da conversa e da decisão que precisa ser tomada.
- **Fluxo Menos Travado**: O usuário recebe escolhas úteis apenas quando elas realmente ajudam a avançar.

---

### Registro Único de Ferramentas

As ferramentas expostas ao desktop ficam centralizadas em \`rust/crates/tools/src/lib.rs\`, incluindo leitura/escrita de arquivos, busca, shell, PowerShell, browser, Excel, skills, agentes, configuração e tarefas auxiliares.`,
    contentEn: `### Task-Guided Checkpoints

The AetherCore initial panel remains reserved for simple greetings and flow start. Outside that context, checkpoints are driven by the actual needs of the task.

- **Specific Questions**: Qwen should ask when ambiguity exists instead of assuming or repeating a fixed hub.
- **Semantic Checkboxes**: Options should come from the conversation context and the decision that needs to be made.
- **Less Rigid Flow**: Users get useful choices only when they actually help move forward.

---

### Unified Tool Registry

Desktop tools are centralized in \`rust/crates/tools/src/lib.rs\`, including file operations, search, shell, PowerShell, browser, Excel, skills, agents, config, and auxiliary tasks.`
  },
  {
    id: "limpeza-modelos-foco-qwen",
    title: "Limpeza de Modelos e Foco Exclusivo no Qwen Local",
    titleEn: "Model Cleanup and Qwen-Only Local Focus",
    excerpt: "Modelos maiores foram retirados do fluxo ativo por consumo excessivo de RAM; o desktop passa a expor apenas qwen2.5-coder:3b.",
    excerptEn: "Larger models were removed from the active flow due to excessive RAM use; the desktop now exposes only qwen2.5-coder:3b.",
    version: "v0.3.6",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "20 de Março de 2026",
    dateEn: "March 20, 2026",
    readTime: "3 min read",
    tags: ["IA Local", "Qwen", "Ollama", "Performance"],
    content: `### Menos Modelos, Mais Estabilidade

Após testes práticos, modelos maiores foram retirados da seleção ativa por consumo excessivo de RAM e impacto direto na fluidez da máquina. O AetherCore desktop passa a operar com foco no \`qwen2.5-coder:3b\`.

- **Fonte Local Validada**: O diretório de modelos ativo é \`aethercore/models/\`.
- **Lista Mais Segura**: O seletor evita oferecer modelos que degradam a experiência local.
- **Qwen como Base Principal**: O modelo segue adequado para código, respostas curtas e tarefas estruturadas do workspace.

---

### Preparado Para Expansão Posterior

A limpeza não remove a possibilidade de novos modelos no futuro. Ela apenas congela o caminho atual em uma configuração mais leve, previsível e demonstrável.`,
    contentEn: `### Fewer Models, More Stability

After practical tests, larger models were removed from the active selection because of excessive RAM usage and direct impact on system responsiveness. AetherCore desktop now focuses on \`qwen2.5-coder:3b\`.

- **Validated Local Source**: The active model directory is \`aethercore/models/\`.
- **Safer Model List**: The selector avoids offering models that degrade the local experience.
- **Qwen as Main Base**: The model remains suitable for coding, short answers, and structured workspace tasks.

---

### Ready for Later Expansion

This cleanup does not block future models. It simply freezes the current path into a lighter, more predictable, demo-ready configuration.`
  },
  {
    id: "telegram-teclado-interativo",
    title: "Teclado Interativo no Gateway Telegram",
    titleEn: "Interactive Keyboard in the Telegram Gateway",
    excerpt: "O gateway Telegram ganhou menu operacional para seleção de modelo local, status e ações administrativas sem depender apenas de comandos digitados.",
    excerptEn: "The Telegram gateway gained an operational menu for local model selection, status, and administrative actions without relying only on typed commands.",
    version: "v0.3.5",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "28 de Fevereiro de 2026",
    dateEn: "February 28, 2026",
    readTime: "3 min read",
    tags: ["Telegram", "Gateway", "UX"],
    content: `### Operação Mais Clara Pelo Telegram

O gateway Telegram do AetherCore recebeu um teclado interativo para reduzir fricção operacional. Em vez de depender apenas da memorização de comandos, o usuário pode acionar opções administrativas e de modelo por botões.

- **Seleção de Modelo Local**: Atalho para escolher o modo local com Qwen.
- **Status e Menu**: Comandos como \`/menu\` passam a expor opções guiadas.
- **Segurança Mantida**: O gateway continua limitado por allowlist e long polling, preservando a separação entre chat remoto e ferramentas locais.

---

### Complemento ao Desktop

Essa rodada não substitui a interface principal do AetherCore. Ela melhora o canal auxiliar de operação e mantém a superfície Telegram como uma extensão controlada do ecossistema.`,
    contentEn: `### Clearer Telegram Operations

The AetherCore Telegram gateway received an interactive keyboard to reduce operational friction. Instead of relying only on memorized commands, the user can trigger model and admin options through buttons.

- **Local Model Selection**: Shortcut to choose the local Qwen mode.
- **Status and Menu**: Commands such as \`/menu\` expose guided options.
- **Security Preserved**: The gateway remains bound by allowlists and long polling, preserving the separation between remote chat and local tools.

---

### Desktop Companion

This release does not replace the main AetherCore interface. It improves the auxiliary operation channel while keeping Telegram as a controlled extension of the ecosystem.`
  },
  {
    id: "qwen-local-vram-checkbox-agente",
    title: "Qwen Local em VRAM e Correção de Checkbox do Agente",
    titleEn: "Local Qwen in VRAM & Agent Checkbox Fix",
    excerpt: "Ajuste do modo local em VRAM com qwen2.5-coder:3b, melhorias no proxy Ollama e restauração do menu inicial interativo.",
    excerptEn: "Optimized VRAM execution with qwen2.5-coder:3b, Ollama proxy enhancements, and restoration of the interactive home menu.",
    version: "v0.3.2",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "05 de Fevereiro de 2026",
    dateEn: "February 5, 2026",
    readTime: "4 min read",
    tags: ["IA Local", "Qwen", "UX"],
    content: `### Ajuste do Modo Local em VRAM

Ajustamos as configurações do modo local do AetherCore após validação real com o modelo \`qwen2.5-coder:3b\` rodando em placas aceleradas (NVIDIA GeForce GTX 1070). O modelo local Qwen agora é o padrão do Cofre Aether Local, proporcionando maior precisão e estabilidade em tarefas de programação e processamento estruturado.

---

### Correções e Melhorias na Interface

Trabalhamos em pontos críticos observados no comportamento da interface gráfica:
- **Think Limitado**: O provedor do Ollama agora envia a instrução \`think: true\` exclusivamente para os modelos da família Gemma, que suportam formalmente o raciocínio encadeado. Isso resolveu rejeições de requisições (\`Erro 400\`) observadas no modelo Qwen local.
- **Tratamento de Perguntas e Checkbox**: Removemos diretivas que forçavam caixas de seleção vazias ou placeholders no primeiro turno, substituindo loops genéricos de erro por mensagens naturais de fallback.
- **Transparência de Erro**: O proxy \`AetherProxy.ps1\` foi aprimorado para preservar o status HTTP real do Ollama, evitando mascarar problemas específicos sob o status de erro \`500\` genérico.

---

### Hub Inicial Determinístico e Limpeza

Restauramos e garantimos a integridade do menu inicial de foco ("hubzinho") de forma determinística no primeiro turno de interação. Se o modelo local omitir o payload estruturado de perguntas, o próprio backend o injeta no CEF. Além disso, incluímos tarefas automáticas de limpeza física de caches de runtime do CEF, WebView2 e dados obsoletos de observabilidade.`,
    contentEn: `### Local VRAM Mode Tuning

We adjusted the AetherCore local execution parameters after real-world validation with the \`qwen2.5-coder:3b\` model running on hardware acceleration (NVIDIA GeForce GTX 1070). The local Qwen model is now the default for Aether's Local Vault, providing greater precision and stability in programming and structured processing tasks.

---

### UI Corrections and Enhancements

We resolved critical bugs identified in the graphical user interface behavior:
- **Restricted Think Option**: The Ollama provider now sends the \`think: true\` instruction exclusively to the Gemma model family, which formally supports chain-of-thought reasoning. This fixed client-side request rejections (\`Error 400\`) previously observed on the local Qwen model.
- **Question Handling and Checkbox**: Removed directives that forced empty checkboxes or placeholders on the first turn, replacing generic error loops with natural fallback responses.
- **Error Transparency**: The \`AetherProxy.ps1\` script was updated to preserve Ollama's native HTTP status codes, preventing masking specific errors behind a generic \`500\` code.

---

### Deterministic Home Hub and Cleanup

We restored and guaranteed the integrity of the interactive home menu ("hub") deterministically during the first interaction turn. If the local model omits the structured questions payload, the backend automatically injects it into the CEF frame. In addition, we scheduled automatic cleanup tasks for CEF/WebView2 runtime caches and obsolete observability metrics.`
  },
  {
    id: "compilacao-nativa-auto-bootstrap",
    title: "Compilação Nativa e Auto-Bootstrap (Detached Launcher)",
    titleEn: "Native Compilation & Auto-Bootstrap (Detached Launcher)",
    excerpt: "Setup final da compilação de produção MSVC, eliminação do proxy interceptador em background e redirecionamento automático inteligente.",
    excerptEn: "Final MSVC production build configuration, removal of the background proxy interceptor, and smart automatic launcher redirect.",
    version: "v0.3.1",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "10 de Janeiro de 2026",
    dateEn: "January 10, 2026",
    readTime: "3 min read",
    tags: ["Compilação", "Rust", "Bootstrap"],
    content: `### Compilação de Produção Release Nativa

Após consolidar a cadeia MSVC no ambiente de desenvolvimento, executamos a compilação nativa em modo \`release\` do núcleo em Rust do AetherCore. Isso nos permitiu embutir a aceleração por hardware por meio da constante \`DEFAULT_OLLAMA_OPTIONS\` com alocação máxima de GPU (\`num_gpu: 99\`) de forma embutida, removendo inteiramente a dependência do proxy transparente em background.

---

### Fluxo de Auto-Bootstrap

Ao rodar a distribuição isolada fora do launcher de scripts portátil, o WebView2/CEF carecia de variáveis cruciais de ambiente, impedindo o boot adequado do Ollama. Introduzimos o mecanismo de **Auto-Bootstrap**:
1. **Verificação de Flag**: O binário nativo checa se foi invocado com a variável \`AETHERCORE_LAUNCHED_BY_BAT\`.
2. **Redirecionamento Inteligente**: Se a variável não estiver ativa, o executável varre a árvore física e invoca o script \`AetherCore.bat\` mestre na raiz do projeto em um console CMD próprio, encerrando a si mesmo em seguida.
3. **Carga Segura**: O script mestre faz a limpeza de processos órfãos, inicializa o motor de inferência em VRAM e relança o executável portando todas as variáveis necessárias.

Isso previne drift em atualizações futuras e preserva total manutenibilidade via scripts batch simples na raiz do projeto.`,
    contentEn: `### Release Build and Native Compilation

After consolidating the MSVC toolchain in our development environment, we executed a native compilation in \`release\` mode for AetherCore's Rust core. This allowed us to hardcode hardware acceleration via the \`DEFAULT_OLLAMA_OPTIONS\` constant with maximum GPU allocation (\`num_gpu: 99\`), completely removing the background transparent proxy dependency.

---

### Auto-Bootstrap Workflow

When running the isolated binary outside the portable launcher scripts, WebView2/CEF lacked critical environment variables, preventing Ollama from starting correctly. We introduced an **Auto-Bootstrap** mechanism:
1. **Flag Check**: The native binary checks if it was invoked with the \`AETHERCORE_LAUNCHED_BY_BAT\` variable.
2. **Smart Redirect**: If the variable is missing, the executable scans the physical path, launches the master \`AetherCore.bat\` script inside a CMD window, and exits immediately.
3. **Safe Initialization**: The master script terminates orphan processes, initializes the GPU/VRAM inference engine, and re-launches the binary containing all required variables.

This workflow prevents configuration drift in future releases and maintains full script flexibility on Windows.`
  },
  {
    id: "garantia-vram-proxy-local",
    title: "Garantia de Uso de VRAM Local via Proxy Transparente",
    titleEn: "Guaranteed Local VRAM Allocation via Transparent Proxy",
    excerpt: "Criação de proxy PowerShell para reescrever payloads de rede do Ollama, liberando RAM do computador do usuário.",
    excerptEn: "Custom PowerShell proxy to rewrite Ollama network payloads, offloading system RAM to dedicated GPU memory.",
    version: "v0.3.0-beta",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "18 de Dezembro de 2025",
    dateEn: "December 18, 2025",
    readTime: "3 min read",
    tags: ["Ollama", "VRAM", "PowerShell"],
    content: `### O Problema do Carregamento em RAM

Identificamos que o executável pré-compilado do AetherCore ignorava as configurações de GPU e passava a opção \`\"num_gpu\": 0\` no corpo das requisições direcionadas ao Ollama local. Esse comportamento forçava o modelo Gemma de 4B a se alocar por completo na memória RAM do computador, esgotando os 8GB disponíveis do usuário e degradando o desempenho do sistema. Sem o compilador Rust no PATH, a alteração do backend exigia uma alternativa criativa.

---

### Solução via Proxy Transparente em PowerShell

Para contornar o problema, desenvolvemos um proxy local transparente (\`AetherProxy.ps1\`) rodando oculto no Windows:
- **Intercepção Dinâmica**: O proxy escuta na porta tradicional do Ollama (\`11434\`), intercepta as chamadas de chat e reescreve o JSON injetando a opção \`\"num_gpu\": 99\`.
- **Roteamento Interno**: As chamadas limpas e modificadas são repassadas ao executável real do Ollama escutando na porta interna (\`11435\`), recalculando o tamanho dos cabeçalhos HTTP.
- **Ciclo de Vida Integrado**: O script fecha a si mesmo e limpa processos do daemon após o encerramento do processo visual principal do aplicativo.

Graças a isso, a inferência foi acelerada em mais de 10x rodando diretamente na VRAM dedicada da NVIDIA GTX 1070.`,
    contentEn: `### The RAM Allocation Issue

We identified that the pre-compiled AetherCore binary was ignoring GPU configurations and passing \`\"num_gpu\": 0\` in Ollama API requests. This forced the local Gemma 4B model to allocate entirely on system RAM, exhausting the user's available 8GB of memory and severely slowing down the OS. Without a local Rust compiler, editing the backend required a creative bypass.

---

### Solution via Transparent PowerShell Proxy

To bypass the constraint, we developed a local transparent proxy (\`AetherProxy.ps1\`) running hidden on Windows:
- **Dynamic Interception**: The proxy listens on the standard Ollama port (\`11434\`), intercepts incoming chat calls, and rewrites the JSON payload to inject \`\"num_gpu\": 99\`.
- **Internal Routing**: Cleaned requests are routed to the real Ollama daemon listening on an internal port (\`11435\`), dynamically adjusting HTTP Content-Length headers.
- **Integrated Lifecycle**: The script automatically terminates itself and cleans up Ollama daemons when the main GUI process is closed.

This optimization accelerated local inference speed by over 10x by running entirely within the NVIDIA GTX 1070 VRAM.`
  },
  {
    id: "ollama-autokill-design-upgrade",
    title: "Ollama Auto-Kill & Design System Upgrade v3",
    titleEn: "Ollama Auto-Kill & Design System Upgrade v3",
    excerpt: "Novo Design System Obsidiana/Areia v3, gerenciamento inteligente do motor de IA local e painel de status em tempo real.",
    excerptEn: "New Obsidian/Sand Design System v3, intelligent local AI process lifecycle management, and real-time status monitor.",
    version: "v0.3.0",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "28 de Novembro de 2025",
    dateEn: "November 28, 2025",
    readTime: "4 min read",
    tags: ["Design System", "Ollama", "DevOps"],
    content: `### Gerenciamento Inteligente do Motor Local

O AetherCore agora gerencia as instâncias locais do Ollama em segundo plano de forma totalmente transparente e automatizada, evitando conflitos de recursos ou portas de rede ocupadas:
- **Resolução de Conflitos**: O launcher nativo monitora portas ativas e gerencia processos órfãos na memória para garantir que a inferência responda sem interrupções.
- **Boot Dinâmico**: Caso a API local responda sem o modelo padrão ativo, o motor nativo encerra instâncias instáveis, aguarda a liberação de recursos do sistema e inicializa o motor de IA local a partir do diretório portátil configurado.
- **Flexibilidade**: Suporta a configuração dinâmica de motores de IA externos caso o usuário prefira manter um daemon global rodando no sistema.

---

### Design System Upgrade v3 (Areia / Obsidiana)

Uma reformulação estética e visual completa foi aplicada para criar uma interface luxuosa, moderna e de alto desempenho:
- **Tema Areia (Claro)**: Fundo acolhedor, textura tátil que imita papel físico e tipografia escura elegante.
- **Tema Obsidiana (Escuro)**: Tom escuro orgânico com glows âmbar discretos e confortáveis.
- **Textura de Grão Analógica**: Renderizada nativamente por meio de filtro digital inline de alta performance, eliminando requisições extras de rede.
- **Tipografia Editorial**: Fontes display modernas para títulos expressivos, fontes de UI legíveis e monospace técnica para blocos de código.

---

### Interceptador Dinâmico de Status

A consulta de status operacional foi otimizada para ser imediata e integrada:
1. **Verificação Instantânea**: Resposta em tempo real do estado de confinamento (Modo Seguro de Leitura vs Acesso Completo).
2. **Personalização Dinâmica**: Exibição fluida das preferências e nome do usuário ativo.
3. **Persistência Segura**: Gravação estruturada diretamente no banco local do workspace, sem vazamento de logs conversacionais.`,
    contentEn: `### Intelligent Local Engine Management

AetherCore now manages local Ollama instances in the background in a fully transparent and automated way, preventing resource conflicts or port blockages:
- **Conflict Resolution**: The native launcher monitors active ports and terminates orphan processes to ensure inference answers without interruption.
- **Dynamic Boot**: If the local API responds without the default model loaded, the native engine terminates unstable instances, waits for system resource release, and initializes the local AI engine from the configured portable directory.
- **Flexibility**: Supports dynamic external AI API endpoints if the user prefers running a global system daemon.

---

### Design System Upgrade v3 (Sand / Obsidian)

A complete aesthetic overhaul was applied to create a luxury, high-performance visual experience:
- **Sand Theme (Light)**: Warm background with tactile paper textures and dark elegant typography.
- **Obsidian Theme (Dark)**: Organic dark grey tones paired with comfortable, amber-copper glows.
- **Analog Grain Overlay**: Natively rendered using high-performance CSS filters, removing extra web request overhead.
- **Editorial Typography**: Modern display fonts for expressive headlines, legible UI fonts, and technical monospace block styling.

---

### Dynamic Status Interceptor

Status queries are now instantaneous and deeply integrated:
- **Instant Check**: Real-time visualization of sandboxing levels (Safe Read-Only vs Full Access).
- **Customization**: Fluid display of active user preferences and username.
- **Secure Persistence**: Structured logs are written directly to the local workspace SQLite DB, ensuring zero leak of conversational records.`
  },
  {
    id: "sandbox-workspaces-portabilidade",
    title: "Sandbox de Workspaces e Estado Portátil",
    excerpt: "Centralização de chaves, configurações e caches do navegador embutido dentro de um sandbox portátil totalmente isolado.",
    version: "v0.2.1",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "05 de Novembro de 2025",
    readTime: "3 min read",
    tags: ["Sandbox", "Portabilidade", "Segurança"],
    content: `### Portabilidade e Isolamento de Dados

Para garantir que informações confidenciais corporativas e metadados de projetos fiquem 100% contidos na pasta portátil do aplicativo, o AetherCore centraliza todas as suas estruturas sob uma árvore isolada no diretório ativo de workspaces:
- **Cofre Criptografado**: O armazenamento de credenciais seguras e chaves de criptografia fica confinado dentro do sandbox portátil de cada projeto.
- **Isolamento de Cache e Logs**: Caches internos da interface visual, logs de execução do agente e memórias standalone residem na área restrita do workspace ativo.
- **Segurança Restrita de Arquivos**: Quando as políticas de governança estão ativas, as ferramentas de sistema ficam estritamente limitadas ao diretório de trabalho corrente, prevenindo que o agente leia ou altere arquivos confidenciais fora da área autorizada.`
  },
  {
    id: "padronizacao-modelos-ollama",
    title: "Padronização de Modelos Ollama e Limpeza de Caches",
    excerpt: "Consolidação de armazenamento único para modelos de IA locais, otimização de gigabytes de espaço e checagem rápida de boot.",
    version: "v0.2.0",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "12 de Outubro de 2025",
    readTime: "2 min read",
    tags: ["Ollama", "IA Local", "Performance"],
    content: `### Otimização e Armazenamento Consolidado

Aprimoramos o armazenamento e a consistência no carregamento de modelos de inteligência locais na máquina do usuário:
- **Redirecionamento Inteligente**: Implementamos atalhos lógicos na estrutura portátil de arquivos para garantir compatibilidade com scripts legados de carregamento de IA.
- **Limpeza Profunda de Cache**: Eliminamos gigabytes de caches temporários obsoletos e modelos desatualizados que não eram utilizados pelo motor corrente, otimizando o espaço em disco.
- **Validação de Prontidão**: Adicionamos uma verificação automatizada no boot para garantir que os modelos respondam com o menor tempo de latência possível.`
  },
  {
    id: "mvp-conselho-agente-aether",
    title: "MVP do Conselho do Agente Aether",
    excerpt: "Estrutura avançada de deliberação local-first unindo participantes especializados com registro histórico à prova de falhas.",
    version: "v0.1.8",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "20 de Setembro de 2025",
    readTime: "4 min read",
    tags: ["Agentes", "Conselho", "Arquitetura"],
    content: `### Decisões Inteligentes por Conselho Descentralizado

O módulo de planejamento do agente Aether foi evoluído para suportar uma estrutura de conselho local-first. Em vez de depender de uma inferência linear simples, o agente consulta múltiplos avaliadores semânticos locais paralelamente para estruturar a melhor resposta:
- **Múltiplos Participantes**: Combina o processamento analítico do motor local com loops ReAct e modelos extras configurados por perfil de projeto.
- **Livro de Auditoria Criptografado**: Toda deliberação colhida, notas de votação dos modelos e planos propostos são armazenados em um livro estruturado (*ledger*) dentro do cofre de segurança ativo do workspace, assegurando rastreabilidade total.`
  },
  {
    id: "correcao-historico-xlsx",
    title: "Correção de Histórico Invisível e Estabilização de XLSX",
    excerpt: "Exibição clara de chamadas de ferramenta no chat e governança deny-first para planilhas complexas.",
    version: "v0.1.7",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "30 de Agosto de 2025",
    readTime: "3 min read",
    tags: ["UX", "Excel", "Agentes"],
    content: `### Transparência Operacional na UI

Corrigimos a renderização no chat para eliminar "mensagens invisíveis" em sessões antigas:
- **Fluxo Visual Rico**: Chamadas de ferramentas e seus retornos de processamento agora aparecem formatados de forma rica em Markdown diretamente no histórico de mensagens, facilitando o acompanhamento visual das decisões do agente.
- **Persistência de Logs**: Estabilizamos a recuperação de sessões conversacionais antigas baseadas em bancos locais.

---

### Governança sobre Dados Financeiros (BI)

Refinamos a capacidade do agente de lidar com planilhas corporativas complexas sob as premissas de segurança do Aether Reliability Layer (ARL):
- **Processamento de Planilhas**: O agente pode analisar tabelas locais complexas e gerar arquivos de BI estruturados.
- **Controle Deny-First**: Ações de escrita em planilhas são tratadas como sensíveis, exigindo confirmação manual com resumo detalhado antes de qualquer gravação ou modificação de dados.`
  },
  {
    id: "manipulacao-nativa-xlsx-bi",
    title: "Manipulação Nativa de XLSX (BI) e Segurança ARL",
    excerpt: "Geração e leitura de planilhas financeiras locais integradas ao registro de ferramentas com barramento de segurança.",
    version: "v0.1.6",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "15 de Agosto de 2025",
    readTime: "3 min read",
    tags: ["Excel", "Rust", "BI"],
    content: `### Ferramentas Nativas de BI

Incorporamos motores de altíssima performance para planilhas locais diretamente no núcleo de processamento do AetherCore:
- **Leitura Avançada**: Permite o parsing rápido de tabelas locais contendo dados numéricos ou contábeis.
- **Escrita Estruturada**: Habilita a escrita e consolidação de relatórios complexos, formatações e fórmulas em planilhas.
- **Integração com ARL**: Ações de alteração de planilhas locais disparam resumos visuais no painel de governança, assegurando que o agente nunca grave dados sem autorização expressa.`
  },
  {
    id: "cef-webview-padrao",
    title: "CEF WebView como WebView Padrão do Desktop",
    excerpt: "Uso do Chromium Embedded Framework para renderização local ágil de assets sem dependência de localhost ou rede.",
    version: "v0.1.5",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "25 de Julho de 2025",
    readTime: "3 min read",
    tags: ["CEF", "Desktop", "Rust"],
    content: `### WebView Embarcado de Alta Performance

Promovemos o Chromium Embedded Framework (CEF) a WebView padrão para visualização no aplicativo conversacional de desktop:
- **Isolamento de Rede**: O frontend e seus estilos são carregados localmente via protocolo de arquivos embarcados, eliminando dependências de servidores localhost locais ou de conexões externas de rede.
- **Ponte IPC Exclusiva**: A troca de mensagens assíncronas entre a visualização gráfica e o motor nativo em Rust opera em canal interno e direto de comunicação, viabilizando interfaces frameless modernas e responsivas.`
  },
  {
    id: "polimento-visual-qa",
    title: "Polimento de Lançamento e QA Visual",
    excerpt: "Adoção do novo tema visual escurecido premium com glows âmbar-cobre e tipografia editorial de alta classe.",
    version: "v0.1.4",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "05 de Julho de 2025",
    readTime: "2 min read",
    tags: ["Design System", "QA", "UX"],
    content: `### Estética Visual Avançada

Polimos o site de divulgação e a interface nativa para refletir a nova direção visual "Apple Black" corporativa:
- **Paleta Premium**: Substituição completa dos tons verdes anteriores por uma paleta escura de alto luxo, combinada com acentos âmbar-cobre e tipografia editorial refinada.
- **QA Visual Extensivo**: Validamos o comportamento de tooltips, o contraste em exibições dinâmicas de chat e o alinhamento responsivo de todos os cards institucionais.`
  },
  {
    id: "gateway-telegram",
    title: "Gateway Telegram e Isolação de Nuvem",
    excerpt: "Comunicação nativa via long polling, exclusão de webhooks públicos e restrição a chats autenticados.",
    version: "v0.1.3",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "18 de Junho de 2025",
    readTime: "3 min read",
    tags: ["Telegram", "Gateway", "Segurança"],
    content: `### Integração Segura com Dispositivos Móveis

Desenvolvemos um módulo nativo standalone para interações seguras através de chat móvel:
- **Conexão Inversa Segura**: O gateway opera localmente por meio de comunicação ativa do cliente (long polling), não exigindo endereços IP públicos ou a abertura de webhooks vulneráveis à internet.
- **Governança de Nuvem**: Interações móveis rodam em modo conversacional puro, isolando e bloqueando completamente qualquer execução de ferramentas locais ou comandos do terminal.`
  },
  {
    id: "marco-010-pre-reconciliacao",
    title: "Marco 0.1.0-pre e Reconciliação Documental",
    excerpt: "Consolidação estável do WebView embarcado, inferência local e green gate de testes de integridade.",
    version: "v0.1.2",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "30 de Maio de 2025",
    readTime: "3 min read",
    tags: ["Milestone", "Rust", "Validation"],
    content: `### Milestone Operacional Local-First

Consolidamos o primeiro ciclo estável do AetherCore agregando o WebView isolado, o motor de inferência local e o runtime do agente conversacional:
- **Validação de Base de Código**: Alcançamos aprovação limpa e livre de avisos nos testes estáticos de compilação locais.
- **Sincronia Estrutural**: Alinhamos as especificações técnicas aos módulos realmente entregues para garantir clareza absoluta na arquitetura.`
  },
  {
    id: "arl-reliability-layer",
    title: "Aether Reliability Layer (ARL) e Guardrails",
    excerpt: "Supervisão transparente, redação de credenciais confidenciais locais e perfis granulares de privacidade.",
    version: "v0.1.1",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "12 de Maio de 2025",
    readTime: "4 min read",
    tags: ["ARL", "Auditoria", "Segurança"],
    content: `### Governança sobre Comportamento de IA

Desenvolvemos a Aether Reliability Layer (ARL), responsável por proteger o usuário e registrar auditorias transparentes locais:
- **Supervisão Proativa**: Redação automatizada de segredos comuns, tokens e dados sensíveis antes de qualquer exibição conversacional.
- **Privacidade Granular**: O usuário pode optar por diferentes perfis de retenção, variando desde o arquivamento corporativo completo para auditoria até o modo puramente efêmero (sem rastro de conversas).
- **Sanitização de Entrada**: Filtros internos eliminam caracteres de controle invisíveis e tentativas de injeção em inputs antes do processamento.`
  },
  {
    id: "varredura-csp-browser-sandbox",
    title: "Varredura 1:1, CSP e Browser Sandbox",
    excerpt: "Endurecimento de segurança frontend, indexação de novos arquivos e ambiente sandbox para navegação.",
    version: "v0.1.0",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "25 de Abril de 2025",
    readTime: "3 min read",
    tags: ["CSP", "Browser", "RAG"],
    content: `### Segurança Reforçada de Interface e Rede

Aplicamos regras rígidas de segurança para blindar o ambiente local contra acessos não autorizados:
- **Frontend Protegido**: Política de segurança de conteúdo (CSP) endurecida que elimina o uso de scripts inline e remove o carregamento de fontes ou dependências de servidores externos.
- **Navegação em Quarentena**: O navegador embutido utilizado para buscas do agente roda em um perfil virtual isolado local, impedindo o cruzamento com dados pessoais do usuário.
- **Suporte Amplo de Arquivos**: A ingestão de conhecimento local foi expandida para lidar com planilhas, logs estruturados e arquivos de desenvolvimento.`
  },
  {
    id: "catalogo-funcionalidades",
    title: "Catálogo Completo de Funcionalidades",
    excerpt: "Inventário de todas as superfícies nativas, workspaces e camadas de permissão estruturadas no projeto.",
    version: "v0.0.9",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "08 de Abril de 2025",
    readTime: "2 min read",
    tags: ["Arquitetura", "Rust", "API"],
    content: `### Mapeamento Geral do AetherCore

Concluímos um catálogo completo mapeando de forma estruturada as ferramentas e os subsistemas locais:
- **Subsistemas Mapeados**: Identificamos e organizamos os fluxos de renderização de interface, o servidor local de gerenciamento de dados e as pontes nativas.
- **Estruturação de Roteamento**: Unificamos as diretrizes técnicas de controle do app conversacional para garantir consistência em futuras atualizações.`
  },
  {
    id: "auditoria-corporativa",
    title: "Auditoria Corporativa e Maturidade de Produto",
    excerpt: "Avaliação sistemática do armazenamento local privado e da UX das sessões do workspace.",
    version: "v0.0.8",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "20 de Março de 2025",
    readTime: "3 min read",
    tags: ["Auditoria", "Workspaces", "BI"],
    content: `### Maturidade de Armazenamento Local

Rodamos uma auditoria interna com foco na segurança física dos dados locais do usuário:
- **Segregação de Memória**: Validamos que a memória conversacional e as configurações do usuário fiquem estritamente amarradas e criptografadas no banco SQLite específico de cada projeto.
- **Normalização Conversacional**: Resolvemos bugs na estruturação de Markdown em parágrafos longos gerados localmente pela IA.`
  },
  {
    id: "rodada-zero-bala",
    title: "Rodada Zero Bala - Estabilização Desktop",
    excerpt: "Estabilização do upload de múltiplos arquivos, cofre robusto para chaves de API e QA de boot.",
    version: "v0.0.7",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "03 de Março de 2025",
    readTime: "2 min read",
    tags: ["Desktop", "GUI", "Estabilização"],
    content: `### Conforto de Uso no Desktop

Aprimoramos as interações do usuário com a interface gráfica do AetherCore:
- **Upload Simplificado**: Otimização no processamento do arrastar e soltar de múltiplos arquivos de dados.
- **Cofre Altamente Criptografado**: O cofre seguro local armazena dados críticos localmente usando algoritmos industriais avançados de criptografia para máxima segurança física.
- **Auditoria de Erros**: Preservação inteligente de relatórios históricos de bugs locais para aprimorar os ciclos de desenvolvimento.`
  },
  {
    id: "ferramentas-permissoes-sandbox",
    title: "Ferramentas, Permissões e Sandbox Nativo",
    excerpt: "Estruturação dos perfis de governança operacional e confinamento estrito de comandos do agente.",
    version: "v0.0.6",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "10 de Fevereiro de 2025",
    readTime: "3 min read",
    tags: ["Segurança", "Sandbox", "Agentes"],
    content: `### Contenção e Políticas de Execução

Criamos os três principais perfis de comportamento que ditam a autonomia do agente conversacional na máquina do usuário:
1. **Modo Consulta (Read-Only)**: O agente pode apenas buscar referências e ler diretórios autorizados.
2. **Modo Interativo (Require-Approval)**: O agente pode sugerir edições e propor a execução de tarefas, exigindo aprovação humana visual para qualquer ação real.
3. **Autonomia Confiada (Full-Access)**: Permite a execução contínua para tarefas automatizadas em diretórios isolados.`
  },
  {
    id: "plugins-skills-mcp-slash",
    title: "Plugins, Skills, MCP e Slash Commands",
    excerpt: "Personalização flexível via manifestos JSON assíncronos e integração de contextos externos via MCP.",
    version: "v0.0.5",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "22 de Janeiro de 2025",
    readTime: "3 min read",
    tags: ["MCP", "Plugins", "Extensibilidade"],
    content: `### Ecossistema Personalizável Local-First

Introduzimos a camada de extensibilidade dinâmica que permite customizar o comportamento do AetherCore sem abrir mão da segurança física:
- **Carregamento Assíncrono**: Suporte a manifestos de configuração para empacotar novas habilidades de IA de forma limpa.
- **Protocolo MCP**: Conectores nativos baseados no Model Context Protocol para integrar contextos e bases de dados locais com facilidade.
- **Comandos Slash rápidos**: Interceptação instantânea de comandos úteis de controle no chat (ex: consulta de status do sandbox).`
  },
  {
    id: "workspaces-documentos-rag",
    title: "Workspaces, Documentos e RAG Local",
    excerpt: "Persistência física de dados de projetos e motor de conhecimento vetorial local e governado.",
    version: "v0.0.4",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "05 de Janeiro de 2025",
    readTime: "3 min read",
    tags: ["RAG", "Workspaces", "Embeddings"],
    content: `### Gestão de Conhecimento Corporativo Privado

Habilitamos a fundação de workspaces locais para processamento governado de dados:
- **Encapsulamento por Workspace**: Cada diretório de projeto gerencia seu próprio cofre de documentos e histórico persistente de forma isolada.
- **Mapeamento Semântico Local**: Geração local de embeddings vetoriais na máquina do usuário, permitindo buscas contextuais avançadas em arquivos corporativos confidenciais sem conexões de rede.`
  },
  {
    id: "roteamento-modelos-uplinks",
    title: "Roteamento de Modelos e Uplinks Explícitos",
    excerpt: "Separação visível entre a inferência local de segurança e roteamentos cloud opcionais de terceiros.",
    version: "v0.0.3",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "15 de Dezembro de 2024",
    readTime: "2 min read",
    tags: ["Uplinks", "Modelos", "IA Local"],
    content: `### Transparência e Soberania de Processamento

Definimos com clareza o roteamento de processamento do assistente:
- **Motor de IA Local**: Definição da inferência local de cofre como padrão para tarefas que lidam com códigos ou arquivos confidenciais.
- **Uplinks Cloud**: Modelos baseados em nuvem de terceiros são classificados explicitamente como conexões de rede externas, exigindo autorização ativa do usuário para envio de dados.`
  },
  {
    id: "runtime-sessao-identidade",
    title: "Runtime de Sessão e Identidade Local",
    excerpt: "Isolamento rígido de prompts, limites de contexto e dados conversacionais por workspace.",
    version: "v0.0.2",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "28 de Novembro de 2024",
    readTime: "3 min read",
    tags: ["Sessões", "Identidade", "Persistência"],
    content: `### Isolamento de Sessões de Trabalho

Garantimos que o fluxo de conversas e prompts não sofra vazamentos cruzados:
- **Armazenamento Seguro e Isolado**: Todo histórico conversacional, tokens e prompts de sistema são persistidos no cofre exclusivo de cada workspace ativo.
- **Memória de Longo Prazo**: Desenvolvimento de bancos locais estáveis para sessões persistentes.`
  },
  {
    id: "primeiro-nucleo-desktop",
    title: "Primeiro Núcleo Desktop AetherCore",
    excerpt: "Desenvolvimento do shell nativo desktop e da ponte de comunicação local-first.",
    version: "v0.0.1",
    author: {
      name: "Matheus Peres",
      avatar: "/founder.jfif",
    },
    date: "10 de Novembro de 2024",
    readTime: "2 min read",
    tags: ["Origem", "Rust", "Shell"],
    content: `### O Nascimento de um Assistente Privado

Demos o primeiro passo na criação de um assistente verdadeiramente local-first:
- **Shell Nativo Desktop**: Desenvolvimento da estrutura da janela gráfica básica e da ponte conversacional nativa de comunicação.
- **Visão Soberana**: Construir uma inteligência de agente ágil projetada para rodar localmente e dar ao usuário corporativo controle absoluto sobre suas tarefas intelectuais.`
  }
];
