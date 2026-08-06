import React, { useMemo, useRef, useState } from "react";
import PageHero from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/primitives";
import { GlassBlogCard } from "@/components/ui/glass-blog-card";
import { BLOG_POSTS } from "@/data/blogPosts";
import CtaSection from "@/components/site/CtaSection";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Calendar, Clock, ArrowLeft, Tag, CaretLeft as ChevronLeft, CaretRight as ChevronRight } from "@phosphor-icons/react";
import { useTranslation } from "@/hooks/useTranslation";

const POSTS_PER_PAGE = 9;

const getPaginationRange = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) return [1, 2, 3, 4, 5, "ellipsis-end", totalPages];
  if (currentPage >= totalPages - 3) {
    return [1, "ellipsis-start", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis-start", currentPage - 1, currentPage, currentPage + 1, "ellipsis-end", totalPages];
};

const renderInline = (text) => {
  if (!text) return null;
  let html = text
    .replace(/\*\*([^\*]+)\*\*/g, '<strong class="font-medium text-white">$1</strong>')
    .replace(/\*([^\*]+)\*/g, '<em class="italic text-zinc-400">$1</em>')
    .replace(/_([^_]+)_/g, '<em class="italic text-zinc-400">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded text-[0.9em]">$1</code>');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

// Parse raw markdown content into structured blocks to group consecutive lists
const parseMarkdownToBlocks = (content) => {
  if (!content) return [];
  const lines = content.split("\n");
  const blocks = [];
  let currentList = null;

  const commitList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      if (currentList && currentList.type === "ul") {
        currentList.items.push(trimmed.substring(2));
      } else {
        commitList();
        currentList = { type: "ul", items: [trimmed.substring(2)] };
      }
    } else if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s(.*)/);
      const itemContent = match ? match[2] : trimmed;
      if (currentList && currentList.type === "ol") {
        currentList.items.push(itemContent);
      } else {
        commitList();
        currentList = { type: "ol", items: [itemContent] };
      }
    } else {
      commitList();

      if (trimmed.startsWith("### ")) {
        blocks.push({ type: "h3", content: trimmed.replace("### ", "") });
      } else if (trimmed.startsWith("#### ")) {
        blocks.push({ type: "h4", content: trimmed.replace("#### ", "") });
      } else if (/^!\[(.*)\]\((.*)\)$/.test(trimmed)) {
        const match = trimmed.match(/^!\[(.*)\]\((.*)\)$/);
        blocks.push({ type: "img", alt: match[1], src: match[2] });
      } else if (trimmed === "---") {
        blocks.push({ type: "hr" });
      } else if (trimmed === "") {
        blocks.push({ type: "empty" });
      } else {
        blocks.push({ type: "p", content: trimmed });
      }
    }
  }
  commitList();
  return blocks;
};

// Custom markdown formatter for release notes
const MarkdownRenderer = ({ content }) => {
  if (!content) return null;
  const blocks = parseMarkdownToBlocks(content);
  
  return (
    <div className="space-y-4 text-zinc-300 font-light text-sm md:text-base leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h3":
            return (
              <h3 key={i} className="text-lg md:text-xl font-medium text-white tracking-tight mt-6 mb-3 border-b border-white/5 pb-2">
                {renderInline(block.content)}
              </h3>
            );
          case "h4":
            return (
              <h4 key={i} className="text-base font-medium text-zinc-200 mt-4 mb-2">
                {renderInline(block.content)}
              </h4>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc pl-5 space-y-1.5 my-3">
                {block.items.map((item, idx) => (
                  <li key={idx}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-5 space-y-1.5 my-3">
                {block.items.map((item, idx) => (
                  <li key={idx}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case "hr":
            return <hr key={i} className="border-white/5 my-6" />;
          case "empty":
            return <div key={i} className="h-2" />;
          case "img":
            return (
              <div key={i} className="my-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                <img 
                  src={block.src} 
                  alt={block.alt} 
                  className="w-full h-auto object-cover max-h-[400px]" 
                  loading="lazy"
                />
                {block.alt && (
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 text-center py-2 bg-black/20 border-t border-white/5">
                    {block.alt}
                  </p>
                )}
              </div>
            );
          case "p":
            return <p key={i} className="my-2">{renderInline(block.content)}</p>;
          default:
            return null;
        }
      })}
    </div>
  );
};

const Blog = () => {
  const { language } = useTranslation();
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsAnchorRef = useRef(null);
  const totalPages = Math.max(1, Math.ceil(BLOG_POSTS.length / POSTS_PER_PAGE));
  const pagePosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return BLOG_POSTS.slice(start, start + POSTS_PER_PAGE);
  }, [currentPage]);
  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const TEXTS = {
    pt: {
      kicker: "ANÚNCIOS & ATUALIZAÇÕES",
      lines: ["Notas de", "Lançamento da", "AetherCore."],
      lead: "Acompanhe a evolução de perto. Transparência técnica absoluta sobre implementações locais, melhorias de sandbox e rodadas de design.",
      back: "Voltar",
      by: "Por"
    },
    en: {
      kicker: "ANNOUNCEMENTS & UPDATES",
      lines: ["AetherCore", "Release Notes", "and Updates"],
      lead: "Follow our evolution closely. Absolute technical transparency regarding local implementations, sandbox enhancements, and design cycles.",
      back: "Back",
      by: "By"
    }
  };

  const text = TEXTS[language] || TEXTS.pt;
  const paginationText =
    language === "en"
      ? { showing: "Showing", page: "Page", of: "of", previous: "Previous", next: "Next" }
      : { showing: "Mostrando", page: "Página", of: "de", previous: "Anterior", next: "Próxima" };
  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    if (nextPage === currentPage) return;
    setCurrentPage(nextPage);
    requestAnimationFrame(() => {
      postsAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // Resolve selected post translations
  const selectedTitle = selectedPost 
    ? (language === "en" && selectedPost.titleEn ? selectedPost.titleEn : selectedPost.title)
    : "";
  const selectedDate = selectedPost 
    ? (language === "en" && selectedPost.dateEn ? selectedPost.dateEn : selectedPost.date)
    : "";
  const selectedContent = selectedPost 
    ? (language === "en" && selectedPost.contentEn ? selectedPost.contentEn : selectedPost.content)
    : "";

  return (
    <div data-testid="blog-page">
      <PageHero
        kicker={text.kicker}
        lines={text.lines}
        lead={text.lead}
      />

      <Section className="liquid-divider relative">
        <Container>
          <div id="blog-posts" ref={postsAnchorRef} className="scroll-mt-28" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pagePosts.map((post) => {
              const title = language === "en" && post.titleEn ? post.titleEn : post.title;
              const excerpt = language === "en" && post.excerptEn ? post.excerptEn : post.excerpt;
              const date = language === "en" && post.dateEn ? post.dateEn : post.date;

              return (
                <GlassBlogCard
                  key={post.id}
                  title={title}
                  excerpt={excerpt}
                  version={post.version}
                  author={post.author}
                  date={date}
                  readTime={post.readTime}
                  tags={post.tags}
                  onReadClick={() => setSelectedPost(post)}
                />
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                {paginationText.showing} {pagePosts.length} / {BLOG_POSTS.length} - {paginationText.page} {currentPage} {paginationText.of} {totalPages}
              </p>
              <Pagination className="blog-pagination">
                <PaginationContent className="rounded-full border border-white/10 bg-white/[0.035] p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
                  <PaginationItem>
                    <PaginationLink
                      href="#blog-posts"
                      aria-label={paginationText.previous}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(currentPage - 1);
                      }}
                      className={`h-10 min-w-10 rounded-full border border-white/10 bg-black/30 px-3 text-zinc-300 hover:bg-white/10 hover:text-white ${
                        currentPage === 1 ? "pointer-events-none opacity-35" : ""
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">{paginationText.previous}</span>
                    </PaginationLink>
                  </PaginationItem>

                  {paginationRange.map((page) =>
                    typeof page === "number" ? (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#blog-posts"
                          isActive={page === currentPage}
                          onClick={(event) => {
                            event.preventDefault();
                            goToPage(page);
                          }}
                          className={`h-10 w-10 rounded-full border text-sm transition-all duration-300 ${
                            page === currentPage
                              ? "border-white/30 bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.18)] hover:bg-white hover:text-black"
                              : "border-white/10 bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationEllipsis className="text-zinc-600" />
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationLink
                      href="#blog-posts"
                      aria-label={paginationText.next}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(currentPage + 1);
                      }}
                      className={`h-10 min-w-10 rounded-full border border-white/10 bg-black/30 px-3 text-zinc-300 hover:bg-white/10 hover:text-white ${
                        currentPage === totalPages ? "pointer-events-none opacity-35" : ""
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">{paginationText.next}</span>
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Container>
      </Section>

      {/* Details Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl text-white overflow-hidden shadow-2xl p-0">
          {selectedPost && (
            <div className="max-h-[85vh] overflow-y-auto" data-lenis-prevent>
              {/* Header Version Banner */}
              <div className="relative aspect-[21/9] w-full overflow-hidden bg-white flex items-center justify-center select-none border-b border-white/10">
                <div className="text-black font-mono font-bold text-6xl tracking-tighter uppercase">
                  {selectedPost.version || "v1.0.0"}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white hover:bg-black/80 transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  {text.back}
                </button>
              </div>

              {/* Content Wrapper */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full liquid-glass px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white leading-snug">
                    {selectedTitle}
                  </h2>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-mono border-b border-white/5 pb-5">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-zinc-600" />
                      {selectedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-zinc-600" />
                      {selectedPost.readTime}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{text.by} {selectedPost.author.name}</span>
                  </div>
                </div>

                {/* Body Content */}
                <MarkdownRenderer content={selectedContent} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CtaSection />
    </div>
  );
};

export default Blog;
