// Conteúdo público bilíngue da EXVORN.TECH. Capacidades atuais e próximos passos são apresentados separadamente.

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
    tagline: "IA para trabalho real",
    copyright: "© 2026 AetherCore. IA local-first. Curitiba, Brasil. Contato: business@exvorn.tech",
  },
  NAV_LINKS: [
    { label: "Início", to: "/" },
    { label: "Ecossistema", to: "/ecossistema" },
    { label: "Sobre", to: "/sobre" },
    { label: "Acesso antecipado", to: "/validacao" },
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
    heroStatus: "IA local-first · acesso antecipado",
    aether: {
      eyebrow: "IA local-first para fluxos de trabalho",
      eyebrowRight: "BETA · v0.6.0",
      headline: { l1: "IA para", l2: "trabalho real.", l3a: "Com", l3b: "controle." },
      sub: "Uma aplicação desktop que reúne modelos de IA, arquivos e ferramentas em um fluxo de trabalho com escopo definido. Escolha execução local ou conecte serviços externos quando fizer sentido.",
      consoleLabel: "Console AetherCore",
      consoleLive: "Runtime beta",
      scrollBadge: "Role para explorar • AetherCore •",
      chapters: [
        { n: "01", title: "Tarefas com contexto", body: "Trabalhe com arquivos selecionados e mantenha o contexto da tarefa em um workspace." },
        { n: "02", title: "Plano para revisão", body: "Acompanhe o plano, as ferramentas e as etapas de revisão do agente." },
        { n: "03", title: "Local quando configurado", body: "Escolha modelos locais para inferência no dispositivo ou provedores externos para tarefas específicas." },
      ],
      marquee: ["AETHERCORE", "IA PARA TRABALHO REAL", "CONTROLE DO FLUXO DE DADOS"],
    },
    heroRotate: ["executam.", "planejam.", "revisam.", "auditam.", "automatizam."],
    heroChipsLabel: "capacidades do AetherCore",
    heroChips: [
      { t: "Qwen local", icon: "Cpu" },
      { t: "XLSX e CSV", icon: "Table2" },
      { t: "Arquivos locais", icon: "HardDrive" },
      { t: "Etapas de revisão", icon: "ShieldCheck" },
      { t: "Registros locais", icon: "ClipboardCheck" },
      { t: "Conexões opcionais", icon: "LockKey" },
    ],
    titleLead: "Agentes de IA",
    titleEm: "para arquivos.",
    titleEnd: "Controle na prática.",
    primaryCta: "Solicitar acesso antecipado",
    secondaryCta: "Ver primeiro caso com XLSX",
    lead:
      "O AetherCore conecta modelos, ferramentas e arquivos em uma aplicação desktop. Seu runtime em Rust organiza o fluxo; você define o workspace e escolhe entre modelos locais e conexões externas.",
    metrics: [
      { k: "Modelos", v: "locais ou remotos" },
      { k: "Revisão", v: "etapas de aprovação" },
      { k: "Dados", v: "escopo lógico" },
    ],
    pillars: [
      { t: "Local-first", d: "inferência no dispositivo" },
      { t: "Revisão", d: "etapas de aprovação" },
      { t: "Registros", d: "eventos do fluxo" },
      { t: "Integrações", d: "destino configurável" },
    ],
    whatIsAether: {
      kicker: "o que o aether faz?",
      title: "Seu trabalho e sua IA no mesmo contexto.",
      desc: "O AetherCore foi desenhado para executar tarefas sobre arquivos com modelos configuráveis, ferramentas e revisão humana. Solicite acesso antecipado.",
      cards: [
        { t: "Chat & escrita", d: "Use modelos configurados para escrever, resumir e organizar ideias.", icon: "MessageSquareText" },
        { t: "Ferramentas", d: "Acesse ferramentas no contexto de uma tarefa delimitada.", icon: "Code2" },
        { t: "Arquivos", d: "Trabalhe com arquivos e planilhas no workspace selecionado.", icon: "Table2" },
        { t: "Conexões", d: "Verifique destino e conteúdo antes de acionar serviços externos.", icon: "Globe" },
      ]
    },
    stackKicker: "base técnica",
    stackTitle: "O que roda por baixo.",
    stackDesc:
      "Um runtime em Rust coordena modelos, ferramentas e eventos de execução. Com modelos locais, a inferência acontece no dispositivo; provedores externos são uma escolha de configuração.",
    localBadge: "Modelos locais + conexões opcionais",
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
      "Uma IA que aproxima modelos e ferramentas do trabalho com arquivos.",
    synthDesc:
      "Começamos por trabalho com arquivos e planilhas: uma necessidade concreta para equipes que querem usar IA com contexto, escolha de modelo e revisão das ações.",
    synth: [
      {
        tag: "Problema",
        t: "Dados sensíveis espalhados em ferramentas de terceiros",
        d: "Informações críticas acabam em serviços externos, sem controle sobre quem acessa ou o que acontece com elas.",
      },
      {
        tag: "Solução",
        t: "IA que roda perto dos arquivos",
        d: "O AetherCore oferece inferência local, ferramentas no workspace e etapas de revisão para ações cobertas pelo fluxo.",
      },
      {
        tag: "Entrada",
        t: "Primeiro caso: planilhas",
        d: "Planilhas permitem demonstrar valor em tarefas verificáveis, como leitura, organização e transformação de informações.",
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
    kicker: "agente local-first · beta", title: ["IA para trabalhar", "com arquivos reais,", "sob seu controle."],
    lead: "O AetherCore combina interface desktop, runtime em Rust, ferramentas para arquivos e modelos configuráveis. Escolha o contexto, acompanhe o plano e revise o resultado em um único fluxo.",
    solutionKicker: "o que estamos construindo", solutionTitle: "Levar a IA para perto do trabalho.",
    solutionDesc: "No modo local, o modelo pode rodar no seu hardware. Provedores externos são opcionais e podem receber os dados enviados a eles.",
    blocks: [
      { n: "01", tag: "Contexto de trabalho", t: "Escolha o que entra no workspace", d: "O agente trabalha com arquivos selecionados. Confira escopo e modelo antes de incluir informação sensível.", points: ["arquivos selecionados", "contexto delimitado", "beta em evolução"] },
      { n: "02", tag: "Agente", t: "Plano, ferramentas e resultado", d: "O runtime organiza etapas e chama ferramentas disponíveis. Qualidade e cobertura dependem do modelo e da tarefa.", points: ["plano de execução", "ferramentas configuradas", "revisão do resultado"] },
      { n: "03", tag: "Aprovação", t: "Revise antes de ações sensíveis", d: "Etapas de aprovação permitem revisar ações cobertas pelo fluxo antes de executá-las.", points: ["revisão humana", "escopo visível", "decisão informada"] },
      { n: "04", tag: "Credenciais", t: "Integrações configuráveis", d: "Configure provedores e integrações conforme o trabalho. A escolha do serviço define quais dados são encaminhados para fora do dispositivo.", points: ["provedores configuráveis", "integrações opcionais", "destinos visíveis"] }
    ],
    offeringsKicker: "modos de uso", offeringsTitle: "Um núcleo. Caminhos de execução diferentes.",
    offeringsDesc: "Escolha o caminho de execução conforme a tarefa, o hardware e as regras de dados da sua organização.",
    offerings: [
      { name: "Modelo local", audience: "No dispositivo", t: "Mantenha a inferência no hardware configurado.", d: "Quando o modelo roda no dispositivo, a inferência usa o hardware local. Integrações opcionais podem usar a rede.", points: ["depende do modelo instalado", "usa recursos locais", "integrações podem usar a rede"] },
      { name: "Provedor externo", audience: "Conexão opcional", t: "Escolha uma API quando necessário.", d: "O conteúdo enviado fica sujeito ao serviço, contrato e configuração utilizados.", points: ["destino conforme configuração", "revise os dados enviados", "escolha consciente"] },
      { name: "Uso por equipe", audience: "Próxima fase", t: "Implantação para equipes.", d: "Planejamos administração, suporte e governança contratados conforme o fluxo e a infraestrutura de cada organização.", points: ["escopo por proposta", "suporte contratado", "controles para equipes"] }
    ],
    greenKicker: "impacto ambiental · método de medição", greenTitle: "Local muda onde a computação acontece.",
    greenDesc: "Nossa análise ambiental parte de tarefas comparáveis: energia medida no hardware usado, tempo ocioso e qualidade do resultado. Publicaremos conclusões quando houver medições reproduzíveis.",
    greenCards: [
      { t: "Energia por tarefa", d: "Métrica proposta: Wh por tarefa comparável, incluindo inferência e tempo ocioso.", icon: "Lightning" },
      { t: "Água", d: "Estimativas de água exigem localização, infraestrutura e método explícitos. Nossa avaliação seguirá esses critérios.", icon: "Droplet" },
      { t: "Comparação", d: "Medir o mesmo fluxo, modelo e qualidade antes de afirmar economia.", icon: "Server" }
    ],
    flowKicker: "fluxo de trabalho", flowTitle: "Do pedido à revisão", flowDesc: "Selecione o contexto, confira as etapas propostas e revise o resultado antes de usar.",
    flow: [
      { n: "1", t: "Selecione o contexto", d: "Escolha os arquivos e o workspace necessários." },
      { n: "2", t: "Confira o plano", d: "Revise o modelo e as ferramentas configuradas para a tarefa." },
      { n: "3", t: "Avalie o resultado", d: "Confira o que foi gerado e aprove apenas ações cujo escopo entenda." }
    ],
  },
  ARQUITETURA: {
    kicker: "arquitetura · beta", title: ["Contexto local,", "conexões explícitas,", "limites visíveis."],
    lead: "O runtime em Rust coordena modelos, ferramentas e eventos de execução. O workspace delimita o contexto; a configuração escolhida define se a inferência acontece no dispositivo ou em um serviço externo.",
    loopKicker: "fluxo de execução", loopTitle: "Da seleção ao resultado.", loopDesc: "O agente usa workspace e ferramentas disponíveis. Revise as permissões e o destino de cada conexão.",
    loop: [
      { tag: "Arquivos", t: "Selecione o workspace.", d: "Inclua apenas os arquivos necessários para a tarefa.", chip: "Escopo escolhido pelo usuário" },
      { tag: "Plano", t: "Revise as etapas.", d: "Confira tarefa, modelo e ferramentas que serão acionadas.", chip: "Plano para revisão" },
      { tag: "Aprovação", t: "Decida antes de agir.", d: "Há confirmações para ações cobertas pelos controles atuais.", chip: "Cobertura em validação" },
      { tag: "Execução", t: "Confira o resultado.", d: "O runtime executa ferramentas configuradas e mantém registros locais de eventos.", chip: "Registro local do beta" }
    ],
    capsKicker: "camadas do produto", capsTitle: "Arquitetura que torna o fluxo legível.", capsDesc: "Cada camada cumpre uma função: escolher o contexto, coordenar ferramentas, executar modelos e registrar eventos.",
    caps: [
      { n: "01", tag: "modelos", t: "Modelos locais ou remotos", d: "Modelos locais e provedores externos são configuráveis; cada escolha muda o caminho dos dados." },
      { n: "02", tag: "logs", t: "Registro de eventos", d: "O runtime registra eventos locais que ajudam a acompanhar o fluxo e investigar resultados." },
      { n: "03", tag: "workspace", t: "Limites lógicos", d: "O workspace organiza e delimita o contexto no nível da aplicação." },
      { n: "04", tag: "arquivos", t: "Ferramentas para arquivos", d: "Há ferramentas para arquivos e planilhas; compatibilidade e cobertura devem ser confirmadas por fluxo." },
      { n: "05", tag: "revisão", t: "Etapas de aprovação", d: "Ações de escrita e rede podem exigir confirmação conforme ferramenta e configuração. Cobertura completa precisa de teste." },
      { n: "06", tag: "conexões", t: "Integrações opcionais", d: "Uma API externa pode receber instruções ou contexto encaminhado a ela. Verifique destino e política do provedor." },
      { n: "07", tag: "credenciais", t: "Tratamento em revisão", d: "A configuração de provedores centraliza as conexões escolhidas para cada fluxo." },
      { n: "08", tag: "estado", t: "Versão em preparação", d: "A próxima etapa concentra distribuição, documentação de compatibilidade e pilotos com tarefas mensuráveis." }
    ],
    releaseKicker: "acesso antecipado", releaseTitle: "AetherCore — para equipes que querem agir sobre dados.", releaseDesc: "Estamos preparando distribuição por convite e fluxos de teste que permitam medir qualidade, tempo de revisão e custo por tarefa.", releaseTags: ["Rust runtime", "Modelos configuráveis", "Workspace definido", "Revisão humana"]
  },
  CASOS: {
    kicker: "casos de uso · beta", title: ["IA local-first", "para fluxos com", "arquivos e agentes."],
    lead: "O AetherCore foi feito para tarefas em que arquivos, contexto e escolha do modelo importam. Em vez de copiar dados entre várias ferramentas, organize o trabalho em um workspace e acompanhe a execução.",
    problemKicker: "decisão de arquitetura", problemTitle: "Saiba qual serviço recebe cada dado.",
    problemDesc: "Assistentes e modelos diferem em retenção, uso e processamento. Considere serviço, contrato, política interna e dados compartilhados.",
    steps: [
      { n: "01", tag: "pergunta", t: "Onde os dados são processados?", d: "Identifique modelo, provedor, armazenamento e serviços chamados pela aplicação.", points: ["modelo local ou remoto", "retenção do provedor", "destinos das integrações"] },
      { n: "02", tag: "opção", t: "Configure o caminho de execução.", d: "O AetherCore aceita modelos locais e conexões externas opcionais. O resultado depende da configuração.", points: ["escolha do modelo", "workspace selecionado", "revisão das conexões"] },
      { n: "03", tag: "limite", t: "Valide antes de usar em produção.", d: "Avalie o fluxo no seu cenário, confira o resultado e defina as regras de uso antes de ampliar a adoção.", points: ["teste no seu cenário", "controles organizacionais", "decisão informada"] }
    ],
    compareKicker: "caminhos de dados", compareTitle: "Compare a configuração, não slogans.",
    compareDesc: "Uma leitura geral dos caminhos entre provedores externos e modelos locais ou remotos configurados no AetherCore.",
    compare: [
      { feat: "Destino do prompt", cloud: "O serviço remoto recebe o conteúdo enviado conforme sua configuração, política e contrato.", aether: "O modelo pode ser local ou remoto. Se remoto, os dados encaminhados podem sair do dispositivo." },
      { feat: "Armazenamento", cloud: "Retenção e uso variam por produto, conta e termos contratados.", aether: "Arquivos ficam no workspace escolhido; logs e retenção do beta precisam ser verificados." },
      { feat: "Ações em arquivos", cloud: "Acesso a arquivos locais varia por produto.", aether: "Há ferramentas para arquivos; compatibilidade e escopo variam por fluxo e precisam de validação." },
      { feat: "Aprovação", cloud: "Controles variam entre produtos e políticas organizacionais.", aether: "Há etapas de aprovação para parte das ações; cobertura completa ainda está em validação." },
      { feat: "Conformidade", cloud: "Depende do serviço, contrato, configuração e obrigações do controlador.", aether: "Execução local pode reduzir transferências, mas não comprova conformidade com a LGPD." },
      { feat: "Conexões externas", cloud: "O serviço processa solicitações na infraestrutura do fornecedor.", aether: "Integrações remotas são opcionais e devem ser avaliadas e configuradas conscientemente." }
    ],
    audienceKicker: "para explorar", audienceTitle: "Comece pelo fluxo de trabalho.",
    audienceDesc: "Use a beta em tarefas de baixo risco, meça a qualidade e identifique quais dados precisam permanecer locais.",
    audience: [
      { t: "Finanças e controladoria", d: "Avalie tarefas com dados fictícios ou anonimizados antes de considerar informação real." },
      { t: "Jurídico e operações", d: "Teste busca e revisão em documentos sem sigilo enquanto valida limites e resultados." },
      { t: "Auditoria e análise", d: "Compare o resultado com um processo conhecido e registre erros e tempo de revisão." },
      { t: "PMEs e equipes técnicas", d: "Mapeie modelos, arquivos, integrações e controles antes de avaliar a beta." }
    ],
  },
  PRINCIPIOS: {
    kicker: "princípios de produto",
    title: "Privacidade não é feature. É decisão de arquitetura.",
    lead:
      "Escolher onde a IA executa, tornar conexões visíveis e manter a revisão humana no fluxo. Esses princípios orientam o AetherCore desde a arquitetura.",
    manifestoKicker: "manifesto",
    manifestoTitle:
      "Princípios que orientam cada fluxo.",
    manifestoDesc:
      "Modelo, destino dos dados e etapas de revisão devem ser compreensíveis por quem opera a ferramenta.",
    items: [
      { n: "01", tag: "controle", t: "Escolha onde o modelo roda.", d: "Um modelo local pode manter a inferência no dispositivo; provedores remotos podem receber dados encaminhados." },
      { n: "02", tag: "consentimento", t: "Confira cada conexão.", d: "Destino e conteúdo variam por integração. Revise-os antes de enviar informação sensível." },
      { n: "03", tag: "registro", t: "Registros ajudam a investigar.", d: "O beta mantém eventos locais, mas não os apresenta como completos, imutáveis ou certificados." },
      { n: "04", tag: "proporcionalidade", t: "Delimite o contexto.", d: "Selecione os arquivos necessários e teste o fluxo com dados fictícios ou anonimizados." },
      { n: "05", tag: "revisão humana", t: "Revise ações cobertas.", d: "Há etapas de aprovação para parte das ações; cobertura e comportamento precisam de teste." },
      { n: "06", tag: "código como defesa", t: "Código reduz riscos; não elimina todos.", d: "A implementação deve ser testada e revisada; boas intenções e arquitetura não substituem evidência." },
    ],
  },
  SUSTENTABILIDADE: {
    kicker: "impacto ambiental · método", title: ["Medir primeiro.", "Comparar com", "honestidade."],
    lead: "Executar um modelo local muda onde a energia é consumida. Nossa abordagem é medir tarefas equivalentes, hardware e tempo ocioso antes de afirmar qualquer economia.",
    cardsTitle: "O que precisa ser medido", cardsDesc: "Vamos comparar tarefas equivalentes e publicar método, hardware e limitações antes de afirmar qualquer economia.",
    cards: [
      { t: "Energia", d: "Registrar Wh por tarefa e tempo ocioso, usando a mesma qualidade e modelo quando possível.", icon: "Lightning" },
      { t: "Água", d: "Estimativas de água dependem de localização, infraestrutura e método; são tema para uma análise própria.", icon: "Droplet" },
      { t: "Uso do hardware", d: "A comparação deve incluir vida útil, utilização, capacidade disponível e energia local.", icon: "Server" }
    ],
  },
  SOBRE: {
    kicker: "sobre o projeto", title: ["Construído com", "obsessão por", "controle real."],
    lead: "A EXVORN.TECH desenvolve o AetherCore para aproximar a IA do trabalho real: arquivos, ferramentas e decisões sob controle de quem opera. O produto é liderado por Matheus Peres da Silva em Curitiba.",
    teamTitle: "Responsável pelo produto", teamDesc: "Matheus lidera arquitetura, produto e engenharia do AetherCore.",
    members: [{ name: "Matheus Peres da Silva", role: "Fundador · Produto e engenharia", bio: "Programador desde a adolescência, lidera a construção do AetherCore e sua estratégia de produto. Sua experiência combina software, sistemas e pesquisa independente de segurança." }],
    twinTitle: "Colaborações e consultoria", twinDesc: "O desenvolvimento conta com diálogo e apoio consultivo voluntário. Colaborações formais serão apresentadas conforme forem estabelecidas."
  },
  FAQ: {
    kicker: "faq · beta", title: ["Perguntas diretas", "sobre o AetherCore."], lead: "O produto está em desenvolvimento. Confira o modelo, os dados e as ferramentas de cada fluxo.",
    items: [
      { q: "O que significa local-first?", a: "É uma prioridade de arquitetura para manter mais processamento perto do usuário. O caminho real depende do modelo e das integrações." },
      { q: "O AetherCore está disponível?", a: "Estamos organizando o acesso antecipado por convite. Entre em contato para conhecer os fluxos e participar da próxima etapa de testes." },
      { q: "Por que oferecer um núcleo local gratuito?", a: "A entrada gratuita amplia o acesso sem exigir que a EXVORN pague a inferência local de cada usuário: ela roda no hardware e no modelo escolhidos por ele. A receita planejada vem de implantação, suporte e governança para equipes, contratados conforme o escopo." },
      { q: "Meus arquivos ficam no dispositivo?", a: "Arquivos podem ser selecionados em um workspace local. Se um modelo ou integração remota receber esse conteúdo, ele pode sair do dispositivo." },
      { q: "O produto funciona totalmente offline?", a: "Com um modelo local configurado, a inferência pode ocorrer no dispositivo. Atualizações e integrações opcionais podem usar a rede." },
      { q: "O AetherCore garante conformidade com a LGPD?", a: "Não. Conformidade depende do contexto, bases legais, contratos, políticas e controles da organização." },
      { q: "Há sandbox de sistema operacional?", a: "O isolamento documentado é lógico no nível do workspace; não equivale a sandbox do sistema operacional, VM ou contêiner." },
      { q: "Como são protegidas credenciais?", a: "O beta inclui gestão de credenciais. A implementação precisa de revisão independente antes de ser apresentada como controle corporativo." }
    ],
  },
  PRIVACIDADE: {
    kicker: "privacidade · beta", title: "Entenda cada caminho de dados.", lead: "O comportamento depende da configuração, do modelo, das ferramentas e dos serviços conectados.",
    policyKicker: "caminhos de dados", policyTitle: "Você escolhe o caminho de execução.", policyDesc: "A configuração do modelo e das integrações determina quais dados seguem para serviços externos. Revise essas escolhas para cada fluxo.",
    cards: [
      { tag: "modelos", t: "Local ou remoto", d: "Um modelo local pode processar inferência no dispositivo. Um provedor externo pode receber dados enviados a ele." },
      { tag: "aprovação", t: "Revise ações cobertas", d: "Há etapas de aprovação para parte das ações de escrita e rede; a cobertura completa ainda precisa ser validada." },
      { tag: "registros", t: "Consulte os logs do beta", d: "O aplicativo mantém registros locais de eventos. Não os descrevemos como imutáveis, completos ou certificados." },
      { tag: "credenciais", t: "Segurança sob revisão", d: "O tratamento de credenciais precisa de revisão independente antes de uso corporativo sensível." },
      { tag: "conexões", t: "Confira destino e conteúdo", d: "Antes de usar uma API externa, identifique o destino, os dados transmitidos e as regras do provedor." },
      { tag: "limites", t: "Escolha informada", d: "Associe cada tarefa ao modelo, integração e controles adequados ao seu ambiente." }
    ],
  },
  ROADMAP: {
    kicker: "roadmap · hipóteses de execução", title: "Provar valor antes de escalar.", lead: "A sequência de execução: distribuição, segurança, pilotos mensuráveis e expansão comercial a partir dos resultados.",
    timelineKicker: "próximas etapas", timelineTitle: "Uma sequência para reduzir incerteza.", timelineDesc: "Cada etapa depende da anterior e pode mudar com evidência de uso.",
    phases: [
      { period: "Etapa 1", t: "Preparar versão de teste", d: "Consolidar instalador, validar instalação limpa no Windows e publicar uma matriz de modelos suportados." },
      { period: "Etapa 2", t: "Revisar limites de segurança", d: "Mapear fluxos de dados, permissões, armazenamento e superfícies de ataque; buscar revisão independente." },
      { period: "Etapa 3", t: "Executar pilotos consentidos", d: "Convidar poucos usuários para tarefas de baixo risco e registrar qualidade, falhas, tempo de revisão e custo." },
      { period: "Etapa 4", t: "Validar sustentabilidade comercial", d: "Testar disposição a pagar e custo de suporte antes de publicar tiers, preços ou metas de receita." }
    ],
    metricsKicker: "métricas propostas", metricsTitle: "O que vamos medir.", metricsDesc: "Qualidade, custo e controle de dados guiam cada piloto.",
    metrics: [
      { tag: "produto", t: "Conclusão da tarefa", d: "Medir tarefas concluídas, erros, intervenção humana e tempo de revisão." },
      { tag: "segurança", t: "Fluxos de dados", d: "Inventariar cada conexão e validar quais conteúdos deixam o dispositivo." },
      { tag: "negócio", t: "Disposição a pagar", d: "Fazer entrevistas e pilotos antes de anunciar conversão, receita ou preço definitivo." }
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
    kicker: "resumo técnico e comercial", title: ["AetherCore:", "evidência antes", "de escala."], lead: "A tese da EXVORN.TECH: levar IA acionável para perto dos arquivos, com escolha de modelo, contexto delimitado e revisão humana.",
    summaryKicker: "tese de produto", summaryTitle: "Quatro questões guiam a próxima fase.",
    blocks: [
      { tag: "01. problema", t: "Dados atravessam múltiplos serviços", d: "Equipes precisam saber quais modelos e integrações recebem arquivos e instruções de trabalho." },
      { tag: "02. abordagem", t: "Modelos próximos ao contexto", d: "O AetherCore conecta um agente a workspaces e ferramentas, com modelos locais e provedores remotos como opções." },
      { tag: "03. controles", t: "Escopo e revisão", d: "Controles de workspace e aprovações existem no beta; isolamento e cobertura precisam de validação completa." },
      { tag: "04. mercado", t: "Entrada pelo trabalho com arquivos", d: "Começamos por equipes que processam documentos e planilhas, onde contexto, tempo de revisão e destino dos dados têm valor econômico claro." },
      { tag: "05. maturidade", t: "Base técnica construída", d: "A aplicação desktop, o runtime em Rust e testes de componentes formam a base para distribuição e pilotos mensuráveis." },
      { tag: "06. capital", t: "Uso proposto", d: "Recursos apoiariam produto testável, revisão independente, pilotos consentidos e descoberta comercial." }
    ],
    planKicker: "marcos planejados", planTitle: "Sequência de validação", plan: [
      { period: "Etapa 1", d: "Preparar pacote de instalação e documentar versões e modelos suportados." },
      { period: "Etapa 2", d: "Validar fronteiras de dados e buscar revisão independente de segurança." },
      { period: "Etapa 3", d: "Conduzir pilotos consentidos com tarefas e dados de baixo risco." },
      { period: "Etapa 4", d: "Validar preço, custo de suporte e modelo freemium antes de uma oferta comercial." }
    ],
  },
  PRICING: {
    kicker: "modelo de acesso", title: ["Acesso grátis", "com operação", "sustentável."],
    lead: "Nossa estratégia de lançamento prevê um núcleo local gratuito para adoção e soluções para equipes com implantação, suporte e governança sob proposta. Solicite acesso antecipado.",
    annualLabel: "Estratégia de acesso", annualSaveLabel: "Acesso antecipado", buttonLabel: "Conversar sobre beta", contactLabel: "Conversar sobre beta",
    plans: [
      { id: "free", name: "Aether Free", description: "Núcleo local gratuito previsto para o lançamento público.", priceMonthly: null, priceYearly: null, users: "Lançamento planejado", recommended: false, features: [{ label: "Inferência local com hardware e modelo do usuário", included: true }, { label: "Custo de inferência local no hardware do usuário", included: true }] },
      { id: "go", name: "Aether Go", description: "Experiência desktop individual e suporte: escopo comercial em definição.", priceMonthly: null, priceYearly: null, users: "Acesso antecipado", recommended: false, features: [{ label: "Pacote desktop e suporte planejados", included: true }, { label: "Acesso antecipado por convite", included: true }] },
      { id: "enterprise", name: "Aether Enterprise", description: "Implantação e suporte para equipes, com proposta conforme escopo.", priceMonthly: null, priceYearly: null, users: "Sob proposta", recommended: false, features: [{ label: "Administração e governança planejadas", included: true }, { label: "Escopo e suporte definidos por contrato", included: true }] },
      { id: "scale", name: "Aether Scale", description: "Infraestrutura dedicada desenhada para necessidades específicas.", priceMonthly: null, priceYearly: null, users: "Projeto sob proposta", recommended: false, features: [{ label: "Implantação e integrações dedicadas planejadas", included: true }, { label: "Projeto e condições definidos antes da contratação", included: true }] }
    ],
  },
  PLUGINS: {
    kicker: "extensibilidade",
    title: ["Plugins", "AetherCore."],
    lead: "Integrações são uma área em avaliação. Confirme disponibilidade, destino dos dados e controles antes de habilitar um conector.",
    cardsTitle: "Conectores em avaliação",
    cardsDesc: "Esta lista aponta tecnologias possíveis; não confirma que cada integração esteja disponível, auditada ou pronta para produção.",
    cards: [
      {
        t: "Motores locais · LocalAI + Ollama",
        d: "Ollama e LocalAI são opções de execução local. Compatibilidade, versões e limites precisam ser validados por modelo.",
        icon: "Cpu",
        link: "https://localai.io"
      },
      {
        t: "Telegram Bridge",
        d: "Um canal de mensagens pode encaminhar instruções e respostas a serviços externos. Disponibilidade e aprovações devem ser verificadas no fluxo usado.",
        icon: "PaperPlaneTilt",
        link: "https://core.telegram.org/bots/api"
      },
      {
        t: "Model API Bridge",
        d: "Provedores remotos podem receber prompts e contexto encaminhados a eles. Revise o provedor, o contrato e o conteúdo enviado.",
        icon: "Brain",
        link: "https://platform.openai.com/docs/api-reference"
      },
      {
        t: "Model Context Protocol (MCP)",
        d: "Conexões com servidores MCP externos são uma possibilidade técnica; permissões, destinos e disponibilidade precisam de validação.",
        icon: "Blocks",
        link: "https://modelcontextprotocol.io"
      },
      {
        t: "Ferramentas & Memory RAG",
        d: "Memória, índices vetoriais e pipelines RAG permanecem sujeitos a validação de implementação e tratamento de dados.",
        icon: "Database"
      },
      {
        t: "Webhooks & Eventos locais",
        d: "Webhooks e eventos locais são uma área em estudo; não há compromisso de disponibilidade ou desempenho.",
        icon: "ArrowsClockwise"
      }
    ],
    featuresTitle: "Limites de extensão",
    featuresDesc: "A segurança e o isolamento de extensões ainda precisam de revisão independente.",
    features: [
      {
        title: "Manifesto plugin.json",
        desc: "Manifestos e permissões devem ser revisados por conector; a validação completa segue pendente."
      },
      {
        title: "Isolamento por Workspace",
        desc: "Limites de workspace são lógicos na aplicação e não equivalem a sandbox do sistema operacional."
      }
    ]
  },

};

export const CONTENT_EN = {
  BRAND: {
    name: "AetherCore",
    version: "v0.6.0 · beta",
    tagline: "AI for real work",
    copyright: "© 2026 AetherCore. Local-first AI. Curitiba, Brazil. Contact: business@exvorn.tech",
  },
  NAV_LINKS: [
    { label: "Home", to: "/" },
    { label: "Ecosystem", to: "/ecossistema" },
    { label: "About", to: "/sobre" },
    { label: "Early access", to: "/validacao" },
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
    heroStatus: "Local-first AI · early access",
    aether: {
      eyebrow: "Local-first AI for file-based work",
      eyebrowRight: "BETA · v0.6.0",
      headline: { l1: "AI for", l2: "real work.", l3a: "With", l3b: "control." },
      sub: "A desktop app that brings AI models, files, and tools into a focused workflow. Choose local execution or connect external services when they fit the task.",
      consoleLabel: "AetherCore Console",
      consoleLive: "Beta runtime",
      scrollBadge: "Scroll to explore • AetherCore •",
      chapters: [
        { n: "01", title: "Contextual tasks", body: "Work with selected files and keep task context in one workspace." },
        { n: "02", title: "A plan to review", body: "Follow the agent plan, tools, and review steps." },
        { n: "03", title: "Local when configured", body: "Choose local models for on-device inference or external providers for specific tasks." },
      ],
      marquee: ["AETHERCORE", "AI FOR REAL WORK", "VISIBLE DATA PATHS"],
    },
    heroRotate: ["execute.", "plan.", "review.", "audit.", "automate."],
    heroChipsLabel: "AetherCore capabilities",
    heroChips: [
      { t: "Local Qwen", icon: "Cpu" },
      { t: "XLSX and CSV", icon: "Table2" },
      { t: "Local files", icon: "HardDrive" },
      { t: "Review steps", icon: "ShieldCheck" },
      { t: "Local event records", icon: "ClipboardCheck" },
      { t: "Optional connections", icon: "LockKey" },
    ],
    titleLead: "AI agents",
    titleEm: "for files.",
    titleEnd: "Control in action.",
    primaryCta: "Request early access",
    secondaryCta: "See the first XLSX case",
    lead:
      "AetherCore connects models, tools, and files in a desktop app. Its Rust runtime coordinates the workflow; you define the workspace and choose local models or external connections.",
    metrics: [
      { k: "Models", v: "local or remote" },
      { k: "Review", v: "approval steps" },
      { k: "Data", v: "logical scope" },
    ],
    pillars: [
      { t: "Local-first", d: "on-device inference" },
      { t: "Review", d: "approval steps" },
      { t: "Records", d: "workflow events" },
      { t: "Integrations", d: "configurable destinations" },
    ],
    whatIsAether: {
      kicker: "what does aether do?",
      title: "Your work and your AI in one context.",
      desc: "AetherCore is designed to work on files with configurable models, tools, and human review. Request early access.",
      cards: [
        { t: "Chat & writing", d: "Use configured models to write, summarize, and organize ideas.", icon: "MessageSquareText" },
        { t: "Tools", d: "Access tools within a focused task.", icon: "Code2" },
        { t: "Files", d: "Work with files and spreadsheets in the selected workspace.", icon: "Table2" },
        { t: "Connections", d: "Check destination and content before using external services.", icon: "Globe" },
      ]
    },
    stackKicker: "technical foundation",
    stackTitle: "What runs underneath.",
    stackDesc:
      "A Rust runtime coordinates models, tools, and execution events. With local models, inference runs on-device; external providers remain a configuration choice.",
    localBadge: "Local models + optional connections",
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
      "AI that brings models and tools closer to file-based work.",
    synthDesc:
      "We start with files and spreadsheets: a concrete need for teams that want AI with context, model choice, and a chance to review actions.",
    synth: [
      {
        tag: "The Problem",
        t: "Sensitive data scattered across third-party tools",
        d: "Information may move through external services without a clear view of destination, retention, or access rules.",
      },
      {
        tag: "The Solution",
        t: "AI running close to your files",
        d: "AetherCore combines local inference, tools in the workspace, and review steps for covered actions.",
      },
      {
        tag: "Inception",
        t: "First Use Case: Spreadsheets",
        d: "Spreadsheets make value visible in checkable tasks such as reading, organizing, and transforming information.",
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
    kicker: "local-first agent · beta", title: ["AI for real work", "with real files,", "under your control."],
    lead: "AetherCore combines a desktop interface, Rust runtime, file tools, and configurable models. Choose the context, follow the plan, and review the output in one workflow.",
    solutionKicker: "what we are building", solutionTitle: "Bring AI closer to the work.",
    solutionDesc: "In local mode, a model can run on your hardware. External providers are optional and may receive data sent to them.",
    blocks: [
      { n: "01", tag: "Work context", t: "Choose what enters the workspace", d: "The agent works with selected files. Check scope and model before including sensitive information.", points: ["selected files", "bounded context", "beta in development"] },
      { n: "02", tag: "Agent", t: "Plans, tools, and output", d: "The runtime organizes steps and calls available tools. Quality and coverage depend on the model and task.", points: ["execution plan", "configured tools", "review the output"] },
      { n: "03", tag: "Approval", t: "Review sensitive actions", d: "Approval steps let you review covered actions before execution.", points: ["human review", "visible scope", "informed decisions"] },
      { n: "04", tag: "Credentials", t: "Configurable integrations", d: "Configure providers and integrations to match the work. The selected service determines which data is routed beyond the device.", points: ["configurable providers", "optional integrations", "visible destinations"] }
    ],
    offeringsKicker: "execution modes", offeringsTitle: "One core. Different execution paths.",
    offeringsDesc: "Choose the execution path that fits the task, hardware, and your organization’s data policies.",
    offerings: [
      { name: "Local model", audience: "On-device", t: "Keep inference on configured hardware.", d: "When the model runs on-device, inference uses local hardware. Optional integrations may use the network.", points: ["depends on installed model", "uses local resources", "integrations may use the network"] },
      { name: "External provider", audience: "Optional connection", t: "Choose an API when needed.", d: "Content sent is subject to the service, contract, and configuration in use.", points: ["destination depends on setup", "review data being sent", "deliberate choice"] },
      { name: "Team use", audience: "Next phase", t: "Deployment for teams.", d: "We plan administration, support, and governance scoped to each organization’s workflow and infrastructure.", points: ["proposal-based scope", "contracted support", "team controls"] }
    ],
    greenKicker: "environmental impact · measurement method", greenTitle: "Local changes where computation happens.",
    greenDesc: "Our environmental assessment starts with comparable tasks: energy on the actual hardware, idle time, and output quality. We will publish conclusions after reproducible measurements.",
    greenCards: [
      { t: "Energy per task", d: "Proposed metric: Wh per comparable task, including inference and device idle time.", icon: "Lightning" },
      { t: "Water", d: "Water estimates require an explicit location, infrastructure, and method. Our assessment will follow those criteria.", icon: "Droplet" },
      { t: "Comparison", d: "Measure the same workflow, model, and quality before claiming savings.", icon: "Server" }
    ],
    flowKicker: "workflow", flowTitle: "From request to review", flowDesc: "Select the context, check the proposed steps, and review the output before using it.",
    flow: [
      { n: "1", t: "Select context", d: "Choose the files and workspace needed." },
      { n: "2", t: "Review the plan", d: "Check the model and tools configured for the task." },
      { n: "3", t: "Assess the result", d: "Review the output and approve only actions whose scope you understand." }
    ],
  },
  ARQUITETURA: {
    kicker: "architecture · beta", title: ["Local context,", "explicit connections,", "visible limits."],
    lead: "The Rust runtime coordinates models, tools, and execution events. A workspace scopes the context; your configuration determines whether inference runs on-device or through an external service.",
    loopKicker: "execution flow", loopTitle: "From selection to output.", loopDesc: "The agent uses the workspace and available tools. Review permissions and the destination of each connection.",
    loop: [
      { tag: "Files", t: "Select a workspace.", d: "Include only the files needed for the task.", chip: "User-selected scope" },
      { tag: "Plan", t: "Review the steps.", d: "Check the task, model, and tools that will be used.", chip: "Plan ready for review" },
      { tag: "Approval", t: "Decide before acting.", d: "Confirmation steps exist for actions covered by current controls.", chip: "Coverage under validation" },
      { tag: "Execution", t: "Review the output.", d: "The runtime executes configured tools and keeps local event records.", chip: "Beta local records" }
    ],
    capsKicker: "product layers", capsTitle: "Architecture that makes the workflow legible.", capsDesc: "Each layer has a purpose: select context, coordinate tools, run models, and record events.",
    caps: [
      { n: "01", tag: "models", t: "Local or remote models", d: "Local models and external providers are configurable; each choice changes the data path." },
      { n: "02", tag: "logs", t: "Event records", d: "The runtime records local events that help follow the workflow and investigate outcomes." },
      { n: "03", tag: "workspace", t: "Logical boundaries", d: "The workspace organizes and scopes context at the application level." },
      { n: "04", tag: "files", t: "File tools", d: "Tools for files and spreadsheets exist; compatibility and coverage should be confirmed per workflow." },
      { n: "05", tag: "review", t: "Approval steps", d: "Writes and network actions may require confirmation depending on tool and setup. Full coverage needs testing." },
      { n: "06", tag: "connections", t: "Optional integrations", d: "An external API may receive instructions or context routed to it. Check the destination and provider policy." },
      { n: "07", tag: "credentials", t: "Handling under review", d: "Provider setup centralizes the connections selected for each workflow." },
      { n: "08", tag: "status", t: "Release preparation", d: "The next phase focuses on distribution, compatibility documentation, and pilots with measurable tasks." }
    ],
    releaseKicker: "early access", releaseTitle: "AetherCore — for teams ready to act on data.", releaseDesc: "We are preparing invitation-based distribution and test workflows to measure quality, review time, and cost per task.", releaseTags: ["Rust runtime", "Configurable models", "Defined workspace", "Human review"]
  },
  CASOS: {
    kicker: "use cases · beta", title: ["Local-first AI", "for file-based", "agent workflows."],
    lead: "AetherCore is built for tasks where files, context, and model choice matter. Organize work in a workspace and follow execution instead of moving data across disconnected tools.",
    problemKicker: "an architecture decision", problemTitle: "Know which service receives each data item.",
    problemDesc: "Assistants and models differ in retention, use, and processing. Consider the service, contract, internal policy, and shared data.",
    steps: [
      { n: "01", tag: "question", t: "Where is data processed?", d: "Identify the model, provider, storage, and services called by the application.", points: ["local or remote model", "provider retention", "integration destinations"] },
      { n: "02", tag: "option", t: "Configure the execution path.", d: "AetherCore supports local models and optional external connections. Results depend on configuration.", points: ["model choice", "selected workspace", "review connections"] },
      { n: "03", tag: "limit", t: "Validate before production use.", d: "Evaluate the workflow in your environment, check results, and set usage rules before expanding adoption.", points: ["test your scenario", "organizational controls", "informed decisions"] }
    ],
    compareKicker: "data paths", compareTitle: "Compare configurations, not slogans.",
    compareDesc: "A general view of the paths between external providers and local or remote models configured in AetherCore.",
    compare: [
      { feat: "Prompt destination", cloud: "The remote service receives submitted content according to its configuration, policy, and contract.", aether: "The model can be local or remote. If remote, routed data may leave the device." },
      { feat: "Storage", cloud: "Retention and use vary by product, account, and contract terms.", aether: "Files remain in the selected workspace; beta logging and retention should be checked." },
      { feat: "File actions", cloud: "Access to local files varies by product.", aether: "File tools exist; compatibility and scope vary by workflow and need validation." },
      { feat: "Approval", cloud: "Controls vary across products and organizational policies.", aether: "Approval steps exist for some actions; full coverage is still under validation." },
      { feat: "Compliance", cloud: "Depends on the service, contract, configuration, and controller obligations.", aether: "Local execution may reduce transfers, but does not establish LGPD compliance." },
      { feat: "External connections", cloud: "The service processes requests on infrastructure defined by its provider.", aether: "Remote integrations are optional but should be assessed and configured deliberately." }
    ],
    audienceKicker: "where to explore", audienceTitle: "Start with the workflow.",
    audienceDesc: "Use the beta for low-risk tasks, measure quality, and identify which data must remain local.",
    audience: [
      { t: "Finance and operations", d: "Evaluate tasks using fictitious or anonymized data before considering real records." },
      { t: "Legal and operations", d: "Test search and review on non-confidential documents while validating limits and results." },
      { t: "Audit and analysis", d: "Compare output with a known process and record errors and review time." },
      { t: "SMBs and technical teams", d: "Map models, files, integrations, and controls before evaluating the beta." }
    ],
  },
  PRINCIPIOS: {
    kicker: "product principles",
    title: "Privacy is not a feature. It's an architecture decision.",
    lead:
      "Choose where AI runs, make connections visible, and keep human review in the workflow. These principles guide AetherCore from the architecture up.",
    manifestoKicker: "manifesto",
    manifestoTitle:
      "Principles behind every workflow.",
    manifestoDesc:
      "The people using the tool should understand model choice, data destination, and review steps.",
    items: [
      { n: "01", tag: "control", t: "Choose where the model runs.", d: "A local model may keep inference on-device; remote providers may receive routed data." },
      { n: "02", tag: "consent", t: "Check every connection.", d: "Destination and content vary by integration. Review them before sending sensitive information." },
      { n: "03", tag: "records", t: "Records help investigation.", d: "The beta keeps local events but does not present them as complete, immutable, or certified." },
      { n: "04", tag: "minimization", t: "Bound the context.", d: "Select needed files and test the workflow with fictitious or anonymized data." },
      { n: "05", tag: "human review", t: "Review covered actions.", d: "Approval steps exist for some actions; coverage and behavior need testing." },
      { n: "06", tag: "code as defense", t: "Code reduces risk; it does not remove all risk.", d: "Implementation needs testing and review; architecture alone is not evidence." },
    ],
  },
  SUSTENTABILIDADE: {
    kicker: "environmental impact · method", title: ["Measure first.", "Compare with", "discipline."],
    lead: "Running a model locally changes where energy is consumed. Our approach is to measure comparable tasks, hardware, and idle time before claiming savings.",
    cardsTitle: "What needs measurement", cardsDesc: "We will compare equivalent tasks and publish the method, hardware, and limitations before claiming savings.",
    cards: [
      { t: "Energy", d: "Record Wh per task and device idle time, using the same quality and model where possible.", icon: "Lightning" },
      { t: "Water", d: "Water estimates depend on location, infrastructure, and method; we treat this as a separate analysis.", icon: "Droplet" },
      { t: "Hardware use", d: "A comparison should include device lifetime, utilization, available capacity, and local energy.", icon: "Server" }
    ],
  },
  SOBRE: {
    kicker: "about the project", title: ["Built around", "control that", "matters."],
    lead: "EXVORN.TECH builds AetherCore to bring AI closer to real work: files, tools, and decisions controlled by the people using it. Founder Matheus Peres da Silva leads the product in Curitiba.",
    teamTitle: "Product lead", teamDesc: "Matheus leads AetherCore architecture, product, and engineering.",
    members: [{ name: "Matheus Peres da Silva", role: "Founder · Product and engineering", bio: "A developer since his teens, he leads AetherCore’s engineering and product strategy. His background spans software, systems, and independent security research." }],
    twinTitle: "Contributors and advisors", twinDesc: "Development benefits from dialogue and voluntary advisory support. Formal collaborations will be announced when established."
  },
  FAQ: {
    kicker: "faq · beta", title: ["Direct answers", "about AetherCore."], lead: "The product is in development. Check the model, data, and tools used by each workflow.",
    items: [
      { q: "What does local-first mean?", a: "It is an architecture priority to keep more processing close to the user. The actual path depends on configured models and integrations." },
      { q: "Is AetherCore available?", a: "We are organizing invitation-based early access. Get in touch to discuss workflows and the next test phase." },
      { q: "Why offer a free local core?", a: "Free access broadens adoption without requiring EXVORN to pay for each user's local inference: it runs on hardware and models they choose. Planned revenue comes from team deployment, support, and governance, contracted to a defined scope." },
      { q: "Do my files stay on the device?", a: "Files can be selected in a local workspace. If a remote model or integration receives that content, it may leave the device." },
      { q: "Does the product work fully offline?", a: "With a local model configured, inference can run on-device. Updates and optional integrations may use the network." },
      { q: "Does AetherCore guarantee LGPD compliance?", a: "No. Compliance depends on context, legal bases, contracts, policies, and organizational controls." },
      { q: "Is there an operating-system sandbox?", a: "Documented isolation is logical at workspace level; it is not an operating-system sandbox, VM, or container." },
      { q: "How are credentials protected?", a: "The beta includes credential management. It needs independent review before being presented as an enterprise control." }
    ],
  },
  PRIVACIDADE: {
    kicker: "privacy · beta", title: "Understand every data path.", lead: "Behavior depends on configuration, model, tools, and connected services.",
    policyKicker: "data paths", policyTitle: "You choose the execution path.", policyDesc: "Model and integration settings determine which data goes to external services. Review those choices for each workflow.",
    cards: [
      { tag: "models", t: "Local or remote", d: "A local model may process inference on-device. An external provider may receive data sent to it." },
      { tag: "approval", t: "Review covered actions", d: "Approval steps exist for some write and network actions; full coverage still needs validation." },
      { tag: "records", t: "Inspect beta logs", d: "The application keeps local event records. We do not describe them as immutable, complete, or certified." },
      { tag: "credentials", t: "Security under review", d: "Credential handling needs independent review before sensitive enterprise use." },
      { tag: "connections", t: "Check destination and content", d: "Before using an external API, identify its destination, transmitted data, and provider rules." },
      { tag: "limits", t: "Informed choice", d: "Match each task with the model, integration, and controls appropriate for your environment." }
    ],
  },
  ROADMAP: {
    kicker: "roadmap · execution hypotheses", title: "Prove value before scaling.", lead: "The execution sequence: distribution, security, measurable pilots, and commercial expansion informed by results.",
    timelineKicker: "next steps", timelineTitle: "A sequence to reduce uncertainty.", timelineDesc: "Each step depends on the previous one and may change with usage evidence.",
    phases: [
      { period: "Step 1", t: "Prepare a test release", d: "Consolidate an installer, validate a clean Windows installation, and publish a supported-model matrix." },
      { period: "Step 2", t: "Review security boundaries", d: "Map data flows, permissions, storage, and attack surfaces; seek independent review." },
      { period: "Step 3", t: "Run consented pilots", d: "Invite a small group to low-risk tasks and record quality, failures, review time, and cost." },
      { period: "Step 4", t: "Validate commercial sustainability", d: "Test willingness to pay and support cost before publishing tiers, prices, or revenue targets." }
    ],
    metricsKicker: "proposed metrics", metricsTitle: "What we will measure.", metricsDesc: "Quality, cost, and data control guide each pilot.",
    metrics: [
      { tag: "product", t: "Task completion", d: "Measure completed tasks, errors, human intervention, and review time." },
      { tag: "security", t: "Data flows", d: "Inventory each connection and validate which content leaves the device." },
      { tag: "business", t: "Willingness to pay", d: "Interview users and run pilots before announcing conversion, revenue, or final pricing." }
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
    kicker: "technical and commercial brief", title: ["AetherCore:", "evidence before", "scale."], lead: "The EXVORN.TECH thesis: bring actionable AI close to files, with model choice, focused context, and human review.",
    summaryKicker: "product thesis", summaryTitle: "Four questions guide the next phase.",
    blocks: [
      { tag: "01. problem", t: "Data crosses multiple services", d: "Teams need to know which models and integrations receive their files and work instructions." },
      { tag: "02. approach", t: "Models close to context", d: "AetherCore connects an agent to workspaces and tools, with local models and remote providers as options." },
      { tag: "03. controls", t: "Scope and review", d: "Workspace controls and approvals exist in the beta; isolation and coverage need full validation." },
      { tag: "04. market", t: "Start with file-based work", d: "We start with teams handling documents and spreadsheets, where context, review time, and data destination have clear economic value." },
      { tag: "05. maturity", t: "Technical foundation built", d: "The desktop app, Rust runtime, and component tests form the foundation for distribution and measurable pilots." },
      { tag: "06. capital", t: "Proposed use", d: "Funding would support a testable product, independent review, consented pilots, and commercial discovery." }
    ],
    planKicker: "planned milestones", planTitle: "Validation sequence", plan: [
      { period: "Step 1", d: "Prepare an installer and document supported versions and models." },
      { period: "Step 2", d: "Validate data boundaries and seek an independent security review." },
      { period: "Step 3", d: "Run consented pilots with low-risk tasks and data." },
      { period: "Step 4", d: "Validate price, support cost, and freemium model before a commercial offer." }
    ],
  },
  PRICING: {
    kicker: "access model", title: ["Free access", "with a", "sustainable model."],
    lead: "Our launch strategy pairs a free local core for adoption with team solutions for deployment, support, and governance under proposal. Request early access.",
    annualLabel: "Access strategy", annualSaveLabel: "Early access", buttonLabel: "Discuss the beta", contactLabel: "Discuss the beta",
    plans: [
      { id: "free", name: "Aether Free", description: "Free local core planned for public launch.", priceMonthly: null, priceYearly: null, users: "Planned launch", recommended: false, features: [{ label: "Local inference with user hardware and model", included: true }, { label: "Local inference uses user hardware", included: true }] },
      { id: "go", name: "Aether Go", description: "Individual desktop experience and support: commercial scope in development.", priceMonthly: null, priceYearly: null, users: "Early access", recommended: false, features: [{ label: "Desktop package and support planned", included: true }, { label: "Invitation-based early access", included: true }] },
      { id: "enterprise", name: "Aether Enterprise", description: "Team deployment and support, scoped by proposal.", priceMonthly: null, priceYearly: null, users: "By proposal", recommended: false, features: [{ label: "Administration and governance planned", included: true }, { label: "Scope and support defined by contract", included: true }] },
      { id: "scale", name: "Aether Scale", description: "Dedicated infrastructure designed for specific needs.", priceMonthly: null, priceYearly: null, users: "Custom proposal", recommended: false, features: [{ label: "Dedicated deployment and integrations planned", included: true }, { label: "Project and terms defined before agreement", included: true }] }
    ],
  },
  PLUGINS: {
    kicker: "extensibility",
    title: ["AetherCore", "Plugins."],
    lead: "Integrations are under evaluation. Confirm availability, data destinations, and controls before enabling a connector.",
    cardsTitle: "Connectors under evaluation",
    cardsDesc: "This list points to possible technologies; it does not confirm that each integration is available, audited, or production-ready.",
    cards: [
      {
        t: "Local engines · LocalAI + Ollama",
        d: "Ollama and LocalAI are local execution options. Compatibility, versions, and limits need per-model validation.",
        icon: "Cpu",
        link: "https://localai.io"
      },
      {
        t: "Telegram Bridge",
        d: "A messaging channel may route instructions and replies to external services. Availability and approvals should be checked in the workflow used.",
        icon: "PaperPlaneTilt",
        link: "https://core.telegram.org/bots/api"
      },
      {
        t: "Model API Bridge",
        d: "Remote providers may receive prompts and context routed to them. Review the provider, contract, and content being sent.",
        icon: "Brain",
        link: "https://platform.openai.com/docs/api-reference"
      },
      {
        t: "MCP Bridge",
        d: "Connections to external MCP servers are a technical possibility; permissions, destinations, and availability need validation.",
        icon: "Blocks",
        link: "https://modelcontextprotocol.io"
      },
      {
        t: "Tools & Memory RAG",
        d: "Memory, vector indexes, and RAG pipelines remain subject to implementation and data-handling validation.",
        icon: "Database"
      },
      {
        t: "Local webhooks & events",
        d: "Webhooks and local events are under study; availability and performance are not committed.",
        icon: "ArrowsClockwise"
      }
    ],
    featuresTitle: "Extension boundaries",
    featuresDesc: "Extension security and isolation still need independent review.",
    features: [
      {
        title: "plugin.json Manifests",
        desc: "Manifests and permissions need connector-by-connector review; complete validation remains pending."
      },
      {
        title: "Workspace Boundaries",
        desc: "Workspace boundaries are logical within the app and are not an operating-system sandbox."
      }
    ]
  },

};
