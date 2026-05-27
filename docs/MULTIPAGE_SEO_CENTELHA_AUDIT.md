# Refatoração Multi-page — AetherCore SEO + Centelha

## O que mudou

A landing deixou de concentrar toda a narrativa em uma única página longa. A home agora funciona como hub semântico e as principais intenções foram separadas em páginas próprias:

- `produto.html` — produto, modos de uso, MVP XLSX e interfaces.
- `arquitetura.html` — compute core, pipeline, capacidades, status e visão técnica.
- `casos-de-uso.html` — problema de mercado, comparativo, públicos-alvo e páginas satélites.
- `validacao-centelha.html` — problema, solução, inovação, mercado, impacto, evidências e roadmap orientado ao Centelha.
- `faq.html` — perguntas frequentes e governança em HTML semântico.

As páginas satélites anteriores foram preservadas e integradas à navegação multi-page.

## Por que isso ajuda SEO

- Reduz profundidade artificial de uma single page.
- Cria URLs indexáveis por intenção de busca.
- Mantém um H1 único por página.
- Reforça links internos entre clusters semânticos.
- Mantém conteúdo rastreável em HTML.
- Preserva animações globais, GSAP, WebGL, matrix canvas, magnetic buttons e microinterações.

## Por que isso ajuda o Centelha

- `validacao-centelha.html` organiza o projeto em linguagem de edital.
- `produto.html` comprova recorte de MVP e produto.
- `arquitetura.html` comprova profundidade técnica.
- `casos-de-uso.html` reforça mercado, público-alvo e aplicação econômica.
- `dossie-inovacao.html` continua como material de apoio para pitch, parceiros e avaliadores.

## Arquivos criados

- `produto.html`
- `arquitetura.html`
- `casos-de-uso.html`
- `validacao-centelha.html`
- `faq.html`
- `MULTIPAGE_SEO_CENTELHA_AUDIT.md`

## Arquivos alterados

- `index.html`
- `assets/aether-awwwards.css`
- `sitemap.xml`
- `robots.txt`
- páginas satélites com navegação atualizada

## Observação de deploy

Todos os canonicals ainda usam `https://aethercore.dev/` como domínio de produção temporário. Substituir pelo domínio final se necessário.
