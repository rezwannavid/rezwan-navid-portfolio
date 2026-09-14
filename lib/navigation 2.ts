export type GlobalNavItem = {
  id: "portfolio" | "photography" | "contact";
  label: string;
  href: string;
  icon: string;
  iconSize: 18 | 20;
  labelWidth: number;
  external?: boolean;
  activeRoutes: readonly string[];
};

export type GlobalTextNavItem = {
  id: "work" | "about";
  label: string;
  href: string;
  activeRoutes: readonly string[];
};

export const globalTextNavigation: readonly GlobalTextNavItem[] = [
  { id: "work", label: "Work", href: "/work", activeRoutes: ["/work"] },
  { id: "about", label: "About", href: "/about", activeRoutes: ["/about"] },
] as const;

export const globalNavigation: readonly GlobalNavItem[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    href: "/portfolio",
    icon: "/navbar/portfolio.svg",
    iconSize: 18,
    labelWidth: 56,
    activeRoutes: ["/portfolio"],
  },
  {
    id: "photography",
    label: "Photography",
    href: "/photography",
    icon: "/navbar/photography.svg",
    iconSize: 20,
    labelWidth: 82,
    activeRoutes: ["/photography"],
  },
  {
    id: "contact",
    label: "Contact",
    href: "mailto:m.rezwannavid@gmail.com",
    icon: "/navbar/contact.svg",
    iconSize: 20,
    labelWidth: 52,
    activeRoutes: ["/contact"],
  },
] as const;

export function isNavigationItemActive(pathname: string, item: GlobalNavItem) {
  return item.activeRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function isTextNavigationItemActive(pathname: string, item: GlobalTextNavItem) {
  return item.activeRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}
