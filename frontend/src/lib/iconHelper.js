import * as PhosphorIcons from "@phosphor-icons/react";

/**
 * Dynamically resolves a Phosphor icon component by name string with fallbacks.
 * @param {string} iconName - The string name of the icon (e.g. "Drop", "Wind", "FileText").
 * @param {React.Component} defaultIcon - The fallback component to return if name isn't found.
 * @returns {React.Component} The Phosphor icon component.
 */
export function getLucideIcon(iconName, defaultIcon = PhosphorIcons.FileText) {
  if (!iconName) return defaultIcon;
  const nameMap = {
    Droplet: "Drop",
    Code2: "Code",
    Table2: "Table",
    MessageSquareText: "ChatText",
    ShieldCheck: "ShieldCheck",
    ClipboardCheck: "ClipboardText",
    Server: "HardDrives",
    Zap: "Lightning",
    AlertTriangle: "Warning"
  };
  const mapped = nameMap[iconName] || iconName;
  return PhosphorIcons[mapped] || PhosphorIcons[iconName] || defaultIcon;
}

export const COMMON_CHIP_ICONS = {
  FileText: PhosphorIcons.FileText,
  Code2: PhosphorIcons.Code,
  Table2: PhosphorIcons.Table,
  ShieldCheck: PhosphorIcons.ShieldCheck,
  MessageSquareText: PhosphorIcons.ChatText,
  Globe: PhosphorIcons.Globe,
  Cpu: PhosphorIcons.Cpu,
  HardDrive: PhosphorIcons.HardDrive,
  ClipboardCheck: PhosphorIcons.ClipboardText,
};
