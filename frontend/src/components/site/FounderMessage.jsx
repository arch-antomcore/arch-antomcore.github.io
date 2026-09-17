import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ThumbsUp, Chat, ShareNetwork as Share2, LinkedinLogo as Linkedin, ArrowSquareOut as ExternalLink, X, Image as ImageIcon } from "@phosphor-icons/react";
import { Container, Section, Reveal, Kicker } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";
import { gsap, useGSAP, EASE_SOFT, prefersReducedMotion } from "@/lib/gsap";

const LINKEDIN_URL = "https://www.linkedin.com/in/matheus-peres-da-silva/";
const IMAGES = [
  "/assets/img/gallery/linkedin-1.jpg",
  "/assets/img/gallery/linkedin-2.jpg",
  "/assets/img/gallery/linkedin-3.jpg",
  "/assets/img/gallery/linkedin-4.jpg",
];

const PostText = () => (
  <div className="space-y-4 text-[#2e2921] text-[14px] md:text-[15px] leading-relaxed">
    <p>
      Não foi um rebrand para parecer maior.
    </p>
    <p>
      Foi um rebrand porque o <strong className="text-[#211d18] font-bold">Aether</strong> ficou maior. 🔥
    </p>
    <p>
      Quando comecei isso, eu estava tentando construir um assistente de IA que eu realmente quisesse usar.
    </p>
    <p>
      Hoje, 19 meses depois, olho para o projeto e vejo um ecossistema inteiro: o{" "}
      <Link to="/" className="text-[var(--a-terracotta)] hover:underline font-bold decoration-[var(--a-terracotta)]/40 underline-offset-4">
        AetherCore
      </Link>{" "}
      como hub de agentes e modelos, o{" "}
      <Link to="/arquitetura" className="text-amber-800 hover:underline font-bold decoration-amber-800/40 underline-offset-4">
        Quintessence
      </Link>{" "}
      como IDE integrada e um{" "}
      <Link to="/arquitetura" className="text-emerald-800 hover:underline font-bold decoration-emerald-800/40 underline-offset-4">
        Kernel próprio, escrito em Rust
      </Link>
      , decidindo o que pode ou não pode acontecer por baixo de tudo.
    </p>
    <p>
      A identidade antiga simplesmente já não contava essa história.
    </p>
    <p>
      Por isso o Aether ganhou uma nova logo, um novo site e um design system próprio, mais sólido, mais vivo e muito menos “IA genérica com brilho neon”.
    </p>
    <p>
      Mas essa mudança não foi só visual. O produto também atravessou a tela:
    </p>
    <div className="border-l-2 border-[var(--a-terracotta)]/50 pl-4 py-1.5 my-3 bg-[#211d18]/[0.01] rounded-r-lg space-y-1">
      <p>🎬 <strong className="text-[#211d18]">AetherCore</strong> é o cockpit.</p>
      <p>💻 <strong className="text-[#211d18]">Quintessence</strong> (Nossa nova IDE) é onde a ideia vira código.</p>
      <p>🛡️ E o <strong className="text-[#211d18]">Aether Runtime Kernel</strong> mantém a autoridade.</p>
    </div>
    <p>
      Dentro da IDE, o agente entende o projeto aberto, conversa com contexto, propõe arquivos e alterações, mostra o diff e pede aprovação antes de agir.
    </p>
    <p>
      Eu não coloquei um chatbot dentro de um editor. Eu construí uma ponte entre inteligência, código e ação. ⚡
    </p>
    <p>
      Também parei de tratar um único modelo como se ele precisasse ser bom em tudo. O Aether funciona mais como uma equipe:
    </p>
    <ul className="list-disc pl-5 space-y-1 text-zinc-700">
      <li><strong className="text-[#211d18] font-semibold">Granite</strong> organiza.</li>
      <li><strong className="text-[#211d18] font-semibold">GLM</strong> raciocina.</li>
      <li><strong className="text-[#211d18] font-semibold">Qwen</strong> constrói.</li>
      <li>
        <Link to="/arquitetura" className="text-emerald-800 hover:underline font-bold decoration-emerald-800/40 underline-offset-4">
          Rust
        </Link>{" "}
        mantém tudo sob controle. 🦀
      </li>
    </ul>
    <p className="text-[#5d564b] italic font-mono text-[13px] bg-[#211d18]/[0.03] py-1.5 px-3 rounded-lg border border-[#211d18]/5 inline-block">
      O modelo propõe. O Kernel (Proprietário) valida. Você decide.
    </p>
    <p>
      É isso que eu queria que a nova marca transmitisse: autonomia sem perder o controle. Ambição sem virar fumaça. Tecnologia avançada sem tirar o usuário do comando.
    </p>
    <p>
      E não é só uma tela bonita. Na última rodada consolidada, foram{" "}
      <Link to="/referencias" className="text-[var(--a-terracotta)] hover:underline font-bold decoration-[var(--a-terracotta)]/40 underline-offset-4">
        878 testes automatizados
      </Link>{" "}
      passando no stack Rust, além do build do app, do build Windows da IDE e da validação real do caminho entre os dois.
    </p>
    <p className="font-semibold text-[#211d18] border-y border-[#211d18]/8 py-2.5 my-3">
      Não é mockup. Não é um wrapper de fim de semana. É engenharia de produto construída no Brasil. 🇧🇷
    </p>
    <p>
      Há alguns meses eu estava construindo um assistente. Hoje estou construindo o Aether. Uma marca. Um app. Agentes. Modelos. Um Kernel próprio. E agora, uma IDE.
    </p>
    <p className="text-[var(--a-terracotta)] font-bold text-base">
      Essa é a nova cara do projeto. E, honestamente? Ainda estamos só começando. 🚀
    </p>
    <p className="pt-2 text-zinc-500 text-xs font-mono">
      Cognição sob controle, não sob assinatura.
    </p>
    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#211d18]/8">
      {["Aether", "AetherCore", "Quintessence", "InteligenciaArtificial", "AgentesDeIA", "Rust", "LocalFirst", "DesignBrasileiro", "TecnologiaBrasileira", "Exvorn"].map(tag => (
        <span key={tag} className="text-xs text-zinc-500 hover:text-[#211d18] transition-colors cursor-pointer">
          #{tag}
        </span>
      ))}
    </div>
  </div>
);

const FounderMessage = () => {
  const [likes, setLikes] = useState(142);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const { isLightExperience } = useExperience();
  const scope = useRef(null);
  const likeRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const card = scope.current?.querySelector("[data-founder-card]");
      if (!card) return;
      const tl = gsap.timeline({
        defaults: { ease: EASE_SOFT },
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
      });
      tl.fromTo(
        card,
        { autoAlpha: 0, y: isLightExperience ? 28 : 64, scale: isLightExperience ? 1 : 0.975 },
        { autoAlpha: 1, y: 0, scale: 1, duration: isLightExperience ? 1.1 : 1.5, clearProps: "transform" },
      )
        .from("[data-founder-head]", { autoAlpha: 0, y: 14, duration: 0.9 }, "-=1.0")
        .from("[data-founder-body] > *", { autoAlpha: 0, y: 12, duration: 0.8, stagger: 0.035 }, "-=0.8")
        .from("[data-founder-img]", { autoAlpha: 0, y: 18, scale: 1.04, duration: 0.9, stagger: 0.08 }, "-=0.6")
        .from("[data-founder-foot]", { autoAlpha: 0, y: 10, duration: 0.7 }, "-=0.5");

      if (!isLightExperience) {
        gsap.to("[data-founder-orb='a']", { y: -26, x: 14, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to("[data-founder-orb='b']", { y: 22, x: -12, duration: 11, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }
    },
    { scope, dependencies: [isLightExperience] },
  );

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    if (likeRef.current && !prefersReducedMotion()) {
      gsap.fromTo(likeRef.current, { scale: 0.82 }, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    }
  };

  const openLinkedIn = () => window.open(LINKEDIN_URL, "_blank");

  return (
    <Section className="liquid-divider relative overflow-hidden" data-testid="founder-message-section">
      <div ref={scope} className="relative">
        <div className="founder-backdrop absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <span className="founder-orb founder-orb--a" data-founder-orb="a" />
          <span className="founder-orb founder-orb--b" data-founder-orb="b" />
        </div>

        <Container className="relative z-10 flex flex-col items-center">
          <Reveal>
            <div className="text-center mb-8">
              <Kicker>Uma mensagem do founder</Kicker>
              <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-[#211d18]">
                Bora conversar?
              </h2>
            </div>
          </Reveal>

          <article className="founder-card w-full max-w-xl mx-auto" data-founder-card data-testid="founder-card">
            <div className="flex items-center justify-between px-6 pt-5" data-founder-head>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="/founder.jpg"
                    alt="Matheus Peres da Silva"
                    
                    decoding="async"
                    width="56"
                    height="56"
                    className="w-14 h-14 rounded-full border border-[#211d18]/10 object-cover bg-zinc-200"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-[#211d18]/10">
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" weight="fill" />
                  </div>
                </div>
                <div>
                  <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-base font-semibold text-[#211d18] hover:underline decoration-[#211d18]/30 underline-offset-2">
                    Matheus Peres da Silva
                  </a>
                  <p className="text-xs text-[#5d564b] truncate max-w-[260px] xs:max-w-xs md:max-w-none">
                    Founder & Architect @ AetherCore
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 font-mono">2d • editado • 🌐</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5">
              <div data-founder-body>
                <PostText />
              </div>

              <div className="grid grid-cols-6 gap-1 rounded-2xl overflow-hidden border border-[#211d18]/10 bg-[#211d18]/[0.02] my-5 relative group/gallery">
                <button type="button" className="col-span-6 h-64 overflow-hidden relative cursor-zoom-in" onClick={() => setActiveImage(IMAGES[0])} data-founder-img data-testid="founder-gallery-main">
                  <img src={IMAGES[0]}  decoding="async" className="w-full h-full object-cover founder-img" alt="Aether rebrand hero" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <span className="text-xs text-white/90 flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> Ampliar imagem</span>
                  </span>
                </button>
                {IMAGES.slice(1).map((src, i) => (
                  <button
                    type="button"
                    key={src}
                    className={cn("col-span-2 h-24 overflow-hidden relative cursor-zoom-in", i < 2 && "border-r border-[#211d18]/10")}
                    onClick={() => setActiveImage(src)}
                    data-founder-img
                    data-testid={`founder-gallery-thumb-${i + 1}`}
                  >
                    <img src={src}  decoding="async" className="w-full h-full object-cover founder-img" alt={`Aether rebrand ${i + 2}`} />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={openLinkedIn}
              data-founder-foot
              data-testid="founder-linkedin-box"
              className="founder-linkbox mx-6 mb-5 w-[calc(100%-3rem)] text-left rounded-2xl bg-[#211d18]/[0.02] border border-[#211d18]/10 p-4 hover:bg-[#211d18]/[0.05] hover:border-[#211d18]/25 transition-[background-color,border-color,transform] duration-500 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#211d18]/5 group-hover:bg-[#0A66C2]/8 transition-colors duration-500">
                  <Linkedin className="w-6 h-6 text-zinc-700 group-hover:text-[#0A66C2] transition-colors duration-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#211d18] group-hover:text-[#0A66C2] transition-colors duration-500 flex items-center gap-1.5">
                    Conectar no LinkedIn
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-500" />
                  </h4>
                  <p className="text-xs text-[#5d564b] mt-1 truncate">linkedin.com/in/matheus-peres-da-silva</p>
                </div>
              </div>
            </button>

            <div className="grid grid-cols-3 border-t border-[#211d18]/8 text-[11px] xs:text-xs md:text-sm text-center" data-founder-foot>
              <button
                ref={likeRef}
                onClick={handleLike}
                data-testid="founder-like-button"
                className={cn(
                  "py-4 flex items-center justify-center gap-1.5 transition-colors duration-300 hover:bg-[#211d18]/5 rounded-bl-[28px]",
                  isLiked ? "text-[#0A66C2] font-semibold" : "text-[#5d564b] hover:text-[#211d18]"
                )}
              >
                <ThumbsUp className="w-3.5 h-3.5" weight={isLiked ? "fill" : "regular"} />
                <span>{likes}</span>
              </button>
              <button
                onClick={openLinkedIn}
                data-testid="founder-comment-button"
                className="py-4 flex items-center justify-center gap-1.5 text-[#5d564b] hover:bg-[#211d18]/5 hover:text-[#211d18] transition-colors duration-300"
              >
                <Chat className="w-3.5 h-3.5" />
                <span>Comentar</span>
              </button>
              <button
                onClick={openLinkedIn}
                data-testid="founder-share-button"
                className="py-4 flex items-center justify-center gap-1.5 text-[#5d564b] hover:bg-[#211d18]/5 hover:text-[#211d18] transition-colors duration-300 rounded-br-[28px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartilhar</span>
              </button>
            </div>
          </article>
        </Container>
      </div>

      <AnimatePresence>
        {activeImage && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setActiveImage(null)}
            data-testid="founder-lightbox"
          >
            <button
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors"
              onClick={() => setActiveImage(null)}
              aria-label="Fechar imagem"
              data-testid="founder-lightbox-close"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              src={activeImage}
              className="max-w-full max-h-[85vh] rounded-xl object-contain border border-white/10 shadow-2xl"
              alt="Ampliada"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </Section>
  );
};

export default FounderMessage;
