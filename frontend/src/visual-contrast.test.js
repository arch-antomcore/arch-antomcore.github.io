import fs from "fs";
import path from "path";

const css = fs.readFileSync(path.join(__dirname, "index.css"), "utf8");
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

const colorFromRule = (selectorTail) => {
  const selectorIndex = css.indexOf(selectorTail);
  expect(selectorIndex).toBeGreaterThanOrEqual(0);
  const blockStart = css.indexOf("{", selectorIndex);
  const blockEnd = css.indexOf("}", blockStart);
  const match = css.slice(blockStart, blockEnd).match(/color:\s*(#[0-9a-f]{6})/i);
  expect(match).not.toBeNull();
  return match[1];
};

describe("dark editorial surfaces", () => {
  it("marks every intended dark panel on the validation page", () => {
    const markedSurfaces = validationPage.match(/aether-dark-surface/g) || [];
    expect(markedSurfaces).toHaveLength(4);
  });

  it("keeps every foreground token above WCAG AA across the verdict gradient", () => {
    const foregrounds = [
      colorFromRule(".aether-dark-surface .text-white {"),
      colorFromRule(".aether-dark-surface :is(.text-zinc-100, .text-zinc-200, .text-zinc-300) {"),
      colorFromRule(".aether-dark-surface .text-zinc-400 {"),
      colorFromRule(".aether-dark-surface .aether-dark-accent {"),
      colorFromRule('.aether-dark-surface [class*="text-yellow-"] {'),
    ];
    const backgrounds = ["#211d18", "#2c2720", "#121110"];

    foregrounds.forEach((foreground) => {
      backgrounds.forEach((background) => {
        expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
      });
    });
  });
});
