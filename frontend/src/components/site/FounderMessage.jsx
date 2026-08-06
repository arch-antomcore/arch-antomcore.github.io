import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShaderAnimation } from "@/components/ui/shader-lines";
import { ThumbsUp, Chat, ShareNetwork as Share2, LinkedinLogo as Linkedin, ArrowSquareOut as ExternalLink, X, Image as ImageIcon } from "@phosphor-icons/react";
import { Container, Section, Reveal, Kicker } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "@/components/site/interactions";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { motion, AnimatePresence } from "framer-motion";

const FounderMessage = () => {
  const [likes, setLikes] = useState(142);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(null); // Lightbox state
  const LINKEDIN_URL = "https://www.linkedin.com/in/matheus-peres-da-silva/";

  const img1 = "/assets/img/gallery/linkedin-1.jpg";
  const img2 = "/assets/img/gallery/linkedin-2.jpg";
  const img3 = "/assets/img/gallery/linkedin-3.jpg";
  const img4 = "/assets/img/gallery/linkedin-4.jpg";

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const openLinkedIn = () => {
    window.open(LINKEDIN_URL, "_blank");
  };

  const renderPostText = () => {
    return (
      <div className="space-y-4 text-zinc-850 text-[14px] md:text-[15px] leading-relaxed">
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
          <Link to="/Arquitetura" className="text-amber-850 hover:underline font-bold decoration-amber-850/40 underline-offset-4">
            Quintessence
          </Link>{" "}
          como IDE integrada e um{" "}
          <Link to="/Arquitetura" className="text-emerald-800 hover:underline font-bold decoration-emerald-800/40 underline-offset-4">
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
            <Link to="/Arquitetura" className="text-emerald-800 hover:underline font-bold decoration-emerald-800/40 underline-offset-4">
              Rust
            </Link>{" "}
            mantém tudo sob controle. 🦀
          </li>
        </ul>
        <p className="text-zinc-650 italic font-mono text-[13px] bg-[#211d18]/[0.03] py-1.5 px-3 rounded-lg border border-[#211d18]/5 inline-block">
          O modelo propõe. O Kernel (Proprietário) valida. Você decide.
        </p>
        <p>
          É isso que eu queria que a nova marca transmitisse: autonomia sem perder o controle. Ambição sem virar fumaça. Tecnologia avançada sem tirar o usuário do comando.
        </p>
        <p>
          E não é só uma tela bonita. Na última rodada consolidada, foram{" "}
          <Link to="/Referencias" className="text-[var(--a-terracotta)] hover:underline font-bold decoration-[var(--a-terracotta)]/40 underline-offset-4">
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
  };

  return (
    <Section className="liquid-divider relative overflow-hidden">
      {/* Shader Animation Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.08]" aria-hidden="true">
        <div 
          className="absolute inset-0 w-full h-full z-10 pointer-events-none" 
          style={{
            background: "radial-gradient(circle at 50% 50%, transparent 25%, #f4f1e8 85%)",
          }}
        />
        <ShaderAnimation />
      </div>
      
      <Container className="relative z-10 flex flex-col items-center">
        <Reveal>
          <div className="text-center mb-8">
            <Kicker>Uma mensagem do founder</Kicker>
            <h2 className="mt-5 text-3xl md:text-4xl font-medium tracking-tight text-[#211d18]">
              Bora conversar?
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="w-full max-w-xl mx-auto">
          <LiquidGlassCard
            displacementScale={70}
            cornerRadius={28}
            shadowMode={true}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.45)" }}
            className="w-full border border-[#211d18]/10 shadow-2xl founder-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="/founder.jpg"
                    alt="Matheus Peres da Silva"
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-full border border-[#211d18]/10 object-cover bg-zinc-200"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-[#211d18]/10">
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] fill-current" />
                  </div>
                </div>
                <div>
                  <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-base font-semibold text-[#211d18] hover:underline decoration-[#211d18]/30 underline-offset-2">
                    Matheus Peres da silva
                  </a>
                  <p className="text-xs text-zinc-650 truncate max-w-[260px] xs:max-w-xs md:max-w-none">
                    Founder & Architect @ AetherCore
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 font-mono">2d • editado • 🌐</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              {renderPostText()}

              {/* Premium LinkedIn-style layout for local images */}
              <div className="grid grid-cols-6 gap-1 rounded-2xl overflow-hidden border border-[#211d18]/10 bg-[#211d18]/[0.02] my-5 relative group/gallery">
                <div className="col-span-6 h-64 overflow-hidden relative cursor-zoom-in" onClick={() => setActiveImage(img1)}>
                  <img src={img1} className="w-full h-full object-cover group-hover/gallery:scale-[1.01] transition-transform duration-700" alt="Aether rebrand hero" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-white/90 flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> Ampliar imagem</span>
                  </div>
                </div>
                <div className="col-span-2 h-24 overflow-hidden relative cursor-zoom-in border-r border-[#211d18]/10" onClick={() => setActiveImage(img2)}>
                  <img src={img2} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Aether rebrand IDE" />
                </div>
                <div className="col-span-2 h-24 overflow-hidden relative cursor-zoom-in border-r border-[#211d18]/10" onClick={() => setActiveImage(img3)}>
                  <img src={img3} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Aether rebrand Kernel" />
                </div>
                <div className="col-span-2 h-24 overflow-hidden relative cursor-zoom-in" onClick={() => setActiveImage(img4)}>
                  <img src={img4} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Aether rebrand details" />
                </div>
              </div>
            </div>

            {/* Link Box */}
            <SpotlightCard 
              onClick={openLinkedIn}
              className="mx-6 mb-5 rounded-2xl bg-[#211d18]/[0.02] border border-[#211d18]/10 p-4 hover:bg-[#211d18]/[0.05] hover:border-[#211d18]/25 transition cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#211d18]/5 group-hover:bg-[#0A66C2]/8 transition-colors">
                  <Linkedin className="w-6 h-6 text-zinc-700 group-hover:text-[#0A66C2]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#211d18] group-hover:text-[#0A66C2] transition-colors flex items-center gap-1.5">
                    Conectar no LinkedIn
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h4>
                  <p className="text-xs text-zinc-650 mt-1 truncate">linkedin.com/in/matheus-peres-da-silva</p>
                </div>
              </div>
            </SpotlightCard>

            {/* Reactions Footer */}
            <div className="grid grid-cols-3 border-t border-[#211d18]/8 text-[11px] xs:text-xs md:text-sm text-center">
              <button
                onClick={handleLike}
                className={cn(
                  "py-4 flex items-center justify-center gap-1.5 transition hover:bg-[#211d18]/5 rounded-bl-[28px]",
                  isLiked ? "text-[#0A66C2] font-semibold" : "text-zinc-650 hover:text-zinc-800"
                )}
              >
                <ThumbsUp className={cn("w-3.5 h-3.5", isLiked && "fill-current")} />
                <span>{likes}</span>
              </button>
              <button
                onClick={openLinkedIn}
                className="py-4 flex items-center justify-center gap-1.5 text-zinc-650 hover:bg-[#211d18]/5 hover:text-zinc-800 transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Comentar</span>
              </button>
              <button
                onClick={openLinkedIn}
                className="py-4 flex items-center justify-center gap-1.5 text-zinc-650 hover:bg-[#211d18]/5 hover:text-zinc-800 transition rounded-br-[28px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartilhar</span>
              </button>
            </div>
          </LiquidGlassCard>
        </Reveal>
      </Container>

      {/* Lightbox for local image gallery */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setActiveImage(null)}
          >
            <button
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition"
              onClick={() => setActiveImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={activeImage}
              className="max-w-full max-h-[85vh] rounded-xl object-contain border border-white/10 shadow-2xl"
              alt="Ampliada"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default FounderMessage;
