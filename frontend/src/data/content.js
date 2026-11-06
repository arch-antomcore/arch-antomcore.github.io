// Bilíngue (PT/EN) - Estruturado para o pitch do Programa Centelha Paraná.
// A versão do produto definida aqui deve refletir sempre a versão mais recente anunciada na área de Blog. O Blog é a fonte da verdade.
// Copy distinguishes beta behavior, evidence, and roadmap.

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
    { label: "Status do produto", to: "/validacao" },
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
    heroStatus: "Local-first · beta em validação",
    aether: {
      eyebrow: "IA local-first para fluxos de trabalho",
      eyebrowRight: "BETA · v0.6.0",
      headline: { l1: "IA para", l2: "trabalho real.", l3a: "Com", l3b: "controle." },
      sub: "O AetherCore aproxima modelos configuráveis e ferramentas dos arquivos de trabalho. A execução pode ser local ou conectada; cada fluxo deve deixar claro quais dados seguem para serviços externos.",
      consoleLabel: "Console AetherCore",
      consoleLive: "Runtime beta",
      scrollBadge: "Role para explorar • AetherCore •",
      chapters: [
        { n: "01", title: "Tarefas com contexto", body: "Conecte um modelo configurado a arquivos escolhidos e confira como o fluxo se comporta." },
        { n: "02", title: "Plano para revisão", body: "Revise as etapas e os efeitos esperados antes de permitir ações cobertas pelos controles do beta." },
        { n: "03", title: "Local quando configurado", body: "Modelos locais podem processar no dispositivo; integrações e provedores remotos podem transmitir dados." },
      ],
      marquee: ["AETHERCORE", "IA LOCAL-FIRST EM BETA", "CONTROLE DO FLUXO DE DADOS"],
    },
    heroRotate: ["executam.", "planejam.", "revisam.", "auditam.", "automatizam."],
    heroChipsLabel: "o que está em desenvolvimento",
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
    titleEnd: "Beta em evolução.",
    primaryCta: "Solicitar acesso antecipado",
    secondaryCta: "Ver primeiro caso com XLSX",
    lead:
      "O AetherCore conecta modelos e ferramentas a workspaces escolhidos. O processamento pode ser local ou remoto; confira cada integração antes de usar dados sensíveis.",
    metrics: [
      { k: "Modelos", v: "locais ou remotos" },
      { k: "Revisão", v: "controles em validação" },
      { k: "Dados", v: "caminho por configuração" },
    ],
    pillars: [
      { t: "Local-first", d: "modelo local opcional" },
      { t: "Revisão", d: "cobertura em validação" },
      { t: "Registros", d: "eventos locais do beta" },
      { t: "Integrações", d: "destino configurável" },
    ],
    whatIsAether: {
      kicker: "o que o aether faz?",
      title: "Sua IA de trabalho, local por padrão.",
      desc: "Agente em beta para tarefas com arquivos, com modelos locais e conexões externas configuráveis. O caminho de dados depende da configuração.",
      cards: [
        { t: "Chat & escrita", d: "Explore modelos configurados para rascunhos e organização de ideias.", icon: "MessageSquareText" },
        { t: "Ferramentas", d: "Teste ferramentas disponíveis em tarefas delimitadas.", icon: "Code2" },
        { t: "Arquivos", d: "Avalie fluxos com planilhas e arquivos de teste.", icon: "Table2" },
        { t: "Conexões", d: "Verifique destino e conteúdo antes de acionar serviços externos.", icon: "Globe" },
      ]
    },
    stackKicker: "base técnica",
    stackTitle: "O que roda por baixo.",
    stackDesc:
      "O runtime coordena ferramentas e modelos configurados. Modelos locais podem processar no dispositivo; integrações e provedores remotos podem enviar dados a outros serviços.",
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
      "A beta explora tarefas com arquivos e ferramentas. Compatibilidade, aprovações e destinos de dados variam por fluxo.",
    synth: [
      {
        tag: "Problema",
        t: "Dados sensíveis espalhados em ferramentas de terceiros",
        d: "Informações críticas acabam em serviços externos, sem controle sobre quem acessa ou o que acontece com elas.",
      },
      {
        tag: "Solução",
        t: "IA que roda perto dos arquivos",
        d: "Modelos locais podem processar no dispositivo. Conexões remotas são possíveis e parte das ações passa por revisão.",
      },
      {
        tag: "Entrada",
        t: "Primeiro caso: planilhas",
        d: "Planilhas de teste ajudam a avaliar resultados e limites antes de considerar dados reais.",
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
    lead: "O AetherCore combina interface desktop, runtime em Rust e modelos locais ou remotos configurados pelo usuário. Está em beta; suporte e fronteiras variam por fluxo e ainda exigem validação.",
    solutionKicker: "o que estamos construindo", solutionTitle: "Levar a IA para perto do trabalho.",
    solutionDesc: "No modo local, o modelo pode rodar no seu hardware. Provedores externos são opcionais e podem receber os dados enviados a eles.",
    blocks: [
      { n: "01", tag: "Contexto de trabalho", t: "Escolha o que entra no workspace", d: "O agente trabalha com arquivos selecionados. Confira escopo e modelo antes de incluir informação sensível.", points: ["arquivos selecionados", "contexto delimitado", "beta em evolução"] },
      { n: "02", tag: "Agente", t: "Plano, ferramentas e resultado", d: "O runtime organiza etapas e chama ferramentas disponíveis. Qualidade e cobertura dependem do modelo e da tarefa.", points: ["plano de execução", "ferramentas configuradas", "revisão do resultado"] },
      { n: "03", tag: "Aprovação", t: "Revise antes de ações sensíveis", d: "Há etapas de revisão para parte das ações de escrita e conexões externas. A cobertura completa ainda precisa de validação.", points: ["revisão humana", "escopo visível", "limites em validação"] },
      { n: "04", tag: "Credenciais", t: "Integrações configuráveis", d: "O beta pode conectar modelos e serviços externos. Armazenamento e ciclo de vida de credenciais precisam de revisão antes de uso sensível.", points: ["provedores configuráveis", "integrações opcionais", "revisão independente pendente"] }
    ],
    offeringsKicker: "modos de uso", offeringsTitle: "Um núcleo. Caminhos de execução diferentes.",
    offeringsDesc: "Descrição técnica, não oferta comercial. Recursos, disponibilidade e fronteiras ainda estão em validação.",
    offerings: [
      { name: "Modelo local", audience: "No dispositivo", t: "Mantenha a inferência no hardware configurado.", d: "Pode reduzir o envio de prompts a provedores externos; não significa que toda a aplicação funcione offline.", points: ["depende do modelo instalado", "usa recursos locais", "integrações podem usar a rede"] },
      { name: "Provedor externo", audience: "Conexão opcional", t: "Escolha uma API quando necessário.", d: "O conteúdo enviado fica sujeito ao serviço, contrato e configuração utilizados.", points: ["destino conforme configuração", "revise os dados enviados", "sem conformidade automática"] },
      { name: "Uso por equipe", audience: "Em pesquisa", t: "Governança para times é hipótese de produto.", d: "Administração multiusuário, políticas e suporte corporativo ainda não são uma oferta disponível.", points: ["roadmap em validação", "sem SLA anunciado", "sem certificação anunciada"] }
    ],
    greenKicker: "impacto ambiental · medição pendente", greenTitle: "Local muda onde a computação acontece.",
    greenDesc: "Ainda não medimos energia ou água por tarefa no AetherCore. O impacto depende do hardware, modelo, utilização e matriz elétrica.",
    greenCards: [
      { t: "Energia por tarefa", d: "Métrica proposta: Wh por tarefa comparável, incluindo inferência e tempo ocioso.", icon: "Lightning" },
      { t: "Água", d: "Não publicamos estimativa de água por conversa; qualquer comparação exige método e fonte explícitos.", icon: "Droplet" },
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
    lead: "O runtime em Rust coordena ferramentas e modelos configurados. Local-first reduz alguns caminhos externos; não torna automaticamente toda a aplicação offline ou isolada.",
    loopKicker: "fluxo de execução", loopTitle: "Da seleção ao resultado.", loopDesc: "O agente usa workspace e ferramentas disponíveis. Revise as permissões e o destino de cada conexão.",
    loop: [
      { tag: "Arquivos", t: "Selecione o workspace.", d: "Inclua apenas os arquivos necessários para a tarefa.", chip: "Escopo escolhido pelo usuário" },
      { tag: "Plano", t: "Revise as etapas.", d: "Confira tarefa, modelo e ferramentas que serão acionadas.", chip: "Plano para revisão" },
      { tag: "Aprovação", t: "Decida antes de agir.", d: "Há confirmações para ações cobertas pelos controles atuais.", chip: "Cobertura em validação" },
      { tag: "Execução", t: "Confira o resultado.", d: "O runtime executa ferramentas configuradas e mantém registros locais de eventos.", chip: "Registro local do beta" }
    ],
    capsKicker: "capacidades e limites", capsTitle: "O que a arquitetura busca oferecer.", capsDesc: "Descrição da direção e implementação beta; não equivale a auditoria independente ou certificação.",
    caps: [
      { n: "01", tag: "modelos", t: "Modelos locais ou remotos", d: "Modelos locais e provedores externos são configuráveis; cada escolha muda o caminho dos dados." },
      { n: "02", tag: "logs", t: "Registro de eventos", d: "O beta mantém registros locais. Não os descrevemos como imutáveis ou certificados." },
      { n: "03", tag: "workspace", t: "Limites lógicos", d: "O controle atual é lógico na aplicação; não é sandbox do sistema operacional, VM ou contêiner." },
      { n: "04", tag: "arquivos", t: "Ferramentas para arquivos", d: "Há ferramentas para arquivos e planilhas; compatibilidade e cobertura devem ser confirmadas por fluxo." },
      { n: "05", tag: "revisão", t: "Etapas de aprovação", d: "Ações de escrita e rede podem exigir confirmação conforme ferramenta e configuração. Cobertura completa precisa de teste." },
      { n: "06", tag: "conexões", t: "Integrações opcionais", d: "Uma API externa pode receber instruções ou contexto encaminhado a ela. Verifique destino e política do provedor." },
      { n: "07", tag: "credenciais", t: "Tratamento em revisão", d: "Gestão de credenciais existe no beta; armazenamento, ciclo de vida e segurança precisam de revisão independente." },
      { n: "08", tag: "estado", t: "Versão em preparação", d: "Instalador, instalação limpa, assinatura e matriz de modelos suportados seguem pendentes." }
    ],
    releaseKicker: "estado de desenvolvimento", releaseTitle: "Beta — preparação para validação externa.", releaseDesc: "O lançamento público ainda não foi aprovado. Pacote instalável, matriz de modelos e revisão de segurança permanecem pendentes.", releaseTags: ["Rust runtime", "Modelos configuráveis", "Controles de workspace", "Validação pendente"]
  },
  CASOS: {
    kicker: "casos de uso · beta", title: ["IA local-first", "para fluxos com", "arquivos e agentes."],
    lead: "O AetherCore explora como aproximar modelos e ferramentas dos arquivos de trabalho. A configuração pode ser local ou conectada; não prometemos conformidade regulatória nem ausência de vazamentos.",
    problemKicker: "decisão de arquitetura", problemTitle: "Saiba qual serviço recebe cada dado.",
    problemDesc: "Assistentes e modelos diferem em retenção, uso e processamento. Considere serviço, contrato, política interna e dados compartilhados.",
    steps: [
      { n: "01", tag: "pergunta", t: "Onde os dados são processados?", d: "Identifique modelo, provedor, armazenamento e serviços chamados pela aplicação.", points: ["modelo local ou remoto", "retenção do provedor", "destinos das integrações"] },
      { n: "02", tag: "opção", t: "Configure o caminho de execução.", d: "O AetherCore aceita modelos locais e conexões externas opcionais. O resultado depende da configuração.", points: ["escolha do modelo", "workspace selecionado", "revisão das conexões"] },
      { n: "03", tag: "limite", t: "Valide antes de usar em produção.", d: "O produto está em beta e não substitui controles de segurança, análise jurídica ou avaliação de impacto.", points: ["teste no seu cenário", "controles organizacionais", "sem garantia de conformidade"] }
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
      "Preferir execução local quando fizer sentido, tornar conexões visíveis e deixar limites claros. O beta ainda não valida todos os fluxos.",
    manifestoKicker: "manifesto",
    manifestoTitle:
      "Princípios que precisam ser verificados em cada fluxo.",
    manifestoDesc:
      "O beta busca tornar modelo, destino de dados e etapas de revisão compreensíveis. A implementação e a cobertura ainda precisam de validação.",
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
    kicker: "impacto ambiental · medição pendente", title: ["Computação local", "também consome", "recursos."],
    lead: "Mover inferência para um dispositivo muda a localização do consumo; não prova, por si só, menor impacto. Ainda não medimos energia ou água por tarefa no AetherCore.",
    cardsTitle: "O que precisa ser medido", cardsDesc: "Vamos comparar tarefas equivalentes e publicar método, hardware e limitações antes de afirmar qualquer economia.",
    cards: [
      { t: "Energia", d: "Registrar Wh por tarefa e tempo ocioso, usando a mesma qualidade e modelo quando possível.", icon: "Lightning" },
      { t: "Água", d: "Não há métrica de água do AetherCore. Estimativas dependem de localização, infraestrutura e método.", icon: "Droplet" },
      { t: "Uso do hardware", d: "A comparação deve incluir vida útil, utilização, capacidade disponível e energia local.", icon: "Server" }
    ],
  },
  SOBRE: {
    kicker: "sobre o projeto", title: ["Um fundador.", "Um produto em", "construção."],
    lead: "A EXVORN.TECH desenvolve o AetherCore, um agente de IA local-first em beta. A equipe e as validações externas serão apresentadas conforme papéis e evidências forem confirmados.",
    teamTitle: "Responsável pelo produto", teamDesc: "O fundador conduz a implementação e a preparação da validação do AetherCore.",
    members: [{ name: "Matheus Peres da Silva", role: "Fundador · Produto e engenharia", bio: "Desenvolve o AetherCore e coordena sua preparação para testes externos. Qualificações e trajetória profissional estão descritas no currículo técnico." }],
    twinTitle: "Colaborações e consultoria", twinDesc: "Apoio voluntário não representa vínculo empregatício, nomeação pública, endosso institucional ou validação oficial do produto. Colaboradores e escopos serão identificados somente com confirmação e autorização."
  },
  FAQ: {
    kicker: "faq · beta", title: ["Perguntas diretas", "sobre o AetherCore."], lead: "O produto está em desenvolvimento. Confira o modelo, os dados e as ferramentas de cada fluxo.",
    items: [
      { q: "O que significa local-first?", a: "É uma prioridade de arquitetura para manter mais processamento perto do usuário. O caminho real depende do modelo e das integrações." },
      { q: "O AetherCore está disponível?", a: "Está em beta e ainda não tem lançamento público aprovado nem oferta comercial ativa." },
      { q: "Meus arquivos ficam no dispositivo?", a: "Arquivos podem ser selecionados em um workspace local. Se um modelo ou integração remota receber esse conteúdo, ele pode sair do dispositivo." },
      { q: "O produto funciona totalmente offline?", a: "Não afirmamos funcionamento totalmente offline. Modelos locais podem funcionar sem provedor remoto, mas atualizações e integrações podem usar a rede." },
      { q: "O AetherCore garante conformidade com a LGPD?", a: "Não. Conformidade depende do contexto, bases legais, contratos, políticas e controles da organização." },
      { q: "Há sandbox de sistema operacional?", a: "O isolamento documentado é lógico no nível do workspace; não equivale a sandbox do sistema operacional, VM ou contêiner." },
      { q: "Como são protegidas credenciais?", a: "O beta inclui gestão de credenciais. A implementação precisa de revisão independente antes de ser apresentada como controle corporativo." }
    ],
  },
  PRIVACIDADE: {
    kicker: "privacidade · beta", title: "Entenda cada caminho de dados.", lead: "O comportamento depende da configuração, do modelo, das ferramentas e dos serviços conectados.",
    policyKicker: "limites do produto", policyTitle: "Local-first reduz alguns envios; não é garantia.", policyDesc: "Esta página não é política jurídica nem atestado de segurança. Avalie a versão e a configuração antes de usar dados reais.",
    cards: [
      { tag: "modelos", t: "Local ou remoto", d: "Um modelo local pode processar inferência no dispositivo. Um provedor externo pode receber dados enviados a ele." },
      { tag: "aprovação", t: "Revise ações cobertas", d: "Há etapas de aprovação para parte das ações de escrita e rede; a cobertura completa ainda precisa ser validada." },
      { tag: "registros", t: "Consulte os logs do beta", d: "O aplicativo mantém registros locais de eventos. Não os descrevemos como imutáveis, completos ou certificados." },
      { tag: "credenciais", t: "Segurança sob revisão", d: "O tratamento de credenciais precisa de revisão independente antes de uso corporativo sensível." },
      { tag: "conexões", t: "Confira destino e conteúdo", d: "Antes de usar uma API externa, identifique o destino, os dados transmitidos e as regras do provedor." },
      { tag: "limites", t: "Sem garantia absoluta", d: "O beta não garante ausência de vazamentos, segurança infalível ou conformidade automática com a LGPD." }
    ],
  },
  ROADMAP: {
    kicker: "roadmap · hipóteses de execução", title: "Provar valor antes de escalar.", lead: "Marcos planejados; dependem de capacidade técnica, segurança, interesse de usuários e regras futuras do programa.",
    timelineKicker: "próximas etapas", timelineTitle: "Uma sequência para reduzir incerteza.", timelineDesc: "Cada etapa depende da anterior e pode mudar com evidência de uso.",
    phases: [
      { period: "Etapa 1", t: "Preparar versão de teste", d: "Consolidar instalador, validar instalação limpa no Windows e publicar uma matriz de modelos suportados." },
      { period: "Etapa 2", t: "Revisar limites de segurança", d: "Mapear fluxos de dados, permissões, armazenamento e superfícies de ataque; buscar revisão independente." },
      { period: "Etapa 3", t: "Executar pilotos consentidos", d: "Convidar poucos usuários para tarefas de baixo risco e registrar qualidade, falhas, tempo de revisão e custo." },
      { period: "Etapa 4", t: "Validar sustentabilidade comercial", d: "Testar disposição a pagar e custo de suporte antes de publicar tiers, preços ou metas de receita." }
    ],
    metricsKicker: "métricas propostas", metricsTitle: "Medir o que ainda não sabemos.", metricsDesc: "Não são resultados atuais; são indicadores para os próximos testes.",
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
    kicker: "resumo técnico e comercial", title: ["AetherCore:", "evidência antes", "de escala."], lead: "Visão concisa do produto, estágio e hipóteses de mercado. Diferencia fatos observados, plano e questões sem prova.",
    summaryKicker: "tese de produto", summaryTitle: "Quatro questões guiam a próxima fase.",
    blocks: [
      { tag: "01. problema", t: "Dados atravessam múltiplos serviços", d: "Equipes precisam saber quais modelos e integrações recebem arquivos e instruções de trabalho." },
      { tag: "02. abordagem", t: "Modelos próximos ao contexto", d: "O AetherCore conecta um agente a workspaces e ferramentas, com modelos locais e provedores remotos como opções." },
      { tag: "03. controles", t: "Escopo e revisão", d: "Controles de workspace e aprovações existem no beta; isolamento e cobertura precisam de validação completa." },
      { tag: "04. mercado", t: "Segmento a descobrir", d: "Setores com documentos sensíveis são hipótese de entrada. Segmento, comprador e disposição a pagar precisam de entrevistas e pilotos." },
      { tag: "05. maturidade", t: "Versão beta", d: "Há código e testes focados; instalação completa, integração CEF, revisão de segurança e liberação pública seguem pendentes." },
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
    lead: "Estratégia em validação: núcleo local gratuito como hipótese; recursos para equipes e suporte pagos somente se forem construídos e houver disposição a pagar. Nenhum preço está publicado.",
    annualLabel: "Modelo em validação", annualSaveLabel: "Sem desconto anunciado", buttonLabel: "Conversar sobre beta", contactLabel: "Conversar sobre beta",
    plans: [
      { id: "free", name: "Aether Free", description: "Hipótese de núcleo local gratuito para testar adoção; não é oferta disponível.", priceMonthly: null, priceYearly: null, users: "Proposta · não disponível", recommended: false, features: [{ label: "Núcleo local gratuito — hipótese em validação", included: true }, { label: "Sem créditos ilimitados de inferência em nuvem subsidiados", included: true }] },
      { id: "go", name: "Aether Go", description: "Possível distribuição desktop individual; escopo e preço não definidos.", priceMonthly: null, priceYearly: null, users: "Conceito · sem preço publicado", recommended: false, features: [{ label: "Pacote desktop e suporte — escopo em estudo", included: true }, { label: "Disponibilidade ainda não anunciada", included: true }] },
      { id: "enterprise", name: "Aether Enterprise", description: "Possíveis controles para equipes; não é oferta comercial ativa.", priceMonthly: null, priceYearly: null, users: "Roadmap · não disponível", recommended: false, features: [{ label: "Administração e governança — roadmap", included: true }, { label: "Sem SLA ou certificação anunciados", included: true }] },
      { id: "scale", name: "Aether Scale", description: "Hipótese de implantação dedicada, sujeita a validação técnica e comercial.", priceMonthly: null, priceYearly: null, users: "Hipótese · sob validação", recommended: false, features: [{ label: "Implantação e integrações dedicadas — hipótese", included: true }, { label: "Sem compromisso de entrega ou preço publicado", included: true }] }
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
  VALIDACAO: {
    kicker: "estado do produto · beta", title: ["Beta técnica", "em preparação", "para validação externa."],
    lead: "Resumo do estágio atual e das próximas provas. Não há cliente, piloto formal, referência pública ou receita reportada.",
    stats: [{ k: "Beta", label: "Estado atual", sub: "Lançamento público não aprovado" }, { k: "Local + remoto", label: "Modelos", sub: "O caminho depende da configuração" }, { k: "Em aberto", label: "Segurança", sub: "Revisão independente pendente" }, { k: "Sem oferta", label: "Comercial", sub: "Preços e tiers em validação" }],
    partner: { name: "Não aplicável", sector: "Sem parceiro ou cliente público", tagline: "Sem validação institucional publicada", location: "Brasil", origin: "Informação pública limitada ao estado do produto", description: "Não há caso de cliente divulgado ou homologação externa." },
    founderRole: { kicker: "responsabilidade do produto", title: "Produto e engenharia", subtitle: "Matheus Peres da Silva · fundador", workplace: "EXVORN.TECH", duties: [] },
    stressTest: { kicker: "limites conhecidos", title: "O que ainda precisa ser provado.", desc: "Os itens são marcos de validação, não resultados já obtidos.", pillars: [
      { n: "01", tag: "Distribuição", title: "Instalação confiável", desc: "Preparar pacote assinado e validar instalação limpa no Windows.", badge: "Pendente" },
      { n: "02", tag: "Segurança", title: "Revisão independente", desc: "Avaliar fluxos de dados, credenciais, permissões e limites do workspace.", badge: "Pendente" },
      { n: "03", tag: "Uso", title: "Pilotos consentidos", desc: "Testar tarefas de baixo risco com métricas e autorização explícita.", badge: "Planejado" },
      { n: "04", tag: "Negócio", title: "Disposição a pagar", desc: "Validar suporte, preço e modelo freemium antes de vender.", badge: "Planejado" }
    ] },
    verdict: { kicker: "status", quote: "AetherCore está em beta. As capacidades e limites publicados descrevem o estágio, não uma certificação ou garantia.", author: "EXVORN.TECH", badge: "Em validação" },
    terminal: { kicker: "estado de desenvolvimento", title: "Resumo do beta", filename: "aethercore-beta-status", badge: "Lançamento público pendente", lines: ["[STATUS] Interface desktop e runtime em Rust em desenvolvimento.", "[MODELS] Opções locais e conexões externas conforme configuração.", "[BOUNDARY] Isolamento de workspace é lógico, não sandbox do sistema operacional.", "[EVIDENCE] Sem auditoria independente ou piloto formal divulgado.", "[RELEASE] Instalador final, assinatura e aprovação pública pendentes."] }
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
    { label: "Product status", to: "/validacao" },
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
    heroStatus: "Local-first · beta under validation",
    aether: {
      eyebrow: "Local-first AI for file-based work",
      eyebrowRight: "BETA · v0.6.0",
      headline: { l1: "AI for", l2: "real work.", l3a: "With", l3b: "control." },
      sub: "AetherCore brings configurable models and tools closer to work files. Execution can be local or connected; each workflow should make clear which data goes to external services.",
      consoleLabel: "AetherCore Console",
      consoleLive: "Beta runtime",
      scrollBadge: "Scroll to explore • AetherCore •",
      chapters: [
        { n: "01", title: "Contextual tasks", body: "Connect a configured model to selected files and inspect how the workflow behaves." },
        { n: "02", title: "A plan to review", body: "Review steps and expected effects before allowing actions covered by beta controls." },
        { n: "03", title: "Local when configured", body: "Local models may process on-device; integrations and remote providers may transmit data." },
      ],
      marquee: ["AETHERCORE", "LOCAL-FIRST AI IN BETA", "VISIBLE DATA PATHS"],
    },
    heroRotate: ["execute.", "plan.", "review.", "audit.", "automate."],
    heroChipsLabel: "what is in development",
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
    titleEnd: "Beta in progress.",
    primaryCta: "Request early access",
    secondaryCta: "See the first XLSX case",
    lead:
      "AetherCore connects models and tools to selected workspaces. Processing may be local or remote; review each integration before using sensitive data.",
    metrics: [
      { k: "Models", v: "local or remote" },
      { k: "Review", v: "controls under validation" },
      { k: "Data", v: "path depends on setup" },
    ],
    pillars: [
      { t: "Local-first", d: "local models are optional" },
      { t: "Review", d: "coverage under validation" },
      { t: "Records", d: "beta local events" },
      { t: "Integrations", d: "configurable destinations" },
    ],
    whatIsAether: {
      kicker: "what does aether do?",
      title: "Your working AI, local-first by design.",
      desc: "A beta agent for file-based tasks, with local-model options and configurable external connections. Data paths depend on configuration.",
      cards: [
        { t: "Chat & writing", d: "Explore configured models for drafts and idea organization.", icon: "MessageSquareText" },
        { t: "Tools", d: "Try available tools on bounded tasks.", icon: "Code2" },
        { t: "Files", d: "Evaluate spreadsheet and file workflows with test data.", icon: "Table2" },
        { t: "Connections", d: "Check destination and content before using external services.", icon: "Globe" },
      ]
    },
    stackKicker: "technical foundation",
    stackTitle: "What runs underneath.",
    stackDesc:
      "The runtime coordinates configured tools and models. Local models may process on-device; integrations and remote providers may send data to other services.",
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
      "The beta explores file-based tasks and tools. Compatibility, approvals, and data destinations vary by workflow.",
    synth: [
      {
        tag: "The Problem",
        t: "Sensitive data scattered across third-party tools",
        d: "Information may move through external services without a clear view of destination, retention, or access rules.",
      },
      {
        tag: "The Solution",
        t: "AI running close to your files",
        d: "Local models may process on-device. Remote connections are possible and some actions go through review.",
      },
      {
        tag: "Inception",
        t: "First Use Case: Spreadsheets",
        d: "Test spreadsheets help evaluate output and limitations before considering real data.",
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
    lead: "AetherCore combines a desktop interface, Rust runtime, and user-configured local or remote models. It is in beta; support and boundaries vary by workflow and still need validation.",
    solutionKicker: "what we are building", solutionTitle: "Bring AI closer to the work.",
    solutionDesc: "In local mode, a model can run on your hardware. External providers are optional and may receive data sent to them.",
    blocks: [
      { n: "01", tag: "Work context", t: "Choose what enters the workspace", d: "The agent works with selected files. Check scope and model before including sensitive information.", points: ["selected files", "bounded context", "beta in development"] },
      { n: "02", tag: "Agent", t: "Plans, tools, and output", d: "The runtime organizes steps and calls available tools. Quality and coverage depend on the model and task.", points: ["execution plan", "configured tools", "review the output"] },
      { n: "03", tag: "Approval", t: "Review sensitive actions", d: "Review steps exist for some file writes and external connections. Full coverage still needs validation.", points: ["human review", "visible scope", "limits under validation"] },
      { n: "04", tag: "Credentials", t: "Configurable integrations", d: "The beta can connect to models and external services. Credential storage and lifecycle need review before sensitive use.", points: ["configurable providers", "optional integrations", "independent review pending"] }
    ],
    offeringsKicker: "execution modes", offeringsTitle: "One core. Different execution paths.",
    offeringsDesc: "Technical description, not a commercial offer. Features, availability, and boundaries are still being validated.",
    offerings: [
      { name: "Local model", audience: "On-device", t: "Keep inference on configured hardware.", d: "It may reduce prompt sharing with external providers; it does not mean the whole application works offline.", points: ["depends on installed model", "uses local resources", "integrations may use the network"] },
      { name: "External provider", audience: "Optional connection", t: "Choose an API when needed.", d: "Content sent is subject to the service, contract, and configuration in use.", points: ["destination depends on setup", "review data being sent", "no automatic compliance"] },
      { name: "Team use", audience: "Under research", t: "Team governance is a product hypothesis.", d: "Multi-user administration, policies, and enterprise support are not an available offer yet.", points: ["roadmap under validation", "no announced SLA", "no announced certification"] }
    ],
    greenKicker: "environmental impact · measurement pending", greenTitle: "Local changes where computation happens.",
    greenDesc: "We have not measured AetherCore energy or water per task. Impact depends on hardware, model, utilization, and electricity mix.",
    greenCards: [
      { t: "Energy per task", d: "Proposed metric: Wh per comparable task, including inference and device idle time.", icon: "Lightning" },
      { t: "Water", d: "We do not publish water estimates per conversation; comparisons need an explicit method and source.", icon: "Droplet" },
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
    lead: "The Rust runtime coordinates configured tools and models. Local-first reduces some external paths; it does not automatically make the whole application offline or isolated.",
    loopKicker: "execution flow", loopTitle: "From selection to output.", loopDesc: "The agent uses the workspace and available tools. Review permissions and the destination of each connection.",
    loop: [
      { tag: "Files", t: "Select a workspace.", d: "Include only the files needed for the task.", chip: "User-selected scope" },
      { tag: "Plan", t: "Review the steps.", d: "Check the task, model, and tools that will be used.", chip: "Plan ready for review" },
      { tag: "Approval", t: "Decide before acting.", d: "Confirmation steps exist for actions covered by current controls.", chip: "Coverage under validation" },
      { tag: "Execution", t: "Review the output.", d: "The runtime executes configured tools and keeps local event records.", chip: "Beta local records" }
    ],
    capsKicker: "capabilities and limits", capsTitle: "What the architecture aims to provide.", capsDesc: "A description of direction and beta implementation; not an independent audit or certification.",
    caps: [
      { n: "01", tag: "models", t: "Local or remote models", d: "Local models and external providers are configurable; each choice changes the data path." },
      { n: "02", tag: "logs", t: "Event records", d: "The beta keeps local records. We do not describe them as immutable or certified." },
      { n: "03", tag: "workspace", t: "Logical boundaries", d: "Current controls are logical in the app; they are not an operating-system sandbox, VM, or container." },
      { n: "04", tag: "files", t: "File tools", d: "Tools for files and spreadsheets exist; compatibility and coverage should be confirmed per workflow." },
      { n: "05", tag: "review", t: "Approval steps", d: "Writes and network actions may require confirmation depending on tool and setup. Full coverage needs testing." },
      { n: "06", tag: "connections", t: "Optional integrations", d: "An external API may receive instructions or context routed to it. Check the destination and provider policy." },
      { n: "07", tag: "credentials", t: "Handling under review", d: "Credential management exists in the beta; storage, lifecycle, and security need independent review." },
      { n: "08", tag: "status", t: "Release preparation", d: "Installer, clean installation, signing, and supported-model matrix remain pending." }
    ],
    releaseKicker: "development status", releaseTitle: "Beta — preparing for external validation.", releaseDesc: "A public release has not been approved. The installable package, model matrix, and security review remain pending.", releaseTags: ["Rust runtime", "Configurable models", "Workspace controls", "Validation pending"]
  },
  CASOS: {
    kicker: "use cases · beta", title: ["Local-first AI", "for file-based", "agent workflows."],
    lead: "AetherCore explores bringing models and tools closer to work files. Configuration can be local or connected; we do not promise regulatory compliance or leak-proof operation.",
    problemKicker: "an architecture decision", problemTitle: "Know which service receives each data item.",
    problemDesc: "Assistants and models differ in retention, use, and processing. Consider the service, contract, internal policy, and shared data.",
    steps: [
      { n: "01", tag: "question", t: "Where is data processed?", d: "Identify the model, provider, storage, and services called by the application.", points: ["local or remote model", "provider retention", "integration destinations"] },
      { n: "02", tag: "option", t: "Configure the execution path.", d: "AetherCore supports local models and optional external connections. Results depend on configuration.", points: ["model choice", "selected workspace", "review connections"] },
      { n: "03", tag: "limit", t: "Validate before production use.", d: "The product is in beta and does not replace security controls, legal review, or impact assessment.", points: ["test your scenario", "organizational controls", "no compliance guarantee"] }
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
      "Prefer local execution when it fits, make connections visible, and state limits clearly. The beta does not validate every workflow yet.",
    manifestoKicker: "manifesto",
    manifestoTitle:
      "Principles to verify in every workflow.",
    manifestoDesc:
      "The beta aims to make model, data destination, and review steps understandable. Implementation and coverage still need validation.",
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
    kicker: "environmental impact · measurement pending", title: ["Local compute", "also uses", "resources."],
    lead: "Moving inference to a device changes where energy is used; it does not by itself prove lower impact. We have not measured AetherCore energy or water per task.",
    cardsTitle: "What needs measurement", cardsDesc: "We will compare equivalent tasks and publish the method, hardware, and limitations before claiming savings.",
    cards: [
      { t: "Energy", d: "Record Wh per task and device idle time, using the same quality and model where possible.", icon: "Lightning" },
      { t: "Water", d: "There is no AetherCore water metric. Estimates depend on location, infrastructure, and method.", icon: "Droplet" },
      { t: "Hardware use", d: "A comparison should include device lifetime, utilization, available capacity, and local energy.", icon: "Server" }
    ],
  },
  SOBRE: {
    kicker: "about the project", title: ["One founder.", "One product", "in progress."],
    lead: "EXVORN.TECH is developing AetherCore, a local-first AI agent in beta. Team members and external validation will be described as roles and evidence are confirmed.",
    teamTitle: "Product lead", teamDesc: "The founder leads implementation and preparation for external validation.",
    members: [{ name: "Matheus Peres da Silva", role: "Founder · Product and engineering", bio: "Develops AetherCore and coordinates its preparation for external testing. Qualifications and work history are listed in the technical CV." }],
    twinTitle: "Contributors and advisors", twinDesc: "Voluntary support does not imply employment, public appointment, institutional endorsement, or official product validation. Contributors and scope will be named only with confirmation and consent."
  },
  FAQ: {
    kicker: "faq · beta", title: ["Direct answers", "about AetherCore."], lead: "The product is in development. Check the model, data, and tools used by each workflow.",
    items: [
      { q: "What does local-first mean?", a: "It is an architecture priority to keep more processing close to the user. The actual path depends on configured models and integrations." },
      { q: "Is AetherCore available?", a: "It is in beta and has no approved public release or active commercial offer yet." },
      { q: "Do my files stay on the device?", a: "Files can be selected in a local workspace. If a remote model or integration receives that content, it may leave the device." },
      { q: "Does the product work fully offline?", a: "We do not claim fully offline operation. Local models may run without a remote provider, but updates and integrations can use the network." },
      { q: "Does AetherCore guarantee LGPD compliance?", a: "No. Compliance depends on context, legal bases, contracts, policies, and organizational controls." },
      { q: "Is there an operating-system sandbox?", a: "Documented isolation is logical at workspace level; it is not an operating-system sandbox, VM, or container." },
      { q: "How are credentials protected?", a: "The beta includes credential management. It needs independent review before being presented as an enterprise control." }
    ],
  },
  PRIVACIDADE: {
    kicker: "privacy · beta", title: "Understand every data path.", lead: "Behavior depends on configuration, model, tools, and connected services.",
    policyKicker: "product boundaries", policyTitle: "Local-first reduces some transfers; it is not a guarantee.", policyDesc: "This page is not a legal policy or security attestation. Assess the version and configuration before using real data.",
    cards: [
      { tag: "models", t: "Local or remote", d: "A local model may process inference on-device. An external provider may receive data sent to it." },
      { tag: "approval", t: "Review covered actions", d: "Approval steps exist for some write and network actions; full coverage still needs validation." },
      { tag: "records", t: "Inspect beta logs", d: "The application keeps local event records. We do not describe them as immutable, complete, or certified." },
      { tag: "credentials", t: "Security under review", d: "Credential handling needs independent review before sensitive enterprise use." },
      { tag: "connections", t: "Check destination and content", d: "Before using an external API, identify its destination, transmitted data, and provider rules." },
      { tag: "limits", t: "No absolute guarantee", d: "The beta does not guarantee leak-free operation, infallible security, or automatic LGPD compliance." }
    ],
  },
  ROADMAP: {
    kicker: "roadmap · execution hypotheses", title: "Prove value before scaling.", lead: "Planned milestones depend on technical capacity, security, user interest, and future program rules.",
    timelineKicker: "next steps", timelineTitle: "A sequence to reduce uncertainty.", timelineDesc: "Each step depends on the previous one and may change with usage evidence.",
    phases: [
      { period: "Step 1", t: "Prepare a test release", d: "Consolidate an installer, validate a clean Windows installation, and publish a supported-model matrix." },
      { period: "Step 2", t: "Review security boundaries", d: "Map data flows, permissions, storage, and attack surfaces; seek independent review." },
      { period: "Step 3", t: "Run consented pilots", d: "Invite a small group to low-risk tasks and record quality, failures, review time, and cost." },
      { period: "Step 4", t: "Validate commercial sustainability", d: "Test willingness to pay and support cost before publishing tiers, prices, or revenue targets." }
    ],
    metricsKicker: "proposed metrics", metricsTitle: "Measure what we do not know yet.", metricsDesc: "These are not current results; they are indicators for upcoming tests.",
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
    kicker: "technical and commercial brief", title: ["AetherCore:", "evidence before", "scale."], lead: "A concise view of the product, stage, and market hypotheses. It separates observed facts, plans, and open questions.",
    summaryKicker: "product thesis", summaryTitle: "Four questions guide the next phase.",
    blocks: [
      { tag: "01. problem", t: "Data crosses multiple services", d: "Teams need to know which models and integrations receive their files and work instructions." },
      { tag: "02. approach", t: "Models close to context", d: "AetherCore connects an agent to workspaces and tools, with local models and remote providers as options." },
      { tag: "03. controls", t: "Scope and review", d: "Workspace controls and approvals exist in the beta; isolation and coverage need full validation." },
      { tag: "04. market", t: "Segment to discover", d: "Sectors with sensitive documents are an entry hypothesis. Segment, buyer, and willingness to pay need interviews and pilots." },
      { tag: "05. maturity", t: "Beta version", d: "Code and focused tests exist; full installation, CEF integration, security review, and public release remain pending." },
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
    lead: "Strategy under validation: a free local core is a hypothesis; paid team features and support would follow only if built and supported by willingness to pay. No prices are published.",
    annualLabel: "Model under validation", annualSaveLabel: "No discount announced", buttonLabel: "Discuss the beta", contactLabel: "Discuss the beta",
    plans: [
      { id: "free", name: "Aether Free", description: "Free local core is an adoption hypothesis, not an available offer.", priceMonthly: null, priceYearly: null, users: "Proposal · unavailable", recommended: false, features: [{ label: "Free local core — hypothesis under validation", included: true }, { label: "No unlimited subsidized cloud-inference credits", included: true }] },
      { id: "go", name: "Aether Go", description: "Possible individual desktop distribution; scope and price are undefined.", priceMonthly: null, priceYearly: null, users: "Concept · no price published", recommended: false, features: [{ label: "Desktop package and support — under study", included: true }, { label: "Availability not announced", included: true }] },
      { id: "enterprise", name: "Aether Enterprise", description: "Possible team controls; not an active commercial offer.", priceMonthly: null, priceYearly: null, users: "Roadmap · unavailable", recommended: false, features: [{ label: "Administration and governance — roadmap", included: true }, { label: "No announced SLA or certification", included: true }] },
      { id: "scale", name: "Aether Scale", description: "Dedicated deployment hypothesis, subject to technical and commercial validation.", priceMonthly: null, priceYearly: null, users: "Hypothesis · under review", recommended: false, features: [{ label: "Dedicated deployment and integrations — hypothesis", included: true }, { label: "No delivery commitment or published price", included: true }] }
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
  VALIDACAO: {
    kicker: "product status · beta", title: ["Technical beta", "preparing for", "external validation."],
    lead: "A summary of the current stage and next proof points. No customer, formal pilot, public reference, or revenue has been reported.",
    stats: [{ k: "Beta", label: "Current stage", sub: "Public release not approved" }, { k: "Local + remote", label: "Models", sub: "Path depends on configuration" }, { k: "Open", label: "Security", sub: "Independent review pending" }, { k: "No offer", label: "Commercial", sub: "Prices and tiers under validation" }],
    partner: { name: "Not applicable", sector: "No public partner or customer", tagline: "No institutional validation published", location: "Brazil", origin: "Public information limited to product status", description: "No customer case or external homologation has been disclosed." },
    founderRole: { kicker: "product responsibility", title: "Product and engineering", subtitle: "Matheus Peres da Silva · founder", workplace: "EXVORN.TECH", duties: [] },
    stressTest: { kicker: "known limits", title: "What still needs proof.", desc: "These are validation milestones, not results already achieved.", pillars: [
      { n: "01", tag: "Distribution", title: "Reliable installation", desc: "Prepare a signed package and validate a clean Windows installation.", badge: "Pending" },
      { n: "02", tag: "Security", title: "Independent review", desc: "Assess data flows, credentials, permissions, and workspace boundaries.", badge: "Pending" },
      { n: "03", tag: "Usage", title: "Consented pilots", desc: "Test low-risk tasks with metrics and explicit authorization.", badge: "Planned" },
      { n: "04", tag: "Business", title: "Willingness to pay", desc: "Validate support, pricing, and freemium model before selling.", badge: "Planned" }
    ] },
    verdict: { kicker: "status", quote: "AetherCore is in beta. Published capabilities and limits describe the current stage; they are not a certification or guarantee.", author: "EXVORN.TECH", badge: "Under validation" },
    terminal: { kicker: "development status", title: "Beta summary", filename: "aethercore-beta-status", badge: "Public release pending", lines: ["[STATUS] Desktop interface and Rust runtime in development.", "[MODELS] Local options and external connections depend on configuration.", "[BOUNDARY] Workspace isolation is logical, not an operating-system sandbox.", "[EVIDENCE] No independent audit or formal pilot disclosed.", "[RELEASE] Final installer, signing, and public approval remain pending."] }
  }
};
