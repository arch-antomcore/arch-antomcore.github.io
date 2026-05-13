export const repeatCarousel = <T,>(items: readonly T[], times = 2) =>
  Array.from({ length: times }, (_, loop) => items.map((item, index) => ({ item, loop, index }))).flat();
