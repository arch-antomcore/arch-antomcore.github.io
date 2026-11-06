export const BLOG_POSTS = [
  {
    id: "aethercore-beta-status-2026-11",
    title: "AetherCore: a base técnica que já construímos",
    titleEn: "AetherCore: the technical foundation we built",
    excerpt: "Runtime Rust, interface desktop e 198 testes unitários aprovados em componentes centrais: o ponto de partida para acesso antecipado.",
    excerptEn: "Rust runtime, desktop interface, and 198 passing unit tests across core components: the foundation for early access.",
    version: "Snapshot · 2026.11",
    author: { name: "Matheus Peres", avatar: "/founder.jpg" },
    date: "6 de novembro de 2026 · snapshot de avaliação",
    dateEn: "November 6, 2026 · evaluation snapshot",
    readTime: "3 min read",
    tags: ["Engenharia", "Rust", "Produto"],
    content: `### Engenharia visível

Uma rodada focada passou em 198 testes unitários nas crates api, tools e aether-agentic. O TypeScript, o build do frontend e o lint também passaram nesta revisão local.

### Próxima etapa

Estamos preparando distribuição, instalação limpa no Windows e uma matriz clara de modelos suportados. O teste integral do workspace requer a dependência CMake para o componente CEF; essa validação entra no processo de release.
`,
    contentEn: `### Visible engineering

A focused run passed 198 unit tests across the api, tools, and aether-agentic crates. TypeScript, the frontend build, and lint also passed in this local review.

### Next step

We are preparing distribution, clean Windows installation, and a clear supported-model matrix. The full workspace test requires CMake for the CEF component; that validation belongs to the release process.
`,
  },
  {
    id: "aethercore-data-paths",
    title: "Local-first: entenda o caminho dos dados",
    titleEn: "Local-first: understand the data path",
    excerpt: "Um modelo local e uma API remota têm fronteiras diferentes. A configuração determina o que pode sair do dispositivo.",
    excerptEn: "A local model and a remote API have different boundaries. Configuration determines what may leave the device.",
    version: "Guia do beta",
    author: { name: "Matheus Peres", avatar: "/founder.jpg" },
    date: "6 de novembro de 2026 · guia do beta",
    dateEn: "November 6, 2026 · beta guide",
    readTime: "3 min read",
    tags: ["Privacidade", "Arquitetura", "Beta"],
    content: `### O que local-first quer dizer aqui

O AetherCore pode ser configurado para usar modelos locais ou provedores externos. Um modelo local pode processar a inferência no dispositivo; atualizações, integrações e serviços remotos ainda podem usar a rede.

### Antes de incluir dados reais

- Confira o modelo selecionado e quem o opera.
- Verifique quais arquivos entram no workspace e quais dados são encaminhados à API.
- Teste controles de aprovação e registros na tarefa concreta.
- Comece com dados de teste para conferir qualidade e comportamento do fluxo.

Com o modelo local configurado, a inferência acontece no dispositivo. Conexões externas seguem as regras dos serviços escolhidos.
`,
    contentEn: `### What local-first means here

AetherCore can be configured to use local models or external providers. A local model may process inference on-device; updates, integrations, and remote services may still use the network.

### Before including real data

- Check the selected model and who operates it.
- Verify which files enter the workspace and what data is routed to an API.
- Test approval controls and records on the actual task.
- Start with test data to check output quality and workflow behavior.

With a local model configured, inference runs on-device. External connections follow the rules of the chosen services.
`,
  },
  {
    id: "aethercore-impact-measurement",
    title: "IA e impacto ambiental: medir antes de afirmar",
    titleEn: "AI and environmental impact: measure before claiming",
    excerpt: "Como vamos medir energia por tarefa e comparar configurações locais e remotas sem inventar economia.",
    excerptEn: "How we will measure energy per task and compare local and remote configurations with a reproducible method.",
    version: "Métrica proposta",
    author: { name: "Matheus Peres", avatar: "/founder.jpg" },
    date: "6 de novembro de 2026 · método proposto",
    dateEn: "November 6, 2026 · proposed method",
    readTime: "2 min read",
    tags: ["Sustentabilidade", "Métricas", "Pesquisa"],
    content: `### A hipótese

Executar inferência no dispositivo muda onde a computação acontece. O efeito ambiental depende do modelo, hardware, duração, utilização, matriz elétrica, vida útil e do serviço remoto usado como comparação.

### Como comparar

1. Definir uma tarefa e um nível de qualidade equivalentes.
2. Medir Wh por tarefa e o tempo ocioso do equipamento.
3. Registrar hardware, modelo, duração e fonte de energia.
4. Publicar método, incertezas e limitações.

Vamos publicar resultados quando houver medições reproduzíveis, com contexto suficiente para que outra equipe possa repetir a comparação.
`,
    contentEn: `### The hypothesis

Running inference on-device changes where computation happens. Environmental impact depends on model, hardware, duration, utilization, electricity mix, equipment lifetime, and the remote service used for comparison.

### How to compare

1. Define an equivalent task and quality level.
2. Measure Wh per task and device idle time.
3. Record hardware, model, duration, and energy source.
4. Publish the method, uncertainty, and limitations.

We will publish results once measurements are reproducible, with enough context for another team to repeat the comparison.
`,
  },
];
