import fs from "fs";
import path from "path";

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

const blend = (foreground, opacity, background) => {
  const channels = [1, 3, 5].map((index) => Math.round(
    parseInt(foreground.slice(index, index + 2), 16) * opacity
      + parseInt(background.slice(index, index + 2), 16) * (1 - opacity),
  ));
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
};

describe("beta product status page", () => {
  it("uses the current light reading surface instead of retired dark panels", () => {
    expect(validationPage).toContain("liquid-divider bg-[#f4f1e8]");
    expect(validationPage).not.toContain("aether-dark-surface");
    expect(validationPage).not.toContain("design-blue-panel");
  });

  it("keeps card, roadmap, and footnote copy at WCAG AA contrast", () => {
    const paper = "#f4f1e8";
    const ink = "#211d18";
    const card = blend("#ffffff", 0.6, paper);
    const roadmap = blend("#0038ff", 0.04, paper);
    const cardCopy = blend(ink, 0.65, card);
    const roadmapCopy = blend(ink, 0.65, roadmap);
    const note = blend(ink, 0.75, paper);

    expect(validationPage).toContain("bg-white/60");
    expect(validationPage).toContain("bg-[#0038FF]/[0.04]");
    expect(validationPage).toContain("text-[#211d18]/65");
    expect(validationPage).toContain("text-[#211d18]/75");
    [
      contrastRatio("#0038ff", paper),
      contrastRatio(cardCopy, card),
      contrastRatio(roadmapCopy, roadmap),
      contrastRatio(note, paper),
    ].forEach((ratio) => expect(ratio).toBeGreaterThanOrEqual(4.5));
  });
});
