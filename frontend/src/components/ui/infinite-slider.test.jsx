import { distributeLogos, getCurrentLogoIndex } from "./infinite-slider";

const logos = [
  { id: 1, name: "Rust", src: "/stack/rust.svg" },
  { id: 2, name: "Tokio", src: "/stack/tokio.svg" },
  { id: 3, name: "Axum", src: "/stack/axum.svg" },
  { id: 4, name: "SQLite", src: "/stack/sqlite.webp" },
  { id: 5, name: "React", src: "/stack/react.svg" },
];

describe("LogoCarousel sequencing", () => {
  it("distributes every logo into balanced columns", () => {
    const columns = distributeLogos(logos, 3);

    expect(columns).toHaveLength(3);
    expect(columns.every((column) => column.length === 2)).toBe(true);
    expect(new Set(columns.flat().map((logo) => logo.id))).toEqual(
      new Set(logos.map((logo) => logo.id)),
    );
  });

  it("advances each column every two seconds with the template stagger", () => {
    expect(getCurrentLogoIndex(0, 0, 3)).toBe(0);
    expect(getCurrentLogoIndex(1999, 0, 3)).toBe(0);
    expect(getCurrentLogoIndex(2000, 0, 3)).toBe(1);
    expect(getCurrentLogoIndex(1800, 1, 3)).toBe(1);
    expect(getCurrentLogoIndex(6000, 0, 3)).toBe(0);
  });
});
