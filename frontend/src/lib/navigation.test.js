import { findActiveRouteIndex } from "./navigation";

const items = [
  { to: "/" },
  { to: "/produto" },
  { to: "/precos" },
];

describe("findActiveRouteIndex", () => {
  it("matches the home route exactly", () => {
    expect(findActiveRouteIndex(items, "/")).toBe(0);
  });

  it("matches a route and its nested paths", () => {
    expect(findActiveRouteIndex(items, "/produto")).toBe(1);
    expect(findActiveRouteIndex(items, "/produto/detalhes")).toBe(1);
  });

  it("does not falsely activate home for an unrepresented route", () => {
    expect(findActiveRouteIndex(items, "/validacao")).toBeNull();
  });
});
