import React from "react";
import { cn } from "@/lib/utils";

/**
 * Shared Header layout wrapper for Dialogs, Sheets, and Alert Dialogs
 */
export const HeaderLayout = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
);
HeaderLayout.displayName = "HeaderLayout";

/**
 * Shared Footer layout wrapper for Dialogs, Sheets, and Alert Dialogs
 */
export const FooterLayout = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
FooterLayout.displayName = "FooterLayout";

/**
 * Shared Shortcut indicator for Menus and Command palettes
 */
export const MenuShortcut = ({ className, ...props }) => (
  <span
    className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
    {...props}
  />
);
MenuShortcut.displayName = "MenuShortcut";
