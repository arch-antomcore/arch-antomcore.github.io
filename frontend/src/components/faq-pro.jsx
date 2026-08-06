"use client";;
import { CaretDown as ChevronDown, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

const componentThemeClassName = "";

const PANEL_EASE = [0.16, 1, 0.3, 1];
const EXPAND_SPRING = {
  type: "spring",
  stiffness: 150,
  damping: 26,
  mass: 1.05,
};
const COLLAPSE_SPRING = {
  type: "spring",
  stiffness: 190,
  damping: 30,
  mass: 1.1,
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text, query) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return text;
  }

  const parts = text.split(new RegExp(`(${escapeRegExp(normalizedQuery)})`, "gi"));

  return parts.map((part, index) => {
    if (part.toLowerCase() === normalizedQuery.toLowerCase()) {
      return (
        <mark
          className="rounded-sm bg-[#A34A33]/10 text-[#A34A33] font-medium px-0.5"
          key={index}>
          {part}
        </mark>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function itemMatchesQuery(item, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return (item.question.toLowerCase().includes(normalizedQuery) || item.answer.toLowerCase().includes(normalizedQuery));
}

// ... remaining helpers ...
function getDefaultOpenId(items, defaultOpenFirst) {
  if (defaultOpenFirst && items[0]) {
    return items[0].id;
  }

  return null;
}

function FaqProRow({
  isOpen,
  item,
  onToggle,
  panelId,
  query,
  triggerId
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#211d18]/10 bg-[#fbf9f2] hover:bg-[#f4f1e8] transition-colors duration-300">
      <h3>
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left outline-none focus-visible:ring-1 focus-visible:ring-[#A34A33]/20"
          id={triggerId}
          onClick={onToggle}
          type="button">
          <span
            className={cn(
              "font-medium text-[16px] leading-6 tracking-[-0.01em] transition-colors duration-300",
              isOpen ? "text-[#A34A33]" : "text-[#211d18]"
            )}>
            {highlightText(item.question, query)}
          </span>
          <ChevronDown
            aria-hidden
            className={cn(
              "mt-1 size-4 shrink-0 text-[#211d18]/45 transition-transform duration-300 ease-out",
              isOpen && "rotate-180 text-[#A34A33]"
            )} />
        </button>
      </h3>
      <motion.div
        animate={{ height: isOpen ? "auto" : 0 }}
        aria-labelledby={triggerId}
        className="overflow-hidden"
        id={panelId}
        initial={false}
        role="region"
        transition={{
          height: isOpen ? EXPAND_SPRING : COLLAPSE_SPRING,
        }}>
        <motion.div
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -6,
          }}
          aria-hidden={!isOpen}
          className="px-6 pb-5 text-[14px] text-[#211d18]/65 leading-relaxed"
          inert={isOpen ? undefined : true}
          initial={false}
          transition={{
            opacity: {
              duration: isOpen ? 0.38 : 0.2,
              ease: PANEL_EASE,
              delay: isOpen ? 0.06 : 0,
            },
            y: isOpen ? EXPAND_SPRING : COLLAPSE_SPRING,
          }}>
          {highlightText(item.answer, query)}
        </motion.div>
      </motion.div>
    </div>
  );
}

function FaqPro({
  className,
  defaultOpenFirst = false,
  items,
  searchPlaceholder = "Pesquisar FAQ..."
}) {
  const listId = React.useId();
  const wasSearchingRef = React.useRef(false);

  const [query, setQuery] = React.useState("");
  const [openId, setOpenId] = React.useState(() =>
    getDefaultOpenId(items, defaultOpenFirst));

  const normalizedQuery = query.trim();
  const isSearching = normalizedQuery.length > 0;

  const visibleItems = React.useMemo(
    () => items.filter((item) => itemMatchesQuery(item, query)),
    [items, query]
  );

  React.useEffect(() => {
    if (isSearching) {
      wasSearchingRef.current = true;
      setOpenId((current) => {
        if (current && visibleItems.some((item) => item.id === current)) {
          return current;
        }

        return visibleItems[0]?.id ?? null;
      });
      return;
    }

    if (wasSearchingRef.current) {
      wasSearchingRef.current = false;
      setOpenId(getDefaultOpenId(items, defaultOpenFirst));
      return;
    }
  }, [defaultOpenFirst, isSearching, items, visibleItems]);

  React.useEffect(() => {
    setOpenId((current) => {
      if (!current) {
        return current;
      }

      return items.some((item) => item.id === current) ? current : null;
    });
  }, [items]);

  const toggleItem = React.useCallback((id) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-3xl flex-col gap-4",
        className
      )}>
      <div className="relative">
        <input
          aria-label={searchPlaceholder}
          className={cn(
            "h-12 w-full appearance-none rounded-full border border-[#211d18]/10 bg-[#fbf9f2] px-6 pr-12 text-[15px] text-[#211d18] outline-none transition-colors duration-300 focus:border-[#A34A33]/30 focus:bg-[#f4f1e8]",
            "placeholder:text-[#211d18]/45",
            "[&::-webkit-search-cancel-button]:appearance-none",
            "[&::-webkit-search-decoration]:appearance-none"
          )}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          type="search"
          value={query} />
        {query ? (
          <button
            aria-label="Clear search"
            className="absolute top-1/2 right-3 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            onClick={() => setQuery("")}
            type="button">
            <X aria-hidden className="size-4" />
          </button>
        ) : null}
      </div>
      <div className="flex flex-col gap-2.5">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                initial={{ opacity: 0, y: 4 }}
                key={item.id}
                layout="position"
                transition={{ duration: 0.2, ease: PANEL_EASE }}>
                <FaqProRow
                  isOpen={openId === item.id}
                  item={item}
                  onToggle={() => toggleItem(item.id)}
                  panelId={`${listId}-${item.id}-panel`}
                  query={query}
                  triggerId={`${listId}-${item.id}-trigger`} />
              </motion.div>
            ))
          ) : (
            <motion.p
              animate={{ opacity: 1 }}
              className="px-2 py-8 text-center text-[14px] text-muted-foreground"
              initial={{ opacity: 0 }}
              key="empty">
              No FAQs match your search.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
FaqPro.displayName = "FaqPro";

export { FaqPro };
