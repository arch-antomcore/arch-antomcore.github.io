import fs from "fs";
import path from "path";

const stylesheetNames = ["index.css", "reference-theme.css", "cinematic-theme.css", "design-refinements.css"];
const stylesheets = stylesheetNames.map((name) => fs.readFileSync(path.join(__dirname, name), "utf8"));
const [baseCss, , , refinementsCss] = stylesheets;
const validationPage = fs.readFileSync(path.join(__dirname, "pages", "Validacao.jsx"), "utf8");

const toLuminance = (hex) => {
  const channels = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map((value) => (
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  ));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const contrastRatio = (foreground, background) => {
  const foregroundLuminance = toLuminance(foreground);
  const backgroundLuminance = toLuminance(background);
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
    / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
};

// Resolve palette variables in the same stylesheet order as the app entry.
const palette = {};
stylesheets.forEach((source) => {
  [...source.matchAll(/:root\s*\{([^}]+)\}/g)].forEach((root) => {
    [...root[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].forEach((declaration) => {
      palette[declaration[1]] = declaration[2].trim();
    });
  });
});

const resolveColor = (value) => {
  const variable = value.match(/^var\((--[\w-]+)\)$/);
  if (variable) {
    expect(palette[variable[1]]).toBeDefined();
    return resolveColor(palette[variable[1]]);
  }
  expect(value).toMatch(/^#[0-9a-f]{6}$/i);
  return value;
};

const colorFromRule = (source, selectorTail, property = "color") => {
  const selectorIndex = source.indexOf(selectorTail);
  expect(selectorIndex).toBeGreaterThanOrEqual(0);
  const blockStart = source.indexOf("{", selectorIndex);
  const blockEnd = source.indexOf("}", blockStart);
  const match = source.slice(blockStart, blockEnd).match(new RegExp(`(?:^|[;{])\\s*${property}:\\s*([^;!]+)`, "i"));
  expect(match).not.toBeNull();
  return resolveColor(match[1].trim());
};

const surfaces = [...validationPage.matchAll(/className="([^"]*\b(?:aether-dark-surface|design-blue-panel)\b[^"]*)"/g)]
  .map((match) => match[1]);
const darkSurfaces = surfaces.filter((classes) => classes.includes("aether-dark-surface"));
const blueSurfaces = surfaces.filter((classes) => classes.includes("design-blue-panel"));
const darkBackgrounds = darkSurfaces.map((classes) => classes.match(/bg-\[(#[0-9a-f]{6})\]/i)?.[1]);

describe("validation editorial surface contrast", () => {
  it("keeps the product logo and terminal dark, with blue financial and verdict panels", () => {
    // These are the two actual dark backgrounds still used by the page, not
    // the obsolete brown verdict gradient that the redesign removed.
    expect(darkBackgrounds.sort()).toEqual(["#121110", "#211d18"]);
    expect(blueSurfaces).toHaveLength(2);
    expect(blueSurfaces.every((classes) => !/bg-\[#[0-9a-f]{6}\]/i.test(classes))).toBe(true);
    expect(validationPage).not.toMatch(/from-\[#211d18\].*to-\[#2c2720\]/);
  });

  it("keeps the remaining dark logo and terminal foregrounds above WCAG AA", () => {
    const foregrounds = [
      colorFromRule(baseCss, ".aether-dark-surface .text-white {"),
      colorFromRule(baseCss, ".aether-dark-surface :is(.text-zinc-100, .text-zinc-200, .text-zinc-300) {"),
      colorFromRule(baseCss, ".aether-dark-surface .text-zinc-400 {"),
      colorFromRule(baseCss, ".aether-dark-surface .aether-dark-accent {"),
      colorFromRule(baseCss, '.aether-dark-surface [class*="text-yellow-"] {'),
    ];
    foregrounds.forEach((foreground) => {
      darkBackgrounds.forEach((background) => {
        expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  it("keeps cream, supporting copy and lime accents legible on the final deep-blue panels", () => {
    const blue = colorFromRule(refinementsCss, ".design-page .design-blue-panel {", "background-color");
    const foregrounds = [
      colorFromRule(refinementsCss, ".design-page .design-blue-panel {"),
      colorFromRule(refinementsCss, ".design-page .design-blue-panel :is(p,"),
      colorFromRule(refinementsCss, ".design-page .design-blue-panel :is(h2, h3)"),
      colorFromRule(refinementsCss, ".design-page .design-blue-panel :is(a, .aether-kicker, .aether-dark-accent)"),
    ];
    foregrounds.forEach((foreground) => {
      expect(contrastRatio(foreground, blue)).toBeGreaterThanOrEqual(4.5);
    });
  });
});
