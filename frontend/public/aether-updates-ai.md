# AetherCore | Nota de produto e engenharia

Atualização: 6 de novembro de 2026.

## Visão

AetherCore reúne interface desktop, runtime em Rust, modelos configuráveis e ferramentas para trabalhar com arquivos em um workspace. Modelos locais podem executar inferência no dispositivo via Ollama; provedores externos são uma escolha de configuração.

## Base construída

- Interface desktop em React/TypeScript e componentes CEF.
- Runtime Rust para coordenação de agentes, ferramentas, permissões e eventos.
- Integração com modelos locais via Ollama e caminhos configuráveis para provedores externos.
- Ferramentas para arquivos e planilhas e etapas de revisão para ações cobertas pelo fluxo.

## Verificação técnica

Uma revisão local aprovou 198 testes unitários selecionados nas crates `api`, `tools` e `aether-agentic`. Build e lint do frontend também passaram. Esse recorte orienta a próxima etapa de distribuição e testes com usuários.

## Próximos marcos

1. Consolidar pacote instalável e instalação limpa no Windows.
2. Documentar versões e modelos suportados.
3. Revisar fluxos de dados, credenciais e permissões com apoio especializado.
4. Conduzir pilotos com tarefas definidas e medir qualidade, tempo e custo de atendimento.

Mais informações: [produto](https://exvorn.tech/produto), [arquitetura](https://exvorn.tech/arquitetura), [acesso antecipado](https://exvorn.tech/validacao).
