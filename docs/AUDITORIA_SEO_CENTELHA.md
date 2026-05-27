# Auditoria SEO + Centelha — AetherCore

## Status
Validei o pacote estático e apliquei ajustes adicionais para tornar o site mais forte para SEO, conversão B2B e narrativa de fomento/inovação.

## Correções aplicadas
- Corrigi marcações Markdown visíveis (`**`) na tabela comparativa para `<strong>`.
- Adicionei uma seção pública `#validation` na home com problema, solução, inovação, mercado, impacto, evidências e roadmap de 12 meses.
- Criei `dossie-inovacao.html`, uma página de apoio para pitch, fomento e avaliação técnica.
- Adicionei tags Twitter/X Card nas páginas satélites.
- Adicionei JSON-LD nas páginas satélites, incluindo WebPage, SoftwareApplication, Organization e FAQPage.
- Atualizei o sitemap com a nova página de dossiê.
- Atualizei versão de CSS para `v=21` para evitar cache antigo.
- Espelhei CSS/JS de `assets/` para `src/` para reduzir divergência.

## Pendências externas
- Trocar `https://aethercore.dev/` pelo domínio final se esse não for o domínio real.
- Testar JSON-LD no Rich Results Test após deploy.
- Conectar formulário de lead a serviço real ou endpoint próprio.
- Inserir evidências reais do produto: vídeo, prints, logs, XLSX antes/depois e relatório gerado.

## Verificação local executada nesta revisão
- `node --check assets/aether-awwwards.js`: aprovado sem erro de parsing.
- Auditoria HTML via BeautifulSoup: 6 páginas com title, description, canonical, H1 único, alt em imagens, Twitter Card e JSON-LD válido.
- `npm run source:build`: não concluído neste ambiente porque o ZIP não trouxe a dependência opcional nativa `@rolldown/binding-linux-x64-gnu` exigida pelo Vite/Rolldown. Isso é um problema de dependência/ambiente do pacote extraído, não um erro de sintaxe das alterações estáticas. Rodar `npm install` no ambiente final deve recompor essa dependência.
