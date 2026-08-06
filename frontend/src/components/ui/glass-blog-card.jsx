import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, Clock } from "@phosphor-icons/react";
import { SpotlightCard } from "@/components/site/interactions";

export function GlassBlogCard({
  title,
  excerpt,
  version,
  author,
  date,
  readTime,
  tags,
  className,
  onReadClick
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("w-full", className)}
    >
      <SpotlightCard 
        onClick={onReadClick}
        className="group relative h-full flex flex-col overflow-hidden rounded-2xl liquid-glass backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] cursor-pointer"
      >
        {/* Version Banner Section */}
        <div className="relative aspect-[16/9] overflow-hidden bg-white flex items-center justify-center select-none border-b border-white/10">
          <div className="text-black font-mono font-bold text-5xl tracking-tighter uppercase transition-transform duration-500 ease-out group-hover:scale-110">
            {version || "v1.0.0"}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20" />

          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
            {tags?.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-black border border-white/15 text-white font-mono text-[10px] uppercase tracking-wider hover:bg-zinc-900"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Hover Overlay Action */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black shadow-xl"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Ver Notas
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 justify-between gap-5 p-6">
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-medium leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-zinc-200">
              {title}
            </h3>
            <p className="line-clamp-3 text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
              {excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7 border border-white/10 bg-zinc-900">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback className="bg-zinc-800 text-white text-[10px]">{author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-[11px]">
                <span className="font-medium text-white">
                  {author.name}
                </span>
                <span className="text-zinc-500 font-mono text-[9px] mt-0.5">{date}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
              <Clock className="h-3 w-3 text-zinc-600" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
