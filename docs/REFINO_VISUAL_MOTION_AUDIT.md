# Refinamento visual, motion e semântica — AetherCore / Exvorn

## Data
2026-05-26

## Objetivo
Corrigir excesso de espaço vazio, melhorar legibilidade dos títulos, reduzir comportamento instável de hover/cursor e preservar as animações principais do site.

## Correções aplicadas

### 1. Hero das páginas internas
- Reduzi a altura dos heroes em páginas internas (`.page-hero`) para evitar áreas vazias excessivas.
- Ajustei `padding-top` e `padding-bottom` para manter respiro visual sem empurrar o conteúdo para fora da dobra.
- Apliquei layout de uma coluna nas páginas internas, já que elas não usam o bloco visual lateral da home.

### 2. Títulos mais sólidos
- Substituí o efeito gradiente nos títulos das páginas internas por cores sólidas e mais estáveis.
- Mantive um leve acento luminoso apenas em trechos de destaque.
- Ajustei tamanho, line-height e letter-spacing para reduzir quebras agressivas.

### 3. Bug do título ao rolar
- O parallax/fade de `.hero__content` agora só roda na home, não nas páginas internas.
- Isso evita o desaparecimento do título ao rolar parcialmente a página `produto.html` e outras internas.

### 4. Proximity hacker estabilizado
- O efeito de hack por proximidade foi removido de `h1`, `h2`, `.hero-title`, `.section-heading` e `.page-hero`.
- O efeito continua disponível em elementos menores, mas não interfere mais em títulos centrais ou headings semânticos.

### 5. Cards mais compactos
- Cards principais agora funcionam como teasers visuais, com textos limitados por linha.
- Textos longos permanecem nas páginas dedicadas, preservando SEO e leitura profunda sem poluir os cards.
- Reduzi altura mínima de cards grandes e suavizei margens internas.

### 6. Hover/motion menos instável
- Reduzi a intensidade do tilt 3D.
- Reduzi o efeito magnetic nos botões.
- Adicionei `backface-visibility`, `translateZ(0)` e transições mais estáveis aos cards.
- Mantive o caráter premium das microinterações, mas sem saltos bruscos.

## Arquivos modificados
- `assets/aether-awwwards.css`
- `assets/aether-awwwards.js`
- `REFINO_VISUAL_MOTION_AUDIT.md`

## Validações executadas

### JavaScript
- `node --check assets/aether-awwwards.js`
- Resultado: aprovado, sem erro de parsing.

### HTML/SEO estático
- Verificação de 15 arquivos HTML.
- Todos possuem H1 único.
- Todos possuem `title`, meta description e canonical.
- Nenhuma referência interna quebrada encontrada.
- Todos os JSON-LD foram parseados com sucesso.

### Build Vite
- Comando tentado: `npm run source:build`.
- Resultado: não executado neste ambiente porque `vite` não está instalado em `node_modules` dentro do pacote extraído.
- Ação recomendada no ambiente local: rodar `npm install` antes de `npm run source:build`.

## Observação
Não removi as animações principais: GSAP, WebGL, matrix canvas, botões magnetic, cards com hover, ScrollTrigger e efeitos visuais continuam presentes. A intervenção foi de estabilização e refinamento.
