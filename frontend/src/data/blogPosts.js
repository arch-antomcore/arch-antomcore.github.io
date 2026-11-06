export const BLOG_POSTS = [
  {
    id: "aethercore-beta-status-2026-11",
    title: "AetherCore beta: estado da validação local",
    titleEn: "AetherCore beta: local validation status",
    excerpt: "Snapshot de 6 de novembro de 2026: testes focados passaram, mas o build integral e a distribuição ainda têm pendências.",
    excerptEn: "November 6, 2026 snapshot: focused tests passed, while the full build and distribution still have open items.",
    version: "Snapshot · 2026.11",
    author: { name: "Matheus Peres", avatar: "/founder.jpg" },
    date: "6 de novembro de 2026 · snapshot de avaliação",
    dateEn: "November 6, 2026 · evaluation snapshot",
    readTime: "3 min read",
    tags: ["Beta", "Validação", "Status"],
    content: `### O que foi verificado

Uma rodada focada passou em 198 testes unitários nas crates api, tools e aether-agentic. O TypeScript, o build do frontend e o lint também passaram nesta revisão local.

### O que continua pendente

O teste integral do workspace não foi concluído: a compilação do componente CEF depende do CMake, indisponível neste ambiente. Instalador final, assinatura, instalação limpa do Windows, validação gráfica completa e matriz de modelos seguem pendentes.

Este é um snapshot de desenvolvimento, não uma aprovação de lançamento, auditoria independente ou certificação. AetherCore ainda não reporta clientes, pilotos formais ou receita.
`,
    contentEn: `### What was checked

A focused run passed 198 unit tests across the api, tools, and aether-agentic crates. TypeScript, the frontend build, and lint also passed in this local review.

### What remains open

The full workspace test did not complete: building the CEF component requires CMake, which was unavailable in this environment. A final installer, signing, clean Windows installation, full graphical acceptance, and supported-model matrix remain pending.

This is a development snapshot, not release approval, independent audit, or certification. AetherCore has not reported customers, formal pilots, or revenue.
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
- Use dados fictícios ou anonimizados enquanto os limites do beta não forem validados.

Execução local pode reduzir transferências. Sozinha, ela não comprova conformidade com a LGPD, segurança infalível ou ausência de vazamentos.
`,
    contentEn: `### What local-first means here

AetherCore can be configured to use local models or external providers. A local model may process inference on-device; updates, integrations, and remote services may still use the network.

### Before including real data

- Check the selected model and who operates it.
- Verify which files enter the workspace and what data is routed to an API.
- Test approval controls and records on the actual task.
- Use fictitious or anonymized data while beta boundaries remain unvalidated.

Local execution may reduce transfers. By itself, it does not establish LGPD compliance, infallible security, or leak-free operation.
`,
  },
  {
    id: "aethercore-impact-measurement",
    title: "IA e impacto ambiental: medir antes de afirmar",
    titleEn: "AI and environmental impact: measure before claiming",
    excerpt: "Ainda não medimos energia ou água por tarefa no AetherCore. Este é o método proposto para comparar configurações.",
    excerptEn: "We have not measured AetherCore energy or water per task. This is the proposed method for comparing configurations.",
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

Não há hoje uma métrica publicada de energia, água ou carbono do AetherCore. Por isso não atribuímos percentual de economia.
`,
    contentEn: `### The hypothesis

Running inference on-device changes where computation happens. Environmental impact depends on model, hardware, duration, utilization, electricity mix, equipment lifetime, and the remote service used for comparison.

### How to compare

1. Define an equivalent task and quality level.
2. Measure Wh per task and device idle time.
3. Record hardware, model, duration, and energy source.
4. Publish the method, uncertainty, and limitations.

There is no published AetherCore energy, water, or carbon metric today, so we do not claim an emissions-saving percentage.
`,
  },
];
