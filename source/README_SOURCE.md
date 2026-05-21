# AetherCore — Source Project

Projeto-fonte Vite para evoluir a landing no VSCode.

## Rodar

```powershell
cd source
npm install
npm run dev
```

Abre o endereço que o Vite mostrar, normalmente `http://localhost:5173`.

## Bibliotecas no source

Uso direto no código:

- Three.js para WebGL global e runtime visual.
- GSAP + ScrollTrigger para narrativa scroll-driven.
- Physics2DPlugin para sparks nos CTAs.
- Lenis para smooth scroll.
- SplitType para reveal tipográfico.
- simplex-noise para variação procedural nas partículas WebGL.

Dependências instaladas também deixam o projeto preparado para evoluir para React Three Fiber, drei, postprocessing, maath e Framer Motion sem recomeçar a base.

## Preview estático

A pasta raiz do ZIP também continua rodando sem instalar nada via `python -m http.server`.


Latest polish: center logo restored inside the compute-core visual, now with layered foreground/background binary rain and refined motion behavior.
