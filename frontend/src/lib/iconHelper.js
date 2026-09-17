import {
  ArrowsClockwise,
  Brain,
  ChatText,
  ClipboardText,
  Code,
  Cpu,
  Database,
  Drop,
  FileText,
  Globe,
  HardDrive,
  HardDrives,
  Lightning,
  LockKey,
  PaperPlaneTilt,
  ShieldCheck,
  SquaresFour,
  Table,
  Warning,
  Wind,
} from "@phosphor-icons/react";

/* Explicit map: a namespace import + dynamic lookup used to pull the entire
   Phosphor set (~5 MB of JS) into the bundle. */
const ICONS = {
  ArrowsClockwise,
  Blocks: SquaresFour,
  Brain,
  ChatText,
  ClipboardCheck: ClipboardText,
  ClipboardText,
  Code,
  Code2: Code,
  Cpu,
  Database,
  Drop,
  Droplet: Drop,
  FileText,
  Globe,
  HardDrive,
  HardDrives,
  Lightning,
  LockKey,
  MessageSquareText: ChatText,
  PaperPlaneTilt,
  Server: HardDrives,
  ShieldCheck,
  Table,
  Table2: Table,
  Warning,
  AlertTriangle: Warning,
  Zap: Lightning,
  Wind,
};

export function getLucideIcon(iconName, defaultIcon = FileText) {
  if (!iconName) return defaultIcon;
  return ICONS[iconName] || defaultIcon;
}

export const COMMON_CHIP_ICONS = {
  FileText,
  Code2: Code,
  Table2: Table,
  ShieldCheck,
  MessageSquareText: ChatText,
  Globe,
  Cpu,
  HardDrive,
  ClipboardCheck: ClipboardText,
};
