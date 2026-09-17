import routeMeta from "@/data/routeMeta.json";

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

const ensureLink = (rel) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  return el;
};

/* Per-route <title>/description/canonical/OG sync for client-side navigation.
   The build step (scripts/sync-build.js) bakes the same data into each static
   route entrypoint so crawlers and AI agents see it without executing JS. */
export function applyRouteSeo(pathname, language = "pt") {
  if (typeof document === "undefined") return;
  const clean = pathname.replace(/\/+$/, "") || "/";
  const meta = routeMeta.routes[clean] || routeMeta.routes["/"];
  const url = `${routeMeta.siteUrl}${clean === "/" ? "/" : clean}`;

  document.title = meta.title;
  setMeta('meta[name="description"]', "content", meta.description);
  setMeta('meta[name="title"]', "content", meta.title);
  setMeta('meta[property="og:title"]', "content", meta.title);
  setMeta('meta[property="og:description"]', "content", meta.description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[property="twitter:title"]', "content", meta.title);
  setMeta('meta[property="twitter:description"]', "content", meta.description);
  setMeta('meta[name="robots"]', "content", meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  ensureLink("canonical").setAttribute("href", url);
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
}

export default applyRouteSeo;
