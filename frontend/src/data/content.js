// Bilíngue (PT/EN) - Estruturado para o pitch do Programa Centelha Paraná.
// A versão do produto definida aqui deve refletir sempre a versão mais recente anunciada na área de Blog. O Blog é a fonte da verdade.
// Narrativa histórica de desenvolvimento ampliada para 19 meses de P&D prévio.

export const STACK = [
  { name: "Rust", src: "/stack/rust.svg" },
  { name: "Tokio", src: "/stack/tokio.svg" },
  { name: "Axum", src: "/stack/axum.svg" },
  { name: "SQLite", src: "/stack/sqlite.webp" },
  { name: "React", src: "/stack/react.svg" },
  { name: "TypeScript", src: "/stack/typescript.svg" },
  { name: "Vite", src: "/stack/vite.svg" },
  { name: "Tailwind", src: "/stack/tailwindcss.svg" },
  { name: "Ollama", src: "/stack/ollama.webp" },
  { name: "Gemma", src: "/stack/gemma-4.webp" },
  { name: "Nous Research", src: "/stack/nousresearch.webp" },
  { name: "WebSocket", src: "/stack/websocket.svg" },
  { name: "Telegram", src: "/stack/telegram.svg" },
  { name: "AetherCore", src: "/logo-aether.png" },
];

export const CONTENT_PT = {
  BRAND: {
    name: "AetherCore",
    version: "v0.6.0 · beta",
    tagline: "IA local / beta",
    copyright: "© 2026 AetherCore. IA local-first. Curitiba, Brasil. Contato: business@exvorn.tech",
  },
  NAV_LINKS: [
    { label: "Início", to: "/" },
    { label: "Ecossistema", to: "/ecossistema" },
    { label: "Sobre", to: "/sobre" },
    { label: "Validação", to: "/validacao" },
    { label: "Produto", to: "/produto" },
    { label: "Sustentabilidade", to: "/sustentabilidade" },
    { label: "Blog", to: "/blog" },
    { label: "Preços", to: "/precos" },
    { label: "Arquitetura", to: "/arquitetura" },
    { label: "Plugins", to: "/plugins" },
    { label: "Soluções", to: "/casos-de-uso" },
    { label: "Princípios", to: "/principios" },
    { label: "FAQ", to: "/faq" },
  ],
  FOOTER_LINKS: [],
  HOME: {
    badge: "v0.6.0 · beta",
    heroStatus: "Sistema local · acesso completo",
    aether: {
      eyebrow: "Plataforma de Agentes Autônomos",
      eyebrowRight: "EST. 2025 — v0.6.0",
      headline: { l1: "Além da", l2: "Automação.", l3a: "Pura", l3b: "Cognição" },
      sub: "O AetherCore substitui fluxos rígidos por um sistema nervoso de IA local — que pensa, se adapta e executa na velocidade da sua ambição. Nada sai do seu dispositivo sem você saber.",
      consoleLabel: "Console AetherCore",
      consoleLive: "Malha de Agentes ao Vivo",
      scrollBadge: "Role para explorar • AetherCore •",
      chapters: [
        { n: "01", title: "O Fim dos Scripts", body: "Adeus à lógica rígida de 'se-então'. Agentes raciocinam sobre a ambiguidade em vez de quebrar com ela." },
        { n: "02", title: "Execução Autônoma", body: "Decisões em milissegundos, verificadas por você. Da triagem ao deploy, com aprovação humana de ponta a ponta." },
        { n: "03", title: "Local por Padrão", body: "Um agente que aprende sua cadência operacional e fica mais afiado a cada ciclo — sem nada sair da sua máquina." },
      ],
      marquee: ["AETHERCORE", "O NOVO PADRÃO PARA AGENTES AUTÔNOMOS", "COGNIÇÃO LOCAL"],
    },
    heroRotate: ["executam.", "planejam.", "revisam.", "auditam.", "automatizam."],
    heroChipsLabel: "o que já está funcionando",
    heroChips: [
      { t: "Qwen local", icon: "Cpu" },
      { t: "XLSX e CSV", icon: "Table2" },
      { t: "Arquivos locais", icon: "HardDrive" },
      { t: "Aprovação humana", icon: "ShieldCheck" },
      { t: "Logs auditáveis", icon: "ClipboardCheck" },
      { t: "Local por padrão", icon: "HardDrive" },
    ],
    titleLead: "Agentes que",
    titleEm: "autônomos.",
    titleEnd: "Controle absoluto.",
    primaryCta: "Solicitar acesso antecipado",
    secondaryCta: "Ver primeiro caso com XLSX",
    lead:
      "O AetherCore lê seus arquivos, roda tarefas na sua máquina e pede aprovação antes de mexer em qualquer coisa sensível. Nada sai do seu dispositivo sem você saber.",
    metrics: [
      { k: "Local", v: "arquivos no dispositivo" },
      { k: "Revisão", v: "aprovação humana" },
      { k: "Agente", v: "planeja e usa ferramentas" },
    ],
    pillars: [
      { t: "Local-first", d: "roda no dispositivo" },
      { t: "Human-in-the-loop", d: "você aprova" },
      { t: "Audit trail", d: "tudo registrado" },
    ],
    whatIsAether: {
      kicker: "o que o aether faz?",
      title: "Sua IA de trabalho, local por padrão.",
      desc: "Ele faz tudo o que as IAs famosas de nuvem fazem, mas isolado no seu ambiente. Desenvolva, pesquise e analise sem compartilhar dados.",
      cards: [
        { t: "Chat & Escrita", d: "Converse e crie documentos usando modelos SOTA avançados.", icon: "MessageSquareText" },
        { t: "Geração de Código", d: "Programe autonomamente com ferramentas de edição no sandbox.", icon: "Code2" },
        { t: "Análise de Dados", d: "Cruze informações de planilhas complexas com segurança local.", icon: "Table2" },
        { t: "Pesquisa Web", d: "O agente busca dados externos apenas quando você autoriza.", icon: "Globe" },
      ]
    },
    stackKicker: "base técnica",
    stackTitle: "O que roda por baixo.",
    stackDesc:
      "Modelos rodam na máquina, ferramentas são abertas, permissões ficam com você. O processamento principal fica no seu ambiente; validações de licença e integrações autorizadas passam pelo backend quando necessário.",
    stackCredit:
      "Logos exibidos para referência. Não implicam parceria ou endosso. AetherCore é independente.",
    mapKicker: "mapa do site",
    mapTitle: "Navegue pelo site.",
    mapDesc:
      "A home é o começo. Cada tema tem sua própria página pra você ir direto no que interessa.",
    map: [
      { t: "Produto & MVP", d: "O agente local, o primeiro caso com XLSX e o que já funciona.", to: "/produto", span: "lg:col-span-7" },
      { t: "Como funciona por dentro", d: "Núcleo, fluxo de execução e aprovação.", to: "/arquitetura", span: "lg:col-span-5" },
      { t: "Soluções B2B", d: "Jurídico, financeiro, controladoria e PMEs.", to: "/casos-de-uso", span: "lg:col-span-4" },
      { t: "FAQ & Governança", d: "Perguntas frequentes sobre IA local.", to: "/faq", span: "lg:col-span-4" },
      { t: "Princípios & privacidade", d: "Privacidade como decisão técnica, não marketing.", to: "/principios", span: "lg:col-span-4" },
    ],
    synthKicker: "resumo comercial",
    synthTitle:
      "Uma IA que faz coisas, pra empresas que não podem vazar dados.",
    synthDesc:
      "Começa com planilhas, mas já lê documentos, gera relatórios e roda automações. Tudo com aprovação.",
    synth: [
      {
        tag: "Problema",
        t: "Dados sensíveis espalhados em ferramentas de terceiros",
        d: "Informações críticas acabam em serviços externos, sem controle sobre quem acessa ou o que acontece com elas.",
      },
      {
        tag: "Solução",
        t: "IA que roda perto dos arquivos",
        d: "O AetherCore processa tudo localmente. Se precisa fazer algo arriscado, pede aprovação antes.",
      },
      {
        tag: "Entrada",
        t: "Primeiro caso: planilhas",
        d: "Planilhas complexas viram análises e relatórios sem sair da sua máquina.",
      },
    ],
  },
  CTA: {
    kicker: "acesso antecipado",
    title: "Quer testar antes de todo mundo?",
    desc:
      "Quer conhecer o projeto de perto? Manda um email para business@exvorn.tech ou fala direto com o fundador no LinkedIn. Sem formulário, sem fila, só uma conversa real.",
    notice: "📬 Contato comercial: business@exvorn.tech · Ou fale conosco pelo LinkedIn.",
    linkedinButton: "Falar com o CEO no LinkedIn",
    button: "Entrar na lista beta",
    details: [
      { k: "acesso", v: "por convite" },
      { k: "região", v: "Curitiba / remoto" },
      { k: "contato", v: "business@exvorn.tech" },
      { k: "segurança", v: "aprovação humana" },
    ],
  },
  PRODUTO: {
    kicker: "agente local & MVP",
    title: ["IA que roda na sua máquina", "e trabalha de verdade", "com seus arquivos."],
    lead:
      "O AetherCore entende o que você quer, monta um plano, lê e escreve arquivos, usa ferramentas e pede permissão antes de fazer qualquer coisa arriscada. O MVP com XLSX é a primeira prova disso funcionando.",
    solutionKicker: "o que ele faz",
    solutionTitle: "A IA vem até os seus arquivos.",
    solutionDesc:
      "Você não manda seus dados pra fora. O AetherCore roda tudo na sua máquina, com ferramentas próprias e aprovação pra ações sensíveis.",
    blocks: [
      {
        n: "01",
        tag: "Memória local",
        t: "Seus arquivos ficam aqui",
        d: "PDFs, planilhas, contratos e código ficam no dispositivo. O agente acessa como material de trabalho, sem mandar pra servidor nenhum.",
        points: ["arquivos organizados", "relações entre documentos", "mudanças rastreáveis"],
      },
      {
        n: "02",
        tag: "Agente de trabalho",
        t: "Entende, executa e revisa",
        d: "O agente transforma sua instrução em um plano, aciona as ferramentas certas, vê o resultado e ajusta se precisar. Não é chat descartável.",
        points: ["plano de ação", "uso de ferramentas", "revisão do resultado"],
      },
      {
        n: "03",
        tag: "Permissões",
        t: "Nada sai sem você deixar",
        d: "Qualquer ação sensível (mandar algo pra nuvem, escrever num arquivo) aparece pra você aprovar antes. Com escopo, risco e justificativa.",
        points: ["aprovação antes do envio", "limites claros", "histórico consultável"],
      },
    ],
    offeringsKicker: "produto + negócio",
    offeringsTitle: "Um agente, quatro formatos.",
    offeringsDesc:
      "Da sandbox gratuita ao deploy on-premise dedicado. A mesma base de IA local com aprovação humana, adaptada ao porte e à sensibilidade dos seus dados.",
    offerings: [
      {
        name: "Aether Free",
        audience: "Para experimentar",
        t: "Teste a IA sem instalar nada.",
        d: "Agente web em sandbox temporária na nuvem. Ideal pra conhecer o produto com tarefas leves antes de rodar local.",
        points: ["sandbox limitada na web", "créditos diários inclusos", "sem dados locais"],
      },
      {
        name: "Aether Go",
        audience: "Para uso individual",
        t: "Pra quem quer usar no dia a dia.",
        d: "Agente local completo para produtividade. Lê e escreve XLSX, executa localmente com aprovação humana e sem limite de arquivos.",
        points: ["agente local completo", "leitura e escrita XLSX", "execução local"],
      },
      {
        name: "Aether Enterprise",
        audience: "Para equipes",
        t: "Pra quem lida com dados que não podem vazar.",
        d: "Workspace com até 5 usuários base, logs auditáveis, permissões granulares por membro e relatórios automatizados.",
        points: ["logs auditáveis", "permissões por usuário", "governança corporativa"],
      },
      {
        name: "Aether Scale",
        audience: "Deploy dedicado",
        t: "Operações em larga escala com máxima governança.",
        d: "Deploy on-premise autônomo com SLA dedicado, integrações customizadas e contratos sob medida. Para quem precisa de controle total.",
        points: ["on-premise autônomo", "SLA e suporte 24/7", "sob consulta"],
      },
    ],
    greenKicker: "ia sustentável / green ai",
    greenTitle: "Soberania ecológica e eficiência energética.",
    greenDesc: "IAs centralizadas na nuvem consomem gigawatts de eletricidade e toneladas de água para resfriamento de servidores. O AetherCore roda localmente, aproveitando a infraestrutura que sua empresa já mantém ligada.",
    greenCards: [
      { t: "Consumo de Água", d: "Uma única conversa de 20 a 50 mensagens com IAs tradicionais de nuvem consome cerca de 500ml de água purificada para resfriar os data centers.", icon: "Droplet" },
      { t: "Pegada de Carbono", d: "A etapa de inferência (o uso diário das consultas) representa de 80% a 90% de todas as emissões de carbono de um modelo de IA. A execução local elimina o tráfego de rede e centralização energética.", icon: "Wind" },
      { t: "Infraestrutura Reutilizada", d: "Em vez de exigir a construção de novos data centers massivos, o AetherCore se instala de forma invisível nos computadores e servidores locais já existentes na sua empresa.", icon: "Server" },
    ],
    flowKicker: "fluxo prático",
    flowTitle: "Do pedido até a entrega",
    flowDesc:
      "Você define uma tarefa; o Aether lê o contexto, usa ferramentas e entrega algo que dá pra revisar.",
    flow: [
      { n: "1", t: "Escolhe o contexto", d: "Planilha, documento, pasta, log ou base local." },
      { n: "2", t: "Plano em ação", d: "O Aether escolhe ferramentas, executa os passos e avalia riscos." },
      { n: "3", t: "Entrega pronta", d: "Resumo, relatório, arquivo revisado ou próxima ação pra você aprovar." },
    ],
  },
  ARQUITETURA: {
    kicker: "arquitetura",
    title: ["Roda local,", "pede aprovação", "e registra tudo."],
    lead:
      "Como o processamento funciona, o que é a aprovação e quais peças técnicas fazem tudo rodar local.",
    loopKicker: "fluxo de execução",
    loopTitle: "Do arquivo até o log.",
    loopDesc:
      "O agente planeja, valida, executa e registra. Tudo no mesmo lugar, com feedback visual.",
    loop: [
      { tag: "Arquivos", t: "Traga seus arquivos.", d: "Monte um workspace com PDFs, planilhas, código e notas. O agente lê estrutura e dependências antes de fazer qualquer coisa.", chip: "Workspace preparado" },
      { tag: "Plano", t: "Veja o plano antes.", d: "O planejador mostra os passos, as ferramentas que vai usar e os possíveis efeitos antes de rodar.", chip: "Plano visível antes da execução" },
      { tag: "Aprovação", t: "Você decide.", d: "A tela de aprovação mostra risco, escopo e o que vai ser alterado. Sem OK, a ação para.", chip: "Escrita pede aprovação" },
      { tag: "Execução", t: "Roda local, registra tudo.", d: "Ferramentas em Rust e IPC tipado executam a tarefa, geram o resultado e salvam o que aconteceu no log.", chip: "Resultado gerado + log salvo" },
    ],
    capsKicker: "capacidades",
    capsTitle: "O que o sistema sabe fazer.",
    capsDesc:
      "Oito peças que fazem o sistema funcionar: execução local, ferramentas, memória, dados, aprovação e conexão externa.",
    caps: [
      { n: "01", tag: "local", t: "IA local-first", d: "Chat, geração de código e análises rodam direto no dispositivo. O poder das IAs famosas, mas no seu ambiente." },
      { n: "02", tag: "audit", t: "Log de execução", d: "Tudo que o agente lê ou altera fica registrado em logs locais." },
      { n: "03", tag: "govern", t: "Controle de acesso", d: "SQLite local com controle de quais pastas e arquivos o agente pode acessar." },
      { n: "04", tag: "xlsx", t: "Análise de planilhas", d: "Lê, escreve e cruza dados de XLSX e CSV nativamente, sem mandar para a nuvem." },
      { n: "05", tag: "human", t: "Aprovação humana", d: "Ações de escrita e conexões externas começam bloqueadas. Só rodam com aprovação." },
      { n: "06", tag: "conexão", t: "Conexão externa opcional", d: "Pesquisas na web e acesso a APIs externas só acontecem quando você autoriza." },
      { n: "07", tag: "security", t: "Proteção de dados", d: "Permissões locais, redação de segredos e controle de execução pra reduzir exposição." },
      { n: "08", tag: "insights", t: "Relatórios automáticos", d: "Planilhas complexas viram resumos executivos e análises prontas, igual às IAs de nuvem." },
    ],
    releaseKicker: "status + release notes",
    releaseTitle: "v0.6.0 — capability guards & resolução de modelos.",
    releaseDesc:
      "Finalizamos a Fase 7 do Kernel de Execução: introdução de Capability Guards (validação preditiva), hierarquia rígida de resolução de modelos, e política de interrupção clara sem fallbacks silenciosos na nuvem.",
    releaseTags: ["Capability Guards", "Resolução de Modelos", "Kernel Security", "Zero Cloud Fallback"],
  },
  CASOS: {
    kicker: "soluções",
    title: ["IA local aplicada", "a dados sensíveis", "de verdade."],
    lead:
      "A vacina definitiva contra vazamentos e multas da LGPD: IA em formato de agente que opera de forma local e governada para manter sua empresa em total conformidade.",
    problemKicker: "a doença regulatória",
    problemTitle: "O risco iminente de multas da LGPD ao usar chatbots comuns.",
    problemDesc:
      "Enviar dados pessoais, contratos e planilhas financeiras para IAs na nuvem é o caminho mais rápido para um vazamento de dados. A LGPD pune severamente a exposição desgovernada de informações. AetherCore elimina essa vulnerabilidade na raiz.",
    steps: [
      { n: "01", tag: "a doença", t: "Vazamento e Multa LGPD", d: "Chatbots centralizados coletam, processam e armazenam dados confidenciais fora da sua infraestrutura. O risco de sanções da ANPD e danos de reputação travam a inovação.", points: ["dados pessoais expostos", "sanções da ANPD", "quebra de acordos (NDAs)"] },
      { n: "02", tag: "a vacina", t: "Soberania Local-First", d: "O AetherCore processa tudo no próprio dispositivo do usuário. Nenhuma informação pessoal ou confidencial sai da máquina para treinar modelos ou ser exposta em servidores externos.", points: ["isolamento de dados", "zero tráfego externo", "arquitetura blindada"] },
      { n: "03", tag: "imunidade", t: "Governança e Trilha de Auditoria", d: "Toda ação é monitorada e registrada localmente em logs imutáveis. O agente atua sob regras estritas e aprovação humana obrigatória para ações de escrita ou rede.", points: ["human-in-the-loop", "logs auditáveis", "segurança preventiva"] },
    ],
    compareKicker: "comparativo de risco",
    compareTitle: "AetherCore vs Chatbots Comuns.",
    compareDesc:
      "Por que assistentes na nuvem são um passivo regulatório e como o AetherCore protege a empresa.",
    compare: [
      { feat: "Conformidade LGPD", cloud: "Incompatível com políticas rígidas; expõe dados pessoais de clientes em nuvens terceiras.", aether: "Total conformidade. Os dados pessoais não trafegam e ficam sob controle do DPO da empresa." },
      { feat: "Privacidade & controle", cloud: "Exige que você mande arquivos e bases para servidores externos de terceiros.", aether: "Prioriza execução local. Arquivos e dados confidenciais nunca saem do seu dispositivo." },
      { feat: "Execução de Tarefas", cloud: "Apenas responde perguntas genéricas em uma interface de bate-papo linear.", aether: "Executa planos complexos, lê e escreve arquivos locais e manipula planilhas sob governança." },
      { feat: "Trilha de Auditoria", cloud: "Pouca ou nenhuma transparência sobre o processamento subjacente dos dados.", aether: "Registra cada leitura, escrita ou ferramenta executada em um log local estruturado." },
      { feat: "Governança Corporativa", cloud: "Executa qualquer prompt livremente, permitindo manipulações perigosas sem aviso.", aether: "Pede aprovação de escopo e justificativa antes de efetuar escritas ou conexões." },
      { feat: "Autonomia & Resiliência", cloud: "Fica fora do ar se houver instabilidade ou interrupção na internet.", aether: "Processa localmente por padrão. Ideal para auditorias e processamentos internos governados." },
    ],
    audienceKicker: "para quem",
    audienceTitle: "Blindagem para os setores mais regulados do mercado.",
    audienceDesc:
      "Setores onde a proteção de dados pessoais e o sigilo de informações não são opcionais, mas sim obrigações legais.",
    audience: [
      { t: "DPOs & Compliance Officers", d: "Tenha a certeza matemática de que os funcionários não estão colando dados confidenciais e pessoais de clientes em servidores externos sob risco de multas da LGPD." },
      { t: "Setores Jurídico & Regulatório", d: "Analise contratos confidenciais e minutas de processos sigilosos sem ferir termos de confidencialidade (NDAs) ou expor segredos industriais." },
      { t: "Financeiro, Contábil & Auditores", d: "Cruze planilhas XLSX e analise fluxos de caixa de múltiplos clientes locais com a garantia de que as informações financeiras permanecem seguras." },
      { t: "Setor de Cooperativas & PMEs", d: "Proteja as bases de dados de cooperados e clientes integrando automação por agentes em total conformidade com a governança da empresa." },
    ],
  },
  PRINCIPIOS: {
    kicker: "princípios de produto",
    title: "Privacidade não é feature. É decisão de arquitetura.",
    lead:
      "IA local, controle de execução e aprovação humana. Software tem que devolver controle pra quem usa.",
    manifestoKicker: "manifesto",
    manifestoTitle:
      "Aparece na interface: em permissões, logs e o que dá pra desfazer.",
    manifestoDesc:
      "Não é slogan. O produto processa local por padrão, bloqueia por padrão, só conecta externo com permissão e registra tudo.",
    items: [
      { n: "01", tag: "controle", t: "O dado fica perto de quem criou.", d: "Planilhas, contratos e relatórios ficam no ambiente do usuário quando a tarefa pode ser resolvida localmente." },
      { n: "02", tag: "consentimento", t: "Conexão externa é exceção.", d: "Conexões externas, escritas e ações sensíveis precisam de autorização explícita antes de rodar." },
      { n: "03", tag: "registro", t: "Automação sem log é caixa preta.", d: "O agente registra objetivos, permissões, ferramentas usadas, arquivos tocados e decisões relevantes." },
      { n: "04", tag: "proporcionalidade", t: "Usa o mínimo necessário.", d: "O sistema trabalha com o menor escopo possível e reduz exposição sem perder utilidade." },
      { n: "05", tag: "humano no comando", t: "IA propõe. Você aprova.", d: "A camada de aprovação protege decisões críticas. Quem usa é operador, não passageiro." },
      { n: "06", tag: "código como defesa", t: "Privacidade precisa de código, não de promessa.", d: "Inspirado pela cultura cypherpunk: boas intenções não bastam. É preciso construir os mecanismos." },
    ],
  },
  SUSTENTABILIDADE: {
    kicker: "ia sustentável / green ai",
    title: ["Soberania ecológica", "e eficiência energética", "para inteligência artificial."],
    lead: "Modelos centralizados consomem gigawatts de eletricidade e toneladas de água para resfriamento de servidores. AetherCore oferece uma alternativa ecológica ao rodar localmente na infraestrutura existente.",
    cardsTitle: "A Pegada Ecológica da IA de Nuvem",
    cardsDesc: "Como o uso diário de chatbots centralizados afeta o meio ambiente e como o processamento local atua como solução.",
    cards: [
      { t: "Consumo de Água", d: "Uma única conversa de 20 a 50 mensagens com IAs tradicionais de nuvem consome cerca de 500ml de água purificada para resfriar os data centers.", icon: "Droplet" },
      { t: "Pegada de Carbono", d: "A etapa de inferência (o uso diário das consultas) representa de 80% a 90% de todas as emissões de carbono de um modelo de IA. A execução local elimina o tráfego de rede e centralização energética.", icon: "Wind" },
      { t: "Infraestrutura Reutilizada", d: "Em vez de exigir a construção de novos data centers massivos, o AetherCore se instala de forma invisível nos computadores e servidores locais já existentes na sua empresa.", icon: "Server" },
    ],
  },
  SOBRE: {
    kicker: "quem somos / equipe",
    title: ["Arquitetura simétrica:", "código robusto e", "rigor científico."],
    lead: "AetherCore é construído sobre um motor duplo de inovação: engenharia de software avançada local-first e validação estatística federal.",
    teamTitle: "Equipe Executora & Conselheiros",
    teamDesc: "Conheça as mentes por trás do projeto que devolve a soberania de dados para as empresas.",
    members: [
      {
        name: "Matheus Peres da Silva",
        role: "Founder & CEO / Principal Systems Architect",
        bio: "Desenvolvedor especialista em Rust e WebAssembly, focado na criação de sandboxes locais seguras e integridade de orquestração local de LLMs. Projetou o AetherCore sob a premissa de que a melhor forma de proteger dados sensíveis é nunca permitir que eles toquem a nuvem de terceiros.",
      },
      {
        name: "Especialista em Modelagem e Metodologia Estatística",
        role: "Conselheiro Técnico Voluntário",
        bio: "Conselheiro voluntário com sólida fundamentação em pesquisas estatísticas nacionais. Iniciou sua atuação prática como recenseador de campo (NPE), adquirindo vivência direta em mapeamento territorial e coleta de dados na ponta antes de se consolidar como estatístico concursado no IBGE. Presta apoio técnico estritamente individual e consultivo (sem participação societária, cargo de gerência ou remuneração de fomento), garantindo isenção sob a Lei 8.112/90 para orientar a integridade estatística, consistência matemática e modelos de amostragem local do sistema.",
      }
    ],
    twinTitle: "Paradigma do Duplo Controle",
    twinDesc: "O AetherCore foi projetado sobre o princípio da separação total entre execução e auditoria. A integridade técnica da sandbox e o desenvolvimento em Rust são conduzidos pelo fundador. A precisão matemática da amostragem e a integridade estatística são validadas de forma externa e voluntária por seu irmão gêmeo idêntico, estatístico federal. Essa redundância biométrica e analítica traz ao projeto o rigor de dados científicos oficiais e uma blindagem de dados absoluta, garantindo total conformidade legal e isenção societária.",
  },
  FAQ: {
    kicker: "FAQ & governança",
    title: ["Perguntas frequentes", "sobre IA local", "e dados sensíveis."],
    lead:
      "Respostas diretas sobre como funciona, privacidade, arquivos e aprovação humana.",
    items: [
      { q: "O que é IA local-first?", a: "É uma IA feita pra rodar no dispositivo ou na infra do próprio usuário. A ideia é reduzir ao máximo o envio de dados pra servidores de terceiros." },
      { q: "É só pra planilhas?", a: "Não. Planilhas são o primeiro caso porque provam leitura, escrita controlada e valor de negócio. Mas o AetherCore trabalha com arquivos, documentos, ferramentas e tarefas sensíveis em geral." },
      { q: "Por que usar IA local pra planilhas?", a: "Porque planilhas normalmente têm dados financeiros, comerciais ou operacionais que ninguém quer ver em servidor alheio. É um bom ponto de partida pra validar o agente com menos risco." },
      { q: "Substitui um chatbot?", a: "Vai além. O AetherCore entende objetivos, monta plano, usa ferramentas, lê e escreve arquivos, registra o que fez e pede aprovação pra ações sensíveis. Chatbot só conversa." },
      { q: "Meus arquivos vão pra nuvem?", a: "A proposta é que não. Execução local é o padrão. Se alguma integração externa for necessária, ela é opcional, explícita e precisa de autorização." },
      { q: "Pra quem é indicado?", a: "Empresas e profissionais que lidam com planilhas, relatórios, contratos e dados sensíveis. Principalmente financeiro, contabilidade, jurídico, auditoria e gestão." },
    ],
  },
  PRIVACIDADE: {
    kicker: "trust center",
    title: "Privacidade, controle e execução local.",
    lead:
      "Como o AetherCore trata seus arquivos: escopo definido, consentimento, registro e processamento local.",
    policyKicker: "política técnica",
    policyTitle: "O design reduz exposição antes de prometer segurança.",
    policyDesc:
      "Isso não substitui uma política jurídica. São os princípios técnicos do beta. Precisam ser validados com a implementação real antes de virar produto.",
    cards: [
      { tag: "local-first", t: "Processa perto dos arquivos", d: "O foco é análise local de XLSX e documentos, pra reduzir a necessidade de enviar bases sensíveis pra serviços externos." },
      { tag: "approval", t: "Ações sensíveis passam por revisão", d: "Escrita em arquivos, conexões externas e alterações relevantes passam por uma tela de aprovação com escopo e justificativa." },
      { tag: "logs", t: "Log sem espetáculo", d: "O sistema registra eventos suficientes pra depuração e prestação de contas. Sem coletar mais do que precisa." },
      { tag: "segredos", t: "Redação e retenção", d: "Segredos, tokens e credenciais não aparecem em relatórios ou logs legíveis. Retenção é configurável." },
      { tag: "transparência", t: "Conexão externa explícita", d: "Quando houver integração externa, você sabe pra onde, por quê e com quais dados." },
      { tag: "limite", t: "Beta, sem promessas absolutas", d: "AetherCore prioriza controle local e redução de exposição. Não promete privacidade total ou segurança infalível." },
    ],
  },
  ROADMAP: {
    kicker: "plano de execução centelha PR",
    title: "Cronograma de Consolidação e Entrada no Mercado",
    lead:
      "Planejamento de 12 meses focado em robustez tecnológica, validação regulatória regional e expansão comercial B2B pós-fomento.",
    timelineKicker: "cronograma",
    timelineTitle: "Fases claras com entregas tangíveis e de baixo risco.",
    timelineDesc:
      "Estruturado para demonstrar avanço técnico contínuo e inserção assertiva no mercado de tecnologia do Paraná.",
    phases: [
      { period: "Meses 1–3", t: "Consolidação e Sandbox", d: "Otimizar o motor local em Rust e proxy Ollama com aceleração de hardware (GPU), estabilizando a sandbox e a integração XLSX nativa." },
      { period: "Meses 4–6", t: "Projetos-Piloto no Paraná", d: "Homologar a ferramenta em 5 pilotos em empresas reais e cooperativas da região de Curitiba. Medir a economia de tempo de auditoria e conformidade." },
      { period: "Meses 7–9", t: "Módulo de Governança DPO", d: "Desenvolver o painel de auditoria do DPO, permitindo relatórios em PDF locais e redação automatizada de dados pessoais sensíveis." },
      { period: "Meses 10–12", t: "Entrada Comercial e Homologação", d: "Embalar a versão comercial integrada (AetherNode), capturar clientes corporativos ativos e obter certificações de segurança locais." },
    ],
    metricsKicker: "métricas de fomento",
    metricsTitle: "Como vamos medir o sucesso do projeto.",
    metricsDesc:
      "Métricas claras exigidas em auditorias de fomento para provar viabilidade comercial, proteção de dados e produtividade.",
    metrics: [
      { tag: "produtividade", t: "Tempo de Processamento", d: "Reduzir o tempo de compilação de relatórios e análises de planilhas complexas em até 80% comparado ao fluxo manual." },
      { tag: "conformidade", t: "Vazamento Zero de Dados", d: "Processamento local por padrão para dados sensíveis em workspaces configurados, com tráfego externo apenas quando autorizado." },
      { tag: "mercado", t: "Tração de Clientes Beta", d: "Atingir pelo menos 20 clientes corporativos ativos utilizando a plataforma em ambiente corporativo até o 12º mês." },
    ],
  },
  REFERENCIAS: {
    kicker: "fontes",
    title: "Referências de engenharia, IA e privacidade.",
    lead:
      "Fontes usadas no site: estrutura semântica, dados estruturados, acessibilidade, crawlers de IA e privacidade.",
    introKicker: "materiais",
    introTitle:
      "O que a gente leu pra decidir como construir.",
    introDesc:
      "Referências públicas usadas na construção do AetherCore. Não implicam parceria ou endosso.",
    items: [
      { tag: "search", t: "Google Search Central", d: "Boas práticas de estrutura semântica, indexação e conteúdo útil." },
      { tag: "schema", t: "Schema.org", d: "Vocabulário pra Organization, WebSite, SoftwareApplication, FAQPage." },
      { tag: "acessibilidade", t: "WCAG 2.2", d: "Referência pra contraste, controle de movimento, foco e semântica." },
      { tag: "ai crawlers", t: "OpenAI Crawlers", d: "Política de acesso pra OAI-SearchBot, GPTBot e agentes controláveis via robots.txt." },
      { tag: "risk", t: "NIST AI RMF", d: "Base pra mapear e gerenciar riscos em sistemas de IA." },
      { tag: "cypherpunk", t: "A Cypherpunk's Manifesto", d: "Referência cultural: privacidade como escolha e autonomia técnica." },
    ],
  },
  DOSSIE: {
    kicker: "dossiê de fomento e viabilidade",
    title: ["AetherCore: Inteligência Local,", "Soberania de Dados", "e Conformidade Regulatória"],
    lead:
      "Documentação de maturidade tecnológica e viabilidade comercial desenhada para editais de inovação, investidores e comitês de homologação (ex: Centelha Paraná).",
    summaryKicker: "tese tecnológica e de mercado",
    summaryTitle: "O projeto estruturado em 6 pilares fundamentais.",
    blocks: [
      { tag: "01. problema", t: "Vazamento de dados corporativos via nuvem", d: "A pressa para usar IA faz funcionários colarem planilhas e minutas confidenciais em IAs públicas. Isso quebra NDAs e expõe a empresa a pesadas multas da LGPD." },
      { tag: "02. solução", t: "IA de agente local por padrão", d: "O AetherCore traz o processamento de IA para perto dos arquivos corporativos. O agente lê e processa planilhas, códigos e PDFs dentro do ambiente do usuário." },
      { tag: "03. inovação", t: "Arquitetura blindada e Human-in-the-Loop", d: "Motor local nativo em Rust com comunicação segura, isolamento de processos de runtime e logs estruturados em SQLite. Toda escrita ou conexão de rede exige aprovação ativa." },
      { tag: "04. mercado", t: "Foco em B2B regulado e cooperativismo", d: "Nosso mercado inicial foca em DPOs, escritórios jurídicos, auditorias e contabilidades corporativas. O Paraná oferece um setor cooperativo gigante que necessita dessa blindagem." },
      { tag: "05. maturidade", t: "19 meses de desenvolvimento contínuo", d: "Não somos um wrapper recente. A base tecnológica do AetherCore representa 19 meses de P&D focado em otimização de VRAM, segurança de sandboxes e IPC seguro, atingindo a robustez da v0.6.0." },
      { tag: "06. fomento", t: "Homologação e Módulo Multiusuário", d: "A subvenção do Centelha Paraná permitirá acelerar a homologação de segurança, realizar auditoria externa de código aberto e finalizar o painel corporativo do DPO." },
    ],
    planKicker: "cronograma de desenvolvimento de fomento",
    planTitle: "Roadmap e Metas Claras de Implementação (12 Meses)",
    plan: [
      { period: "Mês 1–3 (P&D Interno)", d: "Consolidação e polimento do motor local em Rust, refinamento da sandbox e suporte nativo ao XLSX com proxy Ollama otimizado (versão v0.6.0)." },
      { period: "Mês 4–6 (Validação Regional)", d: "Implementação de 5 pilotos controlados em cooperativas e escritórios no Paraná para medir ganho de tempo em auditoria de planilhas e assegurar vazamento zero." },
      { period: "Mês 7–9 (Módulo de Governança)", d: "Desenvolver o painel de auditoria do DPO, com logs locais estruturados criptografados e algoritmos locais para redação de dados sensíveis de clientes." },
      { period: "Mês 10–12 (Entrada Comercial)", d: "Preparação da embalagem comercial (AetherNode / OS), auditoria de segurança externa, captação de clientes iniciais e preparação de escala." },
    ],
  },
  PRICING: {
    kicker: "preços",
    title: ["Escolha o plano", "que cabe no seu", "fluxo de trabalho."],
    lead:
      "Comece pela demo beta, evolua para o app local com Qwen/Ollama e leve governança auditável para equipes quando fizer sentido.",
    annualLabel: "Cobrança anual",
    annualSaveLabel: "Economize até 20%",
    buttonLabel: "Começar agora",
    contactLabel: "Falar com a gente",
    plans: [
      {
        id: "free",
        name: "Aether Free",
        description: "Entrada beta para conhecer o fluxo sem instalar nada.",
        priceMonthly: 0,
        priceYearly: 0,
        users: "Demo guiada / Beta",
        recommended: false,
        features: [
          { label: "Acesso à lista beta e materiais de validação", included: true },
          { label: "Demo com dados de exemplo e tarefas leves", included: true },
          { label: "Sem instalação local obrigatória", included: true },
          { label: "Fluxo de aprovação humana demonstrável", included: true },
          { label: "Contato para diagnóstico de caso real", included: true },
          { label: "Sem uso com dados sensíveis de produção", included: false },
          { label: "Sem agente local persistente", included: false },
          { label: "Sem escrita em arquivos reais", included: false },
        ],
      },
      {
        id: "go",
        name: "Aether Go",
        description: "App desktop 100% local com Qwen/Ollama para produtividade individual.",
        priceMonthly: 99,
        priceYearly: 950,
        users: "1 usuário (Local)",
        recommended: true,
        features: [
          { label: "App desktop local com Qwen via Ollama", included: true },
          { label: "Modelo carregado sob demanda para economizar RAM", included: true },
          { label: "Leitura e escrita local avançada de XLSX/CSV", included: true },
          { label: "Ferramentas Rust para arquivos, busca e execução supervisionada", included: true },
          { label: "Execução local com aprovação humana", included: true },
          { label: "ARL local com histórico e rastreio de ações", included: true },
          { label: "Conexões externas apenas quando autorizadas", included: true },
          { label: "Uso condicionado ao hardware do dispositivo", included: true },
        ],
      },
      {
        id: "enterprise",
        name: "Aether Enterprise",
        description: "Governança, conformidade, permissões e logs para pequenos times.",
        priceMonthly: 449,
        priceYearly: 4310,
        users: "Workspace (Até 5 usuários base)",
        recommended: false,
        features: [
          { label: "Tudo do Aether Go", included: true },
          { label: "Workspace com até 5 usuários base", included: true },
          { label: "Dual-Control Audit Paradigm (aprovação dupla para ações de risco)", included: true },
          { label: "Módulos Voluntários de Conformidade (compliance com auditorias)", included: true },
          { label: "Permissões por usuário, pasta e tipo de ação", included: true },
          { label: "Logs ARL auditáveis e exportáveis criptografados", included: true },
          { label: "Implantação assistida em sandbox privada e suporte prioritário", included: true },
          { label: "Usuários adicionais sob consulta", included: true },
        ],
      },
      {
        id: "scale",
        name: "Aether Scale",
        description: "Implantação dedicada para ambientes corporativos privados e regulados.",
        priceMonthly: null,
        priceYearly: null,
        users: "Deploy Dedicado",
        recommended: false,
        features: [
          { label: "Deploy on-premise ou intranet isolada integralmente", included: true },
          { label: "Integrações personalizadas com APIs, bancos e fluxos internos", included: true },
          { label: "Políticas corporativas rígidas de governança e retenção", included: true },
          { label: "Auditoria sob demanda e logs locais sob medida", included: true },
          { label: "Treinamento, runbooks corporativos e suporte dedicado 24/7", included: true },
          { label: "Contratos e faturamento flexíveis de grande escala", included: true },
        ],
      },
    ],
  },
  PLUGINS: {
    kicker: "extensibilidade",
    title: ["Plugins", "AetherCore."],
    lead: "Expanda a inteligência do AetherCore conectando provedores locais e ferramentas externas com segurança local-first.",
    cardsTitle: "O que você pode conectar",
    cardsDesc: "Arquitetura aberta para integrar serviços locais. Criada com foco em rodar modularmente junto ao LocalAI.",
    cards: [
      {
        t: "Provedores (Providers)",
        d: "Integre o LocalAI para inferência local avançada (LLMs, áudio, imagens) de forma desacoplada do Kernel.",
        icon: "Plug",
        link: "https://localai.io"
      },
      {
        t: "Model Context Protocol (MCP)",
        d: "Conecte servidores MCP externos para importar contextos e ferramentas universais de forma padronizada.",
        icon: "Blocks",
        link: "https://modelcontextprotocol.io"
      },
      {
        t: "Ferramentas & RAG",
        d: "Adicione novas ações executáveis ao Kernel e conecte bancos de dados diretamente ao Memory Kernel local.",
        icon: "Cpu"
      }
    ],
    featuresTitle: "Segurança de Extensão",
    featuresDesc: "Controle estrito sobre o ciclo de vida dos plugins instalados.",
    features: [
      {
        title: "Manifesto plugin.json",
        desc: "Cada plugin declara explicitamente suas capacidades e as permissões de acesso requisitadas ao Kernel."
      },
      {
        title: "Isolamento por Workspace",
        desc: "Configurações e chaves ativas de plugins ficam restritas ao workspace do projeto atual."
      }
    ]
  },
  VALIDACAO: {
    kicker: "validação institucional · private hedge fund",
    title: ["Validação em", "Hedge Fund Offshore", "de ¥45M+ anuais."],
    lead: "Enquanto o mercado corporativo arrisca segredos de alto valor em nuvens públicas de Big Techs, a Pacific Palm Partners — private hedge fund de raízes italianas sediado no centro financeiro de Labuan (Malásia) que movimenta mais de 45 milhões de Yuans anuais — homologou a eficácia, a velocidade e o isolamento absoluto de dados do AetherCore.",
    stats: [
      { k: "¥45.000.000+", label: "Turnover Anual em RMB", sub: "Arbitragem e operações cross-border offshore" },
      { k: "0 Bytes", label: "Vazados para Nuvem", sub: "Execução 100% local com isolamento criptográfico" },
      { k: "82%", label: "Redução de Tempo", sub: "Auditoria e cruzamento de planilhas complexas" },
      { k: "Labuan IBFC", label: "Jurisdição Offshore", sub: "Hub financeiro internacional da Malásia" }
    ],
    partner: {
      name: "Pacific Palm Partners",
      sector: "Capital de risco e participações privadas · Private Hedge Fund",
      tagline: "Private Hedge Fund & Cross-Border Digital Strategy",
      location: "Labuan, Malaysian Federal Territory of Labuan (Labuan IBFC)",
      origin: "Origens e governança estratégica italiana",
      linkedinUrl: "https://www.linkedin.com/company/pacific-palm-partners",
      logoUrl: "/assets/img/brand/pacific-palm-logo.png",
      description: "Operação financeira institucional focada em alinhar estratégia digital com objetivos de investimento global, capturando oportunidades de mercado cross-border e eficiências operacionais impulsionadas por tecnologia de ponta."
    },
    founderRole: {
      kicker: "atuação executiva do fundador",
      title: "Arquitetura Digital em Finanças Globais",
      subtitle: "Matheus Peres da Silva · Estratégia Digital & Análise de Portfólio",
      workplace: "Private Hedge Fund — Labuan, Malaysia",
      duties: [
        {
          title: "Alinhamento de Estratégia Digital & Investimentos Globais",
          desc: "Engajado no alinhamento de estratégia digital com objetivos de investimento global, focando em eficiências orientadas por tecnologia e oportunidades de mercado cross-border."
        },
        {
          title: "Análise de Portfólio & Transformação Digital",
          desc: "Contribui para análise de portfólio, iniciativas de transformação digital e projetos orientados à inovação projetados para conectar o mercado financeiro tradicional à moderna análise de dados."
        },
        {
          title: "Tendências Emergentes & Crescimento de Ativos",
          desc: "Trabalho próximo aos sócios seniores na identificação de tendências em mercados emergentes, otimização de frameworks operacionais e suporte ao crescimento de ativos a longo prazo por meio de inteligência digital estratégica."
        }
      ]
    },
    stressTest: {
      kicker: "o teste de fogo · auditoria de alto impacto",
      title: "Por que a IA comum quebra e o AetherCore venceu.",
      desc: "No mercado de hedge funds offshore e arbitragem de ¥45M+ por ano, um único vazamento de posição financeira ou planilha estratégica para data centers de terceiros causaria prejuízos catastróficos. Veja como o AetherCore foi validado em campo.",
      pillars: [
        {
          n: "01",
          tag: "Sigilo Offshore Absoluto",
          title: "Zero Exposição a Servidores Estrangeiros",
          desc: "A Pacific Palm Partners opera sob estrito sigilo de dados financeiros. Todas as análises de valuation, fluxos de câmbio em Renminbi (RMB) e balanços foram processados 100% no hardware local, sem disparar uma única requisição HTTP para fora.",
          badge: "100% Offline Validated"
        },
        {
          n: "02",
          tag: "Velocidade em Rust",
          title: "Auditoria Instantânea de XLSX Complexos",
          desc: "Planilhas densas de portfólio com dezenas de milhares de linhas e fórmulas cruzadas foram processadas, auditadas e sumarizadas em segundos pelos motores nativos em Rust do AetherCore, acelerando decisões dos sócios seniores.",
          badge: "82% Ganho de Velocidade"
        },
        {
          n: "03",
          tag: "Human-in-the-Loop",
          title: "Aprovação Física Obrigatória",
          desc: "No setor financeiro, alucinações de IA geram prejuízo real. O AetherCore nunca escreve em arquivos ou toma ações sem a confirmação explícita do operador humano na tela de aprovação com escopo e cálculo de risco.",
          badge: "Controle Total do Operador"
        },
        {
          n: "04",
          tag: "Imunidade Regulatória",
          title: "Governança Blindada Cross-Border",
          desc: "Trilha de auditoria local em SQLite gravando cada arquivo tocado e cada cálculo efetuado, permitindo auditorias contábeis e fiscais imediatas com confiabilidade matemática e jurídica absoluta.",
          badge: "Audit Trail Imutável"
        }
      ]
    },
    verdict: {
      kicker: "veredito institucional",
      quote: "O AetherCore provou em produção o que nenhuma Big Tech consegue entregar: a capacidade de raciocinar sobre dados financeiros ultra-sensíveis e planilhas multimilionárias sem enviar um único bit para a nuvem. Eficácia, velocidade e soberania validadas no mais alto padrão de exigência offshore.",
      author: "Pacific Palm Partners — Labuan IBFC",
      badge: "Eficácia e Segurança Homologadas"
    },
    terminal: {
      kicker: "telemetria de stress test",
      title: "Registro de Auditoria de Portfólio Offshore",
      filename: "cross_border_portfolio_audit_v06.rs",
      badge: "Sandbox Ativa · Zero Vazamento",
      lines: [
        "[KERNEL] Initializing local memory sandbox for Pacific Palm Partners (Labuan IBFC)...",
        "[AUTH] Operator: Matheus Peres da Silva · Role: Digital Strategy & Portfolio Insight",
        "[ENV] Target Volume: ¥45,000,000.00 RMB · Cross-border Asset Allocation",
        "[SANDBOX] Ingesting 14 encrypted XLSX/CSV balance sheets and currency matrices...",
        "[COMPUTE] Local Qwen + Rust IPC executing quantitative anomaly detection...",
        "[NETWORK] External network interface: HARD BLOCKED (0 packets sent / 0 received)",
        "[ARL-AUDIT] Processing latency: 142ms · VRAM utilization: 2.1 GB · 0 cloud fallback",
        "[STATUS] 100% local validation successful. Human-in-the-loop signoff verified."
      ]
    }
  }
};

export const CONTENT_EN = {
  BRAND: {
    name: "AetherCore",
    version: "v0.6.0 · beta",
    tagline: "local AI / beta",
    copyright: "© 2026 AetherCore. Local-first AI. Curitiba, Brazil. Contact: business@exvorn.tech",
  },
  NAV_LINKS: [
    { label: "Home", to: "/" },
    { label: "Ecosystem", to: "/ecossistema" },
    { label: "About", to: "/sobre" },
    { label: "Validation", to: "/validacao" },
    { label: "Product", to: "/produto" },
    { label: "Sustainability", to: "/sustentabilidade" },
    { label: "Blog", to: "/blog" },
    { label: "Pricing", to: "/precos" },
    { label: "Architecture", to: "/arquitetura" },
    { label: "Plugins", to: "/plugins" },
    { label: "Solutions", to: "/casos-de-uso" },
    { label: "Principles", to: "/principios" },
    { label: "FAQ", to: "/faq" },
  ],
  FOOTER_LINKS: [],
  HOME: {
    badge: "v0.6.0 · beta",
    heroStatus: "Local system · full access",
    aether: {
      eyebrow: "Autonomous Agent Platform",
      eyebrowRight: "EST. 2025 — v0.6.0",
      headline: { l1: "Beyond", l2: "Automation.", l3a: "Pure", l3b: "Cognition" },
      sub: "AetherCore replaces rigid workflows with a local AI nervous system — thinking, adapting, and executing at the speed of your ambition. Nothing leaves your device without your knowledge.",
      consoleLabel: "AetherCore Console",
      consoleLive: "Live Agent Mesh",
      scrollBadge: "Scroll to explore • AetherCore •",
      chapters: [
        { n: "01", title: "The End of Scripts", body: "Goodbye to rigid 'if-then' logic. Agents reason about ambiguity instead of breaking with it." },
        { n: "02", title: "Autonomous Execution", body: "Millisecond decisions, verified by you. From triage to deployment, with end-to-end human approval." },
        { n: "03", title: "Local by Default", body: "An agent that learns your operational cadence and gets sharper with every cycle — without anything leaving your machine." },
      ],
      marquee: ["AETHERCORE", "THE NEW STANDARD FOR AUTONOMOUS AGENTS", "LOCAL COGNITION"],
    },
    heroRotate: ["execute.", "plan.", "review.", "audit.", "automate."],
    heroChipsLabel: "what already works",
    heroChips: [
      { t: "Local Qwen", icon: "Cpu" },
      { t: "XLSX and CSV", icon: "Table2" },
      { t: "Local files", icon: "HardDrive" },
      { t: "Human approval", icon: "ShieldCheck" },
      { t: "Auditable logs", icon: "ClipboardCheck" },
      { t: "Local by default", icon: "HardDrive" },
    ],
    titleLead: "Agents that",
    titleEm: "autonomous.",
    titleEnd: "Absolute control.",
    primaryCta: "Request early access",
    secondaryCta: "See the first XLSX case",
    lead:
      "AetherCore reads your files, runs tasks on your machine, and requests approval before modifying anything sensitive. Nothing leaves your device without your knowledge.",
    metrics: [
      { k: "Local", v: "on-device files" },
      { k: "Review", v: "human approval" },
      { k: "Agentic", v: "plans & uses tools" },
    ],
    pillars: [
      { t: "Local-first", d: "runs on device" },
      { t: "Human-in-the-loop", d: "you approve" },
      { t: "Audit trail", d: "fully logged" },
    ],
    whatIsAether: {
      kicker: "what does aether do?",
      title: "Your working AI, local by default.",
      desc: "It does everything the famous cloud AIs do, but isolated in your environment. Develop, research, and analyze without sharing data.",
      cards: [
        { t: "Chat & Writing", d: "Chat and draft documents using advanced SOTA models.", icon: "MessageSquareText" },
        { t: "Code Generation", d: "Code autonomously with local file editing tools in a sandbox.", icon: "Code2" },
        { t: "Data Analysis", d: "Crunch complex spreadsheets with total local security.", icon: "Table2" },
        { t: "Web Search", d: "The agent searches external data only when you authorize.", icon: "Globe" },
      ]
    },
    stackKicker: "technical foundation",
    stackTitle: "What runs underneath.",
    stackDesc:
      "Models run on your machine, tools are opened locally, permissions stay with you. Zero external server requirement.",
    stackCredit:
      "Logos shown for reference only. No partnership or endorsement implied. AetherCore is independent.",
    mapKicker: "sitemap",
    mapTitle: "Explore the site.",
    mapDesc:
      "Start at home. Each section has its own page so you can jump straight to what you need.",
    map: [
      { t: "Product & MVP", d: "The local agent, our first XLSX use-case, and what already works.", to: "/produto", span: "lg:col-span-7" },
      { t: "How it works internally", d: "Core, execution lifecycle, and human approval gateway.", to: "/arquitetura", span: "lg:col-span-5" },
      { t: "B2B Solutions", d: "Legal, finance, compliance, and sensitive SMB operations.", to: "/casos-de-uso", span: "lg:col-span-4" },
      { t: "FAQ & Governance", d: "Frequently asked questions about local AI and compliance.", to: "/faq", span: "lg:col-span-4" },
      { t: "Principles & Privacy", d: "Privacy as a technical architecture design, not marketing.", to: "/principios", span: "lg:col-span-4" },
    ],
    synthKicker: "commercial summary",
    synthTitle:
      "An AI that gets work done, for companies that cannot leak data.",
    synthDesc:
      "Starting with spreadsheets, but already reads documents, generates reports, and runs automated pipelines. All with approval.",
    synth: [
      {
        tag: "The Problem",
        t: "Sensitive data scattered across third-party tools",
        d: "Critical information ends up on external servers, with zero control over who accesses it or how it is stored.",
      },
      {
        tag: "The Solution",
        t: "AI running close to your files",
        d: "AetherCore processes everything on-device. If it needs to perform a risky action, it prompts for approval first.",
      },
      {
        tag: "Inception",
        t: "First Use Case: Spreadsheets",
        d: "Complex Excel spreadsheets turn into insights and reports without ever leaving your machine.",
      },
    ],
  },
  CTA: {
    kicker: "early access",
    title: "Want to try it before everyone else?",
    desc:
      "Want to get closer to the project? Send an email to business@exvorn.tech or reach out directly to the founder on LinkedIn. No forms, no queues, just a real conversation.",
    notice: "📬 Business contact: business@exvorn.tech · Or reach us on LinkedIn.",
    linkedinButton: "Talk to the CEO on LinkedIn",
    button: "Join beta list",
    details: [
      { k: "access", v: "invite-only" },
      { k: "location", v: "Curitiba / remote" },
      { k: "contact", v: "business@exvorn.tech" },
      { k: "security", v: "human approved" },
    ],
  },
  PRODUTO: {
    kicker: "local agent & MVP",
    title: ["AI running on your machine", "actually getting work done", "with your files."],
    lead:
      "AetherCore understands your instructions, creates a plan, reads and writes files, utilizes local tools, and requests approval before executing anything risky. Our XLSX MVP is the first proof of this running.",
    solutionKicker: "what it does",
    solutionTitle: "AI comes to your files.",
    solutionDesc:
      "You don't send files to external clouds. AetherCore executes everything locally, with dedicated tools and approval checks.",
    blocks: [
      {
        n: "01",
        tag: "Local Memory",
        t: "Your files stay here",
        d: "PDFs, spreadsheets, contracts, and code reside on your device. The agent accesses them as workspace context, with zero cloud uploads.",
        points: ["organized workspaces", "document relationships", "tracked changes"],
      },
      {
        n: "02",
        tag: "Working Agent",
        t: "Understand, execute, refine",
        d: "The agent splits your prompt into a logical plan, calls the right tools, evaluates outcomes, and adjusts. This isn't a disposable chat window.",
        points: ["action planning", "tool integration", "outcome evaluation"],
      },
      {
        n: "03",
        tag: "Permissions",
        t: "Nothing exits without consent",
        d: "Any sensitive action (sending data, writing files) prompts a review card showing scope, risks, and reasoning before execution.",
        points: ["approval gating", "clear boundaries", "audit history"],
      },
    ],
    offeringsKicker: "product + business",
    offeringsTitle: "One agent, four tiers.",
    offeringsDesc:
      "From a free temporary sandbox to dedicated on-premise deployments. The same secure local AI engine with human approval, sized for your data requirements.",
    offerings: [
      {
        name: "Aether Free",
        audience: "To experiment",
        t: "Try the agent without installing anything.",
        d: "Cloud-hosted web agent inside a temporary sandbox. Ideal for testing lightweight workflows before setting up local execution.",
        points: ["limited web sandbox", "daily credits included", "no local data access"],
      },
      {
        name: "Aether Go",
        audience: "For individuals",
        t: "For day-to-day productivity.",
        d: "Full local agent for productivity. Reads and writes XLSX, runs locally with human approval, and supports unlimited files.",
        points: ["full local agent", "native XLSX read/write", "local execution"],
      },
      {
        name: "Aether Enterprise",
        audience: "For teams",
        t: "For companies managing sensitive information.",
        d: "Workspace with up to 5 base users, audit trails, granular team permissions, and automated compliance reports.",
        points: ["audit trail logs", "team permissions", "corporate governance"],
      },
      {
        name: "Aether Scale",
        audience: "Dedicated deploy",
        t: "Large-scale operations with maximum compliance.",
        d: "Autonomous on-premise deployment with dedicated SLA, custom integrations, and tailored licensing. Full infrastructure sovereignty.",
        points: ["autonomous on-premise", "24/7 dedicated support", "custom pricing"],
      },
    ],
    greenKicker: "sustainable ai / green ai",
    greenTitle: "Ecological sovereignty and energy efficiency.",
    greenDesc: "Centralized cloud AIs consume gigawatts of electricity and tons of water to cool data centers. AetherCore executes locally, utilizing the infrastructure your enterprise is already running.",
    greenCards: [
      { t: "Water Footprint", d: "A single interaction of 20 to 50 messages with cloud-based AI models consumes roughly 500ml of fresh water for server cooling.", icon: "Droplet" },
      { t: "Carbon Savings", d: "Inference (daily query use) accounts for 80% to 90% of AI's total carbon emissions. Local execution avoids network hops and high-intensity centralized compute grids.", icon: "Wind" },
      { t: "Reclaimed Infrastructure", d: "Instead of building carbon-heavy data centers, AetherCore deploys on the hardware and intranet servers your company already keeps powered.", icon: "Server" },
    ],
    flowKicker: "workflow",
    flowTitle: "From request to delivery",
    flowDesc:
      "Specify a task; Aether reads the local context, runs the necessary steps, and outputs a draft for your review.",
    flow: [
      { n: "1", t: "Context definition", d: "Select a spreadsheet, document, folder, or local database." },
      { n: "2", t: "Plan execution", d: "Aether selects local tools, executes steps, and assesses write/net risks." },
      { n: "3", t: "Output generation", d: "Get a summary, updated report, or draft ready for your review." },
    ],
  },
  ARQUITETURA: {
    kicker: "architecture",
    title: ["Runs locally,", "prompts for approval,", "logs everything."],
    lead:
      "How local execution is designed, what the approval gateway covers, and which modules keep your data safe.",
    loopKicker: "execution loop",
    loopTitle: "From file access to logs.",
    loopDesc:
      "The agent plans, validates, executes, and records. A closed loop on-device with visual feedback.",
    loop: [
      { tag: "Files", t: "Select workspaces.", d: "Mount a workspace with PDFs, Excel sheets, code, and notes. The agent analyzes structure and imports only needed context.", chip: "Workspace initialized" },
      { tag: "Plan", t: "Review the plan first.", d: "The planner outlines the task steps, the local tools required, and the expected side effects before running.", chip: "Plan visible before run" },
      { tag: "Approval", t: "You have final say.", d: "The approval prompt displays danger ratings, write scopes, and explanations. If you deny, execution halts.", chip: "Write/Net gated" },
      { tag: "Execution", t: "Run and record.", d: "Natively compiled Rust tools execute the step, retrieve the output, and write details to an immutable local database.", chip: "Output generated + logged" },
    ],
    capsKicker: "capabilities",
    capsTitle: "System features.",
    capsDesc:
      "Eight functional layers keeping operations local, logged, governed, and secure.",
    caps: [
      { n: "01", tag: "local", t: "Local-First AI", d: "Writing, reasoning, and analysis run directly on-device, without sending work data to public clouds." },
      { n: "02", tag: "audit", t: "Immutable Logs", d: "Every directory read, file write, or shell tool call is recorded locally for auditing." },
      { n: "03", tag: "govern", t: "Directory Control", d: "A local SQLite database controls exactly which folders and files the agent has access to." },
      { n: "04", tag: "xlsx", t: "Spreadsheet Engine", d: "Reads, writes, and merges XLSX and CSV files natively, keeping financial data safe." },
      { n: "05", tag: "human", t: "Human-in-the-Loop", d: "All write and network calls are blocked by default. They execute only with physical approval." },
      { n: "06", tag: "network", t: "Optional Uplinks", d: "Web search and external API tasks occur only when explicitly authorized on a per-task basis." },
      { n: "07", tag: "security", t: "Credential Redaction", d: "Local parsers automatically redact API keys, personal info, and tokens from readable logs." },
      { n: "08", tag: "insights", t: "Automated Reporting", d: "Complex spreadsheet data turns into polished executive summaries and PDF reports on-device." },
    ],
    releaseKicker: "release notes",
    releaseTitle: "v0.6.0 — capability guards & model resolution.",
    releaseDesc:
      "Completed Phase 7 of the Execution Kernel: introduced Capability Guards (predictive validation), strict model resolution hierarchy, and clear abort policy with zero silent cloud fallbacks.",
    releaseTags: ["Capability Guards", "Model Resolution", "Kernel Security", "Zero Cloud Fallback"],
  },
  CASOS: {
    kicker: "solutions",
    title: ["Local AI built for", "highly regulated", "businesses."],
    lead:
      "The ultimate defense against data leaks and LGPD compliance penalties: a local, governed agent designed to keep corporate data strictly private.",
    problemKicker: "compliance liability",
    problemTitle: "The massive risks of using public cloud chatbots in enterprise.",
    problemDesc:
      "Pasting customer records, contracts, and financial spreadsheets into cloud AI engines violates Brazilian LGPD data laws. AetherCore solves this liability at the architecture level.",
    steps: [
      { n: "01", tag: "the liability", t: "Data Leaks & GDPR/LGPD Fines", d: "Centralized chatbots collect, process, and retain confidential company data outside your firewall, inviting regulatory fines and NDA breaches.", points: ["customer data exposure", "ANPD/GDPR sanctions", "corporate NDA breaches"] },
      { n: "02", tag: "the defense", t: "Local-First Sovereignty", d: "AetherCore processes all sensitive materials inside the user's local operating system. No company secrets or client records exit the device.", points: ["isolated data environments", "zero cloud telemetry", "hardened shell"] },
      { n: "03", tag: "immunity", t: "Immutable Audit Trails", d: "Every operation is checked and logged locally. The agent operates under a strict consent model, keeping your DPO in full control.", points: ["human-in-the-loop gate", "auditable local DB", "preventative security"] },
    ],
    compareKicker: "risk comparison",
    compareTitle: "AetherCore vs Public Chatbots.",
    compareDesc:
      "Why cloud assistant tools are compliance liabilities and how AetherCore protects your enterprise.",
    compare: [
      { feat: "LGPD/GDPR Compliance", cloud: "Non-compliant with strict policies; exposes customer data to third-party cloud data centers.", aether: "Fully compliant. Customer records and logs stay on-premise under your DPO's governance." },
      { feat: "Data Privacy & Control", cloud: "Requires uploading files and database contexts to external networks.", aether: "Local-first priority. Confidential assets never leave the physical computer." },
      { feat: "Task Automation", cloud: "Limited to conversational answers inside a generic linear chat interface.", aether: "Executes complex agentic workflows, edits files, and manipulates sheets locally." },
      { feat: "Audit Logs", cloud: "Zero transparency on how data is handled or processed in the background.", aether: "Logs every read, write, or system command into a local database." },
      { feat: "Safety Boundaries", cloud: "Executes prompts freely, potentially making dangerous edits or assumptions.", aether: "Gated writes. Requires explicit user approval for any file write or web request." },
      { feat: "Uptime & Resilience", cloud: "Completely unavailable if there is an internet outage or server downtime.", aether: "Processes locally by default. Suitable for governed intranet environments and remote field audits." },
    ],
    audienceKicker: "target audience",
    audienceTitle: "Engineered for highly sensitive industries.",
    audienceDesc:
      "Sectors where data confidentiality and regulatory compliance are not optional, but legal obligations.",
    audience: [
      { t: "DPOs & Compliance Officers", d: "Ensure staff aren't pasting corporate secrets or customer files into external cloud systems, violating local privacy laws." },
      { t: "Legal & Corporate Counsel", d: "Review sensitive contracts, NDAs, and case files without breaching client privilege or disclosing intellectual property." },
      { t: "Finance, Audit & Accounting", d: "Crunch multi-client financial sheets and cashflows knowing numbers remain strictly inside your corporate network." },
      { t: "Cooperatives & Regional Enterprises", d: "Deploy automation features for members and employees while matching strict enterprise governance." },
    ],
  },
  PRINCIPIOS: {
    kicker: "product principles",
    title: "Privacy is not a feature. It's an architecture decision.",
    lead:
      "Local execution, auditable logs, and human-in-the-loop design. Software must return control to the user.",
    manifestoKicker: "manifesto",
    manifestoTitle:
      "Exposed in the interface: rules, logs, and undoable actions.",
    manifestoDesc:
      "Not a marketing slogan. We process locally by default, block network calls by default, and log everything.",
    items: [
      { n: "01", tag: "control", t: "Data belongs close to its creator.", d: "Spreadsheets, contracts, and internal audits reside on your hardware, processed where they were born." },
      { n: "02", tag: "consent", t: "External connections are exceptions.", d: "Web search, cloud API integration, and writes only execute when explicitly approved by the user." },
      { n: "03", tag: "transparency", t: "Automation requires auditability.", d: "An agent must log its goals, the files it accessed, the commands it ran, and the choices it made." },
      { n: "04", tag: "minimization", t: "Minimal data scope.", d: "The system reads only the needed directories and files, minimizing data exposure while solving the task." },
      { n: "05", tag: "human command", t: "AI proposes. You approve.", d: "The human operator holds the key to critical actions. You are the commander, not a passenger." },
      { n: "06", tag: "code as defense", t: "Privacy requires code, not promises.", d: "Inspired by cypherpunk ideals: good intentions are not enough. We must build technical locks." },
    ],
  },
  SUSTENTABILIDADE: {
    kicker: "sustainable ai / green ai",
    title: ["Ecological sovereignty", "and energy efficiency", "for artificial intelligence."],
    lead: "Centralized cloud models consume gigawatts of electricity and tons of water for server cooling. AetherCore provides an eco-friendly alternative by running locally on existing hardware.",
    cardsTitle: "The Environmental Cost of Cloud AI",
    cardsDesc: "How daily queries to centralized chatbots affect the planet, and how local processing acts as a solution.",
    cards: [
      { t: "Water Footprint", d: "A single interaction of 20 to 50 messages with cloud-based AI models consumes roughly 500ml of fresh water for server cooling.", icon: "Droplet" },
      { t: "Carbon Savings", d: "Inference (daily query use) accounts for 80% to 90% of AI's total carbon emissions. Local execution avoids network hops and high-intensity centralized compute grids.", icon: "Wind" },
      { t: "Reclaimed Infrastructure", d: "Instead of building carbon-heavy data centers, AetherCore deploys on the hardware and intranet servers your company already keeps powered.", icon: "Server" },
    ],
  },
  SOBRE: {
    kicker: "about us / team",
    title: ["Symmetric design:", "robust code and", "scientific rigor."],
    lead: "AetherCore is built upon a twin engine of innovation: advanced local-first software engineering and federal statistical validation.",
    teamTitle: "Execution Team & Advisors",
    teamDesc: "Meet the minds behind the project returning data sovereignty to enterprises.",
    members: [
      {
        name: "Matheus Peres da Silva",
        role: "Founder & CEO / Principal Systems Architect",
        bio: "Rust and WebAssembly developer specialized in local sandboxing and secure local orchestration of LLMs. Designed AetherCore under the premise that the best way to protect sensitive data is to never let it touch third-party clouds.",
      },
      {
        name: "Specialist in Statistical Modeling & Methodology",
        role: "Voluntary Technical Advisor",
        bio: "Voluntary advisor with solid foundations in national statistical research. Started his practical career as a field census surveyor (NPE), gaining direct experience in territorial mapping and frontline data collection before establishing himself as a tenured statistician at IBGE. Provides strictly personal, advisory-only technical support (no equity holding, no management duties, and R$ 0.00 funding allocation), ensuring complete compliance under Law 8.112/90 to guide the system's mathematical integrity and local data sampling models.",
      }
    ],
    twinTitle: "Dual-Control Audit Paradigm",
    twinDesc: "AetherCore is built on the principle of strict separation between code execution and data auditing. Technical sandbox integrity and Rust systems development are led by the founder. Mathematical accuracy and sampling models are validated externally and voluntarily by his identical twin brother, a federal career statistician. This biological and analytical redundancy introduces official scientific data rigor to the platform, ensuring complete legal compliance and corporate separation.",
  },
  FAQ: {
    kicker: "FAQ & governance",
    title: ["Frequently asked questions", "about local AI", "and sensitive data."],
    lead:
      "Direct answers about features, privacy, files, and our human approval gate.",
    items: [
      { q: "What is local-first AI?", a: "It is an AI designed to run directly on the user's device or private servers, reducing data transmission to third parties." },
      { q: "Is it only for spreadsheets?", a: "No. Spreadsheets are our launch case because they validate native read/write workflows and offer high B2B value, but AetherCore works on general files, code, and PDFs." },
      { q: "Why start with local spreadsheets?", a: "Spreadsheets contain critical financial, client, and sales data that companies cannot afford to expose. It's the perfect test for secure local execution." },
      { q: "Does this replace a chatbot?", a: "It goes beyond. AetherCore acts as an agent: it creates plans, runs local commands, reads/writes files, and logs tasks under human approval. Chatbots just talk." },
      { q: "Are my files uploaded to the cloud?", a: "No. On-device execution is the default. External connections are optional, disabled by default, and require explicit permission." },
      { q: "Who is this built for?", a: "Enterprises, DPOs, accountants, legal teams, and auditors dealing with sensitive reports and client data." },
    ],
  },
  PRIVACIDADE: {
    kicker: "trust center",
    title: "Privacy, control, and local execution.",
    lead:
      "How AetherCore handles your files: strict scopes, consent-driven actions, local logs, and local execution.",
    policyKicker: "technical policy",
    policyTitle: "Reducing exposure at the code level before promising safety.",
    policyDesc:
      "This is a technical summary of our beta rules. These principles are built directly into our codebase to enforce data sovereignty.",
    cards: [
      { tag: "local-first", t: "Processes close to files", d: "We focus on local processing of spreadsheets and assets to remove the need for cloud data sharing." },
      { tag: "approval", t: "Gated sensitive actions", d: "File writes, shell commands, and web connections prompt an approval card explaining risks and reasoning." },
      { tag: "logs", t: "Local telemetry only", d: "Telemetry is logged to a local SQLite db for your review. No tracking reports are sent to external servers." },
      { tag: "secrets", t: "Token redaction", d: "Local parsers scan and redact API tokens, passwords, and identifiers from readable text logs." },
      { tag: "transparency", t: "Explicit external links", d: "Any external request (like web searches) displays the destination domain and payloads before sending." },
      { tag: "boundaries", t: "Beta safety limits", d: "AetherCore focuses on minimizing risk, but does not guarantee absolute software invulnerability." },
    ],
  },
  ROADMAP: {
    kicker: "execution plan",
    title: "Consolidation & B2B Go-to-Market Timeline",
    lead:
      "A 12-month timeline focused on software robustness, regional compliance validation, and B2B corporate customer growth.",
    timelineKicker: "timeline",
    timelineTitle: "Structured phases with clear technical milestones.",
    timelineDesc:
      "Designed to demonstrate constant development velocity and safe integration into enterprise networks.",
    phases: [
      { period: "Months 1–3", t: "Core & Sandbox Polish", d: "Refine the native Rust runtime and Ollama proxy with GPU acceleration. Stabilize local file sandboxing and XLSX write drivers." },
      { period: "Months 4–6", t: "Regional Pilot Runs", d: "Deploy and validate AetherCore in 5 pilot organizations (cooperatives and law firms) in Curitiba. Benchmark time savings and audit logs." },
      { period: "Months 7–9", t: "DPO Compliance Suite", d: "Build the DPO auditor panel, providing automated local PDF reports and local algorithms to redact sensitive customer data." },
      { period: "Months 10–12", t: "Commercial Packaging & Scale", d: "Finalize the AetherNode hardware appliance deployment model, perform external code security audits, and acquire commercial accounts." },
    ],
    metricsKicker: "funding metrics",
    metricsTitle: "How we track development success.",
    metricsDesc:
      "Explicit key performance indicators (KPIs) to evaluate technological readiness, speed, and privacy compliance.",
    metrics: [
      { tag: "productivity", t: "Report Compile Speed", d: "Cut manual data auditing and spreadsheet report generation times by up to 80% using the local agent." },
      { tag: "compliance", t: "Zero Telemetry Leaks", d: "Maintain a local-by-default loop for workspaces, with external transmissions blocked unless explicitly authorized." },
      { tag: "traction", t: "Active Beta Workspaces", d: "Grow to 20+ active corporate pilot environments using the local agent for internal operations by Month 12." },
    ],
  },
  REFERENCIAS: {
    kicker: "references",
    title: "Engineering, AI, and privacy resources.",
    lead:
      "Sources and frameworks guiding AetherCore: semantic structure, schema, accessibility, and AI risk models.",
    introKicker: "materials",
    introTitle:
      "Frameworks that shaped our engineering decisions.",
    introDesc:
      "Public documents and specifications referenced during our development. No endorsement implied.",
    items: [
      { tag: "search", t: "Google Search Central", d: "Guidelines for semantic structure, indexing, and crawling best practices." },
      { tag: "schema", t: "Schema.org", d: "Structured vocabulary schemas for software, FAQ pages, and organization profiles." },
      { tag: "accessibility", t: "WCAG 2.2", d: "Contrast ratios, focus controls, keyboard navigation, and semantic HTML specifications." },
      { tag: "crawlers", t: "OpenAI Crawlers Policy", d: "Handling agent access controls and web search boundaries via robots.txt configuration." },
      { tag: "risk", t: "NIST AI RMF", d: "Artificial Intelligence Risk Management Framework for security, safety, and auditing." },
      { tag: "cypherpunk", t: "A Cypherpunk's Manifesto", d: "Cultural reference: privacy as an active, technical design choice, not a marketing promise." },
    ],
  },
  DOSSIE: {
    kicker: "feasibility & grant dossier",
    title: ["AetherCore: Local Intelligence,", "Data Sovereignty", "and Regulatory Compliance"],
    lead:
      "Detailed technology readiness and commercial viability dossier designed for innovation grant committees, compliance officers, and partners (e.g., Centelha Paraná).",
    summaryKicker: "technological & market thesis",
    summaryTitle: "The project structured across 6 core pillars.",
    blocks: [
      { tag: "01. problem", t: "Corporate data leaks via public cloud APIs", d: "Employees paste financial spreadsheets and legal drafts into public cloud systems, breaching corporate NDAs and exposing the company to major data privacy fines." },
      { tag: "02. solution", t: "Local-by-default agentic AI workspace", d: "AetherCore brings advanced AI capabilities directly to the local hardware. The agent processes complex XLSX data, PDFs, and scripts inside the local OS." },
      { tag: "03. innovation", t: "Rust Native Engine & Human-in-the-Loop", d: "Natively compiled Rust core with custom IPC communication and SQLite audit trail. Every write command or external connection is blocked until approved." },
      { tag: "04. market", t: "B2B compliance & regional cooperatives", d: "Our initial target covers DPOs, legal councils, and financial audits. Paraná offers a massive cooperative and agribusiness market requiring strict compliance." },
      { tag: "05. maturity", t: "19 months of active R&D foundation", d: "This is not a simple cloud wrapper. AetherCore represents 19 months of deep R&D in local VRAM management, secure sandboxing, and native IPC communication, reaching v0.6.0." },
      { tag: "06. grant target", t: "DPO Suite & Enterprise Expansion", d: "The Centelha Paraná grant will accelerate safety certification, enable external open-source code audits, and complete our team governance console." },
    ],
    planKicker: "grant development timeline",
    planTitle: "Roadmap and Execution Milestones (12 Months)",
    plan: [
      { period: "Months 1–3 (R&D)", d: "Consolidate local Rust runtime, optimize Ollama proxy for GPU/VRAM performance, and release stable XLSX local write drivers (version v0.6.0)." },
      { period: "Months 4–6 (Validation)", d: "Deploy 5 pilot runs in agricultural cooperatives and law offices in Paraná to measure audit time savings and ensure zero cloud data leakage." },
      { period: "Months 7–9 (DPO Panel)", d: "Develop the DPO dashboard, incorporating local encrypted audit logs and local PII data masking algorithms." },
      { period: "Months 10–12 (Commercial)", d: "Package the enterprise bundle (AetherNode hardware appliance), complete external code security audits, and sign first commercial accounts." },
    ],
  },
  PRICING: {
    kicker: "pricing",
    title: ["Select the plan", "that fits your", "work structure."],
    lead:
      "Start with the beta demo, move into the local Qwen/Ollama app, and add auditable governance for teams when the workflow is ready.",
    annualLabel: "Billed annually",
    annualSaveLabel: "Save up to 20%",
    buttonLabel: "Get started",
    contactLabel: "Contact us",
    plans: [
      {
        id: "free",
        name: "Aether Free",
        description: "Beta entry point to understand the workflow before installing.",
        priceMonthly: 0,
        priceYearly: 0,
        users: "Guided demo / Beta",
        recommended: false,
        features: [
          { label: "Beta waitlist and validation materials", included: true },
          { label: "Demo with sample data and lightweight tasks", included: true },
          { label: "No local installation required", included: true },
          { label: "Human approval flow demonstration", included: true },
          { label: "Contact for real-use-case triage", included: true },
          { label: "No sensitive production data", included: false },
          { label: "No persistent local agent", included: false },
          { label: "No writes to real local files", included: false },
        ],
      },
      {
        id: "go",
        name: "Aether Go",
        description: "100% local desktop app with Qwen/Ollama for individual productivity.",
        priceMonthly: 99,
        priceYearly: 950,
        users: "1 User (Local)",
        recommended: true,
        features: [
          { label: "Local desktop app with Qwen through Ollama", included: true },
          { label: "On-demand model loading to reduce idle RAM", included: true },
          { label: "Advanced local XLSX/CSV read and write workflows", included: true },
          { label: "Rust tools for files, search, and supervised execution", included: true },
          { label: "Local execution with human approval gates", included: true },
          { label: "Local ARL history with traceable actions", included: true },
          { label: "External connections only when approved", included: true },
          { label: "Performance depends on the device hardware", included: true },
        ],
      },
      {
        id: "enterprise",
        name: "Aether Enterprise",
        description: "Governance, compliance, permissions, and logs for small teams.",
        priceMonthly: 449,
        priceYearly: 4310,
        users: "Workspace (Up to 5 base users)",
        recommended: false,
        features: [
          { label: "Everything in Aether Go", included: true },
          { label: "Workspace with up to 5 base users", included: true },
          { label: "Dual-Control Audit Paradigm (dual-signoff for risky actions)", included: true },
          { label: "Voluntary Advisory & Compliance Modules", included: true },
          { label: "Permissions by user, folder, and action type", included: true },
          { label: "Auditable and encrypted exportable ARL logs", included: true },
          { label: "Assisted deployment in private sandboxes and priority support", included: true },
          { label: "Additional users upon request", included: true },
        ],
      },
      {
        id: "scale",
        name: "Aether Scale",
        description: "Dedicated deployment for private and regulated corporate environments.",
        priceMonthly: null,
        priceYearly: null,
        users: "Dedicated Deployment",
        recommended: false,
        features: [
          { label: "Full on-premise or isolated intranet deployment", included: true },
          { label: "Custom integrations with internal APIs, databases, and workflows", included: true },
          { label: "Strict corporate governance and retention policies", included: true },
          { label: "On-demand audits and custom local logs", included: true },
          { label: "Training, corporate runbooks, and dedicated 24/7 support", included: true },
          { label: "Tailored contracts and flexible scale billing", included: true },
        ],
      },
    ],
  },
  PLUGINS: {
    kicker: "extensibility",
    title: ["AetherCore", "Plugins."],
    lead: "Expand AetherCore capabilities by connecting local inference engines and external tool suites with local-first safety.",
    cardsTitle: "Supported Connectors",
    cardsDesc: "Open architecture built to run modularly with local backends like LocalAI.",
    cards: [
      {
        t: "Inference Providers",
        d: "Hook LocalAI for high-performance offline inference (LLMs, audio, images) detached from the core Kernel.",
        icon: "Plug",
        link: "https://localai.io"
      },
      {
        t: "MCP Bridge",
        d: "Connect external MCP servers to import universal contexts and tools under a standard protocol.",
        icon: "Blocks",
        link: "https://modelcontextprotocol.io"
      },
      {
        t: "Tools & Memory RAG",
        d: "Add new executable utilities and connect vector indexes directly into the local Memory Kernel.",
        icon: "Cpu"
      }
    ],
    featuresTitle: "Extension Safety",
    featuresDesc: "Strict isolation controls over active workspace extensions.",
    features: [
      {
        title: "plugin.json Manifests",
        desc: "Plugins declare exact capabilities and sandbox access tokens audited by the Kernel."
      },
      {
        title: "Workspace Boundaries",
        desc: "All plugin parameters and credentials remain bound to the active project folder."
      }
    ]
  },
  VALIDACAO: {
    kicker: "institutional validation · private hedge fund",
    title: ["Offshore Hedge Fund", "Battle-Tested", "at ¥45M+ Yearly."],
    lead: "While mainstream enterprises risk high-value secrets on public Big Tech clouds, Pacific Palm Partners — a private hedge fund with Italian heritage headquartered in the international financial hub of Labuan (Malaysia) managing over ¥45M+ RMB annually — battle-tested and validated AetherCore's effectiveness, speed, and absolute data isolation.",
    stats: [
      { k: "¥45,000,000+", label: "Annual RMB Turnover", sub: "Offshore cross-border arbitrage & asset growth" },
      { k: "0 Bytes", label: "Cloud Telemetry", sub: "100% on-device execution with cryptographic isolation" },
      { k: "82%", label: "Time Saved", sub: "Complex spreadsheet auditing & cross-analysis" },
      { k: "Labuan IBFC", label: "Offshore Jurisdiction", sub: "Malaysia's International Business & Financial Centre" }
    ],
    partner: {
      name: "Pacific Palm Partners",
      sector: "Venture Capital & Private Equity · Private Hedge Fund",
      tagline: "Private Hedge Fund & Cross-Border Digital Strategy",
      location: "Labuan, Malaysian Federal Territory of Labuan (Labuan IBFC)",
      origin: "Italian heritage & executive governance",
      linkedinUrl: "https://www.linkedin.com/company/pacific-palm-partners",
      logoUrl: "/assets/img/brand/pacific-palm-logo.png",
      description: "Institutional financial operation engaged in aligning digital strategy with global investment objectives, focusing on technology-driven efficiencies and cross-border market opportunities."
    },
    founderRole: {
      kicker: "founder's executive role",
      title: "Digital Architecture in Global Finance",
      subtitle: "Matheus Peres da Silva · Digital Strategy & Portfolio Insight",
      workplace: "Private Hedge Fund — Labuan, Malaysia",
      duties: [
        {
          title: "Aligning Digital Strategy & Global Investments",
          desc: "Engaged in aligning digital strategy with global investment objectives, focusing on technology-driven efficiencies and cross-border market opportunities."
        },
        {
          title: "Portfolio Analysis & Digital Transformation",
          desc: "Contribute to portfolio analysis, digital transformation initiatives, and innovation-oriented projects designed to bridge traditional finance with modern data analytics."
        },
        {
          title: "Emerging Market Trends & Asset Growth",
          desc: "Work closely with senior partners in identifying emerging market trends, optimizing operational frameworks, and supporting long-term asset growth through strategic digital insight."
        }
      ]
    },
    stressTest: {
      kicker: "the stress test · high-impact financial audit",
      title: "Why generic AI fails and AetherCore triumphed.",
      desc: "In the high-stakes world of offshore hedge funds and ¥45M+ yearly turnover, a single leaked financial position or proprietary spreadsheet to third-party clouds invites catastrophe. Here is how AetherCore proved itself under fire.",
      pillars: [
        {
          n: "01",
          tag: "Absolute Offshore Secrecy",
          title: "Zero Exposure to External Servers",
          desc: "Pacific Palm Partners operates under strict financial confidentiality. All valuation models, Renminbi (RMB) foreign exchange flows, and balance sheets were computed 100% on local hardware, without emitting a single external HTTP packet.",
          badge: "100% Offline Validated"
        },
        {
          n: "02",
          tag: "Rust Native Velocity",
          title: "Instant Audit of Massive XLSX Files",
          desc: "Dense portfolio sheets with tens of thousands of rows and interlinked formulas were audited, parsed, and synthesized in milliseconds by AetherCore's native Rust engines, accelerating decisions for senior partners.",
          badge: "82% Speed Acceleration"
        },
        {
          n: "03",
          tag: "Human-in-the-Loop",
          title: "Mandatory Operator Signoff",
          desc: "In financial operations, AI hallucinations cause direct capital losses. AetherCore never modifies local files or runs actions without explicit physical confirmation through the human approval review card.",
          badge: "Full Operator Control"
        },
        {
          n: "04",
          tag: "Regulatory Immunity",
          title: "Cross-Border Sovereign Governance",
          desc: "Immutable SQLite audit trails log every file touched and every formula evaluated, empowering real-time internal compliance with complete mathematical and legal certainty.",
          badge: "Immutable Audit Trail"
        }
      ]
    },
    verdict: {
      kicker: "institutional verdict",
      quote: "AetherCore demonstrated in production what no Big Tech platform can deliver: the ability to reason across high-stakes financial data and multi-million spreadsheets without uploading a single byte to the cloud. Verified effectiveness, speed, and sovereignty at the highest offshore standard.",
      author: "Pacific Palm Partners — Labuan IBFC",
      badge: "Effectiveness & Security Homologated"
    },
    terminal: {
      kicker: "stress test telemetry",
      title: "Offshore Portfolio Audit Log",
      filename: "cross_border_portfolio_audit_v06.rs",
      badge: "Active Sandbox · Zero Leaks",
      lines: [
        "[KERNEL] Initializing local memory sandbox for Pacific Palm Partners (Labuan IBFC)...",
        "[AUTH] Operator: Matheus Peres da Silva · Role: Digital Strategy & Portfolio Insight",
        "[ENV] Target Volume: ¥45,000,000.00 RMB · Cross-border Asset Allocation",
        "[SANDBOX] Ingesting 14 encrypted XLSX/CSV balance sheets and currency matrices...",
        "[COMPUTE] Local Qwen + Rust IPC executing quantitative anomaly detection...",
        "[NETWORK] External network interface: HARD BLOCKED (0 packets sent / 0 received)",
        "[ARL-AUDIT] Processing latency: 142ms · VRAM utilization: 2.1 GB · 0 cloud fallback",
        "[STATUS] 100% local validation successful. Human-in-the-loop signoff verified."
      ]
    }
  }
};
