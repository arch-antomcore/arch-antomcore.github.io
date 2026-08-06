import React from "react";
import { AetherGreenShaderCanvas } from "./AetherGreenShader";

/**
 * AetherGreenShader — Componente Reutilizável de Fundo WebGL com Luz Verde Dinâmica.
 * 
 * @param {Object} props
 * @param {number} [props.opacity=0.8] - Opacidade do efeito verde (0 a 1).
 * @param {boolean} [props.fadeTop=true] - Adiciona um degradê de suavização no topo.
 * @param {boolean} [props.fadeBottom=true] - Adiciona um degradê de suavização na base.
 * @param {string} [props.fadeColor="#f4f1e8"] - Cor usada nos degradês de suavização (ex: "#f4f1e8" ou "#0b0a08").
 * @param {string} [props.className=""] - Classes utilitárias adicionais (Tailwind).
 * @param {Object} [props.uniforms={}] - Sobrescrita direta de parâmetros WebGL (warp, speed, intensity, etc).
 * @param {React.ReactNode} [props.children] - Conteúdo a ser renderizado por cima do fundo.
 */
export function AetherGreenShader({
  opacity = 0.8,
  fadeTop = true,
  fadeBottom = true,
  fadeColor = "#f4f1e8",
  className = "",
  uniforms = {},
  children,
}) {
  return (
    <div className={`relative overflow-hidden w-full ${className}`}>
      {/* Camada WebGL de Fundo */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity }}
        aria-hidden="true"
      >
        <AetherGreenShaderCanvas customUniforms={uniforms} />

        {/* Suavizações degradê Topo e Base */}
        {fadeTop && (
          <div
            className="absolute inset-x-0 top-0 h-48 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${fadeColor}, transparent)`,
            }}
          />
        )}
        {fadeBottom && (
          <div
            className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${fadeColor}, transparent)`,
            }}
          />
        )}
      </div>

      {/* Conteúdo sobreposto */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export default AetherGreenShader;
export { AetherGreenShaderCanvas };
