import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import AnimateNumber from "@/components/animated-blur-number";
import { ShieldWarning, ArrowSquareOut } from "@phosphor-icons/react";
import { Reveal } from "@/components/site/primitives";
import { useReducedMotion } from "@/lib/motionPreference";

const GlobalLeakCounter = () => {
  const [leakCount, setLeakCount] = useState(17667901961);
  const cardRef = useRef(null);
  const entered = useInView(cardRef, { once: true, margin: "80px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/leak-stats.json", { signal: controller.signal })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (Number.isSafeInteger(data?.totalPwnCount) && data.totalPwnCount > 0) {
          setLeakCount(data.totalPwnCount);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <Reveal>
      <article ref={cardRef} aria-labelledby="leak-counter-title" className="aether-exposure-card">
        <div className="aether-exposure-meta"><ShieldWarning size={20} /><span>Registros expostos globalmente</span></div>
        <h2 id="leak-counter-title" className="aether-exposure-number">
          {reduced ? leakCount.toLocaleString("pt-BR") : <AnimateNumber value={entered ? leakCount : 0} locale="pt-BR" blur={4} duration={900} />}
        </h2>
        <p>Contas e registros presentes em vazamentos de dados. Manter seus arquivos e suas inferências no próprio dispositivo reduz a exposição a serviços externos.</p>
        <div className="aether-exposure-foot">
          <a href="https://cybernews.com/personal-data-leak-check/" target="_blank" rel="noopener noreferrer">Base de dados: Cybernews Leak Check <ArrowSquareOut size={14} /></a>
          <span>Base consolidada</span>
        </div>
      </article>
    </Reveal>
  );
};

export default GlobalLeakCounter;
