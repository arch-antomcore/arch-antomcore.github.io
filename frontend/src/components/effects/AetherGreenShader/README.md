# 🟢 AetherGreenShader — Componente Reutilizável de Fundo WebGL

Este pacote contém o efeito **WebGL de Luz Verde Dinâmica** criado para o AetherCore. Ele é 100% autônomo, sem dependências externas adicionais (usa apenas React e WebGL nativo), pronto para ser copiado e reciclado em qualquer projeto futuro.

---

## 📁 Estrutura de Arquivos

```text
src/components/effects/AetherGreenShader/
├── index.jsx                # Componente Wrapper pronto para uso com props amigáveis
├── AetherGreenShader.jsx    # Motor WebGL de alta performance (Shaders e Uniforms)
└── README.md                # Este manual de uso e personalização
```

---

## 🚀 Como Usar no seu Projeto

### 1. Importação Simples

```jsx
import { AetherGreenShader } from "@/components/effects/AetherGreenShader";

export default function MinhaPagina() {
  return (
    <AetherGreenShader opacity={0.8} fadeColor="#f4f1e8">
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold">Conteúdo com Fundo Verde Dinâmico</h1>
        <p>A luz verde flui e reage ao ponteiro do mouse!</p>
      </section>
    </AetherGreenShader>
  );
}
```

---

## ⚙️ Configurações e Props (`index.jsx`)

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `opacity` | `number` | `0.8` | Opacidade geral da malha verde (de `0.0` a `1.0`). |
| `fadeTop` | `boolean` | `true` | Ativa o degradê de suavização no topo. |
| `fadeBottom` | `boolean` | `true` | Ativa o degradê de suavização na base. |
| `fadeColor` | `string` | `"#f4f1e8"` | Cor do degradê de suavização (ex: `"#0b0a08"` para fundo escuro). |
| `className` | `string` | `""` | Classes adicionais do Tailwind / CSS. |
| `uniforms` | `object` | `{}` | Sobrescrita direta dos parâmetros de física e cores do WebGL. |

---

## 🎨 Personalização Avançada (`uniforms`)

Você pode passar o objeto `uniforms` para alterar diretamente as cores e a física da luz verde:

```jsx
<AetherGreenShader
  opacity={0.9}
  uniforms={{
    intensity: 0.700,    // Intensidade do brilho da luz verde
    warp: 0.500,         // Grau de ondulações orgânicas
    drift: 0.400,        // Movimento de deriva contínuo
    timeScale: 1.500,    // Velocidade de animação das ondas
    cursorEnabled: true, // Ativa reação interativa ao mouse
  }}
>
  {/* Conteúdo */}
</AetherGreenShader>
```

---

## ✨ Características Técnicas

- **Super Leve**: 0 dependências pesadas de Three.js ou Pixi.js (usa WebGL1 puro via Canvas).
- **Interativo**: Reage dinamicamente ao movimento do ponteiro do mouse criando ondas e distorções ao vivo.
- **Responsivo e Otimizado**: Auto-ajusta o DPR (Device Pixel Ratio) para garantir 60 FPS sem pesar na CPU/GPU.
