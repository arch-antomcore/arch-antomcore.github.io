# Diretório de Imagens e Assets Visuais — AetherCore

Este diretório contém todos os assets estáticos de imagem, ilustrações, mockups e logotipos utilizados no website do AetherCore. Ele é estruturado de forma semântica e organizada para garantir que a manutenção do design e a otimização de performance permaneçam consistentes.

---

## 📂 Estrutura de Pastas

* **`/brand/`**: Logotipos e ícones oficiais da marca.
  * `logo-aether.png` (384x384): Logo geométrico "A" principal do site (otimizado).
  * `localai-logo.png` (256x256): Logotipo oficial do LocalAI com fundo transparente.
  * `favicon-32.png`, `apple-touch-icon.png`: Ícones de aba e dispositivos.
* **`/backgrounds/`**: Imagens e texturas usadas como fundo de seções ou páginas inteiras.
  * `noise.png`: Textura de grão analógico cinza aplicada no overlay global do site.
  * `creme_noise.png`: Textura de grão analógico creme para áreas claras.
  * `cta-seaside.jpg` (1000x1500): Imagem de fundo do mar com desfoque e distorção líquida em `DemoGlass.jsx`.
* **`/blog/`**: Imagens utilizadas exclusivamente em postagens do blog e notas de lançamento.
  * `founder.jfif`: Foto de perfil do fundador/autor dos posts.
  * `ide-quintessence.png` (1280x720): Captura de tela da IDE nativa Quintessence exibida na nota de lançamento v0.6.0.
* **`/mockups/`**: Demonstrações visuais da interface do produto.
  * `console-aether.png` (1280x686): Interface visual do cockpit do agente local (otimizado).
* **`/gallery/`**: Fotos e retratos da galeria de depoimentos ou equipe (formato WebP).
* **`/stack/`**: Logotipos vetoriais (SVG) e WebP dos componentes de tecnologia (Rust, SQLite, React, etc.).

---

## ⚡ Diretrizes de Performance & Otimização

Para manter o carregamento do site extremamente rápido sem perder a qualidade estética, siga as regras abaixo ao adicionar novas imagens:

1. **Formatos de Imagem Recomendados**:
   - **Logos/Ícones**: Sempre dê preferência a arquivos **`.svg`** (vetorial). Se não for possível, utilize **`.png`** com transparência e passe por compressão.
   - **Fotografias/Portraits**: Sempre utilize o formato **`.webp`** com compressão de qualidade de 75-80%.
   - **Backgrounds e Gráficos Complexos**: Utilize **`.jpg`** comprimido (qualidade 70-75%) ou **`.webp`**.

2. **Dimensões e Resolução**:
   - Nunca adicione imagens com resoluções maiores do que o dobro do tamanho de exibição real (exemplo: se a imagem é exibida como `w-28 h-28` [112px], a imagem de origem não deve passar de 256x256 ou 384x384 para telas retina).
   - Telas de mockups ou capturas de tela devem ter no máximo **1280px** ou **1920px** de largura (comprimidos).

3. **Carregamento Preguiçoso (Lazy Loading)**:
   - Para qualquer imagem que fique abaixo da dobra inicial do site, sempre adicione o atributo `loading="lazy"` na tag `<img>` do React para evitar requisições de rede bloqueantes antes do carregamento da Hero.

---

*Este manual serve para guiar agentes inteligentes, desenvolvedores e designers no futuro a manterem a semântica e integridade dos assets visuais.*
