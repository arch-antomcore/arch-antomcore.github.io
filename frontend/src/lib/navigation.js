export const findActiveRouteIndex = (items, pathname) => {
  const index = items.findIndex((item) => {
    if (!item.to) return false;
    if (item.to === "/") return pathname === "/";
    return pathname === item.to || pathname.startsWith(`${item.to}/`);
  });

  return index === -1 ? null : index;
};
