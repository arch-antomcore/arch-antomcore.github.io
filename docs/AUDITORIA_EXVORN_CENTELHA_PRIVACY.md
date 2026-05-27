# Auditoria e refatoração — Exvorn / AetherCore

Data: 2026-05-26
Domínio canônico: https://exvorn.tech/

## Entrega realizada

O site foi atualizado para uma arquitetura multipage semântica, preservando animações, WebGL, GSAP, matrix canvas, magnetic buttons e microinterações. A intervenção concentrou-se em SEO técnico, semântica, privacidade, filosofia de produto e aderência natural ao Centelha.

## Principais mudanças

1. Substituição global do domínio canônico temporário por `https://exvorn.tech/`.
2. Atualização de `robots.txt` e `sitemap.xml` para o domínio final.
3. Criação de novas páginas institucionais:
   - `principios.html` — privacidade como arquitetura, autonomia técnica, cultura cypherpunk e governança.
   - `privacidade.html` — trust center técnico para IA local-first, logs, uplink explícito e limites de promessa.
   - `roadmap.html` — cronograma físico de 12 meses, métricas de validação e trilha de execução.
   - `referencias.html` — fontes públicas sobre SEO, schema, acessibilidade, crawlers de IA, NIST AI RMF e cypherpunk.
4. Criação de `llms.txt` para orientar mecanismos de IA e agentes sobre as páginas canônicas e o posicionamento do produto.
5. Criação de `AI_AGENT_SKILL_AETHER_SITE.md` para orientar futuros agentes de IA que mexerem no site.
6. Ampliação da página `validacao-centelha.html` com matriz natural de aderência aos critérios de avaliação: solução, mercado, impacto, equipe, consistência e prova.
7. Navegação principal atualizada para incluir `Princípios`; navegação móvel e rodapé ampliados com Privacidade, Roadmap, Referências e Dossiê.
8. Inclusão de links institucionais no rodapé.
9. Preservação de animações com suporte a `prefers-reduced-motion` e redução não destrutiva para usuários que preferem menos movimento.

## Validação local

- `node --check assets/aether-awwwards.js`: aprovado.
- Todos os arquivos HTML possuem exatamente um H1.
- Todos os arquivos HTML possuem title, description, canonical, Open Graph, Twitter Card e JSON-LD parseável.
- Nenhum arquivo HTML, `robots.txt`, `sitemap.xml` ou `llms.txt` mantém `aethercore.dev`.
- Links internos verificados sem quebra.
- Imagens possuem `alt` definido.

## Alinhamento Centelha

A proposta foi reforçada em torno de:

- problema/oportunidade de mercado;
- solução inovadora;
- diferencial tecnológico;
- impacto socioambiental positivo;
- equipe e capacidade de execução;
- evidências de estágio de desenvolvimento;
- roadmap físico de 12 meses;
- consistência para futura Fase 2.

## Cuidados de copy

Foram evitadas promessas absolutas como “segurança total”, “100% privado” ou “risco zero”. A linguagem adotada prioriza precisão: `prioriza execução local`, `reduz exposição`, `uplink explícito`, `aprovação humana`, `trilha auditável` e `governança`.
